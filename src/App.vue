<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
  data: () => ({
    //
  })
})
</script>

<style media="screen">
    .content-title {
        font-size: 16px!important;
        font-weight: 700!important;
        letter-spacing: 1px;
    }

    .content-title-inset {
        margin-left: 10px;
    }

    .v-carousel-order-items .v-carousel__controls {
        right: 0!important;
    }

    .v-carousel-order-items .v-carousel__controls button {
        color: #E22032!important;
        height: 30px;
        width: 30px;
    }
</style>
