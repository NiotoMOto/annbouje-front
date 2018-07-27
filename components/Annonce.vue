<template>
    <div class="annonce">
      <p>{{ annonce.date | formatDate }}</p>
      <p>
        {{ annonce.subscribers.length }} {{ $t('labels.subscribers') }} / {{ annonce.places }} {{ $t('labels.place') }}
      </p>
      <StatusInstance :confirmed="annonce.confirmed" :cancel="annonce.cancel" />
      {{ annonce.registered ? 'REGISTERED': '' }}
      <div v-for="subscriber of annonce.subscribers" :key="subscriber.username">
        {{ subscriber.username }}
      </div>
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
  .annonce {
    padding: 10px;
  }
</style>


