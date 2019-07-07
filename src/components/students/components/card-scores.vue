<template>
    <v-layout row wrap>
        <v-flex xs12>
            <h2>Médias Das Provas</h2>
        </v-flex>
        <v-flex class="py-4" xs12>
            <v-data-iterator
                :items="cards"                            
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"
                content-tag="v-layout"
                row
                wrap
            >
                <template v-slot:item="props">
                    <v-flex
                        xs12
                        sm6
                        md4
                        lg3
                        class="pa-2"
                    >
                    <v-card>
                        <v-card-title>
                            <h4>{{ props.item.name }}</h4>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-list dense>
                            <v-list-tile>
                                <v-list-tile-content>Media de Notas:</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ getAverageScore(props.item) }}</v-list-tile-content>                                
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>Maior Nota:</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ props.item.bestScore }}</v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>Menor Nota:</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ props.item.lowerScore }}</v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-card>

                    </v-flex>
                </template>
            </v-data-iterator>

        </v-flex>

    </v-layout>
</template>

<script>
export default {
    data(){        
        return {
            cards:[],
            pagination: {
                rowsPerPage: 4
            },
            rowsPerPageItems: [4, 8, 12],
            avaliableSubjectsIds:[]
        }
    },
    props:{
        tests:{
            type: Array,
            required: true
        }
    },
    created(){
        this.setCards();
    },
    computed:{
        subjects(){
            return this.$store.state.subjects.all;
        },
        getSubjectById(){
            return this.$store.getters['subjects/getById'];
        },
        getTestById(){
            return this.$store.getters['tests/getById'];
        },
    },
    methods:{
        getAverageScore(card){
            let score = card.totalScore / card.numberOfTests
            return score.toFixed(2);
        },
        setAvaliableSubjectsIds(){
            let test = null;                
            
            this.tests.forEach(studentTest => {
                test = this.getTestById(studentTest.fk_test);
                if(!this.avaliableSubjectsIds.includes(test.fk_subject)){                    
                    this.avaliableSubjectsIds.push(test.fk_subject);
                }               
            });
        },
        setCards(){
            this.setAvaliableSubjectsIds();            
            let test;
            this.subjects.forEach(subject => {
                if(this.avaliableSubjectsIds.includes(subject.id)){
                    subject['bestScore'] = 0;
                    subject['lowerScore'] = 100;                    
                    subject['totalScore'] = 0;
                    subject['numberOfTests'] = 0;
                    
                    this.tests.forEach(studentTest => {
                        test = this.getTestById(studentTest.fk_test);
                        if(test.fk_subject == subject.id){
                            if(Number(studentTest.value) > subject['bestScore']){
                                subject['bestScore'] = studentTest.value;
                            }
                            if(Number(studentTest.value) < subject['lowerScore']){
                                subject['lowerScore'] = studentTest.value;
                            }
                            subject['totalScore'] += Number(studentTest.value);
                            subject['numberOfTests']++;

                        }
                    });

                    this.cards.push(subject);
                }
            });
            // console.log(this.cards);            
        }
    }
}
</script>

<style>

</style>
