<template>
  <a-tag v-bind="dataObj.props">
    {{ dataObj.data }}
  </a-tag>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue'
import { Tag } from 'ant-design-vue'

export default defineComponent({
  name: 'ComTablePluginsTag',
  components: {
    [Tag.name]: Tag
  },
  props: {
    data: {
      type: [Object, String, Number],
      require: true
    }
  },
  setup (prop) {
    const dataObj = computed(() => {
      const res = { data: '', props: {} }
      const { data } = toRefs(prop)
      if (typeof data?.value !== 'object') {
        Object.assign(res, { data: data?.value || '' })
      } else {
        Object.assign(res, data?.value)
      }
      return res
    })
    return { dataObj }
  }
})
</script>
