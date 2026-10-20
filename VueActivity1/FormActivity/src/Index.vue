<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Reactive form data object
const formData = reactive({
  firstName: '',
  lastName: '',
  address: '',
  gender: '',
  email: '',
  dob: '',
  intendedMajor: '',
  unweightedGPA: '',
  extracurriculars: ''
});

const submitForm = () => {
  // Check that required fields are filled out
  if (!formData.firstName.trim() || !formData.lastName.trim()) {
    alert('Please enter your first and last name!');
    return;
  }

  // Route to the Hello page while passing form data via query params
  router.push({
    name: 'Hello',
    query: { ...formData }
  });
};
</script>

<template>
  <div class="form-container">
    <h1>College Application Form</h1>
    <form @submit.prevent="submitForm">
      <fieldset>
        <legend>Personal Details</legend>

        <label for="fname">First name:</label>
        <input type="text" id="fname" v-model="formData.firstName" required />
        <br><br>

        <label for="lname">Last name:</label>
        <input type="text" id="lname" v-model="formData.lastName" required />
        <br><br>

        <label for="address">Address:</label>
        <textarea id="address" rows="5" v-model="formData.address"></textarea>
        <br><br>

        <label>Gender:</label>
        <input type="radio" id="male" value="male" v-model="formData.gender" />
        <label for="male">Male</label>
        <input type="radio" id="female" value="female" v-model="formData.gender" />
        <label for="female">Female</label>
        <input type="radio" id="preferNot" value="Prefer not to say" v-model="formData.gender" />
        <label for="preferNot">Prefer not to say</label>
        <br><br>

        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" />
        <br><br>

        <label for="dob">Date of Birth:</label>
        <input type="date" id="dob" v-model="formData.dob" />
        <br><br>

        <label for="major">Intended Major:</label>
        <input type="text" id="major" v-model="formData.intendedMajor" />
        <br><br>

        <label for="gpa">Unweighted GPA:</label>
        <input type="text" id="gpa" v-model="formData.unweightedGPA" />
        <br><br>

        <label for="extracurriculars">Extracurriculars:</label><br>
        <textarea id="extracurriculars" rows="5" v-model="formData.extracurriculars"></textarea>
        <br><br>

        <input type="submit" value="Submit">
      </fieldset>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
}
</style>