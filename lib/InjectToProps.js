import Vue from 'vue'
import { merge, pick } from './utils'

export function WithInjectToProps(
  component,
  { name, functional, updateSlotContext = true }
) {
  component = normalizeComponent(component)
  const { name: compName, props: propDefs = {} } = component.options

  return {
    name: compName ? `${compName}WithInjectProps` : 'AnonymousWithInjectProps',

    inject: {
      [name]: { default: {} },
    },

    functional,

    inheritAttrs: functional ? undefined : false,

    props: propDefs,

    computed: {
      propsToInject() {
        return injectProps(this.$props, this[name], propDefs)
      },
    },

    render: functional
      ? // render Wrapper as a functional component
        function(h, { props, children, data, injections }) {
          const propsToInject = injectProps(props, injections[name], propDefs)
          return h(
            component,
            {
              ...data,
              props: propsToInject,
            },
            children
          )
        }
      : // render Wrapper as a normal component
        function(h) {
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
  }
}

// We always get the options from a extended Vue constructur
// since it has all options (i.e.) normalized for us already
function normalizeComponent(component) {
  return typeof component === 'function'
    ? component
    : Vue.extend({ ...component })
}

/** this is the heart of the component, really.
 *  it extracts all properties from an injection that match a prop name,
 *  then it merged these as defaults with the props the wrapper received.
 *  @returns {object} Result
 */
function injectProps(props, injected, propDefs) {
  const injectProps = pick(injected, Object.keys(propDefs))
  return merge(injectProps, props)
}

function updateContextForSlotVNodes($slots, vm) {
  const vnodes = Object.keys($slots).reduce((acc, key) => {
    return [...acc, ...$slots[key]]
  }, [])
  const newVNodes = vnodes.map(node => {
    node.context = vm
    return node
  })
  return newVNodes
}
