<template>
  <v-app id="inspire">
  
    <!-- Globar Sidebar -->
    <Sidebar />
    <!-- Globar Top Navabr -->
    <TopNavbar />

    <v-content>
          
          <!-- Router component that shows the pages of app -->
          <router-view></router-view>

    </v-content>

    <v-footer :color="$store.state.colors.primary" app>
      <span class="white--text pl-2">&copy; Htron Devlopments {{ new Date().getFullYear() }}</span>
    </v-footer>
    
  </v-app>
</template>

<script>
  export default {    
    components:{
      Sidebar: require('./components/sidebar').Sidebar, // sidebar to show in all pages
      TopNavbar: require('./components/top-navbar').TopNavbar, // top navbar to show in all pages
    },
    created(){
      // set the all students in store
      this.$store.dispatch('students/setAll');
      // set the all subjects in store
      this.$store.dispatch('subjects/setAll');
      // set the all tests in store
      this.$store.dispatch('tests/setAll');
    }
  }
</script>
