<template>
  <div class="layouts-default-head flex-between-center">
    <head-brand />
    <head-account />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import HeadBrand from './HeadBrand.vue'
import HeadAccount from './HeadAccount.vue'
export default defineComponent({
  components: {
    HeadBrand,
    HeadAccount
  }
})
</script>
