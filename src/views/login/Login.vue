<template>
  <div class="login">
    <div class="login-panel">
      <div class="title">后台管理系统</div>

      <div class="tabs">
        <el-tabs type="border-card" stretch v-model="activeName">
          <!-- 1.账号登录的Pane -->
          <el-tab-pane name="account">
            <panneAccount ref="accountRef"></panneAccount>
            <template #label>
              <div class="label">
                <el-icon><UserFilled /></el-icon>
                <span class="text">帐号登录</span>
              </div>
            </template>
          </el-tab-pane>

          <!-- 2.手机登录的Pane -->
          <el-tab-pane name="phone">
            <pannePhone></pannePhone>
            <template #label>
              <div class="label">
                <el-icon><Cellphone /></el-icon>
                <span class="text">手机登录</span>
              </div>
            </template>
          </el-tab-pane>
        </el-tabs>
      </div>

      <div class="centrols">
        <el-checkbox label="记住密码" v-model="isRemPwd" size="large" />
        <el-link type="primary">忘记密码</el-link>
      </div>

      <el-button
        @click="handleLoginBtnClick"
        class="login-btn"
        type="primary"
        size="large"
      >
        立即登录
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import panneAccount from './panne-account.vue'
import pannePhone from './panne-phone.vue'
import { localCache } from '@/utils/cache'

const activeName = ref('account')
const accountRef = ref<InstanceType<typeof panneAccount>>()
const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)

watch(isRemPwd, (newvalue) => {
  localCache.setCache('isRemPwd', newvalue)
})

function handleLoginBtnClick() {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction(isRemPwd.value)
  } else {
    console.log('用户在进行手机登录')
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background: url('../../assets/img/login-bg.svg');

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .login-panel {
    width: 330px;
    margin-bottom: 150px;

    .title {
      text-align: center;
      margin-bottom: 15px;
    }
    .centrols {
      display: flex;
      justify-content: space-between;
    }

    .login-btn {
      width: 100%;
    }
  }
}
</style>
