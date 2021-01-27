<template>
  <v-dialog v-model="visible" max-width="500px">
    <v-card
  elevation="4"
  outlined
  shaped>
        <v-card-title><h1 class="font-weight-thin texto-rosa">vamo lá? 🙂 </h1></v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-text-field label="Usuário" required v-model="username"/>
            <v-text-field label="Senha" type="password" required v-model="password" @keyup.enter="login()"/>
            <small style="color: red;" v-if="error">Senha e/ou usuário inválido(s)</small>
          </v-container>
        </v-card-text>
        <v-btn class="texto-rosa darken-1" flat @click="close()">Cancelar</v-btn>
        <v-btn class="texto-rosa darken-1" flat @click="login()" :loading="loading" :disabled="loading">Entrar</v-btn>
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
    login(){
      this.loading = true;
      this.error = false;
      AppApi.login(this.username, this.password).then((result)=>{
        var user = result.data;
        if(user){
          this.$store.commit('SET_LOGGED_USER', user);
          this.visible = false;
          console.log('logged')
        } else {
          this.error = true;
        }
        this.loading = false;
      });
    },
  },
}
</script>

<style scoped>
  .texto-rosa {
    color: #FF3677;
  }
  .rounded-card{
      border-radius:30px;
  }
</style>