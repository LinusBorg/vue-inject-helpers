<template>
  <div>
    <h3>Simple Demo</h3>
    <pre>
      b: {{ b }}  
    </pre> 
  </div>
</template>

<script>
import Vue from 'vue'
import { WithInjectToProps } from '../'
const c = Vue.extend({
  name: 'simpleFunctional',
  props: ['a', 'b'],
})
export default c

c.WithInject = WithInjectToProps(c, {
  name: 'test',
  functional: true,
})
</script>

<style scoped>
</style>
