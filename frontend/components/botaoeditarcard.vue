<template>
    <v-speed-dial
      v-if="!cardedit"
      v-model="fab"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          depressed
          icon
          medium
        >
          <v-icon color="#5B5B5B" v-if="fab">
            mdi-close
          </v-icon>
          <v-icon color="#5B5B5B" v-else>
            mdi-dots-horizontal
          </v-icon>
        </v-btn>
      </template>
      <v-btn
        icon
        medium
      >
        <v-icon color="#5B5B5B" v-model="cardedit" @click="$emit('update:cardedit',!cardedit)">mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        icon
        medium
      >
        <v-icon color="#E03B24" v-if="!archived">mdi-delete</v-icon>
        <v-icon color="#3865A3" v-else>mdi-delete-restore</v-icon>
      </v-btn>
    </v-speed-dial>
        <v-btn icon depressed medium v-else v-model="cardedit" @click="$emit('update:cardedit',!cardedit)">
          <v-icon color="#64A338">
            mdi-check
          </v-icon>
        </v-btn>
</template>

<script>
  export default {
    props: ['archived','cardedit'],
    data: () => ({
      direction: 'top',
      fab: false,
      fling: false,
      hover: true,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition',
    })
  }
</script>

<style>
  /* This is for documentation purposes and will not be needed in your application */
  #create .v-speed-dial {
    position: absolute;
  }

  #create .v-btn--floating {
    position: relative;
  }
</style>