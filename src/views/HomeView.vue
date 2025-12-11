<script setup lang="ts">
// 1. CAMBIO: Importar tu componente PokemonCard
import PokemonCard from '@/components/PokemonCard.vue' // Usa @/ para alias de src

// Datos para las props
const PIKACHU_SPRITE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
const CHARMANDER_SPRITE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png'
const BULBASAUR_SPRITE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
</script>

<template>
  <main>
    <h1>✅ Actividad 1: Tarjetas Pokémon</h1>

    <div class="card-container">
      <PokemonCard nombre="PIKACHU" :sprite="PIKACHU_SPRITE" tipo="ELÉCTRICO" />

      <PokemonCard nombre="CHARMANDER" :sprite="CHARMANDER_SPRITE" tipo="FUEGO" />

      <PokemonCard nombre="BULBASAUR" :sprite="BULBASAUR_SPRITE" tipo="PLANTA / VENENO" />
    </div>
  </main>
</template>

<style scoped>
/* Estilos para que las tarjetas se vean en fila */
.card-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
}
</style>
