<template>
  <div>
    <p>This is Home</p>
    <span><router-link :to="'/Login'">Login </router-link></span>
    <span><router-link :to="'/Register'">Register </router-link></span>
    <span><router-link to="/dashBoard">dash </router-link></span>
  </div>
</template>

<script>
export default {
  name: 'HomeComponent',
};
</script>