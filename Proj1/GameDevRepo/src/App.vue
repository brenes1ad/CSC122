<script setup>
</script>
<template>
  <div id="app">
    <nav class="main-nav">
      <router-link to="/devs/list">Developers</router-link> |
      <router-link to="/games/list">Games</router-link> |
      <router-link to="/">Home</router-link>
    </nav>
    <hr />
    <main class="container">
      <router-view />
    </main>
  </div>
</template>
