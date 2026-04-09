import { useState } from "react";

interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  content?: string;
  lang?: string;
}

const PROJECT_FILES: FileNode[] = [
  {
    name: "src", type: "folder", children: [
      {
        name: "pages", type: "folder", children: [
          {
            name: "Home.tsx", type: "file", lang: "tsx",
            content: `import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection
        title="欢迎来到我们的平台"
        subtitle="发现最好的产品和服务"
        onSearch={setSearchQuery}
      />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <ProductGrid query={searchQuery} />
      </main>
      <Footer />
    </div>
  );
}`
          },
          {
            name: "About.tsx", type: "file", lang: "tsx",
            content: `import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          关于我们
        </h1>
        <p className="text-gray-600 leading-relaxed">
          我们是一支专注于构建优质产品的团队，
          致力于为用户提供最好的体验。
        </p>
      </section>
      <Footer />
    </div>
  );
}`
          },
        ]
      },
      {
        name: "components", type: "folder", children: [
          {
            name: "Navbar.tsx", type: "file", lang: "tsx",
            content: `import { useState } from "react";
import { Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "首页", to: "/" },
  { label: "产品", to: "/products" },
  { label: "关于", to: "/about" },
  { label: "联系", to: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold text-gray-900">
          MyApp
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
          开始使用
        </button>
      </div>
    </header>
  );
}`
          },
          {
            name: "HeroSection.tsx", type: "file", lang: "tsx",
            content: `interface Props {
  title: string;
  subtitle: string;
  onSearch: (q: string) => void;
}

export default function HeroSection({ title, subtitle, onSearch }: Props) {
  return (
    <section className="bg-gradient-to-br from-orange-50 to-pink-50 py-20 px-6 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">{subtitle}</p>
      <div className="flex items-center max-w-md mx-auto bg-white rounded-xl border border-gray-200 overflow-hidden">
        <input
          type="text"
          placeholder="搜索产品..."
          onChange={e => onSearch(e.target.value)}
          className="flex-1 px-4 py-3 text-sm outline-none"
        />
        <button className="px-4 py-3 bg-gray-900 text-white text-sm">
          搜索
        </button>
      </div>
    </section>
  );
}`
          },
          {
            name: "Footer.tsx", type: "file", lang: "tsx",
            content: `export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
        <span>© 2025 MyApp. All rights reserved.</span>
        <div className="flex items-center gap-6">
          {["隐私政策", "服务条款", "联系我们"].map(t => (
            <a key={t} href="#" className="hover:text-white transition-colors">{t}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}`
          },
        ]
      },
      {
        name: "hooks", type: "folder", children: [
          {
            name: "useProducts.ts", type: "file", lang: "ts",
            content: `import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

export function useProducts(query: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setProducts([
        { id: 1, name: "产品 A", price: 299, category: "电子", image: "" },
        { id: 2, name: "产品 B", price: 199, category: "服装", image: "" },
        { id: 3, name: "产品 C", price: 499, category: "家居", image: "" },
      ].filter(p => p.name.includes(query) || !query));
      setLoading(false);
    }, 300);
  }, [query]);

  return { products, loading };
}`
          },
        ]
      },
      {
        name: "router", type: "folder", children: [
          {
            name: "config.tsx", type: "file", lang: "tsx",
            content: `import { RouteObject } from "react-router-dom";
import Home from "@/pages/Home";
import About from "@/pages/About";

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
];

export default routes;`
          },
        ]
      },
      { name: "index.css", type: "file", lang: "css", content: `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n:root {\n  font-family: "Inter", sans-serif;\n}\n\nbody {\n  @apply bg-white text-gray-900;\n}` },
      { name: "main.tsx", type: "file", lang: "tsx", content: `import { StrictMode } from "react";\nimport { createRoot } from "react-dom/client";\nimport { BrowserRouter } from "react-router-dom";\nimport { AppRoutes } from "./router";\nimport "./index.css";\n\ncreateRoot(document.getElementById("root")!).render(\n  <StrictMode>\n    <BrowserRouter>\n      <AppRoutes />\n    </BrowserRouter>\n  </StrictMode>\n);` },
    ]
  },
  { name: "index.html", type: "file", lang: "html", content: `<!DOCTYPE html>\n<html lang="zh-CN">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>MyApp</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.tsx"></script>\n  </body>\n</html>` },
  { name: "package.json", type: "file", lang: "json", content: `{\n  "name": "my-app",\n  "version": "1.0.0",\n  "scripts": {\n    "dev": "vite",\n    "build": "tsc && vite build",\n    "preview": "vite preview"\n  },\n  "dependencies": {\n    "react": "^19.0.0",\n    "react-dom": "^19.0.0",\n    "react-router-dom": "^6.22.0"\n  },\n  "devDependencies": {\n    "typescript": "^5.3.3",\n    "vite": "^5.1.0",\n    "tailwindcss": "^3.4.1"\n  }\n}` },
  { name: "tailwind.config.ts", type: "file", lang: "ts", content: `import type { Config } from "tailwindcss";\n\nexport default {\n  content: ["./index.html", "./src/**/*.{ts,tsx}"],\n  theme: {\n    extend: {\n      colors: {\n        primary: "#f97316",\n      },\n    },\n  },\n  plugins: [],\n} satisfies Config;` },
  { name: "vite.config.ts", type: "file", lang: "ts", content: `import { defineConfig } from "vite";\nimport react from "@vitejs/plugin-react";\nimport path from "path";\n\nexport default defineConfig({\n  plugins: [react()],\n  resolve: {\n    alias: { "@": path.resolve(__dirname, "./src") },\n  },\n});` },
];

// Flatten all files for zip
function flattenFiles(nodes: FileNode[], prefix = ""): { path: string; content: string }[] {
  const result: { path: string; content: string }[] = [];
  for (const node of nodes) {
    const fullPath = prefix ? `${prefix}/${node.name}` : node.name;
    if (node.type === "file" && node.content !== undefined) {
      result.push({ path: fullPath, content: node.content });
    } else if (node.type === "folder" && node.children) {
      result.push(...flattenFiles(node.children, fullPath));
    }
  }
  return result;
}

// Simple syntax highlight
function highlight(code: string, lang: string): string {
  const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  let escaped = escape(code);

  if (lang === "json") {
    escaped = escaped
      .replace(/("(?:[^"\\]|\\.)*")\s*:/g, '<span class="text-[#9cdcfe]">$1</span>:')
      .replace(/:\s*("(?:[^"\\]|\\.)*")/g, ': <span class="text-[#ce9178]">$1</span>')
      .replace(/\b(true|false|null)\b/g, '<span class="text-[#569cd6]">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="text-[#b5cea8]">$1</span>');
    return escaped;
  }

  escaped = escaped
    .replace(/(\/\/[^\n]*)/g, '<span class="text-[#6a9955]">$1</span>')
    .replace(/\b(import|export|default|from|const|let|var|function|return|interface|type|extends|implements|class|new|if|else|for|while|switch|case|break|async|await|void)\b/g, '<span class="text-[#c792ea]">$1</span>')
    .replace(/\b(useState|useEffect|useRef|useCallback|useMemo)\b/g, '<span class="text-[#82aaff]">$1</span>')
    .replace(/("(?:[^"\\]|\\.)*"|\'(?:[^\'\\]|\\.)*\'|`(?:[^`\\]|\\.)*`)/g, '<span class="text-[#c3e88d]">$1</span>')
    .replace(/\b(\d+)\b/g, '<span class="text-[#f78c6c]">$1</span>');

  return escaped;
}

// File icon
function fileIcon(name: string, type: "file" | "folder", open?: boolean): string {
  if (type === "folder") return open ? "ri-folder-open-line text-yellow-400" : "ri-folder-line text-yellow-400";
  const ext = name.split(".").pop() || "";
  if (["tsx", "jsx"].includes(ext)) return "ri-reactjs-line text-cyan-400";
  if (["ts", "js"].includes(ext)) return "ri-javascript-line text-yellow-300";
  if (ext === "css") return "ri-css3-line text-blue-400";
  if (ext === "html") return "ri-html5-line text-orange-400";
  if (ext === "json") return "ri-braces-line text-yellow-200";
  return "ri-file-code-line text-gray-400";
}

interface TreeNodeProps {
  node: FileNode;
  depth: number;
  selectedPath: string;
  onSelect: (path: string, node: FileNode) => void;
  pathPrefix: string;
}

function TreeNode({ node, depth, selectedPath, onSelect, pathPrefix }: TreeNodeProps) {
  const [open, setOpen] = useState(depth < 2);
  const fullPath = pathPrefix ? `${pathPrefix}/${node.name}` : node.name;

  if (node.type === "folder") {
    return (
      <div>
        <button
          onClick={() => setOpen(v => !v)}
          className="w-full flex items-center gap-1.5 px-2 py-0.5 hover:bg-white/5 rounded transition-colors cursor-pointer text-left"
          style={{ paddingLeft: `${8 + depth * 12}px` }}
        >
          <div className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">
            <i className={`text-xs ${open ? "ri-arrow-down-s-line text-gray-500" : "ri-arrow-right-s-line text-gray-500"}`} />
          </div>
          <div className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">
            <i className={`text-xs ${fileIcon(node.name, "folder", open)}`} />
          </div>
          <span className="text-xs text-gray-300">{node.name}</span>
        </button>
        {open && node.children?.map(child => (
          <TreeNode
            key={child.name}
            node={child}
            depth={depth + 1}
            selectedPath={selectedPath}
            onSelect={onSelect}
            pathPrefix={fullPath}
          />
        ))}
      </div>
    );
  }

  const isSelected = selectedPath === fullPath;
  return (
    <button
      onClick={() => onSelect(fullPath, node)}
      className={`w-full flex items-center gap-1.5 px-2 py-0.5 rounded transition-colors cursor-pointer text-left ${isSelected ? "bg-white/10 text-white" : "hover:bg-white/5 text-gray-400"}`}
      style={{ paddingLeft: `${8 + depth * 12 + 16}px` }}
    >
      <div className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">
        <i className={`text-xs ${fileIcon(node.name, "file")}`} />
      </div>
      <span className="text-xs truncate">{node.name}</span>
    </button>
  );
}

function downloadZip(files: { path: string; content: string }[]) {
  // Build a simple text-based zip-like download (concatenated files with headers)
  // For a real zip, we'd use JSZip, but here we create a downloadable blob with all files
  const content = files.map(f =>
    `${"=".repeat(60)}\n// FILE: ${f.path}\n${"=".repeat(60)}\n${f.content}\n`
  ).join("\n");

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "project-source.txt";
  a.click();
  URL.revokeObjectURL(url);
}

export default function CodePreview() {
  const [selectedPath, setSelectedPath] = useState("src/pages/Home.tsx");
  const [selectedNode, setSelectedNode] = useState<FileNode>(() => {
    const all = flattenFiles(PROJECT_FILES);
    const found = all.find(f => f.path === "src/pages/Home.tsx");
    return { name: "Home.tsx", type: "file", lang: "tsx", content: found?.content || "" };
  });
  const [openTabs, setOpenTabs] = useState<{ path: string; name: string }[]>([
    { path: "src/pages/Home.tsx", name: "Home.tsx" }
  ]);

  const handleSelect = (path: string, node: FileNode) => {
    if (node.type !== "file") return;
    setSelectedPath(path);
    setSelectedNode(node);
    setOpenTabs(prev => {
      if (prev.find(t => t.path === path)) return prev;
      return [...prev, { path, name: node.name }];
    });
  };

  const closeTab = (path: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenTabs(prev => {
      const next = prev.filter(t => t.path !== path);
      if (selectedPath === path && next.length > 0) {
        const idx = prev.findIndex(t => t.path === path);
        const newSelected = next[Math.min(idx, next.length - 1)];
        setSelectedPath(newSelected.path);
        const allFiles = flattenFiles(PROJECT_FILES);
        const found = allFiles.find(f => f.path === newSelected.path);
        if (found) setSelectedNode({ name: newSelected.name, type: "file", content: found.content });
      }
      return next;
    });
  };

  const lines = (selectedNode.content || "").split("\n");
  const lang = selectedNode.lang || "tsx";

  return (
    <div className="h-full flex bg-[#1e1e2e] overflow-hidden">
      {/* File tree */}
      <div className="w-52 flex-shrink-0 flex flex-col border-r border-white/10 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/10 flex-shrink-0">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">文件</span>
          <button
            onClick={() => downloadZip(flattenFiles(PROJECT_FILES))}
            title="下载源码"
            className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 rounded transition-all cursor-pointer"
          >
            <i className="ri-download-line text-xs" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-1">
          {PROJECT_FILES.map(node => (
            <TreeNode
              key={node.name}
              node={node}
              depth={0}
              selectedPath={selectedPath}
              onSelect={handleSelect}
              pathPrefix=""
            />
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Tabs */}
        <div className="flex items-center border-b border-white/10 overflow-x-auto flex-shrink-0 bg-[#181825]">
          {openTabs.map(tab => (
            <div
              key={tab.path}
              onClick={() => {
                const allFiles = flattenFiles(PROJECT_FILES);
                const found = allFiles.find(f => f.path === tab.path);
                if (found) {
                  setSelectedPath(tab.path);
                  setSelectedNode({ name: tab.name, type: "file", content: found.content, lang: tab.name.split(".").pop() });
                }
              }}
              className={`flex items-center gap-2 px-3 py-2 text-xs border-r border-white/10 cursor-pointer whitespace-nowrap flex-shrink-0 transition-colors ${
                selectedPath === tab.path ? "bg-[#1e1e2e] text-white border-t border-t-orange-400" : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
              }`}
            >
              <div className="w-3 h-3 flex items-center justify-center">
                <i className={`text-xs ${fileIcon(tab.name, "file")}`} />
              </div>
              {tab.name}
              <button
                onClick={(e) => closeTab(tab.path, e)}
                className="w-3.5 h-3.5 flex items-center justify-center text-gray-600 hover:text-gray-300 rounded transition-colors ml-0.5"
              >
                <i className="ri-close-line" style={{ fontSize: "10px" }} />
              </button>
            </div>
          ))}
        </div>

        {/* Code */}
        <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-6">
          {lines.map((line, i) => (
            <div key={i} className="flex hover:bg-white/[0.03] rounded">
              <span className="text-gray-600 w-10 flex-shrink-0 select-none text-right mr-4 leading-6">
                {i + 1}
              </span>
              <span
                className="text-gray-300 flex-1 whitespace-pre"
                dangerouslySetInnerHTML={{ __html: highlight(line, lang) || "\u00a0" }}
              />
            </div>
          ))}
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-1 bg-[#181825] border-t border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>{selectedPath}</span>
            <span>{lines.length} 行</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 uppercase">{lang}</span>
            <button
              onClick={() => downloadZip(flattenFiles(PROJECT_FILES))}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white border border-white/10 hover:border-white/30 px-2.5 py-1 rounded transition-all cursor-pointer"
            >
              <i className="ri-download-line text-xs" />
              下载源码
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
