<template>
      <v-navigation-drawer
      :value="toggleSidebar"
      fixed
      app
      dark
      class="px-4 py-2"
    >
      <v-list class="p-2">
        
        <v-list-tile avatar>          
            <v-avatar size="45">
               <v-img
                :src="logo_src"
                height="34"
                contain
              />              
            </v-avatar>
            <v-list-tile-title class="title">
            App de Alunos
          </v-list-tile-title>
        </v-list-tile> 

        <v-divider/>

        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/students">
          <v-list-tile-action>
            <v-icon>groups</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Alunos</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>        
       
        <v-list-tile to="/subjects">
          <v-list-tile-action>
            <v-icon>account_balance</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Materias</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>        

      </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
export default {
    data(): object{
      return {
        logo_src: require('./../../../assets/logo.png')
      }
    },
    computed:{
      toggleSidebar:{
        get(): boolean{
          return this.$store.state.toggleSidebar;
        },
        set: function(){
          this.$store.commit('toggleSidebar');
        }
      }
    }
}
</script>
