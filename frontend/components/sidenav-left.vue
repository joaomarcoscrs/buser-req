<template>
  <v-navigation-drawer class="fundo-rosa" fixed v-model="state.drawer" app>
<link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">    
<v-list two-line rounded class="texto-branco">
      <v-list-tile>
        <v-list-tile-content class="margem-topo">
          <span><img class="tamanho-buser-req" src="~/static/buser-req-logo.png"></span>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile :to="{name: 'index'}">
        <v-list-tile-action>
          <v-icon medium color="white">home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title><h1 class="font-weight-thin fonte-maior texto-branco">solicitações</h1></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile :to="{name: 'analise'}">
        <v-list-tile-action>
          <v-icon medium class="texto-branco">mdi-text-box-check-outline</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title><h1 class="font-weight-thin fonte-maior texto-branco">para análise</h1></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile :to="{name: 'usuarios'}">
        <v-list-tile-action>
          <v-icon medium class="texto-branco">mdi-account-multiple</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title><h1 class="font-weight-thin fonte-maior texto-branco">usuários</h1></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile :to="{name: 'arquivados'}">
        <v-list-tile-action>
          <v-icon medium class="texto-branco">mdi-delete</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title><h1 class="font-weight-thin fonte-maior texto-branco">cards arquivados</h1></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    props: ['state'],
    icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
  }
</script>

<style scoped>
  .fundo-rosa {
    background-color: #FF3677;
  }
  .texto-branco {
  color: #ffffff !important;
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
