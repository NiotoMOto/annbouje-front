<template>
  <label class="cs-select-label">
    <span v-if="label">{{ label }}</span>
    <select
      class="cs-select"
      :id="id"
      :value="value"
      @input="changeHandler(name, $event.target.value)"
      :placeholder="placeholder"
    >
      <option
        v-for="item in items"
        :key="item[attrValue]"
        :value="item[attrValue]"
      >
        {{ item[attrLabel] }}
      </option>
    </select>
  </label>
</template>

<script>
  export default {
    name: 'v-input',
    props: ['value', 'items', 'changeHandler', 'placeholder', 'label', 'name', 'id', 'attrLabel', 'attrValue']
  }
</script>

<style lang="scss">
  .cs-select-label {
    display: inline-block;
    padding: 0 5px;
    width: 28%;
    &:first-child{
      padding-left: 0;
    }
  }
  .cs-select {
    text-align: left;
    height: 45px;
    width: 100%;
    padding: 0 10px;
    font-size: 13px;
    //text-transform: uppercase;
    border: 1px solid #d3d3d3;  
    border-radius: 45px;    
  }
    
</style>