<template>
  <div>
    <InjectProvider>
      <div slot-scope="{msg}">
        <span class="test-span">{{msg}}</span>
      </div>
    </InjectProvider>
  </div>
</template>
<script>
import { createInjectProvider } from '#lib/InjectProvider'
export default {
  name: 'TestProvider',
  components: {
    InjectProvider: createInjectProvider('test'),
  },
  data: () => ({
    msg: 'test message',
  }),
  provide() {
    return {
      test: this.$data,
    }
  },
}
</script>
