<template>
  <label class="cs-input-label">
    <span v-if="label">{{ label }}</span>
    <input
      class="cs-input"
      :id="id"
      :value="value"
      :type="type"
      @input="changeHandler(name, $event.target.value)"
      :placeholder="placeholder"
    />
  </label>
</template>

<script>
  export default {
    name: 'v-input',
    props: ['value', 'changeHandler', 'placeholder', 'label', 'type', 'name', 'id']
  }
</script>

<style lang="scss">
  .cs-input-label {
    display: inline-block;
    padding: 0 5px;
    width: 28%;
    &:first-child{
      padding-left: 0;
    }
  }
  .cs-search_date{
    width: 17%;
  }
   .cs-input {
      text-align: left;
      height: 45px;
      width: 100%;
      padding: 0 10px;
      font-size: 13px;
      text-transform: uppercase;
      border: 1px solid #d3d3d3;      
    }
    
</style>