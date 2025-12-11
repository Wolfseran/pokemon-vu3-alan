<script setup lang="ts">
import { useRouter } from 'vue-router' // 🎯 1. Importamos el router

// NOTA: Si eliminaste mapData.ts, necesitarás definir la interfaz Zone aquí
interface Zone {
  id: number
  nombre: string
  desbloqueado: boolean
  sprite: string
}

// Definimos las props (recibimos el objeto Zone completo)
interface Props {
  zone: Zone
}

const props = defineProps<Props>()

// 1. DEFINIMOS EL EVENTO: Permite a este componente enviar notificaciones.
const emit = defineEmits(['unlocked'])

// 🎯 2. Inicializamos el router para la navegación
const router = useRouter()

// Función para simular el click (navegación y EMISIÓN de evento)
const handleClick = () => {
  if (props.zone.desbloqueado) {
    console.log(`[CARD] Accediendo a la Zona ${props.zone.id}.`)

    // 3. EMITIMOS el evento 'unlocked' (Requisito FASE 1)
    emit('unlocked', props.zone.id)

    // 🎯 4. NAVEGAMOS a la ruta dinámica /zone/:id (Requisito FASE 3)
    // Usamos el nombre de la ruta 'zone' que definimos en index.ts
    router.push({ name: 'zone', params: { id: props.zone.id } })
  } else {
    console.log(`La Zona ${props.zone.id} está BLOQUEADA. No se permite el acceso.`)
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
