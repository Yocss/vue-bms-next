<template>
  <div class="article-index-edit">
    <!-- 标题 -->
    <com-label>
      <a-input
        placeholder="请输入标题，限45字以内"
      />
    </com-label>
    <!-- /标题 -->

    <!-- 富文本 -->
    <com-label>
      <com-editor
        ref="comEditor"
        initialValue="请在这里输入正文内容"
        @event="onEvent"
      />
    </com-label>
    <!-- /富文本 -->
    <!-- 文章信息 -->
    <com-label>
      <div class="box">
        <div class="cover-image">封面图</div>
        <div class="cover-image">作者名称</div>
        <div class="cover-image">所属分类</div>
        <div class="cover-image">是否置顶</div>
        <div class="cover-image">设定发布日期</div>
      </div>
    </com-label>
    <!-- /文章信息 -->
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Button, Input } from 'ant-design-vue'
import ComLabel from '@/components/common/com-label.vue'
import ComEditor from '@/components/common/com-editor.vue'

export default defineComponent({
  name: 'ArticleIndexEdit',
  components: {
    ComLabel,
    ComEditor,
    [Input.name]: Input,
    [Input.TextArea.name]: Input.TextArea,
    [Button.name]: Button
  },
  setup () {
    const onEvent = (e: unknown) => {
      console.log(e)
    }
    return { onEvent }
  }
})
</script>
<style lang="stylus">
@import '~@/assets/css/variables.styl'
.article-index-edit
  padding $font
  width 100%
  height 100%
</style>
