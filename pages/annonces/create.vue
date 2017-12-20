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
          class="cs-search_date"
          id="date"
          :value="city"
          :changeHandler="updateField"
          name="date"
          type="date"
          :placeholder="$t('inputs.date')"
        />
    </div>
    <button type="button" class="cta" @click="toggleAddFiends">{{ $t('buttons.add_friends')}}</button>
    <button class="cta cta-login" type="submit">{{ $t('buttons.create_annonce') }}</button>
  </form>
   <Modal mode="overlay" :show="showAddFiends" :toggleModal="toggleAddFiends">
    <h1>TOTO</h1>
  </Modal>
</div>
</template>

<script>
import vInput from '~/components/Input.vue'
import vSelect from '~/components/Select.vue'
import Modal from '~/components/Modal.vue'

export default {
  // middleware: 'auth',
  components: {
    vInput, vSelect, Modal
  },
  data: () => ({
    annonces: [],
    form: 'annonce'
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
    showAddFiends () {
      return this.$store.state.ui.modals.addFriends
    }
  },
  methods: {
    updateField (field, value) {
      this.$store.commit('forms/updateField', { form: this.form, field, value })
    },
    toggleAddFiends () {
      this.$store.commit('ui/toggleModal', { modal: 'addFriends' })
    },
    async createAnnonce (e) {
      e.preventDefault()
      const data = await this.$store.dispatch('createAnnonce', this.$store.state.forms.annonce)
      this.$router.push({ path: `/annonces/${data._id}` })
    }
  }
}
</script>
