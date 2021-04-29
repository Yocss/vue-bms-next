<template>
  <a-drawer
    :visible="showDrawer"
    :keyboard="false"
    :maskClosable="false"
    :destroyOnClose="true"
    width="900px"
    :wrapClassName="wrapClassName"
    v-bind="$attrs"
    @close="onClose"
  >
    <div class="com-drawer-body">
      <slot />
    </div>
    <div class="com-drawer-foot flex-center">
      <a-button
        v-for="item in buttons"
        :key="item.title"
        shape="round"
        v-bind="item.props || {}"
        @click="onClick(item.action)"
      >
        {{ item.title }}
      </a-button>
    </div>
  </a-drawer>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { Drawer, Button } from 'ant-design-vue'
import { ButtonType } from '@/dto'

export default defineComponent({
  name: 'ComDrawer',
  components: {
    [Button.name]: Button,
    [Drawer.name]: Drawer
  },
  props: {
    buttons: {
      type: Array,
      default: () => { return [] as Array<ButtonType> }
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup (prop, { emit }) {
    const showDrawer = computed(() => { return prop.visible })
    const wrapClassName = computed(() => { return prop.buttons.length > 0 ? 'com-drawer has-foot' : 'com-drawer' })
    const onClose = () => {
      emit('update:visible', false)
    }
    const onClick = (action: string) => {
      emit('event', { action, data: '' })
    }
    return {
      showDrawer,
      wrapClassName,
      onClose,
      onClick
    }
  }
})
</script>
