<template>
  <v-navigation-drawer class="fundo-rosa" fixed v-model="state.drawer" app>
    <v-list dense class="texto-branco">
      <v-list-tile @click.stop="state.left = !state.left">
        <v-list-tile-action>
          <v-icon class="texto-branco">exit_to_app</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title><h4>Open Temporary Drawer</h4></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    props: ['state']
  }
</script>

<style scoped>
  .fundo-rosa {
    background-color: #D81B60;
  }
  .texto-branco {
  color: #ffffff;
  }
</style>