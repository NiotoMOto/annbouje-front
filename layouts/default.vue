<template>  
  <div>
    <header class="bloc-head">
      <div class="top-head">
        <span class="lang">
          <nuxt-link class="Header__Link" v-if="$i18n.locale === 'en'" :to="`/fr` + $route.fullPath" active-class="none" exact>
              {{ $t('links.french') }}
            </nuxt-link>
            <nuxt-link class="Header__Link" v-else :to="$route.fullPath.replace(/^\/[^\/]+/, '')" active-class="none" exact>
              {{ $t('links.english') }}
          </nuxt-link> 
        </span>
         
      </div>
      <ul class="menu menu-left">
        <!-- <li class="menu-items burguer-menu"><i class="cs-font cs-font-burger"></i>Menu</li> -->          
        <li class="menu-items cs-logo">            
          <nuxt-link :to="path('/')" class="logo link" href="#" alt="logo"></nuxt-link>
        </li>            
      </ul>      
      <ul class="menu menu-right">
        <li class="menu-items menu-item-login">
          <a class="cs-user-name"
            v-if="!user"
            href="#"
            v-on:click="toggleLoginModal">
              {{ $t('links.login') }} / Create account
          </a>
          <a class="toggle-profile"           
            v-if="user"
            href="#"
            v-on:click="toggleProfileModal">
            {{ user.username }}
            <span>
              <img class="pict-profil" :src="user.image" alt="photo proile">
            </span>                  
          </a>
         
          <!-- <a  class="cs-user-logout"
            v-if="user"
            href="#"
            v-on:click="logout"
          >
            Déconnecter
          </a> -->
        </li>      
        <li class="menu-items menu-item-create-annonce">
          <nuxt-link :to="path('/annonces/create')">{{ $t('links.create_annonce') }}</nuxt-link>
        </li>         
      </ul>    
    </header>
    <div class="content-app">
      <nuxt/> 
    </div>
    <div id="content" class="content-bottom">     

      <!-- <p><nuxt-link :to="path('/')">{{ $t('links.home') }}</nuxt-link></p>
      <p><nuxt-link :to="path('/annonces/create')">{{ $t('links.create_annonce') }}</nuxt-link></p>
      <p><a href="#" v-on:click="toggleLoginModal">{{ $t('links.login') }}</a></p>
      <p><a href="#" v-on:click="toggleRegisterModal">{{ $t('links.register') }}</a></p>
      <p><a href="#" v-on:click="logout">{{ $t('links.logout') }}</a></p>
      <nuxt-link class="Header__Link" v-if="$i18n.locale === 'en'" :to="`/fr` + $route.fullPath" active-class="none" exact>
        {{ $t('links.french') }}
      </nuxt-link>
      <nuxt-link class="Header__Link" v-else :to="$route.fullPath.replace(/^\/[^\/]+/, '')" active-class="none" exact>
        {{ $t('links.english') }}
      </nuxt-link> -->

      <Modal :show="showLoginModal" :toggleModal="toggleLoginModal">
        <LoginOrRegister />
      </Modal>
       <Modal :show="showProfileModal" :toggleModal="toggleProfileModal">
        <Profile />
      </Modal>
    </div>
    <section class="cs-footer-wrapper">
      <div class="cs-footer"></div>
    </section>  
  </div>
</template>

<script>
  import LoginOrRegister from '~/components/LoginOrRegister.vue'
  import Profile from '~/components/Profile.vue'
  import Logo from '~/components/Logo.vue'
  import Modal from '~/components/Modal.vue'
  import { path } from '~/utils/paths.js'

  export default {
    components: {
      LoginOrRegister, Logo, Modal, Profile
    },
    computed: {
      showLoginModal () {
        return this.$store.state.ui.modals.login
      },
      showProfileModal () {
        return this.$store.state.ui.modals.profile
      },
      showRegisterModal () {
        return this.$store.state.ui.modals.register
      },
      user () {
        return this.$store.state.user
      }
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
      },
      path (url) {
        return path(url, this)
      },
      toggleLoginModal () {
        this.$store.commit('ui/toggleModal', { modal: 'login' })
      },
      toggleProfileModal () {
        this.$store.commit('ui/toggleModal', { modal: 'profile' })
      },
      toggleRegisterModal () {
        this.$store.commit('ui/toggleModal', { modal: 'register' })
      }
    }
  }
</script>

<style lang="scss">
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.top-head {  
  background: #f7f7f7;
  height: 30px;
  padding: 5px;
  border-bottom: 1px solid #ccc;
  .lang {    
    position: absolute;
    right: 32px;
    
    a {
      text-decoration: none;
      color: #9c9c9c;
    }    
  }
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.menu-left{
  width: 50%;
  float:left;
}
.menu-right{
  float:left;
  display:block;
}
.menu-right{
  width: 50%;
  .menu-items{       
   // width: 50%;
    text-align: center;
    text-transform: uppercase;
    font-size: 14px;
  }
}
.content-top {
  display: inline-block;
  width: 100%;
  height: auto;
  position: relative;
  .slider{
    width: 100%;
    height: 100%;
    display: inline-block
  }
}

.wrapper-content-slider {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  .content-slider {
    width: 80%;
    margin: 0 auto;
    text-align: center;
    top: calc(50% - 70px);
    position: relative;  
    color: #fff;
  }
}
.content-bottom { 
  padding: 0 50px;
}

.logo { 
  background: url(/assets/images/logo.png) no-repeat;
  display: inline-block;
  width: 119px;
  height: 60px;
  background-size: 100%;
  position: absolute;
  top: 0;
} 

.menu-item-create-annonce{
  background:#41b883;
  width: 220px;
}

.menu-items{    
    display: table-cell;
    //width: 20%;   
    vertical-align: middle;
    height: 60px;
    position: relative;
    a{
      text-decoration: none;
      color: #fff;
      &:active,&:visited,&:focus {
        //color:inherit;
      }
    }
  }

  .menu.menu-right {
    float: right;
    width: 50%;
    display: table;
    .menu-item-login{
      text-align: right;
      padding-right: 16px;
    }
}
.auth-facebook{  
  .cs-link {
    color: #fff;
    text-decoration: none;
    background: #3b5998;
    padding: 10px;
    margin-bottom: 16px;
    width: 100%;
    display: inline-block; 
    text-transform: none;   
  }
}
.auth-google{ 
  .cs-link {
    color: #fff;
    text-decoration: none;
    background: #DC4A38;
    padding: 10px;
    margin-bottom: 16px;
    width: 100%;
    display: inline-block;
    text-transform: none; 
  }
}

.burguer-menu {
  margin-right: 26px;
  border-right: 1px solid #ccc;
  color: #494848;
  text-transform: uppercase;
  font-weight: 666;
  width: 23%;
}
.menu-item-login{
  a{
    color: #41b883;
    font-weight: 600;
    text-transform: none;
  }
  .cs-user-name {
    font-weight: normal;    
  }
}

.cs-font-burger {
    line-height: 23px;
}

.bloc-head{
    border-bottom: 1px solid #ccc;    
    width: 100%;
    //height: 60px;
    position: fixed;
    top: 0;
    z-index: 9;
    background: #fff;
}

.cs-title{
  margin-bottom: 25px;   
}

.menu-left{
  padding-left: 16px;
}
.cs-font{
  font-size: 26px;
  margin-right: 16px;
  vertical-align: middle;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.content-app {
  margin-top: 60px;
}

.cs-footer-wrapper{
  width: 100%;
  background: #444;
  height: 70px;
  display: inline-block;
}

.pict-profil {
    width: 40px;
    height: 40px;
    background: #ccc;
    border-radius: 100%;
    display: inline-block;
    vertical-align: middle;
    margin-left: 8px;
}
</style>
