<template>
  <div class="container-fluid" style="height:100%;">
    <div class="row" style="height:100%;">
      <div class="col-1" style="padding: 0px">
        <NavigationComponent></NavigationComponent>
      </div>
      <div class="col-11" style="padding: 0px;">
        <MainComponent></MainComponent>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationComponent from './components/NavigationComponent.vue';
import MainComponent from './components/MainComponent.vue';

export default {
  name: 'App',
  components : {
    NavigationComponent,
    MainComponent
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  padding: 0px;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
