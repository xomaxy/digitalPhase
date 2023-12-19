<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
  
    let data = [];
  
    onMount(async () => {
      data = await d3.csv("src/data/A4.csv");
    });

let valor = 10000
let valor_secundario = 3500
let caso_seleccionado = "PH"


function interpolacion(x1,x2,y1,y2,xx) {
    return  (((x2-xx)/(x2-x1))*(y1))+(((xx-x1)/(x2-x1))*y2) 
}

function extrapolacion(xx,x1,x2,y1,y2){
  return y1 + (((xx-x1)/(x2-x1))*(y2-y1));
  
}

function calidad(Mi,MILG,MIGL){
  return((Mi-MILG)/(MIGL-MILG));
  
}

function M_intermedia(Calidad_x,MILG,MIGL){
  return ((1-Calidad_x)*MILG)+(Calidad_x*MIGL);
 
}

function rotacion_de_valores_array(caso) {
  if (caso === "TH" || caso === "TU" || caso === "TV" || caso === "TS" ||  caso === "TX") {
      return "A4";
  }
  if (caso === "PH" || caso === "PU" || caso === "PV" || caso === "PS" ||  caso === "PX" || caso === "PT") {
      return "A5";
  }
}

  </script>
  
  {#if data.length > 0}
    <table>
      <thead>
        <tr>
          {#each Object.keys(data[0]) as key}
            <th>{key} This is the first row</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each data as row}
          <tr>
            {#each Object.values(row) as value}
              <td>{value}</td>
            {/each}
          </tr>
        {/each}
      </tbody> 
    </table>
  {:else}
    <p>Loading data...</p>
  {/if}
  


  