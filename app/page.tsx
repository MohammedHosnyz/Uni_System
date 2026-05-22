'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from '@/lib/useTranslations';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  BookOpen,
  Users,
  FlaskConical,
  Stethoscope,
  Laptop,
  Scale,
  Palette,
  Clock,
  Star,
  TrendingUp,
  Award,
} from "lucide-react";

const stats = [
  { valueAr: "١٢,٠٠٠+", valueEn: "12,000+", labelAr: "طالب وطالبة", labelEn: "Students" },
  { valueAr: "٨٠٠+", valueEn: "800+", labelAr: "عضو هيئة تدريس", labelEn: "Faculty Members" },
  { valueAr: "٦٠+", valueEn: "60+", labelAr: "برنامج أكاديمي", labelEn: "Academic Programs" },
  { valueAr: "٩٥٪", valueEn: "95%", labelAr: "نسبة التوظيف", labelEn: "Employment Rate" },
];

const faculties = [
  { icon: Stethoscope, nameAr: "كلية الطب", nameEn: "Medicine", color: "bg-red-50 text-red-600" },
  { icon: FlaskConical, nameAr: "كلية العلوم", nameEn: "Sciences", color: "bg-blue-50 text-blue-600" },
  { icon: Laptop, nameAr: "كلية الحاسبات", nameEn: "Computing", color: "bg-purple-50 text-purple-600" },
  { icon: Scale, nameAr: "كلية الحقوق", nameEn: "Law", color: "bg-green-50 text-green-600" },
  { icon: TrendingUp, nameAr: "كلية التجارة", nameEn: "Business", color: "bg-amber-50 text-amber-600" },
  { icon: Palette, nameAr: "كلية الفنون", nameEn: "Arts", color: "bg-pink-50 text-pink-600" },
];

const newsItems = [
  { titleAr: "افتتاح المختبر المركزي الجديد للأبحاث", titleEn: "Opening of the New Central Research Lab", dateAr: "٥ فبراير ٢٠٢٦", dateEn: "Feb 5, 2026", categoryAr: "أخبار", categoryEn: "News" },
  { titleAr: "بدء التسجيل للفصل الدراسي الثاني", titleEn: "Spring Semester Registration Opens", dateAr: "١ فبراير ٢٠٢٦", dateEn: "Feb 1, 2026", categoryAr: "تسجيل", categoryEn: "Registration" },
  { titleAr: "الجامعة تحصل على اعتماد دولي جديد", titleEn: "University Receives New International Accreditation", dateAr: "٢٨ يناير ٢٠٢٦", dateEn: "Jan 28, 2026", categoryAr: "إنجازات", categoryEn: "Achievements" },
];

// Inline UI Components
const StatsCounter = ({ stats, t }: { stats: any[], t: any }) => (
  <section className="border-y border-stone-100 bg-white py-12">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:divide-x md:divide-stone-100 rtl:md:divide-x-reverse">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl font-bold text-[#FABA19] sm:text-4xl">
              {t(stat.valueAr, stat.valueEn)}
            </div>
            <div className="mt-2 text-sm font-medium text-stone-500 sm:text-base">
              {t(stat.labelAr, stat.labelEn)}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SectionHeader = ({ titleAr, titleEn, subtitleAr, subtitleEn, t }: { titleAr: string, titleEn: string, subtitleAr: string, subtitleEn: string, t: any }) => (
  <div className="mb-12 text-center md:mb-16">
    <h2 className="text-3xl font-bold text-stone-900 sm:text-4xl">{t(titleAr, titleEn)}</h2>
    <p className="mt-4 text-lg text-stone-500">{t(subtitleAr, subtitleEn)}</p>
  </div>
);

const CTABand = ({ titleAr, titleEn, subtitleAr, subtitleEn, buttonAr, buttonEn, href, t }: any) => (
  <section className="bg-stone-900 py-16">
    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-white sm:text-4xl">{t(titleAr, titleEn)}</h2>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{t(subtitleAr, subtitleEn)}</p>
      <Button asChild size="lg" className="mt-8 bg-[#FABA19] text-white hover:bg-[#e5a816] border-0">
        <Link href={href}>{t(buttonAr, buttonEn)}</Link>
      </Button>
    </div>
  </section>
);

export default function Home() {
  const { locale } = useTranslations();
  
  // Custom translation helper
  const t = (ar: string, en: string) => locale === 'ar' ? ar : en;
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero-image.png"
            alt={t("جامعة أسيوط الأهلية - الحرم الجامعي", "Assiut National University - Campus")}
            fill
            sizes="100vw"
            unoptimized={true}
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/50 to-stone-900/30" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="secondary"
              className="mb-6 gap-1.5 border-0 bg-white/20 px-4 py-1.5 text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
            >
              <Star className="h-3.5 w-3.5" />
              {t("تصنيف ضمن أفضل ٥٠ جامعة عربية", "Ranked Top 50 Arab Universities")}
            </Badge>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {t("ابنِ مستقبلك", "Build Your Future")}{" "}
              <span className="block text-[#FABA19]">
                {t("مع جامعة أسيوط الأهلية", "with Assiut National University")}
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/80 sm:text-xl">
              {t(
                "نقدم تعليمًا عالي الجودة يجمع بين التميز الأكاديمي والابتكار البحثي وخدمة المجتمع، لنصنع قادة الغد.",
                "We deliver high-quality education combining academic excellence, research innovation, and community service to shape tomorrow's leaders."
              )}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#FABA19] text-white shadow-lg hover:bg-[#e5a816] border-0"
              >
                <Link href="/login" className="flex items-center gap-2">
                  {t("تسجيل الدخول", "Login")}
                  <Arrow className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
              >
                <Link href="/programs">
                  {t("استكشف البرامج", "Explore Programs")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter stats={stats} t={t} />

      {/* Faculties */}
      <section className="py-20 bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            titleAr="كلياتنا" titleEn="Our Faculties"
            subtitleAr="نضم ست كليات متميزة تقدم أكثر من ٦٠ برنامجًا أكاديميًا" subtitleEn="Six distinguished faculties offering 60+ academic programs"
            t={t}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {faculties.map((faculty) => (
              <Link key={faculty.nameEn} href="/departments">
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-0 shadow-sm bg-white h-full">
                  <CardContent className="flex items-center gap-4 p-5 h-full">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${faculty.color}`}>
                      <faculty.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-stone-800">
                        {t(faculty.nameAr, faculty.nameEn)}
                      </h3>
                      <p className="text-sm text-stone-500">
                        {t("عرض التفاصيل", "View details")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            titleAr="لماذا جامعة أسيوط الأهلية؟" titleEn="Why Assiut National University?"
            subtitleAr="مميزات تجعلنا الخيار الأول لآلاف الطلاب" subtitleEn="Features that make us the first choice for thousands"
            t={t}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Award, titleAr: "اعتمادات دولية", titleEn: "International Accreditations", descAr: "معتمدون من أكبر هيئات الاعتماد الأكاديمي", descEn: "Accredited by top academic bodies" },
              { icon: Users, titleAr: "هيئة تدريس متميزة", titleEn: "Distinguished Faculty", descAr: "أساتذة بخبرات عالمية في مختلف التخصصات", descEn: "Professors with global expertise" },
              { icon: BookOpen, titleAr: "مناهج حديثة", titleEn: "Modern Curricula", descAr: "برامج محدثة تواكب سوق العمل", descEn: "Updated programs aligned with market needs" },
              { icon: GraduationCap, titleAr: "فرص توظيف", titleEn: "Career Opportunities", descAr: "شراكات مع كبرى الشركات والمؤسسات", descEn: "Partnerships with leading companies" },
            ].map((item) => (
              <Card key={item.titleEn} className="border-0 bg-stone-50 shadow-none h-full">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-2 font-semibold text-stone-800">
                    {t(item.titleAr, item.titleEn)}
                  </h3>
                  <p className="text-sm leading-relaxed text-stone-500">
                    {t(item.descAr, item.descEn)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-20 bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            titleAr="آخر الأخبار" titleEn="Latest News"
            subtitleAr="تابع آخر المستجدات والأحداث في الجامعة" subtitleEn="Stay updated with the latest university events"
            t={t}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {newsItems.map((item, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer overflow-hidden border-0 shadow-sm bg-white h-full">
                <div className="h-40 bg-gradient-to-br from-amber-100 to-amber-50" />
                <CardContent className="p-5">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors">
                      {t(item.categoryAr, item.categoryEn)}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-stone-400">
                      <Clock className="h-3 w-3" />
                      {t(item.dateAr, item.dateEn)}
                    </span>
                  </div>
                  <h3 className="mt-3 font-semibold leading-relaxed text-stone-800">
                    {t(item.titleAr, item.titleEn)}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline" className="border-stone-200 text-stone-600 hover:bg-stone-50">
              <Link href="/news">{t("عرض جميع الأخبار", "View All News")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABand
        titleAr="ابدأ رحلتك الأكاديمية اليوم" titleEn="Start Your Academic Journey Today"
        subtitleAr="التسجيل مفتوح الآن للفصل الدراسي القادم" subtitleEn="Registration is now open for the upcoming semester"
        buttonAr="تسجيل الدخول" buttonEn="Login"
        href="/login"
        t={t}
      />
    </>
  );
}
