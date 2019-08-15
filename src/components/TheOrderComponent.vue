<template>
    <v-layout
            align-content-start
            wrap
    >
        <v-subheader dark class="content-title content-title-inset the-order-title">ORDER</v-subheader>
        <CarouselOrderComponent v-on:onUpdate="setOrderTotal"/>

        <v-layout column class="order-total-layout">
            <v-divider class="order-divider" height="50"></v-divider>
            <v-flex class="offset-left">
                <v-subheader class="order-total-subheader">ORDER PRICE</v-subheader>
            </v-flex>
            <v-flex class="order-price-flex-container offset-left">
                <span v-text="price" class="order-price the-order-title"></span>
            </v-flex>
        </v-layout>
    </v-layout>
</template>

<script>
import CarouselOrderComponent from './CarouselOrderComponent'

export default {
  name: 'TheOrderComponent',
  components: {
    CarouselOrderComponent
  },
  data () {
    return {
      price: '$ 00.00'
    }
  },
  methods: {
    setOrderTotal (item) {
      this.price = item
    }
  }
}
</script>

<style media="screen">
    .the-order-title {
        color: #E4E0E2!important;
    }

    .order-total-layout {
        margin-top: 16px;
    }

    .order-divider {
        border: solid 1px #E22032!important;
        width: 265px;
        position: relative;
        left: 180px;
    }

    .offset-left {
        margin-left: 72%;
    }

    .order-total-subheader {
        font-size: 12px!important;
        padding: 0!important;
        color: #79777C!important;
    }

    .order-price-flex-container {
        margin-top: 0;
        position: relative;
        bottom: 15px;;
    }

    .order-price {
        font-weight: bold;
        font-size: 22px;
    }
</style>
