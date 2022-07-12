<template>
  <notifications classes="my-notification" position="bottom right" width="400" />
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

<style lang="scss">
.my-notification {


  .notification-title {}

  // style for content
  .notification-content {}

  // additional styling hook when usingtype parameter, i.e. this.$notify({ type: 'success', message: 'Yay!' })
  &.success {
    background-color: rgb(28, 116, 19);
    border-radius: 15px;
    padding: 10px;
    margin: 5px;
    font-size: 20px;
    border: 0;
    color: white;

  }

  &.info {}

  &.error {
    background-color: rgb(149, 0, 0);
    border-radius: 15px;
    padding: 10px;
    margin: 5px;
    font-size: 20px;
    border: 0;
    color: white;
  }
}
</style>
