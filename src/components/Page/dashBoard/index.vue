<template>
  <div class="dashboard-container">

    <!--  橫幅  -->
    <div class="banner">
      <img src="/banner.png" alt="Banner Image" class="banner-image">
    </div>

    <!--  商品區  -->
    <h2 class="dashboard-title">熱門代購商品</h2>
    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="product-item">
        <img :src="product.image" :alt="product.name" class="product-image">
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-description">{{ product.description }}</p>
        <span class="product-price">{{ product.price }}</span>
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
      products: [
        {
          id: 1,
          name: '商品1',
          description: '這是商品1的描述',
          price: '$50.00',
          image: 'https://placekitten.com/200/200' // 假的圖片 URL
        },
        {
          id: 2,
          name: '商品2',
          description: '這是商品2的描述',
          price: '$30.00',
          image: 'https://placekitten.com/201/201' // 假的圖片 URL
        },
        // ... 可以繼續添加更多商品
      ]
    };
  }

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .banner {
      height: 35em;
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

  .product-list {
    display: flex;
    flex-wrap: wrap;
  }

  .product-item {
    width: 200px;
    margin: 10px;
    padding: 15px;
    border: 1px solid #ddd;
  }

  .product-image {
    width: 100%;
    height: auto;
  }

  .product-name {
    font-size: 16px;
    margin-top: 10px;
  }

  .product-description {
    font-size: 14px;
    margin-top: 5px;
  }

  .product-price {
    font-size: 18px;
    font-weight: bold;
    margin-top: 10px;
    color: #ff6600; /* 橘色價格 */
  }
}
</style>
