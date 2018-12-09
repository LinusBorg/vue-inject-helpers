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
      mergeProps: {
        type: [Boolean, String],
        // idea:
        // "union" = expose only injection props that are also component props
        // "intersection" = Join both.
        // TODO , not done yet.
        validate: v => [true, false, 'union', 'include'].indexOf(v) !== -1,
      },
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

      let mergedInjection = {}
      if (props.mergeProps === true || props.mergeProps === 'union') {
        mergedInjection = mergeUnionProps(
          parentProps,
          injection,
          props.propsMapper
        )
      }

      if (props.mergeProps === 'intersection') {
        mergedInjection = Object.assign(
          {},
          remapInjection(injection, props.propsMapper),
          parentProps
        )
      }

      return slot(mergedInjection)
    },
  }
}

function mergeUnionProps(props, _injected, mapper = {}) {
  let injected = remapInjection(_injected, mapper)

  const injectProps = pick(injected, Object.keys(props))
  return merge(injectProps, props)
}

/**
 * Returns a copy of _injected, but keys that are mapped in mapper
 * are exchanged
 * @param {object} _injected
 * @param {object} mapper
 */
function remapInjection(_injected, mapper) {
  return Object.keys(mapper).reduce((acc, key) => {
    acc[key] = acc[mapper[key]]
    delete acc[mapper[key]]
    return acc
  }, Object.assign(_injected))
}
