<template>
  <div>
    <div class="barra-filtro px-3">
      <v-select
        class="caixinhas-filtro"
        :items="options"
        v-model="key_to_filter"
        clearable="true"
        placeholder="filtrar por"
      >
      </v-select>
      <v-text-field
        class="caixinhas-filtro"
        v-model="value_to_filter"
        placeholder="valor a ser filtrado"
        clearable
      ></v-text-field>
    </div>
    <div class="overflow">
      <v-card
        v-for="status in statuses"
        :key="status"
        width="400"
        class="rounded-card boards-todos"
        color="#ECECEC"
        elevation="3"
      >
        <v-system-bar class="flex-box-barra" :class="status" height="50">
          <span>
            <h1 class="font-weight-regular texto-board">{{ status }}</h1>
          </span>
        </v-system-bar>
        <v-container
          class="overflow-vert box-alinhar-card-botao"
          style="min-height: 550px; max-height: 750px"
        >
          <v-row class="width-total">
            <draggable
              v-model="reqs_board[status]"
              :componentData="componentData"
              tag="transition-group"
              :animation="400"
              :empty-insert-threshold="80"
              group="board"
              v-bind="dragOptions"
              @change="handle($event, status)"
              @start="drag = true"
              @end="drag = false"
            >
              <reqcard
                v-for="req in $options.filters.filtro_card(
                  reqs_board[status],
                  key_to_filter,
                  value_to_filter
                )"
                :key="req.id"
                :req="req"
              ></reqcard>
            </draggable>
            <div key="footer" slot="footer" role="group" class="flex-add">
              <v-btn
                text
                raised
                block
                depressed
                color="#ECECEC"
                class="teste-botao"
                @click="add(status)"
                >Adicionar card</v-btn
              >
            </div>
          </v-row>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
import reqcard from "~/components/reqcard.vue";
import draggable from "vuedraggable";

export default {
  data: () => ({
    teste: {},
    componentData: {},
    options: ["por time", "por categoria", "por prioridade"],
    options_icons: [
      "mdi-account-group",
      "mdi-format-list-bulleted-type",
      "mdi-flag-variant",
    ],
    mostrar_input_filtro: false,
    key_to_filter: "",
    value_to_filter: "",
  }),
  components: {
    reqcard,
    draggable,
  },
  computed: {
    dragOptions() {
      return {
        group: "board",
        ghostClass: "ghost",
        swapThreshold: 1,
        touchStartThreshold: 5,
        fallbackTolerance: 5,
      };
    },
    reqs_board() {
      return this.$store.getters.reqs_board;
    },
    statuses() {
      return Object.keys(this.reqs_board);
    },
  },
  dragging: false,
  componentData: {
    props: {
      type: "transition",
      name: "flip-list",
    },
  },
  methods: {
    add(status) {
      this.$store.dispatch("addReq", { status: status });
      this.$store.dispatch("updateListIndex", { list: status });
    },
    update(list) {
      this.$store.dispatch("updateListStatus", { list: list });
      this.$store.dispatch("updateListIndex", { list: list });
    },
    update_removed(list) {
      this.$store.dispatch("updateListIndex", { list: list });
    },
    handle(evt, status) {
      self = this;
      if ("added" in evt) {
        let req = evt.added.element;
        self.$store.dispatch("updateReqStatus", { id: req.id, list: status });
        setTimeout(
          self.$store.dispatch("updateListIndex", { list: status }),
          100
        );
      }
      if ("moved" in evt) {
        let self = this;
        setTimeout(self.update_removed(status), 100);
      }
      if ("removed" in evt) {
        setTimeout(self.update_removed(status), 100);
      }
    },
    mudar_key() {
      this.key_to_filter = this.key;
    },
    mudar_value() {
      this.value_to_filter = this.value;
    },
  },
};
</script>

<style scoped>
.width-total {
  width: 100%;
}
.box-alinhar-card-botao {
  display: flex;
  justify-content: center;
}
.teste-botao {
  min-height: 100px;
  margin-top: 20px;
  color: #5b5b5b;
}
.flex-add {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 20px;
  order: 1000;
  width: 100%;
}
.overflow {
  overflow: auto;
  display: flex;
  position: relative;
  flex-shrink: 0;
}
.overflow-vert {
  overflow-y: auto;
  overflow-x: hidden;
}
.flex-box-barra {
  justify-content: center;
}
.rounded-card {
  border-radius: 10px;
}
.boards-todos {
  margin: 10px;
  min-width: 360px;
}
.texto-board {
  text-align: center;
  font-size: 34px;
  color: #ffffff;
}
.min-altura-draggable {
  min-height: 400px !important;
}
.ghost {
  opacity: 1;
}
.barra-filtro {
  display: flex;
  flex-flow: row;
  max-width: 450px;
  justify-content: space-between;
}
.caixinhas-filtro {
  max-width: 180px;
}
.backlog {
  background-color: #969696;
}
.pending {
  background-color: #f6c500;
}
.ongoing {
  background-color: #64a338;
}
.done {
  background-color: #3865a3;
}
.delivered {
  background-color: #3795ca;
}
</style>