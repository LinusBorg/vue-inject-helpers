import { mount } from '@vue/test-utils'
import ProviderContainer from './resources/Provider'
import ProviderOverwrite from './resources/ProviderOverwrite'
import ProviderMerge from './resources/ProviderMerge'
import ProviderIntersection from './resources/ProviderIntersection'

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
        msgForInject: 'test message (from inject)',
      },
    })
    const span = wrapper.find('.test-span')
    expect(span.text()).toBe('test message')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('allows to remap property names between props & inject', () => {
    const wrapper = mount(ProviderMerge, {
      propsData: {
        msg: 'test message',
        mergeProps: 'union',
        propsMapper: { msg: 'msgInjected' },
      },
    })
    const span = wrapper.find('.test-span')
    expect(span.text()).toBe('test message')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('inject mode', () => {
    const wrapper = mount(ProviderIntersection, {
      propsData: {
        msg: 'test message',
        mergeProps: 'intersection',
      },
    })
    const span = wrapper.find('.test-span')
    expect(span.text()).toBe('test message Injected')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
