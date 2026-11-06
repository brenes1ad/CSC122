<template>
  <div class="dev-update">
    <h1>🖋️ Update Developer Details</h1>

    <div v-if="error" class="alert error">
      <p>{{ error }}</p>
    </div>

    <form v-if="dev.devId" @submit.prevent="updateDev">
      <input type="hidden" v-model="dev.devId" />

      <p>
        <label for="name">Name:</label><br />
        <input type="text" id="name" v-model="dev.name" required />
      </p>

      <p>
        <label for="headquarters">Headquarters:</label><br />
        <input type="text" id="headquarters" v-model="dev.headquarters" />
      </p>

      <p>
        <label for="website">Website:</label><br />
        <input type="text" id="website" v-model="dev.website" required />
      </p>

      <p>
        <button type="submit">Update Developer</button>
      </p>
    </form>
    <div v-else-if="!error">
      <p>Loading developer details...</p>
    </div>

    <p>
      <router-link to="/devs/list">🔙 Back to Developer List</router-link>
    </p>
  </div>

  <!-- Games section -->
  <div v-if="dev.devId" class="games-section">
    <hr />
    <h2>Games of this Developer</h2>
    <ul>
      <li v-for="game in devGames" :key="game.gameId || game.id">
        {{ game.title }}
        <button @click.prevent="removeGame(game.gameId || game.id)">Remove</button>
      </li>
    </ul>
    <p v-if="!devGames || devGames.length === 0">No games assigned.</p>

    <h3>Add a Game</h3>
    <select v-model="selectedGameId">
      <option disabled value="">Please select one</option>
      <option
          v-for="p in availableGames"
          :key="p.gameId || p.id"
          :value="p.gameId || p.id"
      >
        {{ p.title || p.name }}
      </option>
    </select>
    <button @click.prevent="addGame" :disabled="!selectedGameId">Add Game</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const API_BASE_URL = 'https://rest-games.onrender.com';

const dev = ref({
  devId: null,
  name: '',
  headquarters: '',
  website: '',
});
const error = ref('');

const devGames = ref([]);
const allGames = ref([]);
const selectedGameId = ref('');

// Helper response parser
const parseResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return await response.json();
};

// Compute games that are not yet assigned to this developer
const availableGames = computed(() => {
  if (!Array.isArray(allGames.value) || !Array.isArray(devGames.value)) {
    return [];
  }

  return allGames.value.filter((game) => {
    if (!game) return false;
    const gId = game.gameId ?? game.id;
    return !devGames.value.some((dg) => (dg?.gameId ?? dg?.id) === gId);
  });
});

// Fetch master games list from API
const fetchAllGames = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/games`);
    allGames.value = await parseResponse(response);
  } catch (e) {
    console.error('Error loading master games list:', e.message);
  }
};

// Fetch developer details
const fetchDevDetails = async () => {
  const idFromUrl = route.params.devId;
  try {
    const response = await fetch(`${API_BASE_URL}/devs/${idFromUrl}`);
    const data = await parseResponse(response);
    if (!data) throw new Error('Could not find that Developer.');

    dev.value = {
      devId: data.devId,
      name: data.name,
      headquarters: data.headquarters,
      website: data.website || ''
    };
    devGames.value = data.games || [];
  } catch (e) {
    error.value = "Error pre-loading: " + e.message;
  }
};

const updateDev = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/devs/${dev.value.devId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dev.value),
    });
    await parseResponse(response);
    router.push({
      path: '/devs/list',
      query: { message: 'Developer updated successfully!' }
    });
  } catch (e) {
    error.value = "Error saving: " + e.message;
  }
};

const removeGame = async (gameId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/devs/${dev.value.devId}/games/${gameId}`, { method: 'DELETE' });
    if (!res.ok) alert('Failed to remove game.');
    else await fetchDevDetails();
  } catch (e) {
    alert('Error removing game: ' + e.message);
  }
};

const addGame = async () => {
  if (!selectedGameId.value) return;
  try {
    const res = await fetch(`${API_BASE_URL}/devs/${dev.value.devId}/games/${selectedGameId.value}`, { method: 'PUT' });
    if (!res.ok) alert('Failed to add game.');
    else {
      selectedGameId.value = '';
      await fetchDevDetails();
    }
  } catch (e) {
    alert('Error adding game: ' + e.message);
  }
};

onMounted(() => {
  fetchDevDetails();
  fetchAllGames();
});
</script>

<style scoped>
.alert { padding: 10px; border: 1px solid; margin-bottom: 15px; }
.error { color: red; border-color: red; }
</style>