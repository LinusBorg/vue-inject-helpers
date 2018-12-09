import Vue from 'vue'
import { merge, pick } from './utils'

export function WithInjectToProps(
  component,
  { name, functional, updateSlotContext = !functional, mapper }
) {
  component = normalizeComponent(component)
  const { name: compName, props: propDefs = {} } = component.options

  const baseOptions = {
    name: compName ? `${compName}WithInjectProps` : 'AnonymousWithInjectProps',

    inject: {
      [name]: { default: {} },
    },

    props: propDefs,
  }

  if (functional) {
    return Object.assign(baseOptions, {
      functional: true,

      render(_, { parent, props, children, data, injections }) {
        const h = parent.$createElement
        const propsToInject = injectProps(
          props,
          injections[name],
          propDefs,
          mapper
        )
        data.props = propsToInject
        return h(component, data, children)
      },
    })
  } else {
    return Object.assign(baseOptions, {
      inheritAttrs: false,

      computed: {
        propsToInject() {
          return injectProps(this.$props, this[name], propDefs, mapper)
        },
      },

      render(h) {
        return h(
          component,
          {
            attrs: this.$attrs,
            on: this.$listeners,
            props: this.propsToInject,
            scopedSlots: this.$scopedSlots,
          },
          updateSlotContext
            ? updateContextForSlotVNodes(this.$slots, this._self)
            : this.$vnode.componentOptions.children
        )
      },
    })
  }
}

// We always get the options from a extended Vue constructur
// since it has all options (i.e.) normalized for us already
function normalizeComponent(component) {
  return typeof component === 'function'
    ? component
    : Vue.extend(Object.assign({}, component))
}

/** this is the heart of the component, really.
 *  it extracts all properties from an injection that match a prop name,
 *  then it merged these as defaults with the props the wrapper received.
 *  @returns {object} Result
 */
function injectProps(props, _injected, propDefs, mapper = {}) {
  let injected = Object.keys(mapper).reduce(
    (acc, key) => {
      acc[key] = acc[mapper[key]]
      delete acc[mapper[key]]
      return acc
    },
    { ..._injected }
  )

  const injectProps = pick(injected, Object.keys(propDefs))
  return merge(injectProps, props)
}

function updateContextForSlotVNodes($slots, vm) {
  const vnodes = Object.keys($slots).reduce((acc, key) => {
    return [].concat(acc, $slots[key])
  }, [])
  const newVNodes = vnodes.map(node => {
    node.context = vm
    return node
  })
  return newVNodes
}
