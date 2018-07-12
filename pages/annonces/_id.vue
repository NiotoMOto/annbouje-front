<template>
  <div class="cs-content-wrapper">       
      <aside class="cs-content cs-main-content">  
        <span class="last-post"></span>   
        <div>         
          <h1>{{ annonceById.sport.name }} - {{ annonceById.name }}</h1>
          <h2>{{ annonceById.creator.username }}</h2>
        </div>
        <div>
          <GmapMap
            :center="{lat:48.0300024, lng:2.739625}"
            :zoom="14"
            map-type-id="terrain"
            style="width: 500px; height: 300px"
          >
            <GmapMarker
              :position="{lat:48.0300024, lng:2.739625}"
            />
          </GmapMap>
        </div>
        <div></div>
        <Instance :instance="instance" v-for="instance in annonceById.instanceAnnonces" :key="instance._id" />
      </aside>
    </div>
   
</template>

<script>
  import Instance from '~/components/Instance.vue'
  import { annonceDetail } from '~/queries/annonces.gql'

  export default {
    data () {
      return {
        annonceById: {
          sport: {},
          creator: {},
          instanceAnnonces: []
        },
        loading: 0
      }
    },
    async asyncData ({ app }) {
      const annonceById = await app.apolloProvider.defaultClient.query(
        { query: annonceDetail, variables: { id: app.context.params.id } })
        .then(({ data }) => (
          data && data.annonceById
        ))
      return { annonceById }
    },
    components: {
      Instance
    }
  }
</script>

<style lang="scss">
</style>

