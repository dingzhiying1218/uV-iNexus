<template>
  <a-layout class="h-screen">
    <a-layout-header class="flex items-center justify-between" style="background: #fff; padding: 16px">
      <div class="flex items-center gap-4">
        <img class="h-8" src="@/assets/images/logo2.png" alt="Logo" />
      </div>
      <div class="flex items-center gap-4">
        <a-badge :value="5" dot>
          <StepBackwardOutlined class="text-xl" />
        </a-badge>
        <StepBackwardOutlined class="text-xl" />
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider v-model:collapsed="collapsed" collapsible>
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" @select="onSelect">
          <template v-for="item in menuOptions" :key="item.key">
            <a-sub-menu v-if="item.children" :key="item.key">
              <template #title>
                <span>{{ item.label }}</span>
              </template>
              <template v-for="child in item.children" :key="child.key">
                <a-sub-menu v-if="child.children" :key="child.key">
                  <template #title>{{ child.label }}</template>
                  <a-menu-item v-for="subChild in child.children" :key="subChild.key">
                    {{ subChild.label }}
                  </a-menu-item>
                </a-sub-menu>
                <a-menu-item v-else :key="`${child.key}`">
                  {{ child.label }}
                </a-menu-item>
              </template>
            </a-sub-menu>
            <a-menu-item v-else :key="`${item.key}`">
              {{ item.label }}
            </a-menu-item>
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-breadcrumb style="margin: 16px 16px">
          <a-breadcrumb-item v-for="item in breadcrumbs" :key="item">
            {{ item }}
          </a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content :style="{ background: '#fff', padding: '16px', margin: 0, minHeight: '280px' }">
          <transition name="fade-slide" mode="out-in" appear>
            <a-spin :spinning="loadingStore.isLoading">
              <router-view v-slot="{ Component }">
                <transition name="fade-slide" mode="out-in" appear>
                  <component :is="Component" />
                </transition>
              </router-view>
            </a-spin>
          </transition>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoadingStore } from '@/stores'
import { StepBackwardOutlined } from '@ant-design/icons-vue'
const router = useRouter()
const route = useRoute()
const loadingStore = useLoadingStore()
// const permissionStore = usePermissionStore()
import { realMenus } from '@/setting'
// 侧边栏折叠状态
const collapsed = ref(false)
const selectedKeys = ref<string[]>(['1']);
const menuOptions = ref(realMenus)
// 菜单数据
// permissionStore.setPermissionMenus(realMenus)
// const menuOptions = permissionStore.permissionMenus
// const accessRoute = permissionStore.accessRoutes
// // console.log('accessRoute', accessRoute)
// router.addRoute(accessRoute)
// 面包屑 (根据当前路由动态生成)
const breadcrumbs = computed(() => {
  return route.matched.map(item => item.meta.title || item.name)
})

const onSelect = ({ key }) => {
  selectedKeys.value = [key];
  // 这里可以添加路由跳转逻辑
  router.push({ path: key })
}
</script>
<style scoped lang="less"></style>
