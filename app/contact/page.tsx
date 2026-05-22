'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from '@/lib/useTranslations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube
} from "lucide-react";

const i18n = {
  ar: {
    map: { title: 'موقع الكلية', location: 'أسيوط، مصر', viewMap: 'عرض على الخريطة' },
    quickContact: {
      title: 'تواصل سريع',
      items: [
        { label: 'اتصل بنا', value: '088-2411111',    href: 'tel:+20882411111' },
        { label: 'راسلنا',   value: 'info@aun.edu.eg', href: 'mailto:info@aun.edu.eg' },
      ],
    },
    departmentsTitle: 'تواصل مع الأقسام',
    departments: [
      { code: 'CS', name: 'قسم علوم الحاسب',       email: 'cs@aun.edu.eg', phone: '088-2411112' },
      { code: 'IS', name: 'قسم نظم المعلومات',     email: 'is@aun.edu.eg', phone: '088-2411113' },
      { code: 'SE', name: 'قسم هندسة البرمجيات',   email: 'se@aun.edu.eg', phone: '088-2411114' },
      { code: 'AI', name: 'قسم الذكاء الاصطناعي',  email: 'ai@aun.edu.eg', phone: '088-2411115' },
    ],
    socialTitle: 'تابعنا على وسائل التواصل',
    socialSubtitle: 'ابقَ على اطلاع بآخر الأخبار والفعاليات',
    socials: ['Facebook', 'Twitter/X', 'Instagram', 'LinkedIn', 'YouTube'],
    cta: {
      title: 'هل لديك استفسار؟',
      subtitle: 'نحن هنا لمساعدتك - تواصل معنا في أي وقت',
      helpCenter: 'مركز المساعدة',
      login: 'تسجيل الدخول',
    },
  },
  en: {
    map: { title: 'Faculty Location', location: 'Assiut, Egypt', viewMap: 'View on Map' },
    quickContact: {
      title: 'Quick Contact',
      items: [
        { label: 'Call Us',  value: '088-2411111',    href: 'tel:+20882411111' },
        { label: 'Email Us', value: 'info@aun.edu.eg', href: 'mailto:info@aun.edu.eg' },
      ],
    },
    departmentsTitle: 'Contact Departments',
    departments: [
      { code: 'CS', name: 'Computer Science Dept.',        email: 'cs@aun.edu.eg', phone: '088-2411112' },
      { code: 'IS', name: 'Information Systems Dept.',     email: 'is@aun.edu.eg', phone: '088-2411113' },
      { code: 'SE', name: 'Software Engineering Dept.',    email: 'se@aun.edu.eg', phone: '088-2411114' },
      { code: 'AI', name: 'Artificial Intelligence Dept.', email: 'ai@aun.edu.eg', phone: '088-2411115' },
    ],
    socialTitle: 'Follow Us on Social Media',
    socialSubtitle: 'Stay updated with the latest news and events',
    socials: ['Facebook', 'Twitter/X', 'Instagram', 'LinkedIn', 'YouTube'],
    cta: {
      title: 'Have a Question?',
      subtitle: 'We are here to help you - contact us at any time',
      helpCenter: 'Help Center',
      login: 'Login',
    },
  },
} as const;

// Inline Component for PageHero
const PageHero = ({ titleAr, titleEn, subtitleAr, subtitleEn, t }: any) => (
  <section className="bg-stone-900 py-20 mb-12">
    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-white sm:text-5xl">{t(titleAr, titleEn)}</h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{t(subtitleAr, subtitleEn)}</p>
    </div>
  </section>
);

export default function ContactPage() {
  const { locale } = useTranslations();
  const tx = i18n[locale as 'ar' | 'en'] ?? i18n.ar;
  
  // Custom translation helper for inline usage
  const t = (ar: string, en: string) => locale === 'ar' ? ar : en;

  return (
    <>
      <PageHero
        titleAr="تواصل معنا"
        titleEn="Contact Us"
        subtitleAr="نحن هنا لمساعدتك. لا تتردد في التواصل معنا"
        subtitleEn="We're here to help. Don't hesitate to reach out"
        t={t}
      />

      <section className="pb-16 bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact Info */}
            <div className="space-y-4">
              {[
                {
                  icon: Phone,
                  titleAr: "الهاتف",
                  titleEn: "Phone",
                  valueAr: "+٢٠ ١٢٣ ٤٥٦ ٧٨٩٠",
                  valueEn: "+20 123 456 7890",
                },
                {
                  icon: Mail,
                  titleAr: "البريد الإلكتروني",
                  titleEn: "Email",
                  valueAr: "info@aun.edu.eg",
                  valueEn: "info@aun.edu.eg",
                },
                {
                  icon: MapPin,
                  titleAr: "العنوان",
                  titleEn: "Address",
                  valueAr: "شارع الجامعة، المعادي، القاهرة، مصر",
                  valueEn: "University St., Maadi, Cairo, Egypt",
                },
                {
                  icon: Clock,
                  titleAr: "ساعات العمل",
                  titleEn: "Working Hours",
                  valueAr: "الأحد - الخميس: ٨ ص - ٤ م",
                  valueEn: "Sun - Thu: 8 AM - 4 PM",
                },
              ].map((info) => (
                <Card key={info.titleEn} className="border-0 shadow-sm bg-white">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                      <info.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-stone-800">
                        {t(info.titleAr, info.titleEn)}
                      </h3>
                      <p className="mt-0.5 text-sm text-stone-500">
                        {t(info.valueAr, info.valueEn)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <Card className="border-0 shadow-sm lg:col-span-2 bg-white">
              <CardContent className="p-6 sm:p-8">
                <h2 className="mb-6 text-xl font-bold text-stone-800">
                  {t("أرسل لنا رسالة", "Send Us a Message")}
                </h2>
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-stone-800">
                        {t("الاسم الكامل", "Full Name")}
                      </label>
                      <Input
                        id="name"
                        placeholder={t("أدخل اسمك", "Enter your name")}
                        className="bg-stone-50 border-stone-200 text-stone-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-stone-800">
                        {t("البريد الإلكتروني", "Email")}
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t("أدخل بريدك الإلكتروني", "Enter your email")}
                        className="bg-stone-50 border-stone-200 text-stone-800"
                        style={{ direction: 'ltr' }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-stone-800">
                      {t("الموضوع", "Subject")}
                    </label>
                    <Input
                      id="subject"
                      placeholder={t("موضوع الرسالة", "Message subject")}
                      className="bg-stone-50 border-stone-200 text-stone-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-stone-800">
                      {t("الرسالة", "Message")}
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="flex min-h-[80px] w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm ring-offset-white placeholder:text-stone-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-stone-800"
                      placeholder={t("اكتب رسالتك هنا...", "Write your message here...")}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="gap-2 bg-[#FABA19] text-white hover:bg-[#e5a816] border-0"
                  >
                    <Send className="h-4 w-4" />
                    {t("إرسال", "Send")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Map and Quick Contact Preserved Elements */}
          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            <Card className="border-0 shadow-sm lg:col-span-2 bg-white overflow-hidden">
              <div className="h-[260px] flex items-center justify-center bg-stone-100 p-8">
                <div className="text-center">
                  <div className="text-5xl font-black tabular-nums mb-3 text-stone-300">
                    MAP
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-stone-800">{tx.map.title}</h3>
                  <p className="font-medium mb-4 text-sm text-stone-500">{tx.map.location}</p>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                    className="inline-block px-6 py-2 rounded-xl font-bold text-sm bg-[#FABA19] text-white hover:opacity-90 transition-opacity">
                    {tx.map.viewMap}
                  </a>
                </div>
              </div>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-5 text-stone-800">{tx.quickContact.title}</h3>
                <div className="space-y-4">
                  {tx.quickContact.items.map((qc) => (
                    <div key={qc.label} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full shrink-0 bg-[#FABA19]" />
                      <div>
                        <p className="text-xs font-semibold text-stone-500">{qc.label}</p>
                        <a href={qc.href} className="font-bold text-sm text-stone-800 hover:text-[#FABA19] transition-colors">{qc.value}</a>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-stone-800">{tx.departmentsTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {tx.departments.map((dept) => (
              <Card key={dept.code} className="border-0 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md bg-stone-50">
                <CardContent className="p-6">
                  <span className="inline-block font-bold text-xs px-3 py-1.5 rounded-full tracking-widest mb-3 bg-[#FABA19] text-white"
                    style={{ letterSpacing: '0.12em' }}>
                    {dept.code}
                  </span>
                  <h3 className="text-sm font-bold mb-4 text-stone-800">{dept.name}</h3>
                  <Separator className="mb-4 bg-stone-200" />
                  <div className="space-y-2 text-xs font-semibold text-stone-500">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#FABA19]" />
                      <a href={`mailto:${dept.email}`} className="hover:text-[#FABA19] transition-colors">{dept.email}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#FABA19]" />
                      <a href={`tel:${dept.phone}`} className="hover:text-[#FABA19] transition-colors" style={{ direction: 'ltr' }}>{dept.phone}</a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Socials */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-stone-800">{tx.socialTitle}</h2>
          <p className="text-lg font-medium mb-8 text-stone-500">{tx.socialSubtitle}</p>
          <div className="flex justify-center gap-3 flex-wrap">
            {tx.socials.map((name) => (
              <a key={name} href="#" target="_blank" rel="noopener noreferrer" aria-label={name}
                className="px-5 py-2.5 rounded-xl font-bold text-sm bg-white text-stone-800 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:text-[#FABA19]">
                {name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-stone-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">{tx.cta.title}</h2>
          <p className="text-lg mb-8 font-medium text-white/80">{tx.cta.subtitle}</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button asChild size="lg" className="font-bold shadow-lg bg-[#FABA19] text-white hover:bg-[#e5a816] border-0">
              <Link href="/help">{tx.cta.helpCenter}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-bold shadow-lg border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white">
              <Link href="/login">{tx.cta.login}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

