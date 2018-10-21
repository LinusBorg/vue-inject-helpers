import { mount } from '@vue/test-utils'
import ProviderContainer from './resources/Provider'
import ProviderOverwrite from './resources/ProviderOverwrite'

describe('The Provider Component', () => {
  it('works', () => {
    const wrapper = mount(ProviderContainer, {
      propsData: {
        msg: 'test message',
      },
    })

    const span = wrapper.find('.test-span')
    expect(span.text()).toBe('test message')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('re-renders when reactive data is changed', () => {
    const wrapper = mount(ProviderContainer, {
      propsData: {
        msg: 'test message',
      },
    })

    wrapper.setProps({
      msg: 'new test message',
    })

    const span = wrapper.find('.test-span')
    expect(span.text()).toBe('new test message')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('allows to overwrite inject values with props', () => {
    const wrapper = mount(ProviderOverwrite, {
      propsData: {
        msg: 'test message',
        msgOverwrite: 'overwritten message!',
      },
    })
    const span = wrapper.find('.test-span')
    expect(span.text()).toBe('overwritten message!')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
