export const isProd = process.env.NODE_ENV === 'production'

export function warn(msg) {
  if (!isProd) {
    console.warn('[vue-inject-to-props / InjectProvider]: ' + msg)
  }
}

export function getType(obj) {
  if (Array.isArray(obj)) return 'array'

  if (typeof obj === 'object') return 'object'

  return typeof obj
}

export function merge(objectA, objectB) {
  const res = Object.assign({}, objectA)
  Object.keys(objectB).forEach(key => {
    if (objectB[key] == null) return
    res[key] = objectB[key]
  })
  return res
}

export function pick(obj = {}, arr = []) {
  return arr.reduce((picked, key) => {
    picked[key] = obj[key]
    return picked
  }, {})
}
