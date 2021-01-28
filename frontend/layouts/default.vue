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
  let self = this;
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
      reqs () {
        self.$store.dispatch('fetchReqs')
        return self.$store.getters.reqs
      }
    },
    created() {
      this.$store.dispatch('fetchReqs')
    }
  }
</script>

<style scoped>
  .site-root {
    background-color: #D1D1D1;
  }
</style>