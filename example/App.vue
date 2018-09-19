<template>
  <div id="app">
    <button @click="toggle">Toggle</button> ({{this.provider.b}})
    <hr>

    <div class="demos">
      <SimpleDemo />
      <SimpleDemoWithInject @click="provider.a = 'AA'">
        <p>Test</p>
        <p slot="named">Test named</p>
      </SimpleDemoWithInject>
      <SimpleFunctionalWithInject @click="provider.a = 'AA'">
        <p>Test</p>
        <p slot="named">Test named</p>
      </SimpleFunctionalWithInject>
    </div>
  </div>
</template>

<script>
import SimpleDemo from './components/SimpleDemo'
import SimpleFunctional from './components/SimpleFunctional'

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

.demos {
  display: flex;
  justify-content: space-around;
}
</style>
