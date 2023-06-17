<template>
    <div id="main">
        <div id="main-view">
            <router-view/>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'MainComponent'
}
</script>
  
<style scoped>
#main {
    height: 100%;
    background: url("../assets/PipePlaza1920.png") no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    overflow: auto
}

#main-view {
    background-color: rgba(0,0,0,0.7);
    color: white;
    margin: 40px;
    padding: 25px;
}

.ranking-table {
  width:100%
}
</style>  