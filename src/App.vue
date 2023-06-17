<template>
  <div id="component-container">
      <div id="navigation-component">
        <NavigationComponent></NavigationComponent>
      </div>
      <div id="main-component">
        <MainComponent></MainComponent>
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
  },
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
  font-size: 12px;
}

#component-container {
  display: flex;
  min-height:100%;
}

#navigation-component {
  min-width: 150px;
  min-height: 100%;
  background-color: black;
}

#main-component {
  width: 100%;
  min-height: 100%
}
</style>
