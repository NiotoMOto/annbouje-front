<template>
<div class="cs-content-wrapper">
  <h2 class="cs-title-bloc"> Créer votre annonce</h2>
  <aside class="cs-create-form">    
    <form v-on:submit.prevent="createAnnonce">       
          <SeachSport :handleChange="setSport" />
          <v-input
            id="name"
            :value="name"
            name="name"
            type="name"
            :changeHandler="updateField"
            :placeholder="$t('inputs.name')"
          />
          <v-input
            id="places"
            :value="name"
            name="places"
            type="number"
            :changeHandler="updateField"
            :placeholder="$t('inputs.nbPlaces')"
          />
          <v-datetime-picker
            :label="$t('inputs.date')"
            v-model="datetime"
            :input="updateField"
            >
          </v-datetime-picker>
          <vuetify-google-autocomplete
            id="search"
            append-icon="search"
            placeholder="Start typing"
            v-on:placechanged="getAddressData"
          >
          </vuetify-google-autocomplete>      
          <UserManager />
      <button class="cta cta-login" type="submit">{{ $t('buttons.create_annonce') }}</button>
    </form>
  </aside>
</div>
</template>

<script>
import vInput from '~/components/Input.vue'
import vSelect from '~/components/Select.vue'
import DateTimePicker from '~/components/DateTimePicker.vue'
import SeachSport from '~/components/SeachSport.vue'
import UserManager from '~/components/UserManager.vue'
import { createAnnonce } from '~/queries/annonces.gql'

export default {
  // middleware: 'auth',
  components: {
    vInput, vSelect, DateTimePicker, UserManager, SeachSport
  },
  data: () => ({
    date: null,
    datetime: null,
    annonces: [],
    form: 'annonce',
    dateFormatted: null
  }),
  computed: {
    sport () {
      return this.$store.state.forms.search.sport
    },
    city () {
      return this.$store.state.forms.annonce.city
    },
    sports () {
      return this.$store.state.static.sports
    },
    name () {
      return this.$store.state.forms.annonce.name
    }
  },
  watch: {
    datetime: function (newDate) {
      this.updateField('date', newDate)
    }
  },
  methods: {
    setSport (value) {
      this.updateField('sport', value)
    },
    getAddressData: function (data) {
      if (data) {
        const address = {
          streetNumber: data.street_number,
          route: data.route,
          locality: data.locality,
          country: data.country,
          postalCode: data.postal_code,
          latitude: data.latitude,
          longitude: data.longitude,
          name: data.name,
          placeId: data.place_id
        }
        this.updateField('address', address)
      }
    },
    updateField (field, value) {
      this.$store.commit('forms/updateField', { form: this.form, field, value })
    },
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    async createAnnonce (e) {
      e.preventDefault()
      const { address, ...annonceValues } = this.$store.state.forms.annonce
      const annonce = await this.$apollo.mutate({
        mutation: createAnnonce,
        variables: {
          ...address,
          ...annonceValues,
          creator: this.$store.state.user._id
        }
      })
      if (annonce.data.addAnnonce._id) {
        this.$router.push(annonce.data.addAnnonce._id)
      }
    }
  }
}
</script>


<style lang="scss" scoped>
  .cs-content-wrapper {
    width: 80%;
    margin: 0 auto;
     .cs-title-bloc {
      margin-bottom: 16px;
      color: #41b883;
    }
  }
  .cs-create-form {
    width: 60%;
    background: #fff;
    padding: 16px;
    margin-bottom: 32px;    
    .cs-select-label,
    .cs-input-label {     
      margin-bottom: 16px;
      width: 100%;
    } 
    .cta {
      display: block;
      width: 60%;
      margin: 0 auto;
      border-radius: 45px;
    }
    input,
    select,
    textarea {
      outline: none!important;
      background-color: #fff!important;
    }
    input:focus,
    select:focus,
    textarea:focus {
      outline: none!important; 
      background-color: #fff!important; 
    }    
  }
</style>
