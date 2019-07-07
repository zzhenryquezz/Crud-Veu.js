<template>
    <v-form 
        v-model="validData"
        ref="form"
        @submit.prevent="handleSubmitForm">
        <v-card>
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
                    <v-flex xs12>
                        <v-text-field 
                            :rules="[rules.required]"
                            type="number" 
                            label="Nota do Aluno" 
                            v-model="value" />                        
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions>
                <v-btn color="success" type="submit">Salvar</v-btn>
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
            value: '',
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
    created(){
        this.$store.dispatch('tests/setAll');
    },
    computed:{
        tests(){
            return this.$store.state.tests.all;
        }
    },
    watch:{
        editedTest(value){
            if(value !== null){
                this.fk_test = value.fk_test;
                this.value = value.value;
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
        handleSubmitForm(){
            // check data
            if(!this.validate()) return

            if(this.editedTest !== null && this.editedIndex !== null){
                this.editTest();
            }else{
                this.addNewTest();
            }

            // close the form and reset values    
            this.$emit('close');
            this.fk_test = '';
            this.value = '';
            this.$refs.form.reset();
        },
        editTest(){
            let subject = JSON.parse(JSON.stringify(this.student));
            
            let test = {
                fk_test: this.fk_test,
                value: this.value
            };

            subject['tests'][this.editedIndex] = test;
            this.$store.dispatch('students/edit', subject)
        },
        addNewTest(){
            // remove watchers
            let subject = JSON.parse(JSON.stringify(this.student));

            if(subject['tests'] == undefined){
                subject['tests'] = [];
            }
            let test = {
                fk_test: this.fk_test,
                value: this.value
            };

            subject['tests'].push(test);            
            this.$store.dispatch('students/edit', subject)
        }
    }
}
</script>

<style>

</style>
