import { getType, warn } from './utils'

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
    render: (h, { props, injections, data: { scopedSlots } }) => {
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

      return slot(injection)
    },
  }
}
