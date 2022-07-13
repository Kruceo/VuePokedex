<template>
    <FullStats :card="selectedPokemon" />
    <nav class="navbar navbar-expand-lg navbar-light bg-dark mb-5">
        <div class="container-fluid text-">
            <RouterLink to="/" style="text-decoration: none !important;">
                <a class="navbar-brand text-light ">PokedexAPI</a>
            </RouterLink>
            <RouterLink to="/mypokedex" style="text-decoration: none !important;">
                <a class="navbar-brand text-light">My Pokedex</a>
            </RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation" style=" background: white;">
                <span class="icon"><img src="../assets/search.png" style="width: 20px;"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">

                <div class="col-2 col-sm-4 col-md-4 col-lg-8"></div>
                <div class="col-10 col-sm-8 col-md-8 col-lg-4">
                    <form class="d-flex row">
                        <div class="col-8">
                            <input class="form-control me-2" type="search" id="search" placeholder="Search"
                                v-model="pokesearch" aria-label="Search"
                                style="border-radius:15px ; border: 0; background-color: #333;width: 100%; color: white;">
                        </div>
                        <div class="col-4">
                            <select class=" " v-model="typefilter" id=""
                                style="border-radius:15px ; border: 0;background-color: #333; color: white; height: 100%;">
                                <option value="">All</option>
                                <option v-for="item in types" :key="item" style="text-transform: uppercase;">{{ item }}
                                </option>
                            </select>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </nav>
    <div class="container p-2"
        style="border: 1px solid #222; border-radius: 15px; background-color: rgb(222, 222, 222);">
        <div class="row">
            <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"
                v-for="card in pokemonFilteredList.slice(0, pagination)" :key="card">
                <div class="card-wrapper">
                    <div class="content">
                        <div class="card-front mb-4" :style="{ 'background': colors[card.types[0]] }">
                            <div id="card-body" style=" min-height: 480px; min-width: 230px;">
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
                                        <CardStats title="STATS" text="stats" :pokemon-stat="card.stats" />
                                    </div>
                                    <div class="row">
                                        <div class="col-6 p-1" v-if="card.types[1]">
                                            <div id="info" class="text-center">
                                                <button @click="setTypeFilter(card.types[0])" type="button"
                                                    class="btn m-0 p-0 text-uppercase"
                                                    style="width: 100%;background-color: rgb(52, 52, 52);color: white;border:0 ; border-radius: 5px; font-size: 18px;">
                                                    {{ card.types[0] }}</button>
                                            </div>
                                        </div>
                                        <div class="col-6 p-1" v-if="card.types[1]">
                                            <div id="info" class="text-center">
                                                <button @click="setTypeFilter(card.types[1])" type="button"
                                                    class="btn m-0 p-0"
                                                    style="width: 100%;background-color: rgb(52, 52, 52);color: white;border:0 ; border-radius: 5px; font-size: 18px;">
                                                    {{ card.types[1] }}</button>
                                            </div>
                                        </div>
                                        <div class="col-12 p-1" v-if="!card.types[1]">
                                            <div id="info" class="text-center">
                                                <button @click="setTypeFilter(card.types[0])" type="button"
                                                    class="btn m-0 p-0"
                                                    style="width: 100%;background-color: rgb(52, 52, 52);color: white;border:0 ; border-radius: 5px; font-size: 18px;">
                                                    {{ card.types[0] }}</button>
                                            </div>
                                        </div>
                                        <div class="col-12 p-1">
                                            <div v-if="card.captured == false" id="info" class="text-center">
                                                <button @click="savePokemon(card)"
                                                    style="width: 100%;background-color: rgb(100, 220, 100);color: white;border:0 ; border-radius: 5px; font-size: 18px;">CAPTURE</button>
                                            </div>
                                        </div>
                                        <div class="col-12 p-1">
                                            <div v-if="card.captured == true" id="info" class="text-center">
                                                <button @click="deletePokemon(card)"
                                                    style="width: 100%;background-color: rgb(120, 0, 0);color: white;border:0 ; border-radius: 5px; font-size: 18px;">REMOVE</button>
                                            </div>
                                        </div>
                                        <div class="col-12 p-1">
                                            <div id="info" class="text-center">
                                                <button @click="selectPokemonToInfo(card)" type="button"
                                                    class="btn btn-primary m-0 p-0" data-bs-toggle="modal"
                                                    data-bs-target="#extraStats"
                                                    style="width: 100%;background-color: rgb(0, 122, 122);color: white;border:0 ; border-radius: 5px; font-size: 18px;">SHOW
                                                    MORE</button>
                                            </div>
                                        </div>
                                        <div class="col-6 p-1">
                                            <div id="info" class="text-center">
                                                <button v-if="card.imageChanged == true" @click="removeImage(card)"
                                                    type="button" class="btn btn-primary m-0 p-0"
                                                    style="width: 100%;background-color: rgb(0, 52, 122);color: white;border:0 ; border-radius: 5px; font-size: 18px;">Remove
                                                    Image</button>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="p-1">
                                                <input class="form-control" type="file" id="formFile" accept="image/*"
                                                    v-if="card.captured == true"
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
        <div id="info" class="text-center" v-if="Object.keys(pokemonFilteredList).length > 12">

            <div class="row">
                <div class="col-12">
                    <button @click="addPages(12)" type="button" class="btn btn-primary m-0 p-0"
                        style="width: 20%;height: 60px ;background-color: rgb(0, 52, 122);color: white;border:0 ; border-radius: 5px; font-size: 18px;">Load
                        More</button>
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
                pagination: 12,
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
        },
        mounted() {
            window.addEventListener('scroll', () => { this.addPages(0) })
        },


        computed: {
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

            filterToDel(filterString) {
                return this.allPokemon.filter((pokemon) => {
                    if (pokemon.name != filterString) {
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
                    localStorage.setItem("pokemons", pokedexString);

                    this.$notify(
                        {
                            title: "GOTCHA!",
                            text: "Pokemon captured! - " + newPokemon.name,
                            type: "success"

                        })
                }

                else {
                    this.$notify(
                        {
                            title: "BAD!",
                            text: "Nothing here",
                            type: "error",

                        })
                }

            },
            savePokemonAPI(newPokemon) {
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
                    localStorage.setItem("pokemons", pokedexString);
                    this.allPokemon = pokedex;
                }
            },
            deletePokemon(delPokemon) {

                const pokedex = this.filterToDel(delPokemon.name)
                const pokedexString = JSON.stringify(pokedex);
                localStorage.setItem("pokemons", pokedexString);
                this.allPokemon = pokedex;
                this.$notify(
                    {
                        title: "Bye friend",
                        text: "Removed - " + delPokemon.name,
                        type: "error",

                    })
            },
            deletePokemonAPI(delPokemon) {

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
                    localStorage.setItem(cardIMG.name, cardIMG.img)
                    cardIMG.img = rawImg;
                    cardIMG.imageChanged = true
                    var newPokemon = Object.assign({}, cardIMG)
                    this.deletePokemonAPI(cardIMG)
                    this.savePokemonAPI(newPokemon)


                }
                reader.readAsDataURL(file);
            },
            removeImage(cardIMG) {

                cardIMG.img = localStorage.getItem(cardIMG.name)
                cardIMG.imageChanged = false
            },

            scrollTo(ele) {
                document.querySelector(ele).scroll({
                    top: 100,
                    left: 0,
                    behavior: 'smooth'
                });
            },
            selectPokemonToInfo(cardToInfo) {

                this.selectedPokemon = cardToInfo;

            },
            addPages(num) {
                this.pagination += num;
                this.pokesearch = ' ';
                this.pokesearch = '';
            },

            setTypeFilter(typeFilter) {
                console.log(typeFilter);
                this.typefilter = typeFilter;
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
 
     transition: transform 00.5s;
 
 }
 
 #search::placeholder {
     color: white;
 }
 </style>





                                     




