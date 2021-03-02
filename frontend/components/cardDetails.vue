<template>
  <v-dialog v-model="visible" max-width="800px">
    <v-card elevation="4" outlined shaped>
      <v-card-title
        ><h1 class="font-weight-thin texto-rosa">
          detalhes do card
        </h1></v-card-title
      >
      <v-container class="flex-linha">
        <v-card-text>
          <v-container fluid class="flex-texto">
            <div class="infos_linhas">
              <div class="req-key">
                <v-icon large class="texto-rosa">mdi-account</v-icon
                >&nbsp;&nbsp;
              </div>
              <div class="req-value">{{ req.title }}</div>
            </div>

            <div class="infos_linhas">
              <div class="req-key">
                <v-icon large class="texto-rosa">mdi-format-letter-case</v-icon
                >&nbsp;&nbsp;
              </div>
              <div class="req-value">prioridade &nbsp; {{ req.priority }}</div>
            </div>

            <div class="infos_linhas">
              <div class="req-key">
                <v-icon large class="texto-rosa">mdi-at</v-icon>&nbsp;&nbsp;
              </div>
              <div class="req-value">{{ req.link }}</div>
            </div>

            <div class="infos_linhas">
              <div class="req-key">
                <v-icon large class="texto-rosa">mdi-calendar</v-icon
                >&nbsp;&nbsp;
              </div>
              <div class="req-value">último login {{ req.category }}</div>
            </div>

            <div class="infos_linhas">
              <div class="req-key">
                <v-icon large class="texto-rosa">mdi-account-group</v-icon
                >&nbsp;&nbsp;
              </div>
              <div class="req-value">{{ req.team }}</div>
            </div>

            <div class="infos_linhas">
              <div class="req-key">
                <v-icon large class="texto-rosa">mdi-account-group</v-icon
                >&nbsp;&nbsp;
              </div>
              <div class="req-value">{{ req.description }}</div>
            </div>
          </v-container>
        </v-card-text>
      </v-container>
      <v-btn class="texto-rosa darken-1" flat @click="close()">Fechar</v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      error: false,
      req: {},
    };
  },
  methods: {
    open(req) {
      this.visible = true;
      this.req = req;
    },
    close() {
      this.visible = false;
    },
    onEdit(evt, prop) {
      let input = evt.target.innerText;
      this.$store.dispatch("updateReq", {
        id: req.id,
        prop: prop,
        input: input,
      });
    },
  },
};
</script>

<style scoped>
.req-value {
  color: #5b5b5b;
  font-weight: 200;
  font-size: 20px;
}
.req-key {
  color: #ff3677;
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
  color: #ff3677;
}
.rounded-card {
  border-radius: 30px;
}
.elipsar-texto {
  min-width: 90px;
  max-width: 90px;
  color: "#5B5B5B";
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cursor-setinha {
  cursor: default;
}
.people {
  color: #b80f74;
}
.marketing {
  color: #ff7a00;
}
.tecnologia {
  color: #49b4cb;
}
.operações {
  color: #229c2e;
}
.financeiro {
  color: #db2c2c;
}
.suporte {
  color: #272be4;
}
.legal {
  color: #dabc13;
}
.newbiz {
  color: #000000;
}
.prioridade-0 {
  color: #e03b24;
}
.prioridade-1 {
  color: #f16500;
}
.prioridade-2 {
  color: #fdcb01;
}
.prioridade-3 {
  color: #57d71b;
}
</style>