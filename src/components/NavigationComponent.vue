<template>
    <div class="navigation">
        <span>Hi, I'm the navigation component !</span>
        <nav>
            <router-link to="/">Home</router-link> |
            <router-link to="/site/times/testExtension/Non-PRB">Test</router-link>
        </nav>
    </div>
</template>
  
<script>
export default {
    name: 'NavigationComponent'
}
</script>
  
<style scoped>
</style>  