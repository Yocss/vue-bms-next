<template>
  <div class="error-index">
    {{ title }}
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup () {
    const data = reactive({
      title: '访问发生错误'
    })
    return { ...data }
  }
})
</script>
