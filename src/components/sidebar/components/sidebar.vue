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

        <v-list-tile
          active-class="blue" 
          v-for="(link, index) in links" 
          :key="index" 
          :to="link.to">
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>        

      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    data(){
      return {
        logo_src: require('./../../../assets/logo.png'),
        links:[
          {
            icon: 'home',
            text: 'Inicio',
            to: '/'
          },
          {
            icon: 'groups',
            text: 'Alunos',
            to: '/students'
          },
          {
            icon: 'account_balance',
            text: 'Materias',
            to: '/subjects'
          },
          {
            icon: 'assignment',
            text: 'Provas',
            to: '/tests'
          },
        ]
      }
    },
    computed:{
      toggleSidebar:{
        get(){
          // get the sidebar value in vuex store
          return this.$store.state.toggleSidebar;
        },
        set(){
          // call vuex mutation to toggle the sidebar
          this.$store.commit('toggleSidebar');
        }
      }
    }
}
</script>
