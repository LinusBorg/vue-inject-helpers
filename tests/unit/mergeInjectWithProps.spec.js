import { mount } from '@vue/test-utils'
import Provider from './resources/merge/Provider'
import Child from './resources/merge/Child'

describe('MergeInjectWithProps', () => {
  it('works', () => {
    const wrapper = mount(Provider)
    const child = wrapper.find(Child)

    expect(child.vm.testPropsChanged).toMatchObject({
      msg: 'Provided message',
    })
  })
})
