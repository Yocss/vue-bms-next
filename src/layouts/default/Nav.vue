<template>
  <div class="layouts-default-nav flex-between-center">
    <ul class="flex-align-center">
      <li>
        <div class="item flex-center active">
          <span>控制台</span>
        </div>
      </li>
      <li>
        <div class="item flex-center">
          <span>文章管理</span>
        </div>
      </li>
      <li>
        <div class="item flex-center">
          <span>广告管理</span>
        </div>
      </li>
      <li>关闭全部</li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from 'ant-design-vue'

export default defineComponent({
  name: 'LayoutsDefaultNav',
  components: {
    [Button.name]: Button
  }
})
</script>
<style lang="stylus">
@import '~@/assets/css/variables.styl'
.layouts-default-nav
  width 100%
  height 42px
  ul
    height 100%
    li
      height 100%
      margin-left 8px
      padding-top @margin-left
      padding-bottom @padding-top
      .item
        width auto
        height 100%
        padding 0 $font
        // border 1px solid #ccc
        border-radius 8px
        background-color #fff
        &.active
          color #fff
          background-color $success
          font-weight bold
</style>
