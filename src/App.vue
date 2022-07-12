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
$primary: #455;
$secondary: #ffffff77;


@import 'bootstrap';
</style>