<template>
  <div class="test" v-bind="props">
    <a :href="link" target="_blank">
      {{ data }}
    </a>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    data: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    },
    props: {
      type: Object,
      default: () => { return {} }
    }
  }
})
</script>
