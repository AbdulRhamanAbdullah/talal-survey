"use client";

import { motion } from "framer-motion";
import {
  User,
  GraduationCap,
  BookOpen,
  Phone,
  AlertCircle,
  Info,
  ShieldCheck,
} from "lucide-react";
import { SurveyFormData } from "@/types/survey";
import { cleanWhatsappInput, ValidationErrors } from "@/utils/validation";

interface PersonalInfoStepProps {
  data: SurveyFormData;
  errors: ValidationErrors;
  onChange: (field: keyof SurveyFormData, value: string) => void;
}

export function PersonalInfoStep({
  data,
  errors,
  onChange,
}: PersonalInfoStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.35 }}
      className="space-y-5"
    >
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-1.5">
          أولاً: بياناتك والتواصل
        </h2>
        <p className="text-slate-400 text-sm">
          نحتاج هذه البيانات الأساسية لتخصيص محتوى الدورة والتواصل معك برابط Zoom.
        </p>
      </div>

      {/* الاسم الكامل */}
      <div>
        <label
          htmlFor="full_name"
          className="block text-sm font-semibold text-slate-200 mb-2"
        >
          الاسم الكامل <span className="text-rose-400">*</span>
        </label>
        <div className="relative">
          <User className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="full_name"
            type="text"
            value={data.full_name}
            onChange={(e) => onChange("full_name", e.target.value)}
            placeholder="مثال: أحمد محمد السالم"
            autoComplete="name"
            className={`w-full pr-11 pl-4 py-3.5 rounded-xl bg-slate-900/90 border text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all ${
              errors.full_name
                ? "border-rose-500/80 focus:ring-rose-500/30"
                : "border-slate-700/80 focus:border-blue-500 focus:ring-blue-500/25"
            }`}
          />
        </div>
        {errors.full_name ? (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.full_name}</span>
          </p>
        ) : (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-400">
            <Info className="w-3.5 h-3.5 shrink-0 text-slate-500" />
            <span>اكتب اسمك الأول والأخير كما تحب أن نناديك به في الدورة.</span>
          </p>
        )}
      </div>

      {/* الجامعة والجهة + التخصص في صف واحد على الشاشات الكبيرة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* الجامعة */}
        <div>
          <label
            htmlFor="university"
            className="block text-sm font-semibold text-slate-200 mb-2"
          >
            الجامعة <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <GraduationCap className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="university"
              type="text"
              value={data.university}
              onChange={(e) => onChange("university", e.target.value)}
              placeholder="مثال: جامعة عدن / خريج"
              className={`w-full pr-11 pl-4 py-3.5 rounded-xl bg-slate-900/90 border text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all ${
                errors.university
                  ? "border-rose-500/80 focus:ring-rose-500/30"
                  : "border-slate-700/80 focus:border-blue-500 focus:ring-blue-500/25"
              }`}
            />
          </div>
          {errors.university ? (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.university}</span>
            </p>
          ) : (
            <p className="mt-1.5 text-xs text-slate-400">
              إن لم تكن طالباً حالياً، اكتب &quot;خريج&quot; أو &quot;عمل حر&quot;.
            </p>
          )}
        </div>

        {/* التخصص الدراسي */}
        <div>
          <label
            htmlFor="major"
            className="block text-sm font-semibold text-slate-200 mb-2"
          >
            التخصص الدراسي <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <BookOpen className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="major"
              type="text"
              value={data.major}
              onChange={(e) => onChange("major", e.target.value)}
              placeholder="مثال: إدارة أعمال / تقنية معلومات"
              className={`w-full pr-11 pl-4 py-3.5 rounded-xl bg-slate-900/90 border text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all ${
                errors.major
                  ? "border-rose-500/80 focus:ring-rose-500/30"
                  : "border-slate-700/80 focus:border-blue-500 focus:ring-blue-500/25"
              }`}
            />
          </div>
          {errors.major ? (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.major}</span>
            </p>
          ) : (
            <p className="mt-1.5 text-xs text-slate-400">
              تخصصك الجامعي أو مجال عملك/مشروعك الحالي.
            </p>
          )}
        </div>
      </div>

      {/* رقم الواتساب */}
      <div>
        <label
          htmlFor="whatsapp"
          className="block text-sm font-semibold text-slate-200 mb-2"
        >
          رقم الجوال (واتساب) <span className="text-rose-400">*</span>
        </label>
        <div className="relative">
          <Phone className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="whatsapp"
            type="tel"
            dir="ltr"
            value={data.whatsapp}
            onChange={(e) =>
              onChange("whatsapp", cleanWhatsappInput(e.target.value))
            }
            placeholder="9665xxxxxxxx أو 9677xxxxxxxx"
            autoComplete="tel"
            className={`w-full pr-11 pl-4 py-3.5 rounded-xl bg-slate-900/90 border text-white text-right placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all ${
              errors.whatsapp
                ? "border-rose-500/80 focus:ring-rose-500/30"
                : "border-slate-700/80 focus:border-blue-500 focus:ring-blue-500/25"
            }`}
          />
        </div>
        {errors.whatsapp ? (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.whatsapp}</span>
          </p>
        ) : (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-emerald-400/90">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>
              يُستخدم فقط لإرسال رابط بث Zoom وتفاصيل الدورة (اكتبه مع مفتاح الدولة).
            </span>
          </p>
        )}
      </div>
    </motion.div>
  );
}