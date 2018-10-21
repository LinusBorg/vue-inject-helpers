<template>
  <div>
    {{testPropsChanged.msg}}
  </div>
</template>

<script>
import { mergeInjectWithProps } from '#lib/MergeInjectWithProps'
export default {
  name: 'child',
  inject: ['test'],
  mixins: [mergeInjectWithProps('test', 'testPropsChanged')],
}
</script>

<style scoped>
</style>
