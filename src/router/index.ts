import { createRouter, createWebHistory } from 'vue-router'

// Importamos las vistas que hemos creado/necesitamos
import HomeView from '@/views/HomeView.vue' // Contiene la Actividad 1 (PokemonCard)

// Importamos las vistas de placeholder para las rutas requeridas
// NOTA: Asegúrate de que estos archivos existan en src/views/
const MapView = () => import('@/views/MapView.vue') // Contiene la Actividad 2 (ZoneCard)
const ZoneView = () => import('@/views/ZoneView.vue')
const MissionsView = () => import('@/views/MissionsView.vue')
const PvPView = () => import('@/views/PvPView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 1. HOME / RUTA RAÍZ: Aquí mostraremos la Actividad 1 (Tarjetas Pokémon)
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    // 2. /map → mapa principal
    {
      path: '/map',
      name: 'map',
      component: MapView,
    },

    // 3. /zone/:id → vista de zona (Ruta dinámica)
    {
      path: '/zone/:id',
      name: 'zone',
      component: ZoneView,
      props: true, // Permite que el 'id' sea pasado como una prop
    },

    // 4. /missions → misiones
    {
      path: '/missions',
      name: 'missions',
      component: MissionsView,
    },

    // 5. /pvp → combate
    {
      path: '/pvp',
      name: 'pvp',
      component: PvPView,
    },
  ],
})

export default router
