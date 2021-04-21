<template>
  <div class="layouts-default-nav flex-between-center">
    <div class="box">
      <ul class="flex-align-center">
        <li
          v-for="(item, i) in navs"
          :key="item.url"
        >
          <div
            :class="{ active: curRoute === item.url }"
            class="item flex-center"
            @click="handleClick(item, i)"
            @contextmenu.prevent="handleContextMenu(i)"
          >
            <LoadingOutlined style="display: none;" />
            <p>{{ item.title }}</p>
            <div
              v-if="item.url !== '/'"
              class="close-btn"
              @click.stop="handleClose(i)"
            >
              <PoweroffOutlined />
            </div>
          </div>
        </li>
        <li
          v-show="navs.length > 2"
          style="margin-left: auto; padding-right: 7px;"
          class="flex-center"
        >
          <a-tooltip placement="right">
            <template #title>
              <span>关闭全部</span>
            </template>
            <!-- <DeleteOutlined /> -->
            <CloseCircleOutlined
              @click="handleClose(0, true)"
            />
            <!-- <a-button
              shape="round"
              type="default"
              plain
              size="small"
              @click="handleClose(0, true)"
            >
              <template #icon>
                <DeleteOutlined />
              </template>
            </a-button> -->
          </a-tooltip>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import {
  LoadingOutlined,
  PoweroffOutlined,
  // DeleteOutlined,
  CloseCircleOutlined
} from '@ant-design/icons-vue'
import { Button, Tooltip } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'

export default defineComponent({
  name: 'LayoutsDefaultNav',
  components: {
    CloseCircleOutlined,
    // DeleteOutlined,
    LoadingOutlined,
    PoweroffOutlined,
    [Tooltip.name]: Tooltip,
    [Button.name]: Button
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const active = ref(0)

    const navs = computed(() => {
      return store.state.navs
    })
    const curRoute = computed(() => { return route.path })
    const handleClick = (item: Record<string, string>, i = 0) => {
      active.value = i
      if (item.url !== curRoute.value) {
        router.replace(item.url)
      }
    }
    const handleClose = (i: number, all = false) => {
      const nav = computed(() => { return store.state.navs })
      const navs = all ? nav.value.slice(0, 1) : nav.value.slice(0, i).concat(nav.value.slice(i + 1))
      store.dispatch('SetNavs', navs)
      const j = all ? 0 : i < nav.value.length - 1 ? i + 1 : i - 1
      router.replace(nav.value[j].url)
    }
    const handleContextMenu = (i: number) => {
      console.log(i)
    }
    return {
      active,
      navs,
      curRoute,
      handleClick,
      handleClose,
      handleContextMenu
    }
  }
})
</script>
<style lang="stylus">
@import '~@/assets/css/variables.styl'
.layouts-default-nav
  .box
    width 100%
    height 100%
  ul
    // width 100%
    height 100%
    li
      height 100%
      margin-left 8px
      padding-top @margin-left
      padding-bottom @padding-top
      .item
        width auto
        height 100%
        padding 0 8px
        border-radius 4px
        background-color #f0f0f0
        cursor pointer
        font-size $font - 2
        p
          // margin 0 3px
          margin 0 6px
        .anticon-poweroff
          cursor pointer
          &:hover
            color #f00
            font-weight bold
        .close-btn
          // 关闭按钮
        &.active
          color #fff
          background-color $success
          cursor default
          text-shadow 0 0 1px #fff
</style>
