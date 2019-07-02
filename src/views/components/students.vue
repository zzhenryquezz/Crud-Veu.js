<template>
    <v-container>
         <v-toolbar flat color="white">      
            <v-spacer></v-spacer>
            <v-dialog v-model="showForm" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">Adicionar Novo</v-btn>
              </template>

              <StudentsForm
                @closeForm="showForm = false;" 
                :editedItem="editedItem"
              />
              
      </v-dialog>
     
        <v-dialog v-model="showDeleteForm" max-width="290">
        <v-card>
          <v-card-title class="text-md-center">
            <v-spacer></v-spacer>
              <v-icon  color="red" class="py-4" x-large>warning</v-icon>
            <v-spacer></v-spacer>

            Tem certeza que Deseja Exluir o Estudante?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="handleDeleteStudent">Deletar</v-btn>
            <v-btn color="success" flat @click="showDeleteForm = false">Cancelar</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="allStudents"
      class="elevation-1"
      :rows-per-page-items="[10,15,20,{ text:'Todos', value:-1}]"
      rows-per-page-text="Quantidade de items a Mostrar"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>        
        <td>{{ props.item.bestAverage }}</td>        
        <td>{{ props.item.lowerAverage }}</td> 
        
        <td class="justify-center layout px-0">
          <v-icon
            small            
            class="mr-2"
            @click="editStudent(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteStudent(props.item.id)"
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
            Close
          </v-btn>
        </v-snackbar>
    

  </v-container>
</template>

<script lang="ts">
export default {
    name:'StudentsPage',
    data(): object {
        return {
            headers: [            
                { text: 'Nome', value: 'name' },      
                { text: 'Maior Média', value: 'bestAverage' },      
                { text: 'Menor Média', value: 'lowerAverage' },      
                { text: 'Opções', value: 'name', sortable: false },      
            ],
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
    created(){
      this.$store.dispatch('students/setAll');      
    },
    watch:{
      // when dialog close go back the variables to default
      showForm(newValue: boolean): void{
        if(!newValue){
          this.editedItem = null;
        }
      }
    },
    components:{
      StudentsForm: require('./../../components/students').FormStudents
    },
    computed:{
        // return the array of objects in store
        allStudents(): any {
            return this.$store.state.students.all;
        }
    },
    methods:{
      // set the student edited variable and show the form to edit it
      editStudent(student: any): void{
        this.editedItem = student;
        this.showForm = true;
      },
      
      // dispatch the envent to delete the student
      handleDeleteStudent(): void{
        this.$store.commit('students/delete', this.deleteStudentId);
        this.showDeleteForm = false;
        this.notification = {           
            show: true,
            color: 'info',
            text: 'Estudante Deletado com Sucesso'
            
        }
      },
      // show the form and set the id to delete the student
      deleteStudent(id: number): void{
        this.showDeleteForm = true;
        this.deleteStudentId = id;
      }
    }
}
</script>
