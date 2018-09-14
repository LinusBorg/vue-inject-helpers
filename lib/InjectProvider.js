import { getType, isProd } from './utils'

export default {
  functional: true,
  props: {
    inject: {
      type: String,
      required: true,
    },
  },
  render: (h, { props, injections, data: { scopedSlots } }) => {
    const injection = injections[props.inject]
    if (!isProd && !injection) {
      console.warn(
        `[vue-inject-to-props]: injection '${props.inject}' not found.`
      )
    }
    if (
      (!isProd && typeof injection !== 'object') ||
      Array.isArray(injection)
    ) {
      console.warn(`[vue-inject-to-props]: expected injection '${
        props.inject
      }' to be an object,
      is type '${getType(injection)}' instead`)
    }

    const slot = scopedSlots.default
    if (!slot) return null

    return scopedSlots(injection)
  },
}
