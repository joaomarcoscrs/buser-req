<template>
   <div class="overflow">
    <v-card 
        width="400"
        class="rounded-card boards-todos"
        color="#ECECEC"
        elevation="3"
        >
        <v-system-bar class="flex-box-barra"
        color="#000000"
        height="50"
        >
        <span>
            <h1 class="font-weight-regular texto-board">backlog</h1>
        </span>
        </v-system-bar>
        <v-container class="overflow" style="min-height: 550px; max-height: 750px">
            <v-row dense>
                <draggable v-model="backlog"
                     :componentData="componentData"
                     tag="transition-group"
                     :animation="300"
                     :empty-insert-threshold="400"
                     group="board"
                     v-bind="dragOptions"
                     @start="drag = true"
                     @end="drag = false">
                     <reqcard v-for="req in reqs.backlog" :key="req.id" :req="req"></reqcard>
                     <div key="footer" slot="footer" role="group" class="flex-add">
                           <v-button icon depressed large @click="add('backlog')"><v-icon color="#FF3677" large>mdi-plus</v-icon></v-button>
                     </div>
                </draggable>
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
        color="#000000"
        height="50"
        >
        <span>
            <h1 class="font-weight-regular texto-board">pending</h1>
        </span>
        </v-system-bar>
        <v-container class="overflow" style="min-height: 550px; max-height: 750px">
            <v-row dense>
                <draggable v-model="pending"
                     :componentData="componentData"
                     tag="transition-group"
                     :animation="300"
                     :empty-insert-threshold="400"
                     group="board"
                     v-bind="dragOptions"
                     @start="drag = true"
                     @end="drag = false">
                     <reqcard v-for="req in reqs.pending" :key="req.id" :req="req"></reqcard>
                     <div key="footer" slot="footer" role="group" class="flex-add">
                           <v-button icon depressed large @click="add('pending')"><v-icon color="#FF3677" large>mdi-plus</v-icon></v-button>
                     </div>
                </draggable>
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
        color="#000000"
        height="50"
        >
        <span>
            <h1 class="font-weight-regular texto-board">ongoing</h1>
        </span>
        </v-system-bar>
        <v-container class="overflow" style="min-height: 550px; max-height: 750px">
            <v-row dense>
                <draggable v-model="ongoing"
                     :componentData="componentData"
                     tag="transition-group"
                     :animation="300"
                     :empty-insert-threshold="400"
                     group="board"
                     v-bind="dragOptions"
                     @start="drag = true"
                     @end="drag = false">
                     <reqcard v-for="req in reqs.ongoing" :key="req.id" :req="req"></reqcard>
                     <div key="footer" slot="footer" role="group">
                           <v-button icon depressed large @click="add('ongoing')"><v-icon color="#FF3677" large>mdi-plus</v-icon></v-button>
                     </div>
                </draggable>
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
        color="#000000"
        height="50"
        >
        <span>
            <h1 class="font-weight-regular texto-board">done</h1>
        </span>
        </v-system-bar>
        <v-container class="overflow" style="min-height: 550px; max-height: 750px">
            <v-row dense>
                <draggable v-model="done"
                     :componentData="componentData"
                     tag="transition-group"
                     :animation="300"
                     :empty-insert-threshold="400"
                     group="board"
                     v-bind="dragOptions"
                     @start="drag = true"
                     @end="drag = false">
                     <reqcard v-for="req in reqs.done" :key="req.id" :req="req"></reqcard>
                     <div key="footer" slot="footer" role="group" class="flex-add">
                           <v-button icon depressed large @click="add('done')"><v-icon color="#FF3677" large>mdi-plus</v-icon></v-button>
                     </div>
                </draggable>
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
        color="#000000"
        height="50"
        >
        <span>
            <h1 class="font-weight-regular texto-board">delivered</h1>
        </span>
        </v-system-bar>
        <v-container class="overflow" style="min-height: 550px; max-height: 750px">
            <v-row dense>
                <draggable v-model="delivered"
                     :componentData="componentData"
                     tag="transition-group"
                     :animation="300"
                     :empty-insert-threshold="400"
                     group="board"
                     v-bind="dragOptions"
                     @start="drag = true"
                     @end="drag = false">
                     <reqcard v-for="req in reqs.delivered" :key="req.id" :req="req"></reqcard>
                     <div key="footer" slot="footer" role="group" class="flex-add">
                        <v-button icon depressed large @click="add('delivered')"><v-icon color="#FF3677" large>mdi-plus</v-icon></v-button>
                     </div>
                </draggable>
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
            ghostClass: "ghost"
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
   .flex-add {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: flex-start;
      border-radius: 20px;
      order: 1000;
      margin: 15px;
   }
   .overflow {
   overflow: auto;
   display: flex;
   position: relative;
   flex-shrink: 0;
   margin-right: 10px;
   margin-left: 10px;
   }
   .flex-box-barra {
   justify-content: center;
   }
   .rounded-card{ 
   border-radius:20px;
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
</style>