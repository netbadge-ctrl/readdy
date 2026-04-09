import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface NewProjectModalProps {
  onClose: () => void;
}

const TEMPLATES = [
  { id: "blank", icon: "ri-file-line", label: "空白项目", desc: "从零开始构建" },
  { id: "landing", icon: "ri-layout-top-line", label: "落地页", desc: "营销网站模板" },
  { id: "dashboard", icon: "ri-dashboard-line", label: "管理后台", desc: "Admin 面板模板" },
  { id: "ecommerce", icon: "ri-shopping-bag-line", label: "电商平台", desc: "在线商店模板" },
];

type Platform = "pc" | "mobile";

export default function NewProjectModal({ onClose }: NewProjectModalProps) {
  const [prompt, setPrompt] = useState("");
  const [selected, setSelected] = useState("blank");
  const [platform, setPlatform] = useState<Platform>("pc");
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  const handleCreate = () => {
    if (!prompt.trim() && selected === "blank") return;
    setCreating(true);
    setTimeout(() => {
      setCreating(false);
      onClose();
      navigate(`/generating?prompt=${encodeURIComponent(prompt.trim() || selected)}&platform=${platform}`);
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg mx-4 overflow-hidden"
        style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.14)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">创建新项目</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-lg" />
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5">
          {/* Platform selector */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-2 block">适配平台</label>
            <div className="flex gap-3">
              <button
                onClick={() => setPlatform("pc")}
                className={`flex-1 flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                  platform === "pc"
                    ? "border-orange-400 bg-orange-50"
                    : "border-gray-100 hover:border-gray-200 bg-gray-50"
                }`}
              >
                <div className={`w-9 h-9 flex items-center justify-center rounded-xl flex-shrink-0 ${
                  platform === "pc" ? "bg-orange-100 text-orange-500" : "bg-white text-gray-400"
                }`}>
                  <i className="ri-computer-line text-lg" />
                </div>
                <div className="text-left">
                  <p className={`text-sm font-semibold ${platform === "pc" ? "text-orange-700" : "text-gray-700"}`}>
                    PC 端应用
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">桌面浏览器优先</p>
                </div>
                {platform === "pc" && (
                  <div className="ml-auto w-4 h-4 flex items-center justify-center flex-shrink-0">
                    <i className="ri-check-line text-orange-500 text-sm" />
                  </div>
                )}
              </button>

              <button
                onClick={() => setPlatform("mobile")}
                className={`flex-1 flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                  platform === "mobile"
                    ? "border-orange-400 bg-orange-50"
                    : "border-gray-100 hover:border-gray-200 bg-gray-50"
                }`}
              >
                <div className={`w-9 h-9 flex items-center justify-center rounded-xl flex-shrink-0 ${
                  platform === "mobile" ? "bg-orange-100 text-orange-500" : "bg-white text-gray-400"
                }`}>
                  <i className="ri-smartphone-line text-lg" />
                </div>
                <div className="text-left">
                  <p className={`text-sm font-semibold ${platform === "mobile" ? "text-orange-700" : "text-gray-700"}`}>
                    移动端应用
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">手机屏幕优先</p>
                </div>
                {platform === "mobile" && (
                  <div className="ml-auto w-4 h-4 flex items-center justify-center flex-shrink-0">
                    <i className="ri-check-line text-orange-500 text-sm" />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Prompt */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1.5 block">描述你的项目</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value.slice(0, 500))}
              placeholder="用一两句话描述你想构建的应用..."
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:border-gray-300 transition"
            />
            <div className="text-right text-xs text-gray-300 mt-1">{prompt.length}/500</div>
          </div>

          {/* Templates */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-2 block">从模板开始</label>
            <div className="grid grid-cols-2 gap-2">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelected(t.id)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selected === t.id
                      ? "border-gray-900 bg-gray-50"
                      : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 flex-shrink-0">
                    <i className={`${t.icon} text-gray-600 text-base`} />
                  </span>
                  <div>
                    <div className="text-xs font-semibold text-gray-800">{t.label}</div>
                    <div className="text-xs text-gray-400">{t.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer whitespace-nowrap"
          >
            取消
          </button>
          <button
            onClick={handleCreate}
            disabled={creating}
            className="px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-60 flex items-center gap-2"
          >
            {creating ? (
              <>
                <i className="ri-loader-4-line animate-spin text-sm" />
                创建中...
              </>
            ) : (
              <>
                <i className={platform === "mobile" ? "ri-smartphone-line text-sm" : "ri-computer-line text-sm"} />
                创建项目
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
