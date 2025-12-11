<script setup lang="ts">
import ZoneCard from '@/components/ZoneCard.vue'
import { zonas } from '@/data/mapData' // Importamos el array de datos
</script>

<template>
  <main class="map-view">
    <h1>🌍 Mapa de Zonas</h1>

    <div class="zone-container">
      <ZoneCard v-for="zone in zonas" :key="zone.id" :zone="zone" />
    </div>
  </main>
</template>

<style scoped>
.map-view {
  text-align: center;
  padding: 20px;
}

/* Estilo para simular el camino vertical del mapa */
.zone-container {
  display: flex;
  flex-direction: column; /* Apilados verticalmente */
  align-items: center;
  gap: 20px; /* Espacio entre cada zona */
  padding-top: 50px;
}
</style>
