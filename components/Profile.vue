
<template>
  <section class="modal-profile">
     <ul class="profile-menu">
       <li class="profile-items">Tableau de bord</li>
       <li class="profile-items">Profil</li>
       <li class="profile-items">Mes reservations</li>
        <li class="profile-items">
          <a  class="cs-user-logout"      
          href="#"
          v-on:click="logout"
          >
            Se déconnecter
          </a>
        </li>
     </ul>
      
  </section>
</template>

<script>
  export default {
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
        this.$store.commit('ui/toggleModal', { modal: 'profile' })
      }
    }
  }
</script>


<style lang="scss">
.profile-menu {
  padding-left: 0; 
  .profile-items {
    list-style: none;
    margin-bottom: 16px;
    color: #41b883;
    cursor: pointer;
    a {
       color: #41b883;
       text-decoration: none;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
