import { defineComponent, onMounted, reactive, ref } from 'vue'

import { EventType, BasePagePropsType, ButtonType } from '@/dto'
import { ComTablePropsType } from '@/components/common/com-table/dto'

import BasePage from '@/components/common/base-page.vue'
import ComTable from '@/components/common/com-table/index.vue'
import ComDrawer from '@/components/common/com-drawer.vue'
import ArticleEdit from './edit.vue'

const basePageProps: BasePagePropsType = {
  buttons: {
    hd: [{ title: '添加新文章', action: 'add' }],
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
      cover: {
        data: 'http://www.a.com/1.jpg',
        props: {
          width: '30px',
          height: '30px'
        }
      },
      releaseTime: '2020-09-11',
      status: {
        data: '已发布',
        props: { color: 'green' }
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
    ArticleEdit,
    BasePage,
    ComDrawer,
    ComTable
  },
  setup () {
    const comEditor = ref(null)
    const basePageData = reactive(basePageProps)
    const comTableData = reactive(comTableProps)
    const showDrawer = ref<boolean>(false)
    const drawerFoot = ref<Array<ButtonType>>([
      { title: '取消编辑', action: 'cancel', props: { type: 'danger' } },
      { title: '存为草稿', action: 'saveTemp', props: { type: 'primary', ghost: true } },
      { title: '立即发布', action: 'submitArticle', props: { type: 'primary' } }
    ] as Array<ButtonType>)

    const toggleDrawer = (bool = false) => { showDrawer.value = bool }

    const onEvent = (e: EventType) => {
      console.log(e)
      switch (e.action) {
        case 'contentChange': {
          const data = e.data as Array<Record<string, string>>
          const markdown = data[0].markdown
          console.log(markdown)
          break
        }
        case 'edit': {
          toggleDrawer(true)
          break
        }
        case 'add': {
          toggleDrawer(true)
          break
        }
        case 'saveTemp':
        case 'cancel':
        {
          toggleDrawer(false)
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
      drawerFoot,
      showDrawer,
      comEditor,
      onEvent
    }
  }
})
