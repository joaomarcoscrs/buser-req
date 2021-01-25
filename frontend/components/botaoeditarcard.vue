<template>
    <v-speed-dial
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
        <v-icon color="#5B5B5B">mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        icon
        medium
      >
        <v-icon color="#E03B24" v-if="!archived">mdi-delete</v-icon>
        <v-icon color="#3865A3" v-else>mdi-delete-restore</v-icon>
      </v-btn>
    </v-speed-dial>
</template>

<script>
  export default {
    props: ['archived'],
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
    }),

    computed: {
    watch: {
      top (val) {
        this.bottom = !val
      },
      right (val) {
        this.left = !val
      },
      bottom (val) {
        this.top = !val
      },
      left (val) {
        this.right = !val
      },
    }
  }
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