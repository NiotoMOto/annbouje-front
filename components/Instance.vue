<template>
    <div class="instance">
      <p>{{ instance.date | formatDate }}</p>
      <p>{{ instance.subscribers.length }} {{ $t('labels.subscribers') }} / {{ instance.nbPlaces }} {{ $t('labels.place') }} </p>
      <StatusInstance :confirmed="instance.confirmed" :cancel="instance.cancel" />
      {{ instance.registered ? 'REGISTERED': '' }}
      <div v-for="subscriber of instance.subscribers" :key="subscriber.username">
        {{ subscriber.username }}
      </div>
      <div v-if="!instance.registered"><button>{{ $t('button.subscribe') }}</button></div>
    </div>
</template>

<script>
  import StatusInstance from '~/components/StatusInstance.vue'
  export default {
    components: {StatusInstance},
    props: ['instance']
  }
</script>

<style lang="scss">
  .instance {
    padding: 10px;
  }
</style>


