# vite-ev-template

<div align="center">
	<a href="https://vuejs.org" target="_blank" rel="noopener noreferrer"><img width="100" src="https://vuejs.org/images/logo.png" alt="Vue logo"></a>
</div>
<div align="center">
<img width="50" height="20" src="./src//assets//vite-badage.svg"/>
<img width="90" height="20" src="./src/assets/ts-badage.svg"/>
<img width="60" height="20" src="./src/assets/pinia-badage.svg"/>
</div>

## 项目简介

数据链模拟套件  
技术栈：vue3 setup + ts + pinia

## 快速开始

```bash
# 克隆项目
git clone https://github.com/brocadeyu/vite-ev-template.git

# 进入项目目录
cd vite-ev-template

# 安装依赖
npm install

# 启动服务
npm run dev
```

## 推荐设置

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)+[Prettier]()+[ESLint]()

## 工程目录

```
vite-project
├── src   //项目源码目录
│   ├── api   //接口目录
│   ├── assets   //资源目录
│   ├── common   //通用模块
│   │   ├── class   //class类
│   │   ├── enum //ts枚举
│   │   ├── interface.ts //ts接口
│   │   └── helper //辅助函数
│   ├── components   //公共组件目录
│   │   ├── *.vue
│   │   ├── PopUp.vue //公共弹窗容器
│   │   └── PopUp //弹窗组件目录
│   ├── map   //地图模块
│   ├── router   //路由,这里采用嵌套路由
│   ├── shaders   //着色器
│   ├── stores   //pinia store
│   ├── types   //类型声明
│   ├── utils   //工具目录
│   └── views   //页面目录
│       └── thought-*.**
│   ├── main.ts   //主入口ts文件
│   ├── App.vue   //根组件
├── README.md
├── vite.config.ts  //vite config
├── tsconfig.json  //ts config
├── .eslintrc.cjs //eslint config
├── .prettierrc.cjs  //prettier config
├── index.html  //入口页面
└── package.json //包配置文件
```
