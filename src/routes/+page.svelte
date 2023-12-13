<script>
  // Data for grid example, bind for transversal communication
  import Grid from './Grid.svelte';
  import Plot3d from './Plot3d.svelte';

  let point = { x:100, y: 3000 }; 
  let domain = {x:[0,1600], y:[0,60000]}
  let label = {x: "Temperatura", y: "Presión"}
  let sizeLabel = {x: 20, y: 20}
  let radius = 10

  // Data processing
  let isZero = (point)=>{if (point.x == 0 && point.y == 0) return true; else return false;}
    let checkBoundaries = function(point,domain) {
        if (!(point.x >= Math.min(...domain.x) && point.x <= Math.max(...domain.x))){
        alert("x out of bounds");
        point.x = Math.min(...domain.x)
     } else if (!(point.y >= Math.min(...domain.y) && point.y <= Math.max(...domain.y))){
        alert("y out of bounds");
        point.y = Math.min(...domain.y)
     }
    }
  
  $: checkBoundaries(point,domain);

  // Data reading 
</script>

<main>
  <input bind:value={point.x}>
  <Grid bind:point bind:domain {label} {sizeLabel} {radius}/>
  

</main>

<!-- Plot all the values for dev proposes-->
<p>{point.x} {point.y}</p>
<p>{domain.x} {domain.y}</p>

