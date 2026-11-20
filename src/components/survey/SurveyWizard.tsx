"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Send,
  AlertTriangle,
} from "lucide-react";
import { SurveyFormData } from "@/types/survey";
import {
  GOALS_OPTIONS,
  EXPERIENCE_OPTIONS,
  READINESS_OPTIONS,
  TIME_OPTIONS,
  PackageItem,
} from "@/data/surveyConfig";
import {
  validatePersonalInfo,
  sanitizeText,
  ValidationErrors,
} from "@/utils/validation";
import { submitSurvey } from "@/services/surveyApi";
import { WelcomeScreen } from "./WelcomeScreen";
import { ProgressBar } from "./ProgressBar";
import { PersonalInfoStep } from "./PersonalInfoStep";
import { OptionCardsStep } from "./OptionCardsStep";
import { PackageStep } from "./PackageStep";
import { ThankYouScreen } from "./ThankYouScreen";

const TOTAL_STEPS = 6;
const STORAGE_KEY = "talal_survey_submitted_v1";

const INITIAL_DATA: SurveyFormData = {
  full_name: "",
  university: "",
  major: "",
  whatsapp: "",
  primary_goal: "",
  selected_package: "",
  package_price_sar: 0,
  experience_level: "",
  readiness: "",
  preferred_time: "",
};

export function SurveyWizard() {
  // 0 = شاشة الترحيب، 1..6 = خطوات الاستبيان، 7 = شاشة الشكر
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<SurveyFormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [stepError, setStepError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionId, setSubmissionId] = useState<string | undefined>();
  const [honeypot, setHoneypot] = useState<string>(""); // مصيدة البوتات

  // التحقق عند فتح الصفحة هل سبق للمستخدم الإرسال من هذا الجهاز
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed?.data) {
          setFormData(parsed.data);
          setSubmissionId(parsed.submissionId);
          setStep(7);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const updateField = (field: keyof SurveyFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (stepError) setStepError("");
  };

  const handlePackageSelect = (pkg: PackageItem) => {
    setFormData((prev) => ({
      ...prev,
      selected_package: pkg.value,
      package_price_sar: pkg.price,
    }));
    if (stepError) setStepError("");
  };

  const validateCurrentStep = (): boolean => {
    setStepError("");

    if (step === 1) {
      const validationErrors = validatePersonalInfo(formData);
      setErrors(validationErrors);
      return Object.keys(validationErrors).length === 0;
    }
    if (step === 2 && !formData.primary_goal) {
      setStepError("يرجى اختيار هدفك الأساسي للمتابعة.");
      return false;
    }
    if (step === 3 && !formData.selected_package) {
      setStepError("يرجى اختيار الباقة التي تتحمس لها أكثر للمتابعة.");
      return false;
    }
    if (step === 4 && !formData.experience_level) {
      setStepError("يرجى تحديد نقطة البداية المناسبة لك.");
      return false;
    }
    if (step === 5 && !formData.readiness) {
      setStepError("يرجى تحديد مدى رغبتك في التسجيل.");
      return false;
    }
    if (step === 6 && !formData.preferred_time) {
      setStepError("يرجى اختيار الوقت الأنسب لك لحضور البث المباشر.");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    setStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setStepError("");
    setStep((prev) => Math.max(0, prev - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep() || isSubmitting) return;

    // إذا ملأ البوت الحقل المخفي، ننهي العملية بصمت دون إرسال للشيت
    if (honeypot) {
      setStep(7);
      return;
    }

    setIsSubmitting(true);
    setStepError("");

    try {
      const cleanedData: SurveyFormData = {
        ...formData,
        full_name: sanitizeText(formData.full_name),
        university: sanitizeText(formData.university),
        major: sanitizeText(formData.major),
      };

      const res = await submitSurvey(cleanedData);
      setSubmissionId(res.submission_id);

      // حفظ الإرسال في المتصفح لمنع التكرار
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ data: cleanedData, submissionId: res.submission_id })
      );

      setStep(7);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setStepError(
        err instanceof Error
          ? err.message
          : "حدث خطأ غير متوقع أثناء الإرسال، يرجى المحاولة مرة أخرى."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-[#111827]/85 backdrop-blur-xl border border-slate-800/90 rounded-3xl p-5 sm:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
        {/* حقل مصيدة مخفي ضد البوتات */}
        <input
          type="text"
          name="_hp"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        {/* شريط التقدم يظهر فقط في الخطوات من 1 إلى 6 */}
        {step >= 1 && step <= TOTAL_STEPS && (
          <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />
        )}

        {/* محتوى الخطوة الحالية */}
        <AnimatePresence mode="wait">
          {step === 0 && (
            <WelcomeScreen key="welcome" onStart={() => setStep(1)} />
          )}

          {step === 1 && (
            <PersonalInfoStep
              key="step-1"
              data={formData}
              errors={errors}
              onChange={updateField}
            />
          )}

          {step === 2 && (
            <OptionCardsStep
              key="step-2"
              title="ثانياً: لماذا ترغب في حضور هذه الدورة؟"
              subtitle="اختر الهدف الأقرب لك لنركز عليه في التطبيق العملي."
              options={GOALS_OPTIONS}
              selectedValue={formData.primary_goal}
              onSelect={(val) => updateField("primary_goal", val)}
            />
          )}

          {step === 3 && (
            <PackageStep
              key="step-3"
              selectedPackage={formData.selected_package}
              onSelect={handlePackageSelect}
            />
          )}

          {step === 4 && (
            <OptionCardsStep
              key="step-4"
              title="رابعاً: ما هي نقطة البداية المناسبة لك؟"
              subtitle="الدورة مخصصة للمبتدئين فقط، وسنبدأ معك بالوتيرة التي تناسبك."
              options={EXPERIENCE_OPTIONS}
              selectedValue={formData.experience_level}
              onSelect={(val) => updateField("experience_level", val)}
            />
          )}

          {step === 5 && (
            <OptionCardsStep
              key="step-5"
              title="خامساً: ما مدى رغبتك في التسجيل وحضور الدورة؟"
              subtitle="يساعدنا هذا في ترتيب الأولوية وتحديد عدد المقاعد."
              options={READINESS_OPTIONS}
              selectedValue={formData.readiness}
              onSelect={(val) => updateField("readiness", val)}
            />
          )}

          {step === 6 && (
            <OptionCardsStep
              key="step-6"
              title="سادساً: ما هو الوقت الأنسب لك لحضور البث على Zoom؟"
              subtitle="سنعتمد الوقت الأكثر طلباً من قبل المشاركين."
              options={TIME_OPTIONS}
              selectedValue={formData.preferred_time}
              onSelect={(val) => updateField("preferred_time", val)}
            />
          )}

          {step === 7 && (
            <ThankYouScreen
              key="thank-you"
              data={formData}
              submissionId={submissionId}
            />
          )}
        </AnimatePresence>

        {/* رسالة الخطأ العامة للخطوة */}
        {stepError && (
          <div className="mt-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-rose-300 text-sm">
            <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400" />
            <span>{stepError}</span>
          </div>
        )}

        {/* أزرار التنقل (السابق / التالي / إرسال) */}
        {step >= 1 && step <= TOTAL_STEPS && (
          <div className="mt-8 pt-5 border-t border-slate-800/80 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleBack}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50"
            >
              <ArrowRight className="w-4 h-4" />
              <span>السابق</span>
            </button>

            {step < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-l from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-sm sm:text-base font-bold shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-all cursor-pointer"
              >
                <span>التالي</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-l from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-sm sm:text-base font-bold shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>جاري حفظ بياناتك...</span>
                  </>
                ) : (
                  <>
                    <span>إرسال الاستبيان</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>

      {/* تذييل أنيق */}
      <footer className="mt-6 text-center text-xs text-slate-500">
        جميع الحقوق محفوظة © 2026 • طلال أحمد للتسويق الإلكتروني
      </footer>
    </div>
  );
}