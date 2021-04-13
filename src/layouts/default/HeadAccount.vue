<template>
  <div class="head-account">
    超级管理员&nbsp;&nbsp;
    <a-button
      type="primary"
      shape="round"
      size="small"
      ghost
      @click="logout"
    >
      退出
    </a-button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { Tag, Button, Modal } from 'ant-design-vue'
export default defineComponent({
  name: 'HeadAccount',
  components: {
    [Tag.name]: Tag,
    [Button.name]: Button
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const logout = () => {
      Modal.confirm({
        title: '您确定要退出登录吗？',
        okText: '确定',
        cancelText: '取消',
        onOk () {
          store.dispatch('SetToken', '')
          router.push({ path: '/account', query: { redirect: route.fullPath } })
        }
      })
    }

    return { logout }
  }
})
</script>

<style lang="stylus">
@import '~@/assets/css/variables.styl'
.head-account
  padding 0 $font
  color #fff
</style>
