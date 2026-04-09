

interface Props {
  isFinished: boolean;
  activePage: string;
  siteName: string;
  platform?: "pc" | "mobile";
  onPageRename?: (oldName: string, newName: string) => void;
}

// ── Cloud service nav ──
function CloudNav({ siteName }: { siteName: string }) {
  return (
    <nav className="bg-[#1a2332] text-white flex-shrink-0">
      {/* Top strip */}
      <div className="flex items-center justify-between px-6 py-2 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded flex items-center justify-center bg-gradient-to-br from-orange-400 to-pink-500">
            <i className="ri-cloud-line text-white" style={{ fontSize: "10px" }} />
          </div>
          <span className="font-bold text-sm tracking-wide">{siteName}</span>
        </div>
        <div className="flex items-center gap-5 text-gray-400">
          {["控制台", "产品", "解决方案", "定价", "文档", "支持"].map(item => (
            <span key={item} className="hover:text-white cursor-pointer transition-colors">{item}</span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-400 hover:text-white cursor-pointer">登录</span>
          <span className="bg-orange-500 hover:bg-orange-400 text-white px-3 py-1 rounded text-xs cursor-pointer transition-colors">免费试用</span>
        </div>
      </div>
    </nav>
  );
}

function MockHomePage({ siteName }: { siteName: string }) {
  return (
    <div className="w-full bg-white overflow-y-auto h-full text-sm">
      <CloudNav siteName={siteName} />

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0d1b2e] via-[#1a2d4a] to-[#0d1b2e] text-white px-8 py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #f97316 0%, transparent 50%), radial-gradient(circle at 80% 20%, #3b82f6 0%, transparent 40%)" }} />
        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-5 text-xs text-orange-300">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            新品发布 · 第五代云服务器正式上线
          </div>
          <h1 className="text-3xl font-bold leading-tight mb-4">
            稳定、安全、高性能<br />
            <span className="text-orange-400">云计算基础设施</span>
          </h1>
          <p className="text-gray-300 text-sm leading-relaxed mb-7 max-w-xl">
            {siteName} 提供全球领先的云计算服务，覆盖计算、存储、网络、安全、AI 等全栈能力，助力企业数字化转型。
          </p>
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 hover:bg-orange-400 text-white px-5 py-2.5 rounded text-xs font-medium cursor-pointer transition-colors">立即开通</div>
            <div className="border border-white/30 hover:border-white/60 text-white px-5 py-2.5 rounded text-xs cursor-pointer transition-colors flex items-center gap-1.5">
              <i className="ri-play-circle-line" />
              产品演示
            </div>
          </div>
          <div className="flex items-center gap-6 mt-8 text-xs text-gray-400">
            {["99.99% SLA 保障", "全球 30+ 数据中心", "7×24 技术支持"].map(t => (
              <div key={t} className="flex items-center gap-1.5">
                <i className="ri-check-line text-green-400" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product categories */}
      <div className="px-8 py-10 bg-gray-50">
        <h2 className="text-base font-bold text-gray-900 mb-6">核心产品</h2>
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: "ri-server-line", name: "云服务器 KEC", desc: "弹性计算，按需付费", tag: "热门", color: "text-orange-500 bg-orange-50" },
            { icon: "ri-database-2-line", name: "云数据库 KRDS", desc: "高可用关系型数据库", tag: "新品", color: "text-blue-500 bg-blue-50" },
            { icon: "ri-hard-drive-line", name: "对象存储 KS3", desc: "海量数据低成本存储", tag: "", color: "text-green-500 bg-green-50" },
            { icon: "ri-shield-check-line", name: "DDoS 高防", desc: "T 级防护，秒级响应", tag: "", color: "text-violet-500 bg-violet-50" },
            { icon: "ri-cpu-line", name: "GPU 云服务器", desc: "AI 训练推理加速", tag: "AI", color: "text-pink-500 bg-pink-50" },
            { icon: "ri-global-line", name: "内容分发 CDN", desc: "全球加速，就近访问", tag: "", color: "text-cyan-500 bg-cyan-50" },
            { icon: "ri-lock-line", name: "密钥管理 KMS", desc: "数据加密全生命周期", tag: "", color: "text-amber-500 bg-amber-50" },
            { icon: "ri-bar-chart-line", name: "云监控 KCM", desc: "全方位资源监控告警", tag: "", color: "text-teal-500 bg-teal-50" },
          ].map(p => (
            <div key={p.name} className="bg-white border border-gray-100 rounded-lg p-4 hover:border-orange-200 hover:shadow-sm transition-all cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${p.color}`}>
                  <i className={`${p.icon} text-base`} />
                </div>
                {p.tag && <span className="text-xs bg-orange-50 text-orange-500 border border-orange-100 px-1.5 py-0.5 rounded">{p.tag}</span>}
              </div>
              <p className="text-xs font-semibold text-gray-800 mb-1 group-hover:text-orange-500 transition-colors">{p.name}</p>
              <p className="text-xs text-gray-400">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="px-8 py-8 bg-[#1a2332] text-white">
        <div className="grid grid-cols-4 gap-6 text-center">
          {[
            { num: "500,000+", label: "企业客户" },
            { num: "30+", label: "全球数据中心" },
            { num: "99.99%", label: "服务可用性" },
            { num: "7×24", label: "技术支持" },
          ].map(s => (
            <div key={s.label}>
              <p className="text-2xl font-bold text-orange-400">{s.num}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Solutions */}
      <div className="px-8 py-10">
        <h2 className="text-base font-bold text-gray-900 mb-6">行业解决方案</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: "ri-bank-line", title: "金融云", desc: "满足金融行业合规要求，提供高安全、高可用的云服务" },
            { icon: "ri-government-line", title: "政务云", desc: "专属政务云平台，支持国产化适配，保障数据安全" },
            { icon: "ri-store-line", title: "电商云", desc: "弹性扩缩容，轻松应对大促流量峰值" },
          ].map(s => (
            <div key={s.title} className="border border-gray-100 rounded-lg p-5 hover:border-orange-200 transition-all cursor-pointer">
              <div className="w-8 h-8 flex items-center justify-center bg-orange-50 text-orange-500 rounded-lg mb-3">
                <i className={`${s.icon} text-sm`} />
              </div>
              <p className="text-xs font-semibold text-gray-800 mb-1.5">{s.title}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
              <div className="flex items-center gap-1 mt-3 text-xs text-orange-500 cursor-pointer">
                了解更多 <i className="ri-arrow-right-line" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#0d1b2e] text-gray-400 px-8 py-6">
        <div className="flex items-center justify-between text-xs">
          <span>© 2025 {siteName} Cloud. All rights reserved.</span>
          <div className="flex items-center gap-4">
            {["隐私政策", "服务协议", "法律声明", "联系我们"].map(t => (
              <span key={t} className="hover:text-white cursor-pointer transition-colors">{t}</span>
            ))}
          </div>
        </div>
      </div>
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
      <CloudNav siteName={siteName} />
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
      <CloudNav siteName={siteName} />
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

// ── Mobile mock page ──
function MockMobileHomePage({ siteName }: { siteName: string }) {
  return (
    <div className="w-full bg-white overflow-y-auto h-full text-sm">
      {/* Mobile nav */}
      <div className="bg-[#1a2332] text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded flex items-center justify-center bg-gradient-to-br from-orange-400 to-pink-500">
            <i className="ri-cloud-line text-white" style={{ fontSize: "10px" }} />
          </div>
          <span className="font-bold text-sm">{siteName}</span>
        </div>
        <i className="ri-menu-line text-white text-lg" />
      </div>
      {/* Hero */}
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
      {/* Products */}
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
      {/* Stats */}
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
      {/* Footer */}
      <div className="bg-[#0d1b2e] text-gray-400 px-4 py-4 text-xs text-center">
        © 2025 {siteName} Cloud. All rights reserved.
      </div>
    </div>
  );
}

export default function PreviewPanel({ isFinished, activePage, siteName, platform = "pc" }: Props) {
  const isMobile = platform === "mobile";

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
      default: return <MockHomePage siteName={siteName} />;
    }
  };

  if (isMobile) {
    return (
      <div className="h-full flex items-center justify-center bg-[#f0eeeb] overflow-auto py-6">
        {/* Phone frame */}
        <div className="relative flex-shrink-0" style={{ width: "375px" }}>
          {/* Phone shell */}
          <div className="relative bg-gray-900 rounded-[44px] p-3" style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.35)" }}>
            {/* Status bar */}
            <div className="bg-black rounded-t-[36px] px-6 pt-3 pb-1 flex items-center justify-between">
              <span className="text-white text-xs font-medium">9:41</span>
              <div className="w-20 h-5 bg-black rounded-full" />
              <div className="flex items-center gap-1">
                <i className="ri-signal-wifi-fill text-white text-xs" />
                <i className="ri-battery-fill text-white text-xs" />
              </div>
            </div>
            {/* Screen content */}
            <div className="bg-white overflow-hidden rounded-b-[36px]" style={{ height: "660px" }}>
              {renderPageContent()}
            </div>
          </div>
          {/* Home indicator */}
          <div className="flex justify-center mt-2">
            <div className="w-24 h-1 bg-gray-600 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-hidden">{renderPageContent()}</div>
    </div>
  );
}
