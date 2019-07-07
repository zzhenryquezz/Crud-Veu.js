<template>
    <v-form
        ref="form"                        
        @submit.prevent="handleSubmitForm" 
        v-model="validData">
        <v-card>
            <v-card-title>
                <v-text-field 
                    label="Nome da Máteria"
                    :rules="[ v => v && !! v || 'Campo Obrigatorio']"
                    v-model="subject['name']" />
                <v-btn color="success" type="submit">{{ button_text }}</v-btn>
            </v-card-title>
        </v-card>
    </v-form>
</template>

<script>
export default {
    data(){
        return {
            validData: null,
            subject:{
                name: ''
            }
        }
    },
    props:{
        editedSubject:{
            type: Object,
            required: false,
            default: null
        }
    },
    computed:{
        button_text: function(){
            if(this.editedSubject !== null) {
                return 'Salvar'
            }else{
                return 'Criar'
            }
        }
    },
    watch:{
        editedSubject(value){
            if(value == null){
                this.subject.name = '';
                this.$refs.form.reset()
            }else{                
                this.subject.name = value.name;
            }
            
        }
    },
    methods:{
        validate(){
            if (this.$refs.form.validate()) {
                this.snackbar = true;
                return true;                
            }
            return false
        },
        // method to create a new subject
        handleSubmitForm(){
            // check if data is valid
            if(!this.validate()) return

            if(this.editedSubject == null){
                this.createNewSubject();
            }else{
                this.updateSubject();
            }

            this.$emit('close');
            this.subject.name = '';
            this.$refs.form.reset()
                        
        },
        createNewSubject(){
            // remove Observer of object
            let subject = {
                name: JSON.parse(JSON.stringify(this.subject.name))
            }
            
            this.$store.dispatch('subjects/add', subject);                        
        },
        updateSubject(){
            let subject = {
                id: this.editedSubject['id'],
                name: this.subject.name
            }
            
            this.$store.dispatch('subjects/edit', subject);
        }
    }
}
</script>

<style>

</style>
