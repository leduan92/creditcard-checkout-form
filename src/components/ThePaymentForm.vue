<template>
    <v-flex class="payment-form-container" lg12 ref="form-container">
        <v-alert elevation="24"
                v-model="showAlert"
                dismissible
                type="success"
                class="mb-4 success-alert"
                width="40%"
        >
            {{ alertMessage }}
        </v-alert>
        <v-form
                ref="form"
                v-model="valid"
                :value=valid
        >
            <v-flex md10 offset-xs1>
                <v-subheader light class="payment-form-label">CARD HOLDER</v-subheader>
                <v-text-field class="payment-textfield card-holder"
                              v-model="name"
                              :rules="nameRules"
                              required
                              solo
                              @input="$emit('onInputName', name)"
                              data_card_holder
                              name="card-holder"
                              ref="card-holder"
                              :value="name"
                              count="25"
                ></v-text-field>
            </v-flex>

            <v-flex md10 offset-xs1>
                <v-subheader light class="payment-form-label">CARD NUMBER</v-subheader>
                <v-text-field class="payment-textfield card-number"
                              v-model="cardNumber"
                              :rules="cardNumberRules"
                              v-mask="cardNumberMask"
                              required
                              solo
                              @input="$emit('onInputCardNumber', cardNumber)"
                              data-card-number
                              ref="card-number"
                ></v-text-field>
            </v-flex>

            <v-layout>
                <v-flex md10 offset-xs1>
                    <v-subheader light class="payment-form-label">EXPIRE DATE</v-subheader>
                </v-flex>
                <v-flex md9 offset-xs5>
                    <v-subheader light class="payment-form-label">CVV</v-subheader>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex sm2 offset-xs1>
                    <v-select
                            v-model="month"
                            :rules="monthRules"
                            class="mt-0 pt-0 payment-exp-date payment-textfield card-month"
                            hide-details
                            solo
                            :items="months"
                            required
                            data-card-month
                            ref="card-month"
                    ></v-select>
                </v-flex>
                <v-flex sm3>
                    <v-select
                            v-model="year"
                            :rules="yearRules"
                            class="mt-0 pt-0 payment-exp-date payment-textfield payment-textfield-year"
                            solo
                            :items="years"
                            style="width: 85px"
                            required
                            @input="getExpDate"
                            data-card-year
                            ref="card-year"
                    ></v-select>
                </v-flex>
                <v-flex sm2 offset-xs3>
                    <v-text-field
                            v-model="cvvValue"
                            :rules="cvvRules"
                            class="mt-0 pt-0 payment-textfield card-cvv"
                            solo
                            required
                            data-card-cvv
                            ref="card-cvv"
                            count="3"
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-flex md9 offset-xs1 class="payment-checkbox">
                <!-- <v-subheader light class="payment-form-label">Save card information</v-subheader> -->
                <v-checkbox
                        v-model="checkbox"
                        label="Save card information"
                ></v-checkbox>
            </v-flex>

            <v-btn  :style="{backgroundColor: (!valid) ? '#79777C!important' : ''}"
                    rounded
                    right
                    dark
                    :disabled="!valid"
                    color="#0A0B24"
                    class="payment-submit-btn"
                    large
                    @click="validate"
                    elevation="8"
                    ref="submit-form-btn"
            >
                PURCHASE
            </v-btn>
        </v-form>
    </v-flex>
</template>

<script>
import { mask } from 'vue-the-mask'

export default {
  name: 'ThePaymentForm',
  directives: { mask },
  data () {
    return {
      showAlert: false,
      alertMessage: '',
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 25) || 'Name must be less than 25 characters'
      ],
      cardNumber: '',
      cardNumberRules: [
        v => (v && v.length === 19) || 'The card number is required'
      ],
      cardNumberMask: '#### #### #### ####',
      dateFormat: 'MM/YYYY',
      month: '',
      months: [],
      year: '',
      years: [],
      monthRules: [
        v => !!v || ''
      ],
      yearRules: [
        v => !!v || ''
      ],
      cvvValue: '',
      cvvRules: [
        v => (v && v.length === 3) || ""
      ],
      checkbox: false
    }
  },
  mounted () {
    this.getMonths()
    this.getYears()
  },
  computed: {
    endDate () {
      return this.$moment('12/2030', 'MM/YYYY')
    },
    startDate () {
      return this.$moment('01/2019', 'MM/YYYY')
    },
    date () {
      return this.$moment({
        year: this.year,
        month: this.month
      })
    }
  },
  methods: {
    getExpDate () {
      if (this.year !== '' && this.month !== '') {
        this.$emit('onSelectDate', this.date)
      }
    },
    getYears: function () {
      let _to = this.endDate.year()
      for (let _y = this.startDate.year(); _y <= _to; _y++) {
        this.years.push(_y)
      }
    },
    getMonths: function () {
      let _to = 11
      let _m = 0
      if (this.year >= this.endDate.year()) {
        _to = this.endDate.month()
      }
      if (this.year <= this.startDate.year()) {
        _m = this.startDate.month()
      }
      for (; _m <= _to; _m++) {
        this.months.push(_m + 1)
      }
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.valid = true
        this.alertMessage = 'Thank you for using our services.'
        this.showAlert = true
        this.$refs.form.reset()
      } else {
        this.valid = false
        this.$refs.form.resetValidation()
      }
    }
  }
}
</script>
<style media="screen">
    .payment-textfield .v-input__control {
        min-height: 35px!important;
    }
    .payment-textfield {
        height: 54px;
        border-radius: 12px;
    }

    .payment-exp-date {
        width: 65px;
    }

    .payment-textfield-year {
        margin-left: 8px !important;
    }

    .payment-form-label {
        font-size: 10px;
        height: 30px;
    }

    .payment-checkbox {
        bottom: 20px;
        position: relative;
    }

    .payment-checkbox label{
        font-size: 10px;
    }

    .payment-submit-btn {
        position: relative;
        right: 0;
        left: 15vw;
        bottom: 2vw;
    }

    .disabled-btn-color {
        background-color: #79777C!important;
    }

    .success-alert {
        z-index: 2;
        position: absolute;
        font-size: 12px;
    }
</style>
