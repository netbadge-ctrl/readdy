# Lovable Dashboard Clone

## 1. Project Description
仿制 Lovable.dev 的 Dashboard 界面，包含登录页面和项目管理仪表盘。目标用户为开发者和产品创建者，核心价值是提供一个 AI 驱动的项目创建与管理平台界面。

## 2. Page Structure
- `/` - 登录页面（Log in）
- `/dashboard` - 仪表盘主页（项目列表、创建新项目）

## 3. Core Features
- [x] 登录页面（Google/GitHub 登录按钮 + 邮箱登录）
- [x] 右侧渐变装饰区域（AI 输入框展示）
- [ ] Dashboard 主页（项目卡片列表）
- [ ] 新建项目入口
- [ ] 顶部导航栏

## 4. Data Model Design
无需数据库，使用 Mock 数据展示项目列表。

## 5. Backend / Third-party Integration Plan
- Supabase: 不需要
- Shopify: 不需要
- Stripe: 不需要

## 6. Development Phase Plan

### Phase 1: 登录页面
- Goal: 构建与 Lovable 一致的登录页面 UI
- Deliverable: 完整的登录页面，包含左侧表单和右侧渐变装饰

### Phase 2: Dashboard 主页
- Goal: 构建项目管理仪表盘
- Deliverable: 带有项目卡片、搜索、新建项目功能的仪表盘页面
