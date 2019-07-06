<template>
    <v-dialog v-model="value" max-width="290">
        <v-card>
          <v-card-title class="text-md-center">
            <v-spacer></v-spacer>
              <v-icon  color="red" class="py-4" x-large>warning</v-icon>
            <v-spacer></v-spacer>
            {{ message }}
            
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="positive">Deletar</v-btn>
            <v-btn color="success" flat @click="$emit('input' , false)">Cancelar</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script lang="ts">
export default {
    data(){
        return {
            showDialog: false
        }
    },
    props:{
        // link with v-model
        value:{
            type: Boolean,
            required: true
        },
        message:{
          type: String,
          required: true
        }
    },
    methods:{
      closeDialog(){
        this.$emit('input' , false)
      },
      positive(){
        this.$emit('positive');
        this.closeDialog();    
      }
    }

}
</script>

<style>

</style>
