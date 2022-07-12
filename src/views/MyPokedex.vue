<template>
    <PokemonList :pokemons="myPokemons" />
</template>

<script>
import PokemonList from '@/components/PokemonList.vue';


export default
    {
        name: "MyPokedex",
        data() {
            return {
                myPokemons: this.getList()

            }
        },

        components: { PokemonList },

        methods:
        {
            getList() {
                const local = localStorage.getItem("pokemons");
                const saved = local ? JSON.parse(local) : [];

                return saved

            },
        }


    }
</script>