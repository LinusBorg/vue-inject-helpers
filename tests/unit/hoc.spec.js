import { createWrappedStub, makeReactive } from './resources/hoc-utils'

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

      it('changes to reactive inject object update matching props', async done => {
        const inject = makeReactive({
          a: 'A',
          b: 'B',
        })
        const { wrapper, child } = createWrappedStub(inject, ['a', 'b'], {
          functional,
        })

        const vm = wrapper.find(child).vm
        expect(vm.$props).toMatchObject({
          a: 'A',
          b: 'B',
        })

        inject.b = 'BB'

        await wrapper.vm.$nextTick()

        expect(vm.$props).toMatchObject({
          a: 'A',
          b: 'BB',
        })
        done()
      })
    })
  })
})
