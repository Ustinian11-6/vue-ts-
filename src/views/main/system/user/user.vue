<template>
  <div class="user">
    <user-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <user-content
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
      ref="contentRef"
    />
    <userModal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import UserContent from './c-cpns/user-content.vue'
import userSearch from './c-cpns/user-search.vue'
import userModal from './c-cpns/user-modal.vue'

const contentRef = ref<InstanceType<typeof UserContent>>()

function handleQueryClick(searchForm) {
  contentRef.value?.fetchUserListData(searchForm)
}
function handleResetClick() {
  contentRef.value?.fetchUserListData()
}
const modalRef = ref<InstanceType<typeof userModal>>()
function handleNewClick() {
  modalRef.value?.setModalVisible()
}
function handleEditClick(itemData: any) {
  console.log(itemData)
  // console.log(itemData)
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
