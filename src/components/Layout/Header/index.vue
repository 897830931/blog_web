<template>
  <div class="flex items-center h-full px-2">
    <el-row class="w-full">
      <el-col class="flex items-center" :span="6">
        <div class="title">南瓜、相册</div>
      </el-col>
      <el-col class="flex items-center" :span="12">
        <el-menu :router="true" :unique-opened="true" background-color="transparent" :default-active="defaultActive"
          class="el-menu-demo" mode="horizontal">
          <!-- 第一层菜单 -->
          <template v-for="(item, index) in menuItems" :key="index">
            <el-menu-item :disabled="item.disabled" class="el-menu-item" :route="item.route" v-if="!item.children"
              :index="index + ''">
              {{ item.title }}
            </el-menu-item>
            <el-sub-menu :disabled="item.disabled" class="el-menu-item" v-if="item.children && item.children.length > 1"
              :index="index">
              <!-- 出现二级菜单 -->
              <template #title>
                {{ item.title }}
              </template>
              <template v-for="(subItem, subIndex) in item.children" :key="subIndex">
                <el-menu-item :disabled="subItem.disabled" class="el-menu-item" v-if="!subItem.children"
                  :route="subItem.route" :index="index + '-' + subIndex" :key="childIndex">
                  {{ subItem.title }}
                </el-menu-item>
                <!-- 第二级菜单可能有子的情况，三级菜单 -->
                <el-sub-menu :disabled="subItem.disabled" class="el-menu-item"
                  v-if="subItem.children && subItem.children.length > 1" :index="index + '-' + subIndex">
                  <template #title>
                    <span class="el-menu-item">{{ subItem.title }}</span>
                  </template>
                  <el-menu-item :disabled="trItem.disabled" class="el-menu-item" :route="trItem.route"
                    v-for="(trItem, trIndex) in subItem.children" :index="index + '-' + subIndex + '-' + trIndex"
                    :key="trIndex">
                    {{ trItem.title }}
                  </el-menu-item>
                </el-sub-menu>
              </template>

            </el-sub-menu>
          </template>
        </el-menu></el-col>
      <el-col class="flex items-center justify-end" :span='6'> <el-button type="primary"
          @click="logOut">退出登录</el-button></el-col>
    </el-row>
  </div>
</template>

<script setup>
import { menuItems } from "./data";
import { useUserStore } from "@/store/user";
import { useRouter, useRoute } from "vue-router";
import { message } from "ant-design-vue";
import { ref, reactive } from 'vue';
const router = useRouter();
const userStore = useUserStore();
const route = useRoute();
let activeIndex = ref < String > ('1');//点击的menu
// 退出登录
const logOut = () => {
  userStore.logOut().then((res) => {
    router.push({
      route: "/login",
    });
    // window.location.reload();
  });
};
//选中事件
const handleSelect = (e) => {
  console.log(e)
}
</script>
<style lang='less' scoped>
.iconfont {
  font-size: 1.5rem;
  margin-right: 2px;
}




.title {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-right: solid 0.5px rgba(255, 255, 255, 0.2);
}

.title {
  justify-self: start;
  flex-grow: 1.4;
  height: 100%;
  font-size: 2.5rem;
  color: aquamarine;
  flex: 1;
}

.el-menu-demo {
  width: 100%;
  flex-grow: 1;
  justify-content: space-around;

}

:deep(.el-sub-menu__title, .el-tooltip__trigger, .el-tooltip__trigger) {
  font-size: 1.25rem;

  &:hover {
    background-color: transparent;
  }
}

.el-menu-item {
  font-size: 1.25rem;
}


.logOut {
  flex: 1;
  cursor: pointer;

}
</style>