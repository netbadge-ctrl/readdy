import { useState, useRef, useCallback, useEffect } from "react";

interface Props {
  isFinished: boolean;
  activePage: string;
  siteName: string;
  platform?: "pc" | "mobile";
  onPageRename?: (oldName: string, newName: string) => void;
  selectEditMode?: boolean;
  onExitSelectMode?: () => void;
}

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface EditableElement {
  id: string;
  text: string;
  href?: string;
  tag: string;
}

interface ActionMenuPos {
  x: number;
  y: number;
}

// ─────────────────────────────────────────────
// SelectableWrapper — wraps any block and
// intercepts clicks when selectEditMode is on
// ─────────────────────────────────────────────
function SelectableWrapper({
  id,
  text,
  href,
  tag,
  selectEditMode,
  onSelect,
  children,
}: {
  id: string;
  text: string;
  href?: string;
  tag: string;
  selectEditMode: boolean;
  onSelect: (el: EditableElement, pos: ActionMenuPos) => void;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (!selectEditMode) return;
      e.preventDefault();
      e.stopPropagation();
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      onSelect({ id, text, href, tag }, { x: rect.left + rect.width / 2, y: rect.bottom + 6 });
    },
    [selectEditMode, id, text, href, tag, onSelect]
  );

  return (
    <div
      ref={ref}
      onClick={handleClick}
      onMouseEnter={() => selectEditMode && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative"
      style={{
        cursor: selectEditMode ? "pointer" : undefined,
        outline: selectEditMode && hovered ? "2px solid #f97316" : "none",
        outlineOffset: "2px",
        borderRadius: "4px",
        transition: "outline 0.1s",
      }}
    >
      {selectEditMode && hovered && (
        <div
          className="absolute -top-5 left-0 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded whitespace-nowrap z-50 pointer-events-none"
          style={{ fontSize: "10px" }}
        >
          {tag}
        </div>
      )}
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
// ActionMenu — floating panel after selecting
// ─────────────────────────────────────────────
interface ActionMenuProps {
  el: EditableElement;
  pos: ActionMenuPos;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onApply: (id: string, newText?: string, newHref?: string) => void;
  onDelete: (id: string) => void;
}

type ActionTab = "text" | "link" | "delete";

function ActionMenu({ el, pos, containerRef, onClose, onApply, onDelete }: ActionMenuProps) {
  const [tab, setTab] = useState<ActionTab>("text");
  const [textVal, setTextVal] = useState(el.text);
  const [linkVal, setLinkVal] = useState(el.href || "");
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  // Compute position relative to container
  const containerRect = containerRef.current?.getBoundingClientRect();
  const relX = pos.x - (containerRect?.left ?? 0);
  const relY = pos.y - (containerRect?.top ?? 0);

  return (
    <div
      ref={menuRef}
      className="absolute z-[200] bg-white border border-gray-100 rounded-2xl overflow-hidden"
      style={{
        left: Math.min(relX - 120, (containerRect?.width ?? 400) - 260),
        top: relY,
        width: "252px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 pt-3 pb-2">
        <span className="text-xs font-semibold text-gray-800">编辑元素</span>
        <button
          onClick={onClose}
          className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-lg transition-colors cursor-pointer"
        >
          <i className="ri-close-line text-sm" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 px-3 pb-2">
        {([
          { key: "text" as const, icon: "ri-text", label: "修改文字" },
          { key: "link" as const, icon: "ri-link", label: "编辑链接" },
          { key: "delete" as const, icon: "ri-delete-bin-line", label: "删除" },
        ]).map((t) => (
          <button
            key={t.key}
            onClick={() => { setTab(t.key); setDeleteConfirm(false); }}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-all cursor-pointer whitespace-nowrap ${
              tab === t.key
                ? t.key === "delete"
                  ? "bg-red-50 text-red-500"
                  : "bg-orange-50 text-orange-600"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            }`}
          >
            <i className={`${t.icon}`} style={{ fontSize: "11px" }} />
            {t.label}
          </button>
        ))}
      </div>

      <div className="border-t border-gray-50" />

      {/* Content */}
      <div className="px-3 py-3">
        {tab === "text" && (
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-500">文字内容</label>
            <textarea
              value={textVal}
              onChange={(e) => setTextVal(e.target.value)}
              rows={3}
              className="w-full text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 resize-none focus:outline-none focus:border-orange-300 transition-colors leading-relaxed"
              placeholder="输入新的文字内容..."
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={onClose}
                className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                取消
              </button>
              <button
                onClick={() => { onApply(el.id, textVal, undefined); onClose(); }}
                className="px-3 py-1.5 text-xs bg-orange-500 text-white rounded-lg hover:bg-orange-400 transition-colors cursor-pointer font-medium"
              >
                应用
              </button>
            </div>
          </div>
        )}

        {tab === "link" && (
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-500">跳转链接</label>
            <input
              value={linkVal}
              onChange={(e) => setLinkVal(e.target.value)}
              className="w-full text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-orange-300 transition-colors"
              placeholder="https://example.com 或 /page"
              autoFocus
            />
            <p className="text-xs text-gray-400 leading-relaxed">支持外部链接（https://）或站内路径（/page）</p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={onClose}
                className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                取消
              </button>
              <button
                onClick={() => { onApply(el.id, undefined, linkVal); onClose(); }}
                className="px-3 py-1.5 text-xs bg-orange-500 text-white rounded-lg hover:bg-orange-400 transition-colors cursor-pointer font-medium"
              >
                应用
              </button>
            </div>
          </div>
        )}

        {tab === "delete" && (
          <div className="flex flex-col gap-3">
            {!deleteConfirm ? (
              <>
                <p className="text-xs text-gray-600 leading-relaxed">
                  确认删除此元素？该操作将从预览中移除此内容。
                </p>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={onClose}
                    className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    取消
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(true)}
                    className="px-3 py-1.5 text-xs bg-red-500 text-white rounded-lg hover:bg-red-400 transition-colors cursor-pointer font-medium"
                  >
                    删除
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-xs text-red-600 font-medium">确认要删除吗？</p>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setDeleteConfirm(false)}
                    className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    算了
                  </button>
                  <button
                    onClick={() => { onDelete(el.id); onClose(); }}
                    className="px-3 py-1.5 text-xs bg-red-500 text-white rounded-lg hover:bg-red-400 transition-colors cursor-pointer font-medium"
                  >
                    确认删除
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Cloud nav (shared)
// ─────────────────────────────────────────────
function CloudNav({
  siteName,
  elMap,
  selectEditMode,
  onSelect,
}: {
  siteName: string;
  elMap: Record<string, string>;
  selectEditMode: boolean;
  onSelect: (el: EditableElement, pos: ActionMenuPos) => void;
}) {
  const navItems = ["控制台", "产品", "解决方案", "定价", "文档", "支持"];
  return (
    <nav className="bg-[#1a2332] text-white flex-shrink-0">
      <div className="flex items-center justify-between px-6 py-2 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded flex items-center justify-center bg-gradient-to-br from-orange-400 to-pink-500">
            <i className="ri-cloud-line text-white" style={{ fontSize: "10px" }} />
          </div>
          <SelectableWrapper id="nav-site-name" text={elMap["nav-site-name"] ?? siteName} tag="品牌名" selectEditMode={selectEditMode} onSelect={onSelect}>
            <span className="font-bold text-sm tracking-wide">{elMap["nav-site-name"] ?? siteName}</span>
          </SelectableWrapper>
        </div>
        <div className="flex items-center gap-5 text-gray-400">
          {navItems.map((item) => (
            <SelectableWrapper key={item} id={`nav-${item}`} text={elMap[`nav-${item}`] ?? item} tag="导航项" selectEditMode={selectEditMode} onSelect={onSelect}>
              <span className="hover:text-white cursor-pointer transition-colors">{elMap[`nav-${item}`] ?? item}</span>
            </SelectableWrapper>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <SelectableWrapper id="nav-login" text={elMap["nav-login"] ?? "登录"} tag="按钮" selectEditMode={selectEditMode} onSelect={onSelect}>
            <span className="text-gray-400 hover:text-white cursor-pointer">{elMap["nav-login"] ?? "登录"}</span>
          </SelectableWrapper>
          <SelectableWrapper id="nav-cta" text={elMap["nav-cta"] ?? "免费试用"} tag="CTA 按钮" selectEditMode={selectEditMode} onSelect={onSelect}>
            <span className="bg-orange-500 hover:bg-orange-400 text-white px-3 py-1 rounded text-xs cursor-pointer transition-colors">{elMap["nav-cta"] ?? "免费试用"}</span>
          </SelectableWrapper>
        </div>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────
// Mock pages
// ─────────────────────────────────────────────
function MockHomePage({
  siteName,
  elMap,
  deletedIds,
  selectEditMode,
  onSelect,
}: {
  siteName: string;
  elMap: Record<string, string>;
  deletedIds: Set<string>;
  selectEditMode: boolean;
  onSelect: (el: EditableElement, pos: ActionMenuPos) => void;
}) {
  const products = [
    { id: "prod-0", icon: "ri-server-line", name: "云服务器 KEC", desc: "弹性计算，按需付费", tag: "热门", color: "text-orange-500 bg-orange-50" },
    { id: "prod-1", icon: "ri-database-2-line", name: "云数据库 KRDS", desc: "高可用关系型数据库", tag: "新品", color: "text-blue-500 bg-blue-50" },
    { id: "prod-2", icon: "ri-hard-drive-line", name: "对象存储 KS3", desc: "海量数据低成本存储", tag: "", color: "text-green-500 bg-green-50" },
    { id: "prod-3", icon: "ri-shield-check-line", name: "DDoS 高防", desc: "T 级防护，秒级响应", tag: "", color: "text-violet-500 bg-violet-50" },
    { id: "prod-4", icon: "ri-cpu-line", name: "GPU 云服务器", desc: "AI 训练推理加速", tag: "AI", color: "text-pink-500 bg-pink-50" },
    { id: "prod-5", icon: "ri-global-line", name: "内容分发 CDN", desc: "全球加速，就近访问", tag: "", color: "text-cyan-500 bg-cyan-50" },
    { id: "prod-6", icon: "ri-lock-line", name: "密钥管理 KMS", desc: "数据加密全生命周期", tag: "", color: "text-amber-500 bg-amber-50" },
    { id: "prod-7", icon: "ri-bar-chart-line", name: "云监控 KCM", desc: "全方位资源监控告警", tag: "", color: "text-teal-500 bg-teal-50" },
  ];

  const solutions = [
    { id: "sol-0", icon: "ri-bank-line", title: "金融云", desc: "满足金融行业合规要求，提供高安全、高可用的云服务" },
    { id: "sol-1", icon: "ri-government-line", title: "政务云", desc: "专属政务云平台，支持国产化适配，保障数据安全" },
    { id: "sol-2", icon: "ri-store-line", title: "电商云", desc: "弹性扩缩容，轻松应对大促流量峰值" },
  ];

  return (
    <div className="w-full bg-white overflow-y-auto h-full text-sm">
      <CloudNav siteName={siteName} elMap={elMap} selectEditMode={selectEditMode} onSelect={onSelect} />

      {/* Hero */}
      {!deletedIds.has("hero-section") && (
        <div className="bg-gradient-to-br from-[#0d1b2e] via-[#1a2d4a] to-[#0d1b2e] text-white px-8 py-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #f97316 0%, transparent 50%), radial-gradient(circle at 80% 20%, #3b82f6 0%, transparent 40%)" }} />
          <div className="relative max-w-3xl">
            {!deletedIds.has("hero-badge") && (
              <SelectableWrapper id="hero-badge" text={elMap["hero-badge"] ?? "新品发布 · 第五代云服务器正式上线"} tag="徽章" selectEditMode={selectEditMode} onSelect={onSelect}>
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-5 text-xs text-orange-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                  {elMap["hero-badge"] ?? "新品发布 · 第五代云服务器正式上线"}
                </div>
              </SelectableWrapper>
            )}
            {!deletedIds.has("hero-title") && (
              <SelectableWrapper id="hero-title" text={elMap["hero-title"] ?? "稳定、安全、高性能 云计算基础设施"} tag="标题" selectEditMode={selectEditMode} onSelect={onSelect}>
                <h1 className="text-3xl font-bold leading-tight mb-4">
                  {elMap["hero-title"] ?? <>稳定、安全、高性能<br /><span className="text-orange-400">云计算基础设施</span></>}
                </h1>
              </SelectableWrapper>
            )}
            {!deletedIds.has("hero-desc") && (
              <SelectableWrapper id="hero-desc" text={elMap["hero-desc"] ?? `${siteName} 提供全球领先的云计算服务，覆盖计算、存储、网络、安全、AI 等全栈能力，助力企业数字化转型。`} tag="副标题" selectEditMode={selectEditMode} onSelect={onSelect}>
                <p className="text-gray-300 text-sm leading-relaxed mb-7 max-w-xl">
                  {elMap["hero-desc"] ?? `${siteName} 提供全球领先的云计算服务，覆盖计算、存储、网络、安全、AI 等全栈能力，助力企业数字化转型。`}
                </p>
              </SelectableWrapper>
            )}
            <div className="flex items-center gap-3">
              {!deletedIds.has("hero-btn-primary") && (
                <SelectableWrapper id="hero-btn-primary" text={elMap["hero-btn-primary"] ?? "立即开通"} tag="主按钮" href="#" selectEditMode={selectEditMode} onSelect={onSelect}>
                  <div className="bg-orange-500 hover:bg-orange-400 text-white px-5 py-2.5 rounded text-xs font-medium cursor-pointer transition-colors">{elMap["hero-btn-primary"] ?? "立即开通"}</div>
                </SelectableWrapper>
              )}
              {!deletedIds.has("hero-btn-secondary") && (
                <SelectableWrapper id="hero-btn-secondary" text={elMap["hero-btn-secondary"] ?? "产品演示"} tag="次按钮" href="#" selectEditMode={selectEditMode} onSelect={onSelect}>
                  <div className="border border-white/30 hover:border-white/60 text-white px-5 py-2.5 rounded text-xs cursor-pointer transition-colors flex items-center gap-1.5">
                    <i className="ri-play-circle-line" />
                    {elMap["hero-btn-secondary"] ?? "产品演示"}
                  </div>
                </SelectableWrapper>
              )}
            </div>
            <div className="flex items-center gap-6 mt-8 text-xs text-gray-400">
              {["99.99% SLA 保障", "全球 30+ 数据中心", "7×24 技术支持"].map((t, i) => {
                const id = `hero-tag-${i}`;
                if (deletedIds.has(id)) return null;
                return (
                  <SelectableWrapper key={id} id={id} text={elMap[id] ?? t} tag="标签" selectEditMode={selectEditMode} onSelect={onSelect}>
                    <div className="flex items-center gap-1.5">
                      <i className="ri-check-line text-green-400" />
                      {elMap[id] ?? t}
                    </div>
                  </SelectableWrapper>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Product categories */}
      {!deletedIds.has("products-section") && (
        <div className="px-8 py-10 bg-gray-50">
          <SelectableWrapper id="products-title" text={elMap["products-title"] ?? "核心产品"} tag="区块标题" selectEditMode={selectEditMode} onSelect={onSelect}>
            <h2 className="text-base font-bold text-gray-900 mb-6">{elMap["products-title"] ?? "核心产品"}</h2>
          </SelectableWrapper>
          <div className="grid grid-cols-4 gap-4">
            {products.map((p) => {
              if (deletedIds.has(p.id)) return null;
              return (
                <SelectableWrapper key={p.id} id={p.id} text={elMap[p.id] ?? p.name} tag="产品卡片" selectEditMode={selectEditMode} onSelect={onSelect}>
                  <div className="bg-white border border-gray-100 rounded-lg p-4 hover:border-orange-200 hover:shadow-sm transition-all cursor-pointer group">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${p.color}`}>
                        <i className={`${p.icon} text-base`} />
                      </div>
                      {p.tag && <span className="text-xs bg-orange-50 text-orange-500 border border-orange-100 px-1.5 py-0.5 rounded">{p.tag}</span>}
                    </div>
                    <p className="text-xs font-semibold text-gray-800 mb-1 group-hover:text-orange-500 transition-colors">{elMap[p.id] ?? p.name}</p>
                    <p className="text-xs text-gray-400">{p.desc}</p>
                  </div>
                </SelectableWrapper>
              );
            })}
          </div>
        </div>
      )}

      {/* Stats */}
      {!deletedIds.has("stats-section") && (
        <div className="px-8 py-8 bg-[#1a2332] text-white">
          <div className="grid grid-cols-4 gap-6 text-center">
            {[
              { id: "stat-0", num: "500,000+", label: "企业客户" },
              { id: "stat-1", num: "30+", label: "全球数据中心" },
              { id: "stat-2", num: "99.99%", label: "服务可用性" },
              { id: "stat-3", num: "7×24", label: "技术支持" },
            ].map((s) => {
              if (deletedIds.has(s.id)) return null;
              return (
                <SelectableWrapper key={s.id} id={s.id} text={elMap[s.id] ?? `${s.num} ${s.label}`} tag="数据项" selectEditMode={selectEditMode} onSelect={onSelect}>
                  <div>
                    <p className="text-2xl font-bold text-orange-400">{s.num}</p>
                    <p className="text-xs text-gray-400 mt-1">{elMap[s.id] ?? s.label}</p>
                  </div>
                </SelectableWrapper>
              );
            })}
          </div>
        </div>
      )}

      {/* Solutions */}
      {!deletedIds.has("solutions-section") && (
        <div className="px-8 py-10">
          <SelectableWrapper id="solutions-title" text={elMap["solutions-title"] ?? "行业解决方案"} tag="区块标题" selectEditMode={selectEditMode} onSelect={onSelect}>
            <h2 className="text-base font-bold text-gray-900 mb-6">{elMap["solutions-title"] ?? "行业解决方案"}</h2>
          </SelectableWrapper>
          <div className="grid grid-cols-3 gap-4">
            {solutions.map((s) => {
              if (deletedIds.has(s.id)) return null;
              return (
                <SelectableWrapper key={s.id} id={s.id} text={elMap[s.id] ?? s.title} tag="解决方案卡片" selectEditMode={selectEditMode} onSelect={onSelect}>
                  <div className="border border-gray-100 rounded-lg p-5 hover:border-orange-200 transition-all cursor-pointer">
                    <div className="w-8 h-8 flex items-center justify-center bg-orange-50 text-orange-500 rounded-lg mb-3">
                      <i className={`${s.icon} text-sm`} />
                    </div>
                    <p className="text-xs font-semibold text-gray-800 mb-1.5">{elMap[s.id] ?? s.title}</p>
                    <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
                    <div className="flex items-center gap-1 mt-3 text-xs text-orange-500 cursor-pointer">
                      了解更多 <i className="ri-arrow-right-line" />
                    </div>
                  </div>
                </SelectableWrapper>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer */}
      {!deletedIds.has("footer-section") && (
        <div className="bg-[#0d1b2e] text-gray-400 px-8 py-6">
          <div className="flex items-center justify-between text-xs">
            <SelectableWrapper id="footer-copy" text={elMap["footer-copy"] ?? `© 2025 ${siteName} Cloud. All rights reserved.`} tag="版权信息" selectEditMode={selectEditMode} onSelect={onSelect}>
              <span>{elMap["footer-copy"] ?? `© 2025 ${siteName} Cloud. All rights reserved.`}</span>
            </SelectableWrapper>
            <div className="flex items-center gap-4">
              {["隐私政策", "服务协议", "法律声明", "联系我们"].map((t, i) => {
                const id = `footer-link-${i}`;
                if (deletedIds.has(id)) return null;
                return (
                  <SelectableWrapper key={id} id={id} text={elMap[id] ?? t} tag="页脚链接" href="#" selectEditMode={selectEditMode} onSelect={onSelect}>
                    <span className="hover:text-white cursor-pointer transition-colors">{elMap[id] ?? t}</span>
                  </SelectableWrapper>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MockConsolePage({ siteName }: { siteName: string }) {
  return (
    <div className="w-full bg-[#f5f6f8] overflow-y-auto h-full">
      <div className="bg-[#1a2332] text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded flex items-center justify-center bg-gradient-to-br from-orange-400 to-pink-500">
            <i className="ri-cloud-line text-white" style={{ fontSize: "10px" }} />
          </div>
          <span className="text-sm font-bold">{siteName} 控制台</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span>华北1（北京）</span>
          <i className="ri-notification-line" />
          <span className="text-white">admin@example.com</span>
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-sm font-bold text-gray-800 mb-4">资源概览</h2>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "云服务器", count: 12, icon: "ri-server-line", color: "text-orange-500" },
            { label: "云数据库", count: 4, icon: "ri-database-2-line", color: "text-blue-500" },
            { label: "对象存储", count: 8, icon: "ri-hard-drive-line", color: "text-green-500" },
            { label: "负载均衡", count: 3, icon: "ri-scales-line", color: "text-violet-500" },
          ].map(r => (
            <div key={r.label} className="bg-white rounded-lg p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">{r.label}</span>
                <i className={`${r.icon} ${r.color}`} />
              </div>
              <p className="text-xl font-bold text-gray-900">{r.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MockProductsPage({ siteName }: { siteName: string }) {
  return (
    <div className="w-full bg-white overflow-y-auto h-full">
      <CloudNav siteName={siteName} elMap={{}} selectEditMode={false} onSelect={() => {}} />
      <div className="px-8 py-10">
        <h1 className="text-xl font-bold text-gray-900 mb-2">产品与定价</h1>
        <p className="text-xs text-gray-500 mb-6">按需付费，弹性扩展，无需预付费</p>
        <div className="grid grid-cols-3 gap-5">
          {[
            { name: "基础版", price: "¥0.34/小时", specs: "2核 4GB · 40GB SSD", features: ["按量计费", "基础带宽", "社区支持"], highlight: false },
            { name: "标准版", price: "¥0.88/小时", specs: "4核 8GB · 80GB SSD", features: ["包年包月", "5Mbps 带宽", "工单支持", "快照备份"], highlight: true },
            { name: "企业版", price: "¥2.16/小时", specs: "8核 16GB · 200GB SSD", features: ["专属资源池", "10Mbps 带宽", "7×24 电话", "专属客户经理"], highlight: false },
          ].map(p => (
            <div key={p.name} className={`rounded-xl border p-5 ${p.highlight ? "border-orange-400 bg-orange-50/30" : "border-gray-100"}`}>
              {p.highlight && <div className="text-xs text-orange-500 font-medium mb-2">推荐</div>}
              <p className="text-sm font-bold text-gray-900 mb-1">{p.name}</p>
              <p className="text-xl font-bold text-orange-500 mb-1">{p.price}</p>
              <p className="text-xs text-gray-400 mb-4">{p.specs}</p>
              <div className="flex flex-col gap-1.5 mb-5">
                {p.features.map(f => (
                  <div key={f} className="flex items-center gap-1.5 text-xs text-gray-600">
                    <i className="ri-check-line text-green-500" />{f}
                  </div>
                ))}
              </div>
              <div className={`w-full py-2 rounded-lg text-center text-xs font-medium cursor-pointer ${p.highlight ? "bg-orange-500 text-white hover:bg-orange-400" : "bg-gray-900 text-white hover:bg-gray-700"}`}>
                立即购买
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MockContactPage({ siteName }: { siteName: string }) {
  return (
    <div className="w-full bg-white overflow-y-auto h-full">
      <CloudNav siteName={siteName} elMap={{}} selectEditMode={false} onSelect={() => {}} />
      <div className="px-8 py-10 max-w-lg">
        <h1 className="text-xl font-bold text-gray-900 mb-1">联系我们</h1>
        <p className="text-xs text-gray-500 mb-6">7×24 小时技术支持，随时为您服务</p>
        <div className="flex flex-col gap-4">
          {[{ label: "姓名", ph: "请输入您的姓名" }, { label: "公司", ph: "请输入公司名称" }, { label: "邮箱", ph: "name@company.com" }, { label: "电话", ph: "请输入联系电话" }].map(f => (
            <div key={f.label}>
              <label className="text-xs font-medium text-gray-700 block mb-1">{f.label}</label>
              <div className="w-full border border-gray-200 rounded px-3 py-2 text-xs text-gray-400 bg-gray-50">{f.ph}</div>
            </div>
          ))}
          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">需求描述</label>
            <div className="w-full border border-gray-200 rounded px-3 py-2 text-xs text-gray-400 bg-gray-50 h-20">请描述您的业务需求...</div>
          </div>
          <div className="w-full py-2.5 bg-orange-500 text-white text-xs font-medium rounded text-center cursor-pointer hover:bg-orange-400">提交咨询</div>
        </div>
      </div>
    </div>
  );
}

function MockMobileHomePage({ siteName }: { siteName: string }) {
  return (
    <div className="w-full bg-white overflow-y-auto h-full text-sm">
      <div className="bg-[#1a2332] text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded flex items-center justify-center bg-gradient-to-br from-orange-400 to-pink-500">
            <i className="ri-cloud-line text-white" style={{ fontSize: "10px" }} />
          </div>
          <span className="font-bold text-sm">{siteName}</span>
        </div>
        <i className="ri-menu-line text-white text-lg" />
      </div>
      <div className="bg-gradient-to-br from-[#0d1b2e] to-[#1a2d4a] text-white px-5 py-10">
        <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-2.5 py-1 mb-4 text-xs text-orange-300">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
          新品发布上线
        </div>
        <h1 className="text-xl font-bold leading-tight mb-3">
          稳定、安全<br /><span className="text-orange-400">云计算基础设施</span>
        </h1>
        <p className="text-gray-300 text-xs leading-relaxed mb-5">{siteName} 提供全球领先云计算服务，助力企业数字化转型。</p>
        <div className="flex gap-2">
          <div className="bg-orange-500 text-white px-4 py-2 rounded text-xs font-medium cursor-pointer">立即开通</div>
          <div className="border border-white/30 text-white px-4 py-2 rounded text-xs cursor-pointer">产品演示</div>
        </div>
      </div>
      <div className="px-4 py-6 bg-gray-50">
        <h2 className="text-sm font-bold text-gray-900 mb-3">核心产品</h2>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { icon: "ri-server-line", name: "云服务器", color: "text-orange-500 bg-orange-50" },
            { icon: "ri-database-2-line", name: "云数据库", color: "text-green-500 bg-green-50" },
            { icon: "ri-hard-drive-line", name: "对象存储", color: "text-teal-500 bg-teal-50" },
            { icon: "ri-shield-check-line", name: "DDoS 高防", color: "text-pink-500 bg-pink-50" },
          ].map(p => (
            <div key={p.name} className="bg-white rounded-xl p-3 border border-gray-100">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${p.color}`}>
                <i className={`${p.icon} text-sm`} />
              </div>
              <p className="text-xs font-semibold text-gray-800">{p.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-4 py-5 bg-[#1a2332] text-white">
        <div className="grid grid-cols-2 gap-4 text-center">
          {[{ num: "500,000+", label: "企业客户" }, { num: "99.99%", label: "服务可用性" }].map(s => (
            <div key={s.label}>
              <p className="text-lg font-bold text-orange-400">{s.num}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#0d1b2e] text-gray-400 px-4 py-4 text-xs text-center">
        © 2025 {siteName} Cloud. All rights reserved.
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main PreviewPanel
// ─────────────────────────────────────────────
export default function PreviewPanel({
  isFinished,
  activePage,
  siteName,
  platform = "pc",
  selectEditMode = false,
  onExitSelectMode,
}: Props) {
  const isMobile = platform === "mobile";
  const containerRef = useRef<HTMLDivElement>(null);

  // elMap: id -> overridden text/href
  const [elMap, setElMap] = useState<Record<string, string>>({});
  // deletedIds: set of element IDs removed by user
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());

  // Selected element + action menu state
  const [selectedEl, setSelectedEl] = useState<EditableElement | null>(null);
  const [menuPos, setMenuPos] = useState<ActionMenuPos>({ x: 0, y: 0 });

  const handleSelect = useCallback((el: EditableElement, pos: ActionMenuPos) => {
    setSelectedEl(el);
    setMenuPos(pos);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedEl(null);
  }, []);

  const handleApply = useCallback((id: string, newText?: string, newHref?: string) => {
    setElMap((prev) => {
      const next = { ...prev };
      if (newText !== undefined) next[id] = newText;
      if (newHref !== undefined) next[`${id}__href`] = newHref;
      return next;
    });
  }, []);

  const handleDelete = useCallback((id: string) => {
    setDeletedIds((prev) => new Set([...prev, id]));
  }, []);

  // Exit select mode clears selection too
  const handleExitSelectMode = useCallback(() => {
    setSelectedEl(null);
    onExitSelectMode?.();
  }, [onExitSelectMode]);

  const renderPageContent = () => {
    if (!isFinished) {
      return (
        <div className="w-full h-full flex flex-col">
          <div className="h-10 bg-[#1a2332] flex-shrink-0" />
          <div className="flex-1 p-5 flex flex-col gap-3 animate-pulse bg-gray-50">
            <div className="h-40 bg-gray-200 rounded-lg" />
            <div className={`grid gap-3 ${isMobile ? "grid-cols-2" : "grid-cols-4"}`}>
              {[...Array(isMobile ? 2 : 4)].map((_, i) => <div key={i} className="h-24 bg-gray-200 rounded-lg" />)}
            </div>
            <div className="h-16 bg-gray-200 rounded-lg" />
          </div>
        </div>
      );
    }
    if (isMobile) return <MockMobileHomePage siteName={siteName} />;
    switch (activePage) {
      case "关于我们": return <MockConsolePage siteName={siteName} />;
      case "产品列表": return <MockProductsPage siteName={siteName} />;
      case "联系我们": return <MockContactPage siteName={siteName} />;
      default:
        return (
          <MockHomePage
            siteName={siteName}
            elMap={elMap}
            deletedIds={deletedIds}
            selectEditMode={selectEditMode}
            onSelect={handleSelect}
          />
        );
    }
  };

  // Select mode cursor overlay
  const selectModeOverlay = selectEditMode && isFinished && (
    <div
      className="absolute inset-0 z-10 pointer-events-none"
      style={{ cursor: "crosshair" }}
    />
  );

  // Select mode top banner
  const selectModeBanner = selectEditMode && isFinished && (
    <div className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white text-xs flex-shrink-0">
      <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
        <i className="ri-cursor-line text-white text-xs" />
      </div>
      <span className="flex-1">选择编辑模式已开启 — 点击页面中的元素进行编辑</span>
      <button
        onClick={handleExitSelectMode}
        className="flex items-center gap-1 text-white/80 hover:text-white transition-colors cursor-pointer"
      >
        <i className="ri-close-line text-sm" />
        <span>退出</span>
      </button>
    </div>
  );

  if (isMobile) {
    return (
      <div className="h-full flex flex-col overflow-hidden">
        {selectModeBanner}
        <div className="flex-1 flex items-center justify-center bg-[#f0eeeb] overflow-auto py-6">
          <div className="relative flex-shrink-0" style={{ width: "375px" }}>
            <div className="relative bg-gray-900 rounded-[44px] p-3" style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.35)" }}>
              <div className="bg-black rounded-t-[36px] px-6 pt-3 pb-1 flex items-center justify-between">
                <span className="text-white text-xs font-medium">9:41</span>
                <div className="w-20 h-5 bg-black rounded-full" />
                <div className="flex items-center gap-1">
                  <i className="ri-signal-wifi-fill text-white text-xs" />
                  <i className="ri-battery-fill text-white text-xs" />
                </div>
              </div>
              <div className="bg-white overflow-hidden rounded-b-[36px]" style={{ height: "660px" }}>
                {renderPageContent()}
              </div>
            </div>
            <div className="flex justify-center mt-2">
              <div className="w-24 h-1 bg-gray-600 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {selectModeBanner}
      <div className="flex-1 overflow-hidden relative" ref={containerRef}>
        {selectModeOverlay}
        {renderPageContent()}
        {selectedEl && (
          <ActionMenu
            el={selectedEl}
            pos={menuPos}
            containerRef={containerRef}
            onClose={handleClose}
            onApply={handleApply}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
