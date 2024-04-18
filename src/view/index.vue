<template>
  <div class="wrap">
    <Header></Header>
    <div class="bottom">
      <div class="aside">
        <Aside> </Aside>
      </div>
      <transition name="fade">
        <router-view class="content"></router-view
      ></transition>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang='less' scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s linear;
  animation: fadeInRight; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 0.7s; /* don't forget to set a duration! */
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
  transition: all 0.5s linear;
}
.bottom {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  .content {
    flex: 1;
  }
}

.aside {
  width: 25%;
  height: calc(100vh - 80px);
  padding: 0 30px 0 5%;
  border-radius: 10px;
}
</style>