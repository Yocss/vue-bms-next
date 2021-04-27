<template>
  <a-popover
    placement="left"
  >
    <template v-slot:content>
      <div class="com-table-action-btns flex-center"></div>
    </template>
  </a-popover>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Button, Popover } from 'ant-design-vue'

export default defineComponent({
  name: 'ComTablePluginsBtns',
  components: {
    [Button.name]: Button,
    [Popover.name]: Popover
  }
})
</script>
