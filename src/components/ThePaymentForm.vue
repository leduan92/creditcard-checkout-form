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
                              v-model="cardHolder"
                              :rules="nameRules"
                              required
                              solo
                              @input="$emit('onInputName', cardHolder)"
                              data_card_holder
                              name="card-holder"
                              ref="card-holder"
                              count="25"
                ></v-text-field>
            </v-flex>

            <v-flex md10 offset-xs1>
                <v-subheader light class="payment-form-label">CARD NUMBER</v-subheader>
                <v-text-field class="payment-textfield card-number-input"
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
                            @input="getExpDate"
                            data-card-month
                            ref="card-month"
                    ></v-select>
                </v-flex>
                <v-flex sm4>
                    <v-select
                            v-model="year"
                            :rules="yearRules"
                            class="mt-0 pt-0 payment-exp-date payment-textfield card-year"
                            solo
                            :items="years"
                            required
                            @input="getExpDate"
                            data-card-year
                            ref="card-year"
                    ></v-select>
                </v-flex>
                <v-flex>
                    <v-text-field
                            v-model="cvvValue"
                            :rules="cvvRules"
                            class="mt-0 pt-0 payment-textfield card-cvv"
                            solo
                            required
                            data-card-cvv
                            ref="card-cvv"
                            count="3"
                            :v-mask="cvvMask"
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-flex md5 offset-xs1 class="payment-checkbox">
                <!-- <v-subheader light class="payment-form-label">Save card information</v-subheader> -->
                <v-checkbox
                        v-model="checkbox"
                        label="Save card information"
                ></v-checkbox>
            </v-flex>

            <v-layout class="form-actions">
              <v-flex sm3>
                <v-btn  rounded
                        dark
                        left
                        color="#79777"
                        class="payment-clear-btn"
                        medium
                        @click="clear"
                        elevation="8"
                        ref="clear-form-btn"
                        :disabled="!inputData"
                >
                    CLEAR
                </v-btn>
              </v-flex>
              <v-flex sm4>
                <v-btn
                        right
                        rounded
                        dark
                        :disabled="!valid"
                        color="#0A0B24"
                        class="payment-submit-btn"
                        medium
                        @click="validate"
                        elevation="8"
                        ref="submit-form-btn"
                >
                    PURCHASE
                </v-btn>
              </v-flex>
            </v-layout>
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
      inputData: false,
      cardHolder: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 25) || 'Name must be less than 25 characters'
      ],
      cardNumber: '',
      cardNumberRules: [
        v => (v && v.length === 19) || 'The card number most be 16 character long'
      ],
      cardNumberMask: '#### #### #### ####',
      cvvMask: '###',
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
        v => (v && v.length === 3) || 'The CVV is incorrect'
      ],
      checkbox: false,
      cardInfo: {}
    }
  },
  mounted () {
    this.getMonths()
    this.getYears()
  },
  watch: {
    cardHolder (val) {
      if (val !== '') {
        this.inputData = true
      } else {
        this.inputData = false
      }
    },
    cardNumber (val) {
      if (val !== '') {
        this.inputData = true
      } else {
        this.inputData = false
      }
    },
    month (val) {
      if (val !== '') {
        this.inputData = true
      } else {
        this.inputData = false
      }
    },
    year (val) {
      if (val !== '') {
        this.inputData = true
      } else {
        this.inputData = false
      }
    },
    cvvValue (val) {
      if (val !== '') {
        this.inputData = true
      } else {
        this.inputData = false
      }
    }
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
        if (this.checkbox) {
          this.cardInfo = {
            cardHolder: this.cardHolder,
            cardNumber: this.cardNumber,
            expDate: this.date._d,
            cvvValue: this.cvvValue
          }
        }
        console.log(this.cardInfo)
        this.showAlert = true
        this.$refs.form.reset()
      } else {
        this.valid = false
        this.$refs.form.resetValidation()
      }
    },
    clear () {
      this.$refs.form.reset()
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

    .card-month {
        width: 65px;
    }

    .card-year {
        margin-left: 8px !important;
    }

    .payment-form-label {
        font-size: 10px;
        height: 30px;
    }

    .payment-checkbox {
        bottom: 20px;
        position: relative;
        margin-right: 0!important;
    }

    .payment-checkbox label{
        font-size: 10px;
    }

    .card-cvv .v-input__slot {
      margin-left: 65px;
      width: 55px;
    }

    .form-actions {
        position: relative;
        bottom: 21px;
        left: 10vw;
    }

    .success-alert {
        z-index: 2;
        position: absolute;
        right: 15vw;
    }
</style>
