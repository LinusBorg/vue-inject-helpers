import { WithInjectToProps } from './InjectToProps'
import { createInjectProvider } from './InjectProvider'

const version = process.env.VUE_APP_VERSION

export default WithInjectToProps
export { WithInjectToProps, createInjectProvider, version }
