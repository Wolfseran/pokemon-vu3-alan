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
  alert(`Iniciando Captura en ${zoneName.value}...`) // Futuro: router.push('/capture');
}

const verMisiones = () => {
  alert(`Viendo Misiones de la zona ${props.zoneId}...`) // Futuro: router.push('/missions');
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
           
      <h2>Acciones Rápidas</h2>
           
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
  /* Eliminamos el ancho fijo y el fondo sólido */
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;

  /* Usamos Grid para organizar los bloques en 3 columnas */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 30px; /* Espacio entre los bloques */
}

/* Título de la Zona (Abarca el ancho completo) */
.zone-lobby h1,
.zone-lobby .zone-title {
  grid-column: 1 / -1; /* Ocupa todas las columnas */
  text-align: center;
  color: #2c3e50;
  margin-bottom: 0;
}

/* ------------------------------------------------ */
/* ESTILOS DE BLOQUES INDIVIDUALES (NPC, Entrenadores, Acciones) */
/* ------------------------------------------------ */

section {
  padding: 20px;
  /* Efecto Flotante/HUD: Fondo blanco semi-transparente */
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s;
  /* Reseteamos los estilos de borde y margen anteriores */
  border-top: none;
  margin-top: 0;
}

section:hover {
  transform: translateY(-5px);
}

h2 {
  color: #42b983; /* Verde para los títulos de sección */
  border-bottom: 2px solid #42b983;
  padding-bottom: 5px;
  margin-bottom: 15px;
  text-align: center;
}

/* Posicionamiento de los bloques en el grid */
.npc-list {
  grid-column: 1 / 2; /* Columna Izquierda */
  grid-row: 2 / 3;
}
.trainer-list {
  grid-column: 2 / 3; /* Columna Central */
  grid-row: 2 / 3;
}
.quick-actions {
  grid-column: 3 / 4; /* Columna Derecha */
  grid-row: 2 / 3;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* ------------------------------------------------ */
/* ESTILOS DE LISTAS Y BOTONES (Optimizados y mantenidos) */
/* ------------------------------------------------ */

.list-container {
  list-style: none;
  padding: 0;
}

.list-container li {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px dotted #a8a8a8;
}

.list-container li:last-child {
  border-bottom: none;
}

.name {
  font-weight: 600;
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

.action-button {
  padding: 12px 15px;
  font-size: 1em;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.1s;
  text-transform: uppercase;
}

.action-button:hover:not(:disabled) {
  transform: translateY(-2px);
}

.capture-btn {
  background-color: #42b983;
  color: white;
}
.missions-btn {
  background-color: #ff9800;
  color: white;
}
.pvp-btn {
  background-color: #d1d1d1;
  color: #888;
  cursor: not-allowed;
}
</style>
