<script>
    import { onMount, onDestroy} from 'svelte';
    import * as d3 from 'd3';
    import {browser} from '$app/environment';

    let qData={data:[],check:false};
    d3.csv("/data/A4.csv").then(
            (data)=>{qData.data=data; qData.check=true; console.log(qData) ;drawCartesianPlane(qData);}
    )

    let svg;
    export let domain = { x: [-10, 10], y: [-10, 10] }
    export let point = { x: 0, y: 0 }
    export let label = {x: "X Axis", y: "Y Axis"}
    export let sizeLabel = {x: 20, y: 20}
    export let radius = 10
    const fixedDomain = {...domain}
    const width = 300
    const height = 300
    const margin = { top: 20, right: 30, bottom: 50, left: 50 }

    const xScale = d3.scaleLinear()
        .domain(domain.x) // Adjust these values based on desired boundaries
        .range([margin.left, width - margin.right])

    const yScale = d3.scaleLinear()
        .domain(domain.y) // Adjust these values based on desired boundaries
        .range([height - margin.bottom, margin.top])

    const curve = d3.line().curve(d3.curveNatural);

    // Draw Cartesian Plane
    function drawCartesianPlane(data) {
        

        d3.select(svg).selectAll("*").remove();
        const svgEl = d3.select(svg)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .style("", "visible");

        // Axes
        const xAxis = g => g
            .attr("transform", `translate(0,${yScale(Math.min(...domain.y))})`)
            .call(d3.axisBottom(xScale))
            .append("text") // X Axis Label
            .attr("x", width - margin.right)
            .attr("y", -6)
            .attr("fill", "currentColor")
            .attr("text-anchor", "end")
            .text(label.x)
            .style("font-size", sizeLabel.x)

        const yAxis = g => g
            .attr("transform", `translate(${xScale(Math.min(...domain.x))},0)`)
            .call(d3.axisLeft(yScale))
            .append("text") // Y Axis Label
            .attr("transform", "rotate(-90)")
            .attr("x", -margin.top)
            .attr("y", 20)
            .attr("fill", "currentColor")
            .attr("text-anchor", "end")
            .text(label.y)
            .style("font-size", sizeLabel.y)

        svgEl.append("g").call(xAxis);
        svgEl.append("g").call(yAxis);

        if(typeof data !== 'undefined' && data.check){
                console.log("what is data",data)
                svgEl
                    .append('path')
                    .attr('d', curve(zip(data.data.map(d=>xScale(d['T'])),data.data.map(d=>yScale(d['P'])).slice(0,63))))
                    .attr('stroke', 'black')
                    .attr('fill', 'none')
                    .attr("stroke-width", 3);
        }
        

        // Draggable Point
        svgEl.append("circle")
            .attr("cx", xScale(point.x))
            .attr("cy", yScale(point.y))
            .attr("r", radius)
            .style("fill", "red")
            .call(d3.drag()
                .on("start", dragStarted)
                .on("drag", dragged));
    }

    // Dragging Functions
    function dragStarted() {
        d3.select(this).raise().classed("active", true);
    }

    function dragged(event) {
        // Get the new coordinates while keeping them within the scale's domain
        let newX = xScale.invert(event.x);
        let newY = yScale.invert(event.y);

        // Clamp newX and newY within the scale's domain
        newX = Math.max(xScale.domain()[0], Math.min(newX, xScale.domain()[1]));
        newY = Math.max(yScale.domain()[0], Math.min(newY, yScale.domain()[1]));

        // Update point's coordinates
        point.x = newX;
        point.y = newY;

        // Update the position of the circle
        d3.select(this)
            .attr("cx", xScale(newX))
            .attr("cy", yScale(newY));
        
    }
// Handler zoom keys
    function handleKeyPress(event) {
        let zoomFactor; // Determines the zoom speed
        if (event.key === 'X' || event.key === 'x') {
            event.key === 'x' ? zoomFactor = 0.5 : zoomFactor = 2;
            // Zoom on X-axis
            const range = (domain.x[1] - domain.x[0]) * zoomFactor;
            let lxRange = (point.x - range / 2 > Math.min(...fixedDomain.x)) ? point.x - range / 2 : Math.min(...fixedDomain.x);
            let rxRange = (point.x + range / 2 < Math.max(...fixedDomain.x)) ? point.x + range / 2 : Math.max(...fixedDomain.x);
            domain.x = [lxRange, rxRange];
            
        } else if (event.key === 'Y' || event.key === 'y') {
            event.key === 'y' ? zoomFactor = 0.5 : zoomFactor = 2;
            // Zoom on Y-axis
            const range = (domain.y[1] - domain.y[0]) * zoomFactor;
            let lyRange = (point.y - range / 2 > Math.min(...fixedDomain.y)) ? point.y - range / 2 : Math.min(...fixedDomain.y);
            let ryRange = (point.y + range / 2 < Math.max(...fixedDomain.y)) ? point.y + range / 2 : Math.max(...fixedDomain.y);
            domain.y = [lyRange,ryRange];
        }

        xScale.domain(domain.x);
        yScale.domain(domain.y);
        drawCartesianPlane(qData); // Redraw the plane with new domains
    }

    onMount( () => {

        drawCartesianPlane(qData);
        if (browser) {
            window.addEventListener('keypress', handleKeyPress);
        }
        
    });

    onDestroy(() => {
       if (browser) {
            window.removeEventListener('keypress', handleKeyPress);
        }
    });

    function zip() {
    var args = [].slice.call(arguments);
    var shortest = args.length==0 ? [] : args.reduce(function(a,b){
        return a.length<b.length ? a : b
    });

    return shortest.map(function(_,i){
        return args.map(function(array){return array[i]})
    });
}
</script>

<svg bind:this={svg} width={width} height={height} class="border"></svg>
