import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type QRStatus = "waiting" | "scanned" | "confirmed";

export default function QRLoginPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<QRStatus>("waiting");
  const [countdown, setCountdown] = useState(60);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (status !== "waiting") return;
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, status]);

  useEffect(() => {
    if (status === "scanned") {
      const timer = setTimeout(() => setStatus("confirmed"), 1500);
      return () => clearTimeout(timer);
    }
    if (status === "confirmed") {
      const timer = setTimeout(() => navigate("/dashboard"), 900);
      return () => clearTimeout(timer);
    }
  }, [status, navigate]);

  const handleQRClick = () => {
    if (status === "waiting" && countdown > 0) {
      setStatus("scanned");
    }
  };

  const handleRefresh = () => {
    setStatus("waiting");
    setCountdown(60);
    setRefreshKey((k) => k + 1);
  };

  const isExpired = status === "waiting" && countdown === 0;

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif" }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[46%] relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, #0f1923 0%, #1a2a3a 60%, #0d1f2d 100%)" }}>
        {/* Decorative circles */}
        <div className="absolute top-[-80px] left-[-80px] w-[360px] h-[360px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #e8b84b 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-60px] right-[-60px] w-[280px] h-[280px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #e8b84b 0%, transparent 70%)" }} />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }} />

        {/* Logo */}
        <div className="relative z-10 px-14 pt-14">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #e8b84b 0%, #d4a030 100%)" }}>
              <i className="ri-qr-code-line text-white text-lg" />
            </div>
            <div>
              <span className="text-white font-bold text-xl tracking-wide">金山云码</span>
            </div>
          </div>
        </div>

        {/* Center content */}
        <div className="relative z-10 px-14 flex flex-col gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
              style={{ background: "rgba(232,184,75,0.15)", border: "1px solid rgba(232,184,75,0.3)" }}>
              <i className="ri-sparkling-line text-xs" style={{ color: "#e8b84b" }} />
              <span className="text-xs font-medium" style={{ color: "#e8b84b" }}>AI 驱动 · 智能生成</span>
            </div>
            <h2 className="text-white text-[2.1rem] font-bold leading-tight mb-4 tracking-tight">
              描述需求<br />
              <span style={{ color: "#e8b84b" }}>秒出原型图</span>
            </h2>
            <p className="text-white/50 text-sm leading-7">
              产品经理只需用自然语言描述功能需求，<br />
              金山云码即刻生成可交互的高保真原型
            </p>
          </div>

          {/* Feature list */}
          <div className="flex flex-col gap-4">
            {[
              { icon: "ri-chat-voice-line", title: "自然语言驱动", desc: "用文字描述需求，AI 自动理解并生成页面结构" },
              { icon: "ri-layout-masonry-line", title: "高保真原型", desc: "生成可点击、可交互的完整原型，还原真实体验" },
              { icon: "ri-loop-right-line", title: "实时迭代修改", desc: "对话式修改，随时调整布局、内容与交互逻辑" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(232,184,75,0.15)" }}>
                  <i className={`${item.icon} text-sm`} style={{ color: "#e8b84b" }} />
                </div>
                <div>
                  <p className="text-white/90 text-sm font-medium">{item.title}</p>
                  <p className="text-white/40 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10 px-14 pb-10">
          <p className="text-white/20 text-xs">© 2026 金山云码 · 版权所有</p>
        </div>
      </div>

      {/* Right: QR area */}
      <div className="flex flex-col items-center justify-center flex-1 bg-[#f7f8fa] px-8">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2.5 mb-10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #e8b84b 0%, #d4a030 100%)" }}>
            <i className="ri-qr-code-line text-white text-lg" />
          </div>
          <span className="text-gray-900 font-bold text-xl">金山云码</span>
        </div>

        <div className="w-full max-w-[380px] flex flex-col items-center">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">扫码登录</h1>
            <p className="text-sm text-gray-400">
              使用<span className="text-gray-600 font-medium">WPS协作</span> 扫描下方二维码
            </p>
          </div>

          {/* QR Card */}
          <div className="bg-white rounded-2xl p-7 flex flex-col items-center w-full"
            style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}>

            {/* QR Box */}
            <div
              className={`relative w-[200px] h-[200px] rounded-xl cursor-pointer select-none transition-all duration-300
                ${!isExpired && status === "waiting" ? "hover:scale-[1.02]" : ""}
              `}
              onClick={handleQRClick}
              title="点击模拟扫码成功"
            >
              {/* QR content */}
              <div className={`w-full h-full rounded-xl overflow-hidden bg-white transition-opacity duration-300
                ${status !== "waiting" || isExpired ? "opacity-20" : "opacity-100"}`}>
                <div className="w-full h-full flex items-center justify-center bg-white p-3">
                  <QRPattern key={refreshKey} />
                </div>
              </div>

              {/* Corner marks */}
              {status === "waiting" && !isExpired && (
                <>
                  <span className="absolute top-0 left-0 w-6 h-6 border-t-[3px] border-l-[3px] rounded-tl-lg" style={{ borderColor: "#e8b84b" }} />
                  <span className="absolute top-0 right-0 w-6 h-6 border-t-[3px] border-r-[3px] rounded-tr-lg" style={{ borderColor: "#e8b84b" }} />
                  <span className="absolute bottom-0 left-0 w-6 h-6 border-b-[3px] border-l-[3px] rounded-bl-lg" style={{ borderColor: "#e8b84b" }} />
                  <span className="absolute bottom-0 right-0 w-6 h-6 border-b-[3px] border-r-[3px] rounded-br-lg" style={{ borderColor: "#e8b84b" }} />
                </>
              )}

              {/* Scan line */}
              {status === "waiting" && !isExpired && (
                <div className="absolute inset-x-2 h-[2px] rounded-full animate-scan-line"
                  style={{ background: "linear-gradient(90deg, transparent, #e8b84b, transparent)" }} />
              )}

              {/* Scanned overlay */}
              {status === "scanned" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-white/90">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-2 animate-pulse"
                    style={{ background: "rgba(232,184,75,0.12)" }}>
                    <i className="ri-smartphone-line text-2xl" style={{ color: "#e8b84b" }} />
                  </div>
                  <p className="text-sm font-semibold text-gray-700">扫码成功</p>
                  <p className="text-xs text-gray-400 mt-1">请在手机上确认登录...</p>
                </div>
              )}

              {/* Confirmed overlay */}
              {status === "confirmed" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-white/95">
                  <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-2">
                    <i className="ri-checkbox-circle-fill text-green-500 text-3xl" />
                  </div>
                  <p className="text-sm font-semibold text-gray-700">登录成功</p>
                  <p className="text-xs text-gray-400 mt-1">正在跳转...</p>
                </div>
              )}

              {/* Expired overlay */}
              {isExpired && (
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-white/95">
                  <i className="ri-refresh-line text-3xl text-gray-300 mb-2" />
                  <p className="text-sm text-gray-500 mb-3">二维码已失效</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleRefresh(); }}
                    className="text-xs font-semibold px-4 py-1.5 rounded-full cursor-pointer transition-opacity hover:opacity-80"
                    style={{ background: "rgba(232,184,75,0.15)", color: "#c8960a" }}
                  >
                    <i className="ri-refresh-line mr-1" />点击刷新
                  </button>
                </div>
              )}
            </div>

            {/* Status bar */}
            <div className="mt-5 h-7 flex items-center justify-center">
              {status === "waiting" && !isExpired && (
                <p className="text-xs text-gray-400 flex items-center gap-1.5">
                  <i className="ri-time-line" />
                  二维码
                  <span className={`font-semibold tabular-nums ${countdown <= 15 ? "text-red-400" : "text-gray-500"}`}>
                    {countdown}秒
                  </span>
                  后失效
                  <span className="mx-1 text-gray-200">·</span>
                  <span
                    className="font-medium cursor-pointer hover:opacity-70 transition-opacity"
                    style={{ color: "#c8960a" }}
                    onClick={handleRefresh}
                  >
                    刷新
                  </span>
                </p>
              )}
              {status === "scanned" && (
                <p className="text-xs font-medium animate-pulse" style={{ color: "#c8960a" }}>
                  等待手机端确认...
                </p>
              )}
              {status === "confirmed" && (
                <p className="text-xs font-medium text-green-500">
                  登录成功，正在跳转工作台...
                </p>
              )}
              {isExpired && (
                <p className="text-xs text-gray-400">二维码已过期，请刷新后重试</p>
              )}
            </div>

            {/* Hint */}
            {status === "waiting" && !isExpired && (
              <p className="mt-3 text-[11px] text-gray-300 text-center">
                原型演示：点击二维码模拟扫码成功
              </p>
            )}
          </div>



          {/* Footer */}
          <p className="mt-8 text-xs text-gray-300 text-center">
            登录即代表您同意
            <a href="#" className="text-gray-400 underline underline-offset-2 hover:text-gray-600 cursor-pointer mx-0.5">服务协议</a>
            与
            <a href="#" className="text-gray-400 underline underline-offset-2 hover:text-gray-600 cursor-pointer mx-0.5">隐私政策</a>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes scan-line {
          0%   { top: 8px;  opacity: 1; }
          50%  { top: calc(100% - 8px); opacity: 0.5; }
          100% { top: 8px;  opacity: 1; }
        }
        .animate-scan-line {
          animation: scan-line 2.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

function QRPattern() {
  return (
    <svg width="174" height="174" viewBox="0 0 174 174" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Top-left finder */}
      <rect x="8" y="8" width="48" height="48" rx="5" fill="#1a1a1a"/>
      <rect x="15" y="15" width="34" height="34" rx="3" fill="#fff"/>
      <rect x="21" y="21" width="22" height="22" rx="2" fill="#1a1a1a"/>
      {/* Top-right finder */}
      <rect x="118" y="8" width="48" height="48" rx="5" fill="#1a1a1a"/>
      <rect x="125" y="15" width="34" height="34" rx="3" fill="#fff"/>
      <rect x="131" y="21" width="22" height="22" rx="2" fill="#1a1a1a"/>
      {/* Bottom-left finder */}
      <rect x="8" y="118" width="48" height="48" rx="5" fill="#1a1a1a"/>
      <rect x="15" y="125" width="34" height="34" rx="3" fill="#fff"/>
      <rect x="21" y="131" width="22" height="22" rx="2" fill="#1a1a1a"/>
      {/* Center logo area */}
      <rect x="76" y="76" width="22" height="22" rx="4" fill="#e8b84b"/>
      <rect x="80" y="80" width="14" height="14" rx="2" fill="#fff"/>
      {/* Data modules */}
      {[
        [70,8],[80,8],[90,8],[100,8],[110,8],
        [70,18],[90,18],[110,18],
        [70,28],[80,28],[100,28],
        [70,38],[90,38],[100,38],[110,38],
        [70,48],[80,48],[90,48],
        [8,70],[18,70],[38,70],[48,70],[58,70],
        [8,80],[28,80],[58,80],
        [8,90],[18,90],[38,90],[48,90],
        [8,100],[28,100],[48,100],[58,100],
        [8,110],[18,110],[28,110],[48,110],
        [118,70],[128,70],[148,70],[158,70],[166,70],
        [118,80],[138,80],[158,80],
        [128,90],[148,90],[166,90],
        [118,100],[138,100],[148,100],[166,100],
        [118,110],[128,110],[148,110],[158,110],
        [70,118],[80,118],[100,118],[110,118],
        [70,128],[90,128],[100,128],
        [80,138],[90,138],[110,138],
        [70,148],[80,148],[100,148],[110,148],
        [70,158],[90,158],[100,158],[110,158],[120,158],
        [118,118],[128,118],[148,118],[158,118],[166,118],
        [118,128],[138,128],[166,128],
        [128,138],[148,138],[158,138],
        [118,148],[128,148],[148,148],[166,148],
        [118,158],[138,158],[148,158],[158,158],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="8" height="8" rx="1.5" fill="#1a1a1a"/>
      ))}
    </svg>
  );
}
