import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CartComponent from '../CartItems.vue'

describe('CartComponent', () => {
  it('renders properly', () => {
    const wrapper = mount(CartComponent, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Total')
  })
})
