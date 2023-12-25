<template>
  <div class="cart-container">
    <h1>購物車</h1>
    <div v-if="cartItems.length > 0">
      <ul>
        <li v-for="item in cartItems" :key="item.id">
          {{ item.name }} - 數量: {{ item.quantity }} - 價格: {{ item.price }}
          <button @click="removeFromCart(item)">移除</button>
        </li>
      </ul>
      <p>總計: {{ totalPrice }}</p>
      <button @click="checkout">結帳</button>
    </div>
    <p v-else>您的購物車是空的。</p>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data() {
    return {
      // 使用假數據
      cartItems: [
        { id: 1, name: '商品1', quantity: 2, price: 100 },
        { id: 2, name: '商品2', quantity: 1, price: 200 }
      ]
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
      );
    },
  },
  methods: {
    removeFromCart(item) {
      // 移除購物車中的商品
      this.cartItems = this.cartItems.filter(i => i.id !== item.id);
    },
    checkout() {
      // 結帳功能的實現
      console.log('結帳');
      // 重定向到結帳頁面或處理結帳邏輯
    },
  },
};
</script>

<!--<script>-->
<!--export default {-->
<!--  name: 'Cart',-->
<!--  computed: {-->
<!--    cartItems() {-->
<!--      // 從 Vuex store 獲取購物車內容-->
<!--      return this.$store.state.cart;-->
<!--    },-->
<!--    totalPrice() {-->
<!--      return this.cartItems.reduce(-->
<!--          (total, item) => total + item.price * item.quantity,-->
<!--          0-->
<!--      );-->
<!--    },-->
<!--  },-->
<!--  methods: {-->
<!--    removeFromCart(item) {-->
<!--      // 移除購物車中的商品-->
<!--      this.$store.commit('REMOVE_FROM_CART', item);-->
<!--    },-->
<!--    checkout() {-->
<!--      // 結帳功能的實現-->
<!--      console.log('結帳');-->
<!--      // 重定向到結帳頁面或處理結帳邏輯-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<style scoped>
.cart-container {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  max-width: 600px;
  margin: 20px auto;
}

.cart-container h1 {
  text-align: center;
}

.cart-container ul {
  list-style: none;
  padding: 0;
}

.cart-container li {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-container button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.cart-container button:hover {
  background-color: #0056b3;
}
</style>