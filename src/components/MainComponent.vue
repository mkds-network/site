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
    background-image: url("../assets/liliana.jpeg");
    background-attachment: fixed;
    overflow: auto
}

#main-view {
    background-color: rgba(0,0,0,0.7);
    color: white;
    margin: 225px 40px 40px 40px;
    padding: 25px;
}

.ranking-table {
  width:100%
}
</style>  