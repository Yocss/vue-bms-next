<template>
  <div class="home-index">
    {{ title }}
    <router-link to="/account">去登录页</router-link>
    <div
      @click="onClick"
    >haha</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import axios from '@/plugins/axios'

export default defineComponent({
  name: 'HomeIndex',
  setup () {
    const data = reactive({
      title: '首页'
    })
    const onClick = () => {
      axios.get('/')
    }
    return { ...data, onClick }
  }
})
</script>
