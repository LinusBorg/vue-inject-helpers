# vue-inject-helpers

> A small collection of smart Vue mixins and components to make working with `inject` better and easier.

## Content

**A. the `WithInjectToProps` Mixin**

Wrap a component and map content from an injection to its props

**B. The `MergeInjectWithProps` Mixin**

A tiny mixin that essentially does `Object.assign({}, this.injection, this.$props)`

**C. `The InjectProvider` Component**

A Component that makes properties from an injection available as slot props.

## Usage

### A. HOC (Higher-Order-Component)

Given a component that only receives props, and no injections:

```javascript
export default {
  name: 'PropsComponent',
  props: {
    msg: String,
  },
}
```

and a (Grand-)Parent-Component that provides an object to its children:

```javascript
provide: {
  nameOfInject: {
    msg: 'Test!'
  }
}
```

You can wrap this component in a HOC:

```javascript
// PropsComponentWithInject.js
import PropsComponent from '...'
import { WithInjectToProps } from 'vue-inject-to-props'

export default WithInjectToProps(PropsComponent, {
  name: 'nameOfInject',
})
```

and use it:

```html
<PropsComponentWithInject/>
```

And event though youd didn't pass any props to `<PropsComponentWithInject>`,
the wrapped `<PropsComponet>` will have its `msg` prop filled with `'Test!'` from the injection (if present).

### B. The `MergeInjectWithProps` Mixin

This mixin also merges props with properties from an inject, but while the HOC does so by wrapping the component,
this mixin does so _inside_ of our component, by adding a computed property:

```javascript
import { MergeInjectWithProps } from 'vue-inject-helpers'
export default {
  name: 'PropsComponent',
  props: {
    msg: String,
  },
  mixins: [
    mergeInjectWithProps('nameOfInject', 'merged' /* name for computed prop */),
  ],
}
```

Now you can access the `merged` property in your templates and it will have a `msg` property that returns `Test`:

```html
<p>
  {{ merged.msg }}
  <!-- 'Test!' -->
</p>
```

The component's own props have priority over the values from the injection, so you can overwrite the value of msg locally:

```html
<PropsComponent msg="Another Test!" />
```

## Development

### Project setup

```bash
yarn install
```

### Compiles and hot-reloads for development

```bash
yarn run serve
```

### Compiles and minifies for production

```bash
yarn run build
```

### Lints and fixes files

```bash
yarn run lint
```

### Run your unit tests

```bash
yarn run test:unit
# watching:
yarn run test:unit:w
```
