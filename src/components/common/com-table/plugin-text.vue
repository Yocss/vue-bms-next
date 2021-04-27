<template>
  <div
    class="com-table-plugins-text"
    v-bind="textData.props"
    v-text="textData.data"
  />
</template>
<script lang="ts">
import { defineComponent, toRefs, computed } from 'vue'

export default defineComponent({
  name: 'ComTablePluginsText',
  props: {
    data: {
      type: [Object, String],
      require: true
    }
  },
  setup (prop) {
    const textData = computed(() => {
      const res = { data: '', props: {} }
      const { data } = toRefs(prop)
      if (typeof data?.value === 'string') {
        res.data = data?.value || ''
      } else {
        Object.assign(res, data?.value)
      }
      return res
    })
    return { textData }
  }
})
</script>
