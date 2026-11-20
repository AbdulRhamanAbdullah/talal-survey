export interface SurveyFormData {
  full_name: string;
  university: string;
  major: string;
  whatsapp: string;
  primary_goal: string;
  selected_package: string;
  package_price_sar: number;
  experience_level: string;
  readiness: string;
  preferred_time: string;
}

export interface UtmTrackingData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  referrer_url: string;
  device_type: "Mobile" | "Tablet" | "Desktop";
}

export type SurveySubmissionPayload = SurveyFormData & UtmTrackingData;

export interface SurveyApiResponse {
  status: "success" | "error";
  submission_id?: string;
  row?: number;
  message?: string;
}