import { describe, beforeEach, test, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useCartStore } from '@/stores/cart'

describe('Cart - discount rules', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('Scenario 1: Sub total below €50 - no bulk discount', () => {
    const cart = useCartStore()

    cart.addItem({ name: 'Logitech mouse', price: 20, category: 'electronics' })
    cart.addItem({ name: 'Book', price: 15, category: 'books' })

    expect(cart.subtotal).toBeCloseTo(35)
    expect(cart.discountsApplied).toBeCloseTo(2)
    expect(cart.totalAfterDiscounts).toBeCloseTo(33)
    expect(cart.vatAmount).toBeCloseTo(6.6)
    expect(cart.totalPayable).toBeCloseTo(39.6)
  })

  test('Scenario 2: Sub total over €50 - apply bulk discount', () => {
    const cart = useCartStore()

    cart.addItem({ name: 'Wireless Mouse', price: 40, category: 'electronics' })
    cart.addItem({ name: 'Coffee Beans', price: 20, category: 'groceries' })

    expect(cart.subtotal).toBeCloseTo(60)
    expect(cart.discountsApplied).toBeCloseTo(14)
    expect(cart.totalAfterDiscounts).toBeCloseTo(46)
    expect(cart.vatAmount).toBeCloseTo(9.2)
    expect(cart.totalPayable).toBeCloseTo(55.2)
  })
})
