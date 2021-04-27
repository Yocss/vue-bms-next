<template>
  <a-image
    width="30px"
    height="30px"
    v-bind="imageData.props"
    :src="imageData.data"
  />
  <!-- <div
    class="com-table-plugins-image"
    @mouseover="onMouse(true)"
    @mouseout="onMouse(false)"
  >
    <template v-if="showMore">
      <a-popover placement="right">
        <template v-slot:content>
          <div class="com-table-plugins-image-show flex-center">
            <img :src="data">
          </div>
        </template>
        <div class="photo">
          <img :src="data">
        </div>
      </a-popover>
    </template>
    <template>
      <div class="photo">
        <img :src="data">
      </div>
    </template>
  </div> -->
</template>
<script lang="ts">
import { computed, defineComponent, ref, toRefs } from 'vue'
import { Popover, Image } from 'ant-design-vue'

export default defineComponent({
  name: 'ComTablePluginsImage',
  components: {
    [Image.name]: Image,
    [Popover.name]: Popover
  },
  props: {
    data: {
      type: [Object, String],
      require: true
    }
  },
  setup (prop) {
    const imageData = computed(() => {
      const res = { data: '', props: {} }
      const { data } = toRefs(prop)
      if (typeof data?.value === 'string') {
        res.data = data?.value || ''
      } else {
        Object.assign(res, data?.value)
      }
      return res
    })
    const showMore = ref(false)
    const onMouse = (bool: boolean) => {
      showMore.value = bool
    }
    return { imageData, onMouse, showMore }
  }
})
</script>
<style lang="stylus">
.img-size
  max-height 100%
  max-width 100%
  width auto
  height auto
  user-select none
.com-table-plugins-image
  height 30px
  width 30px
  .photo
    width 100%
    height 100%
    // border-radius 4px
    overflow hidden
    background-color #fff
    &>img
      @extend .img-size
      height 100%
.com-table-plugins-image-show
  width 400px
  height 200px
  overflow hidden
  background-color #fff
  img
    @extend .img-size
</style>
