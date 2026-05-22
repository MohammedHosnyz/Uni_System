'use client';



import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { theme, darkTheme } from '@/lib/theme';

function MaterialIcon({ name, className = '', style }: { name: string; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={`material-symbols-outlined leading-none ${className}`} style={style} aria-hidden="true">
      {name}
    </span>
  );
}

export default function PrivacyPage() {
  const { t } = useTranslations();
  const { dark } = useDarkMode();

  const t2     = dark ? darkTheme : theme;
  const bg1    = dark ? darkTheme.background : theme.background;
  const bg2    = dark ? darkTheme.surface    : theme.surface;
  const card   = dark ? darkTheme.surface    : theme.white;
  const bdr    = dark ? darkTheme.border     : theme.border;
  const bdrL   = dark ? darkTheme.borderLight : theme.border;
  const iconBg = dark ? darkTheme.surfaceAlt : theme.surface;
  const heroBg   = dark ? darkTheme.surface : theme.primary;
  const heroText = dark ? darkTheme.text    : theme.text;

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300" style={{ background: bg1 }} dir="rtl">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,600,0,0" /><main className="flex-grow">
        
        <section className="py-16" style={{ background: heroBg }}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-5 border"
                style={{ background: iconBg, borderColor: bdrL }}>
                <MaterialIcon name="privacy_tip" className="text-[34px]" style={{ color: t2.primary }} />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: heroText }}>{t.privacy.title}</h1>
              <p className="text-xl font-semibold" style={{ color: heroText, opacity: 0.85 }}>{t.privacy.subtitle}</p>
            </div>
          </div>
        </section>

        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto rounded-2xl p-8 md:p-12 border"
              style={{ background: card, borderColor: bdr }}>
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4 font-semibold" style={{ color: t2.textMuted }}>
                  <MaterialIcon name="event" className="text-[18px]" style={{ color: t2.primary }} />
                  <p>
                    {t.privacy.lastUpdated}{' '}
                    <span className="font-extrabold" style={{ color: t2.text }}>يناير 2026</span>
                  </p>
                </div>
                <p className="leading-relaxed text-lg font-medium" style={{ color: t2.textMuted }}>{t.privacy.intro}</p>
              </div>

              <div className="space-y-8">
                {[
                  { num: 1, title: t.privacy.sections.collection.title,  icon: 'database',        items: t.privacy.sections.collection.items,  content: t.privacy.sections.collection.content },
                  { num: 2, title: t.privacy.sections.usage.title,       icon: 'rule',            items: t.privacy.sections.usage.items,       content: null },
                  { num: 3, title: t.privacy.sections.protection.title,  icon: 'shield',          items: t.privacy.sections.protection.items,  content: null },
                  { num: 4, title: t.privacy.sections.rights.title,      icon: 'manage_accounts', items: t.privacy.sections.rights.items,      content: null },
                ].map((sec) => (
                  <div key={sec.num} className="rounded-2xl border p-6 hover:shadow-md transition-all"
                    style={{ background: bg2, borderColor: bdr }}>
                    <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center border"
                          style={{ background: iconBg, borderColor: bdrL }}>
                          <MaterialIcon name={sec.icon} className="text-[22px]" style={{ color: t2.primary }} />
                        </div>
                        <h2 className="text-xl md:text-2xl font-extrabold" style={{ color: t2.text }}>
                          {sec.num}. {sec.title}
                        </h2>
                      </div>
                      <div className="text-xs font-extrabold rounded-full px-3 py-1 border"
                        style={{ background: iconBg, borderColor: bdrL, color: t2.textMuted }}>
                        قسم {sec.num}
                      </div>
                    </div>
                    <div className="text-[15px] leading-relaxed">
                      {sec.content && (
                        <p className="mb-3 font-medium" style={{ color: t2.textMuted }}>{sec.content}</p>
                      )}
                      <ul className="list-disc list-inside space-y-2 font-medium" style={{ color: t2.textMuted }}>
                        {sec.items.map((item: string, i: number) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              
              <div className="mt-12 p-6 rounded-2xl border-r-4 flex gap-3"
                style={{ background: bg2, borderRightColor: t2.primary, borderColor: bdr }}>
                <MaterialIcon name="info" className="text-[22px] mt-0.5" style={{ color: t2.primary }} />
                <p className="font-medium leading-relaxed" style={{ color: t2.textMuted }}>
                  <strong className="font-extrabold" style={{ color: t2.text }}>{t.common.note}:</strong>{' '}
                  {t.terms.contactNote}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main></div>
  );
}
