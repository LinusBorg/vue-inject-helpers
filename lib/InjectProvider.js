import { getType, merge, pick, warn } from './utils'

export function createInjectProvider(name) {
  if (!name) {
    warn(
      `createInjectProvider() expects at least one argument (the name of the injection)`
    )
    return
  }

  return {
    functional: true,
    inject: {
      [name]: { default: {} },
    },
    props: {
      mergeProps: Boolean,
      propsMapper: Object,
    },
    render: (h, { parent, props, injections, data: { scopedSlots } }) => {
      const parentProps = parent.$props
      const injection = injections[name]
      if (!injection) {
        warn(`injection '${props.inject}' not found.`)
        return
      }
      if (typeof injection !== 'object' || Array.isArray(injection)) {
        warn(`expected injection '${props.inject}' to be an object,
        is type '${getType(injection)}' instead`)
        return
      }

      const slot = scopedSlots.default
      if (!slot) return null

      if (!props.mergeProps) {
        return slot(injection)
      }

      const mergedInjection = injectProps(
        parentProps,
        injection,
        parentProps,
        props.propsMapper
      )
      return slot(mergedInjection)
    },
  }
}

function injectProps(props, _injected, mapper = {}) {
  let injected = Object.keys(mapper).reduce(
    (acc, key) => {
      acc[key] = acc[mapper[key]]
      delete acc[mapper[key]]
      return acc
    },
    { ..._injected }
  )

  const injectProps = pick(injected, Object.keys(props))
  return merge(injectProps, props)
}
