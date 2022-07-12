<template>
  <Suspense>
    <router-view />
  </Suspense>
</template>

<script>


export default {
  name: "App",

}
</script>

<style lang="scss">
$primary: rgba(41, 41, 41, 0.267);
$secondary: #ffffff77;


@import 'bootstrap';
</style>