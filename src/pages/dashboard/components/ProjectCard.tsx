import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Project {
  id: string;
  name: string;
  description: string;
  updatedAt: string;
  createdAt: string;
  thumbnail: string;
  platform?: "pc" | "mobile";
}

interface ProjectCardProps {
  project: Project;
  onRename: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
  onCopy: (id: string) => void;
}

export default function ProjectCard({ project, onRename, onDelete, onCopy }: ProjectCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(project.name);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const renameInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (renaming) setTimeout(() => renameInputRef.current?.select(), 10);
  }, [renaming]);

  const handleCardClick = () => {
    if (renaming || menuOpen) return;
    navigate(`/generating?projectId=${project.id}&prompt=${encodeURIComponent(project.description)}&name=${encodeURIComponent(project.name)}&platform=${project.platform || "pc"}`);
  };

  const commitRename = () => {
    const v = renameValue.trim();
    if (v && v !== project.name) onRename(project.id, v);
    else setRenameValue(project.name);
    setRenaming(false);
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    onCopy(project.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2000);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    setShowDeleteConfirm(true);
  };

  return (
    <>
      {/* Card wrapper — relative but NOT overflow-hidden so menu shows above */}
      <div
        className="group bg-white border border-gray-100 rounded-xl hover:border-gray-200 transition-all duration-200 cursor-pointer relative"
        onClick={handleCardClick}
      >
        {/* Thumbnail — overflow-hidden only here */}
        <div className="relative w-full h-36 bg-gray-50 overflow-hidden rounded-t-xl">
          <img
            src={project.thumbnail}
            alt={project.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />

          {/* Platform badge */}
          {project.platform && (
            <div className="absolute top-2 left-2">
              <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md text-xs font-medium backdrop-blur-sm ${
                project.platform === "mobile"
                  ? "bg-orange-500/90 text-white"
                  : "bg-gray-900/70 text-white"
              }`}>
                <i className={`${project.platform === "mobile" ? "ri-smartphone-line" : "ri-computer-line"} text-xs`} />
                <span>{project.platform === "mobile" ? "移动端" : "PC"}</span>
              </div>
            </div>
          )}

          {/* Share toast inside thumbnail */}
          {shareToast && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-gray-900/90 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap">
              <i className="ri-check-line text-green-400 text-xs" />
              链接已复制
            </div>
          )}
        </div>

        {/* More menu button — outside overflow-hidden thumbnail, sits at top-right of card */}
        <div
          ref={menuRef}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setMenuOpen((m) => !m); }}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/90 text-gray-600 hover:bg-white backdrop-blur-sm transition-colors cursor-pointer"
          >
            <i className="ri-more-line text-sm" />
          </button>
          {menuOpen && (
            <div
              className="absolute right-0 top-8 w-36 bg-white border border-gray-100 rounded-xl z-[200] py-1"
              style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
            >
              <button
                onClick={(e) => { e.stopPropagation(); setMenuOpen(false); setRenaming(true); setRenameValue(project.name); }}
                className="flex items-center gap-2 w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <i className="ri-edit-line text-gray-400" /> 重命名
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <i className="ri-file-copy-line text-gray-400" /> 复制项目
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <i className="ri-share-line text-gray-400" /> 分享
              </button>
              <div className="h-px bg-gray-100 my-0.5" />
              <button
                onClick={handleDeleteClick}
                className="flex items-center gap-2 w-full px-3 py-2 text-xs text-red-500 hover:bg-red-50 cursor-pointer transition-colors"
              >
                <i className="ri-delete-bin-line" /> 删除
              </button>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="px-3 py-2.5">
          {renaming ? (
            <input
              ref={renameInputRef}
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onBlur={commitRename}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitRename();
                if (e.key === "Escape") { setRenameValue(project.name); setRenaming(false); }
              }}
              onClick={(e) => e.stopPropagation()}
              className="w-full text-sm font-semibold text-gray-900 bg-gray-100 border border-gray-300 rounded-md px-2 py-0.5 outline-none focus:border-gray-400"
            />
          ) : (
            <h3 className="text-sm font-semibold text-gray-900 truncate">{project.name}</h3>
          )}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <i className="ri-time-line text-xs" />
              <span>{project.updatedAt}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <i className="ri-calendar-line text-xs" />
              <span>{project.createdAt}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Delete confirm modal */}
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-[300]"
          onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm(false); }}
        >
          <div
            className="bg-white rounded-2xl p-6 w-80"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 mb-4">
              <i className="ri-delete-bin-line text-red-500 text-lg" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">确认删除？</h3>
            <p className="text-sm text-gray-400 mb-5">
              删除「<span className="text-gray-600 font-medium">{project.name}</span>」后无法恢复，请谨慎操作。
            </p>
            <div className="flex gap-3">
              <button
                onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm(false); }}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                取消
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm(false); onDelete(project.id); }}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-sm font-medium text-white hover:bg-red-600 transition-colors cursor-pointer whitespace-nowrap"
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
