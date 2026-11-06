<template>
  <div class="dev-list">
    <h1> Developer Management</h1>

    <div v-if="message" class="alert success">
      <p>{{ message }}</p>
    </div>
    <div v-if="error" class="alert error">
      <p>{{ error }}</p>
    </div>

    <h2>Current Developers ({{ devs.length }})</h2>

    <p>
      <router-link to="/devs/create">➕ Add New Developer</router-link>
    </p>

    <table border="1">
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Headquarters</th>
        <th>Website</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="dev in devs" :key="dev.devId">
        <td>{{ dev.devId }}</td>
        <td>
          <router-link :to="{ name: 'DevUpdate', params: { devId: dev.devId } }">
            {{ dev.name }}
          </router-link>
        </td>
        <td>{{ dev.headquarters }}</td>
        <td>{{ dev.website }}</td>
        <td>
          <button @click="deleteDev(dev.devId, dev.name)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// --- State Definitions using ref ---
const route = useRoute(); // Access the current route object

const devs = ref([]);

// Read flash message/error from query parameters on load
const message = ref(route.query.message || '');
const error = ref(route.query.error || '');

const API_BASE_URL = 'https://rest-games.onrender.com/devs';

// --- Functions ---
const fetchDevs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    console.log('OK');
    if (!response.ok) {
      console.log('ERROR.');
      throw new Error('Failed to fetch developers.');
    }
// Update the ref's value property
    devs.value = await response.json();
    console.log(devs.value);
  } catch (e) {
    error.value = 'Error loading developers: ' + e.message;
  }
};

const deleteDev = async (devId, devName) => {
  if (confirm(`Are you sure you want to delete developer '${devName}'?`)) {
    try {
      console.log(`${API_BASE_URL}/${devId}`);
      const response = await fetch(`${API_BASE_URL}/${devId}`, { method: 'DELETE' });
        console.log(response);
        if (!response.ok) {
        throw new Error(`Deletion failed with status ${response.status}`);
      }
      await fetchDevs();
      message.value = `Developer '${devName}' deleted successfully!`;
      error.value = '';
    } catch (e) {
        error.value = 'Error deleting developer: ' + e.message;
        message.value = '';
      }
    }
  };
  onMounted(() => {
    console.log('DevList component mounted.');
    fetchDevs();
  });

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



