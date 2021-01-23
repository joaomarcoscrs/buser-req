<template>
    <v-card 
        width="400"
        class="rounded-card boards-todos"
        color="#ECECEC"
        elevation="3"
        >
        <v-system-bar class="flex-box-barra"
        :color="status.color"
        height="50"
        >
        <span>
            <h1 class="font-weight-regular texto-board">{{status.name}}</h1>
        </span>
        </v-system-bar>
        <v-container class="overflow" style="min-height: 550px; max-height: 750px">
            <v-row dense>
                <draggable v-model="reqs"
                        v-bind="dragOptions"
                        @start="drag = true"
                        @end="drag = false">
                        <reqcard v-for="req in reqs" :key="req.id" :req="req" :status="status"></reqcard>
                </draggable>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>

import reqcard from '~/components/reqcard.vue'
import draggable from 'vuedraggable'

export default {
    components: {
        reqcard,
        draggable
    },
    props: ['reqs', 'status'],
    computed: {
        dragOptions() {
        return {
            animation: 200,
            group: "status",
            disabled: false,
            ghostClass: "ghost"
        };
        }
    }
}
</script>

<style scoped>
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
   .overflow {
   overflow: auto;
   display: flex;
   position: relative;
   flex-shrink: 0;
   margin-right: 10px;
   margin-left: 10px;
   }
   .texto-board {
   text-align: center;
   font-size: 34px;
   color: #ffffff;
   }
</style>