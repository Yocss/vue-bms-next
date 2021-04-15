<template>
  <div class="base-page">
    <div class="box">
      <div class="hd">
        <slot name="header" />
      </div>
      <div class="bd">
        <slot />
      </div>
      <div class="ft">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
<style lang="stylus">
@import '~@/assets/css/variables.styl'
.base-page
  width 100%
  height 100%
  padding 10px
  &>.box
    width 100%
    height 100%
    position relative
    padding-top 50px
    padding-bottom 50px
    .hd
    .bd
    .ft
      width 100%
      border-radius 4px
      background-color #fff
      box-shadow 0 0 2px 0 rgba(#444, .1)
    .hd
    .ft
      position absolute
      height 40px
    .bd
      height 100%
    .hd
      top 0
    .ft
      bottom 0
</style>
