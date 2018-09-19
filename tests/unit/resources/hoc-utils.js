import Vue from 'vue'
import { mount } from '@vue/test-utils'
export function stubChild(props) {
  return {
    name: 'Child',
    render() {
      return (
        <ul>
          {props.map(prop => (
            <li>
              <pre>{this[prop]}</pre>
            </li>
          ))}
        </ul>
      )
    },
    props,
  }
}
export function wrapComponent(component, options = {}) {
  options = Object.assign({}, options, {
    name: 'test',
  })
  const { WithInjectToProps } = require('#lib/InjectToProps.js')

  return WithInjectToProps(component, options)
}

export function makeReactive(object) {
  return new Vue({
    data: object,
  }).$data
}

export function createWrappedStub(inject, props, options, wrapperOptions = {}) {
  const child = stubChild(props)
  const wrappedChild = wrapComponent(child, options)

  const wrapper = mount(wrappedChild, {
    ...wrapperOptions,
    //parentComponent,
    provide: {
      test: inject,
    },
  })

  return {
    wrapper,
    child,
  }
}
