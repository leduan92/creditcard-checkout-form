import { shallowMount, createLocalVue } from '@vue/test-utils'
import ThePaymentForm from '@/components/ThePaymentForm.vue'
import Vuetify from 'vuetify'

describe('ThePaymentForm.vue', () => {

  const localVue = createLocalVue();

  localVue.use(Vuetify, {});
  localVue.use(require('vue-moment'))

  const mask = require('vue-the-mask')

  const wrapper = shallowMount(ThePaymentForm, {
    data() {
      return {
        cardHolder: "",
        cardNumber: "",
        month: "",
        year: "",
        cvv: "",
        valid: false
      }
    },
    directives: {
        mask
    },
    localVue
   })

  it('renders a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('no data is submitted', () => {
    const button = wrapper.find({ref: 'submit-form-btn'})
    button.trigger('click')

    // wrapper.find('.payment-submit-btn').trigger('click');
    expect(wrapper.vm.$data.valid).toBe(false)
  })

  it('reveals a notification when submitted', () => {
    wrapper.setData({
      cardHolder: "Leduan Flores Riera",
      cardNumber: "1234 6544 9876 0009",
      month: "12",
      year: "2021",
      cvv: "234"
    })

    // wrapper.vm.$refs.form.validate();

    const button = wrapper.find({ref: 'submit-form-btn'})
    button.trigger('click')

    expect(wrapper.vm.$data.valid).toBe(true)
  })
})
