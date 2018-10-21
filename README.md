# vue-inject-to-props

> A small collection of smart Vue mixins and components to make working with `inject` better and easier.

# Content

**A. the `WithInjectToProps` Mixin**

Wrap a component and map content from an injection to its props

**C. The `MergeInjectWithProps` Mixin**

A tiny mixin that essentially does `Object.assign({}, this.injection, this.$props)`

**B. `The InjectProvider` Component**

A Component that makes properties from an injection available as slot props.

# Usage

Given a component that only receives props, and no injections:

```javascript
export default {
  name: 'PropsComponent',
  props: {
    a: String,
  },
}
```

You can make stuff available to this component with:

## A. HOC (Higher-Order-Component)

You can wrap this component in a HOC:

```javascript
// PropsComponentWithInject.js
import PropsComponent from '...'
import WithInjectToProps from 'vue-inject-to-props'

export default WithInjectToProps({
  name: 'nameOfInject',
})
```

and use it:

```html
<PropsComponentWithInject/>
```

And event though youd didn't define any

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
