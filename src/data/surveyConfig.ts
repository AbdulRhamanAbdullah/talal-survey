export interface OptionItem {
  value: string;       // القيمة القياسية التي تُرسل إلى Google Sheets
  title: string;
  description: string;
  icon: string;
}

export interface PackageItem {
  value: string;       // مطابقة تماماً لاسم الباقة في Apps Script و Sheets
  title: string;
  subtitle: string;
  price: number;
  badge?: string;
  isVip?: boolean;
  features: string[];
}

export const GOALS_OPTIONS: OptionItem[] = [
  {
    value: "تسويق مشروعي الخاص",
    title: "تسويق مشروعي الخاص",
    description: "أريد إطلاق مشروع أو زيادة مبيعات متجري.",
    icon: "store",
  },
  {
    value: "الحصول على عمل أو دخل إضافي",
    title: "الحصول على عمل أو دخل إضافي",
    description: "أريد العمل كمسوّق إلكتروني أو مستقل.",
    icon: "briefcase",
  },
  {
    value: "تعلم مهارة جديدة من الصفر",
    title: "تعلم مهارة جديدة من الصفر",
    description: "تطوير ذاتي وفهم أساسيات التسويق الرقمي.",
    icon: "sparkles",
  },
  {
    value: "فهم الإعلانات بشكل صحيح",
    title: "فهم الإعلانات بشكل صحيح",
    description: "جربت الترويج سابقاً وأريد تعلّم الطريقة الصحيحة.",
    icon: "target",
  },
];

export const PACKAGES_OPTIONS: PackageItem[] = [
  {
    value: "باقة التأسيس: إدارة الصفحات وصناعة المحتوى التسويقي",
    title: "باقة التأسيس",
    subtitle: "إدارة الصفحات وصناعة المحتوى التسويقي",
    price: 60,
    features: [
      "احتراف إدارة صفحات فيسبوك وإنستغرام",
      "بناء الهوية وكتابة نصوص إعلانية جذابة",
      "أفكار ريلز (Reels) تجذب العملاء",
      "ضمان أسبوع استشارة مجانية لمشروعك بعد الدورة",
    ],
  },
  {
    value: "دورة إطلاق الإعلانات الممولة (Meta Ads)",
    title: "دورة الإعلانات الممولة",
    subtitle: "إطلاق الحملات على منصة Meta Ads",
    price: 100,
    features: [
      "استهداف الجمهور بدقة عالية",
      "جلب مبيعات حقيقية بأقل ميزانية",
      "تحليل النتائج وتفادي أخطاء الترويج",
      "ضمان أسبوع استشارة مجانية لمشروعك بعد الدورة",
    ],
  },
  {
    value: "الباقة الشاملة المتكاملة (VIP)",
    title: "الباقة الشاملة المتكاملة",
    subtitle: "إدارة الصفحات + المحتوى + الإعلانات الممولة من الصفر",
    price: 250,
    badge: "الأكثر قيمة ⭐",
    isVip: true,
    features: [
      "تشمل مساري التأسيس والإعلانات الممولة بالكامل",
      "حقيبة ملفات وقوالب تسويقية جاهزة مجاناً",
      "ضمان شهر كامل من الاستشارات الخاصة مع المدرب طلال أحمد",
      "متابعة مباشرة لمشروعك وتطبيق عملي خطوة بخطوة",
    ],
  },
];

export const EXPERIENCE_OPTIONS: OptionItem[] = [
  {
    value: "مبتدئ من الصفر تماماً",
    title: "مبتدئ من الصفر تماماً",
    description: "لا أعرف شيئاً وأحتاج شرحاً مبسطاً من البداية.",
    icon: "sprout",
  },
  {
    value: "لدي معلومات بسيطة جداً",
    title: "لدي معلومات بسيطة جداً",
    description: "أعرف أساسيات بسيطة وأحتاج الترتيب والتطبيق العملي.",
    icon: "layers",
  },
];

export const READINESS_OPTIONS: OptionItem[] = [
  {
    value: "جاهز للتسجيل فوراً",
    title: "جاهز للتسجيل فوراً",
    description: "أنتظر رابط التسجيل وموعد البدء.",
    icon: "rocket",
  },
  {
    value: "مهتم حسب الوقت والرسوم",
    title: "مهتم حسب الوقت والرسوم",
    description: "إذا ناسب جدولي سأسجل بإذن الله.",
    icon: "clock",
  },
];

export const TIME_OPTIONS: OptionItem[] = [
  {
    value: "الصباح (من الساعة 10 صباحاً إلى 12 ظهراً)",
    title: "الفترة الصباحية",
    description: "من الساعة 10 صباحاً إلى 12 ظهراً",
    icon: "sunrise",
  },
  {
    value: "العصر (من الساعة 4 إلى 6 عصراً)",
    title: "فترة العصر",
    description: "من الساعة 4 إلى 6 عصراً",
    icon: "sun",
  },
  {
    value: "المساء (من الساعة 8 إلى 10 مساءً)",
    title: "الفترة المسائية",
    description: "من الساعة 8 إلى 10 مساءً",
    icon: "moon",
  },
];