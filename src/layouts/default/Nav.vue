<template>
  <div class="layouts-default-nav flex-between-center">
    <ul class="flex-align-center">
      <li
        v-for="item in navs"
        :key="item.url"
      >
        <div class="item flex-center active">
          <span>{{ item.title }}</span>
        </div>
      </li>
      <li>关闭全部</li>
    </ul>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { Button } from 'ant-design-vue'
import { useStore } from '@/store'

export default defineComponent({
  name: 'LayoutsDefaultNav',
  components: {
    [Button.name]: Button
  },
  setup () {
    const store = useStore()
    const navs = computed(() => {
      return store.state.navs
    })
    return { navs }
  }
})
</script>
<style lang="stylus">
@import '~@/assets/css/variables.styl'
.layouts-default-nav
  width 100%
  height 42px
  user-select none
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
        cursor pointer
        &.active
          color #fff
          background-color $success
          font-weight bold
          cursor default
</style>
