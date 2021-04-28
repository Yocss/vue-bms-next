<template>
  <div class="com-table-plugins-btns">
    <a-popover
      v-if="btns.length > 1"
      placement="left"
      size="small"
    >
      <template v-slot:content>
        <div class="com-table-plugins-btns-group flex-center">
          <a-button
            v-for="item in btns"
            :key="item.title"
            shape="round"
            v-bind="item.props || {}"
            @click="onClick(item.action)"
          >{{ item.title }}</a-button>
        </div>
      </template>
      <a-button type="primary" shape="round">操作</a-button>
    </a-popover>
    <a-button
      v-else-if="btns.length < 1"
      disabled
      type="default"
      shape="round"
    >操作</a-button>
    <a-button
      v-else
      v-for="item in btns"
      :key="item.title"
      shape="round"
      v-bind="item.props || {}"
      @click="onClick(item.action)"
    >{{ item.title }}</a-button>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
import { Button, Popover } from 'ant-design-vue'
import { ButtonType } from '@/dto/index'
import { TableDataType } from './dto'

export default defineComponent({
  name: 'ComTablePluginsBtns',
  components: {
    [Button.name]: Button,
    [Popover.name]: Popover
  },
  props: {
    data: {
      type: Object,
      default: () => { return {} as TableDataType }
    }
  },
  setup (prop, { emit }) {
    const { data } = toRefs(prop)
    const btns = computed(() => {
      const res: Array<ButtonType> = []
      res.push(...data.value.customTableAction)
      return res
    })
    const onClick = (action: ButtonType) => {
      emit('event', { action, data: data.value })
    }
    return {
      btns,
      onClick
    }
  }
})
</script>
<style lang="stylus">
// .com-table-plugins-btns
 // haha
.com-table-plugins-btns-group
  .ant-btn
    margin-left 8px
    &:first-child
      margin-left 0
</style>
