# 陈凯 · 个人简历网页

> 电芯可靠性团队负责人 · 宁德时代

纯 HTML / CSS / JavaScript 构建的个人简历网站，部署在 GitHub Pages：
**https://kchen1028.github.io**

## ✨ 特性

- 现代化渐变设计，动效克制
- 中英双语切换（语言偏好写入 `localStorage`）
- 完全响应式，适配手机 / 平板 / 桌面
- 纯静态，无构建步骤，无外部 CDN 依赖
- 尊重系统「减少动态效果」设置
- 完整的打印样式（Ctrl+P 可直接存 PDF）
- 结构化数据（JSON-LD）、Open Graph 分享卡、favicon

## 📂 项目结构

```
kchen1028.github.io/
├── index.html              # 主页面（内容源）
├── styles.css              # 样式
├── script.js               # 交互：导航、菜单、滚动动画
├── i18n.js                 # 中英双语翻译 + 语言切换引擎
│
├── profile.jpg / .webp     # 头像（WebP 优先，JPEG 兜底）
├── og-cover.png            # 社交分享卡 1200×630
├── favicon.ico             # 站点图标（多尺寸）
├── favicon-32.png
├── favicon-48.png
├── apple-touch-icon.png    # iOS 添加到主屏
├── icon-512.png
│
├── chenkai-resume.pdf      # 中文简历
├── Kai_Chen_Resume_EN.pdf  # 英文简历
│
├── robots.txt
├── sitemap.xml
├── .nojekyll               # GitHub Pages 配置
└── README.md
```

## 🚀 部署

推送到 `main` 分支即可，GitHub Pages 会自动发布：

```bash
git add .
git commit -m "update"
git push
```

## ✏️ 修改内容

### ⚠️ 文案改两处，否则不生效

页面文案存在**两个地方**：

1. `index.html` —— 元素内的中文（内容源）
2. `i18n.js` —— `zh` 和 `en` 两份字典

运行时 `i18n.js` 会用字典覆盖 `index.html` 的文字。**只改 `index.html` 不会生效**——
必须同时更新 `i18n.js` 里对应的 `zh` 值。

改完可以用仓库外的 `_diff_i18n.py` 校验两份是否一致：

```bash
python _diff_i18n.py     # 输出「不一致: 0」即同步完成
```

### 修改主题色

`styles.css` 顶部的 `:root`：

```css
--primary: #1e3a8a;        /* 主色 */
--primary-light: #3b82f6;  /* 主色亮调 */
--accent: #0ea5e9;         /* 强调色 */
--accent-2: #06b6d4;       /* 第二强调色 */
```

### 替换头像

1. 换掉根目录的 `profile.jpg`
2. 重新生成 WebP：
   ```bash
   python -c "from PIL import Image; im=Image.open('profile.jpg').convert('RGB'); \
   w,h=im.size; im.resize((640,int(h*640/w)), Image.LANCZOS).save('profile.webp','WEBP',quality=74,method=6)"
   ```
3. 同步更新 `og-cover.png`（1200×630 的分享卡）

### 字体

不加载任何外部字体 CDN，走系统字体栈（`styles.css` 的 `body`）。
这是有意为之——Google Fonts 在中国大陆无法访问，会导致首屏长时间白屏。

## 📝 内容模块

| 模块 | 说明 |
|------|------|
| Hero | 个人介绍、核心数据、浮动卡片 |
| 关于我 | 个人简介 + 基本信息卡片 |
| 工作经历 | 时间线形式展示职业历程 |
| 项目经验 | 卡片式展示核心项目，含量化成果 |
| 教育背景 | 学历 + 在校荣誉 |
| 专业技能 | 分三类展示，圆点表示熟练度 |
| 荣誉奖项 | 获奖列表 |
| 联系方式 | 邮箱 + 简历下载 |

## 🔒 内容注意

页面为**公开可索引**状态。文案已做脱敏处理：不含客户名称和
具体性能参数，只保留相对改善幅度。

**例外：「天行电芯」是刻意保留的**——它是对外公开发布的产品名，
不属于内部代号。`_validate_site.py` 的脱敏黑名单里已排除该词。

新增内容时请沿用这个原则（客户名与具体参数脱敏，公开产品名可留）。

## 📄 License

个人使用，仅供简历展示。
