<script setup lang="ts">
// Importamos los componentes necesarios de Vue Router
import { RouterView, RouterLink, useRoute } from 'vue-router' // 🎯 Añadimos useRoute
import { computed } from 'vue' // 🎯 Añadimos computed

// ------------------------------------------------
// Lógica de Navegación Dinámica (FASE 3 - Requisitos)
// ------------------------------------------------

const route = useRoute()

// Mapa de sprites de zonas (debe coincidir con MapView.vue)
const zoneSprites: { [key: string]: string } = {
  '1': '🌳', // Bosque Verdoso
  '2': '🌋', // Cueva Ígnea
  '3': '🌊', // Costa Tormentosa
  '4': '🏛️', // Ruinas Antiguas
  '5': '🔥', // Volcán Magma
}

// Propiedad computada para determinar si estamos DENTRO de una zona (ruta 'zone').
const isInsideZone = computed(() => route.name === 'zone')

// Propiedad computada para obtener el ID de la zona actual.
const currentZoneId = computed(() => (route.params.id as string) || '1')

// Propiedad computada para obtener el icono de la zona actual.
const currentZoneSprite = computed(() => zoneSprites[currentZoneId.value] || '❓')
</script>

<template>
  <header>
    <nav class="main-nav">
      <RouterLink to="/">🏡 Home</RouterLink>
      |
      <RouterLink to="/map">🌍 Mapa</RouterLink>

      <template v-if="isInsideZone">
        |
        <RouterLink :to="{ name: 'zone', params: { id: currentZoneId } }">
          {{ currentZoneSprite }} Zona {{ currentZoneId }}
        </RouterLink>
      </template>

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
