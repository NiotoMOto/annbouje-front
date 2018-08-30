<template>
  <div>
    Inscrits
    <div v-bind:key="user.email" v-for="user in users" >
      {{user.email}}
    </div>
  </div>
</template>

<script>
export default {
  props: ['users', 'adduser']
}
</script>

