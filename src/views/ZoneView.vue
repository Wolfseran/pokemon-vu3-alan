<script setup lang="ts">
// 1. Importamos el componente del Lobby de Zona
import ZoneLobby from '@/components/ZoneLobby.vue'

// 2. Definimos la prop 'id' que viene de la URL gracias al router
// (Esto se mantiene igual)
defineProps<{ id: string }>()
</script>

<template>
  <main>
    <ZoneLobby :zone-id="id" />
  </main>
</template>
