<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getAuthor, updateAuthorById } from './authors.js';
const route = useRoute();
const router = useRouter();
const author = ref({
  authorId: null,
  name: '',
  affiliation: '',
  email: '',
});
const error = ref('');
const fetchAuthorDetails = () => {
  const idFromUrl = route.params.authorId;
  try {
    const data = getAuthor(idFromUrl);
    if (!data) throw new Error('Could not find that author.');
    author.value = { ...data };
  } catch (e) {
    error.value = "Error pre-loading: " + e.message;
  }
};
onMounted(() => {
  fetchAuthorDetails();
});

const updateAuthor = () => {
  try {
    updateAuthorById(author.value);
    router.push({
      path: '/authors/list',
      query: { message: 'Author updated successfully!' }
    });
  } catch (e) {
    error.value = "Error saving: " + e.message;
  }
};
</script>

<template>
  <form v-if="author.authorId" @submit.prevent="updateAuthor">
    <input type="hidden" v-model="author.authorId" />
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
    <p>
      <button type="submit">Update Author</button>
    </p>
  </form>
</template>

<style scoped>

</style>