<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { addAuthor } from './authors.js';

const router = useRouter();

const author = ref({
  name: '',
  affiliation: '',
  email: '',
});
const error = ref('');

const createAuthor = () => {
  try {
    addAuthor(author.value);
    router.push({
      path: '/authors/list',
      query: {
        message: `Author '${author.value.name}' created successfully!`,
      },
    });
  } catch (e) {
    error.value = 'Error creating author: ' + e.message;
  }
};
</script>

<template>
  <form @submit.prevent="createAuthor">
  <p>
    <label for="name">Name:</label><br />
    <input type="text" id="name" v-model="author.name" required />
  </p>
  <p>
    <label for="affiliation">Affiliation:</label><br />
    <input type="text" id="affiliation" v-model="author.affiliation" />
  </p>
  <p>
    <label for="email">Email:</label><br />
    <input type="email" id="email" v-model="author.email" required />
  </p>
  <p><button type="submit">Save New Author</button></p>
    </form>
</template>

<style scoped>

</style>