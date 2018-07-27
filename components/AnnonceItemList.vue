<template>
    <div class="anounce-item">
      <aside class="anounce-item_items anouncer-info">
        <div class="anoucer-pict">          
        </div>
        <div class="annoucer-name">{{ annonce.creator.username }}</div>
      </aside>
      <aside class="anounce-item_items anounce-details">
        <div class="anounce-detail-name">{{ annonce.sport.name }} <span class="anounce-detail-date">{{ annonce.createdAt | formatDate }}</span></div> 
        <div class="anounce-detail-link">   
          <nuxt-link class="anounce-link"        
            :to="path(`/annonces/${annonce._id}`)">
            <i class="cs-font cs-font-position"></i> 
            <span class="anounce-name">{{ annonce.name }}</span>
          </nuxt-link>
        </div>   
        <div class="anounce-item-related_info">
          <span class="related-info completion-team-info"> <i class="cs-font cs-font-team"></i>7 inscrits</span>
          <span class="related-info completion-team-xpect"> <i class="cs-font cs-font-alone"></i>3 places restantes</span>
          <span class="related-info viewer-info"> <i class="cs-font cs-font-viewer"></i>Annonce vue 77 fois</span>
        </div>
      </aside>      
     
    </div>
</template>

<script>
  import { path } from '~/utils/paths'

  export default {
    props: ['annonce'],
    methods: {
      path (url) {
        return path(url, this)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .anounce-item {
    border-bottom: 1px solid #ccc;
    padding: 16px 0;
    display: inline-block;
    width: 100%;
    
    .anounce-item_items{
      float: left;
    }
  }

  .anouncer-info{
    width: 20%;
    text-align: center;
    border-right: 1px solid #ccc;
    padding-right: 16px;
    .anoucer-pict{
      width: 70px;
      height: 70px;
      margin: 0 auto;
      border-radius: 100%;
      background: #ccc;
    }
    .annoucer-name{
      color: #41b883;
      font-size: 14px;
      margin-top: 16px;

    }
  }

  .anounce-details{
    width: 80%;
    padding-left: 16px;
    .anounce-detail-name {
      color: #41b883;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 16px;      
    }
    .anounce-detail-date {
      color: #41b883;
      //font-size: 15px;
      //float: right;
      font-weight: bold;
    }
    .anounce-detail-link {      
      margin-bottom: 16px;
      .anounce-link{
        color: #424242;
        text-decoration: none;       
      }
      .cs-font{
         color: #41b883;
         margin-right: 8px;         
      }
      .anounce-name{
        //color: red;
      }
    }
    .related-info{
      color: #b1b0b0;
      font-size: 14px;
      .cs-font{
        color: #41b883;
        margin-right: 8px;
      }
      &.viewer-info{
        float: right;
      }
      &.completion-team-info{
        margin-right: 32px
      }
    }
  }
</style>

