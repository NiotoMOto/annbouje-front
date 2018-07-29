<template>
  <div class="cs-content-wrapper">       
      <aside class="cs-content cs-main-content">  
        <!-- <span class="last-post"></span>    -->
        <!-- <div>         
          <h1>{{ annonce.annonce.name }} - {{ annonce.name }}</h1>
          <h2>{{ annonce.annonce.username }}</h2>
        </div> -->
        <Annonce :annonce="annonce" :key="annonce._id" />
        <div class="map-wrapper">
          <p class="localisation-bloc">
           <span class="loc-label">Les coordonnées :</span>  
           <span class="loc-address">2 rue de Paris 93564 Aubervilliers</span> 
          </p>
          <GmapMap
            :center="{lat:48.0300024, lng:2.739625}"
            :zoom="14"
            map-type-id="terrain"
            style="width: 100%; height: 300px"
          >
            <GmapMarker
              :position="{lat:48.0300024, lng:2.739625}"
            />
          </GmapMap>
        </div>        
      </aside>
    </div>
   
</template>

<script>
  import Annonce from '~/components/Annonce.vue'
  import { annonceById } from '~/queries/annonces.gql'

  export default {
    data () {
      return {
        annonce: {
        },
        loading: 0
      }
    },
    async asyncData ({ app }) {
      const annonce = await app.apolloProvider.defaultClient.query(
        { query: annonceById, variables: { id: app.context.params.id } })
        .then(({ data }) => (
          data && data.annonce
        ))
      return { annonce }
    },
    components: {
      Annonce
    }
  }
</script>

<style lang="scss">
.cs-main-content {
    width: 100%;
    margin: 0 auto;
    padding: 0 90px;
}
.map-wrapper {
  width: 60%;
  float: left;
  margin-bottom: 32px;
}
.localisation-bloc {
  color: #666;  
  width: 100%;
  margin-bottom: 8px;
  .loc-label {
    color: #41b883;
    font-weight: 500;
    display: inline-block;
    width: 100%;
  } 

}
</style>

