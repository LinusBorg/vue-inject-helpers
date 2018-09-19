<template>
  <div>
    <h3 @click="emit">Simple Demo</h3>
    <pre>
      a: {{ a }}
      b: {{ b }}  
    </pre> 
    default slot: <slot/>
    "named" slot: <slot name="named" />
  </div>
</template>

<script>
import Vue from 'vue'
import WithInjectToProps from '#lib'
const c = Vue.extend({
  name: 'simpleDemo',
  props: ['a', 'b'],
  methods: {
    emit() {
      console.log('emit')
      this.$emit('click')
    },
  },
})
export default c

c.WithInject = WithInjectToProps(c, {
  name: 'test',
  // updateSlotContext: false,
})
</script>

<style scoped>
</style>
