import Vue from 'vue'
import VuetifyGoogleAutocomplete from '~/node_modules/vuetify-google-autocomplete/lib/index'

Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: 'AIzaSyCEgAsSMNY2rPvZC9ZhvdJnR0SzsrjUYe4' // Can also be an object. E.g, for Google Maps Premium API, pass `{ client: <YOUR-CLIENT-ID> }`
})
