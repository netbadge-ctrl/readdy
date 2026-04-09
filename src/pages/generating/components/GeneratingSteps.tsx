import { useEffect, useState } from "react";

const steps = [
  { id: 1, label: "分析需求" },
  { id: 2, label: "设计架构" },
  { id: 3, label: "生成代码" },
  { id: 4, label: "优化细节" },
];

interface Props {
  isFinished: boolean;
}

export default function GeneratingSteps({ isFinished }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    steps.forEach((_, i) => {
      timers.push(setTimeout(() => setCurrentStep(i), i * 2200));
      if (i < steps.length - 1) {
        timers.push(setTimeout(() => setCompletedSteps((p) => [...p, i]), i * 2200 + 1800));
      }
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex items-center gap-1.5">
      {steps.map((step, i) => {
        const isCompleted = completedSteps.includes(i) || isFinished;
        const isCurrent = currentStep === i && !isCompleted;

        return (
          <div key={step.id} className="flex items-center gap-1.5">
            {/* Dot + label */}
            <div className="flex items-center gap-1">
              <div
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isCompleted
                    ? "bg-green-400"
                    : isCurrent
                    ? "bg-gray-900 animate-pulse"
                    : "bg-gray-300"
                }`}
              />
              <span
                className={`text-xs transition-colors duration-300 whitespace-nowrap ${
                  isCompleted
                    ? "text-green-500"
                    : isCurrent
                    ? "text-gray-700 font-medium"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {/* Connector */}
            {i < steps.length - 1 && (
              <div
                className={`w-4 h-px transition-all duration-500 ${
                  completedSteps.includes(i) || isFinished ? "bg-green-300" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
