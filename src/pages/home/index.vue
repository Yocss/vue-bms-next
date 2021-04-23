<template>
  <base-page
    class="home-index"
    v-bind="baseProps"
    @event="onEvent"
  >
    <!-- body -->
    <com-table
      :head="head"
      :data="data"
    />
  </base-page>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
// import axios from '@/plugins/axios'
import ComTable from '@/components/common/com-table/index.vue'
import { ComTableHeadType } from '@/components/common/com-table/dto'
import BasePage from '@/components/common/base-page.vue'
import { BasePagePropsType, EventType } from '@/dto'

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
      { title: '地址', field: 'address' }
    ]
    const data = ref([
      {
        id: 1,
        name: '小桂子',
        age: 32,
        address: '江西省南昌市'
      },
      {
        id: 2,
        name: '小马子',
        age: 23,
        address: '江西省宜春市'
      }
    ])
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
