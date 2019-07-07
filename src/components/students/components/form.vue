<template>
    <v-form
        ref="form" 
        v-model="valid"
        @submit.prevent="hadleSubmitForm">                        
        <v-card>        

        <v-card-text>
          
            <v-text-field 
                v-model="name" 
                label="Nome do Aluno"
                required
                :rules="[ v => !! v || 'Nome é Obrigatorio']">
            </v-text-field>
        
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="$emit('closeForm')" >Cancelar</v-btn>
            <v-btn color="success" type="submit" >Save</v-btn>
        </v-card-actions>
        </v-card>
    </v-form>
</template>

<script>
export default {
    data() {
        return {            
            valid: false,
            name: '',            
        }
    },
    watch:{
        // Objserve the Value to know if is a some item be edited or a is add new form
        editedItem(value){
            this.$refs.form.reset();
            if(value !== null){
                // remove watcher to prevent bugs in props
                this.name = JSON.parse(JSON.stringify(value.name));
            }else{
                this.name = '';
            }
        }
    },    
    props:{
        editedItem:{
            type: Object,
            required: false
        }
    },
    methods:{
        // check if form is valid
        validate(){
            if (this.$refs.form.validate()) {
                this.snackbar = true;
                return true;                
            }
            return false
        },
        // main function to submit the form
        hadleSubmitForm(){
            if(!this.validate()){
                return;
            }
            // check if have to add new item or edit some item
            if(this.editedItem !== null){
                this.updateStudent();
            }else{
                this.addNewStudent();
            }

            // close the form and reset the values
            this.name = '';
            this.$refs.form.reset();
            this.$emit('closeForm');
        },
        // function to edit some the item
        updateStudent(){
            let args = this.editedItem;
            args['name'] = this.name;            

            this.$store.dispatch('students/edit', args);
        },
        // function to add a new item
        addNewStudent(){
        
            let student = {          
                name: this.name
            };

            this.$store.dispatch('students/addNew', student);          
        },        
    }
}
</script>

<style>

</style>
