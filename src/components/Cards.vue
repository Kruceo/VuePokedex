<template>

    <header id="Table">


        <div id="card" v-for="card in pokemonList" :key="card.id"
            style="width: fit-content; height: fit-content; padding: 5px;margin: 10px;">
            <div
                style="background-color: lavender; border-radius: 1ch; width: 220px; height: 220px; overflow: hidden; display: block; padding: 20px;border-bottom: 2px solid rgba(0, 0, 0, .25);">

                <div style="display: flex; justify-content: center; align-items: center;">
                    <div id="poke_image"
                        style="overflow: hidden; width: 220px; height: 200px; background-color: white; border-radius: 10px;">
                        <img v-bind:src="card.img" style="width: 200px; height: 200px">
                    </div>
                </div>
                <h2><strong>{{ card.name }}</strong></h2>
            </div>
            <div id="type">
                <div>
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
            grassColor: 'red',
        }
    },

    async setup() {

        let resp = await fetch('https://pokeapi.co/api/v2/pokemon');
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
                    "types": [pokemonStats.types[0].type.name]


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
    background-color: rgb(37, 37, 37);
    padding: 7px;

}

#table>* {}
</style>

             




//import { ref } from 'vue';




    