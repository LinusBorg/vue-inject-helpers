import { WithInjectToProps } from './InjectToProps'
import InjectProvider from './InjectProvider'

const version = process.env.VUE_APP_VERSION

export default WithInjectToProps
export { WithInjectToProps, InjectProvider, version }
