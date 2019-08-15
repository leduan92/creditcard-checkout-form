<template>
  <credit-card-checkout />
</template>

<script lang="ts">
import Vue from 'vue';
import CreditCardCheckout from '../components/CreditCardCheckout.vue';

export default Vue.extend({
  components: {
    'credit-card-checkout': CreditCardCheckout,
  },
});
</script>
