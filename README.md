# AI 简历优化系统

一个基于 Next.js 和 AI 的简历优化工具，帮助用户根据目标岗位描述智能优化简历内容。

## 功能特性

- 🤖 **AI 智能优化**：使用 AI 模型分析简历和岗位描述，提供个性化优化建议
- 🔧 **灵活配置**：支持自定义 API 地址、模型和密钥
- ✅ **接口测试**：内置连接测试功能，确保配置正确
- 💾 **本地存储**：配置和简历数据保存在浏览器本地存储中
- 📋 **一键复制**：优化结果支持快速复制到剪贴板
- 🎨 **现代化 UI**：基于 Tailwind CSS 的精美界面设计

## 技术栈

- **前端框架**：Next.js 15 (App Router)
- **UI 组件**：React + Tailwind CSS
- **动画效果**：Framer Motion
- **图标库**：React Icons
- **样式方案**：Tailwind CSS v4

## 项目结构

```
ai_resume_optimization/
├── app/
│   ├── ai-config/          # AI 配置页面
│   │   └── page.tsx       # API 配置和测试
│   ├── resume/             # 简历优化页面
│   │   └── page.tsx       # 简历信息填写和 AI 优化
│   ├── components/         # 应用组件
│   │   ├── Sidebar.tsx     # 侧边栏导航
│   │   ├── PageHeader.tsx  # 页面头部组件
│   │   └── ContentArea.tsx # 内容区域组件
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 首页
│   └── globals.css         # 全局样式
├── components/
│   └── ui/                # UI 基础组件
│       ├── button.tsx      # 按钮组件
│       ├── card.tsx        # 卡片组件
│       ├── input.tsx       # 输入框组件
│       ├── label.tsx       # 标签组件
│       └── textarea.tsx    # 文本域组件
└── public/                # 静态资源
```

## 快速开始

### 环境要求

- Node.js 18.17 或更高版本
- npm 或 yarn 或 pnpm

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 使用说明

### 1. 配置 AI 接口

首次使用前，需要在 **AI 配置** 页面设置以下信息：

- **API Base URL**：AI 服务的基础 URL
  - 例如：`https://ark.ap-southeast.bytepluses.com`
- **API Key**：访问密钥
  - 从 AI 服务提供商获取
- **模型名称**：使用的 AI 模型
  - 例如：`deepseek-v3-2-251201`

配置完成后，点击 **测试连接** 按钮验证配置是否正确，然后点击 **保存配置**。

### 2. 填写简历信息

在 **简历优化** 页面填写以下信息：

- 基本信息：姓名、年龄、联系方式等
- 教育经历：学校、专业、学历、毕业时间等
- 证书与学术成果：获得的证书、发表的论文、学术奖项等
- 创新项目经历：项目名称、项目描述、角色和贡献等
- 工作经历：公司、职位、工作内容、主要成就等
- 个人能力：专业技能、软技能、语言能力等
- 个人评估：自我评价、职业规划等
- 技术栈：掌握的技术和工具
- 期望岗位描述：目标岗位的招聘要求

### 3. 获取优化建议

点击 **开始优化** 按钮，AI 将根据您的简历和目标岗位描述进行分析，并提供以下内容：

- 简历优化建议：按照序号分点列出优化建议
- 职业建议：如果需要，AI 会提供职业发展建议

### 4. 保存结果

- 点击 **复制** 按钮将优化结果复制到剪贴板
- 点击 **保存信息** 按钮保存当前简历信息

## API 格式

系统使用标准的 OpenAI 兼容 API 格式：

```typescript
POST /v3/chat/completions
Content-Type: application/json
Authorization: Bearer <your-api-key>

{
  "model": "your-model-name",
  "messages": [
    {
      "role": "system",
      "content": "你是一个简历优化的人工智能..."
    },
    {
      "role": "user",
      "content": "下面是我的简历基本信息..."
    }
  ]
}
```

## 数据存储

所有配置和数据都存储在浏览器的 `localStorage` 中：

- `aiConfig`：AI 配置信息
- `resumeData`：简历信息

## 浏览器支持

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## 开发

### 代码规范

项目使用 ESLint 进行代码检查：

```bash
npm run lint
```

### 类型检查

项目使用 TypeScript 进行类型检查：

```bash
npm run type-check
```

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 Issue
- 发送邮件

---

**注意**：本工具仅用于简历优化建议，不保证一定能获得面试机会。请根据实际情况合理使用优化建议。
