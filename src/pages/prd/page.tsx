import { useState } from "react";

const sections = [
  { id: "overview", label: "产品概述" },
  { id: "users", label: "目标用户" },
  { id: "features", label: "核心功能" },
  { id: "pages", label: "页面说明" },
  { id: "pages-plan-mode", label: "  ↳ /generating Plan 交互流程", sub: true },
  { id: "pages-select-edit", label: "  ↳ /generating 选择编辑模式", sub: true },
  { id: "flow", label: "用户流程" },
  { id: "tech", label: "技术架构" },
  { id: "tech-two-phase", label: "  ↳ 两阶段生成", sub: true },
  { id: "tech-plan-mode", label: "  ↳ Plan 模式", sub: true },
  { id: "tech-data-schema", label: "  ↳ 数据结构设计", sub: true },
  { id: "tech-intent", label: "  ↳ 意图确认机制", sub: true },
  { id: "tech-context", label: "  ↳ 上下文检索策略", sub: true },
  { id: "tech-token", label: "  ↳ Token 成本控制", sub: true },
  { id: "tech-iteration", label: "  ↳ AI 能力迭代", sub: true },
  { id: "nonfunc", label: "非功能需求" },
  { id: "roadmap", label: "版本规划" },
];

export default function PRDPage() {
  const [active, setActive] = useState("overview");

  const scrollTo = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="flex min-h-screen bg-[#faf9f7]"
      style={{ fontFamily: "'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif" }}
    >
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 flex-shrink-0 sticky top-0 h-screen border-r border-gray-100 bg-white px-4 py-8">
        <div className="flex items-center gap-2 mb-8 px-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #e8b84b 0%, #d4a030 100%)" }}
          >
            <i className="ri-qr-code-line text-white text-sm" />
          </div>
          <span className="font-bold text-sm text-gray-900">金山云码</span>
          <span className="ml-auto text-[10px] text-gray-400 bg-gray-100 rounded px-1.5 py-0.5">PRD</span>
        </div>

        <nav className="flex flex-col gap-0.5">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`text-left px-3 py-2 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                (s as { sub?: boolean }).sub ? "text-[10px] pl-4" : "text-xs"
              } ${
                active === s.id
                  ? "bg-amber-50 text-amber-700"
                  : (s as { sub?: boolean }).sub
                  ? "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-100">
          <p className="text-[10px] text-gray-400 px-2">文档版本 v1.1</p>
          <p className="text-[10px] text-gray-400 px-2 mt-0.5">更新于 2026-04-10</p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-8 py-12">

          {/* Title */}
          <div className="mb-12">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4"
              style={{ background: "rgba(232,184,75,0.12)", color: "#b8860b" }}
            >
              <i className="ri-file-text-line" />
              产品需求文档 · Product Requirements Document
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">金山云码</h1>
            <p className="text-base text-gray-500 leading-relaxed">
              面向产品经理的 AI 驱动原型生成工具，通过自然语言描述需求，秒级输出高保真可交互原型。
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-5">
              {[
                { label: "文档版本", value: "v1.0" },
                { label: "产品阶段", value: "MVP" },
                { label: "更新日期", value: "2026-04-10" },
                { label: "负责人", value: "产品团队" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-400">{item.label}：</span>
                  <span className="font-medium text-gray-700">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-14">

            {/* ── 1. 产品概述 ── */}
            <section id="overview">
              <SectionTitle icon="ri-lightbulb-line" title="1. 产品概述" />
              <div className="flex flex-col gap-6">
                <Card>
                  <SubTitle>产品定位</SubTitle>
                  <p className="text-sm text-gray-600 leading-7">
                    金山云码是一款面向产品经理的 <strong>AI 原型生成工具</strong>，用户只需用自然语言描述功能需求，系统即可自动生成包含完整交互逻辑的高保真原型页面。核心定位是消除「需求描述 → 原型设计」之间的时间损耗，让产品经理专注于业务创新而非工具操作。
                  </p>
                </Card>
                <Card>
                  <SubTitle>核心价值主张</SubTitle>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                    {[
                      {
                        icon: "ri-chat-voice-line",
                        title: "自然语言驱动",
                        desc: "无需学习设计工具，用文字描述需求，AI 自动理解并生成页面结构与交互",
                      },
                      {
                        icon: "ri-layout-masonry-line",
                        title: "高保真原型",
                        desc: "生成可点击、可交互的完整原型，还原真实产品体验，可直接用于评审",
                      },
                      {
                        icon: "ri-loop-right-line",
                        title: "实时迭代修改",
                        desc: "对话式修改机制，随时调整布局、内容与交互逻辑，版本自动归档",
                      },
                    ].map((v) => (
                      <div key={v.title} className="bg-amber-50/60 rounded-xl p-4 border border-amber-100/60">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                          style={{ background: "rgba(232,184,75,0.2)" }}
                        >
                          <i className={`${v.icon} text-sm`} style={{ color: "#c8960a" }} />
                        </div>
                        <p className="text-xs font-semibold text-gray-800 mb-1.5">{v.title}</p>
                        <p className="text-xs text-gray-500 leading-5">{v.desc}</p>
                      </div>
                    ))}
                  </div>
                </Card>
                <Card>
                  <SubTitle>产品边界</SubTitle>
                  <div className="flex flex-col gap-2 mt-1">
                    {[
                      { type: "in", text: "通过自然语言生成可交互 Web 原型（PC 端 & 移动端）" },
                      { type: "in", text: "对话式修改原型，支持版本历史与回滚" },
                      { type: "in", text: "项目管理：创建、命名、复制、分享、删除项目" },
                      { type: "in", text: "多页面支持：单项目内可生成多个页面并自由切换" },
                      { type: "out", text: "不支持导出为 Figma / Sketch 等格式（后续版本规划）" },
                      { type: "out", text: "不包含设计系统管理与组件库自定义功能" },
                      { type: "out", text: "不包含代码部署与上线能力" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-gray-600">
                        <span
                          className={`mt-0.5 w-4 h-4 flex-shrink-0 flex items-center justify-center rounded-full text-white text-[10px] ${
                            item.type === "in" ? "bg-green-400" : "bg-gray-300"
                          }`}
                        >
                          <i className={item.type === "in" ? "ri-check-line" : "ri-subtract-line"} />
                        </span>
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </section>

            {/* ── 2. 目标用户 ── */}
            <section id="users">
              <SectionTitle icon="ri-group-line" title="2. 目标用户" />
              <div className="flex flex-col gap-4">
                {[
                  {
                    type: "主要用户",
                    persona: "产品经理（PM）",
                    pain: "原型设计耗时长，依赖设计工具学习成本高；需求沟通中频繁返工；评审前需花大量时间搭建原型。",
                    gain: "几分钟内获得可用于评审的原型；对话式迭代取代反复改图；降低对设计师的依赖。",
                    bg: "bg-amber-50/50 border-amber-100",
                    iconColor: "text-amber-500 bg-amber-100",
                  },
                  {
                    type: "次要用户",
                    persona: "UX 设计师",
                    pain: "需要快速验证交互方案的可行性；低保真线框图到高保真原型转换耗时。",
                    gain: "快速生成备选方案进行对比；加速设计决策流程。",
                    bg: "bg-gray-50 border-gray-100",
                    iconColor: "text-gray-500 bg-gray-100",
                  },
                  {
                    type: "潜在用户",
                    persona: "创业者 / 独立开发者",
                    pain: "没有专职设计师，无法快速可视化产品想法。",
                    gain: "低门槛将想法转化为可演示原型，加速融资演示或用户测试。",
                    bg: "bg-gray-50 border-gray-100",
                    iconColor: "text-gray-500 bg-gray-100",
                  },
                ].map((u) => (
                  <div key={u.persona} className={`rounded-xl border p-5 ${u.bg}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full ${u.iconColor}`}>
                        <i className="ri-user-line text-sm" />
                      </div>
                      <div>
                        <span className="text-xs text-gray-400">{u.type}</span>
                        <p className="text-sm font-semibold text-gray-900">{u.persona}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-1.5">痛点</p>
                        <p className="text-xs text-gray-600 leading-5">{u.pain}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-1.5">价值获得</p>
                        <p className="text-xs text-gray-600 leading-5">{u.gain}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── 3. 核心功能 ── */}
            <section id="features">
              <SectionTitle icon="ri-function-line" title="3. 核心功能清单" />
              <div className="flex flex-col gap-3">
                {[
                  {
                    module: "身份认证",
                    priority: "P0",
                    features: [
                      { name: "扫码登录", desc: "使用 WPS协作 App 扫描二维码完成身份认证，二维码有效期 60 秒，过期自动刷新" },
                      { name: "登录状态保持", desc: "登录成功后跳转工作台，保持登录状态直至主动退出" },
                    ],
                  },
                  {
                    module: "工作台（Dashboard）",
                    priority: "P0",
                    features: [
                      { name: "AI 输入框", desc: "顶部 AI 对话框，支持自然语言输入、图片上传、文件上传（PDF/Word/MD）、引用已有页面" },
                      { name: "平台切换", desc: "支持选择生成目标平台：PC 端 / 移动端，决定原型的设备形态" },
                      { name: "项目卡片列表", desc: "展示用户所有项目，含缩略图、平台标签、更新时间，按最近更新排序" },
                      { name: "项目搜索", desc: "实时过滤项目名称" },
                      { name: "项目操作", desc: "支持重命名、复制项目、分享链接、删除项目（含二次确认弹窗）" },
                    ],
                  },
                  {
                    module: "原型生成器",
                    priority: "P0",
                    features: [
                      { name: "实时生成预览", desc: "提交需求后进入生成页，左侧实时渲染生成中的原型预览，含骨架屏过渡动画" },
                      { name: "AI 工作台侧边栏", desc: "右侧展示 AI 执行步骤（读取文件、待办列表、创建/修改文件、构建检查），含计时器" },
                      { name: "对话式迭代", desc: "生成完成后可继续在侧边栏输入修改需求，支持粘贴图片、上传附件" },
                      { name: "停止生成", desc: "生成过程中可点击停止按钮中断当前任务" },
                      { name: "多页面管理", desc: "顶部地址栏下拉支持切换页面、重命名页面、新建页面，含页面缩略图" },
                    ],
                  },
                  {
                    module: "版本管理",
                    priority: "P1",
                    features: [
                      { name: "版本自动归档", desc: "每次 AI 完成一次修改后自动生成版本记录，含版本号和时间戳" },
                      { name: "版本历史面板", desc: "右侧版本历史面板展示所有版本，含生成描述" },
                      { name: "版本回滚", desc: "支持回滚到任意历史版本" },
                    ],
                  },
                  {
                    module: "选择编辑",
                    priority: "P1",
                    features: [
                      { name: "选择编辑模式入口", desc: "命令框左下角「选择编辑」按钮，点击后开启元素选择模式，预览区顶部展示橙色提示横幅" },
                      { name: "元素高亮选中", desc: "模式激活后鼠标移入可编辑元素时出现橙色描边高亮，元素左上角展示类型标签（如「标题」「CTA 按钮」「产品卡片」）" },
                      { name: "修改文字", desc: "点击元素后弹出操作面板，切换到「修改文字」Tab，在多行文本框中直接修改，点击「应用」立即生效" },
                      { name: "编辑链接", desc: "切换到「编辑链接」Tab，输入外部链接（https://）或站内路径（/page），应用后保存到该元素" },
                      { name: "删除元素", desc: "切换到「删除」Tab，二次确认后从预览中移除该元素，支持品牌名、导航项、按钮、Hero 区内容、卡片、页脚等所有主要元素" },
                      { name: "退出选择编辑", desc: "点击顶部横幅的「退出」按钮或再次点击「选择编辑」按钮关闭模式，恢复正常交互" },
                    ],
                  },
                  {
                    module: "代码查看",
                    priority: "P1",
                    features: [
                      { name: "代码预览", desc: "顶部切换 Tab 可查看当前原型对应的前端代码（只读）" },
                    ],
                  },
                  {
                    module: "个人设置",
                    priority: "P1",
                    features: [
                      { name: "订阅与积分", desc: "展示当前套餐（Pro/Free）、积分余额、使用进度条、近期消耗记录、积分重置日期" },
                      { name: "外观偏好", desc: "支持浅色 / 深色 / 跟随系统三种主题" },
                      { name: "提交快捷键", desc: "可选 Enter 发送 或 ⌘+Enter 发送两种模式" },
                      { name: "退出登录", desc: "含二次确认弹窗，退出后跳转登录页" },
                    ],
                  },
                ].map((mod) => (
                  <div key={mod.module} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-3 border-b border-gray-50 bg-gray-50/50">
                      <span className="text-xs font-semibold text-gray-800">{mod.module}</span>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          mod.priority === "P0"
                            ? "bg-red-50 text-red-500"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {mod.priority}
                      </span>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {mod.features.map((f) => (
                        <div key={f.name} className="flex gap-3 px-5 py-3">
                          <div className="flex-shrink-0 mt-0.5 w-4 h-4 flex items-center justify-center">
                            <i className="ri-checkbox-circle-fill text-green-400 text-sm" />
                          </div>
                          <div>
                            <span className="text-xs font-medium text-gray-800">{f.name}</span>
                            <p className="text-xs text-gray-500 mt-0.5 leading-5">{f.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── 4. 页面说明 ── */}
            <section id="pages">
              <SectionTitle icon="ri-pages-line" title="4. 页面说明" />
              <div className="flex flex-col gap-4">
                {[
                  {
                    route: "/login 或 /qr-login",
                    name: "登录页",
                    desc: "用户入口页，左侧展示产品价值主张，右侧展示二维码登录区域。",
                    elements: [
                      "左侧面板：品牌 Logo、产品核心功能介绍（AI 驱动、高保真原型、实时迭代）、版权信息",
                      "右侧：产品名称、二维码图案（含扫描线动画、四角边框装饰、倒计时）",
                      "状态机：waiting（等待扫码）→ scanned（已扫码）→ confirmed（已确认）→ 跳转工作台",
                      "二维码过期后展示刷新覆层，点击刷新重置倒计时",
                      "底部：服务协议 & 隐私政策链接",
                    ],
                  },
                  {
                    route: "/dashboard",
                    name: "工作台首页",
                    desc: "登录后的主页面，提供 AI 输入入口和项目管理功能。",
                    elements: [
                      "顶部栏：用户头像（右上角）",
                      "Hero 区域：AI 输入框（支持文字、图片、文件、引用页面，平台选择器，发送按钮）",
                      "项目区域：标题栏（搜索框、排序标签）+ 项目卡片 Grid（4 列，响应式）",
                      "项目卡片：缩略图、平台标签（PC/移动端）、项目名（支持内联重命名）、更新时间、创建时间",
                      "卡片 Hover：更多操作菜单（重命名、复制、分享、删除）",
                      "空状态：无项目或搜索无结果时展示引导图示",
                    ],
                  },
                  {
                    route: "/generating",
                    name: "原型生成页",
                    desc: "核心功能页面，承载原型生成、预览、代码查看、AI 对话迭代全流程。包含 Plan 模式与普通模式两种工作流，以及选择编辑模式用于直接修改原型内容。",
                    elements: [
                      "顶部导航栏：返回按钮、项目名（可内联编辑）、地址栏（多页面切换下拉）、预览/代码 Tab、刷新/分享/版本历史/复制项目按钮、用户头像",
                      "主区域左侧：原型预览面板（PC 全屏 / 移动端手机壳包裹），选择编辑模式下顶部显示橙色提示横幅",
                      "主区域右侧：AI 工作台面板（消息列表 + 输入框）或版本历史面板（切换）",
                      "AI 工作台：用户消息气泡（深色）+ AI 执行步骤卡片（含 Todo 动画）+ 完成后的回复 + 版本气泡",
                      "版本气泡：展示版本号和时间，支持下拉菜单（回滚/预览）",
                      "输入框底部工具栏：图片上传、文档上传、「选择编辑」按钮（激活时高亮橙色）、发送/停止按钮",
                      "选择编辑：开启后预览区元素 hover 时显示橙色描边 + 类型标签，点击元素弹出操作浮层（修改文字 / 编辑链接 / 删除三个 Tab）",
                      "生成进度：读取文件 → AI 思考 → 创建/修改文件 → 构建检查，逐步展示",
                    ],
                  },
                  {
                    route: "/settings",
                    name: "个人设置页",
                    desc: "账户管理与偏好配置页面。",
                    elements: [
                      "顶部：返回按钮、用户头像",
                      "订阅与积分卡片：套餐标签、积分进度条、近期消耗记录列表、升级计划按钮",
                      "使用设置卡片：外观偏好（3 选 1 图标按钮）、提交快捷键（2 选 1 选项卡）",
                      "退出登录卡片：退出按钮 + 确认弹窗（含取消 / 确认）",
                    ],
                  },
                ].map((page) => (
                  <div key={page.route} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-50">
                      <div className="flex items-center gap-2 mb-1">
                        <code className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono">{page.route}</code>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">{page.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{page.desc}</p>
                    </div>
                    <div className="px-5 py-4">
                      <p className="text-xs font-medium text-gray-500 mb-3">页面元素</p>
                      <div className="flex flex-col gap-1.5">
                        {page.elements.map((el, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                            <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-amber-400" />
                            {el}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Plan 模式 UI 专项说明 ── */}
            <section id="pages-plan-mode">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-amber-50">
                  <i className="ri-route-line text-sm" style={{ color: "#c8960a" }} />
                </div>
                <h2 className="text-base font-bold text-gray-900">4-A. /generating 页：Plan 模式 UI 交互流程</h2>
                <div className="flex-1 h-px bg-gray-100 ml-2" />
              </div>

              <div className="flex flex-col gap-5">
                {/* 触发入口 */}
                <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">触发入口与模式切换</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    {[
                      {
                        icon: "ri-toggle-line",
                        title: "输入框旁开关",
                        desc: "AI 工作台输入框右侧有「Plan 模式」切换开关，用户可手动开启。开启后输入框下方展示提示文字「将先输出执行计划，确认后再生成」",
                        badge: "手动触发",
                        badgeColor: "bg-gray-100 text-gray-500",
                      },
                      {
                        icon: "ri-magic-line",
                        title: "系统自动触发",
                        desc: "首次生成原型、涉及 3 个以上文件的改动时，系统自动切换至 Plan 模式，输入框下方短暂展示「已自动切换至 Plan 模式」提示条（3s 后消失）",
                        badge: "自动触发",
                        badgeColor: "bg-amber-100 text-amber-700",
                      },
                      {
                        icon: "ri-skip-forward-line",
                        title: "快速跳过",
                        desc: "用户在计划卡片展示后可点击「跳过，直接执行」按钮，系统忽略计划确认阶段，直接进入执行。跳过后本次不再展示计划。",
                        badge: "可跳过",
                        badgeColor: "bg-green-100 text-green-700",
                      },
                    ].map((item) => (
                      <div key={item.title} className="bg-gray-50 rounded-xl border border-gray-100 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-white border border-gray-100">
                            <i className={`${item.icon} text-gray-500 text-xs`} />
                          </div>
                          <span className="text-xs font-bold text-gray-800">{item.title}</span>
                          <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full font-medium ${item.badgeColor}`}>{item.badge}</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-5">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 四阶段交互流程 */}
                <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">四阶段 UI 交互流程（右侧 AI 工作台面板）</p>
                  <div className="flex flex-col gap-0">
                    {[
                      {
                        phase: "阶段 1",
                        title: "用户发送需求",
                        color: "bg-gray-100 text-gray-600",
                        lineColor: "bg-gray-200",
                        ui: [
                          "用户消息以深色气泡展示在 AI 工作台消息列表顶部",
                          "气泡右下角显示「Plan 模式」标签角标（橙色小徽章）",
                          "输入框变为禁用态，停止按钮出现，同时显示「AI 正在分析需求…」加载动画",
                        ],
                        preview: "用户气泡 + Plan 模式标签 + 加载动画",
                      },
                      {
                        phase: "阶段 2",
                        title: "AI 输出执行计划",
                        color: "bg-amber-100 text-amber-700",
                        lineColor: "bg-amber-200",
                        ui: [
                          "AI 先输出 1-2 句「需求理解复述」文本气泡（白色背景，左对齐）",
                          "紧接着展示「执行计划」卡片区域，以浅黄色背景区域包裹，标题为「执行计划 · 共 N 个步骤」",
                          "每个文件操作是一张独立卡片：左侧操作类型标签（新建/绿色、修改/蓝灰、删除/红色）+ 文件路径（等宽字体）+ 改动摘要（1-2 行）",
                          "整个计划区域底部固定两个按钮：「确认执行」（主色调填充）和「跳过，直接执行」（灰色文字）",
                        ],
                        preview: "需求复述气泡 + 计划卡片列表 + 底部操作按钮",
                      },
                      {
                        phase: "阶段 3",
                        title: "用户确认 / 编辑计划",
                        color: "bg-green-100 text-green-700",
                        lineColor: "bg-green-200",
                        ui: [
                          "每张文件操作卡片的改动摘要区域支持点击进入编辑态（光标变为文字输入形态，输入框带浅色边框高亮）",
                          "每张卡片右上角有「×」删除按钮，点击后该步骤卡片以淡出动画消失，顺序重排",
                          "计划卡片列表底部有「＋ 添加步骤」按钮（虚线边框样式），点击后在末尾追加一张空白编辑卡片",
                          "所有编辑都是实时的、无需保存的，「确认执行」按钮始终反映最新计划状态",
                          "用户点击「确认执行」后：按钮变为加载态，计划卡片整体锁定（不可再编辑），顶部出现进度条",
                        ],
                        preview: "可编辑卡片 + 删除/追加操作 + 确认执行按钮",
                      },
                      {
                        phase: "阶段 4",
                        title: "按计划逐步执行",
                        color: "bg-blue-100 text-blue-700",
                        lineColor: "bg-transparent",
                        ui: [
                          "计划卡片列表保留在工作台消息流中，进入「执行状态视图」：每张卡片左侧状态图标动态更新（待执行→灰色圆圈、执行中→旋转加载环+耗时计数、已完成→绿色勾+耗时）",
                          "当前执行中的文件卡片整体高亮（左侧 2px 橙色边框），其余卡片保持半透明",
                          "左侧预览面板实时更新：每个文件执行完成后，预览 iframe 自动刷新展示最新原型",
                          "所有步骤完成后：计划卡片下方追加 AI 完成回复气泡（含版本号、耗时、本次修改摘要），同时追加版本气泡",
                          "输入框恢复可用，停止按钮消失，用户可继续输入下一轮需求",
                        ],
                        preview: "计划卡片状态动画 + 预览实时刷新 + 完成气泡",
                      },
                    ].map((s, i, arr) => (
                      <div key={s.phase} className="flex gap-4">
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${s.color}`}>
                            {i + 1}
                          </div>
                          {i < arr.length - 1 && <div className={`w-0.5 flex-1 ${s.lineColor} my-1`} />}
                        </div>
                        <div className="pb-5 flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="text-sm font-semibold text-gray-800">{s.title}</p>
                            <span className="text-[10px] text-gray-400 bg-gray-50 border border-gray-100 rounded px-1.5 py-0.5 font-mono">{s.phase}</span>
                          </div>
                          <div className="flex flex-col gap-1.5 mb-2.5">
                            {s.ui.map((item, j) => (
                              <div key={j} className="flex items-start gap-2 text-xs text-gray-600">
                                <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-amber-300" />
                                {item}
                              </div>
                            ))}
                          </div>
                          <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-100 inline-flex items-center gap-1.5">
                            <i className="ri-eye-line text-gray-400 text-xs" />
                            <span className="text-[10px] text-gray-500 font-medium">视觉呈现：{s.preview}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 状态异常与中断处理 */}
                <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Plan 模式下的异常与中断处理</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        scene: "用户在计划输出阶段点击停止",
                        handle: "计划卡片停止渲染，展示已生成的部分计划（如有），显示「已停止 · 可修改计划后重新发送」提示，输入框恢复可用",
                        icon: "ri-stop-circle-line",
                        color: "text-red-400",
                      },
                      {
                        scene: "用户在执行阶段点击停止",
                        handle: "当前文件操作立即中止，已完成的步骤卡片保持绿色勾状态，当前步骤卡片变为「已中止」橙色状态，后续步骤保持灰色待执行。展示「已停止 · 原型为部分更新状态」提示",
                        icon: "ri-pause-circle-line",
                        color: "text-amber-500",
                      },
                      {
                        scene: "执行某步骤时构建失败",
                        handle: "失败步骤卡片显示红色「×」状态 + 错误简述，后续步骤暂停。展示「构建失败 · AI 正在自动修复…」提示，AI 自动重试一次；重试失败后提示用户「自动修复失败，建议回滚至上一版本」",
                        icon: "ri-error-warning-line",
                        color: "text-red-500",
                      },
                      {
                        scene: "用户删除全部计划步骤",
                        handle: "「确认执行」按钮变为禁用态，展示「请至少保留一个步骤」提示文字。「＋ 添加步骤」按钮保持可用，引导用户手动添加",
                        icon: "ri-delete-bin-line",
                        color: "text-gray-400",
                      },
                    ].map((item, i) => (
                      <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                            <i className={`${item.icon} ${item.color} text-sm`} />
                          </div>
                          <span className="text-xs font-semibold text-gray-800">{item.scene}</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-5">{item.handle}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 与普通模式的 UI 对比 */}
                <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Plan 模式 vs 普通模式 · UI 视觉对比</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="text-left text-gray-500 font-medium pb-2 pr-4 w-32">UI 位置</th>
                          <th className="text-left text-gray-500 font-medium pb-2 pr-4">普通模式</th>
                          <th className="text-left text-gray-500 font-medium pb-2">Plan 模式</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {[
                          { pos: "用户气泡", normal: "纯文字气泡", plan: "气泡右下角附加「Plan」橙色角标" },
                          { pos: "AI 响应区", normal: "直接展示执行步骤进度卡片", plan: "先展示计划卡片列表（可编辑），用户确认后才展示执行步骤" },
                          { pos: "输入框区域", normal: "生成中禁用，显示停止按钮", plan: "计划阶段显示「确认执行」「跳过」按钮，执行阶段才禁用并显示停止按钮" },
                          { pos: "执行步骤视图", normal: "每个步骤独立展示，无整体编号", plan: "步骤来自计划列表，有序编号，状态图标对应计划卡片实时更新" },
                          { pos: "完成回复气泡", normal: "AI 完成说明 + 版本气泡", plan: "AI 完成说明 + 「已按计划执行 N/N 步」摘要 + 版本气泡" },
                        ].map((row, i) => (
                          <tr key={i}>
                            <td className="py-2.5 pr-4 font-medium text-gray-700 align-top">{row.pos}</td>
                            <td className="py-2.5 pr-4 text-gray-500 align-top">{row.normal}</td>
                            <td className="py-2.5 text-amber-700 font-medium align-top">{row.plan}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            {/* ── 4-B. 选择编辑模式专项说明 ── */}
            <section id="pages-select-edit">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-orange-50">
                  <i className="ri-cursor-line text-sm" style={{ color: "#f97316" }} />
                </div>
                <h2 className="text-base font-bold text-gray-900">4-B. /generating 页：选择编辑模式 UI 交互流程</h2>
                <div className="flex-1 h-px bg-gray-100 ml-2" />
              </div>

              <div className="flex flex-col gap-5">
                {/* 功能概述 */}
                <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">功能定位</p>
                  <p className="text-sm text-gray-600 leading-7 mb-4">
                    选择编辑模式是对 AI 对话式修改的<strong>轻量补充路径</strong>——用户无需描述需求、等待 AI 理解，而是直接在预览中「点哪改哪」，即时完成文字修改、链接绑定和元素删除三类操作。适用于不涉及结构变更的精细化内容微调。
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        icon: "ri-cursor-line",
                        title: "直接点选",
                        desc: "无需文字描述，鼠标移到预览里的任意元素上即可高亮选中，直接操作",
                        badge: "核心体验",
                        badgeColor: "bg-orange-100 text-orange-600",
                      },
                      {
                        icon: "ri-time-line",
                        title: "实时生效",
                        desc: "三种操作（修改文字 / 编辑链接 / 删除）点击应用后立即在预览中体现，无需重新生成",
                        badge: "即时反馈",
                        badgeColor: "bg-green-100 text-green-700",
                      },
                      {
                        icon: "ri-chat-ai-line",
                        title: "与 AI 互补",
                        desc: "选择编辑只处理内容层改动；结构性变更（新增模块、调整布局）仍需通过 AI 对话完成",
                        badge: "定位补充",
                        badgeColor: "bg-gray-100 text-gray-600",
                      },
                    ].map((item) => (
                      <div key={item.title} className="bg-gray-50 rounded-xl border border-gray-100 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-white border border-gray-100">
                            <i className={`${item.icon} text-gray-500 text-xs`} />
                          </div>
                          <span className="text-xs font-bold text-gray-800">{item.title}</span>
                          <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full font-medium ${item.badgeColor}`}>{item.badge}</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-5">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 完整交互流程 */}
                <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">完整交互流程（五步）</p>
                  <div className="flex flex-col gap-0">
                    {[
                      {
                        step: "Step 1",
                        title: "激活选择编辑模式",
                        color: "bg-orange-100 text-orange-600",
                        lineColor: "bg-orange-200",
                        ui: [
                          "命令框底部工具栏左侧有「选择编辑」按钮（光标图标 + 文字标签）",
                          "点击后按钮变为橙色高亮激活态（bg-orange-100 text-orange-600）",
                          "预览区顶部出现全宽橙色提示横幅：「选择编辑模式已开启 — 点击页面中的元素进行编辑」，右侧有「退出」按钮",
                          "命令框输入区域同时出现橙色提示条：「点击预览中的元素进行编辑」+ 退出链接",
                        ],
                        preview: "橙色横幅 + 按钮激活态",
                      },
                      {
                        step: "Step 2",
                        title: "悬停元素高亮",
                        color: "bg-orange-100 text-orange-600",
                        lineColor: "bg-orange-200",
                        ui: [
                          "鼠标移入可编辑元素区域时，该元素出现 2px 橙色描边（outline: 2px solid #f97316）",
                          "元素左上角浮现类型标签（如「品牌名」「导航项」「标题」「主按钮」「产品卡片」「数据项」「版权信息」等），标签为橙色背景白色文字，10px 字体",
                          "鼠标指针变为 pointer（crosshair 叠加层在 pointer-events: none 的覆盖层上），不影响原始元素点击区域",
                          "支持高亮的元素类型：品牌名、导航项目（6 个）、登录/CTA 按钮、Hero 区徽章/标题/副标题/主次按钮/标签（3 个）、核心产品卡片（8 个）、数据统计项（4 个）、解决方案卡片（3 个）、页脚版权文字/链接（4 个）",
                        ],
                        preview: "橙色描边 + 类型标签浮层",
                      },
                      {
                        step: "Step 3",
                        title: "点击选中元素",
                        color: "bg-amber-100 text-amber-700",
                        lineColor: "bg-amber-200",
                        ui: [
                          "点击高亮元素后，在元素正下方弹出「编辑元素」操作浮层（宽 252px，白色背景，圆角卡片，多层阴影）",
                          "浮层顶部展示「编辑元素」标题和右上角「×」关闭按钮",
                          "三个操作 Tab：「修改文字」「编辑链接」「删除」，左侧图标 + 文字，激活态对应橙色或红色高亮",
                          "浮层位置：水平居中于被选元素，垂直位于元素下方 6px；当超出容器右边界时自动向左偏移",
                          "点击浮层外部区域自动关闭",
                        ],
                        preview: "操作浮层 + 三个 Tab",
                      },
                      {
                        step: "Step 4",
                        title: "执行三种操作",
                        color: "bg-green-100 text-green-700",
                        lineColor: "bg-green-200",
                        ui: [
                          "【修改文字】默认激活 Tab；多行文本框展示当前元素文字内容，用户直接修改；点击「应用」后该元素文字立即更新，浮层关闭",
                          "【编辑链接】单行输入框，placeholder 为「https://example.com 或 /page」；下方有说明文字「支持外部链接（https://）或站内路径（/page）」；点击「应用」保存链接到元素，浮层关闭",
                          "【删除】默认展示「确认删除此元素？该操作将从预览中移除此内容。」说明文字，点「删除」进入二次确认态；二次确认展示「确认要删除吗？」+「算了」/「确认删除」；确认后元素从预览中移除（含淡出动画），浮层关闭",
                          "三个 Tab 切换时重置对应状态（取消删除确认态）",
                          "所有操作均有「取消」按钮，点击直接关闭浮层不做任何改动",
                        ],
                        preview: "文字编辑 / 链接输入 / 二次确认删除",
                      },
                      {
                        step: "Step 5",
                        title: "退出选择编辑模式",
                        color: "bg-gray-100 text-gray-600",
                        lineColor: "bg-transparent",
                        ui: [
                          "点击预览区顶部橙色横幅右侧的「退出」按钮",
                          "或在命令框工具栏再次点击「选择编辑」按钮（Toggle 切换）",
                          "或在命令框的橙色提示条点击「退出」文字链接",
                          "退出后：橙色横幅消失、按钮恢复灰色未激活态、所有元素高亮消失、当前已打开的操作浮层同步关闭",
                          "已应用的文字修改和链接编辑、已删除的元素在退出后依然保留（状态持久化到会话）",
                        ],
                        preview: "恢复正常浏览态",
                      },
                    ].map((s, i, arr) => (
                      <div key={s.step} className="flex gap-4">
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${s.color}`}>
                            {i + 1}
                          </div>
                          {i < arr.length - 1 && <div className={`w-0.5 flex-1 ${s.lineColor} my-1`} />}
                        </div>
                        <div className="pb-5 flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="text-sm font-semibold text-gray-800">{s.title}</p>
                            <span className="text-[10px] text-gray-400 bg-gray-50 border border-gray-100 rounded px-1.5 py-0.5 font-mono">{s.step}</span>
                          </div>
                          <div className="flex flex-col gap-1.5 mb-2.5">
                            {s.ui.map((item, j) => (
                              <div key={j} className="flex items-start gap-2 text-xs text-gray-600">
                                <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-orange-300" />
                                {item}
                              </div>
                            ))}
                          </div>
                          <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-100 inline-flex items-center gap-1.5">
                            <i className="ri-eye-line text-gray-400 text-xs" />
                            <span className="text-[10px] text-gray-500 font-medium">视觉呈现：{s.preview}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 可编辑元素类型映射 */}
                <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">可编辑元素类型映射（PC 端首页）</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="text-left text-gray-500 font-medium pb-2 pr-4 w-24">区域</th>
                          <th className="text-left text-gray-500 font-medium pb-2 pr-4">元素标签名</th>
                          <th className="text-left text-gray-500 font-medium pb-2 pr-4">支持修改文字</th>
                          <th className="text-left text-gray-500 font-medium pb-2 pr-4">支持编辑链接</th>
                          <th className="text-left text-gray-500 font-medium pb-2">支持删除</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {[
                          { area: "导航栏", els: "品牌名、导航项（×6）、登录按钮、CTA 按钮", text: "✓", link: "✓（按钮）", del: "✓（导航项）" },
                          { area: "Hero 区", els: "徽章、标题、副标题、主按钮、次按钮、标签（×3）", text: "✓", link: "✓（按钮）", del: "✓（整 Hero 或单元素）" },
                          { area: "核心产品", els: "区块标题、产品卡片（×8）", text: "✓", link: "—", del: "✓（单个卡片）" },
                          { area: "数据统计", els: "数据项（×4，含数字和标签）", text: "✓", link: "—", del: "✓（单个统计项）" },
                          { area: "解决方案", els: "区块标题、解决方案卡片（×3）", text: "✓", link: "—", del: "✓（单个卡片）" },
                          { area: "页脚", els: "版权文字、页脚链接（×4）", text: "✓", link: "✓", del: "✓" },
                        ].map((row, i) => (
                          <tr key={i}>
                            <td className="py-2.5 pr-4 font-medium text-gray-700 align-top">{row.area}</td>
                            <td className="py-2.5 pr-4 text-gray-500 align-top leading-5">{row.els}</td>
                            <td className="py-2.5 pr-4 text-green-600 font-medium align-top">{row.text}</td>
                            <td className="py-2.5 pr-4 text-gray-500 align-top">{row.link}</td>
                            <td className="py-2.5 text-red-400 align-top">{row.del}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 与 AI 对话的能力边界对比 */}
                <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">选择编辑 vs AI 对话 · 能力边界对比</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="text-left text-gray-500 font-medium pb-2 pr-4 w-36">场景</th>
                          <th className="text-left text-gray-500 font-medium pb-2 pr-4">推荐方式</th>
                          <th className="text-left text-gray-500 font-medium pb-2">原因</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {[
                          { scene: "修改按钮文字", way: "选择编辑", wayColor: "text-orange-600", reason: "直接点选应用，无需等待 AI 生成，秒级完成" },
                          { scene: "修改某段描述文案", way: "选择编辑", wayColor: "text-orange-600", reason: "精确定位到目标元素，改完即看，不影响其他内容" },
                          { scene: "绑定导航项跳转链接", way: "选择编辑", wayColor: "text-orange-600", reason: "编辑链接 Tab 直接输入地址，操作路径最短" },
                          { scene: "删除某个产品卡片", way: "选择编辑", wayColor: "text-orange-600", reason: "二次确认删除，精准移除，不误伤其他元素" },
                          { scene: "新增一个功能模块", way: "AI 对话", wayColor: "text-amber-700", reason: "涉及代码结构变更，AI 生成更可靠" },
                          { scene: "调整整体配色 / 字体", way: "AI 对话", wayColor: "text-amber-700", reason: "影响全局样式，需要 AI 理解设计意图统一处理" },
                          { scene: "重新设计页面布局", way: "AI 对话", wayColor: "text-amber-700", reason: "结构性大改，选择编辑无法覆盖此类需求" },
                          { scene: "添加新的交互逻辑", way: "AI 对话", wayColor: "text-amber-700", reason: "需要写代码逻辑，超出纯内容编辑范畴" },
                        ].map((row, i) => (
                          <tr key={i}>
                            <td className="py-2.5 pr-4 text-gray-700 align-top">{row.scene}</td>
                            <td className={`py-2.5 pr-4 font-semibold align-top ${row.wayColor}`}>{row.way}</td>
                            <td className="py-2.5 text-gray-500 leading-5 align-top">{row.reason}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 状态管理与持久化 */}
                <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">前端状态管理要点</p>
                  <div className="flex flex-col gap-3">
                    {[
                      {
                        icon: "ri-map-pin-line",
                        title: "elMap（文字/链接覆盖表）",
                        desc: "以元素 ID 为 Key 的 Map，存储用户修改后的文字内容（key: id）和链接（key: id__href）。渲染时优先读取 elMap 中的值，无覆盖则显示默认值。Map 仅存在于当前会话的 React state 中，刷新页面后重置。",
                      },
                      {
                        icon: "ri-delete-bin-3-line",
                        title: "deletedIds（删除集合）",
                        desc: "存储已被用户删除的元素 ID 集合（Set<string>）。渲染每个可删除元素前先检查 deletedIds，若存在则直接 return null，实现即时视觉隐藏。删除操作不修改底层代码，仅为预览层的视觉状态。",
                      },
                      {
                        icon: "ri-information-line",
                        title: "与 AI 生成的关系",
                        desc: "选择编辑的修改只作用于预览层的 React state，不写入任何代码文件。当用户继续用 AI 对话触发重新生成时，AI 生成的新代码会覆盖预览，elMap 和 deletedIds 会被重置——这是预期行为，因为 AI 生成会从根本上更新原型内容。",
                      },
                      {
                        icon: "ri-focus-3-line",
                        title: "浮层位置计算",
                        desc: "操作浮层位置根据被选元素的 getBoundingClientRect() 相对父容器（containerRef）计算，确保浮层始终显示在预览区内。水平方向：以元素中心对齐，超出右边界时左移。垂直方向：显示在元素下方 6px 处。",
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-gray-100 flex-shrink-0 mt-0.5">
                          <i className={`${item.icon} text-gray-500 text-xs`} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-800 mb-1">{item.title}</p>
                          <p className="text-xs text-gray-500 leading-5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ── 5. 用户流程 ── */}
            <section id="flow">
              <SectionTitle icon="ri-git-branch-line" title="5. 用户流程" />
              <Card>
                <SubTitle>主流程：生成第一个原型</SubTitle>
                <div className="flex flex-col gap-0 mt-3">
                  {[
                    { step: "1", label: "打开产品", desc: "访问金山云码，进入登录页" },
                    { step: "2", label: "扫码登录", desc: "用 WPS协作 App 扫描二维码 → 手机确认 → 自动跳转工作台" },
                    { step: "3", label: "描述需求", desc: "在 AI 输入框中用自然语言描述要生成的页面（支持附上图片、文档、引用已有页面）" },
                    { step: "4", label: "选择平台", desc: "选择 PC 端 或 移动端，点击发送" },
                    { step: "5", label: "等待生成", desc: "右侧 AI 工作台展示执行步骤动画，左侧原型预览实时更新" },
                    { step: "6", label: "查看原型", desc: "生成完成，可点击预览区域体验交互，或切换至代码 Tab 查看源码" },
                    { step: "7", label: "迭代修改", desc: "在右侧输入框描述修改需求，AI 自动更新原型并创建新版本" },
                    { step: "8", label: "版本管理", desc: "点击顶部版本历史按钮，查看所有版本并按需回滚" },
                  ].map((s, i, arr) => (
                    <div key={s.step} className="flex gap-4">
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                          style={{ background: "linear-gradient(135deg, #e8b84b 0%, #d4a030 100%)" }}
                        >
                          {s.step}
                        </div>
                        {i < arr.length - 1 && <div className="w-px flex-1 bg-amber-100 my-1" />}
                      </div>
                      <div className="pb-5">
                        <p className="text-sm font-medium text-gray-800">{s.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5 leading-5">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              <div className="mt-4">
                <Card>
                  <SubTitle>异常流程</SubTitle>
                  <div className="flex flex-col gap-2 mt-2">
                    {[
                      { scene: "二维码过期", handle: "展示刷新覆层，用户点击「刷新」重新获取二维码，倒计时重置为 60 秒" },
                      { scene: "AI 生成耗时过长", handle: "用户可随时点击「停止生成」中断任务，系统展示已停止提示，支持重新提交" },
                      { scene: "项目删除", handle: "点击删除后展示二次确认弹窗，确认后从列表移除，操作不可逆" },
                      { scene: "搜索无结果", handle: "展示空状态插图与提示文字「未找到项目，尝试调整搜索条件」" },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 text-xs bg-gray-50 rounded-lg p-3">
                        <span className="flex-shrink-0 font-medium text-gray-700 w-24">{item.scene}</span>
                        <span className="text-gray-500 leading-5">{item.handle}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </section>

            {/* ── 6. 技术架构 ── */}
            <section id="tech">
              <SectionTitle icon="ri-cpu-line" title="6. 技术架构方案" />
              <div className="flex flex-col gap-5">

                {/* 架构说明 */}
                <Card>
                  <SubTitle>核心机制：AI + 代码执行沙箱</SubTitle>
                  <p className="text-sm text-gray-600 leading-7 mb-4">
                    金山云码的原型生成本质上不是「生成图片」，而是<strong>生成真实可运行的前端代码</strong>，并在浏览器沙箱中实时编译渲染。用户看到的「原型」是真实跑起来的 React 页面，因此天然支持点击、交互、表单等行为。这也是与传统原型工具（Figma、Axure）的根本区别。
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">完整生成流程</p>
                    <div className="flex flex-col gap-0">
                      {[
                        { step: "①", label: "用户输入", desc: "自然语言需求 + 可选附件（图片、文档、已有页面引用）" },
                        { step: "②", label: "上下文打包", desc: "后端将需求 + 当前代码文件树 + 完整对话历史组装成 Prompt，发送给大模型" },
                        { step: "③", label: "AI 代码生成", desc: "大模型（Claude 3.5 Sonnet / GPT-4o）输出 React + TailwindCSS 代码，通过 SSE 流式返回" },
                        { step: "④", label: "沙箱编译执行", desc: "WebContainer 或 E2B Sandbox 在浏览器内实时编译代码，输出可交互的 HTML 页面" },
                        { step: "⑤", label: "iframe 渲染预览", desc: "前端通过 iframe 嵌入沙箱输出，用户实时看到原型效果" },
                        { step: "⑥", label: "版本归档", desc: "每次生成完成后，将代码快照存入版本历史，支持回滚" },
                      ].map((s, i, arr) => (
                        <div key={s.step} className="flex gap-3">
                          <div className="flex flex-col items-center flex-shrink-0">
                            <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-[10px] font-bold flex-shrink-0">
                              {s.step}
                            </div>
                            {i < arr.length - 1 && <div className="w-px flex-1 bg-amber-100 my-0.5" />}
                          </div>
                          <div className="pb-3">
                            <span className="text-xs font-semibold text-gray-800">{s.label}　</span>
                            <span className="text-xs text-gray-500">{s.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* 技术选型 */}
                <Card>
                  <SubTitle>关键技术选型</SubTitle>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="text-left text-gray-500 font-medium pb-2 pr-4 w-28">层级</th>
                          <th className="text-left text-gray-500 font-medium pb-2 pr-4">推荐方案</th>
                          <th className="text-left text-gray-500 font-medium pb-2">说明</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {[
                          { layer: "AI 推理", tech: "Claude 3.5 Sonnet / GPT-4o", note: "代码生成能力强，支持长上下文（200K tokens），适合携带完整代码文件树" },
                          { layer: "代码执行沙箱", tech: "WebContainer（StackBlitz）", note: "在浏览器内运行 Node.js 环境，无需后端服务器，延迟低；备选：E2B Sandbox（云端执行）" },
                          { layer: "流式输出", tech: "Server-Sent Events (SSE)", note: "AI 生成代码时逐 token 流式推送到前端，实现「打字机」效果和实时进度展示" },
                          { layer: "原型渲染", tech: "iframe + postMessage", note: "沙箱输出通过 iframe 嵌入，父子页面通过 postMessage 通信，隔离安全风险" },
                          { layer: "上下文管理", tech: "文件树 + 对话历史", note: "每次请求携带完整代码文件树（JSON 格式）+ 最近 N 轮对话，确保 AI 理解当前状态" },
                          { layer: "版本存储", tech: "Supabase / PostgreSQL", note: "每个版本存储代码快照（压缩后）、生成描述、时间戳，支持按项目查询历史版本" },
                        ].map((row, i) => (
                          <tr key={i}>
                            <td className="py-2.5 pr-4 font-medium text-gray-700 align-top">{row.layer}</td>
                            <td className="py-2.5 pr-4 text-amber-700 font-medium align-top whitespace-nowrap">{row.tech}</td>
                            <td className="py-2.5 text-gray-500 leading-5">{row.note}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>

                {/* PRD 自动生成机制 */}
                <Card>
                  <SubTitle>PRD 自动生成机制</SubTitle>
                  <p className="text-sm text-gray-600 leading-7 mb-4">
                    原型生成完成后，系统已经积累了两类高质量素材：<strong>代码文件树</strong>（原型的结构、页面、组件）和<strong>对话记录</strong>（用户描述了什么需求、做了哪些修改、为什么改）。基于这两类素材，可以让大模型扮演「产品经理」角色，自动提炼出结构化的 PRD。
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {[
                      {
                        icon: "ri-code-box-line",
                        title: "从代码提取",
                        items: ["页面路由结构 → 页面清单", "组件树 → 功能模块划分", "交互逻辑 → 用户流程", "数据结构 → 数据字典"],
                      },
                      {
                        icon: "ri-chat-history-line",
                        title: "从对话提取",
                        items: ["初始需求描述 → 产品背景", "修改指令 → 迭代决策记录", "用户提问 → 待确认问题", "反复强调的点 → 核心需求"],
                      },
                    ].map((col) => (
                      <div key={col.title} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-white border border-gray-100">
                            <i className={`${col.icon} text-gray-500 text-xs`} />
                          </div>
                          <span className="text-xs font-semibold text-gray-700">{col.title}</span>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          {col.items.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                              <i className="ri-arrow-right-s-line text-amber-400 flex-shrink-0" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-amber-50/60 rounded-xl p-4 border border-amber-100/60">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Prompt 设计要点</p>
                    <div className="flex flex-col gap-1.5">
                      {[
                        "角色设定：「你是一位资深产品经理，请基于以下原型代码和对话记录，撰写一份结构化的产品需求文档」",
                        "输出格式：要求模型输出 JSON 结构（含 overview / users / features / pages / flow 等字段），前端再渲染成可视化文档",
                        "增量更新：每次对话迭代后，可以只更新 PRD 中受影响的章节，而非重新生成全文",
                        "用户确认：PRD 生成后展示给用户，支持手动编辑和补充，避免 AI 理解偏差",
                      ].map((tip, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                          <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-amber-400" />
                          {tip}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* 实现路径 */}
                <Card>
                  <SubTitle>实现路径建议（分阶段）</SubTitle>
                  <div className="flex flex-col gap-3">
                    {[
                      {
                        phase: "Phase 1 · 原型生成 MVP",
                        color: "bg-green-50 border-green-100 text-green-700",
                        dot: "bg-green-400",
                        items: [
                          "接入 Claude API，实现基础的「文字 → React 代码」生成",
                          "集成 WebContainer，在浏览器内编译并 iframe 渲染",
                          "实现 SSE 流式输出，展示生成进度",
                          "基础版本存储（每次生成后保存代码快照）",
                        ],
                      },
                      {
                        phase: "Phase 2 · 对话迭代",
                        color: "bg-amber-50 border-amber-100 text-amber-700",
                        dot: "bg-amber-400",
                        items: [
                          "实现上下文管理：每次请求携带代码文件树 + 历史对话",
                          "支持增量修改（AI 只修改需要变更的文件，而非重新生成全部）",
                          "版本历史面板 + 回滚功能",
                          "支持图片、文档附件上传并注入 Prompt",
                        ],
                      },
                      {
                        phase: "Phase 3 · PRD 自动生成",
                        color: "bg-gray-50 border-gray-100 text-gray-600",
                        dot: "bg-gray-300",
                        items: [
                          "设计 PRD 生成专用 Prompt，输出结构化 JSON",
                          "前端实现 PRD 渲染页面（即本页面的形态）",
                          "支持用户手动编辑 PRD 内容",
                          "支持导出为 Markdown / PDF",
                        ],
                      },
                    ].map((p) => (
                      <div key={p.phase} className={`rounded-xl border p-4 ${p.color}`}>
                        <p className="text-xs font-bold mb-2.5">{p.phase}</p>
                        <div className="flex flex-col gap-1.5">
                          {p.items.map((item, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                              <span className={`flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full ${p.dot}`} />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* 两阶段 Prompt 设计 */}
                <Card>
                  <div id="tech-two-phase" className="scroll-mt-6">
                    <SubTitle>两阶段 Prompt 设计：结构思维链 → 代码生成</SubTitle>
                    <p className="text-sm text-gray-600 leading-7 mb-4">
                      普通做法是「用户输入 → 直接生成代码」，这会导致 AI 容易遗漏功能、布局混乱、忽略边界情况。更好的做法是<strong>让模型先「想清楚」再动手</strong>，分两个阶段完成生成任务。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      {[
                        {
                          phase: "第一阶段：结构思维链",
                          color: "bg-amber-50/60 border-amber-100/60",
                          icon: "ri-mind-map",
                          desc: "不急着写代码，先让模型输出页面设计方案",
                          items: [
                            "页面目标：这个页面要解决什么问题",
                            "页面布局：整体结构（顶部/左侧/主区域/底部）",
                            "核心模块：3-6 个功能模块，含 UI 元素和交互行为",
                            "数据需求：需要展示哪些数据字段",
                            "边界情况：空状态/加载状态/错误状态",
                          ],
                        },
                        {
                          phase: "第二阶段：代码生成",
                          color: "bg-gray-50 border-gray-100",
                          icon: "ri-code-s-slash-line",
                          desc: "把第一阶段的结构方案 + 设计规范约束一起打包，再生成代码",
                          items: [
                            "输入：第一阶段结构方案 + 用户原始需求",
                            "注入设计规范：圆角、主色调、禁用色等约束",
                            "AI 严格按照结构方案生成对应代码",
                            "增量 diff：只修改需要变更的文件",
                            "构建验证：生成后自动检查编译是否通过",
                          ],
                        },
                      ].map((col) => (
                        <div key={col.phase} className={`rounded-xl border p-4 ${col.color}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-white border border-gray-100">
                              <i className={`${col.icon} text-gray-500 text-xs`} />
                            </div>
                            <span className="text-xs font-bold text-gray-800">{col.phase}</span>
                          </div>
                          <p className="text-xs text-gray-500 mb-2.5 leading-5">{col.desc}</p>
                          <div className="flex flex-col gap-1.5">
                            {col.items.map((item, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                                <i className="ri-arrow-right-s-line text-amber-400 flex-shrink-0 mt-0.5" />
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <p className="text-xs font-semibold text-gray-700 mb-2">两阶段 vs 一步生成的对比</p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left text-gray-500 font-medium pb-2 pr-4 w-28">维度</th>
                              <th className="text-left text-gray-500 font-medium pb-2 pr-4">一步生成</th>
                              <th className="text-left text-gray-500 font-medium pb-2">两阶段生成</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {[
                              { dim: "功能遗漏", one: "容易遗漏", two: "结构阶段强制列举完整" },
                              { dim: "布局混乱", one: "常见问题", two: "先定结构再填内容，层次清晰" },
                              { dim: "边界情况", two: "第一阶段强制考虑", one: "基本忽略" },
                              { dim: "用户参与", one: "无法介入", two: "可在结构阶段让用户确认方案" },
                              { dim: "修改成本", one: "改代码很重", two: "结构阶段调整成本极低" },
                            ].map((row, i) => (
                              <tr key={i}>
                                <td className="py-2 pr-4 font-medium text-gray-700">{row.dim}</td>
                                <td className="py-2 pr-4 text-red-400">{row.one}</td>
                                <td className="py-2 text-green-600">{row.two}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Plan 模式 */}
                <Card>
                  <div id="tech-plan-mode" className="scroll-mt-6">
                    <SubTitle>Plan 模式：先规划，再执行</SubTitle>
                    <p className="text-sm text-gray-600 leading-7 mb-4">
                      Plan 模式是对「两阶段生成」的进一步升级——规划阶段不再是 AI 内部自己想，而是<strong>把执行计划显式呈现给用户，让用户确认或修改后再执行</strong>。这是目前 Cursor、Claude 等主流 AI 编程工具的核心交互范式，也是金山云码提升生成质量和用户信任感的关键机制。
                    </p>

                    <div className="bg-amber-50/60 rounded-xl border border-amber-100/60 p-4 mb-4">
                      <p className="text-xs font-bold text-gray-800 mb-3">Plan 模式 vs 普通模式的核心差异</p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="border-b border-amber-100">
                              <th className="text-left text-gray-500 font-medium pb-2 pr-4 w-28">维度</th>
                              <th className="text-left text-gray-500 font-medium pb-2 pr-4">普通模式</th>
                              <th className="text-left text-gray-500 font-medium pb-2">Plan 模式</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-amber-50">
                            {[
                              { dim: "执行时机", normal: "用户发送后立即开始写代码", plan: "先输出计划，用户确认后再执行" },
                              { dim: "用户参与", normal: "只能等结果，无法介入过程", plan: "可在执行前修改、删减、调整计划" },
                              { dim: "错误成本", normal: "生成完才发现方向错了，重来", plan: "计划阶段发现问题，修正成本极低" },
                              { dim: "透明度", normal: "AI 做了什么用户不清楚", plan: "每一步改了什么文件、改了什么都可见" },
                              { dim: "适用场景", normal: "简单修改、明确需求", plan: "复杂需求、多文件改动、首次生成" },
                            ].map((row, i) => (
                              <tr key={i}>
                                <td className="py-2 pr-4 font-medium text-gray-700">{row.dim}</td>
                                <td className="py-2 pr-4 text-gray-500">{row.normal}</td>
                                <td className="py-2 text-green-600 font-medium">{row.plan}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 mb-4">
                      <p className="text-xs font-bold text-gray-800">Plan 模式的四个阶段</p>
                      {[
                        {
                          step: "①",
                          title: "需求理解",
                          color: "bg-amber-100 text-amber-700",
                          desc: "AI 先用 1-2 句话复述它理解的用户需求，确认没有歧义。如果存在多种解读，在这里提问而不是猜。",
                          detail: "输出示例：「你想在工作台首页新增一个「最近访问」区域，展示最近 5 个打开过的项目，按时间倒序排列。理解正确吗？」",
                        },
                        {
                          step: "②",
                          title: "执行计划输出",
                          color: "bg-amber-100 text-amber-700",
                          desc: "AI 输出结构化的执行计划，列出本次任务涉及的所有文件操作，以及每个文件的改动摘要。",
                          detail: "计划格式：文件路径 + 操作类型（新建/修改/删除）+ 改动内容摘要（1-2 句话）+ 预计影响范围",
                        },
                        {
                          step: "③",
                          title: "用户确认 / 修改计划",
                          color: "bg-green-100 text-green-700",
                          desc: "用户看到计划后可以：直接点「确认执行」、修改某个步骤的描述、删掉不需要的步骤、追加新的步骤。",
                          detail: "关键设计：计划是可编辑的结构化列表，不是纯文本。用户可以精确控制每一步的执行范围。",
                        },
                        {
                          step: "④",
                          title: "按计划逐步执行",
                          color: "bg-gray-100 text-gray-600",
                          desc: "用户确认后，AI 严格按照计划逐文件执行，每完成一个步骤实时打勾，用户可以随时暂停。",
                          detail: "执行过程中：已完成步骤显示绿色勾 + 耗时，当前步骤显示加载动画，待执行步骤显示灰色。",
                        },
                      ].map((s) => (
                        <div key={s.step} className="bg-white rounded-xl border border-gray-100 p-4">
                          <div className="flex items-center gap-2.5 mb-2">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${s.color}`}>{s.step}</span>
                            <span className="text-xs font-bold text-gray-800">{s.title}</span>
                          </div>
                          <p className="text-xs text-gray-600 leading-5 mb-2">{s.desc}</p>
                          <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100">
                            <p className="text-[10px] text-gray-500 leading-4">{s.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
                        <p className="text-xs font-bold text-gray-800 mb-2.5">计划卡片的 UI 设计要点</p>
                        <div className="flex flex-col gap-2">
                          {[
                            { icon: "ri-file-list-3-line", text: "每个文件操作是一个独立卡片，含文件路径、操作类型标签（新建/修改/删除）" },
                            { icon: "ri-edit-line", text: "卡片内的改动描述支持点击编辑，用户可以直接修改 AI 的计划" },
                            { icon: "ri-delete-bin-line", text: "每个步骤卡片右上角有删除按钮，可以移除不需要的步骤" },
                            { icon: "ri-add-line", text: "列表底部有「添加步骤」按钮，用户可以手动追加 AI 遗漏的操作" },
                            { icon: "ri-checkbox-circle-line", text: "底部固定「确认执行」按钮，点击后锁定计划开始执行" },
                          ].map((item, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                              <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <i className={`${item.icon} text-gray-400 text-xs`} />
                              </div>
                              {item.text}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
                        <p className="text-xs font-bold text-gray-800 mb-2.5">何时触发 Plan 模式</p>
                        <div className="flex flex-col gap-2">
                          {[
                            { trigger: "强制触发", items: ["首次生成原型（全新项目）", "涉及 3 个以上文件的改动", "用户主动点击「Plan 模式」按钮"] },
                            { trigger: "可选触发", items: ["需求描述超过 50 字", "检测到需求与现有原型有冲突", "用户历史上对类似需求有过修改"] },
                            { trigger: "跳过 Plan", items: ["简单文字修改（如改颜色、改文案）", "用户明确说「直接改」", "Free 套餐用户（减少 token 消耗）"] },
                          ].map((group) => (
                            <div key={group.trigger} className="bg-white rounded-lg p-2.5 border border-gray-100">
                              <p className="text-[10px] font-bold text-gray-500 mb-1.5">{group.trigger}</p>
                              <div className="flex flex-col gap-1">
                                {group.items.map((item, i) => (
                                  <div key={i} className="flex items-center gap-1.5 text-[10px] text-gray-600">
                                    <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                                    {item}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
                      <p className="text-xs font-bold text-gray-800 mb-2.5">Plan 模式的 Prompt 设计要点</p>
                      <div className="flex flex-col gap-2">
                        {[
                          {
                            label: "计划输出格式约束",
                            desc: "要求模型以结构化 JSON 输出计划（含 files 数组，每项含 path / action / summary），前端解析后渲染成可编辑卡片列表，而非让模型输出 Markdown 文本。",
                          },
                          {
                            label: "计划粒度控制",
                            desc: "在 Prompt 里明确：计划粒度到「文件级别」，不需要列出具体代码行。每个文件的改动摘要控制在 1-2 句话，避免计划本身消耗过多 token。",
                          },
                          {
                            label: "计划与执行的 Prompt 分离",
                            desc: "规划阶段和执行阶段使用不同的 System Prompt。规划阶段强调「全面列举、不遗漏」；执行阶段强调「严格按计划执行、不自作主张」。",
                          },
                          {
                            label: "用户修改计划的注入方式",
                            desc: "用户修改计划后，把修改后的 JSON 计划重新注入执行阶段的 Prompt，并明确标注「以下是用户确认的执行计划，请严格按此执行，不得偏离」。",
                          },
                        ].map((item, i) => (
                          <div key={i} className="flex gap-3 bg-white rounded-lg p-3 border border-gray-100">
                            <div className="flex-shrink-0 mt-0.5 w-4 h-4 flex items-center justify-center rounded-full bg-amber-100">
                              <span className="text-[9px] font-bold text-amber-700">{i + 1}</span>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-800 mb-0.5">{item.label}</p>
                              <p className="text-xs text-gray-500 leading-5">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* 数据结构设计 */}
                <Card>
                  <div id="tech-data-schema" className="scroll-mt-6">
                    <SubTitle>数据结构设计：Plan 模式计划卡片 JSON 规范</SubTitle>
                    <p className="text-sm text-gray-600 leading-7 mb-4">
                      Plan 模式的核心是把 AI 的执行计划以<strong>结构化 JSON 格式</strong>传递给前端，前端根据此结构渲染可编辑的计划卡片列表。以下是完整的数据结构规范，包含字段说明、类型约束和典型示例。
                    </p>

                    {/* 顶层结构 */}
                    <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 mb-4">
                      <p className="text-xs font-bold text-gray-800 mb-3">顶层结构：PlanResponse</p>
                      <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs leading-6 overflow-x-auto mb-3">
                        <pre className="text-gray-300 whitespace-pre">{`{
  "type": "plan",                    // 固定值，区分计划响应与普通响应
  "planId": "plan_abc123",           // 本次计划的唯一 ID（用于追踪执行状态）
  "understanding": "你想在工作台首页  // AI 对需求的复述（展示在计划卡片顶部）
    新增「最近访问」区域，展示最近 5
    个项目，按时间倒序排列。",
  "steps": [ /* StepItem[] */ ],     // 执行步骤列表（有序数组）
  "estimatedTokens": 4200,           // 预估本次执行消耗的 token 数（供用户参考）
  "triggerReason": "auto",           // 触发原因：auto | manual | first_gen
  "createdAt": "2026-04-09T10:30:00Z"
}`}</pre>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { field: "type", type: "string", required: true, desc: "固定为 \"plan\"，前端据此判断渲染计划卡片而非普通消息" },
                          { field: "planId", type: "string", required: true, desc: "UUID v4 格式，用于执行阶段关联步骤状态更新" },
                          { field: "understanding", type: "string", required: true, desc: "AI 对需求的简洁复述，1-3 句话，展示在计划区域顶部" },
                          { field: "steps", type: "StepItem[]", required: true, desc: "步骤有序数组，最少 1 项，最多建议不超过 20 项" },
                          { field: "estimatedTokens", type: "number", required: false, desc: "预估消耗 token 数，可用于 Free 套餐配额预警提示" },
                          { field: "triggerReason", type: "enum", required: true, desc: "\"auto\"=系统触发 | \"manual\"=用户手动开启 | \"first_gen\"=首次生成" },
                        ].map((row) => (
                          <div key={row.field} className="bg-white rounded-lg p-2.5 border border-gray-100">
                            <div className="flex items-center gap-1.5 mb-1">
                              <code className="text-[10px] font-mono font-bold text-amber-700">{row.field}</code>
                              <span className="text-[10px] text-gray-400 font-mono">{row.type}</span>
                              {row.required && <span className="text-[9px] text-red-400 font-bold ml-auto">必填</span>}
                            </div>
                            <p className="text-[10px] text-gray-500 leading-4">{row.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* StepItem 结构 */}
                    <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 mb-4">
                      <p className="text-xs font-bold text-gray-800 mb-3">步骤结构：StepItem</p>
                      <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs leading-6 overflow-x-auto mb-3">
                        <pre className="text-gray-300 whitespace-pre">{`{
  "stepId": "step_001",              // 步骤唯一 ID（同一 planId 内唯一）
  "order": 1,                        // 执行顺序（从 1 开始，用户调整后前端重排）
  "action": "modify",                // 操作类型：create | modify | delete
  "filePath": "src/pages/dashboard/components/RecentVisited.tsx",
  "summary": "新建「最近访问」组件，  // 改动摘要（用户可编辑的核心字段）
    展示最近 5 个项目卡片，含项目名、
    平台标签和最后访问时间",
  "status": "pending",               // 执行状态（执行阶段由系统更新）
  "isUserEdited": false,             // 用户是否手动修改过此步骤
  "isUserAdded": false,              // 是否为用户手动追加的步骤
  "executionResult": null            // 执行结果（执行阶段填充）
}`}</pre>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { value: "create", color: "bg-green-50 border-green-200 text-green-700", label: "create", desc: "新建文件，左侧展示绿色「新建」标签" },
                            { value: "modify", color: "bg-blue-50 border-blue-200 text-blue-700", label: "modify", desc: "修改已有文件，展示蓝灰「修改」标签" },
                            { value: "delete", color: "bg-red-50 border-red-200 text-red-500", label: "delete", desc: "删除文件，展示红色「删除」标签（需二次确认）" },
                          ].map((item) => (
                            <div key={item.value} className={`rounded-lg border p-2.5 ${item.color}`}>
                              <code className="text-[10px] font-mono font-bold block mb-1">action: &ldquo;{item.label}&rdquo;</code>
                              <p className="text-[10px] leading-4">{item.desc}</p>
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { value: "pending", color: "text-gray-500 bg-gray-50 border-gray-100", desc: "待执行（灰色圆圈图标）" },
                            { value: "running", color: "text-amber-700 bg-amber-50 border-amber-100", desc: "执行中（旋转加载环）" },
                            { value: "done", color: "text-green-600 bg-green-50 border-green-100", desc: "已完成（绿色勾图标）" },
                            { value: "failed", color: "text-red-500 bg-red-50 border-red-100", desc: "执行失败（红色×图标）" },
                          ].map((item) => (
                            <div key={item.value} className={`rounded-lg border p-2 ${item.color}`}>
                              <code className="text-[10px] font-mono font-bold block mb-1">&ldquo;{item.value}&rdquo;</code>
                              <p className="text-[10px] leading-4">{item.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* ExecutionResult 结构 */}
                    <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 mb-4">
                      <p className="text-xs font-bold text-gray-800 mb-3">执行结果结构：ExecutionResult（步骤执行后填充）</p>
                      <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs leading-6 overflow-x-auto mb-3">
                        <pre className="text-gray-300 whitespace-pre">{`{
  "success": true,
  "durationMs": 1840,               // 执行耗时（毫秒），展示在步骤卡片右侧
  "linesChanged": 47,               // 变更行数（可选，用于展示改动规模）
  "buildPassed": true,              // 构建是否通过
  "errorMessage": null              // 失败时填入错误简述（展示在卡片内）
}`}</pre>
                      </div>
                      <p className="text-xs text-gray-500 leading-5">执行结果在步骤执行完成后由服务端填充并通过 SSE 推送给前端，前端据此更新对应 stepId 的卡片状态。</p>
                    </div>

                    {/* 完整示例 */}
                    <div className="bg-amber-50/60 rounded-xl border border-amber-100/60 p-4 mb-4">
                      <p className="text-xs font-bold text-gray-800 mb-3">完整示例：「工作台首页新增最近访问模块」的 Plan 响应</p>
                      <div className="bg-gray-900 rounded-lg p-4 font-mono text-[10px] leading-5 overflow-x-auto">
                        <pre className="text-gray-300 whitespace-pre">{`{
  "type": "plan",
  "planId": "plan_d8f3a1bc",
  "understanding": "你想在工作台首页新增一个「最近访问」
    区域，展示最近 5 个打开过的项目，按访问时间倒序排列。
    点击项目卡片直接进入生成页。",
  "steps": [
    {
      "stepId": "step_001",
      "order": 1,
      "action": "create",
      "filePath": "src/pages/dashboard/components/RecentVisited.tsx",
      "summary": "新建最近访问组件，横向排列 5 个小尺寸项目卡片，
        每张卡片含项目名、平台标签（PC/移动端）、最后访问时间。
        数据从本地存储读取，点击跳转生成页。",
      "status": "pending",
      "isUserEdited": false,
      "isUserAdded": false,
      "executionResult": null
    },
    {
      "stepId": "step_002",
      "order": 2,
      "action": "modify",
      "filePath": "src/pages/dashboard/page.tsx",
      "summary": "在 Hero 区域（AI 输入框）下方、项目列表上方，
        插入 RecentVisited 组件。同时在本地存储工具函数中
        新增「记录访问」的方法，在用户点击项目时调用。",
      "status": "pending",
      "isUserEdited": false,
      "isUserAdded": false,
      "executionResult": null
    },
    {
      "stepId": "step_003",
      "order": 3,
      "action": "modify",
      "filePath": "src/mocks/projects.ts",
      "summary": "为 mock 数据的每条项目记录追加 lastVisitedAt 字段，
        用于最近访问模块的时间排序展示。",
      "status": "pending",
      "isUserEdited": false,
      "isUserAdded": false,
      "executionResult": null
    }
  ],
  "estimatedTokens": 3600,
  "triggerReason": "auto",
  "createdAt": "2026-04-09T10:30:00Z"
}`}</pre>
                      </div>
                    </div>

                    {/* 前端状态管理说明 */}
                    <div className="bg-white rounded-xl border border-gray-100 p-4">
                      <p className="text-xs font-bold text-gray-800 mb-3">前端状态管理要点</p>
                      <div className="flex flex-col gap-2">
                        {[
                          {
                            label: "计划卡片的「可编辑」状态管理",
                            desc: "前端维护一份本地计划副本（localPlan），用户的所有编辑（修改摘要、删除步骤、追加步骤）只修改本地副本。用户点击「确认执行」后，把 localPlan 发送给服务端，服务端以此作为执行依据，而不再使用 AI 原始输出的计划。",
                          },
                          {
                            label: "步骤状态的实时更新",
                            desc: "执行阶段服务端通过 SSE 推送步骤状态更新事件（格式：{type: \"step_update\", planId, stepId, status, executionResult}），前端监听事件，按 stepId 精准更新对应卡片状态，无需重新拉取整个计划。",
                          },
                          {
                            label: "isUserEdited 标记的用途",
                            desc: "用于 AI 执行阶段的上下文注入：把 isUserEdited: true 的步骤特别标注为「用户修改过的计划」，在执行 Prompt 中强调「这些步骤描述已经过用户确认，请严格按照用户的描述执行，不得依据自身判断修改」。",
                          },
                          {
                            label: "计划持久化策略",
                            desc: "计划 JSON 与版本快照一同存储，允许用户在版本历史面板中查看「当时执行了什么计划」。已执行完成的计划不可修改（只读），但可以作为模板复用于新一轮需求。",
                          },
                        ].map((item, i) => (
                          <div key={i} className="flex gap-3 bg-gray-50 rounded-lg p-3 border border-gray-100">
                            <div className="flex-shrink-0 mt-0.5 w-4 h-4 flex items-center justify-center rounded-full bg-amber-100">
                              <span className="text-[9px] font-bold text-amber-700">{i + 1}</span>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-800 mb-0.5">{item.label}</p>
                              <p className="text-xs text-gray-500 leading-5">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* 意图理解 + 主动确认机制 */}
                <Card>
                  <div id="tech-intent" className="scroll-mt-6">
                    <SubTitle>意图理解 + 主动确认需求机制</SubTitle>
                    <p className="text-sm text-gray-600 leading-7 mb-4">
                      AI 在某些情况下会主动向用户提问，而不是猜一把直接生成。这个行为的本质是在 System Prompt 里明确定义了<strong>「什么情况下必须先问，而不是直接执行」</strong>的规则，结合 Chain-of-Thought 自评估机制实现。
                    </p>

                    <div className="flex flex-col gap-3 mb-4">
                      <div className="bg-amber-50/60 rounded-xl border border-amber-100/60 p-4">
                        <p className="text-xs font-bold text-gray-800 mb-2.5">触发主动确认的条件（写入 System Prompt）</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {[
                            { icon: "ri-question-mark", label: "需求模糊", desc: "存在多种合理解读，直接生成大概率不对" },
                            { icon: "ri-alert-line", label: "不可逆操作", desc: "涉及删除、覆盖已有内容等破坏性操作" },
                            { icon: "ri-expand-width-line", label: "范围过大", desc: "需求太宽泛，一次生成质量会很差" },
                            { icon: "ri-information-line", label: "关键信息缺失", desc: "如「做个列表页」但没说展示什么数据" },
                          ].map((item) => (
                            <div key={item.label} className="flex items-start gap-2.5 bg-white rounded-lg p-3 border border-amber-100/40">
                              <div className="w-5 h-5 flex items-center justify-center rounded-md bg-amber-100 flex-shrink-0 mt-0.5">
                                <i className={`${item.icon} text-amber-600 text-[10px]`} />
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-gray-800">{item.label}</p>
                                <p className="text-xs text-gray-500 mt-0.5 leading-4">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
                        <p className="text-xs font-bold text-gray-800 mb-2.5">三种技术实现方式</p>
                        <div className="flex flex-col gap-2">
                          {[
                            {
                              name: "① 规则触发式",
                              complexity: "简单",
                              complexityColor: "bg-green-100 text-green-700",
                              desc: "在 Prompt 里硬写规则，如「用户输入少于 20 字必须追问」。简单粗暴，误判率高，适合冷启动阶段。",
                            },
                            {
                              name: "② 意图分类 + 置信度",
                              complexity: "中等",
                              complexityColor: "bg-amber-100 text-amber-700",
                              desc: "先用轻量模型对用户输入做意图分类（新建/修改/删除/询问），置信度低于阈值时触发确认流程。",
                            },
                            {
                              name: "③ CoT 自评估（推荐）",
                              complexity: "最优",
                              complexityColor: "bg-amber-100 text-amber-700",
                              desc: "让模型在回复前先内部「想一遍」：用户意图是什么？有几种解读？直接执行最可能出错的地方是哪里？是否需要确认？思考完成后再决定提问还是直接生成。",
                            },
                          ].map((item) => (
                            <div key={item.name} className="flex gap-3 bg-white rounded-lg p-3 border border-gray-100">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-semibold text-gray-800">{item.name}</span>
                                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${item.complexityColor}`}>{item.complexity}</span>
                                </div>
                                <p className="text-xs text-gray-500 leading-5">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <p className="text-xs font-semibold text-gray-700 mb-2.5">金山云码场景下的典型确认案例</p>
                      <div className="flex flex-col gap-2">
                        {[
                          { trigger: "用户说「做一个列表页」", question: "列表展示什么内容？有没有筛选/搜索功能？" },
                          { trigger: "用户说「改一下这个页面」", question: "改哪个部分？保留现有内容还是重新设计？" },
                          { trigger: "用户说「加个功能」", question: "这个功能加在哪个页面？触发方式是什么？" },
                          { trigger: "需求与现有原型有冲突", question: "检测到这里已有 X，你是要替换还是在旁边新增？" },
                        ].map((item, i) => (
                          <div key={i} className="flex gap-3 text-xs bg-white rounded-lg p-3 border border-gray-100">
                            <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-gray-100 mt-0.5">
                              <i className="ri-flashlight-line text-gray-500 text-[10px]" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-700 mb-0.5">{item.trigger}</p>
                              <p className="text-gray-500">→ AI 提问：「{item.question}」</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* 上下文检索策略 */}
                <Card>
                  <div id="tech-context" className="scroll-mt-6">
                    <SubTitle>上下文检索策略：AI 如何决定读哪些文件</SubTitle>
                    <p className="text-sm text-gray-600 leading-7 mb-4">
                      用户发出需求后，AI 需要先读取相关文件才能正确生成或修改代码。<strong>读哪些文件</strong>这个决策本质上是一个「上下文检索」问题。以下四种策略复杂度递增，建议分阶段采用。
                    </p>

                    <div className="flex flex-col gap-3 mb-4">
                      {[
                        {
                          tag: "策略一",
                          title: "全量携带",
                          phase: "MVP 期",
                          phaseColor: "bg-green-100 text-green-700",
                          borderColor: "border-l-green-400",
                          pros: "实现简单，AI 绝对不会漏看文件",
                          cons: "项目大了之后 token 爆炸，成本极高",
                          when: "项目文件数 < 20 个的早期阶段",
                          desc: "每次请求都把项目里所有文件的内容全部塞进 Prompt。适合冷启动，先跑通主流程。",
                        },
                        {
                          tag: "策略二",
                          title: "文件树 + 按需读取",
                          phase: "成长期",
                          phaseColor: "bg-amber-100 text-amber-700",
                          borderColor: "border-l-amber-400",
                          pros: "token 消耗可控，AI 自主决策",
                          cons: "AI 可能判断失误，漏读关键文件",
                          when: "文件数 20–100 个的中等规模项目",
                          desc: "每次请求携带「文件树摘要」（只有路径和简短描述，不含内容），AI 自己判断需要哪几个文件后再调用读文件工具获取内容。",
                        },
                        {
                          tag: "策略三",
                          title: "语义检索（RAG）",
                          phase: "进阶",
                          phaseColor: "bg-amber-100 text-amber-700",
                          borderColor: "border-l-orange-400",
                          pros: "精准，token 高效，项目规模可无限扩展",
                          cons: "需要维护向量索引，实现复杂度高",
                          when: "文件数 > 100 个的大型项目",
                          desc: "把每个文件内容做向量化，存进向量数据库。用户输入需求后先做语义相似度检索，找出最相关的 Top-K 个文件注入 Prompt。",
                        },
                        {
                          tag: "策略四",
                          title: "依赖图分析",
                          phase: "成熟期",
                          phaseColor: "bg-gray-100 text-gray-600",
                          borderColor: "border-l-gray-400",
                          pros: "不依赖 AI 判断，准确率接近 100%",
                          cons: "需要解析 import 语句维护依赖图，有工程成本",
                          when: "对准确率要求极高的场景",
                          desc: "维护一张文件依赖关系图（解析 import 语句自动生成）。修改某个文件时，自动把它所有直接依赖文件一起读进来，无需 AI 自己判断。",
                        },
                      ].map((s) => (
                        <div key={s.tag} className={`bg-white rounded-xl border border-gray-100 border-l-4 ${s.borderColor} p-4`}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold text-gray-400">{s.tag}</span>
                            <span className="text-xs font-bold text-gray-800">{s.title}</span>
                            <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full font-medium ${s.phaseColor}`}>{s.phase}</span>
                          </div>
                          <p className="text-xs text-gray-600 leading-5 mb-2.5">{s.desc}</p>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { label: "优点", value: s.pros, color: "text-green-600" },
                              { label: "缺点", value: s.cons, color: "text-red-400" },
                              { label: "适用", value: s.when, color: "text-gray-500" },
                            ].map((item) => (
                              <div key={item.label} className="bg-gray-50 rounded-lg p-2">
                                <p className="text-[10px] font-semibold text-gray-400 mb-1">{item.label}</p>
                                <p className={`text-[10px] leading-4 ${item.color}`}>{item.value}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-amber-50/60 rounded-xl border border-amber-100/60 p-4">
                        <p className="text-xs font-bold text-gray-800 mb-2.5">金山云码分阶段采用建议</p>
                        <div className="flex flex-col gap-2">
                          {[
                            { phase: "MVP 期", strategy: "策略一（全量携带）", reason: "原型项目文件少，先跑通主流程" },
                            { phase: "成长期", strategy: "策略二（文件树 + 按需读取）", reason: "用户项目变大后控制 token 成本" },
                            { phase: "成熟期", strategy: "策略二 + 策略四（依赖图辅助）", reason: "提升准确率，减少 AI 漏读文件" },
                          ].map((item, i) => (
                            <div key={i} className="flex gap-2 text-xs bg-white rounded-lg p-2.5 border border-amber-100/40">
                              <span className="font-semibold text-amber-700 flex-shrink-0 w-14">{item.phase}</span>
                              <div>
                                <p className="font-medium text-gray-800">{item.strategy}</p>
                                <p className="text-gray-500 mt-0.5">{item.reason}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
                        <p className="text-xs font-bold text-gray-800 mb-2.5">实用工程细节：@ai-summary 注释</p>
                        <p className="text-xs text-gray-500 leading-5 mb-3">在每个文件第一行加一行专门给 AI 看的摘要注释，帮助 AI 更准确地判断该文件是否与当前需求相关：</p>
                        <div className="bg-gray-900 rounded-lg p-3 font-mono text-[10px] text-green-400 leading-5">
                          <p className="text-gray-500">{'// @ai-summary: 登录页，包含扫码'}</p>
                          <p className="text-gray-500">{'// 登录二维码展示、倒计时、'}</p>
                          <p className="text-gray-500">{'// 状态机(waiting/scanned/confirmed)'}</p>
                          <p className="mt-2 text-gray-500">{'// @ai-summary: 工作台首页，'}</p>
                          <p className="text-gray-500">{'// AI 输入框 + 项目卡片列表管理'}</p>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-2">大幅降低 AI 漏读和误读文件的概率，是策略二的核心增强手段。</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Token 成本控制策略 */}
                <Card>
                  <div id="tech-token" className="scroll-mt-6">
                    <SubTitle>Token 成本控制策略</SubTitle>
                    <p className="text-sm text-gray-600 leading-7 mb-4">
                      AI 生成原型的主要成本来自 token 消耗。随着用户项目文件增多、对话轮次变长，单次请求的 token 量会快速膨胀。以下几种工程手段可以在<strong>不损失生成质量的前提下</strong>显著控制成本。
                    </p>

                    <div className="flex flex-col gap-3">
                      {[
                        {
                          icon: "ri-file-zip-line",
                          title: "文件内容压缩",
                          tag: "输入优化",
                          tagColor: "bg-amber-100 text-amber-700",
                          items: [
                            { label: "去除注释", desc: "发给 AI 的代码去掉所有用户注释（保留 @ai-summary），减少 20–30% token" },
                            { label: "去除空行", desc: "压缩多余空行和缩进，对 token 消耗影响显著" },
                            { label: "只传变更文件", desc: "增量修改时只把本次涉及的文件传给 AI，而非整个项目" },
                            { label: "摘要替代全文", desc: "非直接相关文件只传文件树摘要，不传完整内容" },
                          ],
                        },
                        {
                          icon: "ri-chat-history-line",
                          title: "历史对话截断",
                          tag: "上下文管理",
                          tagColor: "bg-green-100 text-green-700",
                          items: [
                            { label: "滑动窗口", desc: "只保留最近 N 轮对话（推荐 10–15 轮），超出部分丢弃" },
                            { label: "对话摘要压缩", desc: "超出窗口的历史对话，用 AI 提前压缩成一段摘要，摘要代替原始对话注入 Prompt" },
                            { label: "关键节点标记", desc: "用户主动「确认」的需求节点永久保留，不被截断窗口丢弃" },
                            { label: "版本锚点", desc: "每个版本存一份完整代码快照，对话历史可以大胆截断，代码状态不会丢失" },
                          ],
                        },
                        {
                          icon: "ri-file-edit-line",
                          title: "增量 Diff 输出",
                          tag: "输出优化",
                          tagColor: "bg-gray-100 text-gray-600",
                          items: [
                            { label: "只输出变更部分", desc: "要求 AI 以 diff 格式输出（只写增删改的行），而非输出整个文件，大幅降低输出 token" },
                            { label: "文件级别控制", desc: "明确告诉 AI「只修改 X 文件，其他文件不要动」，防止 AI 不必要地重写整个项目" },
                            { label: "格式约束", desc: "要求 AI 输出结构化 JSON（含文件路径、操作类型、变更内容），前端精准应用 diff，避免解析整段代码" },
                          ],
                        },
                        {
                          icon: "ri-scales-3-line",
                          title: "模型分级调用",
                          tag: "成本路由",
                          tagColor: "bg-rose-100 text-rose-600",
                          items: [
                            { label: "轻量模型做意图分类", desc: "用 GPT-4o-mini 等小模型做意图识别、文件相关性判断，成本是大模型的 1/10" },
                            { label: "大模型只做代码生成", desc: "Claude 3.5 Sonnet 等大模型只用于真正的代码生成任务，不浪费在简单判断上" },
                            { label: "缓存重复请求", desc: "相同的 System Prompt 前缀可以利用 Prompt Caching（Claude / OpenAI 均支持），重复部分不重复计费" },
                            { label: "用量分级限制", desc: "Free 套餐用小模型 + 严格上下文截断；Pro 套餐用大模型 + 更长上下文窗口" },
                          ],
                        },
                      ].map((block) => (
                        <div key={block.title} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                          <div className="flex items-center gap-2.5 px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                            <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-white border border-gray-100">
                              <i className={`${block.icon} text-gray-500 text-xs`} />
                            </div>
                            <span className="text-xs font-bold text-gray-800">{block.title}</span>
                            <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full font-medium ${block.tagColor}`}>{block.tag}</span>
                          </div>
                          <div className="divide-y divide-gray-50">
                            {block.items.map((item, i) => (
                              <div key={i} className="flex gap-3 px-4 py-2.5">
                                <span className="flex-shrink-0 text-xs font-semibold text-gray-700 w-24 mt-0.5">{item.label}</span>
                                <span className="text-xs text-gray-500 leading-5">{item.desc}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 bg-amber-50/60 rounded-xl border border-amber-100/60 p-4">
                      <p className="text-xs font-bold text-gray-800 mb-2.5">综合效果预估</p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="border-b border-amber-100">
                              <th className="text-left text-gray-500 font-medium pb-2 pr-4">优化手段</th>
                              <th className="text-left text-gray-500 font-medium pb-2 pr-4">token 节省幅度</th>
                              <th className="text-left text-gray-500 font-medium pb-2">实现难度</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-amber-50">
                            {[
                              { method: "文件内容压缩（去注释 + 空行）", saving: "20–30%", difficulty: "低" },
                              { method: "历史对话滑动窗口截断", saving: "30–50%", difficulty: "低" },
                              { method: "增量 Diff 输出", saving: "40–60%（输出端）", difficulty: "中" },
                              { method: "模型分级调用", saving: "降低 60–80% 成本", difficulty: "中" },
                              { method: "Prompt Caching", saving: "重复前缀部分 90%+", difficulty: "低（API 原生支持）" },
                            ].map((row, i) => (
                              <tr key={i}>
                                <td className="py-2 pr-4 text-gray-700">{row.method}</td>
                                <td className="py-2 pr-4 font-semibold text-green-600">{row.saving}</td>
                                <td className="py-2 text-gray-500">{row.difficulty}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* AI 能力持续迭代方法论 */}
                <Card>
                  <div id="tech-iteration" className="scroll-mt-6">
                    <SubTitle>AI 能力持续迭代方法论</SubTitle>
                    <p className="text-sm text-gray-600 leading-7 mb-4">
                      AI 生成工具在语义理解、方案周全性、页面美观度上的持续提升，背后是<strong>模型升级、Prompt 工程、用户反馈数据</strong>三件事的叠加。这三个方向也是金山云码后续能力演进的核心抓手。
                    </p>
                    <div className="flex flex-col gap-3">
                      {[
                        {
                          icon: "ri-brain-line",
                          title: "语义理解提升 → 模型升级 + Prompt 工程",
                          color: "border-l-amber-400",
                          items: [
                            "底层模型持续迭代（Claude 3.5/3.7、GPT-4o 等），理解能力随之提升",
                            "System Prompt 持续打磨：让模型理解用户意图而非字面意思",
                            "加入领域知识：在 Prompt 里注入产品设计规范、常见需求模式",
                            "Few-shot 示例：提供高质量的「输入-输出」样例，引导模型对齐期望",
                          ],
                        },
                        {
                          icon: "ri-layout-masonry-line",
                          title: "方案周全性提升 → 结构化思维链（CoT）",
                          color: "border-l-green-400",
                          items: [
                            "生成前强制输出页面结构方案（两阶段生成），减少遗漏",
                            "Prompt 中明确要求考虑边界情况（空状态、错误状态、加载状态）",
                            "要求模型列举「做了什么 / 没做什么」，暴露遗漏点",
                            "多轮对话中携带完整上下文，避免「失忆」导致的方案不一致",
                          ],
                        },
                        {
                          icon: "ri-palette-line",
                          title: "页面美观度提升 → 设计规范注入 + 反馈数据",
                          color: "border-l-rose-400",
                          items: [
                            "在 Prompt 里注入设计系统约束（颜色、间距、圆角、字体规范）",
                            "提供优质 UI 参考示例，让模型有「审美锚点」",
                            "收集用户隐式反馈：哪些生成结果被接受、哪些被修改",
                            "用反馈数据做 RLHF 或 fine-tuning，持续对齐用户审美偏好",
                          ],
                        },
                        {
                          icon: "ri-user-voice-line",
                          title: "金山云码的反馈收集建议",
                          color: "border-l-gray-300",
                          items: [
                            "记录每次生成后用户是否直接继续，还是立即要求修改（隐式满意度）",
                            "记录用户修改指令的内容，提炼高频修改模式（如「字太大了」「间距太密」）",
                            "在生成结果上加「满意 / 不满意」按钮，收集显式反馈",
                            "定期人工审查低满意度的生成案例，针对性优化 Prompt",
                          ],
                        },
                      ].map((block) => (
                        <div key={block.title} className={`bg-white rounded-xl border border-gray-100 border-l-4 ${block.color} p-4`}>
                          <div className="flex items-center gap-2 mb-2.5">
                            <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-gray-50">
                              <i className={`${block.icon} text-gray-500 text-xs`} />
                            </div>
                            <span className="text-xs font-bold text-gray-800">{block.title}</span>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            {block.items.map((item, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                                <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-gray-300" />
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

              </div>
            </section>

            {/* ── 7. 非功能需求 ── */}
            <section id="nonfunc">
              <SectionTitle icon="ri-settings-3-line" title="7. 非功能需求" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: "ri-speed-line",
                    title: "性能",
                    items: [
                      "页面首屏加载时间 ≤ 2s（正常网络环境）",
                      "AI 原型生成时间目标 ≤ 15s（简单需求）",
                      "二维码刷新响应 ≤ 500ms",
                    ],
                  },
                  {
                    icon: "ri-shield-check-line",
                    title: "安全",
                    items: [
                      "扫码登录通过 App 端加密传输，服务端验签",
                      "用户项目数据隔离，不同账户间不可访问",
                      "积分消耗等敏感操作服务端验证",
                    ],
                  },
                  {
                    icon: "ri-smartphone-line",
                    title: "兼容性",
                    items: [
                      "支持 Chrome 100+、Safari 16+、Edge 100+ 浏览器",
                      "生成页面支持 PC（min-width: 1024px）与移动端（375px）两种尺寸",
                      "登录页支持移动端浏览器访问（响应式布局）",
                    ],
                  },
                  {
                    icon: "ri-heart-line",
                    title: "可用性",
                    items: [
                      "所有操作有即时反馈（hover、active 状态、加载动画）",
                      "破坏性操作（删除、退出登录）均有二次确认",
                      "错误状态有明确文字说明而非仅展示错误码",
                    ],
                  },
                ].map((cat) => (
                  <div key={cat.title} className="bg-white rounded-xl border border-gray-100 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-50">
                        <i className={`${cat.icon} text-gray-500 text-sm`} />
                      </div>
                      <span className="text-xs font-semibold text-gray-800">{cat.title}</span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {cat.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                          <span className="flex-shrink-0 mt-1 w-1 h-1 rounded-full bg-gray-300" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── 8. 版本规划 ── */}
            <section id="roadmap">
              <SectionTitle icon="ri-map-2-line" title="8. 版本规划" />
              <div className="flex flex-col gap-3">
                {[
                  {
                    version: "v1.0 · MVP",
                    status: "current",
                    period: "当前版本",
                    items: [
                      "扫码登录（WPS协作 App）",
                      "AI 自然语言输入生成原型",
                      "PC 端 & 移动端原型预览",
                      "对话式迭代修改",
                      "版本历史 & 回滚",
                      "项目管理（增删改查）",
                      "个人设置（外观、快捷键、积分）",
                    ],
                  },
                  {
                    version: "v1.1 · 协作增强",
                    status: "planned",
                    period: "规划中",
                    items: [
                      "团队空间 & 成员管理",
                      "评论与标注功能",
                      "原型分享链接（只读 / 可评论两种权限）",
                      "批量操作项目（批量删除 / 移动）",
                    ],
                  },
                  {
                    version: "v1.2 · 导出与集成",
                    status: "planned",
                    period: "规划中",
                    items: [
                      "导出 Figma / Sketch 格式",
                      "导出 HTML 静态页面",
                      "组件库自定义（品牌色、字体、圆角规范）",
                      "与 WPS 文档深度集成（需求文档直接生成原型）",
                    ],
                  },
                ].map((v) => (
                  <div
                    key={v.version}
                    className={`bg-white rounded-xl border overflow-hidden ${
                      v.status === "current" ? "border-amber-200" : "border-gray-100"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-between px-5 py-3 ${
                        v.status === "current"
                          ? "bg-amber-50/60 border-b border-amber-100"
                          : "bg-gray-50/50 border-b border-gray-50"
                      }`}
                    >
                      <span className="text-xs font-bold text-gray-800">{v.version}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          v.status === "current"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {v.period}
                      </span>
                    </div>
                    <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {v.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                          <span
                            className={`flex-shrink-0 mt-0.5 w-3.5 h-3.5 flex items-center justify-center rounded-full ${
                              v.status === "current"
                                ? "bg-green-100 text-green-600"
                                : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            <i
                              className={`${
                                v.status === "current" ? "ri-check-line" : "ri-time-line"
                              } text-[9px]`}
                            />
                          </span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Bottom padding */}
            <div className="h-10" />
          </div>
        </div>
      </main>
    </div>
  );
}

function SectionTitle({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-amber-50">
        <i className={`${icon} text-sm`} style={{ color: "#c8960a" }} />
      </div>
      <h2 className="text-base font-bold text-gray-900">{title}</h2>
      <div className="flex-1 h-px bg-gray-100 ml-2" />
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
      {children}
    </div>
  );
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">{children}</p>
  );
}
