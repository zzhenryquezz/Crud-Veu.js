<template>
    <v-toolbar :color="$store.state.colors.primary" dark fixed app>
      <v-toolbar-side-icon @click.stop="$store.commit('toggleSidebar')"></v-toolbar-side-icon>
      <v-toolbar-title>{{ $route.name.toUpperCase() }}</v-toolbar-title>
    </v-toolbar>
</template>

<script>
export default {

}
</script>

<style>

</style>
