<template>
   <div class="overflow">
    <v-card 
        width="400"
        class="rounded-card boards-todos"
        color="#ECECEC"
        elevation="3"
        >
        <v-system-bar class="flex-box-barra"
        color="#969696"
        height="50"
        >
        <span>
            <h1 class="font-weight-regular texto-board">backlog</h1>
        </span>
        </v-system-bar>
        <v-container class="overflow-vert box-alinhar-card-botao" style="min-height: 550px; max-height: 750px">
            <v-row class="width-total">
                <draggable v-model="backlog"
                     :componentData="componentData"
                     tag="transition-group"
                     :animation="400"
                     :empty-insert-threshold="80"
                     group="board"
                     v-bind="dragOptions"
                     @start="drag = true"
                     @end="drag = false">
                     <reqcard v-for="req in reqs.backlog" :key="req.id" :req="req"></reqcard>
                </draggable>
                     <div key="footer" slot="footer" role="group" class="flex-add">
                           <v-btn text raised block depressed color="#ECECEC" class="teste-botao" @click="add('backlog')">Adicionar card</v-btn>
                     </div>
            </v-row>
        </v-container>
    </v-card>

    <v-card 
        width="400"
        class="rounded-card boards-todos"
        color="#ECECEC"
        elevation="3"
        >
        <v-system-bar class="flex-box-barra"
        color="#F6C500"
        height="50"
        >
        <span>
            <h1 class="font-weight-regular texto-board">pendente</h1>
        </span>
        </v-system-bar>
        <v-container class="overflow-vert box-alinhar-card-botao" style="min-height: 550px; max-height: 750px">
            <v-row dense class="width-total">
                <draggable v-model="pending"
                     :componentData="componentData"
                     tag="transition-group"
                     :animation="400"
                     :empty-insert-threshold="80"
                     group="board"
                     v-bind="dragOptions"
                     @start="drag = true"
                     @end="drag = false">
                     <reqcard v-for="req in reqs.pending" :key="req.id" :req="req"></reqcard>
                </draggable>
                     <div key="footer" slot="footer" role="group" class="flex-add">
                           <v-btn text raised block depressed color="#ECECEC" class="teste-botao" @click="add('pending')">Adicionar card</v-btn>
                     </div>
            </v-row>
        </v-container>
    </v-card>

    <v-card 
        width="400"
        class="rounded-card boards-todos"
        color="#ECECEC"
        elevation="3"
        >
        <v-system-bar class="flex-box-barra"
        color="#64A338"
        height="50"
        >
        <span>
            <h1 class="font-weight-regular texto-board">em andamento</h1>
        </span>
        </v-system-bar>
        <v-container class="overflow-vert box-alinhar-card-botao" style="min-height: 550px; max-height: 750px">
            <v-row dense class="width-total">
                <draggable v-model="ongoing"
                     :componentData="componentData"
                     tag="transition-group"
                     :animation="400"
                     :empty-insert-threshold="80"
                     group="board"
                     v-bind="dragOptions"
                     @start="drag = true"
                     @end="drag = false">
                     <reqcard v-for="req in reqs.ongoing" :key="req.id" :req="req"></reqcard>
                </draggable>
                     <div key="footer" slot="footer" role="group">
                           <v-btn text raised block depressed color="#ECECEC" class="teste-botao" @click="add('ongoing')">Adicionar card</v-btn>
                     </div>
            </v-row>
        </v-container>
    </v-card>

    <v-card 
        width="400"
        class="rounded-card boards-todos"
        color="#ECECEC"
        elevation="3"
        >
        <v-system-bar class="flex-box-barra"
        color="#3865A3"
        height="50"
        >
        <span>
            <h1 class="font-weight-regular texto-board">concluído</h1>
        </span>
        </v-system-bar>
        <v-container class="overflow-vert box-alinhar-card-botao" style="min-height: 550px; max-height: 750px">
            <v-row dense class="width-total">
                <draggable v-model="done"
                     :componentData="componentData"
                     tag="transition-group"
                     :animation="400"
                     :empty-insert-threshold="80"
                     group="board"
                     v-bind="dragOptions"
                     @start="drag = true"
                     @end="drag = false">
                     <reqcard v-for="req in reqs.done" :key="req.id" :req="req"></reqcard>
                </draggable>
                     <div key="footer" slot="footer" role="group" class="flex-add">
                           <v-btn text raised block depressed color="#ECECEC" class="teste-botao" @click="add('done')">Adicionar card</v-btn>
                     </div>
            </v-row>
        </v-container>
    </v-card>

    <v-card 
        width="400"
        class="rounded-card boards-todos"
        color="#ECECEC"
        elevation="3"
        >
        <v-system-bar class="flex-box-barra"
        color="#3795CA"
        height="50"
        >
        <span>
            <h1 class="font-weight-regular texto-board">entregue</h1>
        </span>
        </v-system-bar>
        <v-container class="overflow-vert box-alinhar-card-botao" style="min-height: 550px; max-height: 750px">
            <v-row dense class="width-total">
                <draggable v-model="delivered"
                     :componentData="componentData"
                     tag="transition-group"
                     :animation="400"
                     :empty-insert-threshold="80"
                     group="board"
                     v-bind="dragOptions"
                     @start="drag = true"
                     @end="drag = false">
                     <reqcard v-for="req in reqs.delivered" :key="req.id" :req="req"></reqcard>
                </draggable>
                     <div key="footer" slot="footer" role="group" class="flex-add">
                           <v-btn text raised block depressed color="#ECECEC" class="teste-botao" @click="add('delivered')">Adicionar card</v-btn>
                     </div>
            </v-row>
        </v-container>
    </v-card>

   </div>
</template>

<script>

import reqcard from '~/components/reqcard.vue'
import draggable from 'vuedraggable'

export default {
    components: {
        reqcard,
        draggable
    },
    props: ['reqs', 'statuses'],
    computed: {
        dragOptions() {
        return {
            group: "board",
            disabled: false,
            ghostClass: "ghost",
            swapThreshold: 1,
            touchStartThreshold: 5,
            fallbackTolerance: 5
        };
        }
    },
      dragging: false,
      componentData: {
        props: {
          type: "transition",
          name: "flip-list"
        }
      },
  methods: {
   add: function(status) {
      this.reqs[status].push({
         id: 100,
         is_ghost: false,
         title: 'Card novo',
         archived: false,
         team: null,
         priority: null,
         category: null,
         link: null,
         description: null
      });
    }
  }
}
</script>

<style scoped>
.width-total {
   width: 100%;
}
.box-alinhar-card-botao {
   display:flex;
   justify-content: center;
}
.teste-botao {
   min-height: 100px;
   margin-top:20px;
   color: #5B5B5B;
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
   .rounded-card{ 
   border-radius:10px;
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
</style>