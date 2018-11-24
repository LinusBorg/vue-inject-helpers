import { mount } from '@vue/test-utils'
import Provider from './resources/merge/Provider'
import Child from './resources/merge/Child'

describe('MergeInjectWithProps', () => {
  it('works', () => {
    const wrapper = mount(Provider, {
      propsData: {
        b: 'B',
      },
    })
    const child = wrapper.find(Child)

    expect(child.vm.testPropsChanged).toMatchObject({
      msg: 'Provided message',
      b: 'B',
      c: undefined,
    })
  })
  it('works with an undefined prop', () => {
    const wrapper = mount(Provider)
    const child = wrapper.find(Child)

    expect(child.vm.testPropsChanged).toMatchObject({
      msg: 'Provided message',
      b: undefined,
      c: undefined,
    })
  })

  it('ensures that props have higher priority', () => {
    const wrapper = mount(Provider, {
      propsData: {
        c: 'Test',
      },
    })
    const child = wrapper.find(Child)

    expect(child.vm.testPropsChanged).toMatchObject({
      msg: 'Provided message',
      b: undefined,
      c: 'Test!',
    })
  })
})
