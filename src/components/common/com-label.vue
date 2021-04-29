<template>
  <div class="com-label">
    <div
      v-if="label"
      class="com-label-hd"
    >
      {{ label }}
    </div>
    <div class="com-label-bd">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ComLabel',
  props: {
    label: {
      type: String,
      default: ''
    }
  }
})
</script>
<style lang="stylus">
@import '~@/assets/css/variables.styl'
.com-label
  margin-top $font
</style>
