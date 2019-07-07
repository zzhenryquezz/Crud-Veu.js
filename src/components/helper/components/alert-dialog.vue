<template>
    <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-title class="text-md-center">
            <v-spacer></v-spacer>
              <v-icon  color="red" class="py-4" size="100">warning</v-icon>
            <v-spacer></v-spacer>
            {{ message }}
            
          </v-card-title>
            <v-card-text v-if="subText !== null">
              {{ subText }}
            </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="positive">Deletar</v-btn>
            <v-btn color="success" flat @click="$emit('input' , false)">Cancelar</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>
export default {
    data(){
        return {
            showDialog: false
        }
    },
    props:{
        // link with v-model value
        value:{
            type: Boolean,
            required: true
        },
        message:{
          type: String,
          required: true
        },
        subText:{
          type: String,
          required: false,
          default: null
        }
    },
    computed:{
      dialog:{
        get(){
          return this.value;
        },
        set(value){
          this.$emit('input', value);
        }
      }
    },
    methods:{
      // emit a enevt to close the form
      closeDialog(){
        this.$emit('input' , false)
      },
      // emit a positive answer and close the form
      positive(){
        this.$emit('positive');
        this.closeDialog();    
      }
    }

}
</script>

<style>

</style>
