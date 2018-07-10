<template>
  <div v-if="show" class="modal">
    <div class="btn close-btn">
      <a href="#" v-on:click="toggleModal"><i class="cs-font cs-font-close"></i></a>
    </div>
    <slot/>
  </div>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false,
        required: true
      },
      toggleModal: {
        type: Function,
        required: true
      }
    }
  }
</script>

<style lang="scss">
  .modal {
    position: fixed;
    top: 95px;
    right: 220px;
    z-index: 2;
    background: #fff;
    height: auto;
    width: 400px;
    padding: 16px;
    border: 1px solid #d3d3d3;
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
    font-size: 14px;
    text-transform: uppercase;
  }

  .cs-choice{
    text-align: center;
    margin-bottom: 16px;
    color: #494848;
  }

  .cs-font-close{
    margin-right: 0;
    text-align: center;
    width: 100%;  
  }

  .close-btn {
    position: absolute;
    right: 3px;
    background: #41b883;    
    width: 45px;
    height: 45px;
    top: 3px;
    border-radius: 100%;
    a {
      color: #fff;
      text-align: center;
      line-height: 45px;
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
