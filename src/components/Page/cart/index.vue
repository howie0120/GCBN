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
        <div v-for="(item, index) in itemList" :key="item.cartItemId" class="item_header item_body">
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
            <button @click="removeItem(item.cartItemId, index)">刪除</button>
          </div>
        </div>
        <div class="checkout">
          <div class="total-price">
            總計: ${{ totalPrice }}
          </div>
          <button class="buy-btn">購買</button>
        </div>
      </div>
    </div>
  </template>

  <script>
  import axios from 'axios';

  export default {
    name: 'ShoppingCart',
    data() {
      return {
        itemList: []
      }
    },
    computed: {
      userID() {
        return this.$store.getters.id;
      },

      totalPrice() {
        return this.itemList.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);
      },
    },
    mounted() {
      this.fetchCartItems();
    },
    methods: {
      fetchCartItems() {
        console.log('Fetching items for user ID:', this.userID);
        axios.get(`http://localhost:8000/api/cartItems?userID=${this.userID}`)
            .then(response => {
              this.itemList = response.data.map(item => ({
                cartItemId: item.CartItemID,
                productId: item.ProductID,
                quantity: item.Quantity,
                name: item.Name,
                price: item.Price,
                imgUrl: item.ImageUrl,
              }));
            })
            .catch(error => {
              console.error('Error fetching cart items:', error);
            });
      },
      updateQuantity(cartItemId, newQuantity) {
        axios.post(`http://localhost:8000/api/updateCartItemQuantity`, {
          cartItemId: cartItemId,
          quantity: newQuantity
        }).then(response => {
          console.log('Quantity updated', response);
        }).catch(error => {
          console.error('Error updating quantity:', error);
        });
      },

      incrementQuantity(index) {
        const item = this.itemList[index];
        item.quantity += 1;
        this.updateQuantity(item.cartItemId, item.quantity);
      },

      decrementQuantity(index) {
        const item = this.itemList[index];
        if (item.quantity > 1) {
          item.quantity -= 1;
          this.updateQuantity(item.cartItemId, item.quantity);
        }
      },

      removeItem(cartItemId, index) {
        axios.post(`http://localhost:8000/api/removeCartItem`, {
          cartItemId: cartItemId
        }) .then(response => {
          console.log("刪除成功", response);
          this.itemList.splice(index, 1); // 從本地購物車列表中移除
        }) .catch(error => {
          console.error('Error removing item:', error);
        });
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
  .checkout {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #f3f3f3;
    border-radius: 3px;
    width: 1000px;
    margin: 20px auto;
  }

  .total-price {
    font-size: 20px;
    font-weight: bold;
  }

  .buy-btn {
    padding: 10px 20px;
    background-color: #304156;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }

  .buy-btn:hover {
    background-color: #243242;
  }
  </style>