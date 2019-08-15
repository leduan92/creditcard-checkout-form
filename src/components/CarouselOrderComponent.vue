<template>
    <v-flex class="carousel-flex-container">
        <v-carousel vertical vertical-delimiters class="v-carousel-order-items"
                    :continuous="false"
                    :show-arrows="false"
                    hide-delimiter-background
                    height="340"
                    v-model="orderItem" ref="orderCarousel"
        >
            <v-carousel-item ref="0" active-class="active-item">
                <order-item :item-key="0" ref="item1"/>
            </v-carousel-item>
            <v-carousel-item  ref="1" active-class="active-item">
                <order-item :item-key="1" ref="item2"/>
            </v-carousel-item>
            <v-carousel-item ref="2" active-class="active-item">
                <order-item :item-key="2" ref="item3"/>
            </v-carousel-item>
        </v-carousel>
    </v-flex>
</template>

<script>
    import OrderItem from './OrderItem';

    export default {
        name: "CarouselOrderComponent",
        components: {
            'order-item': OrderItem,
        },
        data () {
            return {
                orderItem: 0,
            }
        },
        mounted () {
            const { item1 } = this.$refs;
            this.getPrice(this.orderItem, item1);
        },
        watch: {
            orderItem (val) {
                if (val == 0) {
                    const { item1 } = this.$refs;
                    this.getPrice(val, item1);
                }
                else {
                    let item = this.$refs["item"+val];
                    this.getPrice(val, item);
                }
            }
        },
        methods: {
            getPrice (val, item) {
                let price = item.items[val].price;
                this.$emit('onUpdate', price);
            }
        }
    }
</script>

<style scoped>
    .v-carousel-order-items {
        margin-top: 4vw;
        width: 500px;
    }
</style>