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
                    <v-btn :to="card.to" flat dark>Ir a Pagina</v-btn>
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
                    to: '/students',
                    color: 'green',
                },
                {
                    title: 'Ver Materias',
                    description: 'Ver todas as Matérias cadastrados',
                    to: '/subjects',
                    color: 'blue',
                },
                {
                    title: 'Ver Provas',
                    description: 'Ver todas os Provas cadastradas',
                    to: '/tests',
                    color: 'purple',
                }
            ]
        }
    }
}
</script>

<style>

</style>
