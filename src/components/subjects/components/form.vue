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
                <v-btn color="success" type="submit">{{button_text}}</v-btn>
            </v-card-title>
        </v-card>
    </v-form>
</template>

<script lang="ts">
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
            required: false
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
            }else{
                this.subject.name = value.name;
            }
        }
    },
    methods:{
        validate(): any{
            if (this.$refs.form.validate()) {
                this.snackbar = true;
                return true;                
            }
            return false
        },
        // method to create a new subject
        handleSubmitForm(): void{
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
        createNewSubject(): void{
            // remove watcher of object
            let subject = {
                name: JSON.parse(JSON.stringify(this.subject.name))
            }
            
            this.$store.dispatch('subjects/add', subject);                        
        },
        updateSubject(): void{
            let subject = {
                id: this.editedSubject['id'],
                name: this.subject.name
            }
            console.log(subject)
            this.$store.dispatch('subjects/edit', subject);
        }
    }
}
</script>

<style>

</style>
