<script>
    import { onMount } from "svelte";

    export let momo=3;
    function manageMomo(){
        momo = momo + 1
    }
    onMount(() => {
        manageMomo()
    })
</script>

{momo}
