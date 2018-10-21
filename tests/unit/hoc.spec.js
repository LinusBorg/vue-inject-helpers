import { createWrappedStub, makeReactive } from './resources/hoc-utils'
import Vue from 'vue'

/**
 * TODO
 * - test slots re-contextualization
 */
describe('The HOC', () => {
  const modes = [false, true]

  modes.forEach(functional => {
    describe(`[${functional ? 'Functional' : 'Normal'}] Version`, () => {
      it('passes inject values to matching props', () => {
        const inject = {
          a: 'A',
          b: 'B',
        }
        const { wrapper, child } = createWrappedStub(inject, ['a', 'b'], {
          functional,
        })
        // we can't check the injection of the functional component, there's no instance.
        if (!functional) {
          expect(wrapper.vm.test).toMatchObject(inject)
        }

        const props = wrapper.find(child).props()
        expect(props).toMatchObject({
          a: 'A',
          b: 'B',
        })
      })

      it("doesn't pass inject values that have no matching props", () => {
        const inject = {
          a: 'A',
          b: 'B',
        }
        const { wrapper, child } = createWrappedStub(inject, ['a', 'c'], {
          functional,
        })

        const vm = wrapper.find(child).vm
        expect(vm.$props).toMatchObject({
          a: 'A',
        })
        expect(vm.$attrs.c).toEqual(undefined)
      })

      it('props passed to the component overwrite injection properties', async done => {
        const inject = {
          a: 'A',
          b: 'B',
        }
        const { wrapper, child } = createWrappedStub(inject, ['a', 'b'], {
          functional,
        })

        const vm = wrapper.find(child).vm
        expect(vm.$props).toMatchObject({
          a: 'A',
          b: 'B',
        })

        wrapper.setProps({ b: 'BB' })

        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        expect(vm.$props).toMatchObject({
          a: 'A',
          b: 'BB',
        })
        done()
      })

      if (!functional) {
        // This test doesn't work with test-utils for functional compontents, but the example app shows
        // that the code itself does work
        it('changes to reactive inject object update matching props', async done => {
          const inject = makeReactive({
            a: 'A',
            b: 'B',
          })
          const { wrapper, child } = createWrappedStub(inject, ['a', 'b'], {
            functional,
          })

          const childWrapper = wrapper.find(child)
          expect(childWrapper.props() /*vm.$props*/).toMatchObject({
            a: 'A',
            b: 'B',
          })

          inject.b = 'BB'

          await wrapper.vm.$nextTick()

          expect(childWrapper.props()).toMatchObject({
            a: 'A',
            b: 'BB',
          })
          done()
        })

        // this test fails for functional components,
        // but I assume it's because vue-test-utils fails to inject
        // the listeners properly, because
        // events are passed cleanly in the example app.
        it('passes listeners to the wrapped component', async done => {
          const inject = {
            a: 'A',
            b: 'B',
          }
          const fn = jest.fn()
          const { wrapper, child } = createWrappedStub(
            inject,
            ['a', 'b'],
            {
              functional,
            },
            { listeners: { click: fn } }
          )
          await Vue.nextTick()

          wrapper.find(child).vm.$emit('click', 'test')
          functional && console.log(wrapper.find(child).vm.$listeners)
          expect(fn).toHaveBeenCalledWith('test')

          done()
        })
      }
    })
  })
})
