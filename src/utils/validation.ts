/**
 * تحويل الأرقام العربية/الفارسية إلى أرقام إنجليزية تلقائياً
 */
export function normalizeDigits(input: string): string {
  const arabicDigits = "٠١٢٣٤٥٦٧٨٩";
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  return input
    .replace(/[٠-٩]/g, (d) => String(arabicDigits.indexOf(d)))
    .replace(/[۰-۹]/g, (d) => String(persianDigits.indexOf(d)));
}

/**
 * تنظيف النصوص من الرموز غير المرغوبة والمسافات الزائدة
 */
export function sanitizeText(input: string): string {
  return input
    .replace(/[<>]/g, "") // حماية أساسية ضد حقن وسوم HTML
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * تنظيف رقم الواتساب وتوحيد صيغته
 */
export function cleanWhatsappInput(input: string): string {
  const normalized = normalizeDigits(input);
  // السماح بالأرقام وعلامة + فقط أثناء الكتابة
  return normalized.replace(/[^\d+]/g, "");
}

export interface ValidationErrors {
  full_name?: string;
  university?: string;
  major?: string;
  whatsapp?: string;
}

/**
 * التحقق الذكي من حقول البيانات الشخصية مع رسائل خطأ واضحة وودودة
 */
export function validatePersonalInfo(data: {
  full_name: string;
  university: string;
  major: string;
  whatsapp: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};

  // 1. التحقق من الاسم الكامل (يُفضّل اسمان على الأقل)
  const cleanName = sanitizeText(data.full_name);
  if (!cleanName) {
    errors.full_name = "يرجى كتابة اسمك الكامل لنتمكن من مخاطبتك بشكل شخصي.";
  } else if (cleanName.length < 4) {
    errors.full_name = "الاسم قصير جداً، يرجى كتابة الاسم الأول والأخير.";
  } else if (/^\d+$/.test(cleanName)) {
    errors.full_name = "يرجى إدخال اسم حقيقي بالحروف وليس أرقاماً.";
  }

  // 2. التحقق من الجامعة / الجهة
  const cleanUni = sanitizeText(data.university);
  if (!cleanUni) {
    errors.university = "يرجى كتابة اسم جامعتك (أو اكتب 'خريج' أو 'عمل حر' إن لم تكن طالباً).";
  } else if (cleanUni.length < 2) {
    errors.university = "يرجى كتابة اسم واضح للجامعة أو الجهة.";
  }

  // 3. التحقق من التخصص الدراسي
  const cleanMajor = sanitizeText(data.major);
  if (!cleanMajor) {
    errors.major = "يرجى كتابة تخصصك الدراسي أو مجال عملك الحالي.";
  } else if (cleanMajor.length < 2) {
    errors.major = "يرجى كتابة التخصص بشكل واضح.";
  }

  // 4. التحقق من رقم الواتساب
  const digitsOnly = normalizeDigits(data.whatsapp).replace(/\D/g, "");
  if (!digitsOnly) {
    errors.whatsapp = "رقم الواتساب مطلوب لإرسال رابط Zoom وتفاصيل الدورة.";
  } else if (digitsOnly.length < 9 || digitsOnly.length > 15) {
    errors.whatsapp = "يرجى التأكد من صحة الرقم مع مفتاح الدولة (مثال: 9665xxxxxxxx أو 9677xxxxxxxx).";
  }

  return errors;
}