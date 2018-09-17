import { mount } from '@vue/test-utils'
import ProviderContainer from './resources/Provider'

describe('The Provider Component', () => {
  it('works', () => {
    const wrapper = mount(ProviderContainer)

    const span = wrapper.find('.test-span')
    expect(span.text()).toBe('test message')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('re-renders when reactive data is changed', () => {
    const wrapper = mount(ProviderContainer)

    wrapper.setData({
      msg: 'new test message',
    })

    const span = wrapper.find('.test-span')
    expect(span.text()).toBe('new test message')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
