<template>
  <div class="layouts-default">
    <div class="layouts-default-side">
      <default-menu />
    </div>
    <div class="layouts-default-main">
      <default-head />
      <router-view />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import DefaultHead from './Head.vue'
import DefaultMenu from './Menu.vue'
export default defineComponent({
  name: 'LayoutsDefault',
  components: {
    DefaultHead,
    DefaultMenu
  }
})
</script>
<style lang="stylus">
@import '~@/assets/css/variables.styl'
.layouts-default
  position relative
  padding-left $font * 12
  $topHeight = $font * 3.5
  &-side
    position fixed
    left 0
    top $topHeight
    bottom 0
    width @padding-left
    height 100%
    // background-color #051523
    background-color darken($primary, 75%)
  &-main
    position fixed
    left @padding-left
    right 0
    top 0
    bottom 0
    padding-top $topHeight
  &-head
    position fixed
    top 0
    left 0
    right 0
    width 100%
    height $topHeight
    background-color darken($primary, 60%)
</style>
