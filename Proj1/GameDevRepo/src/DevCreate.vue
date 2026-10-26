<template>
  <div class="dev-create">
    <h1>➕ Create New Developer</h1>

    <div v-if="error" class="alert error">
      <p>{{ error }}</p>
    </div>

    <form @submit.prevent="createDev">
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
      <p><button type="submit">Save New Dev</button></p>
    </form>

    <p>
      <router-link to="/devs/list">🔙 Back to Dev List</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { addDev } from './devs.js';

// --- State Definitions using ref ---
const router = useRouter();

// A ref holding an object (Vue automatically wraps it as a Proxy/reactive)
const dev = ref({
  name: '',
  headquarters: '',
  website: '',
});
const error = ref('');

// --- Functions ---
const createDev = () => {
  try {
    addDev(dev.value);

    // Redirect on success, using query parameters for the message
    router.push({
      path: '/devs/list',
      query: {
        message: `Dev '${dev.value.name}' created successfully!`,
      },
    });
  } catch (e) {
    error.value = 'Error creating dev: ' + e.message;
  }
};
</script>



