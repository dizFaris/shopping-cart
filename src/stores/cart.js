import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const categoryDiscounts = {
  electronics: 0.1,
}
const bulkDiscountRules = [{ threshold: 50, discount: 10, type: 'flat', active: true }]
const VAT = 0.2

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => {
      return sum + item.count
    }, 0)
  })

  const addItem = (newItem) => {
    const existing = items.value.find((i) => i.name === newItem.name)
    if (existing) {
      existing.count += newItem.count || 1
    } else {
      const discount = categoryDiscounts[newItem.category] ?? 0
      items.value.push({ ...newItem, count: 1, discount })
    }
  }

  const removeItem = (itemName) => {
    items.value = items.value.filter((i) => i.name !== itemName)
  }

  const incrementItemCount = (itemName) => {
    const item = items.value.find((i) => i.name === itemName)
    if (item) item.count++
  }

  const decrementItemCount = (itemName) => {
    const item = items.value.find((i) => i.name === itemName)
    if (item) {
      item.count--
      if (item.count <= 0) removeItem(itemName)
    }
  }

  const subtotal = computed(() => {
    return items.value.reduce((sum, item) => {
      return sum + item.price * item.count
    }, 0)
  })

  const calculateItemDiscounts = () => {
    return items.value.reduce((sum, item) => {
      const discountPerUnit = item.price * item.discount
      return sum + discountPerUnit * item.count
    }, 0)
  }

  function calculateBulkDiscount(subtotalAfterItemDiscounts) {
    return bulkDiscountRules
      .filter((rule) => rule.active && subtotalAfterItemDiscounts > rule.threshold)
      .reduce((sum, rule) => {
        if (rule.type === 'flat') {
          return sum + rule.discount
        } else if (rule.type === 'percent') {
          return sum + subtotalAfterItemDiscounts * rule.discount
        }
        return sum
      }, 0)
  }

  const discountsApplied = computed(() => {
    const itemDiscounts = calculateItemDiscounts()
    const subtotalAfterItemDiscounts = subtotal.value - itemDiscounts
    const bulk = calculateBulkDiscount(subtotalAfterItemDiscounts)
    return itemDiscounts + bulk
  })

  const totalAfterDiscounts = computed(() => subtotal.value - discountsApplied.value)

  const vatAmount = computed(() => totalAfterDiscounts.value * VAT)

  const totalPayable = computed(() => totalAfterDiscounts.value + vatAmount.value)

  return {
    items,
    totalItems,
    addItem,
    removeItem,
    incrementItemCount,
    decrementItemCount,
    subtotal,
    discountsApplied,
    totalAfterDiscounts,
    vatAmount,
    totalPayable,
  }
})
