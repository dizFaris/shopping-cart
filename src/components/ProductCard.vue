<script setup>
import { useCartStore } from '@/stores/cart'
import { formatAT } from '@/utils/currency'
const cart = useCartStore()

defineProps({
  product: Object,
})
</script>

<template>
  <div class="product-wrapper">
    <div class="name">{{ product.name }}</div>
    <div class="price">{{ formatAT(product.price) }}</div>
    <div class="category">{{ product.category }}</div>
    <div class="button-wrapper">
      <button @click="cart.addItem(product)">Add to cart</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-wrapper {
  height: 50px;
  width: 100%;
  border-radius: 5px;
  background-color: $color-secondary;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  gap: 10px;

  .name,
  .price,
  .category {
    flex: 2;
    text-transform: capitalize;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .button-wrapper {
    flex: 1;
    button {
      width: 100px;
      height: 30px;
      border: none;
      border-radius: 5px;
      background-color: $color-accent-primary;
      color: $color-text-secondary;
      cursor: pointer;

      &:hover {
        filter: brightness(110%);
      }

      &:active {
        transform: scale(0.95);
        filter: brightness(95%);
      }
    }
  }
}
</style>
