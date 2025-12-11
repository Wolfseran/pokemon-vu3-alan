<script setup lang="ts">
import type { Zone } from '@/data/mapData' // Importamos la interfaz

// Definimos las props (recibimos el objeto Zone completo)
interface Props {
  zone: Zone
}

const props = defineProps<Props>()

// Función para simular el click (navegación)
const handleClick = () => {
  if (props.zone.desbloqueado) {
    // En un futuro, aquí usaremos Vue Router para ir a /zone/:id
    console.log(`¡Navegando a la Zona ${props.zone.id}: ${props.zone.nombre}!`)
    // router.push(`/zone/${props.zone.id}`);
  } else {
    console.log(`La Zona ${props.zone.id} está BLOQUEADA.`)
  }
}
</script>

<template>
  <button
    :class="['zone-card', { 'is-locked': !props.zone.desbloqueado }]"
    :disabled="!props.zone.desbloqueado"
    @click="handleClick"
  >
    <span class="zone-sprite">{{ props.zone.sprite }}</span>

    <span class="zone-name">{{ props.zone.nombre }}</span>

    <span v-if="!props.zone.desbloqueado" class="lock-icon">🔒</span>
  </button>
</template>

<style scoped>
.zone-card {
  /* Estilos base: parecido a un botón/tarjeta */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  margin: 10px;
  border-radius: 50%; /* Opcional: estilo circular */
  cursor: pointer;
  border: 4px solid #4caf50; /* Verde por defecto */
  background-color: #e8f5e9;
  transition: all 0.3s ease;
  padding: 10px;
  position: relative;
}

/* Estilos de Zona Desbloqueada */
.zone-card:not(.is-locked):hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px #4caf50;
}

/* Estilos de Zona BLOQUEADA */
.is-locked {
  border-color: #b0b0b0; /* Gris */
  background-color: #f0f0f0;
  cursor: not-allowed;
  opacity: 0.6;
}

.zone-sprite {
  font-size: 3em;
  margin-bottom: 5px;
}

.zone-name {
  font-weight: bold;
  color: #333;
  font-size: 0.9em;
  text-align: center;
}

.lock-icon {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 1.5em;
}
</style>
