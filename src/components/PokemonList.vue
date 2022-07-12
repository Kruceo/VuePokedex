<template>



    <FullStats :card="selectedPokemon" />

    <nav class="navbar navbar-expand-lg navbar-light bg-dark mb-5">
        <div class="container-fluid text-">
            <RouterLink to="/">
                <a class="navbar-brand text-light " href="#">pokedexAPI</a>
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

    <div class="container p-2"
        style="border: 1px solid #222; border-radius: 15px; background-color: rgb(222, 222, 222);">
        <div class="row">
            <div class="col-12 col-sm-6 col-md-6 col-lg-3" v-for="card in pokemonFilteredList.slice(0, 30)" :key="card">
                <div class="card-wrapper">
                    <div class="content">
                        <div class="card-front mb-4" :style="{ 'background': colors[card.types[0]] }">
                            <div id="card-body" style="min-width: 220px; min-height: 440px;">
                                <div class="row">
                                    <div class="col-12">
                                        <div style="overflow:hidden; height: max-content;">
                                            <img v-bind:src="card.img" loading="lazy" class="card-img-top"
                                                style="width: 100%;">
                                        </div>
                                    </div>
                                </div>
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
                            <div id="card-body" class="h-100" style="overflow:hidden">

                                <div class="card-body">

                                    <div class="row m-0">
                                        <CardStats title="STATS" text="rafola" :pokemon-stat="card.stats" />
                                    </div>
                                    <div class="row">
                                        <div class="col-12 p-1">

                                            <div v-if="card.captured == false" id="info" class="text-center">
                                                <button @click="savePokemon(card)"
                                                    style="width: 50%;background-color: rgb(100, 220, 100);color: white;border:0 ; border-radius: 5px; font-size: 18px;">CAPTURAR</button>

                                            </div>
                                            <div v-if="card.captured == true" id="info" class="text-center">
                                                <button @click="deletePokemon(card)"
                                                    style="width: 50%;background-color: rgb(120, 0, 0);color: white;border:0 ; border-radius: 5px; font-size: 18px;">DELETAR</button>
                                            </div>
                                        </div>
                                        <div class="col-12 p-1">
                                            <div id="info" class="text-center">

                                                <button @click="selectPokemonToInfo(card)" type="button"
                                                    class="btn btn-primary m-0 p-0" data-bs-toggle="modal"
                                                    data-bs-target="#extraStats"
                                                    style="width: 50%;background-color: rgb(120, 122, 122);color: white;border:0 ; border-radius: 5px; font-size: 18px;">INFO</button>
                                            </div>
                                        </div>
                                        <div class="col-12">

                                            <div class="p-1">

                                                <input class="form-control" type="file" id="formFile"
                                                    v-on:change="imageUploaded($event, card)">
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
import FullStats from './FullStats.vue';



export default
    {
        name: " PokemonList",
        props: { pokemons: Object, }
        , data() {
            return {
                allPokemon: this.pokemons,
                selectedPokemon: [],
                pokesearch: "",
                typefilter: "",
                colors: {
                    grass: "#3a7b50 ", steel: "#5b7c8d",
                    water: "#0abfbc", fire: "#ef4335", poison: "#036564", electric: "#ffdc68"
                    , ground: "#c1b398", bug: "#928941", fairy: "#f79eb1",
                    fighting: "#7b3b3b", psychic: "#031634", rock: "#5c5863",
                    ghost: "#473469", ice: "lightblue", dragon: "#770021", dark: "#413249",
                }, types: ["grass", "steel", "water", "fire", "poison", "electric"
                    , "ground", "bug", "fairy", "fighting", "psychic", "rock", "ghost"
                    , "ice", "dragon", "dark"],
            };
        }, computed: {
            pokemonFilteredList() {
                return this.allPokemon.filter((pokemon) => {

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
                const local = localStorage.getItem("pokemons");
                const saved = local ? JSON.parse(local) : [];
                let test = saved.filter((pok) => {
                    return pok.name.includes(newPokemon.name)
                })
                if (!test || !test[0]) {



                    const pokemonToAdd = Object.assign({}, newPokemon)

                    pokemonToAdd.captured = true;
                    const pokedex = [...saved, pokemonToAdd];
                    const pokedexString = JSON.stringify(pokedex);
                    localStorage.setItem("pokemons", pokedexString); console.log(pokemonToAdd)
                    console.log(pokedex);
                }

                //}

            },
            deletePokemon(delPokemon) {
                //const local = localStorage.getItem("pokemons");
                //const saved = local ? JSON.parse(local) : [];
                console.log('deleted -> ' + delPokemon.name);
                const pokedex = this.filterToDel(delPokemon.name)
                const pokedexString = JSON.stringify(pokedex);
                localStorage.setItem("pokemons", pokedexString);
                this.allPokemon = pokedex;
            },
            imageUploaded(event, cardIMG) {
                var file
                if (event.target.files[0]) {
                    file = event.target.files[0]
                }
                const reader = new FileReader();
                let rawImg;
                reader.onloadend = () => {
                    rawImg = reader.result;
                    localStorage.setItem(cardIMG.name, rawImg)
                    cardIMG.img = rawImg;

                    var newPokemon = Object.assign({}, cardIMG)
                    this.deletePokemon(cardIMG)
                    this.savePokemon(newPokemon)
                    console.log(cardIMG.img);
                }


                reader.readAsDataURL(file);
            },

            scrollTo(ele) {
                document.querySelector(ele).scroll({
                    top: 100,
                    left: 0,
                    behavior: 'smooth'
                });
            },
            selectPokemonToInfo(cardToInfo) {
                console.log(cardToInfo);
                this.selectedPokemon = cardToInfo;

            }
        },


        components: { CardStats, FullStats }
    }

</script>

 <style>
 @import url('https://fonts.googleapis.com/css2?family=Karla:wght@300&display=swap');
 
 * {
     text-decoration: none;
     font-family: "Karla";
 }
 
 body {
     background-color: #ffffff;
 }
 
 #typeBox {
     text-align: center;
     font-size: 20px;
     height: fit-content;
 
 
     margin: 0 0;
     color: white;
 }
 
 #pokemonName {
 
     transform-style: preserve-3d;
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
     border-radius: 15px;
     border: 1px solid black;
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
 
     transition: transform 1.5s;
 
 }
 </style>





                                        //import { ref } from 'vue';




