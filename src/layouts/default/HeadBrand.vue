<template>
  <div class="head-brand flex-center">
    <router-link to="/">Power by Axmine</router-link>
  </div>
</template>
<style lang="stylus">
@import '~@/assets/css/variables.styl'
.head-brand
  width $font * 10
  height 100%
  padding 0 $font
  background-color rgba(#fff, .1)
  a
    color #fff
    &:hover
      color $info
</style>
