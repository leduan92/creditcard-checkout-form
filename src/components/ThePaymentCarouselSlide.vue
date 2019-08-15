<template>
    <v-card class="credit-card-slide" color="#CF5C72" elevation="24" height="150">
        <v-flex align-self-end md3 offset-md8 class="card-logo">
            <v-img :src="cardLogoSrc"></v-img>
        </v-flex>
        <div class="card-info">
            <v-flex md12>
                <v-card-title class="card-number">{{ theCardNumber }}</v-card-title>
            </v-flex>
            <v-layout class="card-labels">
                <v-flex sm7>
                    <v-card-text class="card-label">CARD HOLDER</v-card-text>
                </v-flex>
                <v-flex sm6 offset-xs2>
                    <v-card-text class="card-label">EXPIRE DATE</v-card-text>
                </v-flex>
            </v-layout>
            <v-layout class="card-data">
                <v-flex sm8>
                    <v-card-text class="card-name">{{ theCardName }}</v-card-text>
                </v-flex>
                <v-flex sm4 offset-xs1>
                    <v-card-text class="card-exp-date">{{ theCardDate }}</v-card-text>
                </v-flex>
            </v-layout>
        </div>
    </v-card>
</template>

<script>
export default {
  name: 'ThePaymentCarouselSlide',
  props: {
    cardLogo: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      cardName: 'NAME LAST NAME',
      cardDate: 'MM/YYYY',
      cardNumber: '**** **** **** 5555'
    }
  },
  computed: {
    cardLogoSrc () {
      switch (this.cardLogo) {
        case 'visa':
          return '/img/visa.png'
        case 'mastercard':
          return '/img/mastercard.png'
        case 'paypal':
          return '/img/paypal.png'
        default:
          return ''
      }
    },
    theCardName: {
      get () {
        return this.cardName
      },
      set (val) {
        if (val === '') { this.cardName = 'NAME LAST NAME' } else this.cardName = val
      }
    },
    theCardNumber: {
      get () {
        return this.cardNumber
      },
      set (val) {
        if (val === '') { this.cardNumber = '**** **** **** 5555' } else this.cardNumber = val
      }
    },
    theCardDate: {
      get () {
        return this.cardDate
      },
      set (val) {
        if (val === '') { this.cardDate = 'MM/YYYY' } else this.cardDate = val
      }
    }
  }
}
</script>

<style media="screen">
    .card-logo {
        padding-top: 16px;
    }

    .card-info {
        margin-top: 16px;
    }

    .card-number {
        color: white;
        font-size: 14px;
        word-spacing: 14px;
        padding: 0 20px;
    }

    .card-labels, .card-data {
        height: 14px;
    }

    .card-label {
        font-size: 9px!important;
        color: #B9ACB3!important;
        padding: 0 16px;
    }

    .card-name, .card-exp-date {
        color: #E4E0E2!important;
        font-size: 10px!important;
        padding: 0 14px;
    }
</style>
