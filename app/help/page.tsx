'use client';

import Link from 'next/link';
import { Cairo } from 'next/font/google';
import { useMemo, useState, useRef } from 'react';


import { useTranslations } from '@/lib/useTranslations';
import { useDarkMode } from '@/hooks/useDarkMode';
import { theme, darkTheme } from '@/lib/theme';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const cairo = Cairo({ subsets: ['arabic'], weight: ['400', '600', '700'] });


const i18n = {
  ar: {
    hero: { title: 'مركز المساعدة', subtitle: 'نحن هنا لمساعدتك — ابحث عن إجابات لأسئلتك أو تواصل معنا مباشرة' },
    searchPlaceholder: 'ابحث عن سؤالك هنا...',
    searchResultPrefix: 'نتائج البحث عن:',
    suggestions: ['تسجيل المقررات', 'الرسوم الدراسية', 'المعدل التراكمي', 'التخصص الفرعي', 'كلمة المرور', 'التحويل', 'التخرج', 'الجدول'],
    quickTitle: 'مساعدة سريعة',
    quick: [
      { title: 'للطلاب',       description: 'تسجيل المقررات، الدرجات، الجداول',    link: '/help' },
      { title: 'للأساتذة',     description: 'إدارة المقررات، رصد الدرجات',         link: '/help' },
      { title: 'المدفوعات',    description: 'الرسوم الدراسية، طرق الدفع',          link: '/help' },
      { title: 'الدعم الفني',  description: 'مشاكل تقنية، استعادة كلمة المرور',   link: '/help' },
    ],
    faqTitle: 'الأسئلة الشائعة',
    faqHint: 'ابحث بالأعلى لفلترة الأسئلة',
    noResults: 'لا توجد نتائج',
    noResultsHint: 'جرّب كلمات بحث مختلفة أو تواصل معنا.',
    showMore: 'إظهار المزيد',
    showingOf: (shown: number, total: number) => `عرض ${shown} من ${total} سؤال`,
    faq: [
      { title: 'التسجيل والقبول', questions: [
          { q: 'كيف يمكنني التقديم للالتحاق بالكلية؟', a: 'يتم التقديم من خلال مكتب التنسيق الإلكتروني في المواعيد المحددة سنوياً. يجب أن تكون حاصلاً على الثانوية العامة شعبة رياضيات.' },
          { q: 'ما هي المستندات المطلوبة للتسجيل؟', a: 'شهادة الثانوية الأصلية، شهادة الميلاد، بطاقة الرقم القومي، 6 صور شخصية، وشهادة طبية.' },
          { q: 'هل يمكن التحويل من كلية أخرى؟', a: 'نعم، يمكن التحويل وفقاً للقواعد المنظمة للتحويل بين الكليات والجامعات المصرية.' },
          { q: 'ما هو الحد الأدنى لدرجة الثانوية للقبول؟', a: 'يتحدد الحد الأدنى سنوياً بناءً على نتائج التنسيق، وعادةً لا يقل عن 75% لشعبة الرياضيات.' },
          { q: 'هل يوجد اختبار قبول للكلية؟', a: 'لا يوجد اختبار قبول منفصل، يعتمد القبول على نتيجة الثانوية العامة ونتائج التنسيق.' },
          { q: 'ما هي مواعيد التسجيل للفصل الدراسي الجديد؟', a: 'تُعلن مواعيد التسجيل في بداية كل فصل دراسي عبر الموقع الرسمي للكلية والبوابة الإلكترونية.' },
          { q: 'هل يمكن الالتحاق بالكلية كطالب منتسب؟', a: 'نعم، يتاح نظام الانتساب لبعض البرامج وفقاً للشروط المحددة من الكلية.' },
        ],
      },
      { title: 'الدراسة والمقررات', questions: [
          { q: 'كم عدد الساعات المعتمدة المطلوبة للتخرج؟', a: '144 ساعة معتمدة موزعة على 4 سنوات دراسية (8 فصول دراسية).' },
          { q: 'ما هو الحد الأدنى والأقصى للتسجيل في الفصل الواحد؟', a: 'الحد الأدنى 12 ساعة والحد الأقصى 18 ساعة، ويمكن زيادته إلى 21 ساعة بموافقة الكلية.' },
          { q: 'متى يمكنني اختيار التخصص الفرعي؟', a: 'يمكن اختيار التخصص الفرعي (Minor) بعد إتمام 72 ساعة معتمدة.' },
          { q: 'كيف يمكنني حذف أو إضافة مقرر بعد التسجيل؟', a: 'يمكن الحذف والإضافة خلال الأسبوعين الأولين من الفصل الدراسي عبر البوابة الإلكترونية أو مكتب شؤون الطلاب.' },
          { q: 'ما هي البرامج الدراسية المتاحة في الكلية؟', a: 'تقدم الكلية ثلاثة برامج: علوم الحاسب، هندسة البرمجيات، والذكاء الاصطناعي.' },
          { q: 'هل يمكنني التسجيل في مقررات من برنامج آخر؟', a: 'نعم، يمكن التسجيل في مقررات اختيارية من برامج أخرى بموافقة المرشد الأكاديمي.' },
          { q: 'ما هو نظام الساعات المعتمدة؟', a: 'يعتمد النظام على تسجيل عدد محدد من الساعات كل فصل، وكل مقرر له عدد ساعات معتمدة يعكس عبء العمل الأسبوعي.' },
          { q: 'هل يوجد مقررات إلزامية لجميع الطلاب؟', a: 'نعم، هناك متطلبات إجبارية مشتركة لجميع الطلاب بالإضافة إلى متطلبات التخصص.' },
        ],
      },
      { title: 'الدرجات والتقييم', questions: [
          { q: 'كيف يتم حساب المعدل التراكمي (GPA)؟', a: 'يتم حساب GPA من 4.0 بناءً على الدرجات والساعات المعتمدة لكل مقرر.' },
          { q: 'ما هو الحد الأدنى للمعدل التراكمي للتخرج؟', a: 'الحد الأدنى للمعدل التراكمي للتخرج هو 2.0 من 4.0.' },
          { q: 'كيف يتم توزيع الدرجات؟', a: '50% أعمال سنة (25% امتحان نصفي + 25% أعمال) و 50% امتحان نهائي.' },
          { q: 'ماذا يحدث إذا رسبت في مقرر؟', a: 'يمكنك إعادة المقرر في الفصل التالي، وتُحتسب الدرجة الأعلى في المعدل التراكمي.' },
          { q: 'كيف يمكنني الاعتراض على درجة؟', a: 'يمكن تقديم طلب مراجعة الدرجة خلال أسبوعين من إعلان النتائج عبر مكتب شؤون الطلاب.' },
          { q: 'ما هو نظام التقدير الحرفي؟', a: 'A+ (4.0)، A (4.0)، A- (3.7)، B+ (3.3)، B (3.0)، B- (2.7)، C+ (2.3)، C (2.0)، D (1.0)، F (0.0).' },
          { q: 'هل يمكنني الانسحاب من مقرر بعد بدء الفصل؟', a: 'نعم، يمكن الانسحاب حتى الأسبوع العاشر مع الحصول على درجة W (انسحاب) دون تأثير على المعدل.' },
        ],
      },
      { title: 'المدفوعات والرسوم', questions: [
          { q: 'كم تبلغ الرسوم الدراسية؟', a: 'رسوم التسجيل 3500 جنيه (مرة واحدة)، والرسوم الفصلية 32,000 جنيه لكل فصل دراسي.' },
          { q: 'ما هي طرق الدفع المتاحة؟', a: 'يمكن الدفع نقداً، بالبطاقة البنكية، أو عن طريق التحويل البنكي.' },
          { q: 'هل توجد منح دراسية؟', a: 'نعم، تقدم الجامعة منح دراسية للطلاب المتفوقين وفقاً لشروط محددة.' },
          { q: 'ما هو الموعد النهائي لسداد الرسوم؟', a: 'يجب سداد الرسوم قبل نهاية الأسبوع الثاني من بداية الفصل الدراسي لتجنب الغرامات.' },
          { q: 'هل يمكن تقسيط الرسوم الدراسية؟', a: 'نعم، يتاح نظام التقسيط على دفعتين بموافقة إدارة الكلية وبشروط محددة.' },
          { q: 'ما هي رسوم الخدمات الطلابية؟', a: 'رسوم الخدمات الطلابية 500 جنيه سنوياً وتشمل الأنشطة والخدمات الصحية.' },
          { q: 'كيف أحصل على إيصال الدفع؟', a: 'يُصدر إيصال إلكتروني فور إتمام الدفع ويمكن تحميله من البوابة الإلكترونية.' },
        ],
      },
      { title: 'الجدول الدراسي والحضور', questions: [
          { q: 'كيف يمكنني الاطلاع على جدولي الدراسي؟', a: 'يمكن الاطلاع على الجدول الدراسي من خلال البوابة الإلكترونية للطلاب بعد إتمام التسجيل.' },
          { q: 'ما هي نسبة الحضور المطلوبة؟', a: 'يجب ألا تتجاوز نسبة الغياب 25% من إجمالي المحاضرات، وإلا يُحرم الطالب من دخول الامتحان.' },
          { q: 'كيف يمكنني تبرير غيابي؟', a: 'يجب تقديم عذر رسمي (طبي أو غيره) خلال أسبوع من تاريخ الغياب لمكتب شؤون الطلاب.' },
          { q: 'هل يمكن تغيير موعد المحاضرة؟', a: 'لا يمكن تغيير مواعيد المحاضرات بشكل فردي، لكن يمكن التواصل مع الدكتور لترتيب بديل في حالات استثنائية.' },
          { q: 'متى تبدأ وتنتهي الفصول الدراسية؟', a: 'الفصل الأول: سبتمبر - يناير. الفصل الثاني: فبراير - يونيو. مع فترة امتحانات في نهاية كل فصل.' },
        ],
      },
      { title: 'التخرج والشهادات', questions: [
          { q: 'ما هي متطلبات التخرج؟', a: 'إتمام 144 ساعة معتمدة بمعدل تراكمي لا يقل عن 2.0، وإنجاز مشروع التخرج بنجاح.' },
          { q: 'كيف يمكنني التقديم لمشروع التخرج؟', a: 'يتم التقديم في بداية الفصل الأخير من الدراسة عبر نموذج رسمي مع اختيار المشرف والموضوع.' },
          { q: 'متى يمكنني الحصول على شهادة التخرج؟', a: 'تُصدر الشهادة الرسمية بعد 3-6 أشهر من إعلان النتائج النهائية، ويمكن الحصول على شهادة مؤقتة فوراً.' },
          { q: 'هل يمكنني التخرج مبكراً؟', a: 'نعم، إذا أتممت جميع المتطلبات قبل الموعد المحدد يمكنك التقدم للتخرج المبكر بموافقة الكلية.' },
          { q: 'كيف أحصل على كشف الدرجات الرسمي؟', a: 'يمكن طلب كشف الدرجات الرسمي من مكتب شؤون الطلاب مقابل رسوم رمزية خلال 3-5 أيام عمل.' },
        ],
      },
      { title: 'الدعم الفني والحساب', questions: [
          { q: 'نسيت كلمة المرور، كيف أستعيدها؟', a: 'اضغط على "نسيت كلمة المرور" في صفحة تسجيل الدخول وأدخل بريدك الإلكتروني لاستلام رابط الاستعادة.' },
          { q: 'كيف يمكنني تغيير بريدي الإلكتروني؟', a: 'يمكن تغيير البريد الإلكتروني من إعدادات الحساب في البوابة الإلكترونية أو بالتواصل مع الدعم الفني.' },
          { q: 'لا أستطيع تسجيل الدخول، ماذا أفعل؟', a: 'تأكد من صحة البريد الإلكتروني وكلمة المرور، وإذا استمرت المشكلة تواصل مع الدعم الفني على support@aun.edu.eg.' },
          { q: 'هل البوابة الإلكترونية متاحة على الهاتف؟', a: 'نعم، البوابة الإلكترونية متوافقة مع جميع الأجهزة والمتصفحات الحديثة.' },
          { q: 'كيف أبلغ عن مشكلة تقنية؟', a: 'يمكن الإبلاغ عن المشاكل التقنية عبر نموذج الدعم الفني في البوابة أو بالتواصل مع قسم تقنية المعلومات.' },
        ],
      },
    ],
    contactTitle: 'طرق التواصل',
    contactSubtitle: 'اختر الطريقة الأنسب للتواصل معنا',
    contacts: [
      { title: 'الهاتف',              info: '088-2411111',      desc: 'من السبت إلى الخميس 9 ص - 5 م' },
      { title: 'البريد الإلكتروني',   info: 'info@aun.edu.eg', desc: 'نرد خلال 24 ساعة' },
      { title: 'الدردشة المباشرة',    info: 'متاح الآن',        desc: 'تحدث مع فريق الدعم' },
      { title: 'زيارة الكلية',        info: 'أسيوط، مصر',      desc: 'مكتب شؤون الطلاب' },
    ],
    guidesTitle: 'أدلة إرشادية',
    guides: [
      { title: 'دليل الطالب الجديد',        description: 'كل ما تحتاج معرفته كطالب جديد في الكلية' },
      { title: 'كيفية تسجيل المقررات',      description: 'خطوات تسجيل المقررات والحذف والإضافة' },
      { title: 'استخدام النظام الإلكتروني', description: 'شرح مفصل لاستخدام نظام إدارة الكلية' },
      { title: 'نظام الامتحانات',           description: 'معلومات عن الامتحانات والجداول' },
      { title: 'متطلبات التخرج',            description: 'الشروط والمتطلبات للحصول على الدرجة' },
      { title: 'الأمان والخصوصية',          description: 'حماية حسابك ومعلوماتك الشخصية' },
    ],
    formTitle: 'أرسل استفسارك',
    formSubtitle: 'لم تجد إجابة لسؤالك؟ أرسل لنا استفسارك وسنرد عليك في أقرب وقت',
    form: {
      name: 'الاسم الكامل', namePh: 'أدخل اسمك',
      email: 'البريد الإلكتروني', emailPh: 'email@example.com',
      type: 'نوع الاستفسار', typePh: 'اختر نوع الاستفسار',
      types: ['القبول والتسجيل', 'الدراسة والمقررات', 'الدرجات والتقييم', 'المدفوعات', 'دعم فني', 'أخرى'],
      message: 'الرسالة', messagePh: 'اكتب استفسارك هنا...',
      submit: 'إرسال الاستفسار',
    },
    cta: { title: 'هل تحتاج مساعدة فورية؟', subtitle: 'فريق الدعم متاح للرد على استفساراتك', contact: 'تواصل معنا', login: 'تسجيل الدخول' },
  },
  en: {
    hero: { title: 'Help Center', subtitle: 'We are here to help you — search for answers or contact us directly' },
    searchPlaceholder: 'Search your question here...',
    searchResultPrefix: 'Search results for:',
    suggestions: ['Course Registration', 'Tuition Fees', 'GPA', 'Minor Specialization', 'Password', 'Transfer', 'Graduation', 'Schedule'],
    quickTitle: 'Quick Help',
    quick: [
      { title: 'For Students',      description: 'Course registration, grades, schedules', link: '/help' },
      { title: 'For Professors',    description: 'Course management, grade recording',     link: '/help' },
      { title: 'Payments',          description: 'Tuition fees, payment methods',          link: '/help' },
      { title: 'Technical Support', description: 'Technical issues, password recovery',    link: '/help' },
    ],
    faqTitle: 'Frequently Asked Questions',
    faqHint: 'Search above to filter questions',
    noResults: 'No results found',
    noResultsHint: 'Try different search terms or contact us.',
    showMore: 'Show More',
    showingOf: (shown: number, total: number) => `Showing ${shown} of ${total} questions`,
    faq: [
      { title: 'Registration & Admission', questions: [
          { q: 'How can I apply to join the faculty?', a: 'Applications are submitted through the electronic coordination office at the specified annual dates. You must have a high school diploma in the mathematics track.' },
          { q: 'What documents are required for registration?', a: 'Original high school certificate, birth certificate, national ID card, 6 personal photos, and a medical certificate.' },
          { q: 'Can I transfer from another faculty?', a: 'Yes, transfer is possible according to the rules governing transfer between Egyptian faculties and universities.' },
          { q: 'What is the minimum high school grade for admission?', a: 'The minimum is determined annually based on coordination results, usually not less than 75% for the mathematics track.' },
          { q: 'Is there an entrance exam?', a: 'No separate entrance exam. Admission is based on high school results and coordination outcomes.' },
          { q: 'When are registration dates for the new semester?', a: 'Registration dates are announced at the beginning of each semester via the official faculty website and student portal.' },
          { q: 'Can I enroll as a part-time student?', a: 'Yes, part-time enrollment is available for some programs according to specific faculty conditions.' },
        ],
      },
      { title: 'Studies & Courses', questions: [
          { q: 'How many credit hours are required for graduation?', a: '144 credit hours distributed over 4 academic years (8 semesters).' },
          { q: 'What is the minimum and maximum registration per semester?', a: 'Minimum 12 hours and maximum 18 hours, which can be increased to 21 hours with faculty approval.' },
          { q: 'When can I choose a minor specialization?', a: 'You can choose a minor specialization after completing 72 credit hours.' },
          { q: 'How can I drop or add a course after registration?', a: 'Drop/add is allowed during the first two weeks of the semester via the student portal or student affairs office.' },
          { q: 'What programs does the faculty offer?', a: 'The faculty offers three programs: Computer Science, Software Engineering, and Artificial Intelligence.' },
          { q: 'Can I register for courses from another program?', a: 'Yes, you can register for elective courses from other programs with your academic advisor\'s approval.' },
          { q: 'What is the credit hour system?', a: 'The system requires registering a set number of hours each semester; each course has credit hours reflecting the weekly workload.' },
          { q: 'Are there mandatory courses for all students?', a: 'Yes, there are common mandatory requirements for all students plus specialization requirements.' },
        ],
      },
      { title: 'Grades & Assessment', questions: [
          { q: 'How is the GPA calculated?', a: 'GPA is calculated out of 4.0 based on grades and credit hours for each course.' },
          { q: 'What is the minimum GPA required for graduation?', a: 'The minimum cumulative GPA for graduation is 2.0 out of 4.0.' },
          { q: 'How are grades distributed?', a: '50% coursework (25% midterm + 25% assignments) and 50% final exam.' },
          { q: 'What happens if I fail a course?', a: 'You can retake the course the following semester, and the higher grade will count toward your GPA.' },
          { q: 'How can I appeal a grade?', a: 'You can submit a grade review request within two weeks of results announcement through the student affairs office.' },
          { q: 'What is the letter grade system?', a: 'A+ (4.0), A (4.0), A- (3.7), B+ (3.3), B (3.0), B- (2.7), C+ (2.3), C (2.0), D (1.0), F (0.0).' },
          { q: 'Can I withdraw from a course after the semester starts?', a: 'Yes, withdrawal is allowed until week 10 with a W grade (withdrawal) that does not affect your GPA.' },
        ],
      },
      { title: 'Payments & Fees', questions: [
          { q: 'How much are the tuition fees?', a: 'Registration fee is 3,500 EGP (one-time), and semester fees are 32,000 EGP per semester.' },
          { q: 'What payment methods are available?', a: 'Payment can be made in cash, by bank card, or via bank transfer.' },
          { q: 'Are there scholarships?', a: 'Yes, the university offers scholarships to outstanding students according to specific conditions.' },
          { q: 'What is the payment deadline?', a: 'Fees must be paid before the end of the second week of the semester to avoid late penalties.' },
          { q: 'Can I pay tuition in installments?', a: 'Yes, a two-installment plan is available with faculty administration approval under specific conditions.' },
          { q: 'What are student services fees?', a: 'Student services fees are 500 EGP annually, covering activities and health services.' },
          { q: 'How do I get a payment receipt?', a: 'An electronic receipt is issued immediately upon payment and can be downloaded from the student portal.' },
        ],
      },
      { title: 'Schedule & Attendance', questions: [
          { q: 'How can I view my class schedule?', a: 'You can view your schedule through the student portal after completing registration.' },
          { q: 'What is the required attendance rate?', a: 'Absence must not exceed 25% of total lectures; otherwise the student is barred from the exam.' },
          { q: 'How can I justify my absence?', a: 'Submit an official excuse (medical or otherwise) within one week of the absence date to the student affairs office.' },
          { q: 'Can lecture times be changed?', a: 'Lecture times cannot be changed individually, but you can contact the professor for exceptional arrangements.' },
          { q: 'When do semesters start and end?', a: 'Semester 1: September–January. Semester 2: February–June. With exam periods at the end of each semester.' },
        ],
      },
      { title: 'Graduation & Certificates', questions: [
          { q: 'What are the graduation requirements?', a: 'Complete 144 credit hours with a GPA of at least 2.0 and successfully complete the graduation project.' },
          { q: 'How do I apply for the graduation project?', a: 'Apply at the beginning of your final semester using an official form, selecting your supervisor and topic.' },
          { q: 'When can I receive my graduation certificate?', a: 'The official certificate is issued 3–6 months after final results; a temporary certificate is available immediately.' },
          { q: 'Can I graduate early?', a: 'Yes, if you complete all requirements ahead of schedule you can apply for early graduation with faculty approval.' },
          { q: 'How do I get an official transcript?', a: 'Request an official transcript from the student affairs office for a nominal fee, ready in 3–5 business days.' },
        ],
      },
      { title: 'Technical Support & Account', questions: [
          { q: 'I forgot my password, how do I recover it?', a: 'Click "Forgot Password" on the login page and enter your email to receive a recovery link.' },
          { q: 'How can I change my email address?', a: 'Change your email from account settings in the student portal or by contacting technical support.' },
          { q: 'I cannot log in, what should I do?', a: 'Verify your email and password are correct. If the problem persists, contact support at support@aun.edu.eg.' },
          { q: 'Is the student portal available on mobile?', a: 'Yes, the portal is compatible with all modern devices and browsers.' },
          { q: 'How do I report a technical issue?', a: 'Report technical issues via the support form in the portal or by contacting the IT department.' },
        ],
      },
    ],
    contactTitle: 'Contact Methods',
    contactSubtitle: 'Choose the most suitable way to contact us',
    contacts: [
      { title: 'Phone',          info: '088-2411111',      desc: 'Saturday to Thursday 9 AM - 5 PM' },
      { title: 'Email',          info: 'info@aun.edu.eg', desc: 'We reply within 24 hours' },
      { title: 'Live Chat',      info: 'Available Now',    desc: 'Talk to the support team' },
      { title: 'Visit Faculty',  info: 'Assiut, Egypt',   desc: 'Student Affairs Office' },
    ],
    guidesTitle: 'Guides',
    guides: [
      { title: 'New Student Guide',         description: 'Everything you need to know as a new student' },
      { title: 'Course Registration',       description: 'Steps for registering, dropping, and adding courses' },
      { title: 'Using the System',          description: 'Detailed guide for using the faculty management system' },
      { title: 'Exam System',               description: 'Information about exams and schedules' },
      { title: 'Graduation Requirements',   description: 'Conditions and requirements for obtaining the degree' },
      { title: 'Security & Privacy',        description: 'Protecting your account and personal information' },
    ],
    formTitle: 'Send Your Inquiry',
    formSubtitle: "Didn't find an answer? Send us your inquiry and we'll reply as soon as possible",
    form: {
      name: 'Full Name', namePh: 'Enter your name',
      email: 'Email', emailPh: 'email@example.com',
      type: 'Inquiry Type', typePh: 'Choose inquiry type',
      types: ['Admissions & Registration', 'Studies & Courses', 'Grades & Assessment', 'Payments', 'Technical Support', 'Other'],
      message: 'Message', messagePh: 'Write your inquiry here...',
      submit: 'Send Inquiry',
    },
    cta: { title: 'Need Immediate Help?', subtitle: 'The support team is available to answer your inquiries', contact: 'Contact Us', login: 'Login' },
  },
} as const;


export default function HelpPage() {
  const { locale } = useTranslations();
  const { dark } = useDarkMode();
  const tx = i18n[locale as 'ar' | 'en'] ?? i18n.ar;
  const dir = locale === 'en' ? 'ltr' : 'rtl';

  const t      = dark ? darkTheme : theme;
  const bg1    = dark ? darkTheme.background  : theme.background;
  const bg2    = dark ? darkTheme.surfaceAlt  : theme.surface;
  const card   = dark ? darkTheme.surface     : theme.white;
  const bdr    = dark ? darkTheme.border      : theme.border;
  const bdrL   = dark ? darkTheme.borderLight : theme.border;
  const heroBg   = dark ? darkTheme.surface   : theme.primary;
  const heroText = dark ? darkTheme.text      : theme.text;

  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);
  const faqRef = useRef<HTMLElement>(null);

  const handleSearch = (val: string) => {
    setSearchQuery(val);
    setVisibleCount(10);
    if (val.trim() && faqRef.current) {
      setTimeout(() => faqRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  };

  
  const flatQuestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const all = tx.faq.flatMap((cat) =>
      cat.questions
        .filter((item) => !q || item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q))
        .map((item) => ({ ...item, category: cat.title }))
    );
    return all;
  }, [tx.faq, searchQuery]);

  const visibleQuestions = flatQuestions.slice(0, visibleCount);
  const hasMore = visibleCount < flatQuestions.length;

  const inputStyle: React.CSSProperties = { background: dark ? darkTheme.surfaceAlt : theme.surface, borderColor: bdrL, color: t.text, direction: dir as 'ltr' | 'rtl' };

  return (
    <div className={`${cairo.className} min-h-screen flex flex-col transition-colors duration-300`}
      style={{ background: bg1 }} dir={dir}><section className="py-20 px-4" style={{ background: heroBg }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4" style={{ color: heroText }}>{tx.hero.title}</h1>
          <p className="text-xl max-w-3xl mx-auto font-semibold mb-10" style={{ color: heroText, opacity: 0.85 }}>{tx.hero.subtitle}</p>
          <div className="relative max-w-2xl mx-auto">
            <Input
              type="text"
              placeholder={tx.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="h-14 text-lg rounded-2xl focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              style={{ background: card, borderColor: bdr, color: t.text, direction: dir as 'ltr' | 'rtl' }} />
          </div>
          {!!searchQuery.trim() && (
            <p className="mt-4 text-sm font-semibold" style={{ color: heroText, opacity: 0.8 }}>
              {tx.searchResultPrefix} <span className="font-extrabold">{searchQuery}</span>
            </p>
          )}
          
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {tx.suggestions.map((s) => (
              <button
                key={s}
                onClick={() => handleSearch(s)}
                className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-all hover:scale-105"
                style={{
                  background: searchQuery === s ? t.primary : `${card}CC`,
                  color: searchQuery === s ? heroText : t.text,
                  borderColor: searchQuery === s ? t.primary : bdrL,
                }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16" style={{ background: bg2 }}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-12" style={{ color: t.text }}>{tx.quickTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {tx.quick.map((item, idx) => (
              <Link key={item.title} href={item.link}>
                <div className="rounded-2xl border overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer h-full"
                  style={{ background: card, borderColor: bdr }}>
                  <div className="h-1" style={{ background: t.primary }} />
                  <div className="p-6">
                    <div className="text-3xl font-black tabular-nums mb-3" style={{ color: t.primary }}>
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-base font-extrabold mb-1" style={{ color: t.text }}>{item.title}</h3>
                    <p className="text-sm font-semibold" style={{ color: t.textMuted }}>{item.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      
      <section ref={faqRef} className="py-16" style={{ background: bg1 }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <h2 className="text-4xl font-extrabold" style={{ color: t.text }}>{tx.faqTitle}</h2>
            <p className="text-sm font-semibold" style={{ color: t.textMuted }}>{tx.faqHint}</p>
          </div>

          {flatQuestions.length === 0 ? (
            <div className="rounded-2xl border p-12 text-center" style={{ background: card, borderColor: bdr }}>
              <h3 className="text-xl font-extrabold mb-2" style={{ color: t.text }}>{tx.noResults}</h3>
              <p className="font-semibold" style={{ color: t.textMuted }}>{tx.noResultsHint}</p>
            </div>
          ) : (
            <>
              <p className="text-sm font-semibold mb-6" style={{ color: t.textMuted }}>
                {tx.showingOf(Math.min(visibleCount, flatQuestions.length), flatQuestions.length)}
              </p>
              <div className="rounded-2xl border overflow-hidden" style={{ background: card, borderColor: bdr }}>
                {visibleQuestions.map((item, i) => (
                  <div key={i} style={{ borderBottom: i < visibleQuestions.length - 1 ? `1px solid ${bdr}` : 'none' }}>
                    <div className="p-6">
                      <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3"
                        style={{ background: dark ? `${t.primary}20` : theme.accent, color: t.primary, border: `1px solid ${bdr}` }}>
                        {item.category}
                      </span>
                      <p className="font-extrabold mb-3" style={{ color: t.text }}>{item.q}</p>
                      <Separator className="mb-3" style={{ background: bdr }} />
                      <p className="text-sm font-medium leading-relaxed" style={{ color: t.textMuted }}>{item.a}</p>
                    </div>
                  </div>
                ))}
              </div>

              {hasMore && (
                <div className="mt-8 text-center">
                  <Button
                    onClick={() => setVisibleCount((c) => c + 10)}
                    className="h-12 px-10 font-extrabold rounded-xl hover:opacity-90 transition-opacity"
                    style={{ background: t.primary, color: heroText, border: 'none' }}>
                    {tx.showMore}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      
      <section className="py-16" style={{ background: bg2 }}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-4" style={{ color: t.text }}>{tx.contactTitle}</h2>
          <p className="text-center text-lg font-semibold mb-12" style={{ color: t.textMuted }}>{tx.contactSubtitle}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {tx.contacts.map((c) => (
              <div key={c.title}
                className="rounded-2xl border overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: card, borderColor: bdr }}>
                <div className="h-1" style={{ background: t.primary }} />
                <div className="p-6 text-center">
                  <h3 className="text-base font-extrabold mb-1" style={{ color: t.text }}>{c.title}</h3>
                  <p className="font-extrabold mb-1" style={{ color: t.primary }}>{c.info}</p>
                  <p className="text-sm font-semibold" style={{ color: t.textMuted }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16" style={{ background: bg1 }}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold mb-12" style={{ color: t.text }}>{tx.guidesTitle}</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {tx.guides.map((g, idx) => (
              <div key={g.title}
                className="rounded-2xl border overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
                style={{ background: card, borderColor: bdr }}>
                <div className="h-1" style={{ background: t.primary }} />
                <div className="p-6">
                  <div className="text-3xl font-black tabular-nums mb-3" style={{ color: t.primary }}>
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-base font-extrabold mb-2" style={{ color: t.text }}>{g.title}</h3>
                  <p className="text-sm font-semibold" style={{ color: t.textMuted }}>{g.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16" style={{ background: bg2 }}>
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-4" style={{ color: t.text }}>{tx.formTitle}</h2>
          <p className="text-center font-semibold mb-10" style={{ color: t.textMuted }}>{tx.formSubtitle}</p>
          <div className="rounded-2xl border overflow-hidden" style={{ background: card, borderColor: bdr }}>
            <div className="h-1" style={{ background: t.primary }} />
            <div className="p-8">
              <form className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-extrabold mb-2" style={{ color: t.text }}>{tx.form.name}</label>
                    <Input type="text" placeholder={tx.form.namePh} className="h-11 rounded-xl focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0" style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-sm font-extrabold mb-2" style={{ color: t.text }}>{tx.form.email}</label>
                    <Input type="email" placeholder={tx.form.emailPh} className="h-11 rounded-xl focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0" style={{ ...inputStyle, direction: 'ltr' }} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-extrabold mb-2" style={{ color: t.text }}>{tx.form.type}</label>
                  <select className="w-full px-4 py-2.5 rounded-xl text-sm font-medium outline-none"
                    style={{ background: dark ? darkTheme.surfaceAlt : theme.surface, border: `1px solid ${bdrL}`, color: t.text }} defaultValue="">
                    <option value="" style={{ background: card, color: t.text }}>{tx.form.typePh}</option>
                    {tx.form.types.map((s, i) => <option key={i} style={{ background: card, color: t.text }}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-extrabold mb-2" style={{ color: t.text }}>{tx.form.message}</label>
                  <textarea rows={5} placeholder={tx.form.messagePh}
                    className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none resize-none"
                    style={{ background: dark ? darkTheme.surfaceAlt : theme.surface, border: `1px solid ${bdrL}`, color: t.text, direction: dir as 'ltr' | 'rtl' }} />
                </div>
                <Button type="submit" className="w-full h-12 font-extrabold rounded-xl hover:opacity-90 transition-opacity"
                  style={{ background: t.primary, color: heroText, border: 'none' }}>
                  {tx.form.submit}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16" style={{ background: heroBg }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-4" style={{ color: heroText }}>{tx.cta.title}</h2>
          <p className="text-xl mb-8 font-semibold" style={{ color: heroText, opacity: 0.85 }}>{tx.cta.subtitle}</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button asChild size="lg" className="font-extrabold shadow-lg"
              style={{ background: dark ? darkTheme.background : theme.text, color: dark ? darkTheme.primary : theme.white, border: 'none' }}>
              <Link href="/contact">{tx.cta.contact}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-extrabold shadow-lg border-2"
              style={{ background: dark ? `${darkTheme.surface}CC` : `${theme.white}F0`, color: heroText, borderColor: dark ? darkTheme.border : `${theme.white}80` }}>
              <Link href="/login">{tx.cta.login}</Link>
            </Button>
          </div>
        </div>
      </section></div>
  );
}
