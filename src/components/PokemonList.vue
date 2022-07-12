<template>

    <nav class="navbar navbar-expand-lg navbar-light bg-dark mb-5">
        <div class="container-fluid">
            <RouterLink to="/">
                <a class="navbar-brand text-light" href="#">pokedexAPI}</a>
            </RouterLink>
            <RouterLink to="/mypokedex">
                <a class="navbar-brand text-light" href="#">My Pokedex</a>
            </RouterLink>
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
                            aria-label="Search" style="border-radius:15px ; border: 0;">

                        <select class=" " v-model="typefilter" id="" style="border-radius:15px ; border: 0;">
                            <option value="">All</option>
                            <option v-for="item in types" :key="item" style="text-transform: uppercase;">{{ item }}
                            </option>
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
                                    </div>
                                    <div class="row">
                                        <div class="col-12 p-1">

                                            <div v-if="card.captured == false" id="info" class="text-center">
                                                <button @click="savePokemon(card)"
                                                    style="background-color: rgb(100, 220, 100);color: white;border:0 ; border-radius: 5px; font-size: 22px;">CAPTURAR</button>

                                            </div>

                                        </div>
                                        <div class="col-12 p-1">
                                            <div v-if="card.captured == true" id="info" class="text-center">
                                                <button @click="deletePokemon(card)"
                                                    style="background-color: rgb(120, 0, 0);color: white;border:0 ; border-radius: 5px; font-size: 22px;">DELETAR</button>
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
    </div>
</template>

<script>
import CardStats from './CardStats.vue';

export default
    {
        name: "PokemonList",
        props:
        {
            pokemons: Object,
        },
        data() {
            return {

                allPokemon: this.pokemons,
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
                return this.allPokemon.filter((pokemon) => {
                    //console.log(pokemon.name);
                    return pokemon.name.toLowerCase().includes(this.pokesearch.toLowerCase())
                        && pokemon.types[0].includes(this.typefilter.toLocaleLowerCase())
                        || pokemon.name.toLowerCase().includes(this.pokesearch.toLowerCase())
                        && pokemon.types[1]
                        && pokemon.types[1].includes(this.typefilter.toLocaleLowerCase());
                });
            },



        }
        ,
        methods:
        {
            clone(itemToClone) {
                return itemToClone;
            },

            filterToDel(filterString) {
                return this.allPokemon.filter((pokemon) => {

                    if (pokemon.name != filterString) {
                        console.log(pokemon.name + ' % ' + filterString);
                        return pokemon;
                    }
                });
            },
            savePokemon(newPokemon) {
                var test = JSON.parse(localStorage.getItem('pokemons')).filter((pok) => { return pok.name.includes(newPokemon.name) })


                if (!test[0]) {
                    const local = localStorage.getItem("pokemons");
                    const saved = local ? JSON.parse(local) : [];
                    const pokemonToAdd = Object.assign({}, newPokemon)

                    console.log(pokemonToAdd)
                    pokemonToAdd.captured = true;
                    const pokedex = [...saved, pokemonToAdd];
                    const pokedexString = JSON.stringify(pokedex);
                    localStorage.setItem("pokemons", pokedexString);

                    console.log(newPokemon)
                }
            },
            deletePokemon(delPokemon) {
                //const local = localStorage.getItem("pokemons");
                //const saved = local ? JSON.parse(local) : [];
                console.log('deleted -> ' + delPokemon.name);
                const pokedex = this.filterToDel(delPokemon.name)
                const pokedexString = JSON.stringify(pokedex);
                localStorage.setItem("pokemons", pokedexString);
                this.allPokemon = pokedex;
            }
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




    