<template>
  <div class="com-pagination">
    <a-pagination
      :current="current"
      :pageSize="pageSize"
      :total="total"
      :showSizeChanger="false"
      showQuickJumper
      :show-total="total => `共 ${total} 条记录 `"
      @change="onChange"
      @showSizeChange="onShowSizeChange"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Pagination } from 'ant-design-vue'

export default defineComponent({
  name: 'ComPagination',
  props: {
    total: {
      type: Number,
      default: 10000
    },
    current: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 20
    }
  },
  components: {
    [Pagination.name]: Pagination
  },
  setup (prop, { emit }) {
    const onChange = (current: number, pageSize: number) => {
      emit('event', { action: 'pageChange', data: { current, pageSize } })
    }
    const onShowSizeChange = (current: number, size: number) => {
      emit('event', { action: 'pageSizeChange', data: { current, size } })
    }
    return {
      onChange,
      onShowSizeChange
    }
  }
})
</script>
<style lang="stylus">
.com-pagination
  // 样式开始
</style>
