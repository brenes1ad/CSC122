<template>
  <div class="game-create">
    <h1>➕ Create New Game</h1>

    <div v-if="error" class="alert error">
      <p>{{ error }}</p>
    </div>

    <form @submit.prevent="createGame">
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
      <p><button type="submit">Save New Game</button></p>
    </form>

    <p>
      <router-link to="/games/list">🔙 Back to Game List</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';


// --- State Definitions using ref ---
const router = useRouter();
const API_BASE_URL = 'https://rest-games.onrender.com';

const game = ref({
  entryId: '',
  title: '',
  genre: '',
});
const error = ref('');

// --- Functions ---
const createGame = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/games`, { // Explicitly add /devs here
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(game.value),
    });
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(errorBody || 'Failed to create game.');
    }
    router.push({
      path: '/games/list',
      query: {
        message: `Game'${game.value.title}' created!`,
      },
    });
  } catch (e) {
    error.value = 'Error creating Game: ' + e.message;
  }
};
</script>


