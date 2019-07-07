<template>
    <v-form 
        ref="form"
        v-model="validData" 
        @submit.prevent="handleSubmitForm">
        <v-card v-if="canCreateTest">            
            <v-card-title>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-text-field 
                            v-model="name"
                            :rules="[rules.required]" 
                            label="Nome" />
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field 
                            v-model="description" 
                            label="Descrição" 
                        />
                    </v-flex>
                    <v-flex xs12 >
                        <v-select
                            v-model="fk_subject"
                            :items="subjects_list"
                            :rules="[rules.required]"                            
                            item-text="name"
                            item-value="id"
                            label="Matéria" 
                        />
                    </v-flex>               
                </v-layout>
            </v-card-title>
            <v-card-actions>
                <v-spacer />
                <v-btn 
                    @click="$emit('close')"
                    color="error">Cancelar</v-btn>
                <v-btn                     
                    type="submit" 
                    color="success">{{btn_test}}</v-btn>
            </v-card-actions>
        </v-card>
        <v-card v-else>
            <v-card-title >
                <v-alert :value="true" type="error">
                    Sem nenhuma Matéria por favor cria uma Matéria para poder criar Provas
                </v-alert>
            </v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="$emit('close')" color="info">
                    Ok
                </v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script>
export default {
    data(){
        return {
            name: '',
            description: '',
            fk_subject: '',
            value: '',
            rules:{
                required: v => !! v || 'Campo Obrigatorio'
            },
            canCreateTest: false,
            validData: false
        }
    },
    props:{
        editedTest:{
            type: Object,
            required: false
        }
    },
    watch:{
        editedTest(value){
            if(value !== null){
                this.name = value['name'];
                this.description = value['description'];
                this.fk_subject = value['fk_subject'];
            }else{
                this.name = '';
                this.description = '';
                this.fk_subject = '';
                this.$refs.form.reset();
            }
        }
    },
    created(){        
        if(this.subjects_list.length > 0){
            this.canCreateTest = true;
        }
    },
    computed:{
        // get all subjects in vuex store
        subjects_list(){
            return this.$store.state.subjects.all;
        },
        btn_test(){
            if(this.editedTest == null){
                return 'Criar Teste'
            }else{
                return 'Salvar';
            }
        }

    },
    methods:{
        validate () {
            if (this.$refs.form.validate()) {
                this.snackbar = true
                return true;
            }

            return false;
        },
        handleSubmitForm(){
            if(!this.validate()) return
            
            if(this.editedTest !== null){
                this.editTest();
            }else{                    
                this.createNewTest();
            }

            this.$emit('close');
        },
        createNewTest(){
            let test = {
                name: this.name,
                description: this.description,
                fk_subject: this.fk_subject
            }
            this.$store.dispatch('tests/add', test);            
        },
        editTest(){
            let test = {
                id: this.editedTest.id,
                name: this.name,
                description: this.description,
                fk_subject: this.fk_subject
            };
            
            this.$store.dispatch('tests/edit', test);
        }
    }
}
</script>

<style>

</style>
