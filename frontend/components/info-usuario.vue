<template>
  <v-dialog v-model="visible" max-width="500px">
    <v-card
  elevation="4"
  outlined
  shaped>
        <v-card-title><h1 class="font-weight-thin texto-rosa">detalhes do usuário </h1></v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-text-field label="Usuário" required v-model="username"/>
            <v-text-field label="Senha" type="password" required v-model="password" @keyup.enter="login()"/>
            <small style="color: red;" v-if="error">Senha e/ou usuário inválido(s)</small>
          </v-container>
        </v-card-text>
        <v-btn class="texto-rosa darken-1" flat @click="close()">Cancelar</v-btn>
        <v-btn class="texto-rosa darken-1" flat @click="change_info('admin')" :loading="loading" :disabled="loading">Alterar informações</v-btn>
    </v-card>
  </v-dialog>
</template>

<script>

import AppApi from '~apijs'

export default {
  data () {
    console.log('data');
    return {
      visible: false,
      loading: false,
      username: '',
      password: '',
      error: false,
    };
  },
  methods: {
    open(){
      this.visible = true;
      console.log('Open');
    },
    close(){
      this.visible = false;
      console.log('Close');
    },
    change_info(role){
      this.loading = true;
      this.error = false;
      AppApi.change_user_info(this.id, role).then((result)=>{
        var deu_certo = result.data;
        this.loading = false;
      });
    },
  },
}
</script>

<style scoped>
  .texto-rosa {
    color: #D81B60;
  }
  .rounded-card{
      border-radius:30px;
  }
</style>