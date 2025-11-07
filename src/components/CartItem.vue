<script setup>
import { useCartStore } from '@/stores/cart'
import { formatAT } from '@/utils/currency'
const cart = useCartStore()

defineProps({
  item: Object,
})
</script>

<template>
  <div class="cart-item">
    <div class="title">
      <div class="name">{{ item.name }}</div>
      <div class="discount" v-if="item.discount">{{ item.discount * 100 }}% off</div>
    </div>

    <div class="footer">
      <div class="quantity">
        <button class="counter-button" @click="cart.decrementItemCount(item.name)">−</button>
        <div class="count">{{ item.count }}</div>
        <button class="counter-button" @click="cart.incrementItemCount(item.name)">+</button>
        <span class="divider">|</span>
        <div class="remove-button" @click="cart.removeItem(item.name)">Remove item</div>
      </div>

      <div class="price">{{ formatAT(item.price) }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart-item {
  background-color: $color-accent-primary;
  color: $color-text-secondary;
  padding: 10px 5px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  .title {
    margin-bottom: 3px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .name {
      font-weight: 500;
    }
    .discount {
      background-color: rgb(184, 0, 0);
      padding: 3px 6px;
      border-radius: 2px;
      font-weight: 500;
      font-size: 15px;
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .quantity {
      display: flex;
      align-items: center;
      gap: 5px;
      flex-wrap: wrap;
      .counter-button {
        width: 20px;
        height: 20px;
        background-color: $color-accent-secondary;
        border: none;
        border-radius: 2px;
        cursor: pointer;
      }

      .count {
        width: 18px;
        text-align: center;
      }

      .divider {
        color: #aaa;
      }

      .remove-button {
        font-size: 12px;
        color: $color-accent-secondary;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }

    .price {
      font-weight: 500;
      margin-top: 5px;
    }
  }
}
</style>
