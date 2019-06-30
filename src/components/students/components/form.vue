<template>
    <v-form
        ref="form" 
        v-model="valid"
        @submit.prevent="hadleSubmitForm">                        
        <v-card>
        <v-card-title>
            <span class="headline">Form</span>
        </v-card-title>

        <v-card-text>
            <v-container grid-list-md>
            <v-layout wrap>
                <v-flex xs12>
                    <v-text-field 
                    v-model="name" 
                    label="Nome do Aluno"
                    required
                    :rules="[ v => !! v || 'Nome é Obrigatorio']">
                    </v-text-field>
                </v-flex>
            </v-layout>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="$emit('closeForm')" >Cancel</v-btn>
            <v-btn color="blue darken-1" :disabled="!valid || name == ''" type="submit" flat >Save</v-btn>
        </v-card-actions>
        </v-card>
    </v-form>
</template>

<script lang="ts">
export default {
    data(): object {
        return {            
            valid: false,
            name: '',            
        }
    },
    watch:{
        editedItem(value: any){
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
        hadleSubmitForm(): void{
            if(!this.valid){
                return;
            }
            if(this.editedItem !== null){
                this.updateStudent();
            }else{
                this.addNewStudent();
            }
        },
        updateStudent(){            
            let args = {
            id: this.editedItem.id,
            name: this.name
            };

            this.$store.commit('students/edit', args);
            this.$refs.form.reset();            
            this.$emit('closeForm');
        },
        addNewStudent(): void{
        
            let student = {          
            name: this.name
            };

            this.$store.commit('students/addNew', student);
            this.$refs.form.reset();
            this.$emit('closeForm');
        },        
    }
}
</script>

<style>

</style>
