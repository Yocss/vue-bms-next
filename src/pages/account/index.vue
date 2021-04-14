<template>
  <div class="account-index flex-center">
    <div class="account-form flex-column-between">
      <div class="account-form-hd flex-center">
        <h1>网站后台管理系统</h1>
      </div>
      <div class="account-form-bd">
        <div class="account-label">
          <a-input
            v-model:value.trim="user"
            :maxlength="18"
            placeholder="请输入帐号"
            size="large"
          >
            <template #prefix>
              <user-outlined type="user" />
            </template>
          </a-input>
        </div>
        <div class="account-label">
          <a-input
            v-model:value.trim="pwd"
            :maxlength="64"
            type="password"
            placeholder="请输入密码"
            size="large"
          >
            <template #prefix>
              <lock-outlined type="lock" />
            </template>
          </a-input>
        </div>
        <div class="account-label flex-between-center">
          <a-checkbox
            v-model:checked="checked"
          >记住帐号</a-checkbox>
          <a-tooltip placement="left">
            <template #title>
              <span>请与相关人员联系解决</span>
            </template>
            <span>无法登录？</span>
          </a-tooltip>
        </div>
        <div class="account-label">
          <a-button
            type="primary"
            block
            shape="round"
            size="large"
            @click="doLogin"
          >立即登录</a-button>
        </div>
      </div>
      <div class="account-form-ft flex-center">
        <p>POWER BY INTERNET TECHNOLOGY DEPARTMENT OF SIHONG</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="stylus" src="./index.styl"></style>
