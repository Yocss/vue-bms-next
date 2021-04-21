<template>
  <base-page
    class="home-index"
    :buttons="buttons"
    @event="onEvent"
  >
    <!-- <template v-slot:header>
    </template> -->
    haha
    <template v-slot:footer>
      bbcc
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
// import axios from '@/plugins/axios'
import BasePage from '@/components/common/base-page.vue'

import { ButtonType, EventType } from '@/dto'

export default defineComponent({
  name: 'HomeIndex',
  components: {
    BasePage
  },
  setup () {
    const buttons = reactive([
      { title: '添加新文章', action: 'newArticle' },
      { title: '添加新分类', action: 'newCat' }
    ] as Array<ButtonType>)

    const onEvent = (data: EventType) => {
      console.log(data.action)
    }
    return { buttons, onEvent }
  }
})
</script>
