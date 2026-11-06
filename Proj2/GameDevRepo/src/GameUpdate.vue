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

  <!-- Dev section -->
  <div v-if="game.gameId" class="devs-section">
    <hr />
    <h2>Developers for this Game</h2>
    <ul>
      <li v-for="dev in gameDevs" :key="dev.devId || dev.id">
        {{ dev.name }}
        <button @click.prevent="removeDev(dev.devId || dev.id)">Remove</button>
      </li>
    </ul>
    <p v-if="!gameDevs || gameDevs.length === 0">No developers assigned.</p>

    <h3>Add a Developer</h3>
    <select v-model="selectedDevId">
      <option disabled value="">Please select one</option>
      <option
          v-for="p in availableDevs"
          :key="p.devId || p.id"
          :value="p.devId || p.id"
      >
        {{ p.name || p.title }}
      </option>
    </select>
    <button @click.prevent="addDev" :disabled="!selectedDevId">Add Developer</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const API_BASE_URL = 'https://rest-games.onrender.com';

const game = ref({
  gameId: null,
  entryId: '',
  title: '',
  genre: '',
});
const error = ref('');

const gameDevs = ref([]);
const allDevs = ref([]);
const selectedDevId = ref('');

// Helper response parser
const parseResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return await response.json();
};

const availableDevs = computed(() => {
  if (!Array.isArray(allDevs.value) || !Array.isArray(gameDevs.value)) {
    return [];
  }

  return allDevs.value.filter((dev) => {
    if (!dev) return false;
    const dId = dev.devId ?? dev.id;
    return !gameDevs.value.some((dg) => (dg?.devId ?? dg?.id) === dId);
  });
});

// --- 1. Fetch data to pre-load the form ---
const fetchAllDevs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/devs`);
    allDevs.value = await parseResponse(response);
  } catch (e) {
    console.error('Error loading master developers list:', e.message);
  }
};

const fetchGameDetails = async () => {
  const idFromUrl = route.params.gameId;
  try {
    const response = await fetch(`${API_BASE_URL}/games/${idFromUrl}`);
    const data = await parseResponse(response);
    if (!data) throw new Error('Could not find that Game.');

    game.value = {
      gameId: data.gameId,
      entryId: data.entryId,
      title: data.title,
      genre: data.genre || ''
    };
    gameDevs.value = data.devs || [];
  } catch (e) {
    error.value = "Error pre-loading: " + e.message;
  }
};

const updateGame = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/games/${dev.value.gameId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(game.value),
    });
    await parseResponse(response);
    router.push({
      path: '/games/list',
      query: { message: 'Game updated successfully!' }
    });
  } catch (e) {
    error.value = "Error saving: " + e.message;
  }
};

const removeDev = async (gameId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/games/${game.value.gameId}/devs/${devId}`, { method: 'DELETE' });
    if (!res.ok) alert('Failed to Dev game.');
    else await fetchGameDetails();
  } catch (e) {
    alert('Error removing Developer: ' + e.message);
  }
};

const addDev = async () => {
  if (!selectedDevId.value) return;
  try {
    const res = await fetch(`${API_BASE_URL}/games/${game.value.gameId}/devs/${selectedDevId.value}`, { method: 'PUT' });
    if (!res.ok) alert('Failed to add Developer.');
    else {
      selectedDevId.value = '';
      await fetchGameDetails();
    }
  } catch (e) {
    alert('Error adding Dev: ' + e.message);
  }
};


onMounted(() => {
  fetchGameDetails();
  fetchAllDevs();
});
</script>

<style scoped>
.alert { padding: 10px; border: 1px solid; margin-bottom: 15px; }
.error { color: red; border-color: red; }
</style>


