<script setup lang="ts">
// Importamos los componentes necesarios de Vue Router
import { RouterView, RouterLink } from 'vue-router'
// Ya no necesitamos importar PokemonCard ni los sprites aquí.
// Ese contenido se movió a src/views/HomeView.vue
</script>

<template>
  <header>
    <nav class="main-nav">
      <RouterLink to="/">🏡 Home (Act. 1)</RouterLink>
      |
      <RouterLink to="/map">🌍 Mapa (Act. 2)</RouterLink>
      |
      <RouterLink to="/zone/1">🔥 Zona 1</RouterLink>
      |
      <RouterLink to="/missions">📜 Misiones</RouterLink>
      |
      <RouterLink to="/pvp">⚔️ Combate PvP</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style>
/* Estilos globales (no scoped) para el fondo si no usaste src/assets/main.css */
body {
  background-color: #e6e6fa; /* Lavanda suave/Morado base */
  margin: 0;
  color: #333;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>

<style scoped>
/* Estilos para el componente App.vue */
.main-nav {
  padding: 20px;
  background-color: #ffffff; /* Fondo claro para la navegación */
  text-align: center;
  border-bottom: 2px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main-nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 15px;
  transition: color 0.2s;
}

.main-nav a:hover {
  color: #42b983;
}

/* Estilo para resaltar la ruta activa */
.main-nav a.router-link-exact-active {
  color: #42b983; /* El color verde característico de Vue */
  text-decoration: underline;
}
</style>
