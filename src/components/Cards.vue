<template>

    <header id="Table">


        <div id="card" v-for="card in pokemonList" :key="card.id"
            style="width: fit-content; height: fit-content; padding: 15px;margin: 10px;" :style="
            [card.types[0] == 'grass' ? { 'background-color': '#a6f6af' } : {},
            card.types[0] == 'fire' ? { 'background-color': '#ef4335' } : {},
            card.types[0] == 'bug' ? { 'background-color': '#baafc4' } : {},
            card.types[0] == 'poison' ? { 'background-color': '#036564' } : {},
            card.types[0] == 'water' ? { 'background-color': '#0abfbc' } : {},
            card.types[0] == 'electric' ? { 'background-color': '#ffdc68' } : {},
            card.types[0] == 'ground' ? { 'background-color': '#c1b398' } : {},
            card.types[0] == 'fairy' ? { 'background-color': 'pink' } : {},
            card.types[0] == 'fighting' ? { 'background-color': '#7b3b3b' } : {},
            card.types[0] == 'psychic' ? { 'background-color': '#031634' } : {},
            card.types[0] == 'rock' ? { 'background-color': '#5c5863' } : {},
            card.types[0] == 'ghost' ? { 'background-color': 'darkslateblue' } : {},
            card.types[0] == 'ice' ? { 'background-color': 'lightblue' } : {},
            card.types[0] == 'dragon' ? { 'background-color': 'tomato' } : {},
            card.types[0] == 'dark' ? { 'background-color': '#413249' } : {},
            card.types[0] == 'steel' ? { 'background-color': '#5b7c8d' } : {}]">
            <div>

                <div style="display: flex; justify-content: center; align-items: center;">
                    <div id="poke_image"
                        style="overflow: hidden; width: 220px; height: 200px; background-color: white; border-radius: 10px; color: blanchedalmond;">
                        <img v-bind:src="card.img" style="width: 200px; height: 200px">
                    </div>
                </div>
                <h2><strong>{{ card.name }}</strong></h2>
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

</template>

<script>


//import { ref } from 'vue';









export default {
    name: "App",
    data() {
        return {
            grass: 'red',

            isLoading: 'false'
        }
    },

    async setup() {


        let resp = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=50&offset=0');
        let list = await resp.json();
        let firstList = await list.results;

        console.log(firstList)
        var newList = '{"all":[]}';
        for (let i of (firstList)) {
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
        const pokemonList = JSON.parse(newList).all
        console.log(pokemonList);
        return { pokemonList }
    },
}
</script>

<style>
* {
    margin: 0 0;
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
    margin-top: 60px;

    display: flex;
    justify-content: center;
}

#card {

    transform: scale(0);

    transition: trasnform 1s;

    transform: scale(1);
    border-radius: 10px;
    background-color: rgb(179, 179, 179);
    transform: scale(1);
    transition: transform 0.2s;
}

#card:hover {
    transform: scale(1.06);
    transition: transform 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955);
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
    border-radius: 5px;


    background-color: lavender;
    border-bottom: 2px solid rgba(0, 0, 0, .25);
    margin-right: calc(50% - var(--types_width));

}

#type>div:nth-child(2) {
    font-size: 12px;
    width: var(--types_width);
    border-radius: 5px;
    padding-top: 5px;

    background-color: lavender;
    border-bottom: 2px solid rgba(0, 0, 0, .25);
    margin-left: calc(50% - var(--types_width));


}

#Table {
    width: fit-content;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-row: 4;
    grid-column: 4;

    padding: 7px;

}

#table>* {}
</style>

             




//import { ref } from 'vue';




    