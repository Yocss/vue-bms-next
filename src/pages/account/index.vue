<template>
  <div class="account-index">
    {{ title }}
    <router-link to="/">返回首页</router-link>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'AccountIndex',
  setup () {
    const data = reactive({
      title: '登陆页'
    })
    return { ...data }
  }
})
</script>
