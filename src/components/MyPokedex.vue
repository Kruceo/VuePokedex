<template>
    <Cardsp :pokemons="getList()" />

</template>

<script>
import Cardsp from './CardSp.vue';
import lista from '../assets/lista.json'

export default
    {
        name: "MyPokedex",
        props: {},
        components: { Cardsp },

        methods:
        {
            getList() { return lista }
        }


    }
</script>