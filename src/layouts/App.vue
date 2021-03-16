<template>
  <div class="app-container">
    <!-- default -->
    <layouts-default v-if="layout === 'default'" />
    <!-- /default -->

    <!-- null layout -->
    <router-view v-else />
    <!-- /null layout -->
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'

import LayoutsDefault from './default/Index.vue'

export default defineComponent({
  name: 'AppContainer',
  components: {
    LayoutsDefault
  },
  setup () {
    const route = useRoute()
    const layout = computed(() => {
      return route.meta.layout || 'default'
    })
    return { layout }
  }
})
</script>
