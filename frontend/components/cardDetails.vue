<template>
  <v-dialog v-model="visible" max-width="800px">
    <v-card elevation="4" outlined shaped>
      <v-card-title
        ><h1 class="font-weight-thin texto-rosa ml-2">detalhes do card</h1>
        &nbsp;&nbsp;&nbsp;
        <h1
          class="font-weight-thin"
          style="color: #424242"
          contenteditable
          @blur="onEdit($event, 'title', req.id)"
        >
          {{ req.title }}
        </h1></v-card-title
      >
      <v-container class="flex-linha ma-0 pa-0">
        <v-card-text class="mx-4 pa-0">
          <v-container fluid class="flex-texto ma-0 pa-0">
            <div class="infos_linhas my-2">
              <div class="req-key"></div>
              &nbsp;&nbsp;
              <div class="req-value" style="font-size: 18px">criado por</div>
              &nbsp;&nbsp;
              <div class="req-value" style="font-weight: 300; font-size: 18px">
                {{ req.creator }}
              </div>
            </div>

            <div class="infos_linhas my-1">
              <div class="req-key" style="width: 40px">
                <v-icon size="30" :class="'prioridade-' + req.priority"
                  >mdi-flag-variant</v-icon
                >
              </div>
              <div class="req-value" :class="'prioridade-' + req.priority">
                prioridade:
              </div>
              &nbsp;&nbsp;
              <div
                contenteditable
                @blur="onEdit($event, 'priority', req.id)"
                class="req-value"
                :class="'prioridade-' + req.priority"
              >
                {{ req.priority }}
              </div>
            </div>

            <div class="infos_linhas my-1">
              <div class="req-key" style="width: 40px">
                <v-icon
                  v-if="req.category == 'compra'"
                  size="30"
                  class="texto-rosa"
                  >mdi-cart</v-icon
                >
                <v-icon
                  v-else-if="req.category == 'obra'"
                  size="30"
                  class="texto-rosa"
                  >mdi-account-hard-hat</v-icon
                >
                <v-icon
                  v-else-if="req.category == 'manutenção'"
                  size="30"
                  class="texto-rosa"
                  >mdi-hammer-wrench</v-icon
                >
                <v-icon v-else size="30" class="texto-rosa">mdi-new-box</v-icon>
              </div>
              <div class="req-value texto-rosa">categoria:</div>
              &nbsp;&nbsp;
              <div
                contenteditable
                @blur="onEdit($event, 'category', req.id)"
                class="req-value texto-rosa"
              >
                {{ req.category }}
              </div>
            </div>

            <div class="infos_linhas my-1">
              <div class="req-key" style="width: 40px">
                <v-icon size="30" :class="req.team">mdi-account-group</v-icon>
              </div>
              <div class="req-value" :class="req.team">time:</div>
              &nbsp;&nbsp;
              <div
                contenteditable
                @blur="onEdit($event, 'team', req.id)"
                class="req-value"
                :class="req.team"
              >
                {{ req.team }}
              </div>
            </div>

            <div class="infos_linhas my-1">
              <div class="req-key" style="width: 40px">
                <v-icon size="30" color="#367CDD">mdi-link</v-icon>
              </div>
              <div class="req-value" style="color: #367cdd">link:</div>
              &nbsp;&nbsp;
              <div
                contenteditable
                @blur="onEdit($event, 'link', req.id)"
                class="req-value"
                style="color: #367cdd"
              >
                {{ req.link }}
              </div>
            </div>

            <div class="infos_linhas my-1">
              <div class="req-key" style="width: 40px">
                <v-icon size="30">mdi-text</v-icon>
              </div>
              <div class="req-value">descrição:</div>
              &nbsp;&nbsp;
              <div
                contenteditable
                @blur="onEdit($event, 'description', req.id)"
                class="req-value"
              >
                {{ req.description }}
              </div>
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
        id: this.req.id,
        prop: prop,
        input: input,
      });
    },
  },
};
</script>

<style scoped>
[contenteditable],
h1 {
  color: #5b5b5b;
}
[contenteditable]:active {
  border: none;
  outline: none;
  cursor: text !important;
}
[contenteditable]:hover,
[contenteditable]:focus {
  color: #ff3677 !important;
  font-weight: 500 !important;
  border: none;
  outline: none;
  cursor: text !important;
}
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
  justify-content: flex-start;
  align-items: flex-start;
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