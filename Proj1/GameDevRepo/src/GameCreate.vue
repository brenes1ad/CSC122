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
import { addGame } from './games.js';

// --- State Definitions using ref ---
const router = useRouter();

const game = ref({
  entryId: '',
  title: '',
  genre: '',
});
const error = ref('');

// --- Functions ---
const createGame = () => {
  try {
    addGame(game.value);

    // Redirect on success, using query parameters for the message
    router.push({
      path: '/games/list',
      query: {
        message: `Game '${game.value.title}' created successfully!`,
      },
    });
  } catch (e) {
    error.value = 'Error creating game: ' + e.message;
  }
};
</script>


