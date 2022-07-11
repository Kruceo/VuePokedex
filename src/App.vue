<template>

  <suspense>
    <template #default>
      <Cardsp></cardsp>

    </template>
    <template #fallback>
      <div>
        <h2 style="font-size: 200px;">Loading pokemons...</h2>
      </div>
    </template>
  </suspense>

</template>

<script>

import Cardsp from "./components/Cardsp.vue";


//import { ref } from 'vue';



export default {
  name: "App",
  components: { Cardsp }
}
</script>

<style lang="scss">
$primary: rgba(63, 63, 63, 0.267);
$secondary: #00ff1577;


@import 'bootstrap';
</style>