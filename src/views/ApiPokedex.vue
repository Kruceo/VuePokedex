<template>

    <PokemonList :pokemons="getList()" />



    <h2>BOIOLA</h2>

</template>

<script>

import PokemonList from '@/components/PokemonList.vue';



var pokemonList = JSON.parse('{"all":[]}');
async function getPokemonList(initialOffset, limit, times) {

    var offset = initialOffset;
    for (var i = 0; i < times; i++) {
        let resp = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=' + limit + '&offset=' + offset);
        let list = await resp.json();
        let firstList = list.results;
        // var newList = '{"all":[]}';
        //var obj = pokemonList
        for (let i of firstList) {


            let resp = await fetch(i.url);
            let pokemonStats = await resp.json();

            if (pokemonStats.types[1]) {
                pokemonList["all"].push({
                    "name": pokemonStats.name,
                    "img": pokemonStats.sprites.other.home.front_default,
                    "types": [pokemonStats.types[0].type.name, pokemonStats.types[1].type.name],
                    stats: {
                        "hp": pokemonStats.stats[0].base_stat,
                        "atk": pokemonStats.stats[1].base_stat,
                        "def": pokemonStats.stats[2].base_stat,
                        "satk": pokemonStats.stats[3].base_stat,
                        "sdef": pokemonStats.stats[4].base_stat,
                        "speed": pokemonStats.stats[5].base_stat,
                        "xp": pokemonStats.base_experience,
                        "weight": pokemonStats.weight,
                    },
                    "captured": false,



                });
            }
            else {
                pokemonList['all'].push({
                    "name": pokemonStats.name,
                    "img": pokemonStats.sprites.other.home.front_default,
                    "types": [pokemonStats.types[0].type.name],
                    stats: {
                        "hp": pokemonStats.stats[0].base_stat,
                        "atk": pokemonStats.stats[1].base_stat,
                        "def": pokemonStats.stats[2].base_stat,
                        "satk": pokemonStats.stats[3].base_stat,
                        "sdef": pokemonStats.stats[4].base_stat,
                        "speed": pokemonStats.stats[5].base_stat,
                        "xp": pokemonStats.base_experience,
                        "weight": pokemonStats.weight,

                    },
                    "captured": false,


                });
            }
        }

        offset += limit;



    }
    console.log(pokemonList)
}

export default
    {
        name: "ApiPokedex",
        props: {},
        components: { PokemonList },

        methods:
        {
            getList() { return pokemonList.all },
        },
        async setup() {

            await getPokemonList(0, 10, 1)

        },
        async mounted() {
            await getPokemonList(10, 10, 5)
        }
    }
</script>