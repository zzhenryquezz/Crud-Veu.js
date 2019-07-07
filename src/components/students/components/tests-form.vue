<template>
    <v-form 
        v-model="validData"
        ref="form"
        @submit.prevent="handleSubmitForm">
        <v-card v-if="tests.length > 0">
            <v-card-text>

                <v-layout row wrap>
                    <v-flex xs12>
                        <v-select
                            v-model="fk_test"
                            :items="tests" 
                            :rules="[rules.required]"
                            item-value="id"
                            item-text="name"
                            label="Selecione a prova" />
                    </v-flex>
                    <v-flex xs12 md10 class="pr-2">
                        <v-slider
                            v-model="value"
                            label="Nota do Aluno"
                            :max="100"
                            hint="Nota maxima: 100"
                            persistent-hint
                            :rules="[rules.required]"
                            thumb-label="always"
                        />
                    </v-flex>
                    <v-flex xs12 md2>
                        <v-text-field 
                            :rules="[rules.required]"
                            type="number"
                            min="1"
                            max="100"                             
                            v-model="value" />       
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions>
                <v-btn color="success" type="submit">Salvar</v-btn>
            </v-card-actions>
        </v-card>
        <v-card height="150" v-else>
            
            <v-alert value="true" type="warning">
                Não há Provas criadas no sistemas, por favor crie uma antes de proseguir
            </v-alert>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="$emit('close')">Ok</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script>
export default {
    data(){
        return {
            validData: false,
            fk_test: '',
            value: 1,
            rules:{
                required: v => !! v || 'Campo Obrigatorio'
            }
        }
    },
    props:{
        student:{
            type: Object,
            required: true,            
        },
        editedTest:{
            type: Object,
            required: false,
            default: null
        },
        editedIndex:{
            type: Number,
            required: false,
            default: null
        },
    },    
    computed:{
        // get all tests in vuex store
        tests(){
            return this.$store.state.tests.all;
        }
    },
    watch:{
        // Objserve the Value to know if is a some item to be edited or a is add new form
        editedTest(value){
            if(value !== null){
                this.fk_test = value.fk_test;
                this.value = value.value;
            }
        }
    },
    methods:{
        // check if form values is valid
        validate(){
            if (this.$refs.form.validate()) {
                this.snackbar = true;
                return true;                
            }
            return false
        },
        // main function to submit the form
        handleSubmitForm(){
            // check data
            if(!this.validate()) return
            
            // check if will have to edit some item or add new item
            if(this.editedTest !== null && this.editedIndex !== null){
                this.editTest();
            }else{
                this.addNewTest();
            }

            // close the form and reset values    
            this.$emit('close');
            this.fk_test = '';
            this.value = 1;
            this.$refs.form.reset();
        },
        // function edit some item
        editTest(){
            let subject = JSON.parse(JSON.stringify(this.student));
            
            let test = {
                fk_test: this.fk_test,
                value: this.value
            };

            subject['tests'][this.editedIndex] = test;
            this.$store.dispatch('students/edit', subject)
        },
        // function edit add a new item
        addNewTest(){
            // remove Objservers
            let subject = JSON.parse(JSON.stringify(this.student));

            if(subject['tests'] == undefined){
                subject['tests'] = [];
            }
            let test = {
                fk_test: this.fk_test,
                value: this.value
            };
            //set a new student value
            subject['tests'].push(test);            
            
            // set the student value usign action edit in vuex store
            this.$store.dispatch('students/edit', subject)
        }
    }
}
</script>

<style>

</style>
