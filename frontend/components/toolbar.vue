<template>
  <v-toolbar color="white" dark fixed app clipped-right>
    <v-toolbar-side-icon class="cinza-escuro" @click.stop="state.drawer = !state.drawer"></v-toolbar-side-icon>
    <v-flex class="search-box">
      <v-text-field class="search-box"
          light
          solo
          outlined
          shaped
          background-color="#ECECEC"
          color="#969696"
          clearable
          prepend-inner-icon="search"
          placeholder="busca textual">
      </v-text-field>
    </v-flex>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-btn v-if="!logged_user" flat dark ripple class="ma-0 ml-5 cinza-escuro"  @click="open_login_dialog($event)"><v-icon>mdi-account-arrow-right</v-icon></v-btn>
    <span v-if="logged_user" class="texto-bem-vindo font-weight-regular">olá {{logged_user.first_name}}, tudo bem?</span>
    <v-menu v-if="logged_user" offset-y>
      <v-btn icon slot="activator" class="ma-0 ml-5 cinza-escuro">
        <v-avatar size="36px">
          <img src="https://graph.facebook.com/4/picture?width=300&height=300">
        </v-avatar>
      </v-btn>
      <v-card class="no-padding">
        <v-list two-line>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-avatar>
                <img src="https://graph.facebook.com/4/picture?width=300&height=300">
              </v-avatar>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{logged_user.first_name}} {{logged_user.last_name}}</v-list-tile-title>
              <v-list-tile-sub-title>{{logged_user.email}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list>
          <v-list-tile :to="{name: 'perfil'}">
            <v-list-tile-content>
              <v-list-tile-title>Perfil</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="logout()">
            <v-list-tile-content>
              <v-list-tile-title>Sair</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-menu>
    <!-- <v-toolbar-side-icon @click.stop="state.drawerRight = !state.drawerRight"></v-toolbar-side-icon> -->
    <login-dialog ref="login_dialog"/>
  </v-toolbar>
</template>

<script>
  import Vuex from 'vuex'
  import loginDialog from '~/components/login-dialog.vue'
  import Snacks from '~/helpers/Snacks.js'
  import AppApi from '~apijs'
  export default {
    components: {
      loginDialog
    },
    computed: Object.assign(
      {},
      Vuex.mapGetters([
        'logged_user'
      ])
    ),
    props: ['state'],
    methods: {
      open_login_dialog (evt) {
        this.$refs.login_dialog.open();
        evt.stopPropagation();
      },
      logout(){
        AppApi.logout().then(()=>{
          this.$store.commit('SET_LOGGED_USER', null);
          Snacks.show(this.$store, {text: 'Até logo!'})
        });
      }
    }
  }
</script>

<style scoped>
.cinza-escuro {
  color: #969696;
}
.search-box{
    border-radius: 40px;
    margin-top: 5px;
}
.texto-bem-vindo {
  color: #969696;
  font-size: 16px;
}
</style>