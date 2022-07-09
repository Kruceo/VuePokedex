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
* {
  margin: 0 0;
}

body {
  background-color: #2c3e50;
  widows: 100vw;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  display: flex;
  justify-content: center;
}

#card {
  border-radius: 10px;
  background-color: rgb(179, 179, 179);
  transform: scale(1);
  transition: transform 0.2s;
}

#card:hover {
  transform: scale(1.06);
  transition: transform 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955);
}

#type {
  --types_width: 48.5%;
  width: 100%;
  height: fit-content;
  padding-top: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

}



#type>div:nth-child(1) {

  font-size: 12px;
  width: var(--types_width);
  border-radius: 5px;
  padding-top: 5px;

  background-color: lavender;
  border-bottom: 2px solid rgba(0, 0, 0, .25);
  margin-right: calc(50% - var(--types_width));

}

#type>div:nth-child(2) {
  font-size: 12px;
  width: var(--types_width);
  border-radius: 5px;
  padding-top: 5px;

  background-color: lavender;
  border-bottom: 2px solid rgba(0, 0, 0, .25);
  margin-left: calc(50% - var(--types_width));


}

#Table {
  width: fit-content;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-row: 4;
  grid-column: 4;
  background-color: rgb(37, 37, 37);
  padding: 7px;

}

#table>* {}
</style>
