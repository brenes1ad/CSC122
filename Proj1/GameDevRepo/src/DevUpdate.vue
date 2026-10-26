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
        <input type="email" id="website" v-model="dev.website" required />
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
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getDev, updateDevById } from './devs.js';

const route = useRoute();
const router = useRouter();

const dev = ref({
  devId: null,
  name: '',
  headquarters: '',
  website: '',
});
const error = ref('');

// --- 1. Fetch data to pre-load the form ---
const fetchDevDetails = () => {
  const idFromUrl = route.params.devId;
  try {
    const data = getDev(idFromUrl);
    if (!data) throw new Error('Could not find that developer.');

    // Copy so edits don't change the list until saved
    dev.value = { ...data };
  } catch (e) {
    error.value = "Error pre-loading: " + e.message;
  }
};

// --- 2. Submit the updated data ---
const updateDev = () => {
  try {
    updateDevById(dev.value);

    router.push({
      path: '/devs/list',
      query: { message: 'Developer updated successfully!' }
    });
  } catch (e) {
    error.value = "Error saving: " + e.message;
  }
};

onMounted(() => {
  fetchDevDetails();
});
</script>

<style scoped>
.alert { padding: 10px; border: 1px solid; margin-bottom: 15px; }
.error { color: red; border-color: red; }
</style>



