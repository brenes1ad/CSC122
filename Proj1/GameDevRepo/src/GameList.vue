<template>
  <div class="game-list">
    <h1> Game Management</h1>

    <div v-if="message" class="alert success">
      <p>{{ message }}</p>
    </div>
    <div v-if="error" class="alert error">
      <p>{{ error }}</p>
    </div>

    <h2>Current Games ({{ games.length }})</h2>

    <p>
      <router-link to="/games/create">➕ Add New Game</router-link>
    </p>

    <table border="1">
      <thead>
      <tr>
        <th>ID</th>
        <th>Entry ID</th>
        <th>Title</th>
        <th>Genre</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="game in games" :key="game.gameId">
        <td>{{ game.gameId }}</td>
        <td>{{ game.entryId }}</td>
        <td>
          <router-link :to="{ name: 'GameUpdate', params: { gameId: game.gameId } }">
            {{ game.title }}
          </router-link>
        </td>
        <td>{{ game.genre }}</td>
        <td>
          <button @click="deleteGame(game.gameId, game.title)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { games, deleteGameById } from './games.js';

// --- State Definitions using ref ---
const route = useRoute(); // Access the current route object

// Read flash message/error from query parameters on load
const message = ref(route.query.message || '');
const error = ref(route.query.error || '');

// --- Functions ---
const deleteGame = (gameId, gameTitle) => {
  if (confirm(`Are you sure you want to delete game '${gameTitle}'?`)) {
    try {
      deleteGameById(gameId);
      message.value = `Game '${gameTitle}' deleted successfully!`;
      error.value = '';
    } catch (e) {
      error.value = 'Error deleting game: ' + e.message;
      message.value = '';
    }
  }
};
</script>

<style scoped>
.alert {
  padding: 10px;
  border: 1px solid;
  margin-bottom: 15px;
}
.success {
  color: green;
  border-color: green;
}
.error {
  color: red;
  border-color: red;
}
</style>


