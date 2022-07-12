<script>
export default
    {
        name: "FullStats",
        props:
        {
            card: Object,
            abilities: Object,
            moves: Object
        },
    }
</script>

<template>
    <div class="modal fade" id="extraStats" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content bg-primary">
                <div class=" modal-header">
                    <h5 class="modal-title text-uppercase text-light" id="exampleModalLabel" style="font-size:25px ;">
                        EXTRA - {{ card.name }}
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="rounded bg-dark p-2">

                        <div id="info" class="rounded text-white text-center">
                            <h2>Abilities</h2>
                        </div>
                        <div id="info" class="rounded text-white" style="background-color:rgba(255, 255,255, .08)">
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
                            <h2>Moves</h2>
                        </div>
                        <div id="info" class="rounded text-white" style="background-color:rgba(255, 255,255, .08)">
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