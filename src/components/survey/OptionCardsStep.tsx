"use client";

import { motion } from "framer-motion";
import {
  Store,
  Briefcase,
  Sparkles,
  Target,
  Sprout,
  Layers,
  Rocket,
  Clock,
  Sunrise,
  Sun,
  Moon,
  CheckCircle2,
} from "lucide-react";
import { OptionItem } from "@/data/surveyConfig";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  store: Store,
  briefcase: Briefcase,
  sparkles: Sparkles,
  target: Target,
  sprout: Sprout,
  layers: Layers,
  rocket: Rocket,
  clock: Clock,
  sunrise: Sunrise,
  sun: Sun,
  moon: Moon,
};

interface OptionCardsStepProps {
  title: string;
  subtitle: string;
  options: OptionItem[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export function OptionCardsStep({
  title,
  subtitle,
  options,
  selectedValue,
  onSelect,
}: OptionCardsStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.35 }}
    >
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-1.5">
          {title}
        </h2>
        <p className="text-slate-400 text-sm">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-3.5">
        {options.map((option) => {
          const IconComponent = ICON_MAP[option.icon] || Sparkles;
          const isSelected = selectedValue === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              className={`group relative w-full text-right p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-4 ${
                isSelected
                  ? "bg-blue-500/15 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                  : "bg-slate-900/70 border-slate-800 hover:border-slate-600 hover:bg-slate-900"
              }`}
            >
              {/* الأيقونة */}
              <div
                className={`p-3 rounded-xl shrink-0 transition-colors ${
                  isSelected
                    ? "bg-blue-500 text-white"
                    : "bg-slate-800 text-slate-400 group-hover:text-blue-400"
                }`}
              >
                <IconComponent className="w-5 h-5" />
              </div>

              {/* النص */}
              <div className="flex-1 min-w-0">
                <h3
                  className={`font-bold text-base sm:text-lg mb-1 ${
                    isSelected ? "text-white" : "text-slate-200"
                  }`}
                >
                  {option.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {option.description}
                </p>
              </div>

              {/* علامة الاختيار */}
              <div className="shrink-0 mt-1">
                {isSelected ? (
                  <CheckCircle2 className="w-6 h-6 text-blue-400" />
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-slate-700 group-hover:border-slate-500 transition-colors" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}