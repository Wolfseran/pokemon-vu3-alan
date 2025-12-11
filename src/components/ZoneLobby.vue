<script setup lang="ts">
import { ref, computed } from 'vue'
// Importamos los tipos y la función de carga de datos
import { getZoneData, type Npc, type Trainer } from '@/data/zoneLobbyData'
// (Asumimos que ZoneLobbyData.ts contiene las interfaces Npc y Trainer)

// La prop 'zoneId' se recibe de la ruta dinámica /zone/:id
const props = defineProps<{ zoneId: string }>()

// Cargamos los datos de la zona usando el ID de la prop
const zoneData = getZoneData(Number(props.zoneId))

// ------------------------------------------------
// Datos Iniciales (FASE 3 - Dinámico)
// ------------------------------------------------
const zoneName = ref(zoneData.zoneName)
const npcs = ref<Npc[]>(zoneData.npcs)
const entrenadoresOnline = ref<Trainer[]>(zoneData.trainers)

// ------------------------------------------------
// FASE 2: Estado 1 - Lista reactiva de NPCs
// ------------------------------------------------

let nextNpcId = 1 // Contador para visitantes

// IMPLEMENTACIÓN FASE 2: Agregar NPC visitante
const agregarNPCVisitante = () => {
  const newNpc: Npc = {
    nombre: `NPC Visitante ${nextNpcId++}`,
    rol: 'Visitante Temporal',
    // 🎯 SOLUCIÓN: Agregamos el spriteUrl requerido por la interfaz Npc
    spriteUrl: '/sprites/npc/guest_icon.png', // Usa una ruta de placeholder o un icono genérico
  }
  npcs.value.push(newNpc)
  console.log(`[LOBBY] Agregado nuevo NPC: ${newNpc.nombre}`)
}

// ------------------------------------------------
// FASE 2: Estado 2 - Entrenadores Online (Toggle)
// ------------------------------------------------

// Estado booleano para controlar la visibilidad (Switch ON/OFF)
const isEntrenadoresVisible = ref(true)

// IMPLEMENTACIÓN FASE 2: Toggle de visibilidad
const toggleEntrenadores = () => {
  isEntrenadoresVisible.value = !isEntrenadoresVisible.value
  console.log(`[LOBBY] Visibilidad de Entrenadores: ${isEntrenadoresVisible.value ? 'ON' : 'OFF'}`)
}

// ------------------------------------------------
// FASE 2: Estado 3 - Captura Pokémon (Mensaje)
// ------------------------------------------------

// Estado para el mensaje de captura
const captureMessage = ref('')

// IMPLEMENTACIÓN FASE 2: Iniciar Captura
const iniciarCaptura = () => {
  captureMessage.value = 'Buscando Pokémon salvaje…'
  console.log('[LOBBY] ¡Búsqueda de Pokémon iniciada!')
  // Se resetea el mensaje después de 4 segundos
  setTimeout(() => {
    captureMessage.value = ''
  }, 4000)
}

// Métodos de acción originales
const verMisiones = () => {
  alert(`Viendo Misiones de la zona ${props.zoneId}...`)
}

// ------------------------------------------------
// FASE 3: Pokémon Permitidos (Datos estáticos)
// ------------------------------------------------
const pokemonsPorZona: { [key: number]: string[] } = {
  1: ['Pidgey', 'Caterpie'], // cite: 3
  2: ['Geodude', 'Slugma'], // cite: 3
  3: ['Wingull', 'Electrike'], // cite: 3
}

const pokemonPermitidos = computed(
  () => pokemonsPorZona[Number(props.zoneId)] || ['No hay Pokémon registrados'],
)
</script>

<template>
  <div class="zone-lobby">
    <h1>Lobby de la zona {{ zoneName }} (ID: {{ props.zoneId }})</h1>

    <section class="pokemon-list">
      <h2>Pokémon Salvajes en la Zona</h2>
      <ul class="list-container">
        <li v-for="pokemon in pokemonPermitidos" :key="pokemon">
          {{ pokemon }}
        </li>
      </ul>
    </section>

    <section class="npc-list">
      <h2>NPCs de la Zona ({{ npcs.length }})</h2>
      <button
        class="action-button capture-btn"
        @click="agregarNPCVisitante"
        style="margin-bottom: 15px"
      >
        🟧 AGREGAR NPC VISITANTE
      </button>

      <ul class="list-container">
        <li v-for="npc in npcs" :key="npc.nombre">
          <span class="name">{{ npc.nombre }}</span>
          <span class="role">{{ npc.rol }}</span>
        </li>
      </ul>
    </section>

    <section class="trainer-list">
      <h2>Entrenadores en línea</h2>
      <button
        class="action-button capture-btn"
        @click="toggleEntrenadores"
        style="margin-bottom: 15px; background-color: #3f51b5"
      >
        Switch: {{ isEntrenadoresVisible ? 'ON' : 'OFF' }}
      </button>

      <ul class="list-container" v-if="isEntrenadoresVisible">
        <li v-for="e in entrenadoresOnline" :key="e.nombre">
          <span class="name">{{ e.nombre }}</span>
          <span :class="['state', { online: e.estado === 'Online' }]">{{ e.estado }}</span>
        </li>
      </ul>
      <p v-else style="text-align: center; font-style: italic">Lista de entrenadores oculta.</p>
    </section>

    <section class="quick-actions">
      <h2>Acciones Rápidas</h2>

      <button class="action-button capture-btn" @click="iniciarCaptura">
        <span class="icon">🟢</span> IR A CAPTURAR POKÉMON
      </button>
      <p v-if="captureMessage" style="text-align: center; font-weight: bold; color: #42b983">
        {{ captureMessage }}
      </p>

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
/* Estilos ajustados y unificados */

/* Título y elementos que abarcan el ancho completo */
.zone-lobby h1 {
  grid-column: 1 / -1;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px; /* Separación después del título principal */
}

/* Sección Pokémon pasa a ser la primera fila */
.pokemon-list {
  grid-column: 1 / -1;
  grid-row: 2 / 3; /* Ahora está en la segunda fila, después del H1 */
}

/* Contenedor principal de Grid */
.zone-lobby {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto auto; /* H1, Pokémon, NPC/Trainers/Actions */
  gap: 30px;
}

/* Ajuste de las secciones de abajo para empezar en la tercera fila */
.npc-list {
  grid-column: 1 / 2;
  grid-row: 3 / 4;
}
.trainer-list {
  grid-column: 2 / 3;
  grid-row: 3 / 4;
}
.quick-actions {
  grid-column: 3 / 4;
  grid-row: 3 / 4;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Estilos de bloques, headers y listas mantenidos */
section {
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s;
}
section:hover {
  transform: translateY(-5px);
}
h2 {
  color: #42b983;
  border-bottom: 2px solid #42b983;
  padding-bottom: 5px;
  margin-bottom: 15px;
  text-align: center;
}
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
.pokemon-list .list-container {
  display: flex;
  justify-content: center;
  gap: 30px;
  font-weight: bold;
  color: #2c3e50;
  margin-top: 10px;
}
.pokemon-list li {
  border: none;
}

/* Estilos de botones mantenidos */
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
