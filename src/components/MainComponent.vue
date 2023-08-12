<template>
    <div id="main">
        <div id="open-navigation" v-on:click="openNavigation()">
            <svg xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            ><path d="M9 18l6-6-6-6"/></svg>
        </div>
        <div id="close-navigation" v-on:click="closeNavigation()">
            <svg xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#ffffff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            ><path d="M15 18l-6-6 6-6"/></svg>
        </div>
        <div id="main-view">
            <router-view :key="$route.fullPath"/>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'MainComponent',
    methods : {
        openNavigation() {
            document.getElementById('navigation-component').style.display = 'block';
            document.getElementById('navigation-component').style.minWidth = '150px';
            document.getElementById('open-navigation').style.display = 'none';
            document.getElementById('close-navigation').style.display = 'block';
        },
        closeNavigation() {
            document.getElementById('navigation-component').style.display = 'none';
            document.getElementById('open-navigation').style.display = 'block';
            document.getElementById('close-navigation').style.display = 'none';
        },
        displayLarge() {
            document.getElementById('navigation-component').style.display = 'block';
            document.getElementById('main-view').style.padding = '12px';
            document.getElementById('main-view').style.margin = '12px';
            document.getElementById('open-navigation').style.display = 'none';
            document.getElementById('close-navigation').style.display = 'none';
        },
        displayLittle() {
            document.getElementById('navigation-component').style.display = 'none';
            document.getElementById('main-view').style.padding = '12px';
            document.getElementById('main-view').style.margin = '12px';
            document.getElementById('open-navigation').style.display = 'block';
            document.getElementById('close-navigation').style.display = 'none';
        },
        checkWindowInnerWidth() {
            window.innerWidth > 600 ? this.displayLarge() : this.displayLittle();
        }
    },
    created() {
        window.addEventListener('resize', this.checkWindowInnerWidth);
    },
    mounted() {
        this.checkWindowInnerWidth();
    }
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

#open-navigation {
    display: none;
    width: 40px;
    height: 40px;
    background-color: black;
    position: fixed;
    top: 0px;
    left: 0px;
}

#close-navigation {
    display: none;
    width: 40px;
    height: 40px;
    background-color: black;
    position: fixed;
    top: 0px;
    left: 150px;
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