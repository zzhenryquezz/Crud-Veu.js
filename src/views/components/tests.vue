<template>
    <v-container>
        <v-layout wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                                                
                        <v-btn
                            @click="showTestsForm = true"
                            color="info">
                            Adicionar Prova
                        </v-btn>

                        <v-spacer></v-spacer>

                        <v-text-field
                            v-model="search"
                            append-icon="search"
                            label="Buscar Prova"
                            single-line
                            hide-details
                        />
                                     
                    </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="allTests"
                    :search="search"                    
                    :rows-per-page-items="[10,15,20,{ text:'Todos', value:-1}]"
                    rows-per-page-text="Quantidade de items a Mostrar"
                >
                    <template v-slot:items="props">
                        <td>{{ props.item.name }}</td>                        
                        <td>{{ props.item.description }}</td>                        
                        <td>{{ getSubjectName(props.item.fk_subject) }}</td>                        
                        <td>
                            <v-icon
                                small            
                                class="mr-2"
                                @click="handleEditTest(props.item)"
                            >
                                edit
                            </v-icon>
                            <v-icon
                                small
                                @click="handleDeleteTest(props.item.id)"
                            >
                                delete
                            </v-icon>
                        </td>
                    </template>
                    <template v-slot:no-data>
                        <v-alert
                            :value="true"
                            type="warning"
                        >
                        Nenhuma Prova Encontrada
                        </v-alert>
                        <v-btn color="primary" >Recarregar</v-btn>
                    </template>
                </v-data-table>
            </v-card>
            <v-dialog width="500" v-model="showTestsForm">
                <TestsForm
                    :editedTest="editedTest"
                    @close="showTestsForm = false"
                />
            </v-dialog>
            
            <AlertDialog
                message="Tem certeza que Deseja Exluir A Prova?"
                @positive="deleteTest"
                v-model="showDeleteForm" 
            />

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'TestsPage',
    data(){
        return {
            headers:[
                { text: 'Nome', value: 'name' },
                { text: 'Descrição', value: 'description' }, 
                { text: 'Materia', value: 'subject', sortable: false },                                
                { text: 'Options', value: 'name', sortable: false },
            ],
            search: '',
            editedTest: null,
            showTestsForm: false,
            showDeleteForm: false,
            deleteTestId: null
        }        
    },
    components:{
        TestsForm: require('./../../components/tests').TestsForm
    },
    computed:{
        // get all tests in vuex store
        allTests(){
            return this.$store.state.tests.all;
        },
    },
    watch:{
        // Objserve the Value to set the item to be edited
        showTestsForm(value){
            if(!value){
                this.editedTest = null;
            }
        }
    },
    methods:{
        // get subjet name using the id
        getSubjectName(subjectId){
            let subject = this.$store.getters['subjects/getById'](subjectId);
            return subject.name;
        },
        // function to set the item to be edited an show the form
        handleEditTest(test){
            this.editedTest = test;
            this.showTestsForm = true;
                        
        },
        // function to prepare test to be deleted and show the confim form
        handleDeleteTest(id){            
            this.deleteTestId = id;
            this.showDeleteForm = true;
        },
        // excute the delete acion in store to delete the test
        deleteTest(){                                    
            this.$store.dispatch('tests/delete', this.deleteTestId);
        } 
    }
}
</script>

<style>

</style>
