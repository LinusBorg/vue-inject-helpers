<template>
  <div id="app">
    <button @click="toggle">Toggle</button> ({{this.provider.b}})
    <hr>
    <SimpleDemo/>
    <SimpleDemoWithInject/>
    <SimpleFunctionalWithInject/>
  </div>
</template>

<script>
import SimpleDemo from './components/SimpleDemo'
import SimpleFunctional from './components/SimpleFunctional'

console.log(SimpleDemo.WithInject)
export default {
  name: 'app',
  components: {
    SimpleDemo,
    SimpleFunctional,
    SimpleFunctionalWithInject: SimpleFunctional.WithInject,
    SimpleDemoWithInject: SimpleDemo.WithInject,
  },
  data: () => ({
    provider: {
      a: 'a',
      b: false,
    },
  }),
  provide() {
    return {
      test: this.provider,
    }
  },
  methods: {
    toggle() {
      this.provider.b = !this.provider.b
    },
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
