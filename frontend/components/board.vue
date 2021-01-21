<template>
   <div class="overflow">
      <status_board v-for="status in statuses" :key="status.id" :reqs="reqs" :status="status">
      </status_board>
   </div>
</template>

<script>

import status_board from '~/components/status_board.vue'

   export default {
      components: {
         status_board
      },
      props: ['reqs', 'statuses'],
    }
</script>

<style scoped>
   .overflow {
   overflow: auto;
   display: flex;
   position: relative;
   flex-shrink: 0;
   margin-right: 10px;
   margin-left: 10px;
   }
</style>