<template>
    <v-layout column
            align-content-center
            justify-content
    >
        <v-subheader dark
                     class="content-title content-inset the-payment-title">PAYMENT</v-subheader>
        <CarouselPaymentComponent :card-holder="cardHolder" :card-number="cardNumber" :card-exp-date="cardDate"/>
        <ThePaymentForm v-on:onInputName="setCardHolder" v-on:onInputCardNumber="setCardNumber" v-on:onSelectDate="setCardDate"/>
    </v-layout>
</template>

<script>
    import CarouselPaymentComponent from './CarouselPaymentComponent'
    import ThePaymentForm from './ThePaymentForm'

    export default {
        name: "ThePaymentComponent",
        components: {
            CarouselPaymentComponent,
            ThePaymentForm
        },
        data () {
            return {
                cardHolder: "",
                cardNumber: "",
                cardDate: "MM/YYYY"
            }
        },
        methods: {
            setCardHolder (name) {
                this.cardHolder = name;
            },
            setCardNumber (val) {
                this.cardNumber = val;
            },
            setCardDate (date) {
                if (date._i.month === undefined && date._i.year === undefined) {
                    this.cardDate = ""
                }
                else this.cardDate = date._i.month + "/" + date._i.year;
            }
        }
    }
</script>

<style media="screen">
    .the-payment-title {
        color: #46394E!important;
    }
</style>
