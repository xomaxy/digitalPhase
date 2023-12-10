<script>
  import LinePlot from './LinePlot.svelte';
  import * as d3 from 'd3';

  let data = d3.ticks(-2, 2, 200).map(Math.sin);

  function onMousemove(event) {
		const [x, y] = d3.pointer(event);
    data = data.slice(-200).concat(Math.atan2(x, y));
  }
</script>

<h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
  
<style lang="postcss">
    :global(html) {
      background-color: theme(colors.gray.100);
    }
</style>

<div on:mousemove={onMousemove}>
  <LinePlot data={data} />
</div>
