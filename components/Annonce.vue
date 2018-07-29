<template>
    <div class="annonce-details">
      <p class="ann-title">Urban soccer - Porte d'Aubervilliers</p>
      <p class="ann-date">Prévu pour le : <span class="date">{{ annonce.date | formatDate }}</span></p>
      <p class="ann-places-available">
        <!-- {{ $t('labels.subscribers') }} -->
        Il reste <span class="places-available">{{ annonce.subscribers.length }} {{ $t('labels.place') }} sur {{ annonce.places }} </span> 
      </p>
      <div class="ann-suscribers">Voir la liste des inscrits
        {{ annonce.registered ? 'REGISTERED': '' }}
        <p v-for="subscriber of annonce.subscribers" :key="subscriber.username">
          {{ subscriber.username }}
        </p>
      </div>
      <!-- <button>
        je m'inscris
      </button> -->
      <!-- <StatusInstance :confirmed="annonce.confirmed" :cancel="annonce.cancel" /> -->     
      <div v-if="!annonce.registered"><button>{{ $t('button.subscribe') }}</button></div>
    </div>
</template>

<script>
  import StatusInstance from '~/components/StatusInstance.vue'
  export default {
    components: {StatusInstance},
    props: ['annonce']
  }
</script>

<style lang="scss">
  .annonce-details {
    color: #666;
    float: left;
    width: 40%;
  }

  .ann-title {
    font-size: 18px;
    color: #41b883;
    font-weight: 500;
    margin-bottom: 8px;
  }
  .ann-date {
    .date {
      color: #41b883;
    }
  }
  .places-available {
    color: #41b883;
  }
  .ann-suscribers {
    margin-top: 8px;
  }
</style>


