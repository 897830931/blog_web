<template>
	<div class="wrap">
		<div ref="banner" class="banner">
			<!-- <div ref="bannerNext" @click="scrollToLogin" class="banner-next"></div>
      <ul ref="imageList" class="imgList">
        <li><img src="/src/assets/img/碎梦.jpg" alt="" /></li>
        <li><img src="/src/assets/img/神相.jpg" alt="" /></li>
        <li><img src="/src/assets/img/铁衣.jpg" alt="" /></li>
      </ul>
      <div class="wave wave1"></div>
      <div class="wave wave2"></div> -->
			<canvas ref="myCanvas" class="banner-canvas h-full w-full"></canvas>
		</div>
		<div ref="form" class="form">
			<a-form
				:model="formState"
				name="basic"
				:label-col="{ span: 8 }"
				:wrapper-col="{ span: 16 }"
				autocomplete="off">
				<a-form-item
					label="用户名"
					name="account"
					:rules="[{ required: true, message: '用户名不能为空' }]">
					<a-input v-model:value="formState.account" />
				</a-form-item>

				<a-form-item
					label="密码"
					name="password"
					:rules="[{ required: true, message: '密码不能为空' }]">
					<a-input-password v-model:value="formState.password" />
				</a-form-item>

				<a-form-item :wrapper-col="{ offset: 12, span: 16 }">
					<a-button type="primary" @click="loginAdmin">登录</a-button>
				</a-form-item>
			</a-form>
		</div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, nextTick } from "vue";
import { useUserStore } from "@/store/user";
import { useRouter } from "vue-router";
import { Form as aForm } from "ant-design-vue";
// 引入图片
import suimengImg from "@/assets/img/suimeng.jpg";
import shenxiangImg from "@/assets//img/shenxiang.jpg";
import tieyiImg from "@/assets/img/tieyi.jpg";
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
const myCanvas = ref<HTMLCanvasElement>();
const banner = ref({});
const form = ref({});
// 图片路径数组
const images = ref<HTMLElement[]>([]);
const imagePaths = [suimengImg, shenxiangImg, tieyiImg];
imagePaths.forEach((path) => {
	const image = new Image();
	image.src = path;
	images.value.push(image);
});
// 加载图片
function drawImage(canvas, images) {
	const elWidth = canvas.value.clientWidth;
	const elHeight = canvas.value.clientHeight;
	// 确保画布大小和窗口大小相同
	canvas.value.height = elHeight;
	canvas.value.width = elWidth;
	const ctx = canvas.value.getContext("2d");
	console.log(images[0]);
	images[0].onload = function () {
		// 绘制内容放满整个画布
		ctx.drawImage(images[0], 0, 0, elWidth, elHeight);
	};
	let currentIndex = 1;
	// 每三秒切换一张
	setInterval(() => {
		ctx.clearRect(0, 0, elWidth, elHeight);
		ctx.drawImage(images[currentIndex], 0, 0, elWidth, elHeight);
		currentIndex = (currentIndex + 1) % images.length;
	}, 3000);
}

onMounted(async () => {
	await nextTick(); // 等待 DOM 元素挂载完成
	drawImage(myCanvas, images.value);
});

// 监听鼠标移动事件
// 登录请求
const loginAdmin = () => {
	userStore
		.login(formState)
		.catch(() => {})
		.then(() => {
			setTimeout(() => {
				router.push({
					name: "home",
				});
			}, 300);
		});
};
</script>
<style lang="less" scoped>
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
		transition: all 0.3s ease-in;
	}

	.banner {
		overflow: hidden;
		position: relative;
		width: 100vw;
		height: 100vh;
		&-canvas {
			width: 100vw;
			height: 100vh;
		}
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
