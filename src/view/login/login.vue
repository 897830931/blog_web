<script setup lang="ts">
import { reactive } from "vue";
import { useUserStore } from "@/store/user";
import { useRouter } from "vue-router";
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
const loginAdmin = () => {
  userStore
    .login(formState)
    .catch(() => {
      alert(1);
    })
    .then(() => {
      setTimeout(() => {
        router.push({
          name: "home",
        });
      }, 300);
    });
};
const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>

<template>
  <div>
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="用户名"
        name="account"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.account" />
      </a-form-item>

      <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" @click="loginAdmin">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
