<script setup lang="ts">
// 1. Definición de la interfaz (TypeScript) para las propiedades (Props)
interface Props {
  nombre: string
  sprite: string
  tipo: string
}

// 2. Definición y recepción de las props usando defineProps (setup script)
const props = defineProps<Props>()
</script>

<template>
  <div class="pokemon-card" :data-tipo="props.tipo">
    <img :src="props.sprite" :alt="props.nombre" />

    <h2 class="pokemon-name">{{ props.nombre }}</h2>

    <p class="tipo-label">
      TIPO: <span class="tipo-value">{{ props.tipo }}</span>
    </p>
  </div>
</template>

<style scoped>
/* ------------------------------------------------ */
/* 4. Estilos básicos y corrección de visibilidad */
/* ------------------------------------------------ */

.pokemon-card {
  border: 4px solid #333; /* Borde base */
  border-radius: 12px;
  padding: 10px;
  margin: 10px;
  width: 200px; /* Ancho fijo para las tarjetas */
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
  /* CAMBIO CLAVE: Fondo blanco/claro para asegurar la lectura del texto */
  background-color: white;
}

.pokemon-card:hover {
  transform: translateY(-5px);
}

.pokemon-card img {
  width: 100px; /* Tamaño del sprite */
  height: 100px;
}

/* 🟢 CORRECCIÓN 1: Estilo para el nombre (h2) */
.pokemon-name {
  font-size: 1.5em;
  margin: 5px 0 10px;
  font-weight: 900; /* Más negrita */
  color: #222; /* Color muy oscuro para alto contraste */
}

/* Estilo para la etiqueta 'TIPO:' */
.tipo-label {
  font-size: 0.9em;
  color: #555; /* Gris para la etiqueta */
  margin-bottom: 5px;
}

/* 🟢 CORRECCIÓN 2: Estilo para el valor del tipo (span.tipo-value) */
.tipo-value {
  /* Estilo base, se sobrescribe por los estilos condicionales */
  background-color: #ccc;
  color: #333;
  padding: 4px 8px;
  border-radius: 6px;
  display: inline-block;
  font-weight: bold;
  text-transform: uppercase; /* Opcional: para que se vea como en la imagen de ejemplo */
}

/* ------------------------------------------------ */
/* ESTILOS CONDICIONALES POR TIPO (Mejor Contraste) */
/* ------------------------------------------------ */

/* Ejemplo Pikachu (Eléctrico) */
.pokemon-card[data-tipo*='ELÉCTRICO'] {
  border: 4px solid gold;
  background-color: #fffacd; /* Amarillo muy pálido */
}
.pokemon-card[data-tipo*='ELÉCTRICO'] .tipo-value {
  background-color: gold;
  color: #333; /* Texto oscuro */
}

/* Ejemplo Charmander (Fuego) */
.pokemon-card[data-tipo*='FUEGO'] {
  border: 4px solid #ff4500; /* Naranja rojizo */
  background-color: #ffeadf; /* Naranja muy pálido */
}
.pokemon-card[data-tipo*='FUEGO'] .tipo-value {
  background-color: #ff4500;
  color: white;
}

/* Ejemplo Bulbasaur (Planta/Veneno) */
.pokemon-card[data-tipo*='PLANTA'] {
  border: 4px solid #008000; /* Verde oscuro */
  background-color: #e0fae0; /* Verde muy pálido */
}
.pokemon-card[data-tipo*='PLANTA'] .tipo-value {
  background-color: #008000;
  color: white;
}
</style>
