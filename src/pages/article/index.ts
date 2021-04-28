import { defineComponent, onMounted, reactive, ref } from 'vue'

import { EventType, BasePagePropsType } from '@/dto'
import { ComTablePropsType } from '@/components/common/com-table/dto'

import BasePage from '@/components/common/base-page.vue'
import ComTable from '@/components/common/com-table/index.vue'

const basePageProps: BasePagePropsType = {
  buttons: {
    hd: [{ title: '添加新文章', action: 'addNew' }],
    ft: []
  },
  pagination: { current: 1, pageSize: 20, total: 0 }
}
const comTableProps: ComTablePropsType = {
  head: [
    { title: '封面', field: 'cover', slot: 'image' },
    { title: '标题', field: 'title' },
    { title: '发布日期', field: 'releaseTime' },
    { title: '状态', field: 'status', slot: 'tag' }
  ],
  data: [
    {
      title: '文章的标题',
      cover: 'http://www.a.com/1.jpg',
      releaseTime: '2020-09-11',
      status: {
        data: '已发布',
        props: { color: 'red' }
      },
      customTableAction: [
        { title: '编辑', action: 'edit' },
        { title: '隐藏', action: 'hide' }
      ]
    }
  ]
}

export default defineComponent({
  name: 'ArticleIndex',
  components: {
    BasePage,
    ComTable
  },
  setup () {
    const comEditor = ref(null)
    const basePageData = reactive(basePageProps)
    const comTableData = reactive(comTableProps)

    const onEvent = (e: EventType) => {
      console.log(e)
      switch (e.event) {
        case 'contentChange': {
          const data = e.data as Array<Record<string, string>>
          const markdown = data[0].markdown
          console.log(markdown)
          break
        }
      }
    }

    onMounted(() => {
      // 组件已渲染
    })
    return {
      basePageData,
      comTableData,
      comEditor,
      onEvent
    }
  }
})
