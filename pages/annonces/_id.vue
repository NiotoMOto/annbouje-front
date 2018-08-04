<template>
  <div class="cs-content-wrapper">       
      <aside class="cs-content cs-main-content">  
        <!-- <span class="last-post"></span>    -->
        <!-- <div>         
          <h1>{{ annonce.annonce.name }} - {{ annonce.name }}</h1>
          <h2>{{ annonce.annonce.username }}</h2>
        </div> -->
        <Annonce :annonce="annonce" :key="annonce._id" :subscribe="subscribe" />
        <div class="map-wrapper">
          <p class="localisation-bloc">
           <span class="loc-label">Les coordonnées :</span>  
           <span class="loc-address">{{formatAddress}}</span> 
          </p>
          <GmapMap
            :center="{lat: annonce.address.latitude, lng: annonce.address.longitude}"
            :zoom="14"
            map-type-id="terrain"
            style="width: 100%; height: 300px"
          >
            <GmapMarker
              :position="{lat: annonce.address.latitude, lng: annonce.address.longitude}"
            />
          </GmapMap>
        </div>        
      </aside>
    </div>
   
</template>

<script>
  import Annonce from '~/components/Annonce.vue'
  import { annonceById, subscribe } from '~/queries/annonces.gql'

  export default {
    data () {
      return {
        annonce: {
        },
        loading: 0
      }
    },
    computed: {
      formatAddress () {
        return `${this.annonce.address.streetNumber} ${this.annonce.address.route} ${this.annonce.address.postalCode} ${this.annonce.address.locality} `
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
    methods: {
      async subscribe (e) {
        e.preventDefault()
        const result = await this.$apollo.mutate({
          mutation: subscribe,
          variables: {
            annonceId: this.annonce._id,
            userId: this.$store.state.user._id
          }
        })
        if (result) {
          const annonce = await this.$apolloProvider.defaultClient.query(
            { query: annonceById, variables: { id: this.annonce._id } })
            .then(({ data }) => (
              data && data.annonce
            ))
          this.annonce = annonce
        }
      }
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

