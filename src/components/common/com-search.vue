<template>
  <div class="com-search flex-align-center">
    <div class="com-search-bd">
      <a-input />
    </div>
    <div class="com-search-ft">
      <a-button-group>
        <!-- 搜索按钮 -->
        <a-button
          @click="onClick('search')"
        >搜索</a-button>
        <!-- /搜索按钮 -->
        <!-- 清空搜索条件 -->
        <a-tooltip>
          <template #title>
            <span>清空搜索条件</span>
          </template>
          <a-button
            @click="onClick('clear')"
          >
            <template #icon>
              <DeleteOutlined />
            </template>
          </a-button>
        </a-tooltip>
        <!-- /清空搜索条件 -->
      </a-button-group>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { DeleteOutlined } from '@ant-design/icons-vue'
import { Button, Tooltip, Input } from 'ant-design-vue'

export default defineComponent({
  name: 'ComSearch',
  components: {
    DeleteOutlined,
    [Input.name]: Input,
    [Tooltip.name]: Tooltip,
    [Button.Group.name]: Button.Group,
    [Button.name]: Button
  },
  setup (prop, { emit }) {
    const onClick = (action: string) => {
      emit('event', { action })
    }
    return { onClick }
  }
})
</script>
<style lang="stylus">
.com-search
  &-bd
    margin-right 7px
</style>
