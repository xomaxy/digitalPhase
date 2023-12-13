<script>
  // Data for grid example, bind for transversal communication
  import Grid from './Grid.svelte';
  import Plot3d from './Plot3d.svelte';

  let point = { x:100, y: 3000 }; 
  let domain = {x:[0,1600], y:[0,60000]}

  let label = {x: "Temperatura", y: "Pressure"}
  let sizeLabel = {x: 20, y: 20}
  let radius = 10

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

  // Data reading 
</script>

<main>
  <input on:keydown={(e)=>{if (e.key == 'Enter'){point.x = e.target.value}}} value={point.x}>
  <input on:keydown={(e)=>{if (e.key == 'Enter'){point.y = e.target.value}}} value={point.y}>
  <Grid bind:point bind:domain {label} {sizeLabel} {radius}/>
  

</main>

<!-- Plot all the values for dev proposes-->
<p>{point.x} {point.y}</p>
<p>Domain X</p>
<p>{domain.x} </p>
<p>Domain y</p>
<p>{domain.y}</p>

