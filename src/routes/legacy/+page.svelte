<script>
  // Data for grid example, bind for transversal communication
  import Grid from './Grid.svelte';
  import Scale from '$lib/d3/scale.svelte';
  import D3 from '$lib/d3/d3.svelte';



  let point = { x:100, y: 3000 }; 
  let domain = {x:[0,1600], y:[0,22000]}

  let label = {x: "Temperatura", y: "Pressure"}
  let sizeLabel = {x: 20, y: 20}
  let radius = 4

  // Data processing
  let checkBoundaries = function(point,domain) {
        if (!(point.x >= Math.min(...domain.x) && point.x <= Math.max(...domain.x))){
        alert(`${label.x} out of bounds`);
        point.x = Math.min(...domain.x)
     } else if (!(point.y >= Math.min(...domain.y) && point.y <= Math.max(...domain.y))){
        alert(`${label.y} out of bounds`);
        point.y = Math.min(...domain.y)
     }
    }
  
  $: checkBoundaries(point,domain);

  // Three js handle
  import { Canvas } from '@threlte/core'
  import Plot3d from './Plot3d.svelte'
  import FileReader from './FileReader.svelte';
  let size = {width: 1000, height: 1000}

// Manging data 
  import * as d3 from 'd3';
  let qData={data:[],check:false};
    d3.csv("/digitalPhase/data/A4.csv").then(
            (data)=>{qData.data=data; qData.check=true; console.log(qData)}
    )

  
  

</script>


<D3 viewBox={{min_x:10}} />

<Scale />


  <Canvas {size}>
    <Plot3d />
  </Canvas>

  
  <p>{point.x} {point.y}</p>
  <p>Domain X</p>
  <p>{domain.x} </p>
  <p>Domain y</p>
  <p>{domain.y}</p>
    <input on:keydown={(e)=>{if (e.key == 'Enter'){point.x = e.target.value}}} value={point.x}>
    <input on:keydown={(e)=>{if (e.key == 'Enter'){point.y = e.target.value}}} value={point.y}>
    <Grid bind:point bind:domain {label} {sizeLabel} {radius}/>

  <FileReader />
    
