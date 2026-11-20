"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Gift,
  Video,
  Clock,
  ArrowLeft,
  ShieldCheck,
  Crown,
} from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45 }}
      className="text-center"
    >
      {/* شارة البث المباشر */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs sm:text-sm font-medium mb-6">
        <Video className="w-4 h-4 text-blue-400" />
        <span>دورة تأسيسية مباشرة عبر Zoom</span>
      </div>

      {/* العنوان الرئيسي */}
      <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
        استبيان تحديد رغبات دورة{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-400 to-cyan-300">
          التسويق الإلكتروني للمبتدئين
        </span>
      </h1>

      {/* تعريف المدرب */}
      <p className="text-slate-400 text-sm sm:text-base mb-6">
        إعداد وتقديم المدرب:{" "}
        <span className="text-slate-100 font-bold">طلال أحمد</span>
      </p>

      {/* المقدمة الترحيبية */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 mb-6 text-right leading-relaxed text-slate-300 text-sm sm:text-base">
        <div className="flex items-center gap-2 text-amber-400 font-bold mb-2">
          <Sparkles className="w-4 h-4" />
          <span>أهلاً بكم جميعاً</span>
        </div>
        <p>
          يسرّ المدرب طلال أحمد معرفة أهدافكم واهتماماتكم التدريبية في مجال التسويق
          الرقمي لتصميم دورة تأسيسية عملية تناسب المبتدئين من الصفر وتُقدَّم مباشرة
          عبر منصة Zoom.
        </p>
      </div>

      {/* بطاقة ضمان التطبيق العملي */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-500/10 via-slate-900/90 to-slate-900 border border-amber-500/30 rounded-2xl p-5 mb-8 text-right">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-base mb-3">
          <Gift className="w-5 h-5" />
          <span>ضمان التطبيق العملي بعد الدورة</span>
        </div>

        <div className="space-y-3 text-sm text-slate-300">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <p>
              يحصل مشتركو <strong className="text-white">الباقتين الأولى والثانية</strong> على{" "}
              <span className="text-blue-300 font-semibold">أسبوع كامل</span> من الاستشارات
              المجانية حول مشاريعهم بعد انتهاء الدورة.
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <Crown className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p>
              يحصل مشتركو <strong className="text-amber-300">الباقة الشاملة المتكاملة (VIP)</strong>{" "}
              على <span className="text-amber-300 font-semibold">شهر كامل</span> من المتابعة
              والاستشارات المجانية الخاصة مع المدرب طلال أحمد +{" "}
              <strong className="text-white">حقيبة ملفات وقوالب تسويقية جاهزة مجاناً!</strong>
            </p>
          </div>
        </div>
      </div>

      {/* زر البدء */}
      <button
        type="button"
        onClick={onStart}
        className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-l from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-base sm:text-lg shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] transition-all duration-300 cursor-pointer"
      >
        <span>ابدأ تعبئة الاستبيان الآن</span>
        <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
      </button>

      {/* مؤشر الوقت */}
      <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400">
        <Clock className="w-3.5 h-3.5" />
        <span>يستغرق أقل من دقيقة واحدة فقط • بياناتك محمية وخاصة</span>
      </div>
    </motion.div>
  );
}