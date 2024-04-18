<template>
  <div class="wrap">
    <div class="main">
      <div v-for="(item, index) in articles" :key="index" class="article">
        <p class="title">{{ item.title }}</p>
        <p class="tag">
          <span class="time">
            <Icon icon="bi:calendar-fill" class="icon" color="rgb(23,105,170)" />{{ item.createTime.substring(0, 10) }}
          </span>
          <span class="view">
            <Icon icon="carbon:view-filled" class="icon" color="orange" />{{
        item.views
      }}
          </span>
          <span class="pen">
            <Icon class="icon" icon="mdi:pen" />字数≈{{ item.words }}
          </span>
        </p>
        <div class="description">
          <div class="desc" v-html="item.description"></div>
        </div>
        <div class="detail">阅读全文</div>
        <hr />
        <div class="category">
          <div class="item" :style="{ backgroundColor: tag.color }" v-for="(tag, index) in item.tags" :key="index">
            <div class="left" :style="{ backgroundColor: tag.color }">
              <div class="cicle"></div>
            </div>
            <span>{{ tag.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="aside"></div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, watchEffect, computed } from "vue";
import { Icon } from "@iconify/vue";
const articles = ref([
  {
    id: 30,
    title: "2022 年度总结",
    description:
      '<p><img src="https://cdn.naccl.top/blog/blogHosting/2022/12/B01/first.jpg" alt="first.jpg"  /></p>\n',
    createTime: "2022-12-31T15:59:10.000+0000",
    views: 3245,
    words: 963,
    readTime: 5,
    top: true,
    password: "",
    privacy: false,
    category: {
      id: null,
      name: "心情随写",
      blogs: [],
    },
    tags: [
      {
        id: null,
        name: "心情随写",
        color: "violet",
        blogs: [],
      },
    ],
  },
  {
    id: 30,
    title: "2022 年度总结",
    description:
      '<p><img src="https://cdn.naccl.top/blog/blogHosting/2022/12/B01/first.jpg" alt="first.jpg"  /></p>\n',
    createTime: "2022-12-31T15:59:10.000+0000",
    views: 3245,
    words: 963,
    readTime: 5,
    top: true,
    password: "",
    privacy: false,
    category: {
      id: null,
      name: "心情随写",
      blogs: [],
    },
    tags: [
      {
        id: null,
        name: "心情随写",
        color: "violet",
        blogs: [],
      },
      {
        id: null,
        name: "心情随写",
        color: "violet",
        blogs: [],
      },
      {
        id: null,
        name: "心情随写",
        color: "violet",
        blogs: [],
      },
      {
        id: null,
        name: "心情随写",
        color: "violet",
        blogs: [],
      },
    ],
  },
  {
    id: 30,
    title: "2022 年度总结",
    description:
      '<p><img src="https://cdn.naccl.top/blog/blogHosting/2022/12/B01/first.jpg" alt="first.jpg"  /></p>\n',
    createTime: "2022-12-31T15:59:10.000+0000",
    views: 3245,
    words: 963,
    readTime: 5,
    top: true,
    password: "",
    privacy: false,
    category: {
      id: null,
      name: "心情随写",
      blogs: [],
    },
    tags: [
      {
        id: null,
        name: "心情随写",
        color: "violet",
        blogs: [],
      },
    ],
  },
]);
</script>
<style lang='less' scoped>
.wrap {
  width: 100%;

  display: flex;
  padding-right: 5%;
  flex-wrap: nowrap;

  .main {
    flex: 1;

  }

  .aside {
    width: 200px;
    border: solid red 1px;
    margin-left: 20px;
    justify-content: space-betweens;
  }

  .article {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 40px;
    overflow: hidden;
    border: solid 1px grey;
    margin-bottom: 60px;
    background-color: white;

    &:hover {
      box-shadow: 0 0 4px 2px rgba(87, 80, 80, 1);
    }

    .icon {
      font-size: 1.25rem;
      margin-right: 5px;
    }

    .title,
    .tag,
    .desc {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
      align-items: center;
    }

    .title {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .tag {
      padding: 0 20%;
      justify-content: space-around;

      .time,
      .view,
      .pen {
        display: flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
      }
    }

    ::v-deep(.description) {
      border-bottom: 1px solid rgba(red, green, blue, alpha);

      img {
        width: 100%;
        object-fit: cover;
      }
    }

    .detail {
      width: 160px;
      height: 60px;
      border-radius: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      cursor: pointer;
      margin-top: 20px;

      background-image: linear-gradient(to right,
          blue 0%,
          pink 25%,
          green 50%,
          purple 75%,
          blue 100%);
      background-size: 200% 200%;
      background-position: 0 0;

      &:hover {
        animation: mybgc 2s ease-in normal infinite;
        color: blue;
        animation-direction: reverse;
      }
    }

    hr {
      width: 100%;
    }

    .category {
      width: 100%;
      padding: 20px;
      display: flex;
      flex-wrap: nowrap;
      justify-content: flex-start;

      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 14%;
        height: 40px;
        border-radius: 4px;
        color: white;
        margin-left: 40px;
        animation: headShake;
        animation-duration: 5s;
        animation-iteration-count: infinite;

        span {
          display: inline-block;
          margin-right: 5%;
          text-overflow: ellipsis;
          width: 60%;
          overflow: hidden;
        }

        .left {
          width: 40px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          transform: translateX(-50%) rotate(40deg) scale(0.8);

          .cicle {
            width: 20%;
            height: 20%;
            border-radius: 50%;
            background-color: white;
            z-index: 99;
          }
        }
      }
    }

    @keyframes mybgc {
      0% {
        background-position: 0% 0%;
      }

      100% {
        background-position: 200% 200%;
      }
    }
  }
}
</style>