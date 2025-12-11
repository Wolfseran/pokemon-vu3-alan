// src/data/mapData.ts

// 1. Interfaz para definir la estructura de una Zona
export interface Zone {
  id: number // Identificador numérico
  nombre: string // Nombre de la zona
  desbloqueado: boolean // Estado de la zona
  sprite: string // URL del icono de la zona (ejemplo)
}

// 2. Array con los datos de las zonas (const zonas = [...])
export const zonas: Zone[] = [
  { id: 1, nombre: 'Bosque Verdoso', desbloqueado: true, sprite: '🌳' }, // Primera zona desbloqueada
  { id: 2, nombre: 'Cueva Ígnea', desbloqueado: false, sprite: '🌋' }, // Segunda zona bloqueada
  { id: 3, nombre: 'Costa Tormentosa', desbloqueado: false, sprite: '🌊' }, // Tercera zona bloqueada
  { id: 4, nombre: 'Ruinas Antiguas', desbloqueado: false, sprite: '🏛️' },
  { id: 5, nombre: 'Volcán Magma', desbloqueado: false, sprite: '🔥' },
]
