import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserAvatar from "@/components/feature/UserAvatar";

type Theme = "light" | "dark" | "system";
type SubmitKey = "enter" | "cmd-enter";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<Theme>("light");
  const [submitKey, setSubmitKey] = useState<SubmitKey>("cmd-enter");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    navigate("/");
  };

  const planUsage = {
    plan: "Pro",
    credits: 8420,
    totalCredits: 10000,
    resetDate: "2026-05-01",
    history: [
      { date: "2026-04-07", action: "生成项目「云服务官网」", cost: 320 },
      { date: "2026-04-06", action: "生成项目「电商平台首页」", cost: 280 },
      { date: "2026-04-05", action: "修改「个人博客」页面", cost: 95 },
      { date: "2026-04-04", action: "生成项目「SaaS 落地页」", cost: 310 },
      { date: "2026-04-03", action: "生成项目「餐厅官网」", cost: 275 },
    ],
  };

  const usedCredits = planUsage.totalCredits - planUsage.credits;
  const usagePercent = Math.round((usedCredits / planUsage.totalCredits) * 100);

  return (
    <div className="flex h-screen overflow-hidden bg-[#faf9f7]">
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-3 bg-[#faf9f7] border-b border-gray-100 flex-shrink-0">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
          >
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-arrow-left-line text-sm" />
            </span>
            返回
          </button>
          <UserAvatar />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-8 py-10 flex flex-col gap-8">

            {/* Page title */}
            <div>
              <h1 className="text-xl font-semibold text-gray-900">个人设置</h1>
              <p className="text-sm text-gray-400 mt-1">管理你的账户偏好与使用情况</p>
            </div>

            {/* ── 订阅与积分 ── */}
            <section className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-800">订阅与积分</h2>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-orange-50 text-orange-500">
                  {planUsage.plan} 计划
                </span>
              </div>

              <div className="px-6 py-5 flex flex-col gap-5">
                {/* Usage bar */}
                <div>
                  <div className="flex items-end justify-between mb-2">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">{usedCredits.toLocaleString()}</span>
                      <span className="text-sm text-gray-400 ml-1">/ {planUsage.totalCredits.toLocaleString()} 积分已用</span>
                    </div>
                    <span className="text-xs text-gray-400">{usagePercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-400 to-pink-400 rounded-full transition-all"
                      style={{ width: `${usagePercent}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    剩余 <span className="text-gray-700 font-medium">{planUsage.credits.toLocaleString()}</span> 积分 · 将于 {planUsage.resetDate} 重置
                  </p>
                </div>

                {/* History */}
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-3">近期消耗记录</p>
                  <div className="flex flex-col gap-2">
                    {planUsage.history.map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-50 flex-shrink-0">
                            <i className="ri-sparkling-line text-orange-400 text-sm" />
                          </span>
                          <div>
                            <p className="text-sm text-gray-700">{item.action}</p>
                            <p className="text-xs text-gray-400">{item.date}</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-600">-{item.cost}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upgrade */}
                <button className="w-full py-2.5 rounded-lg border border-orange-200 text-sm font-medium text-orange-500 hover:bg-orange-50 transition-colors cursor-pointer whitespace-nowrap">
                  升级计划，获取更多积分
                </button>
              </div>
            </section>

            {/* ── 使用设置 ── */}
            <section className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-gray-800">使用设置</h2>
              </div>

              <div className="px-6 py-5 flex flex-col gap-6">
                {/* 外观偏好 */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">外观偏好</p>
                  <div className="flex items-center gap-3">
                    {([
                      { key: "light", label: "浅色", icon: "ri-sun-line" },
                      { key: "dark", label: "深色", icon: "ri-moon-line" },
                      { key: "system", label: "跟随系统", icon: "ri-computer-line" },
                    ] as { key: Theme; label: string; icon: string }[]).map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => setTheme(opt.key)}
                        className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-xl border-2 transition-all cursor-pointer ${
                          theme === opt.key
                            ? "border-orange-400 bg-orange-50"
                            : "border-gray-100 hover:border-gray-200 bg-gray-50"
                        }`}
                      >
                        <span className={`w-6 h-6 flex items-center justify-center ${theme === opt.key ? "text-orange-500" : "text-gray-400"}`}>
                          <i className={`${opt.icon} text-lg`} />
                        </span>
                        <span className={`text-xs font-medium ${theme === opt.key ? "text-orange-600" : "text-gray-500"}`}>
                          {opt.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 提交快捷键 */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">提交命令快捷键</p>
                  <p className="text-xs text-gray-400 mb-3">选择在输入框中发送消息的方式</p>
                  <div className="flex flex-col gap-2">
                    {([
                      {
                        key: "enter",
                        label: "回车发送",
                        desc: "按 Enter 直接发送，Shift+Enter 换行",
                        badge: "Enter",
                      },
                      {
                        key: "cmd-enter",
                        label: "Command + 回车发送",
                        desc: "按 ⌘ Enter 发送，Enter 直接换行",
                        badge: "⌘ Enter",
                      },
                    ] as { key: SubmitKey; label: string; desc: string; badge: string }[]).map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => setSubmitKey(opt.key)}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl border-2 transition-all cursor-pointer text-left ${
                          submitKey === opt.key
                            ? "border-orange-400 bg-orange-50"
                            : "border-gray-100 hover:border-gray-200"
                        }`}
                      >
                        <div>
                          <p className={`text-sm font-medium ${submitKey === opt.key ? "text-orange-700" : "text-gray-700"}`}>
                            {opt.label}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">{opt.desc}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                          <span className={`text-xs font-mono px-2 py-1 rounded-md ${
                            submitKey === opt.key
                              ? "bg-orange-100 text-orange-600"
                              : "bg-gray-100 text-gray-500"
                          }`}>
                            {opt.badge}
                          </span>
                          {submitKey === opt.key && (
                            <span className="w-4 h-4 flex items-center justify-center">
                              <i className="ri-check-line text-orange-500 text-sm" />
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ── 退出登录 ── */}
            <section className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">退出登录</p>
                  <p className="text-xs text-gray-400 mt-0.5">退出当前账户，返回登录页</p>
                </div>
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="px-4 py-2 rounded-lg border border-red-200 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors cursor-pointer whitespace-nowrap"
                >
                  退出登录
                </button>
              </div>
            </section>

            <div className="h-4" />
          </div>
        </div>
      </main>

      {/* Logout confirm modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-lg">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 mb-4">
              <i className="ri-logout-box-line text-red-500 text-lg" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">确认退出？</h3>
            <p className="text-sm text-gray-400 mb-5">退出后需要重新登录才能访问工作台。</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                取消
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-2.5 rounded-lg bg-red-500 text-sm font-medium text-white hover:bg-red-600 transition-colors cursor-pointer whitespace-nowrap"
              >
                确认退出
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
