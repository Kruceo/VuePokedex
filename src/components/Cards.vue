<template>

    <div style="display: flex; justify-content: center">
        <header style="width: fit-content;">
            <div style="display: flex">
                <input type="text" v-model="pokesearch"
                    style="display: flex; border-radius: 2vw; width: 50%; height: 7vh; font-size: 3vh; padding-inline: 2vw; border: 0; margin-inline: 15px;"
                    placeholder="Pesquise um pokemon!" />



                <select>
                    <option value="all">All</option>
                    <option value="grass">Grass </option>
                </select>

            </div>

            <header id="table" style="background-color: gray; border-radius: 1rem; margin-top: 5vh;">

                <header id="card-grid">
                    <div id=" card" v-for="card in pokemonFilteredList" :key="card.id"
                        :style="{ 'background-color': colors[card.types[0]] }">
                        <div>
                            <div style="display: flex; justify-content: center; align-items: center;">
                                <div id="poke-image"
                                    style="overflow: hidden; width: 220px; height: 200px; background-color: white; border-radius: 1rem;">
                                    <img v-bind:src="card.img" style="width: 200px; height: 200px">
                                </div>
                            </div>
                            <h2 id="name">{{ card.name }}</h2>
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


                </header>
            </header>
        </header>
    </div>
</template>

<script>











export default {
    name: "App",
    data() {
        return {
            pokesearch: '',
            colors: {
                grass: '#a6f6af',
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
            isLoading: 'false'
        }
    }, computed:
    {
        pokemonFilteredList() {

            return this.pokemonList.filter((pokemon) => {
                //var string = pokemon.name;
                console.log(pokemon.name);
                return pokemon.name.toLowerCase().includes(this.pokesearch.toLowerCase())
            })



        }
    },

    async setup() {

        let resp = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0');
        let list = await resp.json();
        let firstList = await list.results;

        console.log(firstList)
        var newList = '{"all":[]}';
        for (let i of (firstList)) {

            // if (JSON.stringify(i.name).includes(this.search)) { console.log('boa') }
            let resp = await fetch(i.url);
            let pokemonStats = await resp.json();


            console.log(pokemonStats);


            var obj = JSON.parse(newList);

            if (pokemonStats.types[1]) {
                obj['all'].push({
                    "name": pokemonStats.name,
                    "img": pokemonStats.sprites.front_default,
                    "types": [pokemonStats.types[0].type.name, pokemonStats.types[1].type.name]


                });
            }
            else {
                obj['all'].push({
                    "name": pokemonStats.name,
                    "img": pokemonStats.sprites.front_default,
                    "types": [pokemonStats.types[0].type.name],



                });
            }
            newList = JSON.stringify(obj);


        }



        var pokemonList = JSON.parse(newList).all

        return { pokemonList }
    },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Mingzat&display=swap');

*:focus {
    outline: none;
}

* {
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
    widows: 100vw;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;


}

#card {
    width: fit-content;
    height: fit-content;
    padding: 15px;
    margin: 10px;
    border-radius: 1rem;
    background-color: rgb(179, 179, 179);
    transform: scale(1);
    transition: transform 0.2s;
}

#card:hover {
    transform: scale(1.06);
    transition: transform 0.2s cubic-bezier(0.23, 1, 0.320, 1)
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

    font-size: 12px;
    width: var(--types_width);
    border-radius: 1rem;


    background-color: lavender;
    border-bottom: 2px solid rgba(0, 0, 0, .25);
    margin-right: calc(50% - var(--types_width));

}

#type>div:nth-child(2) {
    font-size: 12px;
    width: var(--types_width);
    border-radius: 1rem;


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
</style>

             




//import { ref } from 'vue';




    