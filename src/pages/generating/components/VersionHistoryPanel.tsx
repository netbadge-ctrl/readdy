import { useState } from "react";

export interface VersionRecord {
  versionId: number;
  time: string;
  description: string;
  isActive?: boolean;
}

interface Props {
  versions: VersionRecord[];
  onClose: () => void;
  onRollback: (versionId: number) => void;
}

export default function VersionHistoryPanel({ versions, onClose, onRollback }: Props) {
  const [rollingBackId, setRollingBackId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleRollback = (versionId: number) => {
    setRollingBackId(versionId);
    setTimeout(() => {
      setRollingBackId(null);
      onRollback(versionId);
      onClose();
    }, 800);
  };

  return (
    <div className="h-full flex flex-col bg-white border-l border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 flex items-center justify-center">
            <i className="ri-history-line text-gray-500 text-sm" />
          </div>
          <span className="text-sm font-semibold text-gray-800">版本历史</span>
          <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">{versions.length}</span>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
        >
          <i className="ri-close-line text-sm" />
        </button>
      </div>

      {/* Version list */}
      <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-1.5">
        {versions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50">
              <i className="ri-history-line text-gray-300 text-xl" />
            </div>
            <p className="text-xs text-gray-400">暂无版本记录</p>
          </div>
        ) : (
          [...versions].reverse().map((v, idx) => {
            const isLatest = idx === 0;
            const isHovered = hoveredId === v.versionId;
            const isRollingBack = rollingBackId === v.versionId;

            return (
              <div
                key={v.versionId}
                onMouseEnter={() => setHoveredId(v.versionId)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative rounded-xl border transition-all overflow-hidden ${
                  v.isActive
                    ? "border-orange-200 bg-orange-50/40"
                    : isHovered
                    ? "border-gray-200 bg-gray-50"
                    : "border-gray-100 bg-white"
                }`}
              >
                {/* Timeline dot */}
                <div className="flex items-start gap-3 px-3 py-3">
                  <div className="flex flex-col items-center flex-shrink-0 mt-0.5">
                    <div
                      className={`w-2.5 h-2.5 rounded-full border-2 flex-shrink-0 ${
                        v.isActive
                          ? "border-orange-400 bg-orange-400"
                          : "border-gray-300 bg-white"
                      }`}
                    />
                    {idx < versions.length - 1 && (
                      <div className="w-px flex-1 bg-gray-100 mt-1" style={{ minHeight: "16px" }} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-semibold ${v.isActive ? "text-orange-600" : "text-gray-700"}`}>
                        版本 {v.versionId}
                      </span>
                      {isLatest && (
                        <span className="text-xs bg-green-50 text-green-600 border border-green-100 px-1.5 py-0.5 rounded-full font-medium">
                          最新
                        </span>
                      )}
                      {v.isActive && !isLatest && (
                        <span className="text-xs bg-orange-50 text-orange-500 border border-orange-100 px-1.5 py-0.5 rounded-full font-medium">
                          当前
                        </span>
                      )}
                    </div>
                    {/* Description: expandable */}
                    <div className="mb-1.5">
                      <p className={`text-xs text-gray-500 leading-relaxed ${expandedId === v.versionId ? "" : "line-clamp-2"}`}>
                        {v.description}
                      </p>
                      {v.description.length > 60 && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setExpandedId(expandedId === v.versionId ? null : v.versionId); }}
                          className="text-xs text-gray-400 hover:text-gray-600 mt-0.5 cursor-pointer transition-colors"
                        >
                          {expandedId === v.versionId ? "收起" : "展开"}
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">{v.time}</p>
                  </div>
                </div>

                {/* Rollback button on hover */}
                {isHovered && !v.isActive && (
                  <div className="px-3 pb-3">
                    <button
                      onClick={() => handleRollback(v.versionId)}
                      disabled={isRollingBack}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isRollingBack ? (
                        <>
                          <i className="ri-loader-4-line animate-spin text-xs" />
                          回滚中...
                        </>
                      ) : (
                        <>
                          <i className="ri-arrow-go-back-line text-xs" />
                          回滚到此版本
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer hint */}
      <div className="flex-shrink-0 px-4 py-3 border-t border-gray-50">
        <p className="text-xs text-gray-400 text-center">每次 AI 修改完成后自动保存版本</p>
      </div>
    </div>
  );
}
