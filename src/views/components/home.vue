<template>
    <v-container fill-height align-start grid-list-md>
        <v-layout>
            <v-flex v-for="(card, index) in cards" :key="index" xs4>

                <v-card 
                    
                    :color="card.color"
                    
                    class="white--text">
                    <v-card-title primary-title>
                    <div>
                        <div class="headline">{{ card.title }}</div>
                        <span>{{ card.description }}</span>
                    </div>
                    </v-card-title>
                    <v-card-actions>
                    <v-btn :to="card.to" flat dark>Listen now</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
export default {
    data(): object{
        return {
            cards:[
                {
                    title: 'Ver Alunos',
                    description: 'Ver todos os alunos cadastrados',
                    to: '/alunos',
                    color: 'blue-grey',
                },
                {
                    title: 'Ver Alunos',
                    description: 'Ver todos os alunos cadastrados',
                    to: '/alunos',
                    color: 'blue-grey',
                }
            ]
        }
    }
}
</script>

<style>

</style>
