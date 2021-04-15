<template>
  <base-page class="home-index">
    <template v-slot:header>
      aabbcc
    </template>
    haha
    <template v-slot:footer>
      bbcc
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import axios from '@/plugins/axios'
import BasePage from '@/components/common/base-page.vue'

export default defineComponent({
  name: 'HomeIndex',
  components: {
    BasePage
  },
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
