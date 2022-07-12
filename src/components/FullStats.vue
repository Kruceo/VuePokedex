<script>
export default
    {
        name: "FullStats",
        props:
        {
            color: String,
            card: Object,
            abilities: Object,
            moves: Object
        },
        data() {
            return {
                colors: {
                    grass: "#3a7b50 ", steel: "#5b7c8d",
                    water: "#0abfbc", fire: "#ef4335", poison: "#036564", electric: "#ffdc68"
                    , ground: "#c1b398", bug: "#928941", fairy: "#f79eb1",
                    fighting: "#7b3b3b", psychic: "#031634", rock: "#5c5863",
                    ghost: "#473469", ice: "lightblue", dragon: "#770021", dark: "#413249",
                }
            }
        }
    }
</script>

<template v-if="card != undefined">
    <div class="modal fade" id="extraStats" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" style="background-color:rgba(40, 50,130);border-radius: 15px;">
                <div class=" modal-header">
                    <h5 class="modal-title text-uppercase text-light" id="exampleModalLabel" style="font-size:25px ;">
                        EXTRA - {{ card.name }}
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="rounded p-2">

                        <div id="info" class="text-white text-center">
                            <h2>ABILITIES</h2>
                        </div>
                        <div id="info" class="text-white">
                            <div class="row">
                                <div class="col-4" v-for="y in card.ab" :key="y">

                                    <div id="info" class="m-1 rounded text-white"
                                        style="background-color:rgba(255, 255,255, 0.05)">
                                        <div class="px-1">
                                            {{ y.ability.name }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="info" class="rounded text-white mt-2 text-center">
                            <h2>MOVES</h2>
                        </div>
                        <div id="info" class="rounded text-white">
                            <div class="row">
                                <div class="col-4" v-for="y in card.moves" :key="y">

                                    <div id="info" class="m-1 rounded text-white"
                                        style="background-color:rgba(255, 255,255, 0.05)">
                                        <div class="px-1">
                                            {{ y.move.name }}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>

                </div>
            </div>
        </div>
    </div>
</template>