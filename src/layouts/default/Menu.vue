<template>
  <div class="layouts-default-menu">
    <ul>
      <li
        v-for="item in routes"
        :key="item.path"
      >
        <router-link :to="item.path" class="flex-align-center">
          {{ item.meta.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup () {
    const router = useRouter()

    const routes = computed(() => {
      const arr = router.options.routes
      return arr.filter(item => item.meta?.layout !== 'null')
    })

    return { routes }
  }
})
</script>
<style lang="stylus">
@import '~@/assets/css/variables.styl'
.layouts-default-menu
  user-select none
  &>ul
    &>li
      height $font * 2 + 4
      a
        padding-left $font
        width 100%
        height 100%
</style>
