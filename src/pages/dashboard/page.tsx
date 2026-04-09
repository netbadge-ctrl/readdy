import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./components/ProjectCard";
import AIChatBox from "./components/AIChatBox";
import UserAvatar from "@/components/feature/UserAvatar";
import { mockProjects } from "@/mocks/projects";

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState(mockProjects);
  const navigate = useNavigate();

  const filtered = projects
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const ta = a.updatedAt.includes("-") ? new Date(a.updatedAt).getTime() : 0;
      const tb = b.updatedAt.includes("-") ? new Date(b.updatedAt).getTime() : 0;
      return tb - ta;
    });

  const handleRename = (id: string, newName: string) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, name: newName } : p));
  };

  const handleDelete = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleCopy = (id: string) => {
    const orig = projects.find(p => p.id === id);
    if (!orig) return;
    const newProject = {
      ...orig,
      id: `copy-${Date.now()}`,
      name: `${orig.name} 副本`,
      updatedAt: "刚刚",
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setProjects(prev => [newProject, ...prev]);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-end px-8 py-3 bg-[#faf9f7] border-b border-gray-100 flex-shrink-0">
          <UserAvatar />
        </div>

        {/* Hero / Chat section */}
        <section className="flex flex-col items-center justify-center py-14 px-8 flex-shrink-0 bg-[#faf9f7] border-b border-gray-100">
          <AIChatBox />
        </section>

        {/* Projects section */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#faf9f7]">
          {/* Filters & Search */}
          <div className="flex items-center gap-3 px-8 py-4 border-b border-gray-100 bg-white">
            <h2 className="text-sm font-semibold text-gray-700 mr-2">我的项目</h2>

            {/* Search */}
            <div className="relative flex-1 max-w-xs">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-gray-400">
                <i className="ri-search-line text-sm" />
              </span>
              <input
                type="text"
                placeholder="搜索项目..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 transition"
              />
            </div>

            <div className="ml-auto flex items-center gap-1 text-xs text-gray-400">
              <i className="ri-time-line" />
              <span>按更新时间</span>
            </div>
          </div>

          {/* Project grid */}
          <div className="flex-1 overflow-y-auto px-8 py-6">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 mb-3">
                  <i className="ri-folder-open-line text-gray-400 text-xl" />
                </div>
                <p className="text-sm font-medium text-gray-600">未找到项目</p>
                <p className="text-xs text-gray-400 mt-1">尝试调整搜索条件</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onRename={handleRename}
                    onDelete={handleDelete}
                    onCopy={handleCopy}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
