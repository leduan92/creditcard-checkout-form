<template>
    <v-flex class="carousel-flex-container">
        <carousel-3d class="card-carousel-3d"
                     width="225"
                     height="150"
                     border="0"
                     perspective="0"
                     space="80"
                     controlsVisible
                     @after-slide-change="onAfterSlideChange"
                     :controlsWidth='15'
                     :controlsHeight='15'
        >
            <slide :index="0" ref="0" class="carousel-slide">
                <ThePaymentCarouselSlide card-logo="visa" ref="card-0"/>
            </slide>
            <slide :index="1" ref="1" class="carousel-slide">
                <ThePaymentCarouselSlide card-logo="mastercard" ref="card-1" class="inactive-slide"/>
            </slide>
            <slide :index="2" ref="2" class="carousel-slide">
                <ThePaymentCarouselSlide card-logo="paypal" ref="card-2" class="inactive-slide"/>
            </slide>
        </carousel-3d>
    </v-flex>

</template>

<script>
    import { Carousel3d, Slide } from 'vue-carousel-3d';
    import ThePaymentCarouselSlide from './ThePaymentCarouselSlide'

    export default {
        name: "CarouselPaymentComponent",
        components: {
            Carousel3d,
            Slide,
            ThePaymentCarouselSlide
        },
        props: {
            cardHolder: {
                type: String,
                default: "NAME LAST NAME"
            },
            cardExpDate: {
                type: String,
                default: "MM/YYYY"
            },
            cardNumber: {
                type: String,
                default: ""
            }
        },
        watch: {
            cardHolder (val) {
                if (this.childElement !== null) {
                    this.$set(this.childElement, 'theCardName', val);
                }
            },
            cardExpDate (val) {
                if (this.childElement !== null) {
                    this.$set(this.childElement, 'theCardDate', val);
                }
            },
            cardNumber (val) {
                if (this.childElement !== null) {
                    this.$set(this.childElement, 'theCardNumber', val);
                }
            }
        },
        mounted () {
            this.childElement = this.$refs["card-" + 0];
        },
        data () {
            return {
                childElement: null,
            }
        },
        methods: {
            onAfterSlideChange (i) {
                let slide = this.$refs[i].$el,
                    child = this.$refs["card-" + i];
                if (slide.classList.contains("current")) {
                    child.$el.classList.remove("inactive-slide");
                    this.childElement = child;
                }
                let left_1 = this.$el.getElementsByClassName("left-1").item(0).childNodes.item(0),
                    right_1 = this.$el.getElementsByClassName("right-1").item(0).childNodes.item(0);
                left_1.classList.add("inactive-slide");
                right_1.classList.add("inactive-slide");

            }
        }
    };
</script>

<style media="screen">
    .carousel-flex-container {
        max-width: 95%!important;
        margin-left: 10px;
    }

    .carousel-slide {
        background-color: transparent!important;
    }

    .inactive-slide {
        background-color: #D0798A !important;
    }

    .card-carousel-3d .carousel-3d-controls a {
        font-size: 35px!important;
    }

    .card-carousel-3d .carousel-3d-controls {
        margin-top: -10px!important;
    }
</style>
