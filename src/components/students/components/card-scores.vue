<template>
    <v-layout row wrap>
        <v-flex xs12>
            <h2>Médias Das Provas Por Matéria</h2>
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
                                <v-list-tile-content>Media:</v-list-tile-content>
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
                 <template slot="no-data" >
                     <v-flex xs12>
                        <v-alert :value="true" type="warning">
                            Sem dados Para Mostrar
                        </v-alert>
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
        // call function to set the cards of scores
        this.handleSetCards();
    },
    watch:{
        // when som change happen call function to set the cards of scores again
        tests: 'handleSetCards'
    },
    computed:{
        // get all avaliable subjects in vuex store
        subjects(){
            return this.$store.state.subjects.all;
        },
        // get function in vuex store to use in this instance
        getSubjectById(){
            return this.$store.getters['subjects/getById'];
        },
        // get function in vuex store to use in this instance
        getTestById(){
            return this.$store.getters['tests/getById'];
        },
    },
    methods:{
        // get the average Number of a card and send bakc
        getAverageScore(card){
            let score = card.totalScore / card.numberOfTests
            return score.toFixed(2);
        },
      
        // main function that call the othoer to propery render the cards
        handleSetCards(){            
            this.setAvaliableSubjectsIds();
            this.setCards();                        
                                 
        },
        // check what subjects the stundets make some test realated and store the id
        setAvaliableSubjectsIds(){
            let test = null;
            this.avaliableSubjectsIds = [];
            
            this.tests.forEach(studentTest => {
                test = this.getTestById(studentTest.fk_test);                
                if(!this.avaliableSubjectsIds.includes(test.fk_subject)){                    
                    this.avaliableSubjectsIds.push(test.fk_subject);
                }               
            });
        },
        setCards(){
            // reset array of cards
            this.cards = [];
            let test;
            if(this.subjects)

            this.subjects.forEach(subject => {
                // loop in all subjects and if is in avaliables subjects id excute the function
                if(this.avaliableSubjectsIds.includes(subject.id)){
                    // set default values
                    subject['bestScore'] = 0;
                    subject['lowerScore'] = null;                    
                    subject['totalScore'] = 0;
                    subject['numberOfTests'] = 0;
                    // loop in tests and store the test to respective subjets card
                    this.tests.forEach(studentTest => {
                        test = this.getTestById(studentTest.fk_test);
                        if(test.fk_subject == subject.id){
                            if(Number(studentTest.value) > subject['bestScore']){
                                subject['bestScore'] = studentTest.value;
                            }
                            if(subject['lowerScore'] == null){
                                subject['lowerScore'] = studentTest.value;
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
        }

    }
}
</script>

<style>

</style>
