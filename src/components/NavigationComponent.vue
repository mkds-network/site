<template>
    <nav class="container" id="navigation">
        <div class="navigation-group">
            <div class="navigation-label">Times</div>
            <div class="navigation-items">
                <div class="navigation-item">
                    <router-link class="navigation-link"  to="/site/times/testExtension/Non-PRB">Test</router-link>
                </div>
            </div>
        </div>
        <div class="navigation-group">
            <div class="navigation-label">Others</div>
            <div class="navigation-items">
                <div class="navigation-item">
                    <router-link class="navigation-link" to="/">Home</router-link>
                </div>
                <div class="navigation-item">
                    <router-link class="navigation-link" to="/">Dev</router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavigationComponent'
}
</script>
  
<style scoped>
#navigation {
    position: sticky;
    top: 0px;
    padding: 15px;
    color: white;
}

.navigation-group {
    margin-bottom: 15px;
}

.navigation-label {
    font-weight: bold;
}

.navigation-items {
    margin: 3px 0 0 12px;
}

.navigation-item {
    width: auto;
}

.navigation-link {
    text-decoration: none;
    color: white
}

.navigation-link:hover {
    color: lime;
}
</style>