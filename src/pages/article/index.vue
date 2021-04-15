<template>
  <div class="Article-index">
    文章管理
    <div class="article-editor">
      <com-editor
        ref="comEditor"
        @event="onEvent"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import ComEditor from '@/components/common/com-editor.vue'

interface EditEventType {
  event: string;
  data: Array<Record<string, unknown>>;
}
export default defineComponent({
  name: 'ArticleIndex',
  components: {
    ComEditor
  },
  setup () {
    const comEditor = ref(null)
    const onEvent = (e: EditEventType) => {
      switch (e.event) {
        case 'contentChange': {
          const markdown = e.data[0].markdown
          console.log(markdown)
          break
        }
      }
    }
    // comEditor.setContent('hahahaha')
    onMounted(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (comEditor.value as any).setMarkdown('# hahahahab哈哈哈obo<br/>小种子')
    })
    return { onEvent, comEditor }
  }
})
</script>
<style lang="stylus">
.article-editor
  margin 15%
  width 70%
  height 300px
</style>
