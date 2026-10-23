<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { authors, deleteAuthorById } from './authors.js';
// --- State Definitions using ref ---
const route = useRoute(); // Access the current route object
// Read flash message/error from query parameters on load
const message = ref(route.query.message || '');
const error = ref(route.query.error || '');

// --- Functions ---
const deleteAuthor = (authorId, authorName) => {
  if (confirm(`Are you sure you want to delete author '${authorName}'?`)) {
    try {
      deleteAuthorById(authorId);
      message.value = `Author '${authorName}' deleted successfully!`;
      error.value = '';
    } catch (e) {
      error.value = 'Error deleting author: ' + e.message;
      message.value = '';
    }
  }
};
</script>


<template>
  <table border="1">
    <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Affiliation</th>
      <th>Email</th>
      <th>Actions</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="author in authors" :key="author.authorId">
      <td>{{ author.authorId }}</td>
      <td>
        <router-link :to="{ name: 'AuthorUpdate', params: { authorId:
author.authorId } }">
          {{ author.name }}
        </router-link>
      </td>
      <td>{{ author.affiliation }}</td>
      <td>{{ author.email }}</td>
      <td>
        <button @click="deleteAuthor(author.authorId,
author.name)">Delete</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>