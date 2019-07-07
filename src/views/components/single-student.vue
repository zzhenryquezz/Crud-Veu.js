<template>
    <v-container v-if="student !== null">
        <v-layout row wrap>
            
            <v-flex pa-2 sm12 md4>
                <v-card>                    

                    <v-layout>
                        <v-spacer />
                        <v-avatar size="100px" class="gray">
                            <v-icon size="100px">person</v-icon>
                        </v-avatar>
                        <v-spacer />
                    </v-layout>
                    <v-card-title>
                        <v-layout>
                                <v-spacer />
                                    <h2>{{ student.name }}</h2>
                                <v-spacer />
                        </v-layout>
                    </v-card-title>
                </v-card>
            </v-flex>

            <v-flex pa-2 sm12 md8>
                <v-card>
                    <v-card-text>
                        <CardScores :tests="student.tests" />
                    </v-card-text>

                    <v-card-title>
                        <h2>Provas</h2>
                    </v-card-title>
                    
                        
                        <v-data-table 
                            :items="student.tests"
                            :headers="headers"
                            hide-actions
                        >
                        <template v-slot:items="props">                            

                            <td>{{ getTestName(props.item.fk_test) }}</td>                                    
                            <td>{{ getTestSubject(props.item.fk_test) }}</td>                                    
                            <td>{{ props.item.value }}</td>                                    
                            
                            <td class="justify-center layout px-0">
                                <v-icon
                                    small            
                                    class="mr-2"
                                    @click="handleEditTest(props.item)"                                
                                >
                                edit
                                </v-icon>
                                <v-icon
                                    small
                                    @click="handleDeleteTest(props.item)"
                                >
                                delete
                                </v-icon>
                            </td>
                        </template>

                        <template slot="no-data" >
                            <v-alert :value="true" type="warning">
                                Nenhuma Prova Encontrada
                            </v-alert>
                        </template>

                        </v-data-table>
                    
                    <v-card-actions>
                        <v-btn @click="showTestsStudentsForm = true" color="info">Adicionar Prova</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <v-dialog width="500" v-model="showTestsStudentsForm">
            <TestsStudentsForm
                @close="showTestsStudentsForm = false" 
                :editedIndex="editedIndex"
                :editedTest="editedTest"
                :student="student" />
        </v-dialog>
        <AlertDialog
            message="Tem certeza que Deseja Exluir o Teste?"
            @positive="deleteTest"
            v-model="showDeleteForm" 
        />      
    </v-container>
</template>

<script>
export default {
    name: 'SingleStudent',
    data(){
        return {            
            headers:[
                { text: 'Prova', value: 'name' },
                { text: 'Materia', value: 'subject' },
                { text: 'Nota do Aluno', value: 'test_result' },
                { text: 'Opções', value: 'test_result', sortable: false },
            ],
            showTestsStudentsForm: false,
            showDeleteForm: false,
            editedIndex: null,
            editedTest: null,
        }
    },
    components:{
        TestsStudentsForm: require('./../../components/students').TestsStudentsForm,
        CardScores: require('./../../components/students').CardScores
    },
    created(){        
        // check if the student exist in system
        if(this.student == null){            
            alert('Estdante não Encontrado')
            this.$router.push({name: 'students'})
        }
    },
    watch:{
        // Observe the v-model of form to reset the values to be edited
        showTestsStudentsForm(value){
            if(!value){
                this.editedIndex = null;
                this.editedTest = null;
            }
        }
    },
    computed:{
        // get the students in vuex store using the params in router
        student(){
            let studentID = this.$route.params.id;
            let student = this.$store.getters['students/getById'](studentID);
            return student;
        }
    },
    methods:{
        // return the test name using the test id
        getTestName(testId){            
            let test = this.$store.getters['tests/getById'](testId);            
            return test.name;
        },
        // return the subject name using the test id
        getTestSubject(testId){
            let test = this.$store.getters['tests/getById'](testId);
            let subject = this.$store.getters['subjects/getById'](test.fk_subject);            
            return subject.name;
        },
        // main function to edit some test
        handleEditTest(test){
            this.editedIndex = this.student.tests.indexOf(test);
            this.editedTest = test;            
            this.showTestsStudentsForm = true;
        },
        // main function to delete some test
        handleDeleteTest(test){
            // prepare the values to be deleted
            this.editedIndex = this.student.tests.indexOf(test);
            this.showDeleteForm = true;
        },
        // excute the process to delete the test
        deleteTest(){
            // remvoe observers of varible
            let student = JSON.parse(JSON.stringify(this.student));
            
            // remove the test using the test id in variable
            student.tests.splice(this.editedIndex);
            
            // set the new student value using edit action in vuex
            this.$store.dispatch('students/edit', student);
        }
    }
}
</script>
