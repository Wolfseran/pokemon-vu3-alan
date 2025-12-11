<script setup lang="ts">
// Importamos los helpers de reactividad necesarios
import { reactive } from 'vue'
import ZoneCard from '@/components/ZoneCard.vue'

// 1. Definición de la Interfaz
interface Zone {
  id: number
  nombre: string
  desbloqueado: boolean
  sprite: string
}

// 2. Estado Reactivo: Definimos las zonas usando reactive()
const state = reactive({
  zonas: [
    { id: 1, nombre: 'Bosque Verdoso', desbloqueado: true, sprite: '🌳' },
    { id: 2, nombre: 'Cueva Ígnea', desbloqueado: false, sprite: '🌋' },
    { id: 3, nombre: 'Costa Tormentosa', desbloqueado: false, sprite: '🌊' },
    { id: 4, nombre: 'Ruinas Antiguas', desbloqueado: false, sprite: '🏛️' },
    { id: 5, nombre: 'Volcán Magma', desbloqueado: false, sprite: '🔥' },
  ] as Zone[], // Usamos 'as Zone[]' para asegurar el tipo
})

// 3. Función desbloquearZona(id) - CORRECCIÓN DE TYPESCRIPT
const desbloquearZona = (zonaId: number) => {
  // Buscamos la siguiente zona
  const nextZoneIndex = state.zonas.findIndex((z) => z.id === zonaId + 1)

  if (nextZoneIndex !== -1) {
    // Solución TS: Obtenemos una referencia local al objeto de la zona.
    const nextZone = state.zonas[nextZoneIndex] as Zone

    nextZone.desbloqueado = true

    console.log(`[MAP] ¡Zona ${zonaId + 1} (${nextZone.nombre}) desbloqueada!`)
  } else {
    console.log('[MAP] No hay más zonas para desbloquear.')
  }
}
</script>

<template>
  <main class="map-view">
    <h1>🌍 FASE 1: Mapa Reactivo</h1>
    <p>Haz clic en una zona desbloqueada para simular el acceso y desbloquear la siguiente.</p>

    <div class="zone-container">
      <ZoneCard
        v-for="zone in state.zonas"
        :key="zone.id"
        :zone="zone"
        @unlocked="desbloquearZona"
      />
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
