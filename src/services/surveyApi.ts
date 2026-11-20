import {
  SurveyFormData,
  SurveySubmissionPayload,
  SurveyApiResponse,
  UtmTrackingData,
} from "@/types/survey";

/**
 * التقاط معاملات التتبع التسويقي (UTM) ونوع الجهاز تلقائياً من المتصفح
 */
export function getUtmTrackingData(): UtmTrackingData {
  if (typeof window === "undefined") {
    return {
      utm_source: "direct",
      utm_medium: "none",
      utm_campaign: "none",
      utm_content: "",
      referrer_url: "",
      device_type: "Desktop",
    };
  }

  const params = new URLSearchParams(window.location.search);
  const ua = navigator.userAgent.toLowerCase();

  let device_type: "Mobile" | "Tablet" | "Desktop" = "Desktop";
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    device_type = "Tablet";
  } else if (/mobile|iphone|ipod|android|blackberry|iemobile|opera mini/i.test(ua)) {
    device_type = "Mobile";
  }

  return {
    utm_source: params.get("utm_source") || "direct",
    utm_medium: params.get("utm_medium") || "none",
    utm_campaign: params.get("utm_campaign") || "none",
    utm_content: params.get("utm_content") || "",
    referrer_url: document.referrer || "",
    device_type,
  };
}

/**
 * طبقة الإرسال المعزولة (API Adapter)
 * اليوم ترسل إلى Google Apps Script، وغداً عند النقل لـ PostgreSQL نعدل هذا الملف فقط
 */
export async function submitSurvey(
  formData: SurveyFormData
): Promise<SurveyApiResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_SURVEY_API_URL;

  if (!apiUrl) {
    throw new Error("رابط الـ API غير مضبوط في ملف .env.local");
  }

  const trackingData = getUtmTrackingData();
  const payload: SurveySubmissionPayload = {
    ...formData,
    ...trackingData,
  };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("فشل الاتصال بالخادم، يرجى المحاولة مرة أخرى.");
  }

  const result: SurveyApiResponse = await response.json();

  if (result.status !== "success") {
    throw new Error(result.message || "حدث خطأ أثناء حفظ البيانات.");
  }

  return result;
}