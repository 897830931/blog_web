<template>
  <div class="wrap">
    <img class="avatar" :src="userInfo.avatar" />
    <p class="userName">{{ userInfo.userName }}</p>
    <p class="signature">{{ userInfo.signature }}</p>
    <div class="contact">
      <div class="contactItem">
        <img
          src="@/assets/img/github-fill.svg"
          @click="goGlob(userInfo.contact.gitHub)"
          alt=""
        />
      </div>
      <div class="contactItem">
        <img
          src="@/assets/img/qqmusic.svg"
          @click="goGlob(userInfo.contact.qqmusic)"
          alt=""
        />
      </div>
      <div class="contactItem">
        <img
          src="@/assets/img/bilibili.svg"
          @click="goGlob(userInfo.contact.bilibili)"
          alt=""
        />
      </div>

      <div class="contactItem">
        <a style="display: flex" :href="'mailto:' + userInfo.contact.email"
          ><img src="@/assets/img/email-fill.svg" alt="" />
        </a>
      </div>
    </div>
    <div class="love">
      <a-collapse v-model:activeKey="activeKey">
        <a-collapse-panel v-for="(item, index) in userInfo.love" :key="index">
          <p class="loveContent">{{ item.content }}</p>
          <template #header
            >{{ item.title }}<span class="iconfont" :class="item.icon"></span
          ></template>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { Image as aImage, Collapse as aCollapse } from "ant-design-vue";
const activeKey = ref([0]);
const userInfo = ref({
  avatar: "https://naccl.top/img/avatar.jpg",
  userName: "Pumpink",
  signature: "游龙当归还，海不迎我自来也",
  love: [
    {
      title: "最喜欢的动漫",
      icon: "",
      content:
        "sdfklasjdflasdjfoasdjfalsdjfasdjfaslksdfklasjdflasdjfoasdjfalsdjfasdjfaslksdfklasjdflasdjfoasdjfalsdjfasdjfaslk",
    },
  ],
  contact: {
    qqmusic: "",
    gitHub: "",
    email: "897830931@qq.com",
    bilibili: "",
  },
});
const goGoal = (url) => {
  window.open(url, "_blank");
};
const sendEmail = () => {};
</script>
<style lang='less' scoped>
.wrap {
  width: 100%;
  background-color: white;
  &:hover {
    box-shadow: 0 0 4px 2px rgba(87, 80, 80, 1);
  }

  .avatar {
    width: 100%;
  }
  .userName,
  .signature,
  .contact {
    display: flex;
    height: 80px;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    border-bottom: 1px solid rgba(87, 80, 80, 0.2);
  }
  .signature {
    font-size: 1.25rem;
    height: 60px;
  }
  .contact {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px 10px;

    .contactItem {
      cursor: pointer;
      width: 15%;
      background-color: rgb(236, 221, 221);
      border-radius: 50%;
      display: flex;
      padding: 10px;

      img,
      a {
        width: 100%;
        height: 100%;
        display: inline-block;
        object-fit: fill;
      }
    }
  }
  .love {
    .loveContent {
      word-wrap: break-word;
      text-indent: 2rem;
    }
  }
}
</style>