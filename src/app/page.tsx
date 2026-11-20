import { SurveyWizard } from "@/components/survey/SurveyWizard";

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-4 py-8 sm:py-12">
      {/* إضاءات خلفية جمالية ناعمة */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px]" />
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
      </div>

      {/* محتوى الاستبيان */}
      <div className="relative z-10 w-full">
        <SurveyWizard />
      </div>
    </main>
  );
}