<template>
  <div>
    <h3>Simple Demo</h3>
    <pre>
      b: {{ b }}  
    </pre> 
    default slot: <slot/>
    "named" slot: <slot name="named" />
  </div>
</template>

<script>
import Vue from 'vue'
import WithInjectToProps from '../'
const c = Vue.extend({
  name: 'simpleDemo',
  props: ['a', 'b'],
})
export default c

c.WithInject = WithInjectToProps(c, {
  name: 'test',
  // updateSlotContext: false,
})
</script>

<style scoped>
</style>
