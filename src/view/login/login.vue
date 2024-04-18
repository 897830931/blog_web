<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useUserStore } from "@/store/user";
import { useRouter } from "vue-router";
import { Form as aForm } from "ant-design-vue";
interface FormState {
  account: string;
  password: string;
}

const userStore = useUserStore();
const router = useRouter();
const formState = reactive<FormState>({
  account: "",
  password: "",
});
const banner = ref({});
const form = ref({});
const imageList = ref({});
const bannerNext = ref({});
// 页面滚动
const scrollToLogin = () => {
  window.scrollTo({
    top: banner.value.clientWidth,
    behavior: "smooth",
  });
};
// 鼠标切换图片
onMounted(() => {
  const clientX = banner.value.clientWidth;
  const clientX1 = clientX * (1 / 4);
  const clientX2 = clientX * (3 / 4);
  const clientY = banner.value.clientHeight;
  const onMouseMove = (ev: any) => {
    let offsetX = ev.clientX;
    let offsetY = ev.clientY;
    console.log(offsetX, offsetY, ev);
    if (offsetX < clientX1 && offsetY < clientY) {
      imageList.value.style.left = 0 + "px";
    }
    if (offsetX >= clientX1 && offsetX <= clientX2 && 0 < offsetY < clientY) {
      imageList.value.style.left = -clientX + "px";
    }
    if (offsetX > clientX2 && offsetX < clientX && 0 < offsetY < clientY) {
      imageList.value.style.left = -(clientX * 2) + "px";
    }
  };

  banner.value.addEventListener("mousemove", onMouseMove, true); //事件会在鼠标指针移动时发生
});
// 登录请求
const loginAdmin = () => {
  userStore
    .login(formState)
    .catch(() => {

    })
    .then(() => {
      setTimeout(() => {
        router.push({
          name: "home",
        });
      }, 300);
    });
};
</script>

<template>
  <div class="wrap">
    <div ref="banner" class="banner">
      <div ref="bannerNext" @click="scrollToLogin" class="banner-next"></div>
      <ul ref="imageList" class="imgList">
        <li><img src="/src/assets/img/碎梦.jpg" alt="" /></li>
        <li><img src="/src/assets/img/神相.jpg" alt="" /></li>
        <li><img src="/src/assets/img/铁衣.jpg" alt="" /></li>
      </ul>
      <div class="wave wave1"></div>
      <div class="wave wave2"></div>
    </div>
    <div ref="form" class="form">
      <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off">
        <a-form-item label="用户名" name="account" :rules="[{ required: true, message: '用户名不能为空' }]">
          <a-input v-model:value="formState.account" />
        </a-form-item>

        <a-form-item label="密码" name="password" :rules="[{ required: true, message: '密码不能为空' }]">
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 12, span: 16 }">
          <a-button type="primary" @click="loginAdmin">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style lang='less' scoped>
.wrap {
  height: 200vh;
  width: 100vw;

  .form {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("@/assets/img/login_banner.webp") no-repeat;
    background-size: 100% 100%;
  }

  .imgList {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    position: relative;
    left: 0;
    top: 0;
  }

  .banner {
    overflow: hidden;
    position: relative;

    img {
      display: inline-block;
      width: 100vw;
      height: 100vh;
    }

    .wave {
      width: 100%;
      height: 100px;
      top: calc(100% - 100px);
      z-index: 99;
      position: absolute;
    }

    .wave1 {
      background: url("@/assets/img/wave1.png") no-repeat;
      background-size: 100% 100%;
    }

    .wave2 {
      background: url("@/assets/img/wave2.png") no-repeat;
      background-size: 100% 100%;
    }

    .banner-next {
      height: 100px;
      width: 100px;
      background: url("@/assets/img/banner-next.png");
      background-size: 100% 100%;
      position: absolute;
      bottom: 50px;
      right: 50%;
      transform: translateX(50%);
      z-index: 100;
      animation-name: jumpNext;
      animation-duration: 1s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      animation-direction: alternate;
      animation-play-state: running;

      &:hover {
        opacity: 0.5;
        cursor: pointer;
      }
    }
  }

  @keyframes jumpNext {
    from {
      transform: translateY(20px);
    }

    to {
      transform: translateY(40px);
    }
  }
}
</style>
