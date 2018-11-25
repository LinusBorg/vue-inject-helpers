<template>
  <div>
    <InjectProvider :mergeProps="mergeProps" :propsMapper="propsMapper">
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
  props: {
    msg: String,
    mergeProps: String,
    propsMapper: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    InjectProvider: createInjectProvider('test'),
  },
  provide() {
    return {
      test: {
        msgInjected: 'Injected',
      },
    }
  },
}
</script>
