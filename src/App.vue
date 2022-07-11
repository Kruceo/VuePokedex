<template>

  <suspense>
    <template #default>
      <Cards></Cards>
    </template>
    <template #fallback>
      <div>
        <h2 style="font-size: 200px;">Loading pokemons...</h2>
      </div>
    </template>
  </suspense>

</template>

<script>
import Cards from "./components/Cards.vue";


//import { ref } from 'vue';



export default {
  name: "App",
  components: { Cards }
}
</script>

<style>
</style>
