import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { icon: "ri-layout-grid-line", label: "项目", path: "/" },
  { icon: "ri-star-line", label: "收藏", path: "/starred" },
  { icon: "ri-team-line", label: "团队", path: "/teams" },
  { icon: "ri-settings-3-line", label: "设置", path: "/settings" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex flex-col h-full bg-white border-l border-gray-100 transition-all duration-200 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-gray-100">
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <i className={`${collapsed ? "ri-menu-unfold-line" : "ri-menu-fold-line"} text-base`} />
        </button>
        {!collapsed && (
          <>
            <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-pink-500">
              <i className="ri-sparkling-line text-white text-sm" />
            </div>
            <span className="text-sm font-semibold text-gray-900 tracking-tight">AI 工作台</span>
          </>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 flex flex-col gap-0.5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap w-full text-left ${
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                <i className={`${item.icon} text-base`} />
              </span>
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-2 py-4 border-t border-gray-100">
        <button className="flex items-center gap-3 px-3 py-2 rounded-lg w-full hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-semibold">陈</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col items-start min-w-0">
              <span className="text-xs font-medium text-gray-800 truncate w-full">陈楠</span>
              <span className="text-xs text-gray-400 truncate w-full">chen@example.com</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
