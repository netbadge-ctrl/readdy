import { useState, useRef, useEffect, useCallback } from "react";

interface AttachmentItem {
  id: string;
  name: string;
  type: "image" | "doc";
  url?: string;
  size: string;
}

interface VersionTag {
  versionId: number;
  time: string;
}

type ToolEventType =
  | "read_files"
  | "todo_list"
  | "create_file"
  | "edit_file"
  | "build"
  | "text";

interface ToolEvent {
  type: ToolEventType;
  label: string;
  detail?: string;
  status?: "done" | "in_progress" | "pending";
  todos?: { text: string; status: "done" | "in_progress" | "pending" }[];
}

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: string;
  isGenerating?: boolean;
  elapsedTime?: number;
  attachments?: AttachmentItem[];
  versionTag?: VersionTag;
  toolEvents?: ToolEvent[];
}

interface Props {
  initialPrompt: string;
  isFinished: boolean;
  elapsedTime: number;
  onNewVersion?: (versionId: number, time: string, description: string) => void;
}

const formatTime = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const nowStr = () => {
  const d = new Date();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${month}月${day}日 ${hours}:${minutes}`;
};

const toolIconMap: Record<ToolEventType, { icon: string; color: string }> = {
  read_files: { icon: "ri-file-text-line", color: "text-gray-400" },
  todo_list: { icon: "ri-list-check-2", color: "text-gray-400" },
  create_file: { icon: "ri-file-add-line", color: "text-gray-400" },
  edit_file: { icon: "ri-edit-line", color: "text-gray-400" },
  build: { icon: "ri-hammer-line", color: "text-orange-400" },
  text: { icon: "ri-chat-1-line", color: "text-gray-400" },
};

const buildInitialSteps = (prompt: string): ToolEvent[] => [
  {
    type: "read_files",
    label: "文件已读取",
    detail: "src/router/config.tsx, src/pages/dashboard/page.tsx",
    status: "done",
  },
  {
    type: "text",
    label: "",
    detail: `好，现在来处理「${prompt.length > 30 ? prompt.slice(0, 30) + "..." : prompt}」，创建所需功能模块。`,
    status: "done",
  },
  {
    type: "todo_list",
    label: "待办列表",
    detail: "0/3",
    status: "in_progress",
    todos: [
      { text: "创建页面组件文件", status: "done" },
      { text: "在路由配置中添加路由", status: "in_progress" },
      { text: "更新导航链接", status: "pending" },
    ],
  },
  {
    type: "create_file",
    label: "文件已创建",
    detail: "src/pages/settings/page.tsx",
    status: "done",
  },
  {
    type: "edit_file",
    label: "文件已修改",
    detail: "src/router/config.tsx",
    status: "done",
  },
  {
    type: "build",
    label: "构建检查",
    detail: "Build successful!",
    status: "done",
  },
];

const buildReplySteps = (userContent: string): ToolEvent[] => {
  const short = userContent.length > 36 ? userContent.slice(0, 36) + "..." : userContent;
  return [
    {
      type: "read_files",
      label: "文件已读取",
      detail: "src/pages/generating/components/AIWorkbench.tsx",
      status: "done",
    },
    {
      type: "text",
      label: "",
      detail: `明白了，「${short}」，现在来处理这个需求。`,
      status: "done",
    },
    {
      type: "todo_list",
      label: "待办列表",
      detail: "0/2",
      status: "in_progress",
      todos: [
        { text: "分析并定位需要修改的代码", status: "done" },
        { text: "应用修改并验证效果", status: "in_progress" },
      ],
    },
    {
      type: "edit_file",
      label: "文件已修改",
      detail: "src/pages/generating/components/AIWorkbench.tsx",
      status: "done",
    },
    {
      type: "build",
      label: "构建检查",
      detail: "Build successful!",
      status: "done",
    },
  ];
};

// ── Version bubble ──
function VersionBubble({
  tag,
  onRollback,
  isRollingBack,
}: {
  tag: VersionTag;
  onRollback: (id: number) => void;
  isRollingBack: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 flex items-center justify-center">
          <i className="ri-history-line text-gray-400 text-xs" />
        </div>
        <span className="text-xs text-gray-600 font-medium">版本 {tag.versionId}</span>
        <span className="text-xs text-gray-400">{tag.time}</span>
      </div>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
        >
          <i className="ri-more-line text-sm" />
        </button>
        {menuOpen && (
          <div
            className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-100 rounded-xl overflow-hidden z-50"
            style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
          >
            <button
              onClick={() => { onRollback(tag.versionId); setMenuOpen(false); }}
              disabled={isRollingBack}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
            >
              <div className="w-3 h-3 flex items-center justify-center">
                <i className="ri-arrow-go-back-line text-xs" />
              </div>
              {isRollingBack ? "回滚中..." : "回滚到此版本"}
            </button>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="w-3 h-3 flex items-center justify-center">
                <i className="ri-eye-line text-xs" />
              </div>
              预览此版本
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Compute live todo progress based on visibleCount ──
function computeTodoProgress(
  events: ToolEvent[],
  todoEventIndex: number,
  visibleCount: number
): { doneCount: number; total: number } {
  const todoEvent = events[todoEventIndex];
  if (!todoEvent?.todos) return { doneCount: 0, total: 0 };
  const total = todoEvent.todos.length;
  const stepsAfterTodo = Math.max(0, visibleCount - todoEventIndex - 1);
  const doneCount = Math.min(stepsAfterTodo, total);
  return { doneCount, total };
}

// ── Generating progress card ──
function GeneratingCard({
  events,
  elapsedTime,
  visibleCount,
  isActive,
}: {
  events: ToolEvent[];
  elapsedTime: number;
  visibleCount: number;
  isActive: boolean;
}) {
  const visible = events.slice(0, visibleCount);
  const todoEventIndex = events.findIndex((e) => e.type === "todo_list");

  return (
    <div className="flex flex-col gap-0">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center flex-shrink-0">
          <i className="ri-sparkling-line text-white" style={{ fontSize: "8px" }} />
        </div>
        <span className="text-xs font-semibold text-gray-800">Readdy 正在完成您的需求</span>
        {isActive && (
          <span className="flex items-center gap-0.5 ml-1">
            <span className="w-1 h-1 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-1 h-1 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-1 h-1 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
          </span>
        )}
        <span className="ml-auto text-xs text-gray-400 font-mono">{formatTime(elapsedTime)}</span>
      </div>

      <div className="flex flex-col gap-1.5">
        {visible.map((ev, i) => {
          const { icon, color } = toolIconMap[ev.type];

          if (ev.type === "todo_list" && ev.todos) {
            const { doneCount, total } = computeTodoProgress(events, todoEventIndex, visibleCount);
            const liveTodos = ev.todos.map((todo, ti) => {
              if (ti < doneCount) return { ...todo, status: "done" as const };
              if (ti === doneCount) return { ...todo, status: isActive ? "in_progress" as const : "done" as const };
              return { ...todo, status: "pending" as const };
            });

            return (
              <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50">
                  <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                    <i className={`${icon} text-xs ${color}`} />
                  </div>
                  <span className="text-xs text-gray-600 font-medium">{ev.label}</span>
                  <span className="text-xs text-gray-400 ml-1 font-mono">{doneCount}/{total}</span>
                </div>
                <div className="px-3 py-2 flex flex-col gap-1.5">
                  {liveTodos.map((todo, ti) => (
                    <div key={ti} className="flex items-center gap-2">
                      {todo.status === "done" ? (
                        <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                          <i className="ri-checkbox-circle-fill text-green-500 text-sm" />
                        </div>
                      ) : todo.status === "in_progress" ? (
                        <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                          <i className="ri-loader-4-line text-orange-400 text-sm animate-spin" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                          <div className="w-3 h-3 rounded-full border border-gray-300" />
                        </div>
                      )}
                      <span
                        className={`text-xs leading-relaxed ${
                          todo.status === "done"
                            ? "line-through text-gray-400"
                            : todo.status === "in_progress"
                            ? "text-gray-800 font-medium"
                            : "text-gray-400"
                        }`}
                      >
                        {todo.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          if (ev.type === "text") {
            return (
              <div key={i} className="text-xs text-gray-600 leading-relaxed px-0.5 py-0.5">
                {ev.detail}
              </div>
            );
          }

          return (
            <div key={i} className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl">
              <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                <i className={`${icon} text-xs ${color}`} />
              </div>
              <span className="text-xs text-gray-500 font-medium flex-shrink-0">{ev.label}</span>
              {ev.detail && (
                <span className="text-xs text-gray-400 truncate">{ev.detail}</span>
              )}
              {ev.status === "done" && (
                <div className="ml-auto w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">
                  <i className="ri-check-line text-gray-400 text-xs" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Hook: animate visible count ──
function useStepAnimator(
  msgId: string,
  totalSteps: number,
  isActive: boolean,
  onComplete: (msgId: string) => void
) {
  const [visibleCount, setVisibleCount] = useState(1);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!isActive) return;
    if (visibleCount >= totalSteps) {
      if (!completedRef.current) {
        completedRef.current = true;
        const t = setTimeout(() => onCompleteRef.current(msgId), 800);
        return () => clearTimeout(t);
      }
      return;
    }
    // 每个步骤之间 1.8s ~ 3.0s，让执行过程更真实
    const delay = 1800 + Math.random() * 1200;
    const t = setTimeout(() => setVisibleCount((c) => c + 1), delay);
    return () => clearTimeout(t);
  }, [visibleCount, isActive, totalSteps, msgId]);

  return visibleCount;
}

// ── Animated generating message wrapper ──
function AnimatedGeneratingMessage({
  msg,
  elapsedTime,
  onComplete,
}: {
  msg: Message;
  elapsedTime: number;
  onComplete: (msgId: string) => void;
}) {
  const events = msg.toolEvents ?? [];
  const visibleCount = useStepAnimator(msg.id, events.length, true, onComplete);

  return (
    <GeneratingCard
      events={events}
      elapsedTime={elapsedTime}
      visibleCount={visibleCount}
      isActive={true}
    />
  );
}

export default function AIWorkbench({ initialPrompt, isFinished, elapsedTime, onNewVersion }: Props) {
  const [input, setInput] = useState("");

  // 版本号用 ref 追踪，每次生成完成后递增，绝不重置
  const nextVersionRef = useRef(2); // 初始版本是 1，下一个从 2 开始

  const [rollingBackId, setRollingBackId] = useState<number | null>(null);
  const [animatingIds, setAnimatingIds] = useState<Set<string>>(() => new Set());
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  const initialSteps = buildInitialSteps(initialPrompt);

  // 初始消息：根据 isFinished 决定初始状态
  const [messages, setMessages] = useState<Message[]>(() => [
    { id: "1", role: "user", content: initialPrompt, timestamp: nowStr() },
    {
      id: "init-ai",
      role: "ai",
      content: isFinished
        ? "已为你生成页面，包含完整功能和响应式布局。你可以继续告诉我需要调整的地方。"
        : "",
      timestamp: nowStr(),
      isGenerating: !isFinished,
      elapsedTime: isFinished ? undefined : elapsedTime,
      // isFinished 时直接带版本 1；否则等生成完成后再附加
      versionTag: isFinished ? { versionId: 1, time: nowStr() } : undefined,
      toolEvents: isFinished ? undefined : initialSteps,
    },
  ]);

  const [isReplying, setIsReplying] = useState(false);
  const [attachments, setAttachments] = useState<AttachmentItem[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputAreaRef = useRef<HTMLDivElement>(null);

  const [replyElapsed, setReplyElapsed] = useState<Record<string, number>>({});
  const replyTimersRef = useRef<Record<string, ReturnType<typeof setInterval>>>({});

  // 只监听初始生成完成（init-ai），绝不碰其他消息
  const initFinishedHandled = useRef(false);
  useEffect(() => {
    if (!isFinished) {
      // 还在生成中，把 init-ai 加入动画列表
      setAnimatingIds((prev) => {
        if (prev.has("init-ai")) return prev;
        return new Set([...prev, "init-ai"]);
      });
      // 更新计时
      setMessages((prev) =>
        prev.map((m) =>
          m.id === "init-ai" && m.isGenerating ? { ...m, elapsedTime } : m
        )
      );
      return;
    }

    // isFinished 变为 true，只处理一次
    if (initFinishedHandled.current) return;
    initFinishedHandled.current = true;

    const initTime = nowStr();
    setMessages((prev) =>
      prev.map((m) =>
        m.id === "init-ai"
          ? {
              ...m,
              content: "已为你生成页面，包含完整功能和响应式布局。你可以继续告诉我需要调整的地方。",
              isGenerating: false,
              elapsedTime: undefined,
              toolEvents: undefined,
              versionTag: { versionId: 1, time: initTime },
            }
          : m
      )
    );
    setAnimatingIds((prev) => {
      const next = new Set(prev);
      next.delete("init-ai");
      return next;
    });
  }, [isFinished, elapsedTime]);

  // 步骤动画自然完成回调
  const handleStepAnimationComplete = useCallback((msgId: string) => {
    // 先清定时器
    if (replyTimersRef.current[msgId]) {
      clearInterval(replyTimersRef.current[msgId]);
      delete replyTimersRef.current[msgId];
    }

    // 分配新版本号（每次都递增）
    const newVersion = nextVersionRef.current;
    nextVersionRef.current += 1;

    // Find the user message that triggered this reply to use as description
    setMessages((prev) => {
      const msgIndex = prev.findIndex(m => m.id === msgId);
      const userMsg = msgIndex > 0 ? prev[msgIndex - 1] : null;
      const description = userMsg?.content
        ? `${userMsg.content.slice(0, 60)}${userMsg.content.length > 60 ? "..." : ""}`
        : "页面修改与优化";
      const versionTime = nowStr();

      // Notify parent about new version
      onNewVersion?.(newVersion, versionTime, description);

      return prev.map((m) =>
        m.id === msgId
          ? {
              ...m,
              isGenerating: false,
              toolEvents: undefined,
              elapsedTime: undefined,
              content: m.content || "好的，已根据你的要求完成修改，页面已更新。",
              versionTag: { versionId: newVersion, time: versionTime },
            }
          : m
      );
    });

    setAnimatingIds((prev) => {
      const next = new Set(prev);
      next.delete(msgId);
      return next;
    });

    setActiveReplyId(null);
    setIsReplying(false);
  }, [onNewVersion]);

  // 停止生成（不分配版本号）
  const handleStop = useCallback(() => {
    const targetId = activeReplyId;
    if (!targetId) return;

    if (replyTimersRef.current[targetId]) {
      clearInterval(replyTimersRef.current[targetId]);
      delete replyTimersRef.current[targetId];
    }

    setAnimatingIds((prev) => {
      const next = new Set(prev);
      next.delete(targetId);
      return next;
    });

    setMessages((prev) =>
      prev.map((m) =>
        m.id === targetId
          ? {
              ...m,
              isGenerating: false,
              toolEvents: undefined,
              elapsedTime: undefined,
              content: "已停止生成。你可以重新描述需求或继续修改。",
            }
          : m
      )
    );

    setActiveReplyId(null);
    setIsReplying(false);
  }, [activeReplyId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, animatingIds, replyElapsed]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  }, [input]);

  const addImageAttachments = useCallback((files: File[]) => {
    const newAtts: AttachmentItem[] = files
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => ({
        id: Date.now().toString() + Math.random(),
        name: f.name || "粘贴的图片.png",
        type: "image" as const,
        url: URL.createObjectURL(f),
        size: formatFileSize(f.size),
      }));
    if (newAtts.length > 0) setAttachments((prev) => [...prev, ...newAtts]);
  }, []);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const items = Array.from(e.clipboardData.items);
    const imageFiles = items
      .filter((item) => item.kind === "file" && item.type.startsWith("image/"))
      .map((item) => item.getAsFile())
      .filter((f): f is File => f !== null);
    if (imageFiles.length > 0) {
      e.preventDefault();
      addImageAttachments(imageFiles);
    }
  }, [addImageAttachments]);

  const handleSend = () => {
    const content = input.trim();
    if ((!content && attachments.length === 0) || isReplying || !isFinished) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: nowStr(),
      attachments: attachments.length > 0 ? [...attachments] : undefined,
    };

    const replyId = `reply-${Date.now() + 1}`;
    const replySteps = buildReplySteps(content || "上传的文件");
    const replyMsg: Message = {
      id: replyId,
      role: "ai",
      content: `好的，已根据你的要求完成修改。${content ? `主要改动：${content.slice(0, 30)}${content.length > 30 ? "..." : ""}` : "已处理你上传的文件。"}`,
      timestamp: nowStr(),
      isGenerating: true,
      elapsedTime: 0,
      toolEvents: replySteps,
    };

    setMessages((prev) => [...prev, userMsg, replyMsg]);
    setInput("");
    setAttachments([]);
    setIsReplying(true);
    setActiveReplyId(replyId);

    setReplyElapsed((prev) => ({ ...prev, [replyId]: 0 }));
    const timer = setInterval(() => {
      setReplyElapsed((prev) => ({ ...prev, [replyId]: (prev[replyId] ?? 0) + 1 }));
    }, 1000);
    replyTimersRef.current[replyId] = timer;

    setAnimatingIds((prev) => new Set([...prev, replyId]));
  };

  useEffect(() => {
    return () => {
      Object.values(replyTimersRef.current).forEach(clearInterval);
    };
  }, []);

  const handleRollback = (versionId: number) => {
    setRollingBackId(versionId);
    setTimeout(() => {
      setRollingBackId(null);
      const msg: Message = {
        id: Date.now().toString(),
        role: "ai",
        content: `已回滚到版本 ${versionId}，页面已恢复。`,
        timestamp: nowStr(),
        versionTag: { versionId, time: nowStr() },
      };
      setMessages((prev) => [...prev, msg]);
    }, 1000);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newAttachments: AttachmentItem[] = Array.from(files).map((file) => {
      const isImage = file.type.startsWith("image/");
      const item: AttachmentItem = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: isImage ? "image" : "doc",
        size: formatFileSize(file.size),
      };
      if (isImage) item.url = URL.createObjectURL(file);
      return item;
    });
    setAttachments((prev) => [...prev, ...newAttachments]);
    e.target.value = "";
  };

  const canSend = (input.trim().length > 0 || attachments.length > 0) && isFinished && !isReplying;

  return (
    <div className="h-full flex flex-col bg-white border-l border-gray-100">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {messages.map((msg) => {
          if (msg.role === "user") {
            return (
              <div key={msg.id} className="flex flex-col items-end gap-1.5">
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 justify-end max-w-[90%]">
                    {msg.attachments.map((att) =>
                      att.type === "image" && att.url ? (
                        <img
                          key={att.id}
                          src={att.url}
                          alt={att.name}
                          className="w-20 h-20 object-cover rounded-xl border border-gray-100"
                        />
                      ) : (
                        <div key={att.id} className="flex items-center gap-1.5 bg-gray-100 rounded-xl px-3 py-2">
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-file-text-line text-gray-500 text-xs" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-700 max-w-[120px] truncate">{att.name}</p>
                            <p className="text-xs text-gray-400">{att.size}</p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
                {msg.content && (
                  <div className="max-w-[88%] bg-gray-900 text-white text-xs px-3.5 py-2.5 rounded-2xl rounded-tr-sm leading-relaxed">
                    {msg.content}
                  </div>
                )}
                <span className="text-xs text-gray-400 px-1">{msg.timestamp}</span>
              </div>
            );
          }

          const isAnimating = animatingIds.has(msg.id);

          return (
            <div key={msg.id} className="w-full flex flex-col gap-2">
              {msg.isGenerating && msg.toolEvents ? (
                isAnimating ? (
                  <AnimatedGeneratingMessage
                    msg={msg}
                    elapsedTime={
                      msg.id === "init-ai"
                        ? (msg.elapsedTime ?? 0)
                        : (replyElapsed[msg.id] ?? 0)
                    }
                    onComplete={handleStepAnimationComplete}
                  />
                ) : (
                  <GeneratingCard
                    events={msg.toolEvents}
                    elapsedTime={msg.elapsedTime ?? 0}
                    visibleCount={msg.toolEvents.length}
                    isActive={false}
                  />
                )
              ) : (
                <div className="flex gap-2.5 items-start">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="ri-sparkling-line text-white" style={{ fontSize: "9px" }} />
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <div className="bg-gray-50 border border-gray-100 text-gray-700 text-xs px-3.5 py-2.5 rounded-2xl rounded-tl-sm leading-relaxed">
                      {msg.content}
                    </div>
                  </div>
                </div>
              )}

              {msg.versionTag && !msg.isGenerating && (
                <div className="ml-8">
                  <VersionBubble
                    tag={msg.versionTag}
                    onRollback={handleRollback}
                    isRollingBack={rollingBackId === msg.versionTag.versionId}
                  />
                </div>
              )}
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="flex-shrink-0 px-4 pb-4 pt-2" ref={inputAreaRef}>
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {attachments.map((att) => (
              <div key={att.id} className="relative group">
                {att.type === "image" && att.url ? (
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-gray-100">
                    <img src={att.url} alt={att.name} className="w-full h-full object-cover" />
                    <button
                      onClick={() => {
                        setAttachments((prev) => {
                          const item = prev.find((a) => a.id === att.id);
                          if (item?.url) URL.revokeObjectURL(item.url);
                          return prev.filter((a) => a.id !== att.id);
                        });
                      }}
                      className="absolute top-0.5 right-0.5 w-4 h-4 flex items-center justify-center bg-gray-900/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <i className="ri-close-line" style={{ fontSize: "9px" }} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 bg-gray-100 rounded-xl px-2.5 py-1.5 pr-6 relative">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-file-text-line text-gray-500 text-xs" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-700 max-w-[80px] truncate">{att.name}</p>
                      <p className="text-xs text-gray-400">{att.size}</p>
                    </div>
                    <button
                      onClick={() => setAttachments((prev) => prev.filter((a) => a.id !== att.id))}
                      className="absolute top-0.5 right-1 w-4 h-4 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      <i className="ri-close-line" style={{ fontSize: "9px" }} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div
          className={`bg-gray-50 rounded-2xl border transition-all overflow-hidden ${
            isFinished && !isReplying ? "border-gray-200 focus-within:border-gray-300" : "border-gray-100"
          }`}
          onPaste={handlePaste}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={
              !isFinished
                ? "生成完成后可继续修改..."
                : isReplying
                ? "AI 正在处理中..."
                : "继续修改，支持粘贴图片..."
            }
            disabled={!isFinished || isReplying}
            rows={1}
            className="w-full bg-transparent text-xs text-gray-700 placeholder-gray-400 resize-none focus:outline-none px-4 pt-3.5 pb-1 leading-relaxed disabled:opacity-40"
          />
          <div className="flex items-center justify-between px-3 pb-3 pt-1 gap-2">
            <div className="flex items-center gap-1">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx,.txt,.md"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.accept = "image/*";
                    fileInputRef.current.click();
                  }
                }}
                disabled={!isFinished || isReplying}
                title="上传图片"
                className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <i className="ri-image-line text-xs" />
              </button>
              <button
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.accept = ".pdf,.doc,.docx,.txt,.md";
                    fileInputRef.current.click();
                  }
                }}
                disabled={!isFinished || isReplying}
                title="上传文档"
                className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <i className="ri-attachment-line text-xs" />
              </button>
            </div>

            {isReplying ? (
              <button
                onClick={handleStop}
                title="停止生成"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all cursor-pointer whitespace-nowrap"
              >
                <span className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">
                  <i className="ri-stop-circle-line text-sm" />
                </span>
                <span className="text-xs font-medium">停止生成</span>
              </button>
            ) : (
              <button
                onClick={handleSend}
                disabled={!canSend}
                className={`w-7 h-7 flex items-center justify-center rounded-full transition-all cursor-pointer flex-shrink-0 ${
                  canSend
                    ? "bg-gray-900 text-white hover:bg-gray-700"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <i className="ri-arrow-up-line text-xs" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
