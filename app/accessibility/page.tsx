'use client';




const MaterialIcon = ({
  name,
  className = '',
}: {
  name: string;
  className?: string;
}) => (
  <span className={`material-symbols-outlined leading-none ${className}`} aria-hidden="true">
    {name}
  </span>
);

export default function AccessibilityPage() {
  const features = [
    {
      icon: 'keyboard',
      title: 'التنقل بلوحة المفاتيح',
      description: 'يمكن التنقل في جميع عناصر الموقع باستخدام لوحة المفاتيح فقط',
    },
    {
      icon: 'zoom_in',
      title: 'تكبير النص',
      description: 'يدعم الموقع تكبير النص حتى 200% دون فقدان المحتوى',
    },
    {
      icon: 'contrast',
      title: 'تباين الألوان',
      description: 'تصميم بألوان عالية التباين لسهولة القراءة',
    },
    {
      icon: 'devices',
      title: 'التصميم المتجاوب',
      description: 'يعمل الموقع بكفاءة على جميع الأجهزة والشاشات',
    },
    {
      icon: 'record_voice_over',
      title: 'قارئات الشاشة',
      description: 'متوافق مع برامج قراءة الشاشة للمكفوفين',
    },
    {
      icon: 'translate',
      title: 'اللغة العربية',
      description: 'دعم كامل للغة العربية مع اتجاه RTL',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFAF6]" dir="rtl">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,700,0,0"
      /><main className="flex-grow">
        <section className="bg-gradient-to-r from-[#BB8E2C] via-[#D6AE45] to-[#FCCC03] text-[#121110] py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/35 border border-white/40 rounded-full px-5 py-2 mb-6">
                <MaterialIcon name="accessibility_new" className="text-[22px] text-[#121110]" />
                <span className="font-extrabold text-sm opacity-95">إمكانية الوصول</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">إمكانية الوصول</h1>
              <p className="text-xl opacity-90">نلتزم بجعل موقعنا متاحاً للجميع</p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-[#E8DFD3]">
                <h2 className="text-2xl font-extrabold text-[#121110] mb-4">التزامنا بإمكانية الوصول</h2>
                <p className="text-[#3A3937] leading-relaxed mb-4 font-medium">
                  تلتزم كلية الحاسبات والمعلومات - جامعة أسيوط الأهلية بضمان إمكانية الوصول الرقمي للأشخاص ذوي الإعاقة.
                  نعمل باستمرار على تحسين تجربة المستخدم للجميع وتطبيق معايير إمكانية الوصول ذات الصلة.
                </p>
                <p className="text-[#3A3937] leading-relaxed font-medium">
                  نسعى لجعل موقعنا متوافقاً مع إرشادات إمكانية الوصول إلى محتوى الويب (WCAG) 2.1 المستوى AA.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-[#E8DFD3]">
                <h2 className="text-2xl font-extrabold text-[#121110] mb-6">ميزات إمكانية الوصول</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex gap-4 rounded-2xl p-4 bg-[#F6F2E6] border border-[#E8DFD3] hover:shadow-md transition-all"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white border border-[#E8DFD3] flex items-center justify-center flex-shrink-0">
                        <MaterialIcon name={feature.icon} className="text-[28px] text-[#BB8E2C]" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-[#121110] mb-2">{feature.title}</h3>
                        <p className="text-[#3A3937] text-sm font-medium">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-[#E8DFD3]">
                <h2 className="text-2xl font-extrabold text-[#121110] mb-4">اختصارات لوحة المفاتيح</h2>
                <div className="space-y-3 text-[#3A3937]">
                  <ShortcutRow keyText="Tab" desc="الانتقال إلى العنصر التالي" />
                  <ShortcutRow keyText="Shift + Tab" desc="الانتقال إلى العنصر السابق" />
                  <ShortcutRow keyText="Enter" desc="تفعيل الرابط أو الزر" />
                  <ShortcutRow keyText="Esc" desc="إغلاق النوافذ المنبثقة" />
                  <ShortcutRow keyText="Ctrl + (+/-)" desc="تكبير/تصغير الصفحة" />
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-[#E8DFD3]">
                <h2 className="text-2xl font-extrabold text-[#121110] mb-4">إعدادات المتصفح</h2>
                <div className="space-y-4 text-[#3A3937]">
                  <div className="rounded-2xl p-4 bg-[#F6F2E6] border border-[#E8DFD3]">
                    <div className="flex items-center gap-2 mb-2">
                      <MaterialIcon name="zoom_in" className="text-[22px] text-[#BB8E2C]" />
                      <h3 className="font-extrabold text-[#121110]">تكبير الصفحة</h3>
                    </div>
                    <p className="text-sm font-medium">يمكنك تكبير محتوى الصفحة من خلال:</p>
                    <ul className="list-disc list-inside mr-4 mt-2 text-sm space-y-1 font-medium">
                      <li>الضغط على Ctrl و + (Windows) أو Cmd و + (Mac)</li>
                      <li>استخدام قائمة العرض في المتصفح</li>
                      <li>استخدام عجلة الماوس مع الضغط على Ctrl</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl p-4 bg-[#F6F2E6] border border-[#E8DFD3]">
                    <div className="flex items-center gap-2 mb-2">
                      <MaterialIcon name="format_size" className="text-[22px] text-[#BB8E2C]" />
                      <h3 className="font-extrabold text-[#121110]">تغيير حجم الخط</h3>
                    </div>
                    <p className="text-sm font-medium">يمكنك تغيير حجم الخط الافتراضي من إعدادات المتصفح</p>
                  </div>

                  <div className="rounded-2xl p-4 bg-[#F6F2E6] border border-[#E8DFD3]">
                    <div className="flex items-center gap-2 mb-2">
                      <MaterialIcon name="contrast" className="text-[22px] text-[#BB8E2C]" />
                      <h3 className="font-extrabold text-[#121110]">الوضع عالي التباين</h3>
                    </div>
                    <p className="text-sm font-medium">يمكنك تفعيل الوضع عالي التباين من إعدادات نظام التشغيل</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-[#E8DFD3]">
                <h2 className="text-2xl font-extrabold text-[#121110] mb-4">قارئات الشاشة المدعومة</h2>
                <p className="text-[#3A3937] mb-4 font-medium">تم اختبار الموقع مع قارئات الشاشة التالية:</p>
                <ul className="list-disc list-inside space-y-2 text-[#3A3937] mr-4 font-medium">
                  <li>NVDA (Windows)</li>
                  <li>JAWS (Windows)</li>
                  <li>VoiceOver (Mac/iOS)</li>
                  <li>TalkBack (Android)</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-[#E8DFD3]">
                <h2 className="text-2xl font-extrabold text-[#121110] mb-4">المشاكل المعروفة والحلول</h2>
                <div className="space-y-4 text-[#3A3937]">
                  <p className="font-medium">
                    نحن ندرك أن بعض أجزاء الموقع قد لا تكون متاحة بالكامل بعد. نعمل بنشاط على معالجة هذه المشاكل:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mr-4 font-medium">
                    <li>بعض ملفات PDF قد لا تكون متاحة بالكامل - نعمل على تحويلها</li>
                    <li>بعض الرسوم البيانية قد تحتاج إلى أوصاف نصية إضافية</li>
                    <li>بعض مقاطع الفيديو قد تحتاج إلى ترجمة نصية</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#BB8E2C] via-[#D6AE45] to-[#FCCC03] rounded-2xl shadow-lg p-8 text-[#121110] border border-[#D6AE45]/40">
                <h2 className="text-2xl font-extrabold mb-4 flex items-center justify-center gap-2">
                  <MaterialIcon name="mark_email_read" className="text-[26px] text-[#121110]" />
                  <span>ملاحظاتك مهمة</span>
                </h2>

                <p className="mb-6 opacity-90 font-medium leading-relaxed">
                  نرحب بملاحظاتك حول إمكانية الوصول إلى موقعنا. إذا واجهت أي صعوبات في الوصول إلى أي محتوى أو كان لديك
                  اقتراحات للتحسين، يرجى التواصل معنا:
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MaterialIcon name="mail" className="text-[22px] text-[#121110]" />
                    <p className="font-semibold">
                      البريد الإلكتروني: <span className="font-bold">accessibility@aun.edu.eg</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <MaterialIcon name="call" className="text-[22px] text-[#121110]" />
                    <p className="font-semibold">
                      الهاتف: <span className="font-bold">088-2411111</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <MaterialIcon name="location_on" className="text-[22px] text-[#121110]" />
                    <p className="font-semibold">
                      العنوان: <span className="font-bold">كلية الحاسبات والمعلومات - جامعة أسيوط الأهلية</span>
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-sm opacity-80 font-semibold">
                  سنبذل قصارى جهدنا للرد على استفساراتك في غضون 3-5 أيام عمل
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 mt-8 border border-[#E8DFD3]">
                <h2 className="text-2xl font-extrabold text-[#121110] mb-4">المعايير والإرشادات</h2>
                <div className="text-[#3A3937] space-y-3">
                  <p className="font-medium">نسعى للامتثال للمعايير التالية:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4 font-medium">
                    <li>إرشادات إمكانية الوصول إلى محتوى الويب (WCAG) 2.1 المستوى AA</li>
                    <li>معايير W3C لإمكانية الوصول</li>
                    <li>قانون الأمريكيين ذوي الإعاقة (ADA)</li>
                    <li>القسم 508 من قانون إعادة التأهيل</li>
                  </ul>
                  <p className="mt-4 text-sm font-semibold text-[#62615F]">آخر تقييم لإمكانية الوصول: يناير 2024</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main></div>
  );
}

function ShortcutRow({ keyText, desc }: { keyText: string; desc: string }) {
  return (
    <div className="flex justify-between items-center p-3 bg-[#F6F2E6] rounded-2xl border border-[#E8DFD3]">
      <span className="font-extrabold text-[#121110] bg-white border border-[#E8DFD3] px-3 py-1 rounded-xl">
        {keyText}
      </span>
      <span className="font-semibold text-[#3A3937]">{desc}</span>
    </div>
  );
}
