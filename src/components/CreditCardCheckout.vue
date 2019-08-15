<template>
  <v-container class="cc-checkout-container"
    justify-center
  >
    <v-layout class="cc-checkout-layout"
      justify-center
      wrap
    >
      <TheMainContent>
        <TheOrderComponent slot="theOrder"/>
        <ThePaymentComponent slot="thePayment"/>
      </TheMainContent>
    </v-layout>
  </v-container>
</template>

<script>
import TheMainContent from './TheMainContent'
import TheOrderComponent from './TheOrderComponent'
import ThePaymentComponent from './ThePaymentComponent'

export default {
  name: 'CreditCardCheckout',
  components: {
    TheMainContent,
    TheOrderComponent,
    ThePaymentComponent
  }
}
</script>

<style media="screen">
    .cc-checkout-container {
        margin-left: 14vw!important;
    }

    .cc-checkout-layout {
        background: linear-gradient(to right, #E22032 0%, #E22032 57.2%, #0A0B24 57.2%, #0A0B24 100%);
        height: 115vh;
        width: 70vw;
    }

</style>
