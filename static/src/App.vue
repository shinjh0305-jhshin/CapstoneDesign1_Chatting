<template>
  <navbar />
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<script setup>
import navbar from "./components/navbar.vue";
</script>

<style>
ul {
  list-style-type: none;
}
#noAccount {
  margin-top: 0.9em;
}
</style>
