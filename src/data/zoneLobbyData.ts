// src/data/zoneLobbyData.ts

// Interfaz para Personajes No Jugadores (NPCs)
export interface Npc {
  nombre: string
  rol: string
  spriteUrl: string // URL del sprite/foto del NPC
}

// Interfaz para Entrenadores Online
export interface Trainer {
  nombre: string
  estado: string // Ej: "Online", "Buscando batalla", "Ausente"
}

// Datos de NPCs de ejemplo
export const npcs: Npc[] = [
  { nombre: 'Profesor Oak', rol: 'Investigador', spriteUrl: 'professor-oak.png' },
  { nombre: 'Líder Brock', rol: 'Líder de Gimnasio', spriteUrl: 'brock.png' },
]

// Datos de Entrenadores Online de ejemplo
export const trainersOnline: Trainer[] = [
  { nombre: 'Player Alan', estado: 'Online' },
  { nombre: 'CodeMaster', estado: 'Buscando batalla' },
  { nombre: 'EntrenadorX', estado: 'En misión' },
]

// Función para simular la carga de datos de una zona específica
export const getZoneData = (zoneId: number) => {
  // Aquí podrías cargar datos reales basados en el ID.
  // Por ahora, devolvemos los mismos datos de ejemplo para cualquier zona.
  return {
    zoneName: `Zona ID: ${zoneId} - Bosque Épico`,
    npcs: npcs,
    trainers: trainersOnline,
  }
}
