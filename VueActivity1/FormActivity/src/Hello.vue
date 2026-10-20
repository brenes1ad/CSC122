<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Read values from query parameters
const userData = computed(() => ({
  firstName: route.query.firstName || 'N/A',
  lastName: route.query.lastName || 'N/A',
  address: route.query.address || 'N/A',
  gender: route.query.gender || 'N/A',
  email: route.query.email || 'N/A',
  dob: route.query.dob || 'N/A',
  intendedMajor: route.query.intendedMajor || 'N/A',
  unweightedGPA: route.query.unweightedGPA || 'N/A',
  extracurriculars: route.query.extracurriculars || 'N/A'
}));
</script>

<template>
  <div class="hello-container">
    <h1>{{ userData.firstName }} {{ userData.lastName }}'s College Information</h1>
    <p>Thank you for submitting your college application. Here is the summary of your details:</p>

    <!-- Table to display all submitted information -->
    <table class="details-table">
      <thead>
      <tr>
        <th>Field</th>
        <th>Submitted Value</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><strong>Full Name</strong></td>
        <td>{{ userData.firstName }} {{ userData.lastName }}</td>
      </tr>
      <tr>
        <td><strong>Address</strong></td>
        <td>{{ userData.address }}</td>
      </tr>
      <tr>
        <td><strong>Gender</strong></td>
        <td>{{ userData.gender }}</td>
      </tr>
      <tr>
        <td><strong>Email</strong></td>
        <td>{{ userData.email }}</td>
      </tr>
      <tr>
        <td><strong>Date of Birth</strong></td>
        <td>{{ userData.dob }}</td>
      </tr>
      <tr>
        <td><strong>Intended Major</strong></td>
        <td>{{ userData.intendedMajor }}</td>
      </tr>
      <tr>
        <td><strong>Unweighted GPA</strong></td>
        <td>{{ userData.unweightedGPA }}</td>
      </tr>
      <tr>
        <td><strong>Extracurriculars</strong></td>
        <td>{{ userData.extracurriculars }}</td>
      </tr>
      </tbody>
    </table>

    <br>
    <router-link to="/">Go back home</router-link>
  </div>
</template>

<style scoped>
.hello-container {
  max-width: 700px;
  margin: 20px auto;
  font-family: sans-serif;
}

.details-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.details-table th,
.details-table td {
  border: 1px solid #ccc;
  padding: 10px 12px;
  text-align: left;
}

.details-table th {
  background-color: #f4f4f4;
}

.details-table tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>