<template>
  <div class="layouts-default-menu">
    <ul>
      <li
        v-for="item in routes"
        :key="item.path"
      >
        <a
          href="javascript:void(0);"
          :class="{'active': currentRoute === item.path}"
          class="flex-between-center"
          @click="goTo(item.path, item.meta.title)"
        >
          <div class="title flex-align-center">
            <!-- <component :is="item.icon" /> -->
            <p>{{ item.meta.title }}</p>
          </div>
          <caret-right-filled />
        </a>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/store'
import { CaretRightFilled } from '@ant-design/icons-vue'
export default defineComponent({
  components: {
    CaretRightFilled
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    const routes = computed(() => {
      const arr = router.options.routes
      const res: Array<unknown> = []
      arr.forEach((item) => {
        if (item.meta?.layout !== 'null') {
          // const iconName = item.meta?.icon || 'AppstoreOutlined'
          // const icon = defineAsyncComponent(() => import(`@ant-design/icons-vue/${iconName}`))
          res.push(item)
        }
      })
      return res
    })
    const currentRoute = computed(() => {
      return route.path
    })
    const goTo = (url: string, title: string) => {
      const navs = computed(() => { return store.state.navs })
      if (!navs.value.some(e => e.url === url)) {
        store.dispatch('SetNavs', { navs: navs.value.concat({ url, title }) })
      }
      router.push(url)
    }

    return { routes, currentRoute, goTo }
  }
})
</script>
<style lang="stylus">
@import '~@/assets/css/variables.styl'
.layouts-default-menu
  user-select none
  &>ul
    &>li
      // margin 5px 0
      height $font * 3
      a
        line-height @height
        padding 0 $font
        color #fff
        height @line-height
        width 100%
        font-size $font - 2
        border 2px solid transparent
        &>div
          height 100%
          p
            margin 0 0 0 ($font / 2)
            line-height @line-height
        &.active
          background-color rgba(#fff, .2)
          border 2px solid rgba(#fff, .5)
          border-top-color transparent
          border-right-color transparent
          border-bottom-color transparent
</style>
