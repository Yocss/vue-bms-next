<template>
  <div class="layouts-default">
    <div class="layouts-default-side">
      <default-menu />
    </div>
    <div class="layouts-default-main">
      <default-head />
      <default-nav />
      <router-view />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import DefaultHead from './Head.vue'
import DefaultMenu from './Menu.vue'
import DefaultNav from './Nav.vue'
export default defineComponent({
  name: 'LayoutsDefault',
  components: {
    DefaultHead,
    DefaultMenu,
    DefaultNav
  }
})
</script>
<style lang="stylus">
@import '~@/assets/css/variables.styl'
.layouts-default
  position relative
  padding-left $font * 12
  $topHeight = $font * 3.5
  $navHeight = 42px
  &-side
    position fixed
    left 0
    top $topHeight
    bottom 0
    width @padding-left
    height 100%
    // background-color #051523
    background-color darken($primary, 75%)
    z-index 3
  &-nav
    position fixed
    top $topHeight
    left 0
    padding-left @padding-left
    width 100%
    height $navHeight
    user-select none
    // background-color darken($primary, 80%)
    background-color #fff
    z-index 2
  &-main
    position fixed
    left @padding-left
    right 0
    top 0
    bottom 0
    padding-top $topHeight + $navHeight
    background-color #f8f8f8
  &-head
    position fixed
    top 0
    left 0
    right 0
    width 100%
    height $topHeight
    background-color darken($primary, 60%)
    z-index 4
</style>
