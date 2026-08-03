# 陈凯 · 个人简历网页

> 商用车可靠性工程师 · 宁德时代

一个现代化的个人简历展示网站，基于纯 HTML / CSS / JavaScript 构建，可直接部署到 GitHub Pages。

## ✨ 特性

- 🎨 现代化渐变设计，精致动效
- 📱 完全响应式，适配手机/平板/桌面
- ⚡ 纯静态页面，加载飞快
- 🌠 平滑滚动 + 滚动显现动画
- 🎯 导航栏滚动高亮
- 🚀 一键部署到 GitHub Pages

## 📂 项目结构

```
chenkai-resume/
├── index.html      # 主页面
├── styles.css      # 样式文件
├── script.js       # 交互脚本
├── .nojekyll       # GitHub Pages 配置
└── README.md       # 说明文档
```

## 🚀 部署到 GitHub Pages

### 方法一：网页上传（无需安装 Git）

1. **创建 GitHub 仓库**
   - 登录 [GitHub](https://github.com)，点击右上角 **+** → **New repository**
   - 仓库名：`chenkai-resume`（或你喜欢的名字）
   - 选择 **Public**
   - 勾选 **Add a README file** 可选，不勾也可以
   - 点击 **Create repository**

2. **上传文件**
   - 在仓库页面点击 **uploading an existing file**
   - 把本项目下的 **所有文件** 拖拽进去（index.html、styles.css、script.js、.nojekyll）
   - 底部点击 **Commit changes**

3. **开启 GitHub Pages**
   - 进入仓库 → **Settings**（顶部菜单栏）
   - 左侧找到 **Pages**
   - **Source** 选择 `Deploy from a branch`
   - **Branch** 选择 `main` + `/ (root)`
   - 点击 **Save**
   - 稍等 1~2 分钟，页面上方会显示访问链接：
     `https://你的用户名.github.io/chenkai-resume/`

### 方法二：使用 Git 命令

```bash
# 1. 初始化仓库
git init
git add .
git commit -m "Initial commit: resume website"
git branch -M main

# 2. 关联远程仓库（替换成你的地址）
git remote add origin https://github.com/你的用户名/chenkai-resume.git
git push -u origin main

# 3. 然后在 GitHub Settings 中开启 Pages 即可
```

### 方法三：部署为个人主页

- 仓库名设置为 `你的用户名.github.io`
- 上传文件后访问 `https://你的用户名.github.io/`

## 🔧 自定义内容

### 修改文字内容

直接编辑 `index.html`，找到对应模块的文字替换即可。

### 修改主题色

在 `styles.css` 顶部 `:root` 中修改：

```css
--primary: #1e40af;      /* 主色 */
--primary-light: #3b82f6; /* 主色亮调 */
--accent: #0ea5e9;        /* 强调色 */
--accent-2: #06b6d4;      /* 第二强调色 */
```

### 添加头像

1. 把头像图片放到项目根目录，命名为 `avatar.jpg`
2. 在 `index.html` 中找到 `.avatar-initials` 部分，替换为 `<img src="avatar.jpg" alt="陈凯" />`

## 📝 内容模块

| 模块 | 说明 |
|------|------|
| Hero | 个人介绍、核心数据、浮动卡片视觉效果 |
| 关于我 | 个人简介 + 基本信息卡片 |
| 工作经历 | 时间线形式展示职业历程 |
| 项目经验 | 卡片式展示核心项目，含量化成果 |
| 教育背景 | 学历 + 在校荣誉 |
| 专业技能 | 技能进度条，分三类展示 |
| 荣誉奖项 | 获奖列表 |
| 联系方式 | 电话 + 邮箱 |

## 📄 License

个人使用，仅供简历展示。
