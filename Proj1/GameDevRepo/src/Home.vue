<script setup>
</script>
<template>
  <div class="home">
    <h1>Games & Developers</h1>

    <!-- Home image: a video game controller -->
    <svg class="home-image" viewBox="0 0 240 160" role="img" aria-label="Video game controller">
      <!-- Body -->
      <path d="M 60 40 C 90 40 100 55 120 55 C 140 55 150 40 180 40 C 210 40 220 70 210 110 C 205 125 185 130 170 105 C 150 75 140 70 120 70 C 100 70 90 75 70 105 C 55 130 35 125 30 110 C 20 70 30 40 60 40 Z" fill="#2d3748" stroke="#1a202c" stroke-width="3" />

      <!-- D-Pad -->
      <path d="M 65 65 H 75 V 75 H 85 V 85 H 75 V 95 H 65 V 85 H 55 V 75 H 65 Z" fill="#a0aec0" />

      <!-- Action Buttons (A, B, X, Y) -->
      <circle cx="170" cy="65" r="5" fill="#e53e3e" /> <!-- Top/Y -->
      <circle cx="180" cy="75" r="5" fill="#3182ce" /> <!-- Right/B -->
      <circle cx="170" cy="85" r="5" fill="#38a169" /> <!-- Bottom/A -->
      <circle cx="160" cy="75" r="5" fill="#dd6b20" /> <!-- Left/X -->

      <!-- Center Buttons -->
      <rect x="102" y="65" width="12" height="5" rx="2" fill="#718096" />
      <rect x="126" y="65" width="12" height="5" rx="2" fill="#718096" />

      <!-- Thumbsticks -->
      <circle cx="95" cy="92" r="12" fill="#4a5568" />
      <circle cx="95" cy="92" r="8" fill="#718096" />
      <circle cx="145" cy="92" r="12" fill="#4a5568" />
      <circle cx="145" cy="92" r="8" fill="#718096" />
    </svg>

    <p>Manage Developers and Games.</p>

    <div class="home-links">
      <router-link to="/devs/list" class="home-link">Developers</router-link>
      <router-link to="/games/list" class="home-link">Games</router-link>
    </div>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
}
.home-image {
  width: 100%;
  max-width: 320px;
  margin: 10px auto;
  display: block;
}
.home-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}
.home-link {
  padding: 15px 30px;
  border: 1px solid #2f5d8a;
  border-radius: 6px;
  text-decoration: none;
  font-size: 1.2em;
}
</style>


