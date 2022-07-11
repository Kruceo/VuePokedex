<template>

    <nav class="navbar navbar-expand-lg navbar-light bg-dark mb-5">
        <div class="container-fluid">
            <a class="navbar-brand text-light" href="#">Pokedex</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="icon"><img src="../assets/search.png" style="width: 20px;"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">

                <div class="col-8"></div>
                <div class="col-4">
                    <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Search" v-model="pokesearch"
                            aria-label="Search">

                        <select class=" " v-model="typefilter" id="">
                            <option value="">All</option>
                            <option v-for="item in types" :key="item">{{ item }}</option>
                        </select>
                    </form>
                </div>

            </div>
        </div>
    </nav>

    <div class="container">



        <div class="row">


            <div class="col-12 col-sm-6 col-md-6 col-lg-3" v-for="card in pokemonFilteredList.slice(0, 30)" :key="card">


                <div class="card-wrapper">
                    <div class="content">
                        <div class="card-front mb-4" :style="{ 'background': colors[card.types[0]] }">
                            <div id="card-body">
                                <img v-bind:src="card.img" loading="lazy" class="card-img-top" alt="">
                                <div class="card-body">
                                    <h5 id="pokemonName" class="card-title ">{{ card.name }}</h5>
                                    <div class="row m-0">

                                        <div class="col-12 p-1" v-if="!card.types[1]">
                                            <div id="typeBox" class="rounded bg-primary">
                                                <p>{{ card.types[0] }}</p>
                                            </div>
                                        </div>
                                        <div class="col-12 col-sm-6 p-1" v-if="card.types[1]">
                                            <div id="typeBox" class=" rounded bg-primary">
                                                <p class="p-0">{{ card.types[0] }}</p>
                                            </div>
                                        </div>
                                        <div class="col-12 col-sm-6 p-1" v-if="card.types[1]">
                                            <div id="typeBox" class=" rounded bg-primary">
                                                <p class="p-0">{{ card.types[1] }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-back h-100 position-absolute mb-4"
                            :style="{ 'background': colors[card.types[0]] }">
                            <div id="card-body" class="h-100">

                                <div class="card-body overflow-x-scroll">

                                    <div class="row m-0">
                                        <CardStats title="STATS" text="rafola" :pokemon-stat="card.stats" />

                                        <div class="col-12 p-1">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CardStats from './cardStats.vue';


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
                    }

                });
            }





        }

        offset += limit;


        // pokemonList = JSON.parse(newList).all;
    }
    console.log(pokemonList)
}
var pokemonList = JSON.parse('{"all":[]}');
export default
    {
        name: "CardSp",


        props:
        {
            pokemons: Object
        },


        data() {
            return {


                pokesearch: "",
                typefilter: "",
                colors: {
                    grass: "#3a7b50 ",
                    steel: "#5b7c8d",
                    water: "#0abfbc",
                    fire: "#ef4335",
                    poison: "#036564",
                    electric: "#ffdc68",
                    ground: "#c1b398",
                    bug: "#928941",
                    fairy: "#f79eb1",
                    fighting: "#7b3b3b",
                    psychic: "#031634",
                    rock: "#5c5863",
                    ghost: "#473469",
                    ice: "lightblue",
                    dragon: "#770021",
                    dark: "#413249",
                },
                types: ["grass", "steel", "water", "fire", "poison", "electric", "ground", "bug", "fairy", "fighting", "psychic", "rock", "ghost", "ice", "dragon", "dark"],
            };
        },
        computed: {
            pokemonFilteredList() {
                return this.pokemons.filter((pokemon) => {
                    //console.log(pokemon.name);
                    return pokemon.name.toLowerCase().includes(this.pokesearch.toLowerCase())
                        && pokemon.types[0].includes(this.typefilter.toLocaleLowerCase())
                        || pokemon.name.toLowerCase().includes(this.pokesearch.toLowerCase())
                        && pokemon.types[1]
                        && pokemon.types[1].includes(this.typefilter.toLocaleLowerCase());
                });
            },
        },
        async setup() {
            await getPokemonList(0, 12, 1);
        },
        watch: {
            pokemonList: function () {
                this.pokemonFilteredList;
            }
        },
        async mounted() {
            // await getPokemonList(12, 100, 2);
        },
        components: { CardStats }
    }

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Karla:wght@300&display=swap');

* {
    font-family: "Karla";
}


#typeBox {
    text-align: center;
    font-size: 20px;
    height: fit-content;


    margin: 0 0;
    color: white;
}

#pokemonName {
    font-size: 25px;
    color: white;
    text-transform: uppercase;
}

#card-body {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}


.card-front,
.card-back {

    height: min-content;
    background-color: rgb(214, 214, 214);
    padding: 16px;
    border-radius: 2vw;
    left: 0;
    top: 0;
    backface-visibility: hidden;


}

.card-back {
    transform: rotateY(180deg);

}


.card-wrapper {
    width: fit-content;
    perspective: 1000px;
}


.content {
    position: relative;
    width: 100%;
    height: 100%;

    transform-style: preserve-3d;
    transform: rotateY(0);
    transition: transform 0.5s;

}

.card-wrapper:hover .content {
    z-index: 1;
    transform: rotateY(180deg);
    ;

    transition: transform 0.5s;

}
</style>

             



//import { ref } from 'vue';




    