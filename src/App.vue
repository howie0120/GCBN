<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import HomePage from './components/Page/Home.vue'

export default {
  name: 'App',
  components: {
    HomePage
  }
}
</script>

