<template>

  <suspense>
    <template #default>
      <MyPokedex />
    </template>
    <template #fallback>
      <div>
        <h2 style="font-size: 200px;">Loading pokemons...</h2>
      </div>
    </template>
  </suspense>

</template>

<script>


import MyPokedex from "./components/MyPokedex.vue";



//import { ref } from 'vue';



export default {
  name: "App",
  components: { MyPokedex }
}
</script>

<style lang="scss">
$primary: rgba(41, 41, 41, 0.267);
$secondary: #ffffff77;


@import 'bootstrap';
</style>