<template>
    <v-container>
        <v-layout wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                                                
                        <v-btn 
                            color="info"
                            @click="showSubjectsForm = true">
                            Adicionar Materia
                        </v-btn>

                        <v-spacer></v-spacer>

                        <v-text-field
                            v-model="search"
                            append-icon="search"
                            label="Buscar Materia"
                            single-line
                            hide-details
                        />
                                     
                    </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="allSubjects"
                    :search="search"                    
                    :rows-per-page-items="[10,15,20,{ text:'Todos', value:-1}]"
                    rows-per-page-text="Quantidade de items a Mostrar"
                >
                    <template v-slot:items="props">
                        <td>{{ props.item.name }}</td>
                        <td>{{ getNumberOfTests(props.item) }}</td>
                        <td class="justify-center layout px-0">
                            <v-icon
                                small            
                                class="mr-2"
                                @click="handleEditSubject(props.item)"
                            >
                                edit
                            </v-icon>
                            <v-icon
                                small
                                @click="handleDeleteSubject(props.item.id)"
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
                        Nenhum Matéria Encontrada
                        </v-alert>
                        <v-btn color="primary" >Reset</v-btn>
                    </template>
                </v-data-table>
            </v-card>
            <v-dialog width="300" v-model="showSubjectsForm">
                <SubjectsForm
                    :editedSubject="editedSubject"
                    @close="showSubjectsForm = false" 
                />
            </v-dialog>
            <AlertDialog
                message="Tem certeza que Deseja Exluir A Matéria?"
                subText="Isso irá exluir também todas as Provas e Notas de Alunos Relacionados"
                @positive="deleteSubject"
                v-model="showDeleteForm" 
            />

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'SubjectsPage',
    data(){
        return {
            headers:[
                { text: 'Nome', value: 'name' },
                { text: 'Numero Provas Relacionadas', value: 'tests', sortable: false },                
                { text: 'Options', value: 'name', sortable: false },
            ],
            search: '',
            editedSubject: null,
            showSubjectsForm: false,
            showDeleteForm: false,
            deleteSubjectId: null
        }        
    },
    components:{
        SubjectsForm: require('./../../components/subjects').SubjectsForm
    },
    computed:{
        // get all subjects in vuex store
        allSubjects(){
            return this.$store.state.subjects.all;
        },
        // get all tests in vuex store
        tests(){
            return this.$store.state.tests.all;
        },
    },
    watch:{
        // Objserve the Value to set the item to be edited
        showSubjectsForm(value){
            if(!value){
                this.editedSubject = null;
            }
        }
    },
    methods:{
        // get number of tests of some subject
        getNumberOfTests(subject){
            let count = 0;
            this.tests.forEach(test => {                
                if(test.fk_subject == subject.id){
                    count++;
                }
            });
            return count;
        },
        // function to set the item to be edited an show the form
        handleEditSubject(subject){
            
            this.editedSubject = subject;
            this.showSubjectsForm = true;
        },
        // function to set the item to be deleted an show confirm the form
        handleDeleteSubject(id){            
            this.deleteSubjectId = id;
            this.showDeleteForm = true;
        },
        // excute the delete vuex action to delete the subject
        deleteSubject(){                        
            this.$store.dispatch('subjects/delete', this.deleteSubjectId);
        } 
    }
}
</script>

<style>

</style>
