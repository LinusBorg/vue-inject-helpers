<template>
  <div>
    <Child :msg="msg"/>
  </div>
</template>
<script>
import Child from './Child.vue'

export default {
  name: 'TestProvider',
  props: {
    msg: String,
    b: String,
  },
  components: {
    Child,
  },
  provide() {
    return {
      test: {
        msg: 'Provided message',
        b: this.b,
      },
    }
  },
}
</script>
