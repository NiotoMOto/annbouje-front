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
          :value="annonce.city"
          name="city"
          type="city"
          :changeHandler="updateField"
          :placeholder="$t('inputs.city')"
        />
        <v-input
          class="cs-search_date"
          id="date"
          :value="annonce.date"
          :changeHandler="updateField"
          name="date"
          type="date"
          :placeholder="$t('inputs.date')"
        />
    </div>
    <div>
      <v-input
        id="add-huber"
        type="text"
        :changeHandler="updateSessionUser"
        :keyupenter="addHuber"
        :placeholder="$t('buttons.inscrire_session')"
        :value="huber"
      />
      <button type="button" class="cta" @click="addHuber">{{ $t('buttons.inscrire_session')}}</button>
      <!-- <button type="button" class="cta" @click="toggleAddFiends">{{ $t('buttons.add_hubers')}}</button> -->
    </div>
    <div>
      <div v-for="user in annonce.users">{{ user }}</div>
    </div>
    <button class="cta cta-login" type="submit">{{ $t('buttons.create_annonce') }}</button>
  </form>
   <Modal mode="overlay" :show="showAddFiends" :toggleModal="toggleAddFiends">
    <h1>Inviter huber</h1>
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
    form: 'annonce',
    huber: ''
  }),
  computed: {
    sport () {
      return this.$store.state.forms.search.sport
    },
    annonce () {
      return this.$store.state.forms.annonce
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
    updateSessionUser (field, value) {
      this.huber = value
    },
    toggleAddFiends () {
      this.$store.commit('ui/toggleModal', { modal: 'addFriends' })
    },
    addHuber (e) {
      if (e) {
        e.preventDefault()
      }
      this.$store.commit('forms/addUser', this.huber)
      this.huber = ''
    },
    async createAnnonce (e) {
      e.preventDefault()
      const data = await this.$store.dispatch('createAnnonce', this.$store.state.forms.annonce)
      this.$router.push({ path: `/annonces/${data._id}` })
    }
  }
}
</script>
