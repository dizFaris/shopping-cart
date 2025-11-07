<script setup>
import CartItem from './CartItem.vue'
import { useCartStore } from '@/stores/cart'
const cart = useCartStore()
</script>

<template>
  <div class="cart-wrapper">
    <div class="title">Your cart</div>

    <div class="items" v-if="cart.items.length > 0">
      <CartItem v-for="(item, index) in cart.items" :key="index" :item="item" />
    </div>
    <div class="empty" v-else>Your cart is empty</div>

    <div class="footer">
      <div class="line">
        <span class="label">Subtotal:</span>
        <span class="amount">€ {{ cart.subtotal.toFixed(2) }}</span>
      </div>
      <div class="line">
        <span class="label">Discounts applied:</span>
        <span class="amount">-€ {{ cart.discountsApplied.toFixed(2) }}</span>
      </div>
      <div class="line">
        <span class="label">Total after discounts:</span>
        <span class="amount">€ {{ cart.totalAfterDiscounts.toFixed(2) }}</span>
      </div>
      <div class="line">
        <span class="label">VAT amount:</span>
        <span class="amount">€ {{ cart.vatAmount.toFixed(2) }}</span>
      </div>
      <div class="line total">
        <span class="label">Total price:</span>
        <span class="amount">€ {{ cart.totalPayable.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart-wrapper {
  width: 30%;
  height: 100%;
  background-color: $color-secondary;
  display: flex;
  flex-direction: column;

  .title {
    font-weight: bold;
    font-size: 16px;
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }

  .items {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .empty {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: #888;
  }

  .footer {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: flex-end;
    padding: 15px 10px;
    border-top: 1px solid #ccc;

    .line {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .label {
        font-weight: normal;
      }

      .amount {
        font-weight: bold;
      }
    }

    .total {
      font-size: 22px;
      color: $color-accent-primary;
    }
  }

  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    z-index: 10;
  }
}
</style>
