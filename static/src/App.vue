<template>
  <navbar />
  <join-prompt />
  <login-prompt />
</template>

<script>
export default {
  name: "App",
};
</script>

<script setup>
import navbar from "./components/navbar.vue";
import LoginPrompt from "./components/LoginPrompt.vue";
import JoinPrompt from "./components/join.vue";
</script>

<style>
ul {
  list-style-type: none;
}
#noAccount {
  margin-top: 0.9em;
}
</style>
