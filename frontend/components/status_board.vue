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
        <v-container class="overflow" style="min-height: 450px; max-height: 750px">
            <v-row dense>
                <reqcard v-for="req in reqs" :key="req.id" :req="req" :status="status"></reqcard>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>

import reqcard from '~/components/reqcard.vue'

export default {
    components: {
        reqcard
    },
      props: ['reqs', 'status'],
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