<template>
  <div>
    <div id="content" class="content-top">
        <div class="wrapper-content-slider">
          <div class="content-slider">
            <div class="cs-title">
              <h1>Ne courrez plus tout seul !</h1>
              <span></span>
            </div>
            <SearchComponent />
          </div> 
        </div>
        <img class="slider" src="~/assets/images/slide1.jpg">
    </div>
    <div class="cs-content-wrapper">       
      <aside class="cs-content cs-main-content">  
        <span class="last-post">les derniers posts</span>   
        <div class="search-result">
          <Annonce :annonce="annonce" v-for="annonce in annonces" :key="annonce._id" />
        </div>
      </aside>

      <aside class="cs-content cs-side-content">
        <div class="cs-banner">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed maximus sagittis magna sed faucibus. Donec hendrerit,
              magna ultricies imperdiet congue, lorem massa eleifend elit,
              vel viverra felis eros id purus. Nullam turpis justo,
              llamcorper non mollis sed, luctus sit amet nulla.<br><br> Vestibulum
              u neque odio. In bibendum ex eu dui placerat pellentesque.
              Etiam nec sollicitudin sapien, vitae rutrum augue. Suspendisse
              ltrices commodo lacus. Ut justo massa, dictum id urna sodales,
              lobortis blandit nisi. Aliquam erat volutpat. Suspendisse turpis
              sem, scelerisque vel ligula quis, tristique imperdiet dui.
            </p>
        </div>
      </aside>     
    </div>  
    </div>
 
</template>

<script>
import SearchComponent from '~/components/Search.vue'
import Annonce from '~/components/Annonce.vue'
import { annoncesForIndex } from '~/queries/annonces.gql'
export default {
  components: {
    SearchComponent, Annonce
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  apollo: {
    annonces: {
      query: annoncesForIndex,
      prefetch: true
    }
  },
  methods: {
    refreshAnnonces: function (e) {
      this.$axios.get('annonces').then(res => {
        this.annonces = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-result_item {
    border: 1px solid blue;
  }

  .cs-content-wrapper{
    width: 80%;
    margin: 0 auto;
    .cs-content{
      float: left;
    }

    .cs-main-content{
      width: 75%;
      background: #fff;
      padding: 16px;
      margin-top: 32px;
      min-height: 400px;
    }
    .cs-side-content {
      width: 21%;
      background: #fff;
      padding: 16px;
      margin-left: 32px;
      margin-top: 32px;
      .cs-banner{
        color: #424242;
      }
    }
    .last-post{
      font-size: 26px;
      color: #424242;      
    }
  }
</style>
