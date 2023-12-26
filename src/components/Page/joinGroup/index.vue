<template>
  <div class="joinGroup-container">
    <div class="product-container">
      <div v-for="groupBuy in groupBuys" :key="groupBuy.GroupBuyID" class="product-box">
        <div class="product-box-top">
          <img :src="getProductImage(groupBuy.ProductID)" alt="Product Image" class="product-image">
        </div>
        <div class="product-box-bottom">
          <h3 class="product-name">{{ getProductTitle(groupBuy.ProductID) }}</h3>
          <div class="progressbar">
            <div class="valuebar" :style="{ width: calculateProgress(groupBuy) + '%' }"></div>
          </div>
          <div>已募資：{{ groupBuy.CurrentQuantity }} / {{ groupBuy.TargetQuantity }}人</div>
          <div>剩餘時間：{{ remainingDays(groupBuy.EndDate) }} 天</div>
          <button class="btn">參與團購</button>
          <div class="BoxBar"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'joinGroup',
  data() {
    return {
      // 其他 data 屬性...
      groupBuys: [
        {
          GroupBuyID: 1,
          ProductID: 101,
          InitiatorUserID: 1001,
          TargetQuantity: 100,
          CurrentQuantity: 35,
          StartDate: '2022-09-01',
          EndDate: '2022-09-30',
          Status: '進行中',
          Participations: [{ UserID: 1001, Quantity: 5 }, { UserID: 1002, Quantity: 10 }, { UserID: 1003, Quantity: 20 }]
        },
        {
          GroupBuyID: 2,
          ProductID: 102,
          InitiatorUserID: 1002,
          TargetQuantity: 50,
          CurrentQuantity: 50,
          StartDate: '2022-08-15',
          EndDate: '2022-09-15',
          Status: '已完成',
          Participations: [{ UserID: 1004, Quantity: 25 }, { UserID: 1005, Quantity: 25 }]
        },
        {
          GroupBuyID: 3,
          ProductID: 103,
          InitiatorUserID: 1003,
          TargetQuantity: 75,
          CurrentQuantity: 30,
          StartDate: '2022-09-05',
          EndDate: '2022-10-05',
          Status: '進行中',
          Participations: [{ UserID: 1006, Quantity: 10 }, { UserID: 1007, Quantity: 20 }]
        }
      ]
    };
  },
  async created() {
    await this.fetchGroupBuys();
  },
  methods: {
    async fetchGroupBuys() {
      try {
        const response = await axios.get('http://localhost:8000/api/groupbuys');
        this.groupBuys = response.data;
      } catch (error) {
        console.error('Error fetching group buys:', error);
      }
    },
    calculateProgress(groupBuy) {
      return (groupBuy.CurrentQuantity / groupBuy.TargetQuantity) * 100;
    },
    getProductImage(productId) {
      // 實現根據 productId 獲取圖片的邏輯
      return 'product_image_url'; // 暫時返回一個假的 URL
    },
    getProductTitle(productId) {
      // 實現根據 productId 獲取標題的邏輯
      return '產品標題'; // 暫時返回一個假的標題
    },
    remainingDays(endDate) {
      return moment(endDate).diff(moment(), 'days');
    }
  }
}
</script>

<style lang="scss" scoped>


.joinGroup-container {
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