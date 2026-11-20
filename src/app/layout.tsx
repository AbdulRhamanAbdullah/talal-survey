import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "استبيان دورة التسويق الإلكتروني للمبتدئين | المدرب طلال أحمد",
  description:
    "شاركنا أهدافك واهتماماتك التدريبية لتصميم دورة تأسيسية عملية في التسويق الرقمي عبر Zoom — مع ضمان استشارات مجانية بعد الدورة.",
  openGraph: {
    title: "🚀 استبيان دورة التسويق الإلكتروني للمبتدئين (عبر Zoom)",
    description:
      "إعداد وتقديم المدرب طلال أحمد • اختر مسارك والوقت الأنسب لك واحصل على ضمان التطبيق العملي بعد الدورة.",
    type: "website",
    locale: "ar_SA",
    siteName: "طلال أحمد للتسويق الإلكتروني",
  },
  twitter: {
    card: "summary_large_image",
    title: "استبيان دورة التسويق الإلكتروني للمبتدئين | طلال أحمد",
    description:
      "شاركنا أهدافك التدريبية لتصميم دورة عملية تناسب المبتدئين من الصفر عبر Zoom.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body
        className={`${cairo.className} bg-[#0B1120] text-slate-100 antialiased selection:bg-blue-500/30 selection:text-blue-200`}
      >
        {children}
      </body>
    </html>
  );
}