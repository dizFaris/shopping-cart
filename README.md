# 🛒 Shopping Cart (Vue 3 + Pinia + Vitest)

This project implements a simple shopping cart system with category-based and bulk discount rules. It demonstrates clean state management, composable logic, and testable business rules.

## 🚀 How to Run the Project

1. Install dependencies

```bash
npm install
```

2. Run the development server

```bash
npm run dev
```

3. Run unit tests

```bash
npm run test:unit
```

## 🧩 Project Structure

```
src/
 ├─ components/
 │   └─ Cart.vue            # Cart container, displays all cart items and price breakdown
 │   └─ CartItem.vue        # Single cart item with price and quantity controls
 │   └─ ProductCard.vue     # Displays product info with an add-to-cart button
 │   └─ ProductList.vue     # List of ProductCard components
 ├─ stores/
 │   └─ cart.js             # Pinia store - core logic (discounts, totals, VAT)
 ├─ App.vue
 └─ main.js
```

The Pinia store (`cart.js`) is the single source of truth for all cart-related data:

- Keeps track of added items and quantities in cart
- Calculates price breakdown while applying all rules in one place

This structure keeps the UI components simple — they just read computed values and trigger store actions (`addItem`, `incrementItemCount`, etc.).

## 🧮 Discounts and Extensibility

The store currently supports:

- Category discounts (e.g., electronics → 10%)
- Bulk discounts (flat amount or percentage)

Adding a new discount rule is straightforward:

Category-based → update the `categoryDiscounts` object

```js
const categoryDiscounts = {
  electronics: 0.1,
  groceries: 0.3, // Example: new category discount
}
```

Bulk-based → add another rule to the `bulkDiscountRules` array

```js
const bulkDiscountRules = [
  { threshold: 50, discount: 10, type: 'flat', active: false },
  { threshold: 100, discount: 0.1, type: 'percent', active: false }, // Can enable/disable independently
]
```

The `active` property allows multiple bulk discounts to exist in the rules array but only apply the ones that are currently active. This makes it easy to toggle rules on/off or combine multiple discounts when needed, without changing the core logic.

## ⚙️ Design Considerations

- Reactive calculations  
  All totals (subtotal, VAT, discounts, etc.) are computed properties. They update automatically whenever the cart changes.

- Simple rule chaining  
  Item-level discounts are applied first, then the bulk discount and VAT.

- Pure functions for calculations  
  Each discount or total computation is a pure function, making it easy to test and maintain.

## 🧠 Edge Cases Considered

- Empty cart:  
   All computed values (subtotal, VAT, total payable) correctly return 0. "Your cart is empty" text is displayed.

- Removing items:  
   Items with a count of 0 are automatically removed from the cart.

- Floating-point precision:  
   Prices and discounts are rounded to two decimal places.

## 🧪 Testing

Unit tests are written using Vitest and Pinia's testing utilities. Two test scenarios are provided (/tests/cart.spec.js):

- Subtotal below €50 → Only category discount applies
- Subtotal over €50 → Category + bulk discount apply

These tests verify subtotal, applied discounts, total after applied discounts, VAT and total payable — ensuring business logic correctness.
