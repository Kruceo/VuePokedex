<template>

    <div style="display: flex; justify-content: center">
        <header style="width: fit-content;">
            <div style="display: flex">
                <input type="text" v-model="pokesearch"
                    style="display: flex; border-radius: 2vw; width: 50%; height: 7vh; font-size: 3vh; padding-inline: 2vw; border: 0;"
                    placeholder="Pesquise um pokemon!" />



                <select v-model="typefilter">
                    <option value="">All</option>
                    <option v-for="type in types" :key="type.id">{{ type }}</option>
                </select>

            </div>

            <header id="table" style="background-color: gray; border-radius: 10px; margin-top: 5vh;">

                <header id="card-grid">
                    <div id="card-hitbox" v-for="card in pokemonFilteredList.slice(0, 20)" :key="card.id">
                        <div id="card">
                            <div id="card-front" :style="{ 'background': colors[card.types[0]] }">

                                <div>
                                    <div style="display: flex; justify-content: center; align-items: center;">
                                        <div id="poke-image"
                                            style="overflow: hidden; width: 14vw; height: 14vw; background-color: white; border-radius: 10px;">
                                            <img v-bind:src="card.img" style="width: 14vw; height: 14vw">
                                        </div>
                                    </div>
                                    <h2 id="name" style="font-size: 1.5vw; height: 3.5vw; overflow-y: hidden;">{{
                                            card.name
                                    }}</h2>
                                </div>
                                <div id="type">
                                    <div :style="
                                    [!card.types[1] ? { 'width': '100%' } : {}]">
                                        <h2>{{ card.types[0] }}</h2>

                                    </div>
                                    <div v-if="card.types[1]">
                                        <h2>{{ card.types[1] }}</h2>


                                    </div>
                                </div>
                            </div>
                            <div id="card-back" :style="{ 'background': colors[card.types[0]] }">

                                <div>
                                    <div
                                        style=" width: 14vw;display: flex; justify-content: center; align-items: center;">
                                        <div id="pokemon-info"
                                            style="overflow: hidden;width: 14vw; height: max-content; background-color: rgba(30, 30, 30, 0.15); border-radius: 10px; text-align: left; padding: 1vw;">
                                            <h2 style="font-size: 1.5vw; width:fit-content; color: white">HP: {{ card.hp
                                            }}</h2>
                                            <h2 style="font-size: 1.5vw;width:fit-content; color: white">ATK: {{
                                                    card.attk
                                            }}</h2>
                                            <h2 style="font-size: 1.5vw;width:fit-content; color: white">DEF: {{
                                                    card.def
                                            }}</h2>
                                            <h2 style="font-size: 1.5vw;width:fit-content; color: white">SATK: {{
                                                    card.satk
                                            }}</h2>
                                            <h2 style="font-size: 1.5vw;width:fit-content; color: white">SDEF: {{
                                                    card.sdef
                                            }}</h2>
                                            <h2 style="font-size: 1.5vw;width:fit-content; color: white;">SPEED: {{
                                                    card.speed
                                            }}</h2>
                                        </div>
                                    </div>

                                </div>
                                <div id="type">

                                </div>
                            </div>
                        </div>
                    </div>


                </header>
            </header>
        </header>
    </div>
</template>

<script>

var pokemonList = JSON.parse('{"all":[]}');
export default
    {
        name: "App",
        data() {
            return {
                pokesearch: '',
                typefilter: '',
                colors: {
                    grass: '#3a7b50 ',
                    steel: '#5b7c8d',
                    water: '#0abfbc',
                    fire: '#ef4335',
                    poison: '#036564',
                    electric: '#ffdc68',
                    ground: '#c1b398',
                    bug: '#928941',
                    fairy: 'pink',
                    fighting: '#7b3b3b',
                    psychic: '#031634',
                    rock: '#5c5863',
                    ghost: 'darkslateblue',
                    ice: 'lightblue',
                    dragon: 'tomato',
                    dark: '#413249',

                },
                types: ['grass', 'steel', 'water', 'fire', 'poison', 'electric', 'ground', 'bug', 'fairy', 'fighting', 'psychic', 'rock', 'ghost', 'ice', 'dragon', 'dark'],



            }
        },



        computed: {
            pokemonFilteredList() {

                return pokemonList.all.filter((pokemon) => {

                    //console.log(pokemon.name);

                    return pokemon.name.toLowerCase().includes(this.pokesearch.toLowerCase()) && pokemon.types[0].includes(this.typefilter.toLocaleLowerCase()) || pokemon.name.toLowerCase().includes(this.pokesearch.toLowerCase()) && pokemon.types[1] && pokemon.types[1].includes(this.typefilter.toLocaleLowerCase())


                })
            },
        },


        async setup() {
            var limit = 24;
            var offset = 0;
            //var jutar = {};

            for (var i = 0; i < 1; i++) {
                let resp = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=' + limit + '&offset=' + offset);
                let list = await resp.json();
                let firstList = list.results;
                // var newList = '{"all":[]}';
                //var obj = pokemonList
                for (let i of firstList) {

                    // if (JSON.stringify(i.name).includes(this.search)) { console.log('boa') }
                    let resp = await fetch(i.url);
                    let pokemonStats = await resp.json();
                    if (pokemonStats.types[1]) {
                        pokemonList["all"].push({
                            "name": pokemonStats.name,
                            "img": pokemonStats.sprites.other.home.front_default,
                            "types": [pokemonStats.types[0].type.name, pokemonStats.types[1].type.name],
                            "hp": pokemonStats.stats[0].base_stat,
                            "attk": pokemonStats.stats[1].base_stat,
                            "def": pokemonStats.stats[2].base_stat,
                            "satk": pokemonStats.stats[3].base_stat,
                            "sdef": pokemonStats.stats[4].base_stat,
                            "speed": pokemonStats.stats[5].base_stat,


                        });
                    }
                    else {
                        pokemonList['all'].push({
                            "name": pokemonStats.name,
                            "img": pokemonStats.sprites.other.home.front_default,
                            "types": [pokemonStats.types[0].type.name],
                            "hp": pokemonStats.stats[0].base_stat,
                            "attk": pokemonStats.stats[1].base_stat,
                            "def": pokemonStats.stats[2].base_stat,
                            "satk": pokemonStats.stats[3].base_stat,
                            "sdef": pokemonStats.stats[4].base_stat,
                            "speed": pokemonStats.stats[5].base_stat,


                        });
                    }





                }

                offset += limit;
                console.log(pokemonList)
                setTimeout(() => console.log("test"), 5000)
                // pokemonList = JSON.parse(newList).all;
            }

            // var pokemonList = JSON.parse(newList).all

            //return { pokemonList }

        },

        watch: {

            pokemonList: function () {
                this.pokemonFilteredList;
            }

        },

        async mounted() {


            var limit = 200;
            var offset = 0;
            //var jutar = {};

            for (var i = 0; i < 5; i++) {
                let resp = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=' + limit + '&offset=' + offset);
                let list = await resp.json();
                let firstList = list.results;
                // var newList = '{"all":[]}';
                //var obj = pokemonList
                for (let i of firstList) {

                    // if (JSON.stringify(i.name).includes(this.search)) { console.log('boa') }
                    let resp = await fetch(i.url);
                    let pokemonStats = await resp.json();
                    if (pokemonStats.types[1]) {
                        pokemonList["all"].push({
                            "name": pokemonStats.name,
                            "img": pokemonStats.sprites.other.home.front_default,
                            "types": [pokemonStats.types[0].type.name, pokemonStats.types[1].type.name],
                            "hp": pokemonStats.stats[0].base_stat,
                            "attk": pokemonStats.stats[1].base_stat,
                            "def": pokemonStats.stats[2].base_stat,
                            "satk": pokemonStats.stats[3].base_stat,
                            "sdef": pokemonStats.stats[4].base_stat,
                            "speed": pokemonStats.stats[5].base_stat,


                        });
                    }
                    else {
                        pokemonList['all'].push({
                            "name": pokemonStats.name,
                            "img": pokemonStats.sprites.other.home.front_default,
                            "types": [pokemonStats.types[0].type.name],
                            "hp": pokemonStats.stats[0].base_stat,
                            "attk": pokemonStats.stats[1].base_stat,
                            "def": pokemonStats.stats[2].base_stat,
                            "satk": pokemonStats.stats[3].base_stat,
                            "sdef": pokemonStats.stats[4].base_stat,
                            "speed": pokemonStats.stats[5].base_stat,


                        });
                    }





                }

                offset += limit;
                console.log(pokemonList)

                setTimeout(() => console.log("test"), 5000)
                // pokemonList = JSON.parse(newList).all;
            }

            // var pokemonList = JSON.parse(newList).all

            //return { pokemonList }

        }



    }

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Mingzat&display=swap');

*:focus {
    outline: none;
}

* {
    cursor: default;
    margin: 0 0;
}

h2 {
    font-family: 'mingzat';
}

img {
    src: './assets/tatuclickericon.png';
}

body {
    background-color: #2c3e50;
    width: 100vw;
    overflow: scroll;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;


}




#name {
    color: white;
    text-transform: uppercase;
}

#type {
    --types_width: 48.5%;
    width: 100%;
    height: fit-content;


    display: flex;
    justify-content: center;
    align-items: center;

}



#type>div:nth-child(1) {

    font-size: 1.15vw;
    width: var(--types_width);
    border-radius: 10px;


    background-color: lavender;
    border-bottom: 2px solid rgba(0, 0, 0, .25);
    margin-right: calc(50% - var(--types_width));

}

#type>div:nth-child(2) {
    font-size: 1.15vw;
    width: var(--types_width);
    border-radius: 10px;


    background-color: lavender;
    border-bottom: 2px solid rgba(0, 0, 0, .25);
    margin-left: calc(50% - var(--types_width));


}

#card-grid {
    width: fit-content;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-row: 4;
    grid-column: 4;

    padding: 7px;



}

#table {
    display: flex;
    justify-content: center;

}

#card-front,
#card-back {

    width: 14vw;
    backface-visibility: hidden;
    height: var(--cardheight);
    padding: 1.25vw;
    margin: 0;
    border-radius: 10px;

    background-color: rgb(179, 179, 179);


}

#card-back {
    position: absolute;

    top: 0;
    left: 0;

    transform: rotateY(180deg)
}

#card {
    --cardheight: 21.5vw;
    transform-style: preserve-3d;
    transition: transform 0.4s;
}

#card-hitbox {
    margin: 1vw;
}

#card-hitbox:hover #card {

    transform: rotateY(180deg);

}
</style>

             



//import { ref } from 'vue';




    