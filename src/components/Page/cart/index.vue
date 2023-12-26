<template>
  <div id="app">
    <div class="container">
      <div class="item_header">
        <div class="item_detail">商品</div>
        <div class="price">單價</div>
        <div class="count">數量</div>
        <div class="amount">總計</div>
        <div class="operate">操作</div>
      </div>
      <div v-for="(item, index) in itemList" :key="item.id" class="item_header item_body">
        <div class="item_detail">
          <img :src="item.imgUrl" alt="">
          <div class="name">{{ item.name }}</div>
        </div>
        <div class="price"><span>$</span>{{ item.price }}</div>
        <div class="count">
          <button @click="decrementQuantity(index)">-</button>
          {{ item.quantity }}
          <button @click="incrementQuantity(index)">+</button>
        </div>
        <div class="amount">{{ item.quantity * item.price }}</div>
        <div class="operate">
          <button @click="removeItem(index)">刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShoppingCart',
  data() {
    return {
      itemList: [
        { id: 1, name: '產品A', price: 100, quantity: 1, imgUrl: 'example-image-url-a.jpg' },
        { id: 2, name: '產品B', price: 200, quantity: 2, imgUrl: 'example-image-url-b.jpg' },
        { id: 3, name: '產品C', price: 300, quantity: 3, imgUrl: 'example-image-url-c.jpg' }
      ]
    }
  },
  methods: {
    incrementQuantity(index) {
      this.itemList[index].quantity += 1;
    },
    decrementQuantity(index) {
      if (this.itemList[index].quantity > 1) {
        this.itemList[index].quantity -= 1;
      }
    },
    removeItem(index) {
      this.itemList.splice(index, 1);
    }
  }
}
</script>

<style scoped>
.item_header {
  display: flex;
  width: 1000px;
  margin: 0 auto;
  height: 30px;
  background-color: #f3f3f3;
  border-radius: 3px;
  padding-left: 10px;
  border-bottom: 1px solid #e1e1e1;
}
.item_header div {
  width: 200px;
  color: #555;
  line-height: 30px;
}
.item_header .item_detail {
  width: 50%;
}
.item_body {
  margin-top: 20px;
  height: 100px;
  align-items: center;
  background-color: #fff;
}
.item_detail img {
  width: 80px;
  height: 80px;
  border-radius: 3px;
  float: left;
}
.item_detail .name {
  margin-left: 100px;
  margin-top: 20px;
}
</style>