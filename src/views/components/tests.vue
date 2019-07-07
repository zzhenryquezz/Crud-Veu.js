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
                                @click="deleteTest(props.item.id)"
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
                @positive="handleDeleteTest"
                v-model="showDeleteForm" 
            />

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
export default {
    name: 'TestsPage',
    data(): object{
        return {
            headers:[
                { text: 'Nome', value: 'name' },
                { text: 'Descrição', value: 'description' }, 
                { text: 'Materia', value: 'subject' },                                
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
        allTests(): any{
            return this.$store.state.tests.all;
        },
    },
    created(){
        this.$store.dispatch('tests/setAll');
    },
    watch:{
        showTestsForm(value: boolean): void{
            if(!value){
                this.editedTest = null;
            }
        }
    },
    methods:{
        getSubjectName(subjectId){
            let subject = this.$store.getters['subjects/getById'](subjectId);
            return subject.name;
        },
        // set the edited item an show the form
        handleEditTest(test: object): void{
            this.editedTest = test;
            this.showTestsForm = true;
                        
        },
        // prepare test to be deleted
        deleteTest(id: number): void{            
            this.deleteTestId = id;
            this.showDeleteForm = true;
        },
        // excute the delete acion in store
        handleDeleteTest():any{                        
            this.$store.dispatch('tests/delete', this.deleteTestId);
        } 
    }
}
</script>

<style>

</style>
