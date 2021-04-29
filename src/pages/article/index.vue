<template>
  <!-- <div class="Article-index">
    文章管理
    <div class="article-editor">
      <com-editor
        ref="comEditor"
        @event="onEvent"
      />
    </div>
  </div> -->
  <base-page
    class="article-index"
    v-bind="basePageData"
    @event="onEvent"
  >
    <com-table
      v-bind="comTableData"
      @event="onEvent"
    />
    <com-drawer
      v-model:visible="showDrawer"
      title="新增文章"
      :buttons="drawerFoot"
      @event="onEvent"
    >
      <!-- kwg kwg -->
      <article-edit />
    </com-drawer>
  </base-page>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="stylus">
.article-index
  .bd
    padding 10px
.article-editor
  margin 15%
  width 70%
  height 300px
</style>
