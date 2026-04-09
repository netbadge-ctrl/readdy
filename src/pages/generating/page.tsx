import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import CodePreview from "./components/CodePreview";
import PreviewPanel from "./components/PreviewPanel";
import AIWorkbench from "./components/AIWorkbench";
import VersionHistoryPanel, { VersionRecord } from "./components/VersionHistoryPanel";
import UserAvatar from "@/components/feature/UserAvatar";

const MOCK_PAGES = ["首页", "关于我们", "产品列表", "联系我们"];
const MOCK_URL = "https://preview.readdy.ai/my-project";

// Page thumbnail images (Stable Diffusion style)
const PAGE_THUMBNAILS: Record<string, string> = {
  "首页": "https://readdy.ai/api/search-image?query=modern%20cloud%20computing%20website%20homepage%20hero%20section%20with%20dark%20navy%20background%20orange%20accent%20colors%20server%20infrastructure%20illustration%20minimal%20clean%20design&width=160&height=100&seq=thumb-home&orientation=landscape",
  "关于我们": "https://readdy.ai/api/search-image?query=corporate%20about%20us%20page%20dashboard%20console%20interface%20dark%20theme%20with%20data%20charts%20and%20metrics%20minimal%20clean%20design&width=160&height=100&seq=thumb-about&orientation=landscape",
  "产品列表": "https://readdy.ai/api/search-image?query=product%20pricing%20page%20with%20three%20tier%20cards%20white%20background%20orange%20highlight%20minimal%20clean%20saas%20website%20design&width=160&height=100&seq=thumb-products&orientation=landscape",
  "联系我们": "https://readdy.ai/api/search-image?query=contact%20us%20form%20page%20white%20background%20minimal%20clean%20design%20with%20input%20fields%20and%20submit%20button%20corporate%20website&width=160&height=100&seq=thumb-contact&orientation=landscape",
};

// ── Tooltip wrapper ──
function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-1 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap z-[100] pointer-events-none"
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
        >
          {label}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
        </div>
      )}
    </div>
  );
}

export default function GeneratingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const prompt = searchParams.get("prompt") || "构建一个应用";
  const projectName = searchParams.get("name") || "未命名项目";
  const projectId = searchParams.get("projectId");

  const platform = (searchParams.get("platform") || "pc") as "pc" | "mobile";
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [isFinished, setIsFinished] = useState(!!projectId);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [pages, setPages] = useState(MOCK_PAGES);
  const [activePage, setActivePage] = useState(MOCK_PAGES[0]);
  const [editingName, setEditingName] = useState(false);
  const [currentName, setCurrentName] = useState(projectName === "未命名项目" ? "云服务官网" : projectName);
  const [pageDropdownOpen, setPageDropdownOpen] = useState(false);
  const [editingPageName, setEditingPageName] = useState<string | null>(null);
  const [editingPageValue, setEditingPageValue] = useState("");
  const [creatingPage, setCreatingPage] = useState(false);
  const [newPageName, setNewPageName] = useState("");

  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [versions, setVersions] = useState<VersionRecord[]>([
    { versionId: 1, time: "今天 10:24", description: "初始生成：云服务官网，包含首页、关于我们、产品列表、联系我们四个页面", isActive: true },
  ]);

  const newPageInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const pageDropdownRef = useRef<HTMLDivElement>(null);
  const pageNameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (projectId) return;
    const timer = setInterval(() => setElapsedTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, [projectId]);

  useEffect(() => {
    if (projectId) return;
    const timer = setTimeout(() => setIsFinished(true), 9000);
    return () => clearTimeout(timer);
  }, [projectId]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (pageDropdownRef.current && !pageDropdownRef.current.contains(e.target as Node)) {
        setPageDropdownOpen(false);
        setEditingPageName(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const pagePath = activePage === "首页" ? "/" : `/${activePage}`;

  const commitPageRename = () => {
    const newName = editingPageValue.trim();
    if (newName && newName !== editingPageName) {
      setPages(prev => prev.map(p => p === editingPageName ? newName : p));
      if (activePage === editingPageName) setActivePage(newName);
    }
    setEditingPageName(null);
  };

  const commitNewPage = () => {
    const name = newPageName.trim();
    if (name && !pages.includes(name)) {
      setPages(prev => [...prev, name]);
      setActivePage(name);
    }
    setCreatingPage(false);
    setNewPageName("");
    setPageDropdownOpen(false);
  };

  const handleCopyToNewProject = () => {
    const copyName = encodeURIComponent(`${currentName} 副本`);
    const copyPrompt = encodeURIComponent(prompt);
    window.open(`/generating?prompt=${copyPrompt}&name=${copyName}`, "_blank");
  };

  // Called by AIWorkbench when a new version is created
  const handleNewVersion = (versionId: number, time: string, description: string) => {
    setVersions(prev => [
      ...prev.map(v => ({ ...v, isActive: false })),
      { versionId, time, description, isActive: true },
    ]);
  };

  const handleRollback = (versionId: number) => {
    setVersions(prev =>
      prev.map(v => ({ ...v, isActive: v.versionId === versionId }))
    );
  };

  return (
    <div className="flex h-screen bg-[#faf9f7] overflow-hidden flex-col">
      {/* ── Top bar ── */}
      <header className="flex items-center gap-2 px-4 bg-white border-b border-gray-100 flex-shrink-0 h-12">
        {/* Back */}
        <Tooltip label="返回首页">
          <button
            onClick={() => navigate("/")}
            className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all cursor-pointer flex-shrink-0"
          >
            <i className="ri-arrow-left-line text-sm" />
          </button>
        </Tooltip>

        {/* Logo + project name (editable) */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="w-5 h-5 flex items-center justify-center rounded-md bg-gradient-to-br from-orange-400 to-pink-500 flex-shrink-0">
            <i className="ri-sparkling-line text-white" style={{ fontSize: "9px" }} />
          </div>
          {editingName ? (
            <input
              ref={nameInputRef}
              value={currentName}
              onChange={(e) => setCurrentName(e.target.value)}
              onBlur={() => setEditingName(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === "Escape") setEditingName(false);
              }}
              autoFocus
              className="text-sm font-semibold text-gray-900 bg-gray-100 rounded-md px-2 py-0.5 outline-none border border-gray-300 w-36 focus:border-gray-400"
            />
          ) : (
            <button
              onClick={() => { setEditingName(true); setTimeout(() => nameInputRef.current?.select(), 10); }}
              className="text-sm font-semibold text-gray-900 whitespace-nowrap hover:bg-gray-100 rounded-md px-1.5 py-0.5 transition-colors cursor-pointer group flex items-center gap-1"
            >
              {currentName}
              <div className="w-3 h-3 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <i className="ri-pencil-line text-gray-400" style={{ fontSize: "10px" }} />
              </div>
            </button>
          )}
        </div>

        <div className="w-px h-4 bg-gray-200 flex-shrink-0 mx-1" />

        {/* ── Browser toolbar (left-aligned, flex-1) ── */}
        <div className="flex-1 flex items-center gap-1.5 min-w-0 justify-start">
          {/* Refresh */}
          <Tooltip label="刷新预览">
            <button className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all cursor-pointer flex-shrink-0">
              <i className="ri-refresh-line text-sm" />
            </button>
          </Tooltip>

          {/* Address bar / page selector */}
          <div className="relative w-full max-w-xl" ref={pageDropdownRef}>
            <button
              onClick={() => setPageDropdownOpen((v) => !v)}
              className="w-full flex items-center gap-2 bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-lg px-3 py-1.5 transition-colors cursor-pointer"
            >
              <div className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">
                <i className="ri-global-line text-gray-400 text-xs" />
              </div>
              <span className="text-xs text-gray-700 font-medium flex-shrink-0">{currentName}</span>
              <span className="text-xs text-gray-400 flex-1 text-left truncate">{pagePath}</span>
              <div className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">
                <i className={`text-gray-400 text-xs ${pageDropdownOpen ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"}`} />
              </div>
            </button>

            {pageDropdownOpen && (
              <div
                className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-100 rounded-xl overflow-hidden z-50"
                style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.08)", minWidth: "320px" }}
              >
                <div className="p-2 flex flex-col gap-1">
                  {pages.map((page) => {
                    const path = page === "首页" ? "/" : `/${page}`;
                    const isActive = page === activePage;
                    const isEditingThis = editingPageName === page;
                    const thumb = PAGE_THUMBNAILS[page];

                    return (
                      <div
                        key={page}
                        className={`flex items-center gap-3 px-2 py-2 rounded-lg text-xs transition-colors cursor-pointer group ${
                          isActive ? "bg-orange-50" : "hover:bg-gray-50"
                        }`}
                        onClick={() => {
                          if (!isEditingThis) {
                            setActivePage(page);
                            setPageDropdownOpen(false);
                          }
                        }}
                      >
                        {/* Thumbnail */}
                        <div className="w-14 h-9 rounded-md overflow-hidden border border-gray-100 flex-shrink-0 bg-gray-100">
                          {thumb ? (
                            <img
                              src={thumb}
                              alt={page}
                              className="w-full h-full object-cover object-top"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <i className="ri-layout-line text-gray-300 text-sm" />
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            {isEditingThis ? (
                              <input
                                ref={pageNameInputRef}
                                value={editingPageValue}
                                onChange={e => setEditingPageValue(e.target.value)}
                                onBlur={commitPageRename}
                                onKeyDown={e => {
                                  if (e.key === "Enter") commitPageRename();
                                  if (e.key === "Escape") setEditingPageName(null);
                                }}
                                autoFocus
                                className="flex-1 text-xs text-gray-700 bg-white border border-gray-300 rounded px-1.5 py-0.5 outline-none focus:border-orange-300"
                                onClick={e => e.stopPropagation()}
                              />
                            ) : (
                              <span className={`font-medium truncate ${isActive ? "text-orange-600" : "text-gray-700"}`}>
                                {page}
                              </span>
                            )}
                            {isActive && (
                              <span className="flex-shrink-0 w-3.5 h-3.5 flex items-center justify-center">
                                <i className="ri-check-line text-orange-500 text-xs" />
                              </span>
                            )}
                          </div>
                          <span className="text-gray-400 truncate block">{path}</span>
                        </div>

                        {/* Rename btn */}
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setEditingPageName(page);
                            setEditingPageValue(page);
                          }}
                          className="w-6 h-6 flex items-center justify-center text-gray-300 hover:text-gray-600 rounded-lg transition-colors cursor-pointer opacity-0 group-hover:opacity-100 flex-shrink-0"
                          title="重命名"
                        >
                          <i className="ri-pencil-line" style={{ fontSize: "11px" }} />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Divider + Create new page */}
                <div className="border-t border-gray-50 p-2">
                  {creatingPage ? (
                    <div className="flex items-center gap-2 px-2 py-1.5">
                      <div className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">
                        <i className="ri-add-line text-orange-400 text-xs" />
                      </div>
                      <input
                        ref={newPageInputRef}
                        value={newPageName}
                        onChange={e => setNewPageName(e.target.value)}
                        onBlur={commitNewPage}
                        onKeyDown={e => {
                          if (e.key === "Enter") commitNewPage();
                          if (e.key === "Escape") { setCreatingPage(false); setNewPageName(""); }
                        }}
                        autoFocus
                        placeholder="输入页面名称..."
                        className="flex-1 text-xs text-gray-700 bg-gray-100 border border-gray-300 rounded px-2 py-1 outline-none focus:border-orange-300"
                      />
                      <button
                        onMouseDown={e => { e.preventDefault(); commitNewPage(); }}
                        className="text-xs text-orange-500 font-medium hover:text-orange-600 cursor-pointer whitespace-nowrap px-1"
                      >
                        确认
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setCreatingPage(true); setTimeout(() => newPageInputRef.current?.focus(), 50); }}
                      className="w-full flex items-center gap-2 px-2 py-2 text-xs text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-colors cursor-pointer rounded-lg"
                    >
                      <div className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">
                        <i className="ri-add-line text-xs" />
                      </div>
                      创建新页面
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Preview / Code toggle */}
          <div className="flex items-center bg-gray-100 rounded-full px-1 py-1 gap-0.5 flex-shrink-0">
            {([
              { key: "preview" as const, label: "预览", icon: "ri-eye-line" },
              { key: "code" as const, label: "代码", icon: "ri-code-line" },
            ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.key ? "bg-white text-gray-900" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <i className={tab.icon} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Share */}
          <Tooltip label="分享项目">
            <button className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all cursor-pointer flex-shrink-0">
              <i className="ri-share-line text-sm" />
            </button>
          </Tooltip>

          {/* Version history */}
          <Tooltip label="版本历史">
            <button
              onClick={() => setShowVersionHistory((v) => !v)}
              className={`w-7 h-7 flex items-center justify-center rounded-lg transition-all cursor-pointer flex-shrink-0 ${
                showVersionHistory
                  ? "bg-orange-50 text-orange-500"
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              }`}
            >
              <i className="ri-history-line text-sm" />
            </button>
          </Tooltip>

          {/* Copy to new project */}
          <Tooltip label="复制到新项目">
            <button
              onClick={handleCopyToNewProject}
              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all cursor-pointer flex-shrink-0"
            >
              <i className="ri-file-copy-line text-sm" />
            </button>
          </Tooltip>
        </div>

        {/* Right: user avatar */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <UserAvatar />
        </div>


      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Preview / Code area */}
        <div className="flex-1 overflow-hidden min-w-0">
          {activeTab === "preview" ? (
            <PreviewPanel isFinished={isFinished} activePage={activePage} siteName={currentName} platform={platform} onPageRename={(o, n) => setPages(prev => prev.map(p => p === o ? n : p))} />
          ) : (
            <CodePreview />
          )}
        </div>

        {/* Right panel: version history or AI workbench */}
        {showVersionHistory ? (
          <div className="w-72 flex-shrink-0 flex flex-col overflow-hidden">
            <VersionHistoryPanel
              versions={versions}
              onClose={() => setShowVersionHistory(false)}
              onRollback={handleRollback}
            />
          </div>
        ) : (
          <div className="w-80 flex-shrink-0 flex flex-col overflow-hidden">
            <AIWorkbench
              initialPrompt={prompt}
              isFinished={isFinished}
              elapsedTime={elapsedTime}
              onNewVersion={handleNewVersion}
            />
          </div>
        )}
      </div>
    </div>
  );
}
