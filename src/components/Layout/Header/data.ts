export const menuItems = [
  {
    title: "首页",
    route: {
      path: "/home",
    },
    disabled: false,
  },
  {
    title: "分类",
    disabled: false,
    children: [
      {
        title: "item one",
        route: {
          path: "/home",
        },
        disabled: false,
      },
      {
        title: "item two",
        route: {
          path: "/home",
        },
        disabled: false,
      },
      {
        title: "item three",
        route: {
          path: "/home",
        },
        disabled: false,
      },
      {
        title: "item four",
        children: [
          {
            title: "item one",
            route: {
              path: "/home",
            },
            disabled: false,
          },
          {
            title: "item two",
            route: {
              path: "/home",
            },
            disabled: false,
          },
          {
            title: "item three",
            route: {
              path: "/home",
            },
            disabled: true,
          },
        ],
      },
    ],
  },
  {
    title: "日常",
    route: {
      path: "/life",
    },
    disabled: false,
  },
  {
    title: "笔记",
    route: {
      path: "/category",
    },
    disabled: true,
  },
];
