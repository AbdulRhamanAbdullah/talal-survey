"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, Share2, Check, Hash } from "lucide-react";
import { useState } from "react";
import { SurveyFormData } from "@/types/survey";

interface ThankYouScreenProps {
  data: SurveyFormData;
  submissionId?: string;
}

export function ThankYouScreen({ data, submissionId }: ThankYouScreenProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = window.location.origin + window.location.pathname;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "استبيان دورة التسويق الإلكتروني - المدرب طلال أحمد",
          text: "سجّل رغبتك الآن في دورة التسويق الإلكتروني للمبتدئين عبر Zoom",
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // تجاهل إلغاء المشاركة
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45 }}
      className="text-center py-4"
    >
      {/* أيقونة النجاح */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
        className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.25)]"
      >
        <CheckCircle2 className="w-10 h-10 text-emerald-400" />
      </motion.div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
        🎉 تم تسجيل بياناتك ورغبتك بنجاح!
      </h2>

      <p className="text-slate-300 text-base sm:text-lg mb-6">
        شكراً لمشاركتك يا{" "}
        <span className="text-blue-400 font-bold">{data.full_name}</span>
      </p>

      {/* ملخص التسجيل */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 mb-6 text-right space-y-3 text-sm">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
          <span className="text-slate-400">الباقة المختارة:</span>
          <span className="text-white font-bold">{data.selected_package}</span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
          <span className="text-slate-400">الوقت المفضل للبث:</span>
          <span className="text-slate-200 font-semibold">{data.preferred_time}</span>
        </div>
        {submissionId && (
          <div className="flex items-center justify-between pt-0.5">
            <span className="text-slate-400 flex items-center gap-1">
              <Hash className="w-3.5 h-3.5" />
              الرقم المرجعي:
            </span>
            <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20">
              {submissionId}
            </span>
          </div>
        )}
      </div>

      {/* رسالة الشكر الرسمية */}
      <div className="bg-gradient-to-br from-blue-500/10 to-slate-900/90 border border-blue-500/25 rounded-2xl p-5 mb-7 text-slate-300 text-sm leading-relaxed">
        <p className="mb-3">
          وصل اختيارك مباشرة إلى المدرب{" "}
          <strong className="text-white">طلال أحمد</strong>، وسنتواصل معك عبر
          الواتساب فور تحديد موعد انطلاق دورة المبتدئين عبر Zoom.
        </p>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 text-amber-300 text-xs sm:text-sm font-semibold">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>ابحث عنا في كل المنصات باسم: طلال احمد للتسويق الالكتروني</span>
        </div>
      </div>

      {/* زر مشاركة الاستبيان */}
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-sm font-semibold transition-colors cursor-pointer"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-emerald-400" />
            <span>تم نسخ رابط الاستبيان!</span>
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4 text-blue-400" />
            <span>شارك الاستبيان مع صديق مهتم</span>
          </>
        )}
      </button>
    </motion.div>
  );
}