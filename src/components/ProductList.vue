<script setup>
import ProductCard from './ProductCard.vue'

const products = [
  { name: 'HP EliteBook 12', price: 1200, category: 'electronics' },
  { name: 'Coffee Beans', price: 20, category: 'groceries' },
  { name: 'Wireless Mouse', price: 40, category: 'electronics' },
]
</script>

<template>
  <div class="product-list">
    <div class="headers">
      <div class="name">Name</div>
      <div class="price">Price</div>
      <div class="category">Category</div>
      <div class="empty"></div>
    </div>

    <div class="wrapper">
      <ProductCard v-for="(product, index) in products" :key="index" :product="product" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-list {
  width: 100%;
  padding: 10px;

  .headers {
    display: flex;
    margin-bottom: 5px;
    padding: 0 5px;
    gap: 10px;

    .name,
    .price,
    .category {
      flex: 2;
    }

    .empty {
      flex: 1;
      min-width: 100px;
    }
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
}
</style>
