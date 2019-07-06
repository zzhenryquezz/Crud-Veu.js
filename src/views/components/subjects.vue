<template>
    <v-container>
        <v-layout wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                                                
                        <v-btn 
                            color="info"
                            @click="showSubjectForm = true">
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
                        <td>{{ props.item.tests.length }}</td>
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
                                @click="deleteSubject(props.item.id)"
                            >
                                delete
                            </v-icon>
                        </td>
                    </template>
                    <template v-slot:no-data>
                        <v-alert
                        :value="true"
                        type="error"
                        >
                        Nenhum Estudante Encontrado
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
                @positive="handleDeleteSubject"
                v-model="showDeleteForm" 
            />

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
export default {
    name: 'SubjectsPage',
    data(): object{
        return {
            headers:[
                { text: 'Nome', value: 'name' },
                { text: 'Numero Provas Criadas', value: 'tests' },                
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
        allSubjects(): any{
            return this.$store.state.subjects.all;
        },
    },
    created(){
        this.$store.dispatch('subjects/setAll');
    },
    watch:{
        showSubjectsForm(value: boolean): void{
            if(!value){
                this.editedSubject = null;
            }
        }
    },
    methods:{
        // set the edited item an show the form
        handleEditSubject(subject: object): void{
            
            this.editedSubject = subject;
            this.showSubjectsForm = true;
        },
        // prepare subject to be deleted
        deleteSubject(id: number): void{            
            this.deleteSubjectId = id;
            this.showDeleteForm = true;
        },
        // excute the delete acion in store
        handleDeleteSubject():any{                        
            this.$store.dispatch('subjects/delete', this.deleteSubjectId);
        } 
    }
}
</script>

<style>

</style>
