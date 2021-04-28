<template>
  <base-page
    class="home-index"
    v-bind="baseProps"
    @event="onEvent"
  >
    <com-table
      :head="head"
      :data="data"
      @event="onEvent"
    />
  </base-page>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
// import axios from '@/plugins/axios'
import BasePage from '@/components/common/base-page.vue'
import ComTable from '@/components/common/com-table/index.vue'
import { ComTableHeadType, TableDataType } from '@/components/common/com-table/dto'
import { BasePagePropsType, EventType } from '@/dto'
import HelloTest from './text.vue'

export default defineComponent({
  name: 'HomeIndex',
  components: {
    ComTable,
    BasePage
  },
  setup () {
    const basePropsData: BasePagePropsType = {
      buttons: {
        hd: [{ title: '添加新文章', action: 'newArticle' }],
        ft: [{ title: '全选', action: 'selectAll' }]
      },
      pagination: { current: 1, pageSize: 20, total: 1000 }
    }
    const tableHeadData: Array<ComTableHeadType> = [
      { title: '姓名', field: 'name', slot: 'image' },
      { title: '年龄', field: 'age' },
      { title: '地址', field: 'address', slot: 'custom' }
    ]
    const tableData: Array<TableDataType> = [
      {
        id: 1,
        name: 'https://sihong-lm.oss-cn-shanghai.aliyuncs.com/manager/131614937161bf9228baa0900188e150da93c37b3cf8.jpg',
        age: 32,
        address: {
          component: HelloTest,
          data: '江西省南昌市',
          link: 'http://www.baidu.com/',
          props: {
            style: { backgroundColor: '#3f3' }
          }
        },
        customTableAction: []
      },
      {
        id: 2,
        name: 'https://sihong-lm.oss-cn-shanghai.aliyuncs.com/manager/131591319093f132548732cf3c7ea2365a1bbd195da2.jpg',
        age: 23,
        address: {
          component: HelloTest,
          data: '江西省吉安市',
          props: {}
        },
        customTableAction: [
          { action: 'del', title: 'haha', props: { type: 'default' } },
          { action: 'show', title: 'baba', props: { type: 'primary', ghost: true } }
        ]
      }
    ]
    const data = ref(tableData)
    const head = ref(tableHeadData)
    const baseProps = reactive(basePropsData)

    const onEvent = (e: EventType) => {
      console.log(e)
      const data = e.data
      switch (e.action) {
        case 'pageChange': {
          type DataType = {
            current: number;
            pageSize: number;
          }
          baseProps.pagination.current = (data as DataType).current
          break
        }
      }
    }
    return {
      data,
      head,
      baseProps,
      onEvent
    }
  }
})
</script>
