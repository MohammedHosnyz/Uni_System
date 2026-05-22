'use client';

import { Cairo } from 'next/font/google';


import { useTranslations } from '@/lib/useTranslations';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
});


function MaterialIcon({
  name,
  className = '',
}: {
  name: string;
  className?: string;
}) {
  return (
    <span
      className={`material-symbols-outlined leading-none ${className}`}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}

export default function TermsPage() {
  const { t } = useTranslations();

  return (
    <div className={`${cairo.className} min-h-screen flex flex-col bg-[#FBFAF6]`} dir="rtl">
      
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,600,0,0"
      /><main className="flex-grow">
        <section className="bg-gradient-to-r from-[#BB8E2C] via-[#D6AE45] to-[#FCCC03] text-[#121110] py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center mb-5">
                <MaterialIcon name="gavel" className="text-[34px] text-[#121110]" />
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {t.terms.title}
              </h1>
              <p className="text-xl opacity-90">{t.terms.subtitle}</p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-[#F6F2E6]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12 border border-[#E8DFD3]">
              <div className="mb-8">
                <p className="text-[#62615F] mb-4 flex items-center gap-2">
                  <MaterialIcon name="event" className="text-[18px] text-[#BB8E2C]" />
                  <span>{t.terms.lastUpdated} يناير 2024</span>
                </p>
                <p className="text-[#3A3937] leading-relaxed">
                  {t.terms.sections.introduction.content}
                </p>
              </div>

              <div className="space-y-8">
                
                <div>
                  <h2 className="text-2xl font-bold text-[#121110] mb-4 flex items-center gap-2">
                    <span className="inline-flex w-9 h-9 rounded-lg bg-[#F6F2E6] border border-[#E8DFD3] items-center justify-center">
                      <MaterialIcon name="rule" className="text-[20px] text-[#BB8E2C]" />
                    </span>
                    <span>1. {t.terms.sections.usage.title}</span>
                  </h2>
                  <ul className="space-y-2 text-[#3A3937]">
                    {t.terms.sections.usage.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <MaterialIcon name="check_circle" className="text-[18px] text-[#BB8E2C] mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                
                <div>
                  <h2 className="text-2xl font-bold text-[#121110] mb-4 flex items-center gap-2">
                    <span className="inline-flex w-9 h-9 rounded-lg bg-[#F6F2E6] border border-[#E8DFD3] items-center justify-center">
                      <MaterialIcon name="account_circle" className="text-[20px] text-[#BB8E2C]" />
                    </span>
                    <span>2. {t.terms.sections.account.title}</span>
                  </h2>
                  <ul className="space-y-2 text-[#3A3937]">
                    {t.terms.sections.account.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <MaterialIcon name="check_circle" className="text-[18px] text-[#BB8E2C] mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                
                <div>
                  <h2 className="text-2xl font-bold text-[#121110] mb-4 flex items-center gap-2">
                    <span className="inline-flex w-9 h-9 rounded-lg bg-[#F6F2E6] border border-[#E8DFD3] items-center justify-center">
                      <MaterialIcon name="privacy_tip" className="text-[20px] text-[#BB8E2C]" />
                    </span>
                    <span>3. {t.terms.sections.privacy.title}</span>
                  </h2>
                  <ul className="space-y-2 text-[#3A3937]">
                    {t.terms.sections.privacy.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <MaterialIcon name="check_circle" className="text-[18px] text-[#BB8E2C] mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                
                <div>
                  <h2 className="text-2xl font-bold text-[#121110] mb-4 flex items-center gap-2">
                    <span className="inline-flex w-9 h-9 rounded-lg bg-[#F6F2E6] border border-[#E8DFD3] items-center justify-center">
                      <MaterialIcon name="handshake" className="text-[20px] text-[#BB8E2C]" />
                    </span>
                    <span>4. {t.terms.sections.conduct.title}</span>
                  </h2>
                  <ul className="space-y-2 text-[#3A3937]">
                    {t.terms.sections.conduct.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <MaterialIcon name="check_circle" className="text-[18px] text-[#BB8E2C] mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                
                <div>
                  <h2 className="text-2xl font-bold text-[#121110] mb-4 flex items-center gap-2">
                    <span className="inline-flex w-9 h-9 rounded-lg bg-[#F6F2E6] border border-[#E8DFD3] items-center justify-center">
                      <MaterialIcon name="verified_user" className="text-[20px] text-[#BB8E2C]" />
                    </span>
                    <span>5. {t.terms.sections.liability.title}</span>
                  </h2>
                  <ul className="space-y-2 text-[#3A3937]">
                    {t.terms.sections.liability.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <MaterialIcon name="check_circle" className="text-[18px] text-[#BB8E2C] mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                
                <div>
                  <h2 className="text-2xl font-bold text-[#121110] mb-4 flex items-center gap-2">
                    <span className="inline-flex w-9 h-9 rounded-lg bg-[#F6F2E6] border border-[#E8DFD3] items-center justify-center">
                      <MaterialIcon name="update" className="text-[20px] text-[#BB8E2C]" />
                    </span>
                    <span>6. {t.terms.sections.changes.title}</span>
                  </h2>
                  <div className="text-[#3A3937]">
                    <p>{t.terms.sections.changes.content}</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-[#F6F2E6] rounded-lg border-r-4 border-[#BB8E2C]">
                <p className="text-[#3A3937] flex items-start gap-2">
                  <MaterialIcon name="info" className="text-[20px] text-[#BB8E2C] mt-0.5" />
                  <span>
                    <strong>{t.common.note}:</strong> {t.terms.contactNote}
                  </span>
                </p>
              </div>

              <div className="mt-8 text-center">
                <button className="px-8 py-3 bg-gradient-to-r from-[#BB8E2C] to-[#D6AE45] hover:from-[#D6AE45] hover:to-[#FCCC03] text-[#121110] font-bold rounded-lg transition-all inline-flex items-center justify-center gap-2">
                  <MaterialIcon name="check" className="text-[20px]" />
                  {t.terms.acceptButton}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main></div>
  );
}
