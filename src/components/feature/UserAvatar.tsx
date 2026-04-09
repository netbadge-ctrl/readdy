import { useState, useRef, useEffect } from "react";
import SettingsModal from "@/pages/dashboard/components/SettingsModal";

type ModalTab = "profile" | "subscription";

export default function UserAvatar() {
  const [open, setOpen] = useState(false);
  const [modalTab, setModalTab] = useState<ModalTab | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const openModal = (tab: ModalTab) => {
    setOpen(false);
    setModalTab(tab);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
      >
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-semibold">A</span>
        </div>
        <span className="text-sm text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Alex</span>
        <div className="w-4 h-4 flex items-center justify-center text-gray-400">
          {open ? <i className="ri-arrow-up-s-line text-sm" /> : <i className="ri-arrow-down-s-line text-sm" />}
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 top-full mt-1.5 w-52 bg-white border border-gray-100 rounded-xl overflow-hidden z-50"
          style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
        >
          {/* User info */}
          <div className="px-4 py-3 border-b border-gray-50">
            <p className="text-sm font-semibold text-gray-900">Alex Chen</p>
            <p className="text-xs text-gray-400 mt-0.5">alex@example.com</p>
          </div>

          {/* Menu items */}
          <div className="py-1.5">
            <button
              onClick={() => openModal("profile")}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer text-left"
            >
              <div className="w-4 h-4 flex items-center justify-center text-gray-400">
                <i className="ri-settings-3-line text-sm" />
              </div>
              个人设置
            </button>
            <button
              onClick={() => openModal("subscription")}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer text-left"
            >
              <div className="w-4 h-4 flex items-center justify-center text-gray-400">
                <i className="ri-vip-crown-line text-sm" />
              </div>
              订阅与积分
            </button>
            <div className="my-1 border-t border-gray-50" />
            <button
              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer text-left"
            >
              <div className="w-4 h-4 flex items-center justify-center text-gray-400">
                <i className="ri-question-line text-sm" />
              </div>
              帮助与反馈
            </button>
            <div className="my-1 border-t border-gray-50" />
            <button
              onClick={() => { setOpen(false); setModalTab("profile"); }}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer text-left"
            >
              <div className="w-4 h-4 flex items-center justify-center text-red-400">
                <i className="ri-logout-box-r-line text-sm" />
              </div>
              退出登录
            </button>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {modalTab !== null && (
        <SettingsModal
          defaultTab={modalTab}
          onClose={() => setModalTab(null)}
        />
      )}
    </div>
  );
}
