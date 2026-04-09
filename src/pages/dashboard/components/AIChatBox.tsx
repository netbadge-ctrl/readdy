import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockProjects } from "@/mocks/projects";

interface AttachedFile {
  id: string;
  type: "image" | "file";
  name: string;
  preview?: string;
}

interface ReferencedPage {
  projectId: string;
  projectName: string;
  pageName: string;
}

// Page thumbnails per project (reuse mock thumbnails from projects)
const PAGE_THUMBS: Record<string, Record<string, string>> = {
  "1": {
    "首页": "https://readdy.ai/api/search-image?query=saas%20landing%20page%20hero%20section%20clean%20minimal%20white%20background%20gradient%20colorful%20modern%20web%20design&width=120&height=75&seq=pp1-1&orientation=landscape",
    "定价页": "https://readdy.ai/api/search-image?query=pricing%20page%20three%20tier%20cards%20white%20background%20minimal%20clean%20saas%20website%20design&width=120&height=75&seq=pp1-2&orientation=landscape",
    "功能介绍": "https://readdy.ai/api/search-image?query=features%20page%20icons%20grid%20layout%20clean%20minimal%20white%20background%20saas%20product%20website&width=120&height=75&seq=pp1-3&orientation=landscape",
  },
  "2": {
    "商品列表": "https://readdy.ai/api/search-image?query=ecommerce%20product%20list%20grid%20cards%20white%20background%20clean%20minimal%20online%20store%20web%20design&width=120&height=75&seq=pp2-1&orientation=landscape",
    "订单管理": "https://readdy.ai/api/search-image?query=order%20management%20table%20list%20admin%20dashboard%20clean%20minimal%20white%20background%20web%20app&width=120&height=75&seq=pp2-2&orientation=landscape",
    "数据分析": "https://readdy.ai/api/search-image?query=data%20analytics%20dashboard%20charts%20graphs%20clean%20minimal%20white%20background%20admin%20panel&width=120&height=75&seq=pp2-3&orientation=landscape",
  },
  "3": {
    "作品展示": "https://readdy.ai/api/search-image?query=portfolio%20gallery%20grid%20layout%20creative%20minimal%20white%20background%20project%20showcase%20web%20design&width=120&height=75&seq=pp3-1&orientation=landscape",
    "关于我": "https://readdy.ai/api/search-image?query=about%20me%20personal%20page%20clean%20minimal%20white%20background%20profile%20photo%20bio%20web%20design&width=120&height=75&seq=pp3-2&orientation=landscape",
    "联系页面": "https://readdy.ai/api/search-image?query=contact%20page%20form%20clean%20minimal%20white%20background%20input%20fields%20submit%20button%20web%20design&width=120&height=75&seq=pp3-3&orientation=landscape",
  },
  "4": {
    "看板视图": "https://readdy.ai/api/search-image?query=kanban%20board%20columns%20cards%20task%20management%20colorful%20clean%20minimal%20web%20app%20interface&width=120&height=75&seq=pp4-1&orientation=landscape",
    "任务详情": "https://readdy.ai/api/search-image?query=task%20detail%20page%20clean%20minimal%20white%20background%20form%20fields%20description%20web%20app&width=120&height=75&seq=pp4-2&orientation=landscape",
    "团队设置": "https://readdy.ai/api/search-image?query=team%20settings%20page%20members%20list%20avatar%20clean%20minimal%20white%20background%20admin%20web%20app&width=120&height=75&seq=pp4-3&orientation=landscape",
  },
  "5": {
    "文章列表": "https://readdy.ai/api/search-image?query=blog%20article%20list%20clean%20minimal%20white%20background%20typography%20reading%20content%20web%20design&width=120&height=75&seq=pp5-1&orientation=landscape",
    "文章详情": "https://readdy.ai/api/search-image?query=blog%20article%20detail%20page%20clean%20minimal%20white%20background%20long%20form%20reading%20typography&width=120&height=75&seq=pp5-2&orientation=landscape",
    "编辑器": "https://readdy.ai/api/search-image?query=rich%20text%20editor%20clean%20minimal%20white%20background%20toolbar%20markdown%20writing%20web%20app&width=120&height=75&seq=pp5-3&orientation=landscape",
  },
  "6": {
    "预订页面": "https://readdy.ai/api/search-image?query=restaurant%20booking%20reservation%20form%20calendar%20date%20picker%20clean%20minimal%20warm%20colors%20web%20design&width=120&height=75&seq=pp6-1&orientation=landscape",
    "桌位管理": "https://readdy.ai/api/search-image?query=table%20management%20floor%20plan%20restaurant%20seating%20layout%20clean%20minimal%20web%20app&width=120&height=75&seq=pp6-2&orientation=landscape",
    "菜单展示": "https://readdy.ai/api/search-image?query=restaurant%20menu%20page%20food%20items%20grid%20cards%20clean%20minimal%20warm%20elegant%20web%20design&width=120&height=75&seq=pp6-3&orientation=landscape",
  },
};

export default function AIChatBox() {
  const [input, setInput] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [referencedPages, setReferencedPages] = useState<ReferencedPage[]>([]);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showPagePicker, setShowPagePicker] = useState(false);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [platform, setPlatform] = useState<"pc" | "mobile">("pc");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const attachMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (attachMenuRef.current && !attachMenuRef.current.contains(e.target as Node)) {
        setShowAttachMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSubmit = () => {
    if (!input.trim() && attachedFiles.length === 0 && referencedPages.length === 0) return;
    const encoded = encodeURIComponent(input.trim());
    navigate(`/generating?prompt=${encoded}&platform=${platform}`);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAttachedFiles((prev) => [
          ...prev,
          {
            id: `img-${Date.now()}-${Math.random()}`,
            type: "image",
            name: file.name,
            preview: ev.target?.result as string,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
    setShowAttachMenu(false);
    e.target.value = "";
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      setAttachedFiles((prev) => [
        ...prev,
        {
          id: `file-${Date.now()}-${Math.random()}`,
          type: "file",
          name: file.name,
        },
      ]);
    });
    setShowAttachMenu(false);
    e.target.value = "";
  };

  const removeFile = (id: string) => {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const removePage = (projectId: string, pageName: string) => {
    setReferencedPages((prev) =>
      prev.filter((p) => !(p.projectId === projectId && p.pageName === pageName))
    );
  };

  const togglePageRef = (projectId: string, projectName: string, pageName: string) => {
    const exists = referencedPages.some(
      (p) => p.projectId === projectId && p.pageName === pageName
    );
    if (exists) {
      removePage(projectId, pageName);
    } else {
      setReferencedPages((prev) => [...prev, { projectId, projectName, pageName }]);
    }
  };

  const hasContent = input.trim() || attachedFiles.length > 0 || referencedPages.length > 0;

  // Mock pages per project
  const mockPages: Record<string, string[]> = {
    "1": ["首页", "定价页", "功能介绍"],
    "2": ["商品列表", "订单管理", "数据分析"],
    "3": ["作品展示", "关于我", "联系页面"],
    "4": ["看板视图", "任务详情", "团队设置"],
    "5": ["文章列表", "文章详情", "编辑器"],
    "6": ["预订页面", "桌位管理", "菜单展示"],
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-900 text-center mb-6 tracking-tight">
        现在我们来构建什么？
      </h1>

      {/* Chat box */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-visible hover:border-gray-300 transition-colors">
        {/* Attachments preview */}
        {(attachedFiles.length > 0 || referencedPages.length > 0) && (
          <div className="px-4 pt-3 flex flex-wrap gap-2">
            {attachedFiles.map((f) => (
              <div
                key={f.id}
                className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1.5 group"
              >
                {f.type === "image" && f.preview ? (
                  <img src={f.preview} alt={f.name} className="w-5 h-5 rounded object-cover" />
                ) : (
                  <span className="w-4 h-4 flex items-center justify-center text-gray-400">
                    <i className="ri-file-line text-xs" />
                  </span>
                )}
                <span className="text-xs text-gray-600 max-w-[120px] truncate">{f.name}</span>
                <button
                  onClick={() => removeFile(f.id)}
                  className="w-3.5 h-3.5 flex items-center justify-center text-gray-300 hover:text-gray-500 cursor-pointer ml-0.5"
                >
                  <i className="ri-close-line text-xs" />
                </button>
              </div>
            ))}
            {referencedPages.map((p) => (
              <div
                key={`${p.projectId}-${p.pageName}`}
                className="flex items-center gap-1.5 bg-orange-50 border border-orange-100 rounded-lg px-2.5 py-1.5"
              >
                <span className="w-4 h-4 flex items-center justify-center text-orange-400">
                  <i className="ri-pages-line text-xs" />
                </span>
                <span className="text-xs text-orange-700 max-w-[140px] truncate">
                  {p.projectName} · {p.pageName}
                </span>
                <button
                  onClick={() => removePage(p.projectId, p.pageName)}
                  className="w-3.5 h-3.5 flex items-center justify-center text-orange-300 hover:text-orange-500 cursor-pointer ml-0.5"
                >
                  <i className="ri-close-line text-xs" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Input area */}
        <div className="px-5 pt-4 pb-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="描述你想构建的项目应用，可以通过自然语言描述、上传图片、上传文档或引用已有页面来描述构建的需求"
            rows={3}
            className="w-full bg-transparent text-gray-800 text-sm placeholder-gray-400 resize-none focus:outline-none leading-relaxed"
          />
        </div>

        {/* Bottom toolbar */}
        <div className="flex items-center justify-between px-4 pb-4 relative">
          {/* Left: attach menu */}
          <div className="relative" ref={attachMenuRef}>
            <button
              onClick={() => { setShowAttachMenu((v) => !v); setShowPagePicker(false); }}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer rounded-lg hover:bg-gray-100"
            >
              <i className="ri-add-line text-lg" />
            </button>

            {showAttachMenu && (
              <div
                className="absolute left-0 top-full mt-1.5 w-52 bg-white border border-gray-100 rounded-xl py-1.5 z-50"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
              >
                <button
                  onClick={() => { imageInputRef.current?.click(); }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-orange-50 text-orange-400">
                    <i className="ri-image-line text-sm" />
                  </span>
                  上传截图
                </button>
                <button
                  onClick={() => { fileInputRef.current?.click(); }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-orange-50 text-orange-400">
                    <i className="ri-file-upload-line text-sm" />
                  </span>
                  上传文件
                </button>
                <div className="h-px bg-gray-100 my-1" />
                <button
                  onClick={() => { setShowPagePicker(true); setShowAttachMenu(false); }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-orange-50 text-orange-400">
                    <i className="ri-pages-line text-sm" />
                  </span>
                  引用已有页面
                </button>
              </div>
            )}


          </div>

          {/* Right: platform toggle + send */}
          <div className="flex items-center gap-2">
            {/* Platform selector */}
            <div className="flex items-center bg-gray-100 rounded-full px-1 py-1 gap-0.5">
              <button
                onClick={() => setPlatform("pc")}
                title="PC 端"
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  platform === "pc" ? "bg-white text-gray-900" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <i className="ri-computer-line text-xs" />
                PC
              </button>
              <button
                onClick={() => setPlatform("mobile")}
                title="移动端"
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  platform === "mobile" ? "bg-white text-gray-900" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <i className="ri-smartphone-line text-xs" />
                移动端
              </button>
            </div>

            {/* Send */}
            <button
              onClick={handleSubmit}
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-all cursor-pointer ${
                hasContent
                  ? "bg-gray-900 hover:bg-gray-700 text-white"
                  : "bg-gray-100 text-gray-300 cursor-not-allowed"
              }`}
            >
              <i className="ri-arrow-up-line text-sm" />
            </button>
          </div>
        </div>
      </div>

      {/* Hidden file inputs */}
      <input ref={imageInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
      <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.txt,.md,.csv,.xlsx" multiple className="hidden" onChange={handleFileUpload} />

      {/* Page picker — full screen overlay */}
      {showPagePicker && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
          onClick={() => setShowPagePicker(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-2xl mx-4 overflow-hidden flex flex-col"
            style={{ boxShadow: "0 16px 48px rgba(0,0,0,0.18)", maxHeight: "80vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 flex items-center justify-center text-orange-400">
                  <i className="ri-pages-line text-sm" />
                </span>
                <span className="text-sm font-semibold text-gray-800">引用已有页面</span>
                {referencedPages.length > 0 && (
                  <span className="text-xs bg-orange-50 text-orange-500 border border-orange-100 px-1.5 py-0.5 rounded-full font-medium">
                    已选 {referencedPages.length}
                  </span>
                )}
              </div>
              <button
                onClick={() => setShowPagePicker(false)}
                className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
              >
                <i className="ri-close-line text-sm" />
              </button>
            </div>

            {/* Project list */}
            <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-4">
              {mockProjects.map((proj) => {
                const pages = mockPages[proj.id] || [];
                return (
                  <div key={proj.id}>
                    {/* Project header */}
                    <button
                      onClick={() => setExpandedProject(expandedProject === proj.id ? null : proj.id)}
                      className="flex items-center gap-2.5 w-full mb-2 group cursor-pointer"
                    >
                      <div className="w-6 h-6 flex items-center justify-center rounded-md bg-gray-100 text-gray-500 flex-shrink-0">
                        <i className="ri-folder-line text-xs" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">{proj.name}</span>
                      {proj.platform && (
                        <span className={`text-xs px-1.5 py-0.5 rounded-md font-medium ${
                          proj.platform === "mobile" ? "bg-orange-50 text-orange-500" : "bg-gray-100 text-gray-500"
                        }`}>
                          {proj.platform === "mobile" ? "移动端" : "PC"}
                        </span>
                      )}
                      <div className="ml-auto w-4 h-4 flex items-center justify-center text-gray-400">
                        <i className={`${expandedProject === proj.id ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"} text-sm`} />
                      </div>
                    </button>

                    {/* Pages grid */}
                    {(expandedProject === proj.id || expandedProject === null) && (
                      <div className="grid grid-cols-3 gap-2.5">
                        {pages.map((page) => {
                          const isSelected = referencedPages.some(
                            (p) => p.projectId === proj.id && p.pageName === page
                          );
                          const thumb = PAGE_THUMBS[proj.id]?.[page];
                          return (
                            <button
                              key={page}
                              onClick={() => togglePageRef(proj.id, proj.name, page)}
                              className={`relative rounded-xl border-2 overflow-hidden text-left transition-all cursor-pointer group ${
                                isSelected ? "border-orange-400" : "border-gray-100 hover:border-gray-300"
                              }`}
                            >
                              {/* Thumbnail */}
                              <div className="w-full h-20 bg-gray-100 overflow-hidden">
                                {thumb ? (
                                  <img src={thumb} alt={page} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <i className="ri-layout-line text-gray-300 text-xl" />
                                  </div>
                                )}
                                {isSelected && (
                                  <div className="absolute inset-0 bg-orange-500/10" />
                                )}
                              </div>
                              {/* Page name */}
                              <div className={`px-2.5 py-2 flex items-center justify-between ${isSelected ? "bg-orange-50" : "bg-white"}`}>
                                <span className={`text-xs font-medium truncate ${isSelected ? "text-orange-600" : "text-gray-700"}`}>
                                  {page}
                                </span>
                                {isSelected && (
                                  <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                                    <i className="ri-check-line text-orange-500 text-xs" />
                                  </div>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 px-5 py-4 border-t border-gray-100 flex items-center justify-between gap-3">
              <p className="text-xs text-gray-400">
                {referencedPages.length > 0 ? `已选择 ${referencedPages.length} 个页面` : "点击页面卡片选择引用"}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPagePicker(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer whitespace-nowrap"
                >
                  取消
                </button>
                <button
                  onClick={() => setShowPagePicker(false)}
                  className="px-5 py-2 rounded-xl bg-gray-900 text-sm font-medium text-white hover:bg-gray-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  确认引用{referencedPages.length > 0 ? ` (${referencedPages.length})` : ""}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
