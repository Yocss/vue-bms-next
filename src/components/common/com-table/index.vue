<template>
  <div class="com-table">
    <a-table
      :columns="columns"
      :row-key="(row, index) => row.id || row.key || index "
      :dataSource="dataSource"
      :pagination="false"
      :bordered="false"
    >
      <template
        v-for="item in columns.filter(e => e.slots)"
        :key="item.slots.customRender"
        v-slot:[item.slots.customRender]="{text, record}"
      >
        <!-- 序号 -->
        <template v-if="item.slots.customRender === 'customTableOrder'">
          <span>{{ text }}</span>
        </template>
        <!-- /序号 -->
        <!-- 操作按钮 -->
        <template v-else-if="item.slots.customRender === 'customTableAction'">
          显示按钮
        </template>
        <!-- /操作按钮 -->
        <!-- 其他组件 -->
        <template v-else>
          <div>{{ item.slotType === 'text' ? text : record[item.dataIndex] }}</div>
        </template>
        <!-- /其他组件 -->
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
  key: string;
  align?: string;
  width?: string;
  slots?: Record<string, string>;
  [key: string]: unknown;
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
    const dataSource = computed(() => {
      const { data } = toRefs(prop)
      return (data.value as Array<Record<string, unknown>>).reduce((arr = [], item, i: number) => {
        return arr.concat(Object.assign(item, { customTableOrder: i + 1 }))
      }, [] as Array<Record<string, unknown>>)
    })
    const columns = computed(() => {
      const res: Array<ColumnsType> = []
      const { head } = toRefs(prop)
      for (let i = 0; i < head.value.length; i++) {
        const item = head.value[i] as ComTableHeadType
        const customRender = item.slot ? `customSlot${item.slot}${item.field}` : ''
        const slot = customRender ? {
          key: customRender,
          slotType: item.slot,
          slots: { customRender }
        } : {}
        res.push(Object.assign({
          title: item.title,
          dataIndex: item.field,
          key: item.field,
          align: item?.align || 'left'
        }, slot))
      }
      res.unshift({
        title: '序号',
        dataIndex: 'customTableOrder',
        key: 'customTableOrder',
        align: 'center',
        width: '80px',
        slotType: 'text',
        slots: { customRender: 'customTableOrder' }
      })
      res.push({
        title: '操作',
        dataIndex: 'customTableAction',
        key: 'customTableAction',
        width: '98px',
        align: 'center',
        slots: { customRender: 'customTableAction' }
      })
      return res
    })
    return {
      columns,
      dataSource
    }
  }
})
</script>
<style lang="stylus">
@import '~@/assets/css/variables.styl'
.com-table
 //
</style>
