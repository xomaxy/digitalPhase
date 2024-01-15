<script>
    import { onMount } from 'svelte';
    import {select, pointer} from "d3"
    import D3, { svg, xScale, yScale} from '$lib/d3/D3.svelte'
    import Axis from '$lib/d3/Axis.svelte'
    import Circle from '$lib/d3/Circle.svelte'
    import Path from '$lib/d3/Path.svelte'

    let center = {x:0.5, y:0.5}
    let domain = {x:[0.3,0.7]}

    onMount(() => {
        select(svg).on("click",(e)=>{  
            center = {x: $xScale.invert(pointer(e)[0]), y:  $yScale.invert(pointer(e)[1])}
            console.log(JSON.stringify(center))
        })
    })
</script>

    <D3 {domain} className="m-10">
        <Axis/>
        <Axis type='y'/>
        <Circle bind:center={center}/>
        <Path />
    </D3>



    


