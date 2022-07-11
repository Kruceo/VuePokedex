<script>
export default
    {
        name: "cardStats",
        props:
        {
            title: String,
            text: String,
            pokemonStat: Object
        },
    }
</script>

<template>
    <div class="col-12 p-1">
        <div id="info" class="text-center">
            <h2 style="color:white">{{ title }}</h2>
        </div>
    </div>
    <div class="row">
        <div class="col-6 p-1" v-for="( v, k ) in pokemonStat" :key="k">
            <div id="info" class="rounded text-white" style="background-color:rgba(255, 255,255, .08)">
                <p class="px-1">{{ k }} : {{ v }}</p>
            </div>
        </div>
    </div>
</template>


