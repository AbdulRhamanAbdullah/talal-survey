"use client";

import { motion } from "framer-motion";
import { Check, Crown, CheckCircle2 } from "lucide-react";
import { PACKAGES_OPTIONS, PackageItem } from "@/data/surveyConfig";

interface PackageStepProps {
  selectedPackage: string;
  onSelect: (pkg: PackageItem) => void;
}

export function PackageStep({ selectedPackage, onSelect }: PackageStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.35 }}
    >
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-1.5">
          ثالثاً: أي المسارات والباقات تتحمس لتعلمه أكثر؟
        </h2>
        <p className="text-slate-400 text-sm">
          اختر الباقة الأنسب لهدفك؛ جميع الباقات تشمل ضمان استشارات مجانية بعد الدورة.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {PACKAGES_OPTIONS.map((pkg) => {
          const isSelected = selectedPackage === pkg.value;
          const isVip = pkg.isVip;

          return (
            <button
              key={pkg.value}
              type="button"
              onClick={() => onSelect(pkg)}
              className={`relative w-full text-right p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? isVip
                    ? "bg-amber-500/15 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.25)]"
                    : "bg-blue-500/15 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                  : isVip
                  ? "bg-gradient-to-br from-amber-500/10 via-slate-900/90 to-slate-900 border-amber-500/40 hover:border-amber-400/80"
                  : "bg-slate-900/70 border-slate-800 hover:border-slate-600"
              }`}
            >
              {/* شارة VIP */}
              {pkg.badge && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold mb-3">
                  <Crown className="w-3.5 h-3.5" />
                  <span>{pkg.badge}</span>
                </div>
              )}

              {/* رأس البطاقة: العنوان والسعر */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white">
                    {pkg.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                    {pkg.subtitle}
                  </p>
                </div>

                <div className="text-left shrink-0">
                  <div
                    className={`text-xl sm:text-2xl font-extrabold ${
                      isVip ? "text-amber-400" : "text-blue-400"
                    }`}
                  >
                    {pkg.price}{" "}
                    <span className="text-xs font-semibold text-slate-300">
                      ريال سعودي
                    </span>
                  </div>
                </div>
              </div>

              {/* قائمة المميزات */}
              <ul className="space-y-2 border-t border-slate-800/80 pt-3.5">
                {pkg.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs sm:text-sm text-slate-300"
                  >
                    <Check
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        isVip ? "text-amber-400" : "text-blue-400"
                      }`}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* مؤشر الاختيار */}
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                <span
                  className={
                    isSelected
                      ? isVip
                        ? "text-amber-300 font-bold"
                        : "text-blue-300 font-bold"
                      : "text-slate-500"
                  }
                >
                  {isSelected ? "تم اختيار هذه الباقة" : "اضغط لاختيار هذه الباقة"}
                </span>
                {isSelected && (
                  <CheckCircle2
                    className={`w-5 h-5 ${
                      isVip ? "text-amber-400" : "text-blue-400"
                    }`}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}