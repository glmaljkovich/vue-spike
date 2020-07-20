<template>
  <div class="loader">
    <i :class="['fa fa-spinner fa-pulse fa-fw', size ? 'fa-' + size : 'fa-3x']" />
  </div>
</template>

<script>
export default {
    name: "Loader",
    props: ["size"]
}
</script>

<style>
.loader {
    padding: 2em;
    margin: auto;
    width: 100%;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
}
</style>