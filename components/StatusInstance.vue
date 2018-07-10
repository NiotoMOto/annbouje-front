<template>
    <div>
      {{ status }}
    </div>
</template>

<script>
export default {
  props: ['confirmed', 'cancel'],
  computed: {
    status () {
      if (this.confirmed) {
        return 'CONFIRMED'
      }
      if (this.cancel) {
        return 'CANCEL'
      }
      return 'STANDBY'
    }
  }
}
</script>

