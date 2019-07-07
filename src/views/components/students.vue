<template>
  <v-container>
    <v-card>                                  
        <v-card-title>                                            
              <v-btn 
                color="info" 
                dark class="mb-2" 
                @click="showForm = true">
                Adicionar Novo
              </v-btn>

              <v-spacer></v-spacer>
              
              <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Buscar Aluno"
                  single-line
                  hide-details
              />
                            
        </v-card-title>
        <v-dialog v-model="showForm" max-width="500px">              

          <StudentsForm
            @closeForm="showForm = false;" 
            :editedItem="editedItem"
          />
      
        </v-dialog>
        <AlertDialog
            message="Tem certeza que Deseja Exluir o Estudante?"
            @positive="deleteStudent"
            v-model="showDeleteForm" 
          />                 
        <v-data-table
          :headers="headers"
          :items="allStudents"
          :search="search"      
          :rows-per-page-items="[10,15,20,{ text:'Todos', value:-1}]"
          rows-per-page-text="Quantidade de items a Mostrar"
        >
          <template v-slot:items="props">
            <tr>

              <td style="cursor: pointer" @click="goToStudentPage(props.item)">{{ props.item.name }}</td>                  
              
              <td row class="justify-end layout ">
                <v-icon
                  small            
                  class="mr-2"
                  @click="hadleEditStudent(props.item)"
                >
                  edit
                </v-icon>
                <v-icon
                  small
                  @click="handleDeleteStudent(props.item.id)"
                >
                  delete
                </v-icon>
              </td>      
            </tr>
                      
          </template>
          <template v-slot:no-data>
            <v-alert
              :value="true"
              type="warning"
            >
              Nenhum Estudante Encontrado
            </v-alert>
            <v-btn color="primary" >Reset</v-btn>
          </template>
        </v-data-table>
        
        <v-snackbar
              v-model="notification.show"                  
              top
              right
              :color="notification.color"
              vertical="vertical"
            >
          {{ notification.text }}
          <v-btn            
            flat
            @click="notification.show = false"
          >
            Fechar
          </v-btn>
        </v-snackbar>    
    </v-card>
  </v-container>
</template>

<script>
export default {
    name:'StudentsPage',
    data() {
        return {
            headers: [            
                { text: 'Nome', value: 'name' },                      
                { text: 'Opções', value: 'name', align: 'right', width: '30', sortable: false },      
            ],
            search: '',
            notification:{
              show: false,
              color: 'error',
              text: 'sssss'
            },
            editedItem: null,
            showForm: false,
            showDeleteForm: false,
            deleteStudentId: null
        }
    },
    watch:{
      // Objserve the Value to set the item to be edited
      showForm(newValue){
        if(!newValue){
          this.editedItem = null;
        }
      }
    },
    components:{
      StudentsForm: require('./../../components/students').FormStudents
    },
    computed:{
        // get all students in vuex store
        allStudents(){
            return this.$store.state.students.all;
        }
    },
    methods:{
      // function to go to route single page students
      goToStudentPage(student){
        let params = {
          id: student.id,
          name: student.name
        };
        this.$router.push({name: 'single_students', params})
      },
      
      // function to set the student to be edited and show the form
      hadleEditStudent(student){
        this.editedItem = student;
        this.showForm = true;
      },
      
      // function set the student id to be delete and show the form
      handleDeleteStudent(id){
        this.showDeleteForm = true;
        this.deleteStudentId = id;
      },
      // excute the process to delete the student
      deleteStudent(){
        // dispatch the envent to delete the student
        this.$store.dispatch('students/delete', this.deleteStudentId);
        
        // close form and send the notifications
        this.showDeleteForm = false;
        this.notification = {           
            show: true,
            color: 'info',
            text: 'Estudante Deletado com Sucesso'
            
        }
      },
    }
}
</script>
