import { WithInjectToProps } from './InjectToProps'

const version = process.env.VUE_APP_VERSION

WithInjectToProps.version = version

export default WithInjectToProps
