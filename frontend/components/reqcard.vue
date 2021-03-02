<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-card
          id="card"
          v-bind="attrs"
          v-on="on"
          class="margin-card rounded-task-card"
          elevation="4"
          @click="openCardDetails($event, req)"
        >
          <!-- <v-card
          id="card"
          v-bind="attrs"
          v-on="on"
          class="margin-card rounded-task-card"
          elevation="4"
          @click="openCardDetails($event, req)"
        > -->
          <v-card-title
            style="color: #5b5b5b"
            contenteditable
            v-text="req.title"
            @blur="onEdit($event, 'title', req.id)"
            class="headline titulo-tasks font-weight-regular"
          ></v-card-title>
          <div class="flex-box-content-card">
            <div class="flex-box-content-linha">
              <div class="esquerda">
                <template :class="req.team">
                  <v-icon :class="req.team" class="padding-dentro-card"
                    >mdi-account-group</v-icon
                  >
                  <span
                    class="texto-card-content padding-dentro-card"
                    :class="req.team"
                  ></span>
                  <div
                    :class="req.team"
                    contenteditable
                    v-text="req.team"
                    @blur="onEdit($event, 'team', req.id)"
                  ></div>
                </template>
              </div>
              <div class="direita">
                <template>
                  <v-icon
                    :class="'prioridade-' + req.priority"
                    class="padding-dentro-card"
                    >mdi-flag-variant</v-icon
                  >
                  <h1
                    class="texto-card-content padding-dentro-card cursor-setinha"
                    :class="'prioridade-' + req.priority"
                  >
                    prioridade
                  </h1>
                  <div
                    :class="'prioridade-' + req.priority"
                    contenteditable
                    v-text="req.priority"
                    @blur="onEdit($event, 'priority', req.id)"
                  ></div>
                </template>
              </div>
            </div>
            <div class="flex-box-content-linha">
              <div class="esquerda">
                <template v-if="req.category == 'compra'">
                  <v-icon color="#FF3677" class="padding-dentro-card"
                    >mdi-cart</v-icon
                  >
                </template>
                <template v-else-if="req.category == 'obra'">
                  <v-icon color="#FF3677" class="padding-dentro-card"
                    >mdi-account-hard-hat</v-icon
                  >
                </template>
                <template v-else-if="req.category == 'manutenção'">
                  <v-icon color="#FF3677" class="padding-dentro-card"
                    >mdi-hammer-wrench</v-icon
                  >
                </template>
                <template v-else>
                  <v-icon color="#FF3677" class="padding-dentro-card"
                    >mdi-new-box</v-icon
                  >
                </template>
                <span
                  class="texto-card-content padding-dentro-card"
                  style="color: #ff3677"
                ></span>
                <div
                  style="color: #ff3677"
                  contenteditable
                  v-text="req.category"
                  @blur="onEdit($event, 'category', req.id)"
                ></div>
              </div>
              <div class="container-link">
                <div class="direita overflow-link">
                  <template v-if="req.link !== '-'">
                    <v-icon
                      @click="openInNewTab(req.link)"
                      color="#367CDD"
                      class="padding-dentro-card"
                      >mdi-open-in-new</v-icon
                    >
                    <h1
                      contenteditable
                      @blur="onEdit($event, 'link', req.id)"
                      class="texto-card-content padding-dentro-card elipsar-texto linkeditavel ma-0 pa-0"
                    >
                      {{ req.link }}
                    </h1>
                  </template>
                  <template v-else>
                    <v-icon color="#DCDCDC" class="padding-dentro-card"
                      >mdi-open-in-new</v-icon
                    >
                    <h1
                      contenteditable
                      @blur="onEdit($event, 'link', req.id)"
                      class="texto-card-content padding-dentro-card elipsar-texto linkeditavel ma-0 pa-0"
                    >
                      -
                    </h1>
                  </template>
                </div>
                <v-btn
                  v-if="!req.archived"
                  icon
                  style="margin: 0px 0px 10px 0px"
                  @click="archive(req.id, req.status)"
                >
                  <v-icon color="#969696">mdi-delete</v-icon>
                </v-btn>
                <v-btn
                  v-else
                  icon
                  style="margin: 0px 0px 10px 0px"
                  @click="unarchive(req.id, req.status)"
                >
                  <v-icon color="#367CDD">mdi-delete-restore</v-icon>
                </v-btn>
              </div>
            </div>
            <h1 class="card-creator">{{ req.creator }}</h1>
          </div>
        </v-card>
      </template>
      <span>{{ req.description }}</span>
    </v-tooltip>
    <cardDetails ref="cardDetails" />
  </div>
</template>

<script>
import cardDetails from "~/components/cardDetails.vue";

export default {
  props: ["req"],
  components: { cardDetails },
  data: () => ({
    direction: "top",
    fab: false,
    fling: false,
    hover: true,
    tabs: null,
    top: false,
    right: true,
    bottom: true,
    left: false,
    transition: "slide-y-reverse-transition",
    editing_link: false,
  }),
  methods: {
    archive(id, list) {
      this.$store.dispatch("archiveReq", { id: id });
      this.$store.getters.reqs_board;
      this.$store.dispatch("updateListIndex", { list: list });
    },
    unarchive(id, list) {
      this.$store.dispatch("unarchiveReq", { id: id });
      this.$store.dispatch("updateListIndex", { list: list });
    },
    onEdit(evt, prop, id) {
      let input = evt.target.innerText;
      this.$store.dispatch("updateReq", { id: id, prop: prop, input: input });
    },
    openInNewTab(url) {
      var win = window.open(url, "_blank");
      win.focus();
    },
    openCardDetails(evt, req) {
      this.$refs.cardDetails.open(req);
      evt.stopPropagation();
    },
  },
  computed: {
    reqs_board() {
      return this.$store.getters.reqs_board;
    },
    reqs_archived() {
      return this.$store.getters.reqs_archived;
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
  font-weight: 700 !important;
  border: none;
  outline: none;
  cursor: text !important;
}
[contenteditable]:focus {
  overflow: visible;
  text-overflow: clip;
}
.overflow-link:focus-within {
  width: 200px !important;
  overflow-x: auto;
}
.tirar-margem-botao {
  margin: 0px;
  margin-right: 10px;
}
.rounded-task-card {
  border-radius: 6px;
}
.margin-card {
  color: #ffffff;
}
.flex-box-barra {
  justify-content: center;
}
.titulo-tasks {
  color: #5b5b5b;
  font-size: 18px !important;
  padding: 10px;
  margin-left: 15px;
  overflow: auto;
  height: 60px;
}
.flex-box-content-card {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  margin: 10px;
}
.flex-box-content-linha {
  display: flex;
  flex-flow: row no-wrap;
  flex-grow: 1;
  justify-content: space-between;
  min-width: 280px;
}
.texto-card-content {
  font-size: 14px;
  font-weight: 400;
}
.esquerda {
  display: flex;
  margin-left: 10px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: start;
  width: 50%;
}
.direita {
  position: relative;
  display: flex;
  margin-right: 10px;
  margin-bottom: 10px;
  justify-content: start;
  align-items: center;
  width: 50%;
}
.padding-dentro-card {
  padding: 3px;
}
.container-link {
  display: flex;
  margin-right: 0px;
  justify-content: space-between;
  width: 50%;
  align-items: flex-center;
}
.overflow {
  overflow: auto;
  display: flex;
  position: relative;
  flex-shrink: 0;
  margin-right: 10px;
  margin-left: 10px;
}
.ghost-card {
  min-height: 10px;
  height: 10px;
  content: ".";
  visibility: hidden;
}
.card-creator {
  color: #797979;
  cursor: default;
  font-size: 12px;
  font-weight: 400;
  margin-left: 15px;
  margin-top: -12px;
  padding-bottom: 5px;
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