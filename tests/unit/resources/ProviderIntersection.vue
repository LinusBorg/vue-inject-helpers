<template>
  <div>
    <InjectProvider mergeProps="intersection" :propsMapper="propsMapper">
      <div slot-scope="props">
        <span class="test-span">{{ props.msg }} {{ props.msgInjected }}</span>
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
