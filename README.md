# vue-inject-to-props

> A duo of smart Vue components to easily map properties from an `inject:` source to component properties.

# Usage

Given a component that only receives props, and no injections:

```javascript
export default {
  name: 'PropsComponent',
  props: {
    a: String
  }
}
```
### A. HOC (Higher-Order-Component)

You can eithe wrap this component in a HOC:
```javascript
// PropsComponentWithInject.js
import PropsComponent from '...'
import WithInjectToProps from 'vue-inject-to-props'

export default WithInjectToProps({
  name: 'nameOfInject'
})
```
and use it:
```html
<PropsComponentWithInject/>
```
And event though youd dintÄ

# Development

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
# watching:
yarn run test:unit:w
```
