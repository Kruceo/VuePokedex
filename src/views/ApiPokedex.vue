<template>
    <KeepAlive>
        <PokemonList :pokemons="getList()" :is="activeComponent" />
    </KeepAlive>

</template>

<script>

import PokemonList from '@/components/PokemonList.vue';



var pokemonList = JSON.parse('{"all":[]}');
async function genList(initialOffset, limit, times) {

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
                    "id": pokemonStats.id,
                    "img": pokemonStats.sprites.other.home.front_default,
                    "types": [pokemonStats.types[0].type.name, pokemonStats.types[1].type.name],
                    stats: {
                        "hp": pokemonStats.stats[0].base_stat,
                        "xp": pokemonStats.base_experience,
                        "atk": pokemonStats.stats[1].base_stat,
                        "def": pokemonStats.stats[2].base_stat,
                        "s-atk": pokemonStats.stats[3].base_stat,
                        "s-def": pokemonStats.stats[4].base_stat,
                        "speed": pokemonStats.stats[5].base_stat,

                        "weight": pokemonStats.weight,
                        "height": pokemonStats.height,
                    },
                    ab: pokemonStats.abilities,
                    moves: pokemonStats.moves,
                    "captured": false,
                    "imageChanged": false






                });
            }
            else {
                pokemonList['all'].push({
                    "name": pokemonStats.name,
                    "id": pokemonStats.id,
                    "img": pokemonStats.sprites.other.home.front_default,
                    "types": [pokemonStats.types[0].type.name],
                    stats: {
                        "hp": pokemonStats.stats[0].base_stat,
                        "atk": pokemonStats.stats[1].base_stat,
                        "def": pokemonStats.stats[2].base_stat,
                        "s-atk": pokemonStats.stats[3].base_stat,
                        "s-def": pokemonStats.stats[4].base_stat,
                        "speed": pokemonStats.stats[5].base_stat,
                        "xp": pokemonStats.base_experience,
                        "weight": pokemonStats.weight,
                        "height": pokemonStats.height,

                    },
                    ab: pokemonStats.abilities,
                    moves: pokemonStats.moves,
                    "captured": false,
                    "imageChanged": false
                });
                console.log(pokemonStats)
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

        data() {
            return {
                loaded: "false"
            }
        },
        methods:
        {

            getList() { return pokemonList.all },
        },
        async setup() {
            pokemonList = JSON.parse('{"all":[]}')

            await genList(0, 12, 1)


        },
        async mounted() {
            if (this.loaded == "false") {
                await genList(13, 75, 5)
                this.loaded = true;
            }
        }
    }
</script>