<template>
  <div class="cs-content-wrapper">       
      <aside class="cs-content cs-main-content">  
        <span class="last-post"></span>   
        <div class="search-result">         
          <h1>{{ annonce.sport.name }} - {{ annonce.name }}</h1>
          <h2>{{ annonce.creator.username }}</h2>
        </div>
        <Instance :instance="instance" v-for="instance in echeances" :key="instance._id" />
      </aside>
    </div>
   
</template>

<script>
  import Instance from '~/components/Instance.vue'

  export default {
    components: {
      Instance
    },
    computed: {
      annonce () {
        return this.$store.state.annonce
      },
      echeances () {
        return [
          { date: new Date(), subscribers: [this.annonce.creator], confirmed: true, cancel: false, registered: true, nbPlaces: 10 },
          { date: new Date(), subscribers: [this.annonce.creator, {username: 'Antoine'}, {username: 'Pierre'}], confirmed: false, cancel: false, nbPlaces: 10 },
          { date: new Date(), subscribers: [this.annonce.creator, {username: 'Pierre'}, {username: 'Antoine'}], confirmed: false, cancel: true, nbPlaces: 10 }
        ]
      }
    },
    asyncData (context) {
      return context.app.$axios.get(
        `annonces/${context.params.id}?populate=[{"path":"creator"}, {"path":"sport"}]`
      ).then(res => (
        context.app.store.commit('SET_ANNONCE', res.data)
      ))
    }
  }
</script>

<style lang="scss">
</style>

