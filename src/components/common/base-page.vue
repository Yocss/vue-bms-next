<template>
  <div class="base-page">
    <div class="box">
      <div class="hd">
        <slot name="header">
          <div class="hd-default-slot flex-between-center">
            <a-button-group>
              <a-button
                v-for="item in buttons"
                :key="item.title"
                :type="item.type || 'default'"
                @click="onBtnClick(item)"
              >{{ item.title }}</a-button>
            </a-button-group>
            <com-search />
          </div>
        </slot>
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
<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from 'ant-design-vue'
import { ButtonType, EventType } from '@/dto'
import ComSearch from '@/components/common/com-search.vue'

export default defineComponent({
  name: 'BasePage',
  components: {
    ComSearch,
    [Button.Group.name]: Button.Group,
    [Button.name]: Button
  },
  props: {
    buttons: {
      type: Array,
      default: () => { return [] as Array<ButtonType> }
    }
  },
  setup (prop, { emit }) {
    const onBtnClick = (item: ButtonType) => {
      const eventData: EventType = { action: item.action }
      emit('event', eventData)
    }
    return { onBtnClick }
  }
})
</script>

<style lang="stylus">
@import '~@/assets/css/variables.styl'
.base-page
  width 100%
  height 100%
  padding 10px
  $hdHeight = 46px
  &>.box
    width 100%
    height 100%
    position relative
    padding-top $hdHeight + 10
    padding-bottom $hdHeight + 10
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
      height $hdHeight
    .bd
      height 100%
    .hd
      top 0
    .ft
      bottom 0
    .hd-default-slot
      width 100%
      height 100%
      padding 7px
</style>
