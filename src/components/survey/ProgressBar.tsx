"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  currentStep: number; // من 1 إلى 6
  totalSteps: number;
}

const STEP_LABELS: Record<number, string> = {
  1: "بياناتك والتواصل",
  2: "هدفك من الدورة",
  3: "اختيار المسار والباقة",
  4: "نقطة البداية",
  5: "الجاهزية للتسجيل",
  6: "الوقت الأنسب للبث",
};

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between text-xs sm:text-sm mb-2.5">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold text-xs border border-blue-500/30">
            {currentStep}
          </span>
          <span className="text-slate-200 font-semibold">
            {STEP_LABELS[currentStep] || ""}
          </span>
        </div>
        <span className="text-slate-400 font-medium">
          الخطوة {currentStep} من {totalSteps} ({percentage}%)
        </span>
      </div>

      <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50 p-[1px]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-l from-blue-400 via-blue-500 to-indigo-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}