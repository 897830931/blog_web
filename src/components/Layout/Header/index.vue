<template>
  <div class="wrap px-2">
    <div class="title">南瓜、相册</div>
    <router-link class="navItem" v-for="(item, index) in navList" :to="item.path" :key="index">
      <span class="iconfont" :class="item.icon"></span>{{ item.title
      }}<span class="icon"></span>
    </router-link>
    <slot name="extra"></slot>
    <div class="logOut" @click="logOut">退出登录</div>
  </div>
</template>

<script setup>
import { navList } from "./data";
import { useUserStore } from "@/store/user";
import { useRouter, useRoute } from "vue-router";
import { message } from "ant-design-vue";
const router = useRouter();
const userStore = useUserStore();
const route = useRoute();
const logOut = () => {
  userStore.logOut().then((res) => {

    router.push({
      path: "/login",
    });
    // window.location.reload();
  });
};
</script>
<style lang='less' scoped>
@import url("@/assets/icon/iconfont.css");

/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
  font-family: "Regular";
  font-weight: 400;
  src: url("@/assets/font/Alimama_DongFangDaKai_Regular.woff2") format("woff2"),
    url("@/assets/font/Alimama_DongFangDaKai_Regular.woff") format("woff");
  font-display: swap;
}

.iconfont {
  font-size: 1.5rem;
  margin-right: 2px;
}

.wrap {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 80px;
  margin-bottom: 20px;

  padding: 0 10%;
  font-family: "Regular";
  padding-right: 40%;
  background-color: rgba(24, 28, 19, 0.6);

  .title,
  .navItem {
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
  }

  .logOut {
    position: absolute;
    right: 20px;
    cursor: pointer;
  }

  .navItem {
    flex-grow: 1;
    font-size: 1.2rem;
    height: 100%;

    &:hover {
      background-color: black;
      color: white;
      cursor: pointer;
    }
  }
}
</style>