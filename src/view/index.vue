<template>
  <div class="wrap">
    <el-container>
      <el-header height="100px">
        <Header></Header>
      </el-header>
      <el-container class="pl-10">
        <el-aside class="pt-4 mr-4" width="300px">
          <Aside> </Aside>
        </el-aside>
        <el-main class="p-4">
          <transition name="fade">
            <router-view class="content"></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script setup>
</script>

<style lang='less' scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s linear;
  animation: fadeInRight;
  /* referring directly to the animation's @keyframe declaration */
  animation-duration: 0.7s;
  /* don't forget to set a duration! */
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