<template>
  <div id="app">
    <DistilleryHeader/>
    <router-view/>
  </div>
</template>

<script>
  import DistilleryHeader from './components/DistilleryHeader.vue'

  export default {
    components: {
      DistilleryHeader
    }
  }
</script>

<style media="screen">
  body {
    margin: 0;
    font-family: 'Noto Sans',"Century Gothic",Verdana,Arial,sans-serif;
  }
</style>
