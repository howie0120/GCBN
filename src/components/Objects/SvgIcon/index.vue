<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :href="iconName"/>
  </svg>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  name: 'SvgIcon',
  props: {
    // 要顯示的svg圖標的類別名稱
    iconClass: {
      type: String,
      required: true
    },
    // 附加的類別名稱
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    // 檢查是否是外部圖標
    isExternal() {
      return isExternal(this.iconClass)
    },
    // svg圖標的名稱
    iconName() {
      return `#icon-${this.iconClass}`
    },
    // 最終的svg圖標類別
    svgClass() {
      return this.className ? 'svg-icon ' + this.className : 'svg-icon';

    },
    //計算外部圖標得樣式
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
    }
  }
}
</script>

<style scoped>
/* svg內部圖標的樣式 */
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

/* svg外部圖標的樣式 */
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>
