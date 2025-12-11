<script setup lang="ts">
// Eliminamos 'computed' ya que no se usa en este componente
import { ref } from 'vue'
import { getZoneData, type Npc, type Trainer } from '@/data/zoneLobbyData'

// La prop 'zoneId' se recibe de la ruta dinámica /zone/:id gracias a props: true en el router.
const props = defineProps<{ zoneId: string }>()

// Cargamos los datos de la zona usando el ID de la prop
const zoneData = getZoneData(Number(props.zoneId))

const zoneName = ref(zoneData.zoneName)
const npcs = ref<Npc[]>(zoneData.npcs)
const entrenadoresOnline = ref<Trainer[]>(zoneData.trainers)

// Métodos de acción
const iniciarCaptura = () => {
  alert(`Iniciando Captura en ${zoneName.value}...`)
  // Futuro: router.push('/capture');
}

const verMisiones = () => {
  alert(`Viendo Misiones de la zona ${props.zoneId}...`)
  // Futuro: router.push('/missions');
}
</script>

<template>
  <div class="zone-lobby">
    <h1>Lobby de Zona ID: {{ props.zoneId }}</h1>
    <p class="zone-title">{{ zoneName }}</p>

    <section class="npc-list">
      <h2>NPCs de la Zona</h2>
      <ul class="list-container">
        <li v-for="npc in npcs" :key="npc.nombre">
          <span class="name">{{ npc.nombre }}</span>
          <span class="role">{{ npc.rol }}</span>
        </li>
      </ul>
    </section>

    <section class="trainer-list">
      <h2>Entrenadores en línea</h2>
      <ul class="list-container">
        <li v-for="e in entrenadoresOnline" :key="e.nombre">
          <span class="name">{{ e.nombre }}</span>
          <span :class="['state', { online: e.estado === 'Online' }]">{{ e.estado }}</span>
        </li>
      </ul>
    </section>

    <section class="quick-actions">
      <button class="action-button capture-btn" @click="iniciarCaptura">
        <span class="icon">🟢</span> IR A CAPTURAR POKÉMON
      </button>
      <button class="action-button missions-btn" @click="verMisiones">
        <span class="icon">🎯</span> VER MISIONES DE LA ZONA
      </button>
      <button class="action-button pvp-btn" disabled>
        <span class="icon">⚔️</span> ÁREA DE BATALLA (Próximamente)
      </button>
    </section>
  </div>
</template>

<style scoped>
.zone-lobby {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.zone-title {
  font-size: 1.2em;
  font-weight: bold;
  color: #42b983;
  margin-bottom: 20px;
}

section {
  margin-top: 30px;
  padding-top: 15px;
  border-top: 1px solid #ccc;
}

h2 {
  color: #2c3e50;
  border-bottom: 2px solid #a8e6cf;
  padding-bottom: 5px;
  margin-bottom: 15px;
}

.list-container {
  list-style: none;
  padding: 0;
}

.list-container li {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px dotted #e0e0e0;
}

.list-container li:last-child {
  border-bottom: none;
}

.name {
  font-weight: 500;
}

.role,
.state {
  font-style: italic;
  color: #666;
}

.state.online {
  color: #42b983;
  font-weight: bold;
}

/* Estilos para las acciones rápidas */
.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.action-button {
  padding: 15px 20px;
  font-size: 1.1em;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.1s;
}

.action-button:hover:not(:disabled) {
  transform: translateY(-2px);
}

.capture-btn {
  background-color: #42b983; /* Verde para la captura */
  color: white;
}

.missions-btn {
  background-color: #ff9800; /* Naranja/Rojo para misiones */
  color: white;
}

.pvp-btn {
  background-color: #d1d1d1;
  color: #888;
  cursor: not-allowed;
}
</style>
