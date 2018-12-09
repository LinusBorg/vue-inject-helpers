import { WithInjectToProps } from './InjectToProps'
import { createInjectProvider } from './InjectProvider'
import { MergeInjectWithProps } from './MergeInjectWithProps'

const version = process.env.VUE_APP_VERSION

export {
  createInjectProvider,
  MergeInjectWithProps,
  WithInjectToProps,
  version,
}
