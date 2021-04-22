<template>
  <div class="com-table">
    <a-table
      :columns="columns"
      :row-key="(row, index) => row.id || row.key || index "
      :dataSource="data"
      :pagination="false"
      bordered
    >
      <template
        v-for="item in "
      >
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue'
import { Table } from 'ant-design-vue'
import { ComTableHeadType } from './dto'

interface ColumnsType {
  title: string;
  dataIndex: string;
  align?: string;
  scopedSlots?: Record<string, string>;
}

export default defineComponent({
  name: 'ComTable',
  props: {
    head: {
      type: Array,
      default: () => { return [] as Array<ComTableHeadType> }
    },
    data: {
      type: Array,
      default: () => { return [] }
    }
  },
  components: {
    [Table.name]: Table
  },
  setup (prop) {
    const columns = computed(() => {
      const res: Array<ColumnsType> = []
      const { head } = toRefs(prop)
      for (let i = 0; i < head.value.length; i++) {
        const item = head.value[i] as ComTableHeadType
        const scopedSlots = {}
        if (item.slot) {
          const customRender = `customSlot${item.slot}${item.field}`
          Object.assign(scopedSlots, { customRender })
        }
        res.push({
          title: item.title,
          dataIndex: item.field,
          align: item?.align || 'left',
          scopedSlots
        })
      }
      return res
    })
    return {
      columns
    }
  }
})
</script>
<style lang="stylus">
@import '~@/assets/css/variables.styl'
.com-table
 //
</style>
