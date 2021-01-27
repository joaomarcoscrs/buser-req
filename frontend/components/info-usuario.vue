<template>
  <v-dialog v-model="visible" max-width="800px">
    <v-card 
  elevation="4"
  outlined
  shaped>
        <v-card-title><h1 class="font-weight-thin texto-rosa">detalhes do usuário </h1></v-card-title>
        <v-container class="flex-linha">
        <v-avatar style="margin:10px 10px 20px 35px;" size="200"><img :src="user.profile_picture"></v-avatar>
        <v-card-text>
          <v-container fluid class="flex-texto">
            
            <div class="infos_linhas">
              <div class="user-key"><v-icon large class="texto-rosa">mdi-account</v-icon>&nbsp;&nbsp;</div>
              <div class="user-value">{{user.username}}</div>
            </div>

            <div class="infos_linhas">
              <div class="user-key"><v-icon large class="texto-rosa">mdi-format-letter-case</v-icon>&nbsp;&nbsp;</div>
              <div class="user-value">{{user.first_name}} {{user.last_name}}</div>
            </div>

            <div class="infos_linhas">
              <div class="user-key"><v-icon large class="texto-rosa">mdi-at</v-icon>&nbsp;&nbsp;</div>
              <div class="user-value">{{user.email}}</div>
            </div>

            <div class="infos_linhas">
              <div class="user-key"><v-icon large class="texto-rosa">mdi-calendar</v-icon>&nbsp;&nbsp;</div>
              <div class="user-value">último login {{user.last_login | timeago}}</div>
            </div>

            <div class="infos_linhas">
              <div class="user-key"><v-icon large class="texto-rosa">mdi-account-group</v-icon>&nbsp;&nbsp;</div>
              <div class="user-value">{{user.team}}</div>
            </div>

            <div class="infos_linhas">
              <div v-if="user.role == 'admin'" class="user-key"><v-icon large class="texto-rosa">mdi-shield-account</v-icon>&nbsp;&nbsp;</div>
              <div v-else class="user-key"><v-icon large class="texto-rosa">mdi-eye</v-icon>&nbsp;&nbsp;</div>
              <div class="user-value">{{user.role}}</div>
            </div>
          </v-container>
        </v-card-text>
        </v-container>
        <v-btn class="texto-rosa darken-1" flat @click="close()">Fechar</v-btn>
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
      error: false,
      user: {}
    };
  },
  methods: {
    open(user){
      this.visible = true;
      this.user = user;
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
    }
  }
}
</script>

<style scoped>
.user-value {
  color: #5B5B5B;
  font-weight: 200;
  font-size: 20px;
}
.user-key {
  color: #FF3677;
}
.infos_linhas {
  display: flex;
  margin: 10px;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
.flex-linha {
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex-texto {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: flex-start;
}
  .texto-rosa {
    color: #FF3677;
  }
  .rounded-card{
      border-radius:30px;
  }
</style>