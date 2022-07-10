<template>

  <suspense>
    <template #default>
      <Cards></Cards>
    </template>
    <template #fallback>
      loading
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
