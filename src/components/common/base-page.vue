<template>
  <div class="base-page">
    <div class="box">
      <div class="hd">
        <slot name="header">
          <div class="hd-default-slot flex-between-center">
            <div class="btns-group">
              <a-button
                v-for="item in buttons.hd"
                :key="item.title"
                shape="round"
                type="primary"
                ghost
                v-bind="item.props || {}"
                @click="doEmit(item)"
              >{{ item.title }}</a-button>
            </div>
            <com-search @event="doEmit" />
          </div>
        </slot>
      </div>
      <div class="bd">
        <slot />
      </div>
      <div class="ft">
        <slot name="footer">
          <div class="ft-default-slot flex-between-center">
            <div class="btns-group">
              <a-button
                v-for="item in buttons.ft"
                :key="item.title"
                shape="round"
                type="primary"
                ghost
                v-bind="item.props || {}"
                @click="doEmit(item)"
              >{{ item.title }}</a-button>
            </div>
            <com-pagination v-bind="pagination" @event="doEmit" />
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from 'ant-design-vue'
import { ButtonType, BasePageBtnType, PaginationType, EventType } from '@/dto'
import ComSearch from '@/components/common/com-search.vue'
import ComPagination from '@/components/common/com-pagination.vue'

export default defineComponent({
  name: 'BasePage',
  components: {
    ComSearch,
    ComPagination,
    [Button.Group.name]: Button.Group,
    [Button.name]: Button
  },
  props: {
    buttons: {
      type: Object,
      default: () => { return { hd: [], ft: [] } as BasePageBtnType }
    },
    pagination: {
      type: Object,
      default: () => {
        return { current: 3, pageSize: 20, total: 0 } as PaginationType
      }
    }
  },
  setup (prop, { emit }) {
    const doEmit = (item: ButtonType) => {
      const eventData: EventType = { action: item.action, data: item?.data || '' }
      emit('event', eventData)
    }
    return { doEmit }
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
    .ft-default-slot
      width 100%
      height 100%
      padding 7px
      .btns-group
        .ant-btn
          margin-right 7px
</style>
