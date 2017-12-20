<template>
  <div>
    <div v-if="show" :class="modalClasses" @click="test">
      <div class="btn close-btn">
        <a href="#" v-on:click="toggleModal"><i class="cs-font cs-font-close"></i></a>
      </div>
      <slot/>
    </div>
    <div class="overlay" v-if="mode === 'overlay' && show" @click="toggleModal"></div>
  </div>
  
</template>

<script>
  export default {
    data: () => ({

    }),
    computed: {
      modalClasses () {
        return {
          modal: true,
          'modal-overlay': this.mode === 'overlay',
          'modal-menu': this.mode === 'menu'
        }
      }
    },
    props: {
      show: {
        type: Boolean,
        default: false,
        required: true
      },
      toggleModal: {
        type: Function,
        required: true
      },
      mode: {
        type: String,
        required: false,
        default: 'menu'
      }
    }
  }
</script>

<style lang="scss">
  .modal {
     background: #fff;
    height: auto;
    width: 400px;
    padding: 16px;
    border: 1px solid #d3d3d3;
  }
  .modal-menu {
    position: fixed;
    top: 70px;
    right: 300px;
    z-index: 2;
    background: #fff;
    height: auto;
    width: 400px;
    padding: 16px;
    border: 1px solid #d3d3d3;
  }

  .overlay {
    background: red;
    opacity: 0.3;
    position: fixed;
    width: 100%;
    height: 100%;
  }

  .modal-overlay {
     position: fixed;
      top: 50%;
      right: 50%;
      z-index: 99;
  }

  .auth-wrapper{
    width: 100%;
  } 

  .field {
    input{
      width: 100%;
    }
    label{
      width: 100%;
    }
  }

  .block-title{
    font-size: 16px;
    margin-bottom: 16px;
    display: inline-block;
    font-weight: bold;
    font-size: 26px;
    color: #494848;
  }

  .auth{
    font-size: 12px;
    text-transform: uppercase;
  }

  .cs-choice{
    text-align: center;
    margin-bottom: 16px;
    color: #494848;
  }

  .cs-font-close{
    margin-right: 0;    
  }

  .close-btn {
    position: absolute;
    right: -52px;
    background: #41b883;    
    width: 50px;
    height: 50px;
    top: -1px;
    a {
      color: #fff;
      display: inline-block;
      padding: 12px;
    }
  }

  .field-login{
    .cs-input-label{
      padding: 0;
      margin-bottom: 16px;
      span{
        display: none;
      }
    }
  }

  .cta-login{
    width: 100%;
    background: #41b883;
    border: none;
    color: #fff;
    padding: 16px;
    text-transform: uppercase;   
    letter-spacing: 1px;    
  }
  
</style>
