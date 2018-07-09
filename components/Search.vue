<template>
  <div class="cs-search">
    <form v-on:submit="search($event)">
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
        class="cs-search_city"
        id="city"
        :value="city"
        :changeHandler="updateField"
        name="city"
        type="text"
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
      <button class="cta cta-search" type="submit">
        {{ $t('buttons.search') }}
      </button>
    </form>
  </div>
</template>

<script>
import vInput from '~/components/Input.vue'
import vSelect from '~/components/Select.vue'
export default {
  components: {
    vInput, vSelect
  },
  data: () => ({
    users: [],
    form: 'search',
    menu: false,
    modal: false
  }),
  computed: {
    sport () {
      return this.$store.state.forms.search.sport
    },
    city () {
      return this.$store.state.forms.search.city
    },
    date () {
      return this.$store.state.forms.search.date
    },
    sports () {
      return this.$store.state.static.sports
    }
  },
  methods: {
    updateField (field, value) {
      this.$store.commit('forms/updateField', { form: this.form, field, value })
    },
    search (e) {
      e.preventDefault()
      this.$store.dispatch('search', this.$store.state.forms.search)
    }
  }
}
</script>

<style lang="scss" scoped>
.cs-search {
  background: #fff;
  opacity: .97;
  padding: 10px;
  margin-top: 20px;
  width: 80%;
  margin: 0 auto; 
  border-radius: 45px; 
}
.cta {
  width: calc(27% - 8px);
  margin-left: 8px;
  height: 45px;
  background: #41b883;
  color: #fff;
  text-transform: uppercase;
  border: none;
  letter-spacing: 1px; 
   border-radius: 45px; 
   cursor: pointer;
}

</style>

