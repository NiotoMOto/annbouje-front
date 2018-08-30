<template>
    <v-autocomplete
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      v-model="select"
      cache-items
      class="mx-3"
      flat
      hide-no-data
      item-text="name"
      item-value="_id"
      label="Search sport"
    ></v-autocomplete>
</template>

<script>
  import { sportAutoComplete } from '~/queries/annonces.gql'
  export default {
    props: ['handleChange'],
    data () {
      return {
        loading: false,
        items: [],
        search: null,
        select: null
      }
    },
    watch: {
      search (val) {
        val && val !== this.select && this.querySelections(val)
      },
      select (val) {
        this.handleChange(val)
      }
    },
    methods: {
      async querySelections (v) {
        this.loading = true
        const sports = await this.$apolloProvider.defaultClient.query(
          { query: sportAutoComplete, variables: { sportContain: v } })
          .then(({ data }) => (
            data && data.searchSport
          ))
        this.loading = false
        this.items = sports
      }
    }
  }
</script>