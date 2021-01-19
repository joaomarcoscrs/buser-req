<template>
  <v-navigation-drawer class="fundo-rosa" fixed v-model="state.drawer" app>
    <v-list two-line rounded class="texto-branco">
      <v-list-tile>
        <v-list-tile-content class="margem-topo">
          <span><img class="tamanho-buser-req" src="~/static/buser-req-logo.png"></span>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile @click.stop="state.left = !state.left">
        <v-list-tile-action>
          <v-icon medium class="texto-branco">home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title><h1 class="font-weight-thin fonte-maior">solicitações</h1></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile @click.stop="state.left = !state.left">
        <v-list-tile-action>
          <v-icon medium class="texto-branco">mdi-text-box-check-outline</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title><h1 class="font-weight-thin fonte-maior">para análise</h1></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile @click.stop="state.left = !state.left">
        <v-list-tile-action>
          <v-icon medium class="texto-branco">mdi-account-multiple</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title><h1 class="font-weight-thin fonte-maior">usuários</h1></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import '@mdi/font/css/materialdesignicons.css' 
  export default {
    props: ['state'],
    icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
  }
</script>

<style scoped>
  .fundo-rosa {
    background-color: #D81B60;
  }
  .texto-branco {
  color: #ffffff;
  }
  .fonte-maior {
    font-size: 24px;
  }
  .tamanho-buser-req {
    height: 50%;
    width: auto;
    margin-top: 25px;
    margin-bottom: 15px;
  }
</style>