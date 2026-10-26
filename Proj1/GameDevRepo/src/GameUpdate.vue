<template>
  <div class="game-update">
    <h1>🖋️ Update Game Details</h1>

    <div v-if="error" class="alert error">
      <p>{{ error }}</p>
    </div>

    <form v-if="game.gameId" @submit.prevent="updateGame">
      <input type="hidden" v-model="game.gameId" />

      <p>
        <label for="entryId">Entry ID:</label><br />
        <input type="text" id="entryId" v-model="game.entryId" required />
      </p>

      <p>
        <label for="title">Title:</label><br />
        <input type="text" id="title" v-model="game.title" required />
      </p>

      <p>
        <label for="genre">Genre:</label><br />
        <textarea id="genre" v-model="game.genre" rows="5" cols="50"></textarea>
      </p>

      <p>
        <button type="submit">Update Game</button>
      </p>
    </form>

    <div v-else-if="!error">
      <p>Loading game details...</p>
    </div>

    <p>
      <router-link to="/games/list">🔙 Back to Game List</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getGame, updateGameById } from './games.js';

const route = useRoute();
const router = useRouter();

const game = ref({
  gameId: null,
  entryId: '',
  title: '',
  genre: '',
});
const error = ref('');

// --- 1. Fetch data to pre-load the form ---
const fetchGameDetails = () => {
  const idFromUrl = route.params.gameId;
  try {
    const data = getGame(idFromUrl);
    if (!data) throw new Error('Could not find that game.');

    // Copy so edits don't change the list until saved
    game.value = { ...data };
  } catch (e) {
    error.value = "Error pre-loading: " + e.message;
  }
};

// --- 2. Submit the updated data ---
const updateGame = () => {
  try {
    updateGameById(game.value);

    router.push({
      path: '/games/list',
      query: { message: 'Game updated successfully!' }
    });
  } catch (e) {
    error.value = "Error saving: " + e.message;
  }
};

onMounted(() => {
  fetchGameDetails();
});
</script>

<style scoped>
.alert { padding: 10px; border: 1px solid; margin-bottom: 15px; }
.error { color: red; border-color: red; }
</style>


