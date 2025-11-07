<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import IconCart from './components/icons/IconCart.vue'
import ProductList from './components/ProductList.vue'
import Cart from './components/Cart.vue'

const isCartOpen = ref(false)
const isMobile = ref(window.innerWidth <= 768)

function toggleCart() {
  isCartOpen.value = !isCartOpen.value
}

function handleResize() {
  isMobile.value = window.innerWidth <= 768
  if (!isMobile.value) isCartOpen.value = false
}

onMounted(() => window.addEventListener('resize', handleResize))
onUnmounted(() => window.removeEventListener('resize', handleResize))
</script>

<template>
  <header>
    <div class="wrapper">
      <p>Shopping cart demo</p>
      <button @click="toggleCart">
        <IconCart />
      </button>
    </div>
  </header>
  <div class="content-wrapper">
    <ProductList />
    <Cart v-show="isCartOpen || !isMobile" />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  height: 50px;
  background-color: $color-accent-primary;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  p {
    font-size: 20px;
    line-height: 1;
    color: $color-text-secondary;
  }

  button {
    height: 40px;
    width: 40px;
    border-radius: 5px;
    border: none;
    display: none;
    justify-content: center;
    align-items: center;
    background-color: $color-accent-secondary;
    cursor: pointer;

    &:hover {
      filter: brightness(110%);
    }

    &:active {
      transform: scale(0.95);
      filter: brightness(95%);
    }

    @media (max-width: 768px) {
      display: flex;
    }
  }
}
.content-wrapper {
  display: flex;
  height: calc(100vh - 50px);

  @media (max-width: 768px) {
    position: relative;
  }
}
</style>
