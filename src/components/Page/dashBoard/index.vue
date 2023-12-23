<template>
  <div>
    <!-- 橫幅 -->
    <div class="banner">
      <img src="/banner.png" alt="Banner Image" class="banner-image">
    </div>

    <div class="dashboard-container">
      <!-- 商品區 -->
      <h2 class="dashboard-title">熱門代購商品</h2>
      <div class="product-container">
        <div v-for="product in products" :key="product.id" class="product-box">
          <div class="product-box-top">
            <img :src="product.image" :alt="product.name" class="product-image">
            <div class="productBtn">
              <i class="fa fa-bookmark-o"></i>
            </div>
          </div>
          <div class="product-box-bottom">
            <h3 class="product-name">{{ product.name }}</h3>
            <div class="texts">
              <span class="product-price">{{ product.price }}</span>
            </div>
            <button class="btn">購買</button>
            <div class="BoxBar"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },

  data() {
    return {
      // 測試資料
      products: [
        {
          id: 2,
          name: '商品2',
          description: '這是商品2的描述',
          price: '$30.00',
          image: 'https://source.unsplash.com/202x202/?product' // 假的圖片 URL
        },
        {
          id: 2,
          name: '商品2',
          description: '這是商品2的描述',
          price: '$30.00',
          image: 'https://source.unsplash.com/202x202/?product' // 假的圖片 URL
        },
        {
          id: 2,
          name: '商品2',
          description: '這是商品2的描述',
          price: '$30.00',
          image: 'https://source.unsplash.com/202x202/?product' // 假的圖片 URL
        },
        {
          id: 2,
          name: '商品2',
          description: '這是商品2的描述',
          price: '$30.00',
          image: 'https://source.unsplash.com/202x202/?product' // 假的圖片 URL
        },
        {
          id: 2,
          name: '商品2',
          description: '這是商品2的描述',
          price: '$30.00',
          image: 'https://source.unsplash.com/202x202/?product' // 假的圖片 URL
        },
        {
          id: 2,
          name: '商品2',
          description: '這是商品2的描述',
          price: '$30.00',
          image: 'https://source.unsplash.com/202x202/?product' // 假的圖片 URL
        },
        {
          id: 2,
          name: '商品2',
          description: '這是商品2的描述',
          price: '$30.00',
          image: 'https://source.unsplash.com/202x202/?product' // 假的圖片 URL
        },
      ]
    };
  }

}
</script>

<style lang="scss" scoped>

//// 測試用
//* {
//  border: solid 1px black;
//}
//
//.product-box * {
//  border: solid 1px;
//}



// 橫幅樣式
.banner {
  height: 48rem;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 10%;

  .banner-image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
  }
}

.dashboard-container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.dashboard-title {
  font-size: 24px;
  margin: 20px 0;
}

.product-item {
  width: calc(33.33% - 20px); // 根據一行中商品數量調整寬度
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  text-align: center; // 將文字內容置中
  box-sizing: border-box;
}

.product-name {
  font-size: 16px;
  margin-top: 10px;
  letter-spacing: 1px;
  padding-left: 5px;
}

.product-description {
  font-size: 14px;
  margin-top: 5px;
}

.product-price {
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  color: #ff6600;
  letter-spacing: 1px;
  padding-left: 5px;
}

// 商品區
.product-container {
  //border: solid 1px;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-wrap: wrap;  /* 允許換行 */
  justify-content: space-around;
  gap: 10px;
}

.product-box {
  border-radius: 5px;
  cursor: pointer;
  margin: 30px 0; // 調整 margin，不再使用左右 margin
  max-width: 16rem; // 根據一行中商品數量調整寬度
  box-sizing: border-box; // 防止寬度超出
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden; // 防止子元素超出邊界
  display: inline-block;
  flex-direction: column;
}

.productBtn{
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
  transition: bottom 0.3s;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
  color: #EB5E00;
  left: 1rem;
}

i {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 22px;
}

.product-box:hover .productBtn {
  animation-name:btnMove;
  animation-duration:1s;
  animation-fill-mode: forwards; /* 確保動畫完成後元素保持在結束狀態 */
}

@keyframes btnMove {
  0% {
    top: 0;
    opacity: 0.1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    top: -5rem;
    opacity: 1;
  }
}

.product-box:hover .product-image {
  transform: scale(1.13);
}

.product-box-top {
  height: 16rem;
  overflow: hidden;
}

.product-box-top .product-image {
  width: 100%;
  height: 100%;
  object-fit: cover; // 確保圖片填滿並不失真
  border-radius: 5px 5px 0 0;
}


.product-box-top .productBtn:hover {
  background-color: #EB5E00;
  color: white;
}

.product-box-bottom {
  height: 12rem;
  padding: 15px;
  position: relative;
}
.product-box-bottom .product-name {
  font-size: 25px;
  margin-top: 0;
}

.product-box-bottom .texts {
  font-size: 15px;
  letter-spacing: 1px;
}

.product-box-bottom .product-price {
  margin-bottom: 14px;
}

.product-box-bottom .BoxBar {
  height: 5px;
  width: 100%;
  position: relative;
  background-color: #EB5E00;
  border-radius: 0 5px;
  top: 25%;
}

.btn {
  background-color: #EB5E00;
  background-image: linear-gradient(90deg, var(--blue) 0%, var(--lightblue) 74%);
  border-radius: 20px;
  border: 1px solid #EB5E00;
  color: white;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  padding: 0.9rem 4rem;
  text-transform: uppercase;
  position: relative;
  transition: transform 80ms ease-in;
  top: 15%;
  left: 15%;
}

.form > .btn {
  margin-top: 1.5rem;
}

.btn:active {
  transform: scale(0.95);
}

.btn:focus {
  outline: none;
}

@media screen and (max-width: 600px) {
  .banner {
    height: 20em;
    width: 100%;
  }

  .product-container {
    width: 100%;
    margin: 0;
  }

  .product-box {
    width: 100%;
  }
}

</style>