<template>
  <v-app id="inspire" class="site-root">
    <toolbar :state="layout"/>
    <sidenav-left :state="layout"/>
    <v-content>
      <v-container fluid>
        <nuxt></nuxt>
      </v-container>
    </v-content>
    <v-snackbar
      :timeout="snack.timeout"
      :color="snack.color"
      bottom
      v-model="snack.visible"
    >
      {{snack.text}}
      <v-btn dark flat @click.native="snack.visible = false">Fechar</v-btn>
    </v-snackbar>
  </v-app>
</template>
<script>
  import toolbar from '~/components/toolbar.vue'
  import sidenavLeft from '~/components/sidenav-left.vue'
  import footer from '~/components/footer.vue'
  export default {
    components: {
      toolbar,
      sidenavLeft,
      leFooter: footer
    },
    data: () => ({
      layout: {
        drawer: false,
      },
    }),
    computed: {
      snack () {
        return this.$store.getters.snack
      },
      reqs_board () {
        return this.$store.getters.reqs_board
      },
      filtered_board () {
        return this.$store.getters.reqs_board
      },
      reqs_archived () {
        return this.$store.getters.reqs_archived
      },
      reqs_analysis () {
        return this.$store.getters.reqs_analysis
      },
    },
    created() {
      this.$store.dispatch('fetchReqs')
    },
    head() {
      return {
        title: "buser-req [facilities]"
      };
  }
  }
</script>

<style scoped>
  .site-root {
    background-color: #D1D1D1;
  }
</style>