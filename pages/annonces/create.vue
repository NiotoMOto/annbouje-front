<template>
<div class="cs-content-wrapper">
  <form v-on:submit.prevent="createAnnonce">
      <div class="cs-content-wrapper">
        <v-select
          class="cs-search_sport"
          id="sport"
          :value="sport"
          :items="sports"
          attrLabel="name"
          attrValue="_id"
          :changeHandler="updateField"
          name="sport"
          type="text"
          :placeholder="$t('inputs.sport')"
        />
        <v-input
          id="city"
          :value="city"
          name="city"
          type="city"
          :changeHandler="updateField"
          :placeholder="$t('inputs.city')"
        />
        <v-input
          id="name"
          :value="name"
          name="name"
          type="name"
          :changeHandler="updateField"
          :placeholder="$t('inputs.name')"
        />
        <v-input
          class="cs-search_date"
          id="date"
          :value="city"
          :changeHandler="updateField"
          name="date"
          type="date"
          :placeholder="$t('inputs.date')"
        />
        <v-datetime-picker
          label="Select Datetime"
          v-model="datetime"
          :input="updateField"
          >
        </v-datetime-picker>
    </div>
    <button class="cta cta-login" type="submit">{{ $t('buttons.create_annonce') }}</button>
  </form>
</div>
</template>

<script>
import vInput from '~/components/Input.vue'
import vSelect from '~/components/Select.vue'
import DateTimePicker from '~/components/DateTimePicker.vue'
import { createAnnonce } from '~/queries/annonces.gql'

export default {
  // middleware: 'auth',
  components: {
    vInput, vSelect, DateTimePicker
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
      console.log(this)
      this.updateField('date', newDate)
    }
  },
  methods: {
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
      const annonce = await this.$apollo.mutate({
        mutation: createAnnonce,
        variables: { ...this.$store.state.forms.annonce, creator: this.$store.state.user._id }
      })
      if (annonce.data.addAnnonce._id) {
        this.$router.push(annonce.data.addAnnonce._id)
      }
      console.log(annonce)
      // const data = await this.$store.dispatch('createAnnonce', this.$store.state.forms.annonce)
      // this.$router.push({ path: `/annonces/${data._id}` })
    }
  }
}
</script>
