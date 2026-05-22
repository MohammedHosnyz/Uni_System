'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from '@/lib/useTranslations';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Clock, ArrowLeft, ArrowRight, Calendar, MapPin, Search } from "lucide-react";

// Original Translation Dictionary Preserved
const i18n = {
  ar: {
    hero: {
      title: 'الأخبار والفعاليات',
      subtitle: 'آخر أخبار وفعاليات جامعة أسيوط الأهلية — جامعة أهلية غير هادفة للربح أُنشئت بالقرار الجمهوري رقم 42 لسنة 2022',
    },
    latestNews: 'آخر الأخبار',
    latestNewsTag: 'أخبار جامعة أسيوط الأهلية أولاً بأول',
    upcomingEvents: 'الفعاليات والأنشطة',
    achievementsTitle: 'إنجازات الجامعة',
    dateLabel: 'التاريخ:',
    browseByCategory: 'تصفح حسب الفئة',
    newsCount: 'خبر',
    newsletter: {
      title: 'اشترك في النشرة الإخبارية',
      subtitle: 'احصل على آخر الأخبار والفعاليات مباشرة في بريدك الإلكتروني',
      placeholder: 'البريد الإلكتروني',
      button: 'اشترك',
    },
    cta: {
      title: 'تابع آخر أخبار الجامعة',
      subtitle: 'ابقَ على اطلاع بكل جديد في جامعة أسيوط الأهلية',
      contact: 'اتصل بنا',
      home: 'الصفحة الرئيسية',
    },
    events: [
      { title: 'الدورة الرمضانية في كرة القدم الخماسية', date: '15 - 20 مارس 2025', time: 'مساءً', location: 'ملاعب جامعة أسيوط الأهلية', description: 'دورة رياضية رمضانية بمشاركة 32 فريقاً من أعضاء هيئة التدريس والطلاب من مختلف كليات الجامعة.', image: 'https://www.asnu.edu.eg/main/sites/default/files/news/480257742_627064856775984_2618841694047076158_n.jpg', url: 'https://www.asnu.edu.eg/main/ar/node/20382' },
      { title: 'ندوة الاستراتيجية الوطنية لحقوق الإنسان', date: '8 أكتوبر 2025', time: 'صباحاً', location: 'قاعة المحاضرات — جامعة أسيوط الأهلية', description: 'ندوة تثقيفية بعنوان "الاستراتيجية الوطنية لحقوق الإنسان ودور الجامعات في تعزيزها" بمشاركة مدير وحدة حقوق الإنسان بمحافظة أسيوط.', image: 'https://www.asnu.edu.eg/main/sites/default/files/news/558645044_787240514091750_1261960283477944266_n.jpg', url: 'https://www.asnu.edu.eg/main/ar/node/45458' },
      { title: 'اجتماع خطة الأنشطة الطلابية 2025/2026', date: '8 أكتوبر 2025', time: 'ظهراً', location: 'مقر جامعة أسيوط الأهلية', description: 'اجتماع تنسيقي لمناقشة خطة الأنشطة الطلابية للعام الجامعي 2025/2026 بحضور رئيس واتحاد طلاب الجامعة.', image: 'https://www.asnu.edu.eg/main/sites/default/files/news/560356137_787230767426058_3971222761540536150_n.jpg', url: 'https://www.asnu.edu.eg/main/ar/node/45457' },
    ],
    achievements: [
      { title: '68 معملاً علمياً متطوراً بتكلفة 180 مليون جنيه', description: 'أنجزت الجامعة المرحلة الثانية من تجهيز المعامل العلمية بـ 68 معملاً متطوراً تخدم القطاعات الطبية والهندسية والإنسانية وفق أحدث المعايير العالمية.', date: 'مارس 2026' },
      { title: '49 طالباً يلتحقون بمنح المتفوقين لدعم تكافؤ الفرص', description: 'قبلت الجامعة 49 طالباً وطالبة من الحاصلين على منح المتفوقين الممولة من وزارة التعليم العالي والبنك المركزي المصري للعام الجامعي 2025/2026.', date: 'أكتوبر 2025' },
      { title: '5700 طالب و507 عضو هيئة تدريس', description: 'تضم جامعة أسيوط الأهلية 5700 طالب وطالبة، و507 عضو هيئة تدريس، موزعين على 7 كليات و16 برنامجاً دراسياً متخصصاً.', date: '2025' },
      { title: 'اعتماد جامعة أسيوط الأهلية بالقرار الجمهوري رقم 42 لسنة 2022', description: 'أُنشئت جامعة أسيوط الأهلية بقرار جمهوري كجامعة غير هادفة للربح بمدينة أسيوط الجديدة، وتضم كليات الطب والهندسة والحاسبات والذكاء الاصطناعي والصيدلة والألسن والعلوم المالية.', date: '2022' },
    ],
    categories: [
      { title: 'أخبار الجامعة', count: '12' },
      { title: 'فعاليات طلابية', count: '8' },
      { title: 'إنجازات',        count: '6' },
      { title: 'الكليات الطبية', count: '5' },
    ],
  },
  en: {
    hero: {
      title: 'News & Events',
      subtitle: 'Latest news and events from Assiut National University — a non-profit university established by Presidential Decree No. 42 of 2022',
    },
    latestNews: 'Latest News',
    latestNewsTag: 'Assiut National University updates',
    upcomingEvents: 'Events & Activities',
    achievementsTitle: 'University Achievements',
    dateLabel: 'Date:',
    browseByCategory: 'Browse by Category',
    newsCount: 'items',
    newsletter: {
      title: 'Subscribe to Newsletter',
      subtitle: 'Get the latest news and events directly in your inbox',
      placeholder: 'Email address',
      button: 'Subscribe',
    },
    cta: {
      title: 'Stay Updated with University News',
      subtitle: 'Keep up with everything new at Assiut National University',
      contact: 'Contact Us',
      home: 'Home Page',
    },
    events: [
      { title: 'Ramadan Football Tournament', date: 'March 15–20, 2025', time: 'Evening', location: 'Assiut National University Sports Fields', description: 'A Ramadan sports tournament with 32 teams from faculty members and students across all university colleges.', image: 'https://www.asnu.edu.eg/main/sites/default/files/images/559894389_789841397164995_6054922709998060350_n.jpg', url: 'https://www.asnu.edu.eg/main/ar/node/20382' },
      { title: 'National Human Rights Strategy Seminar', date: 'October 8, 2025', time: 'Morning', location: 'Lecture Hall — Assiut National University', description: 'An educational seminar on "The National Human Rights Strategy and the Role of Universities in Promoting It", featuring the Director of the Human Rights Unit of Assiut Governorate.', image: 'https://www.asnu.edu.eg/main/sites/default/files/images/562360900_793301026819032_6272885471818016974_n.jpg', url: 'https://www.asnu.edu.eg/main/ar/node/45458' },
      { title: 'Student Activities Plan Meeting 2025/2026', date: 'October 8, 2025', time: 'Noon', location: 'Assiut National University HQ', description: 'A coordination meeting to discuss the student activities plan for the academic year 2025/2026, attended by the university president and student union.', image: 'https://www.asnu.edu.eg/main/sites/default/files/images/559274116_787856687363466_3994841194513755410_n.jpg', url: 'https://www.asnu.edu.eg/main/ar/node/45457' },
    ],
    achievements: [
      { title: '68 Advanced Scientific Labs at 180 Million EGP', description: 'The university completed Phase 2 of its scientific labs project with 68 advanced labs serving medical, engineering, and humanities sectors according to the latest international standards.', date: 'March 2026' },
      { title: '49 Students Enrolled via Excellence Scholarships', description: 'The university enrolled 49 students through excellence scholarships funded by the Ministry of Higher Education and the Central Bank of Egypt for the academic year 2025/2026.', date: 'October 2025' },
      { title: '5,700 Students & 507 Faculty Members', description: 'Assiut National University hosts 5,700 students and 507 faculty members across 7 colleges and 16 specialized academic programs.', date: '2025' },
      { title: 'Established by Presidential Decree No. 42 of 2022', description: 'Assiut National University was established as a non-profit university in New Assiut City, offering programs in Medicine, Engineering, Computer Science & AI, Pharmacy, Languages, and Financial Sciences.', date: '2022' },
    ],
    categories: [
      { title: 'University News',  count: '12' },
      { title: 'Student Events',   count: '8' },
      { title: 'Achievements',     count: '6' },
      { title: 'Medical Colleges', count: '5' },
    ],
  },
};

const newsItems = [
  { titleAr: "افتتاح المختبر المركزي الجديد للأبحاث العلمية", titleEn: "Opening of the New Central Research Lab", dateAr: "٥ فبراير ٢٠٢٦", dateEn: "Feb 5, 2026", categoryAr: "أخبار", categoryEn: "News", cat: "news", descAr: "افتتح رئيس الجامعة المختبر المركزي الجديد المجهز بأحدث الأجهزة والمعدات العلمية بتكلفة ٥٠ مليون جنيه.", descEn: "The university president inaugurated the new central lab equipped with the latest scientific instruments, costing 50 million EGP." },
  { titleAr: "بدء التسجيل للفصل الدراسي الثاني ٢٠٢٦", titleEn: "Spring 2026 Registration Opens", dateAr: "١ فبراير ٢٠٢٦", dateEn: "Feb 1, 2026", categoryAr: "تسجيل", categoryEn: "Registration", cat: "registration", descAr: "بدأ التسجيل الإلكتروني للفصل الدراسي الثاني من خلال البوابة الإلكترونية للطلاب.", descEn: "Online registration for the spring semester has started through the student portal." },
  { titleAr: "الجامعة تحصل على اعتماد دولي جديد من ABET", titleEn: "University Receives ABET Accreditation", dateAr: "٢٨ يناير ٢٠٢٦", dateEn: "Jan 28, 2026", categoryAr: "إنجازات", categoryEn: "Achievements", cat: "achievements", descAr: "حصلت كلية الحاسبات والمعلومات على اعتماد ABET الدولي لبرامج علوم الحاسب ونظم المعلومات.", descEn: "The Faculty of Computing received ABET accreditation for its CS and IS programs." },
  { titleAr: "مؤتمر دولي عن الذكاء الاصطناعي في التعليم", titleEn: "International AI in Education Conference", dateAr: "٢٠ يناير ٢٠٢٦", dateEn: "Jan 20, 2026", categoryAr: "فعاليات", categoryEn: "Events", cat: "events", descAr: "تستضيف الجامعة المؤتمر الدولي الثالث لتطبيقات الذكاء الاصطناعي في التعليم العالي.", descEn: "The university hosts the 3rd International Conference on AI Applications in Higher Education." },
  { titleAr: "توقيع اتفاقية شراكة مع جامعة أكسفورد", titleEn: "Partnership Agreement with Oxford University", dateAr: "١٥ يناير ٢٠٢٦", dateEn: "Jan 15, 2026", categoryAr: "شراكات", categoryEn: "Partnerships", cat: "news", descAr: "وقعت الجامعة اتفاقية تعاون أكاديمي وبحثي مع جامعة أكسفورد البريطانية.", descEn: "The university signed an academic and research cooperation agreement with Oxford University." },
  { titleAr: "نتائج الفصل الدراسي الأول متاحة الآن", titleEn: "Fall Semester Results Now Available", dateAr: "١٠ يناير ٢٠٢٦", dateEn: "Jan 10, 2026", categoryAr: "أكاديمي", categoryEn: "Academic", cat: "registration", descAr: "يمكن للطلاب الاطلاع على نتائج الفصل الدراسي الأول من خلال البوابة الإلكترونية.", descEn: "Students can view their Fall semester results through the student portal." },
];

const PageHero = ({ titleAr, titleEn, subtitleAr, subtitleEn, t }: any) => (
  <section className="bg-stone-900 py-20 mb-12">
    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-white sm:text-5xl">{t(titleAr, titleEn)}</h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{t(subtitleAr, subtitleEn)}</p>
    </div>
  </section>
);

export default function NewsPage() {
  const { locale } = useTranslations();
  const tx = i18n[locale as 'ar' | 'en'] ?? i18n.ar;
  
  const [activeTab, setActiveTab] = useState("all");
  
  const t = (ar: string, en: string) => locale === 'ar' ? ar : en;
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  const tabs = [
    { value: "all", label: t("الكل", "All") },
    { value: "news", label: t("أخبار", "News") },
    { value: "registration", label: t("تسجيل", "Registration") },
    { value: "events", label: t("فعاليات", "Events") },
    { value: "achievements", label: t("إنجازات", "Achievements") },
  ];

  return (
    <>
      <PageHero
        titleAr="الأخبار والفعاليات"
        titleEn="News & Events"
        subtitleAr="آخر المستجدات والأحداث في جامعة أسيوط الأهلية"
        subtitleEn="Latest updates and events at Assiut National University"
        t={t}
      />

      {/* New Tabs UI Section */}
      <section className="pb-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 flex w-fit flex-wrap justify-center gap-2 rounded-2xl bg-stone-100 p-1.5 shadow-sm">
            {tabs.map(tab => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
                  activeTab === tab.value 
                    ? 'bg-white text-[#FABA19] shadow-sm' 
                    : 'text-stone-500 hover:text-stone-700 hover:bg-stone-200/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {newsItems
              .filter((n) => activeTab === "all" || n.cat === activeTab)
              .map((item, i) => (
                <Card key={i} className="hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden border-0 shadow-sm bg-white group">
                  <div className="h-44 bg-gradient-to-br from-amber-100 to-amber-50 group-hover:opacity-90 transition-opacity" />
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="secondary" className="bg-amber-50 text-amber-700 hover:bg-amber-100 border-0 font-bold">
                        {t(item.categoryAr, item.categoryEn)}
                      </Badge>
                      <span className="flex items-center gap-1.5 text-xs text-stone-500 font-semibold">
                        <Clock className="h-3.5 w-3.5" />
                        {t(item.dateAr, item.dateEn)}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg leading-relaxed text-stone-800 mb-2 group-hover:text-[#FABA19] transition-colors">
                      {t(item.titleAr, item.titleEn)}
                    </h3>
                    <p className="text-sm font-medium leading-relaxed text-stone-500 line-clamp-2 mb-4">
                      {t(item.descAr, item.descEn)}
                    </p>
                    <Button variant="link" className="h-auto gap-1.5 p-0 text-[#FABA19] hover:text-[#e5a816] font-bold">
                      {t("اقرأ المزيد", "Read More")}
                      <Arrow className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Preserved Original Sections Styled to Match */}
      
      {/* Upcoming Events */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10 text-stone-800 text-center">{tx.upcomingEvents}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {tx.events.map((ev) => (
              <a key={ev.title} href={ev.url} target="_blank" rel="noopener noreferrer" className="block">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white group">
                  <div className="h-52 overflow-hidden relative">
                    <img src={ev.image} alt={ev.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/40 to-transparent" />
                    <div className="absolute bottom-4 start-5 end-5 flex flex-wrap gap-2 text-sm font-bold text-white">
                      <span className="flex items-center gap-1.5 bg-[#FABA19] px-3 py-1 rounded-full"><Calendar className="h-4 w-4" />{ev.date}</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-3 leading-snug text-stone-800 group-hover:text-[#FABA19] transition-colors">{ev.title}</h3>
                    <p className="text-sm font-medium mb-5 leading-relaxed text-stone-500 line-clamp-2">{ev.description}</p>
                    <div className="flex flex-col gap-2 text-sm font-semibold text-stone-500">
                      <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#FABA19]" />{ev.time}</span>
                      <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#FABA19]" />{ev.location}</span>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10 text-stone-800 text-center">{tx.achievementsTitle}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {tx.achievements.map((a) => (
              <Card key={a.title} className="hover:shadow-md transition-all duration-300 border-0 shadow-sm bg-stone-50">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4 text-stone-800">{a.title}</h3>
                  <p className="font-medium mb-6 leading-relaxed text-stone-500">{a.description}</p>
                  <Separator className="mb-4 bg-stone-200" />
                  <div className="flex items-center gap-2 text-sm font-semibold text-stone-500">
                    <Calendar className="h-4 w-4 text-[#FABA19]" />
                    <span><span className="font-bold text-stone-800">{tx.dateLabel}</span> {a.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10 text-stone-800">{tx.browseByCategory}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tx.categories.map((cat) => (
              <div key={cat.title}
                className="group relative overflow-hidden rounded-2xl border-0 bg-white hover:shadow-lg transition-all duration-300 cursor-pointer shadow-sm">
                <div className="h-1.5 w-full bg-[#FABA19]" />
                <div className="p-8 text-center">
                  <p className="text-6xl font-black mb-4 tabular-nums text-[#FABA19]">{cat.count}</p>
                  <h3 className="text-lg font-bold mb-2 text-stone-800">{cat.title}</h3>
                  <p className="text-sm font-semibold text-stone-500">{tx.newsCount}</p>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none bg-[#FABA19]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-stone-800">{tx.newsletter.title}</h2>
          <p className="text-lg font-medium mb-8 text-stone-500">{tx.newsletter.subtitle}</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder={tx.newsletter.placeholder}
              className="flex-1 rounded-xl focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-stone-50 border-stone-200 text-stone-800"
              style={{ direction: locale === 'en' ? 'ltr' : 'rtl' }}
            />
            <Button className="font-bold rounded-xl px-8 hover:opacity-90 transition-opacity bg-[#FABA19] text-white border-0">
              {tx.newsletter.button}
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-stone-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">{tx.cta.title}</h2>
          <p className="text-lg mb-8 font-medium text-white/80">{tx.cta.subtitle}</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button asChild size="lg" className="font-bold shadow-lg gap-2 bg-[#FABA19] text-white hover:bg-[#e5a816] border-0">
              <Link href="/contact">
                <Search className="h-5 w-5" />
                {tx.cta.contact}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-bold shadow-lg gap-2 border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white">
              <Link href="/">
                {tx.cta.home}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
