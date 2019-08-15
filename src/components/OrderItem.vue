<template>
    <v-card class="order-item-card" :height="250" :width="450" elevation="12">
        <v-layout class="order-item-layout">
            <v-flex align-self-start md4 class="item-img">
                <v-img :src="item.img"></v-img>
            </v-flex>
            <v-layout column class="item-content">
                <v-flex class="flex-item">
                    <v-card-title class="item-name item-data">{{ item.title }}</v-card-title>
                </v-flex>
                <v-flex class="flex-item">
                    <v-card-text class="item-description item-data">{{ item.description }}</v-card-text>
                </v-flex>
                <v-flex class="flex-item">
                    <v-card-title class="item-price">{{ item.price }}</v-card-title>
                </v-flex>
            </v-layout>
        </v-layout>
    </v-card>
</template>

<script>
export default {
  name: 'OrderItem',
  props: {
    itemKey: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      items: [
        {
          key: 0,
          img: '/img/item1.jpg',
          title: 'Headphones TOZO T10 Earbud',
          description: 'Bluetooth 5.0 Wireless Earbuds / Wireless Charging Case',
          price: '$ 49.99'
        },
        {
          key: 1,
          img: '/img/item2.jpg',
          title: 'COWIN E7 Active Over-Ear Headphones',
          description: 'Noise Cancelling / Bluetooth Headphones',
          price: '$ 59.99'
        },
        {
          key: 2,
          img: '/img/item3.jpg',
          title: 'Mpow 059 Over-Ear Headphones',
          description: 'Bluetooth Headphones / Hi-Fi Stereo Wireless Headset',
          price: '$ 34.99'
        }
      ]
    }
  },
  computed: {
    item () {
      return this.items[this.itemKey]
    }
  }
}
</script>

<style scoped>
    .order-item-card {
        background-color: transparent;
        margin-top: 4vw;
    }

    .order-item-layout {
        padding-top: 52px;
        padding-left: 30px;
    }

    .item-content {
        margin-top: 14px
    }

    .item-data {
        padding: 0 14px;
    }

    .item-name {
        font-size: 16px;
        line-height: 1.4;
    }

    .item-description {
        font-size: 12px;
    }
</style>
