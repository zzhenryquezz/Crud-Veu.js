<template>
    <v-toolbar :color="$store.state.colors.primary" dark fixed app>
      <v-toolbar-side-icon @click.stop="$store.commit('toggleSidebar')"></v-toolbar-side-icon>
      <v-toolbar-title>{{ title.toUpperCase() }}</v-toolbar-title>
    </v-toolbar>
</template>

<script>
export default {
  computed:{
    title: function(){
      let title = this.$route.meta.title || this.$route.name;
      return title;
    }
  }
}
</script>

<style>

</style>
