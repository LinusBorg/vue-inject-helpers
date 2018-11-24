<template>
  <div>
    <Child :msg="msg" :c="c && c + '!'"/>
  </div>
</template>
<script>
import Child from './Child.vue'

export default {
  name: 'TestProvider',
  props: {
    msg: String,
    b: String,
    c: String,
  },
  components: {
    Child,
  },
  provide() {
    return {
      test: {
        msg: 'Provided message',
        b: this.b,
        c: this.c,
      },
    }
  },
}
</script>
