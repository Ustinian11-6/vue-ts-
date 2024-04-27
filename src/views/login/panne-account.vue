<template>
  <div class="account">
    <el-form
      ref="ruleFormRef"
      :rules="rules"
      :model="form"
      label-width="auto"
      style="max-width: 600px"
    >
      <el-form-item prop="name" label="账号">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="form.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { localCache } from '@/utils/cache'

import type { IAccount } from '@/types/login.ts'
import useCounterStore from '@/store/login/login'
import { useRouter } from 'vue-router'

const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

const CounterStore = useCounterStore()
const router = useRouter()

const form = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})

const rules = reactive<FormRules<IAccount>>({
  name: [
    { required: true, message: '必须要输入用户名', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20数字或字母组成~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须要输入密码', trigger: 'blur' },
    {
      pattern: /^[0-9a-z]{3,}$/,
      message: '密码需要3位数字字母以上',
      trigger: 'blur'
    }
  ]
})
const ruleFormRef = ref<FormInstance>()

function loginAction(isRemPwd: Boolean) {
  // console.log('ti666')
  ruleFormRef.value?.validate((valid, fields) => {
    if (valid) {
      // console.log('成功登入')
      const name = form.name
      const password = form.password
      CounterStore.loginactions({ name, password }).then((res) => {
        // console.log(isRemPwd)
        // 3.判断是否需要记住密码
        if (isRemPwd) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }

        router.push('/main')
      })
    } else {
      // console.log('登入失败', fields)
      ElMessage.error('Oops, 请您输入正确的格式后再操作~~.')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style scoped>
.account {
  color: red;
}
</style>
