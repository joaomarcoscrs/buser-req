<template>
    <div>
        <v-card 
        class="card-analise" 
        height="250" 
        width="400" 
        outlined>
        <div class="flexbox-card-analise">
            <div class="titulo-analise">
                <h2 class="font-weight-regular" style="color: #5B5B5B">{{req.title}}</h2>
                <v-btn icon small fab class="tirar-margens-do-botao"><img class="icone-slack" src="~/static/slack.png"></v-btn>
            </div>
            
            <div class="baixo-analise">
            <div class="info-card-analise">
                
                <div class="d-flex align-end">
                <template v-if="req.category == 'compra'">
                    <v-icon medium color="#FF3677" class="padding-dentro-card-analise">mdi-cart</v-icon>
                </template>
                <template v-if="req.category == 'obra'">
                    <v-icon medium color="#FF3677" class="padding-dentro-card-analise">mdi-account-hard-hat</v-icon>
                </template>
                <template v-if="req.category == 'manutenção'">
                    <v-icon medium color="#FF3677" class="padding-dentro-card-analise">mdi-hammer-wrench</v-icon>
                </template>

                </div>
                <div class="d-flex align-end">
                <template v-if="req.team == 'operações'">
                    <div class="flex-box-nome-icone">
                        <v-icon medium color="#49CB57" class="padding-dentro-card-analise">mdi-account-group</v-icon>
                        <span class="texto-icone padding-dentro-card font-weight-medium" style="color: #49CB57">{{req.team}}</span>
                    </div>
                </template>
                <template v-else-if="req.team == 'tecnologia'">
                    <div class="flex-box-nome-icone">
                        <v-icon medium color="#49B4CB" class="padding-dentro-card-analise">mdi-account-group</v-icon>
                        <span class="texto-icone padding-dentro-card font-weight-medium" style="color: #49B4CB">{{req.team}}</span>
                    </div>
                </template>
                <template v-else-if="req.team == 'marketing'">
                    <div class="flex-box-nome-icone">
                        <v-icon medium color="#FF7A00" class="padding-dentro-card-analise">mdi-account-group</v-icon>
                        <span class="texto-icone padding-dentro-card font-weight-medium" style="color: #FF7A00">{{req.team}}</span>
                    </div>
                </template>
                <template v-else-if="req.team == 'people'">
                    <div class="flex-box-nome-icone">
                        <v-icon medium color="#B80F74" class="padding-dentro-card-analise">mdi-account-group</v-icon>
                        <span class="texto-icone padding-dentro-card font-weight-medium" style="color: #B80F74">{{req.team}}</span>
                    </div>
                </template>
                <template v-else>
                    <div class="flex-box-nome-icone">
                        <v-icon medium color="#5B5B5B" class="padding-dentro-card-analise">mdi-account-group</v-icon>
                        <span class="texto-icone padding-dentro-card font-weight-medium" style="color: #5B5B5B">{{req.team}}</span>
                    </div>
                </template>

                </div>
                <div class="d-flex align-end">
                <template v-if="req.link !== null">
                    <div class="flex-box-link-analise">
                        <v-icon medium color="#367CDD" class="padding-dentro-card-analise">mdi-open-in-new</v-icon>
                        <span class="texto-icone padding-dentro-card font-weight-medium" style="color: #367CDD">
                        <a target="_blank" :href="req.link">link</a>
                        </span>
                    </div>
                </template>
                <template v-else>
                    <div class="flex-box-link-analise">
                        <v-icon medium color="#DCDCDC" class="padding-dentro-card-analise">mdi-open-in-new</v-icon>
                        <span class="texto-icone padding-dentro-card font-weight-medium" style="color: #DCDCDC">vazio</span>
                    </div>
                </template>

                </div>
            </div>

            <v-divider></v-divider>

            <div class="texto-descricao descricao-card-analise"><h2 class="font-weight-bold">Descrição: </h2><h2 class="font-weight-regular"> {{req.description}}</h2>
            </div>
            </div>
            <v-divider></v-divider>
            <div class="flex-box-botoes" style="background-color: #ECECEC">
            <v-btn @click="handler(req.id); " icon fab class="padding-dentro-card-analise"><v-icon medium color="#64A338">mdi-check</v-icon></v-btn>
            <v-btn @click="delete_req(req.id)" icon fab class="padding-dentro-card-analise"><v-icon medium color="#E03B24">mdi-window-close</v-icon></v-btn>
            </div>
        </div>
        </v-card>
    </div>
</template>

<script>
export default {
  props:['req'],
  computed: {
    reqs_analysis() {
      return this.$store.getters.reqs_analysis
    },
    reqs_board() {
      return this.$store.getters.reqs_board
    }
  },
  methods: {
   pass_to_board (id) {
      this.$store.dispatch('analyzeReq', {id: id})
   },
   delete_req (id) {
      this.$store.dispatch('deleteReq', {id: id})
   },
   update_backlog() {
      this.$store.dispatch('updateListIndex', {list: 'backlog'})
   },
   handler(id) {
      this.pass_to_board(id);
      this.update_backlog();
   }
  }
}
</script>

<style scoped>
.tirar-margens-do-botao {
    margin: -10px;
}
.icone-slack {
    height: 22px;
    width: auto;
}
.texto-icone {
  font-size: 17px;
  margin-left: 2px;
}
.flex-box-link-analise {

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
}
.flex-box-nome-icone {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
}
.padding-dentro-card-analise {
  padding-left:5px;
  padding-right:5px;
}
.texto-descricao {
  font-size: 10px;
  color: #969696;
}
.flex-box-botoes {
  display:flex;
  justify-content: space-between;
  padding: 0px;
}
.caixa-de-fora {
  display: flex;
  justify-content: center;
  overflow: auto;
}
.titulo-analise {
  justify-content: space-between;
  display: flex;
  flex-grow: 0;
  align-items: flex-start;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 12px;
}
.baixo-analise {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 80%;
}
.info-card-analise {
  height: 30%;
  display: flex;
  padding-left: 20px;
  justify-content: space-around;
  align-items: flex-end;
}
.descricao-card-analise {
  height: 50%;
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  overflow: auto;
}
.card-analise {
  margin: 5px;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
}
.flexbox-analise {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}
.flexbox-card-analise {
  display: flex;
  height:100%;
  flex-direction: column;
  justify-content: space-around;
}
.padding-dentro-card-analise {
  padding-left: 5px;
  margin: 0px;
}
</style>