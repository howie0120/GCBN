<template>
  <div class="dashboard-container">

    <!--  橫幅  -->
    <div class="banner">
      <img src="/banner.png" alt="Banner Image" class="banner-image">
    </div>

    <!--  商品區  -->
    <h2 class="dashboard-title">熱門代購商品</h2>
    <div class="product-container">
      <div v-for="product in products" :key="product.id" class="product-box">
        <div class="product-box-top">
          <div class="product-item">
            <img :src="product.image" :alt="product.image" class="product-image">
            <div class="productBtn">
              <i class="fa fa-bookmark-o" style="font-size:24px"></i>
            </div>
          </div>
        </div>
        <div class="product-box-bottom">
          <h3 class="product-name">{{ product.name }}</h3>
          <span class="product-price">{{ product.price }}</span>
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
.dashboard {
  &-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    // 橫幅樣式
    .banner {
      height: 40em;
      width: 80em;
      display: flex;
      align-items: center;
      justify-content: center;
      .banner-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }


  .dashboard-title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  // 商品區
  .product-container {
    flex-wrap: wrap;
    justify-content: space-between;
    position: relative;
  }

  .product-box {
    float: left;
    border-radius: 5px;
    cursor: pointer;
    margin: 30px 0; // 調整 margin，不再使用左右 margin
    flex: 1;
    width: calc(33.33% - 20px); // 根據一行中商品數量調整寬度
    //background-color: #fff;
    box-sizing: border-box; // 防止寬度超出
    display: inline-block;
  }
  .product-box:hover {
    .productBtn {
      bottom: 10px;
    }
  }

  .top {
    height: 160px;
    overflow: hidden;
    .product-image {
      width: 100%;
      height: auto;
      position: absolute;
      background-size: cover;
      left: 0;
      top: 0;
      border-radius: 5px 5px 0 0;
    }
    .productBtn{
      width: 42px;
      height: 42px;
      border-radius: 50%;
      position: absolute;
      left: 15px;
      bottom: -50px;
      background-color: #fff;
      cursor: pointer;
      transition: bottom 0.3s;
      box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
      color: #EB5E00;
    }
    i {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 22px;
      &:hover{
        background-color: #EB5E00;
        color: white;
      }
    }
  }


  .product-list {

    //gap: 20px;
    overflow-x: auto; // 如果商品太多，提供水平滾動條
  }

  .product-item {
    width: calc(33.33% - 20px); // 根據一行中商品數量調整寬度
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #ddd;
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
}
</style>