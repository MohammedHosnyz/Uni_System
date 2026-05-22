


export interface CourseSession {
  day: number; 
  time: string;
  courseCode: string;
  courseName: string;
  section: string;
  room: string;
  type: 'lecture' | 'lab' | 'tutorial';
  professor?: string;
  assistant?: string;
  department?: 'CS' | 'IS'; 
}


export const level1Schedule: CourseSession[] = [
  
  { day: 0, time: '08:00-09:00', courseCode: 'MATH101', courseName: 'رياضيات 1', section: 'A', room: 'C215', type: 'lecture', professor: 'أ.د. أيمن شحات محمد', assistant: 'د. إسراء جمال سعيد' },
  { day: 0, time: '09:00-10:00', courseCode: 'MATH101', courseName: 'رياضيات 1', section: 'B', room: 'C221', type: 'lecture', professor: 'د. سعيد عبد المحسن', assistant: 'د. محمد أحمد يوسف' },
  { day: 0, time: '10:00-11:00', courseCode: 'FUND101', courseName: 'أساسيات رياضية', section: 'A', room: 'C113', type: 'lecture', professor: 'أ.د. علي محمد صديق' },
  { day: 0, time: '11:00-12:00', courseCode: 'ENG101', courseName: 'لغة إنجليزية 1', section: 'A', room: 'C118', type: 'lecture', professor: 'د. شيرين عبد الغفار' },
  { day: 0, time: '12:00-01:00', courseCode: 'ENG101', courseName: 'لغة إنجليزية 1', section: 'B', room: 'C118', type: 'lecture', professor: 'د. شيرين عبد الغفار' },
  
  
  { day: 1, time: '08:00-09:00', courseCode: 'FUND101', courseName: 'أساسيات رياضية', section: 'A', room: 'C113', type: 'lecture', professor: 'د. باسم سمير' },
  { day: 1, time: '09:00-10:00', courseCode: 'PHYL101', courseName: 'معمل فيزياء', section: 'A', room: 'الدور الثاني - كلية العلوم', type: 'lab' },
  { day: 1, time: '10:00-11:00', courseCode: 'IT101', courseName: 'أساسيات تكنولوجيا المعلومات', section: 'A', room: 'معمل 3B', type: 'lab', assistant: 'م. يمنى محمد' },
  { day: 1, time: '11:00-12:00', courseCode: 'IT101', courseName: 'أساسيات تكنولوجيا المعلومات', section: 'B', room: 'معمل 2B', type: 'lab', assistant: 'م. محمود قطب' },
  { day: 1, time: '12:00-01:00', courseCode: 'IT101', courseName: 'أساسيات تكنولوجيا المعلومات', section: 'C', room: 'معمل 3C', type: 'lab', assistant: 'م. عبدالرحمن فرجلي' },
  { day: 1, time: '01:00-02:00', courseCode: 'IT101', courseName: 'أساسيات تكنولوجيا المعلومات', section: 'D', room: 'معمل 2C', type: 'lab', assistant: 'م. مريم عصام' },
  { day: 1, time: '02:00-03:00', courseCode: 'IT101', courseName: 'أساسيات تكنولوجيا المعلومات', section: 'E', room: 'معمل 4C', type: 'lab', assistant: 'م. مروان رضوان' },
  
  
  { day: 2, time: '08:00-09:00', courseCode: 'IT101', courseName: 'أساسيات تكنولوجيا المعلومات', section: 'A', room: 'قاعة 6', type: 'lecture', professor: 'د. علي حسين' },
  { day: 2, time: '09:00-10:00', courseCode: 'ETHICS101', courseName: 'أخلاقيات سلوكية (اختياري)', section: 'A', room: 'قاعة 7', type: 'lecture', professor: 'د. إيمان علي عبد المطلب' },
  { day: 2, time: '10:00-11:00', courseCode: 'DRAW101', courseName: 'رسم يدوي', section: 'A', room: 'C118', type: 'lecture', professor: 'أ.د. هالة صلاح الدين', assistant: 'د. هاني ثروت' },
  { day: 2, time: '11:00-12:00', courseCode: 'PHY101', courseName: 'فيزياء 1', section: 'A', room: 'C113', type: 'lecture', professor: 'د. ياسمين محمد يوسف' },
  { day: 2, time: '12:00-01:00', courseCode: 'PHY101', courseName: 'فيزياء 1', section: 'B', room: 'C113', type: 'lecture', professor: 'أ.د. محمد المختار' },
  
  
  { day: 3, time: '08:00-09:00', courseCode: 'ELEC101', courseName: 'إلكترونيات', section: 'A', room: 'C321', type: 'lecture', professor: 'د. حمد أبو زيد' },
  { day: 3, time: '09:00-10:00', courseCode: 'ELEC101', courseName: 'إلكترونيات', section: 'B', room: 'C030', type: 'tutorial', assistant: 'م. محمد حسين' },
  { day: 3, time: '10:00-11:00', courseCode: 'ELEC101', courseName: 'إلكترونيات', section: 'C', room: 'C113', type: 'tutorial', professor: 'د. أحمد عبد المالك' },
  { day: 3, time: '11:00-12:00', courseCode: 'THINK101', courseName: 'تفكير علمي', section: 'A', room: 'C215', type: 'lecture', professor: 'د. محمد فاروق حماد' },
  { day: 3, time: '12:00-01:00', courseCode: 'ISLAM101', courseName: 'ثقافة إسلامية', section: 'A', room: 'C030', type: 'lecture', professor: 'أ.د. معتمد', assistant: 'د. أحمد' },
  
  
  { day: 4, time: '08:00-09:00', courseCode: 'FUND101T', courseName: 'تمارين أساسيات رياضية', section: 'A', room: 'C201', type: 'tutorial', assistant: 'م. هيام محمد أحمد' },
  { day: 4, time: '09:00-10:00', courseCode: 'MATH101T', courseName: 'تمارين رياضيات 1', section: 'A', room: 'C101', type: 'tutorial', assistant: 'م. محمد أحمد بسيوني' },
  { day: 4, time: '10:00-11:00', courseCode: 'SOCIAL101', courseName: 'قضايا اجتماعية', section: 'A', room: 'C030', type: 'lecture', professor: 'أ.د. رجب محمد', assistant: 'أ.د. محمد عبد العليم' },
  { day: 4, time: '11:00-12:00', courseCode: 'FUND101T', courseName: 'تمارين أساسيات رياضية', section: 'B', room: 'C235', type: 'tutorial', assistant: 'م. سلمى محمود فهيم' },
  { day: 4, time: '12:00-01:00', courseCode: 'MATH101T', courseName: 'تمارين رياضيات 1', section: 'B', room: 'C101', type: 'tutorial', assistant: 'م. آلاء محمد عبدالرحيم' },
  { day: 4, time: '01:00-02:00', courseCode: 'ELEC101', courseName: 'إلكترونيات', section: 'D', room: 'C129', type: 'tutorial', assistant: 'م. صفاء صالح' },
];


export const level2Schedule: CourseSession[] = [
  
  { day: 0, time: '08:00-09:00', courseCode: 'CS218', courseName: 'برمجة متقدمة', section: 'A', room: 'C218', type: 'lecture', professor: 'د. أحمد محمد' },
  { day: 0, time: '09:00-10:00', courseCode: 'CS218', courseName: 'برمجة متقدمة', section: 'B', room: 'C218', type: 'lecture', professor: 'د. أحمد محمد' },
  { day: 0, time: '10:00-11:00', courseCode: 'CS221', courseName: 'هياكل البيانات', section: 'A', room: 'C221', type: 'lecture', professor: 'د. محمد علي' },
  { day: 0, time: '11:00-12:00', courseCode: 'CS218', courseName: 'برمجة متقدمة', section: 'C', room: 'C218', type: 'lecture', professor: 'د. فاطمة أحمد' },
  { day: 0, time: '12:00-01:00', courseCode: 'CS218', courseName: 'برمجة متقدمة', section: 'D', room: 'C218', type: 'lecture', professor: 'د. سارة محمود' },
  
  
  { day: 1, time: '08:00-09:00', courseCode: 'CS218L', courseName: 'معمل برمجة متقدمة', section: 'A', room: 'معمل 2B', type: 'lab', assistant: 'م. أحمد سعيد' },
  { day: 1, time: '09:00-10:00', courseCode: 'CS218L', courseName: 'معمل برمجة متقدمة', section: 'B', room: 'معمل 3B', type: 'lab', assistant: 'م. محمد حسن' },
  { day: 1, time: '10:00-11:00', courseCode: 'CS218L', courseName: 'معمل برمجة متقدمة', section: 'C', room: 'معمل 4B', type: 'lab', assistant: 'م. سارة أحمد' },
  { day: 1, time: '11:00-12:00', courseCode: 'CS218L', courseName: 'معمل برمجة متقدمة', section: 'D', room: 'معمل 2C', type: 'lab', assistant: 'م. فاطمة علي' },
  { day: 1, time: '12:00-01:00', courseCode: 'CS218L', courseName: 'معمل برمجة متقدمة', section: 'E', room: 'معمل 3C', type: 'lab', assistant: 'م. علي محمود' },
  { day: 1, time: '01:00-02:00', courseCode: 'CS218L', courseName: 'معمل برمجة متقدمة', section: 'F', room: 'معمل 4C', type: 'lab', assistant: 'م. نور الدين' },
  
  
  { day: 2, time: '08:00-09:00', courseCode: 'MATH201', courseName: 'رياضيات 2', section: 'A', room: 'C215', type: 'lecture', professor: 'د. علي أحمد' },
  { day: 2, time: '09:00-10:00', courseCode: 'MATH201', courseName: 'رياضيات 2', section: 'B', room: 'C221', type: 'lecture', professor: 'د. محمود سعيد' },
  { day: 2, time: '10:00-11:00', courseCode: 'CS221L', courseName: 'معمل هياكل البيانات', section: 'A', room: 'معمل 2B', type: 'lab', assistant: 'م. أحمد فتحي' },
  { day: 2, time: '11:00-12:00', courseCode: 'CS221L', courseName: 'معمل هياكل البيانات', section: 'B', room: 'معمل 3B', type: 'lab', assistant: 'م. محمد صلاح' },
  { day: 2, time: '12:00-01:00', courseCode: 'CS221L', courseName: 'معمل هياكل البيانات', section: 'C', room: 'معمل 4B', type: 'lab', assistant: 'م. سارة حسن' },
  
  
  { day: 3, time: '08:00-09:00', courseCode: 'CS235', courseName: 'قواعد البيانات', section: 'A', room: 'C235', type: 'lecture', professor: 'د. أحمد عبدالله' },
  { day: 3, time: '09:00-10:00', courseCode: 'CS235', courseName: 'قواعد البيانات', section: 'B', room: 'C235', type: 'lecture', professor: 'د. فاطمة محمد' },
  { day: 3, time: '10:00-11:00', courseCode: 'STAT201', courseName: 'إحصاء واحتمالات', section: 'A', room: 'C218', type: 'lecture', professor: 'د. محمد إبراهيم' },
  { day: 3, time: '11:00-12:00', courseCode: 'STAT201', courseName: 'إحصاء واحتمالات', section: 'B', room: 'C221', type: 'lecture', professor: 'د. سعيد أحمد' },
  
  
  { day: 4, time: '08:00-09:00', courseCode: 'CS235L', courseName: 'معمل قواعد البيانات', section: 'A', room: 'معمل 2B', type: 'lab', assistant: 'م. أحمد سعيد' },
  { day: 4, time: '09:00-10:00', courseCode: 'CS235L', courseName: 'معمل قواعد البيانات', section: 'B', room: 'معمل 3B', type: 'lab', assistant: 'م. محمد علي' },
  { day: 4, time: '10:00-11:00', courseCode: 'CS235L', courseName: 'معمل قواعد البيانات', section: 'C', room: 'معمل 4B', type: 'lab', assistant: 'م. سارة محمود' },
  { day: 4, time: '11:00-12:00', courseCode: 'MATH201T', courseName: 'تمارين رياضيات 2', section: 'A', room: 'C101', type: 'tutorial', assistant: 'م. علي حسن' },
  { day: 4, time: '12:00-01:00', courseCode: 'MATH201T', courseName: 'تمارين رياضيات 2', section: 'B', room: 'C113', type: 'tutorial', assistant: 'م. فاطمة أحمد' },
];


export const level3Schedule: CourseSession[] = [
  
  { day: 0, time: '08:00-09:00', courseCode: 'CS318', courseName: 'هندسة البرمجيات', section: 'A', room: 'C318', type: 'lecture', professor: 'د. أحمد محمد' },
  { day: 0, time: '09:00-10:00', courseCode: 'CS318', courseName: 'هندسة البرمجيات', section: 'B', room: 'C318', type: 'lecture', professor: 'د. فاطمة علي' },
  { day: 0, time: '10:00-11:00', courseCode: 'CS321', courseName: 'نظم التشغيل', section: 'A', room: 'C321', type: 'lecture', professor: 'د. محمد حسن' },
  { day: 0, time: '11:00-12:00', courseCode: 'CS335', courseName: 'الذكاء الاصطناعي', section: 'A', room: 'C335', type: 'lecture', professor: 'د. سارة أحمد' },
  
  
  { day: 1, time: '08:00-09:00', courseCode: 'CS318L', courseName: 'معمل هندسة البرمجيات', section: 'A', room: 'معمل 2B', type: 'lab', assistant: 'م. أحمد سعيد' },
  { day: 1, time: '09:00-10:00', courseCode: 'CS318L', courseName: 'معمل هندسة البرمجيات', section: 'B', room: 'معمل 3B', type: 'lab', assistant: 'م. محمد علي' },
  { day: 1, time: '10:00-11:00', courseCode: 'CS321L', courseName: 'معمل نظم التشغيل', section: 'A', room: 'معمل 4B', type: 'lab', assistant: 'م. سارة محمود' },
  
  
  { day: 2, time: '08:00-09:00', courseCode: 'CS335L', courseName: 'معمل الذكاء الاصطناعي', section: 'A', room: 'معمل 2B', type: 'lab', assistant: 'م. علي حسن' },
  { day: 2, time: '09:00-10:00', courseCode: 'CS335L', courseName: 'معمل الذكاء الاصطناعي', section: 'B', room: 'معمل 3B', type: 'lab', assistant: 'م. فاطمة أحمد' },
  { day: 2, time: '10:00-11:00', courseCode: 'CS340', courseName: 'شبكات الحاسب', section: 'A', room: 'C340', type: 'lecture', professor: 'د. محمود سعيد' },
  
  
  { day: 3, time: '08:00-09:00', courseCode: 'CS340L', courseName: 'معمل شبكات الحاسب', section: 'A', room: 'معمل 2B', type: 'lab', assistant: 'م. أحمد فتحي' },
  { day: 3, time: '09:00-10:00', courseCode: 'CS340L', courseName: 'معمل شبكات الحاسب', section: 'B', room: 'معمل 3B', type: 'lab', assistant: 'م. محمد صلاح' },
  { day: 3, time: '10:00-11:00', courseCode: 'ELEC301', courseName: 'دوائر منطقية', section: 'A', room: 'C301', type: 'lecture', professor: 'د. علي محمود' },
  
  
  { day: 4, time: '08:00-09:00', courseCode: 'ELEC301L', courseName: 'معمل دوائر منطقية', section: 'A', room: 'معمل 2B', type: 'lab', assistant: 'م. سارة حسن' },
  { day: 4, time: '09:00-10:00', courseCode: 'ELEC301L', courseName: 'معمل دوائر منطقية', section: 'B', room: 'معمل 3B', type: 'lab', assistant: 'م. علي أحمد' },
  { day: 4, time: '10:00-11:00', courseCode: 'CS350', courseName: 'أمن المعلومات', section: 'A', room: 'C350', type: 'lecture', professor: 'د. محمد إبراهيم' },
];


export const level4Schedule: CourseSession[] = [
  
  { day: 0, time: '08:00-09:00', courseCode: 'CS418', courseName: 'تعلم الآلة', section: 'A', room: 'C418', type: 'lecture', professor: 'د. أحمد محمد' },
  { day: 0, time: '09:00-10:00', courseCode: 'CS421', courseName: 'معالجة الصور', section: 'A', room: 'C421', type: 'lecture', professor: 'د. فاطمة علي' },
  { day: 0, time: '10:00-11:00', courseCode: 'CS435', courseName: 'الحوسبة السحابية', section: 'A', room: 'C435', type: 'lecture', professor: 'د. محمد حسن' },
  
  
  { day: 1, time: '08:00-09:00', courseCode: 'CS418L', courseName: 'معمل تعلم الآلة', section: 'A', room: 'معمل 2B', type: 'lab', assistant: 'م. أحمد سعيد' },
  { day: 1, time: '09:00-10:00', courseCode: 'CS421L', courseName: 'معمل معالجة الصور', section: 'A', room: 'معمل 3B', type: 'lab', assistant: 'م. محمد علي' },
  { day: 1, time: '10:00-11:00', courseCode: 'CS435L', courseName: 'معمل الحوسبة السحابية', section: 'A', room: 'معمل 4B', type: 'lab', assistant: 'م. سارة محمود' },
  
  
  { day: 2, time: '08:00-09:00', courseCode: 'CS440', courseName: 'مشروع التخرج 1', section: 'A', room: 'C440', type: 'lecture', professor: 'د. علي حسن' },
  { day: 2, time: '09:00-10:00', courseCode: 'CS450', courseName: 'إدارة المشاريع', section: 'A', room: 'C450', type: 'lecture', professor: 'د. محمود سعيد' },
  
  
  { day: 3, time: '08:00-09:00', courseCode: 'CS460', courseName: 'تطبيقات الويب', section: 'A', room: 'C460', type: 'lecture', professor: 'د. سارة أحمد' },
  { day: 3, time: '09:00-10:00', courseCode: 'CS460L', courseName: 'معمل تطبيقات الويب', section: 'A', room: 'معمل 2B', type: 'lab', assistant: 'م. أحمد فتحي' },
  
  
  { day: 4, time: '08:00-09:00', courseCode: 'CS440', courseName: 'مشروع التخرج 1 - متابعة', section: 'A', room: 'C440', type: 'tutorial', professor: 'د. علي حسن' },
  { day: 4, time: '09:00-10:00', courseCode: 'SEMINAR', courseName: 'ندوة', section: 'A', room: 'C401', type: 'lecture', professor: 'د. محمد إبراهيم' },
];



export const level1ISSchedule: CourseSession[] = [
  
  { day: 0, time: '08:00-09:00', courseCode: 'IS101', courseName: 'مقدمة في نظم المعلومات', section: 'A', room: 'C218', type: 'lecture', professor: 'د. أحمد محمد', department: 'IS' },
  { day: 0, time: '09:00-10:00', courseCode: 'MATH101', courseName: 'رياضيات 1', section: 'A', room: 'C215', type: 'lecture', professor: 'أ.د. أيمن شحات محمد', department: 'IS' },
  { day: 0, time: '10:00-11:00', courseCode: 'IT101', courseName: 'أساسيات تكنولوجيا المعلومات', section: 'A', room: 'C113', type: 'lecture', professor: 'د. علي حسين', department: 'IS' },
  { day: 0, time: '11:00-12:00', courseCode: 'ENG101', courseName: 'لغة إنجليزية 1', section: 'A', room: 'C118', type: 'lecture', professor: 'د. شيرين عبد الغفار', department: 'IS' },
  
  
  { day: 1, time: '08:00-09:00', courseCode: 'IT101L', courseName: 'معمل تكنولوجيا المعلومات', section: 'A', room: 'معمل 3B', type: 'lab', assistant: 'م. يمنى محمد', department: 'IS' },
  { day: 1, time: '09:00-10:00', courseCode: 'IT101L', courseName: 'معمل تكنولوجيا المعلومات', section: 'B', room: 'معمل 2B', type: 'lab', assistant: 'م. محمود قطب', department: 'IS' },
  { day: 1, time: '10:00-11:00', courseCode: 'IS101L', courseName: 'معمل نظم المعلومات', section: 'A', room: 'معمل 4B', type: 'lab', assistant: 'م. سارة أحمد', department: 'IS' },
  
  
  { day: 2, time: '08:00-09:00', courseCode: 'MGMT101', courseName: 'مبادئ الإدارة', section: 'A', room: 'C218', type: 'lecture', professor: 'د. محمد إبراهيم', department: 'IS' },
  { day: 2, time: '09:00-10:00', courseCode: 'ACC101', courseName: 'مبادئ المحاسبة', section: 'A', room: 'C221', type: 'lecture', professor: 'د. فاطمة علي', department: 'IS' },
  { day: 2, time: '10:00-11:00', courseCode: 'STAT101', courseName: 'إحصاء 1', section: 'A', room: 'C113', type: 'lecture', professor: 'د. سعيد أحمد', department: 'IS' },
  
  
  { day: 3, time: '08:00-09:00', courseCode: 'ECON101', courseName: 'مبادئ الاقتصاد', section: 'A', room: 'C218', type: 'lecture', professor: 'د. علي محمود', department: 'IS' },
  { day: 3, time: '09:00-10:00', courseCode: 'MATH101T', courseName: 'تمارين رياضيات 1', section: 'A', room: 'C101', type: 'tutorial', assistant: 'م. محمد أحمد', department: 'IS' },
  { day: 3, time: '10:00-11:00', courseCode: 'ETHICS101', courseName: 'أخلاقيات مهنية', section: 'A', room: 'C118', type: 'lecture', professor: 'د. إيمان علي', department: 'IS' },
  
  
  { day: 4, time: '08:00-09:00', courseCode: 'THINK101', courseName: 'تفكير علمي', section: 'A', room: 'C215', type: 'lecture', professor: 'د. محمد فاروق', department: 'IS' },
  { day: 4, time: '09:00-10:00', courseCode: 'ISLAM101', courseName: 'ثقافة إسلامية', section: 'A', room: 'C030', type: 'lecture', professor: 'أ.د. معتمد', department: 'IS' },
];


export const level2ISSchedule: CourseSession[] = [
  
  { day: 0, time: '08:00-09:00', courseCode: 'IS218', courseName: 'تحليل وتصميم النظم', section: 'A', room: 'C218', type: 'lecture', professor: 'د. أحمد محمد', department: 'IS' },
  { day: 0, time: '09:00-10:00', courseCode: 'IS221', courseName: 'قواعد البيانات', section: 'A', room: 'C221', type: 'lecture', professor: 'د. فاطمة علي', department: 'IS' },
  { day: 0, time: '10:00-11:00', courseCode: 'PROG201', courseName: 'برمجة متقدمة', section: 'A', room: 'C235', type: 'lecture', professor: 'د. محمد حسن', department: 'IS' },
  
  
  { day: 1, time: '08:00-09:00', courseCode: 'IS218L', courseName: 'معمل تحليل وتصميم النظم', section: 'A', room: 'معمل 2B', type: 'lab', assistant: 'م. أحمد سعيد', department: 'IS' },
  { day: 1, time: '09:00-10:00', courseCode: 'IS221L', courseName: 'معمل قواعد البيانات', section: 'A', room: 'معمل 3B', type: 'lab', assistant: 'م. سارة محمود', department: 'IS' },
  { day: 1, time: '10:00-11:00', courseCode: 'PROG201L', courseName: 'معمل برمجة متقدمة', section: 'A', room: 'معمل 4B', type: 'lab', assistant: 'م. محمد علي', department: 'IS' },
  
  
  { day: 2, time: '08:00-09:00', courseCode: 'MGMT201', courseName: 'إدارة الأعمال', section: 'A', room: 'C218', type: 'lecture', professor: 'د. علي حسن', department: 'IS' },
  { day: 2, time: '09:00-10:00', courseCode: 'ACC201', courseName: 'محاسبة إدارية', section: 'A', room: 'C221', type: 'lecture', professor: 'د. محمود سعيد', department: 'IS' },
  { day: 2, time: '10:00-11:00', courseCode: 'STAT201', courseName: 'إحصاء 2', section: 'A', room: 'C113', type: 'lecture', professor: 'د. سعيد أحمد', department: 'IS' },
  
  
  { day: 3, time: '08:00-09:00', courseCode: 'NET201', courseName: 'شبكات الحاسب', section: 'A', room: 'C340', type: 'lecture', professor: 'د. أحمد فتحي', department: 'IS' },
  { day: 3, time: '09:00-10:00', courseCode: 'NET201L', courseName: 'معمل شبكات الحاسب', section: 'A', room: 'معمل 2B', type: 'lab', assistant: 'م. علي أحمد', department: 'IS' },
  
  
  { day: 4, time: '08:00-09:00', courseCode: 'IS235', courseName: 'نظم المعلومات الإدارية', section: 'A', room: 'C235', type: 'lecture', professor: 'د. سارة أحمد', department: 'IS' },
  { day: 4, time: '09:00-10:00', courseCode: 'MATH201', courseName: 'رياضيات 2', section: 'A', room: 'C215', type: 'lecture', professor: 'د. علي أحمد', department: 'IS' },
];


export const level3ISSchedule: CourseSession[] = [
  
  { day: 0, time: '08:00-09:00', courseCode: 'IS318', courseName: 'نظم دعم القرار', section: 'A', room: 'C318', type: 'lecture', professor: 'د. أحمد محمد', department: 'IS' },
  { day: 0, time: '09:00-10:00', courseCode: 'IS321', courseName: 'إدارة المشاريع', section: 'A', room: 'C321', type: 'lecture', professor: 'د. فاطمة علي', department: 'IS' },
  { day: 0, time: '10:00-11:00', courseCode: 'IS335', courseName: 'نظم المعلومات المحاسبية', section: 'A', room: 'C335', type: 'lecture', professor: 'د. محمد حسن', department: 'IS' },
  
  
  { day: 1, time: '08:00-09:00', courseCode: 'IS318L', courseName: 'معمل نظم دعم القرار', section: 'A', room: 'معمل 2B', type: 'lab', assistant: 'م. أحمد سعيد', department: 'IS' },
  { day: 1, time: '09:00-10:00', courseCode: 'IS335L', courseName: 'معمل نظم المعلومات المحاسبية', section: 'A', room: 'معمل 3B', type: 'lab', assistant: 'م. سارة محمود', department: 'IS' },
  
  
  { day: 2, time: '08:00-09:00', courseCode: 'IS340', courseName: 'تجارة إلكترونية', section: 'A', room: 'C340', type: 'lecture', professor: 'د. علي حسن', department: 'IS' },
  { day: 2, time: '09:00-10:00', courseCode: 'IS340L', courseName: 'معمل تجارة إلكترونية', section: 'A', room: 'معمل 2B', type: 'lab', assistant: 'م. محمد علي', department: 'IS' },
  { day: 2, time: '10:00-11:00', courseCode: 'SEC301', courseName: 'أمن المعلومات', section: 'A', room: 'C350', type: 'lecture', professor: 'د. محمود سعيد', department: 'IS' },
  
  
  { day: 3, time: '08:00-09:00', courseCode: 'ERP301', courseName: 'نظم تخطيط موارد المؤسسة', section: 'A', room: 'C318', type: 'lecture', professor: 'د. سارة أحمد', department: 'IS' },
  { day: 3, time: '09:00-10:00', courseCode: 'ERP301L', courseName: 'معمل ERP', section: 'A', room: 'معمل 3B', type: 'lab', assistant: 'م. علي أحمد', department: 'IS' },
  
  
  { day: 4, time: '08:00-09:00', courseCode: 'BI301', courseName: 'ذكاء الأعمال', section: 'A', room: 'C321', type: 'lecture', professor: 'د. محمد إبراهيم', department: 'IS' },
  { day: 4, time: '09:00-10:00', courseCode: 'BI301L', courseName: 'معمل ذكاء الأعمال', section: 'A', room: 'معمل 2B', type: 'lab', assistant: 'م. فاطمة أحمد', department: 'IS' },
];


export const level4ISSchedule: CourseSession[] = [
  
  { day: 0, time: '08:00-09:00', courseCode: 'IS418', courseName: 'إدارة نظم المعلومات', section: 'A', room: 'C418', type: 'lecture', professor: 'د. أحمد محمد', department: 'IS' },
  { day: 0, time: '09:00-10:00', courseCode: 'IS421', courseName: 'تدقيق نظم المعلومات', section: 'A', room: 'C421', type: 'lecture', professor: 'د. فاطمة علي', department: 'IS' },
  { day: 0, time: '10:00-11:00', courseCode: 'IS435', courseName: 'نظم المعلومات الاستراتيجية', section: 'A', room: 'C435', type: 'lecture', professor: 'د. محمد حسن', department: 'IS' },
  
  
  { day: 1, time: '08:00-09:00', courseCode: 'IS440', courseName: 'مشروع التخرج 1', section: 'A', room: 'C440', type: 'lecture', professor: 'د. علي حسن', department: 'IS' },
  { day: 1, time: '09:00-10:00', courseCode: 'CLOUD401', courseName: 'الحوسبة السحابية', section: 'A', room: 'C435', type: 'lecture', professor: 'د. محمود سعيد', department: 'IS' },
  
  
  { day: 2, time: '08:00-09:00', courseCode: 'DATA401', courseName: 'تحليل البيانات الضخمة', section: 'A', room: 'C418', type: 'lecture', professor: 'د. سارة أحمد', department: 'IS' },
  { day: 2, time: '09:00-10:00', courseCode: 'DATA401L', courseName: 'معمل تحليل البيانات', section: 'A', room: 'معمل 2B', type: 'lab', assistant: 'م. أحمد سعيد', department: 'IS' },
  
  
  { day: 3, time: '08:00-09:00', courseCode: 'IS440', courseName: 'مشروع التخرج 1 - متابعة', section: 'A', room: 'C440', type: 'tutorial', professor: 'د. علي حسن', department: 'IS' },
  { day: 3, time: '09:00-10:00', courseCode: 'MOBILE401', courseName: 'تطبيقات الهاتف المحمول', section: 'A', room: 'C421', type: 'lecture', professor: 'د. محمد إبراهيم', department: 'IS' },
  
  
  { day: 4, time: '08:00-09:00', courseCode: 'SEMINAR', courseName: 'ندوة', section: 'A', room: 'C401', type: 'lecture', professor: 'د. أحمد محمد', department: 'IS' },
  { day: 4, time: '09:00-10:00', courseCode: 'RESEARCH', courseName: 'مناهج البحث العلمي', section: 'A', room: 'C418', type: 'lecture', professor: 'د. فاطمة علي', department: 'IS' },
];


export function getScheduleByLevel(level: number, department: 'CS' | 'IS' = 'CS'): CourseSession[] {
  if (department === 'IS') {
    switch (level) {
      case 1:
        return level1ISSchedule;
      case 2:
        return level2ISSchedule;
      case 3:
        return level3ISSchedule;
      case 4:
        return level4ISSchedule;
      default:
        return level1ISSchedule;
    }
  }
  
  
  switch (level) {
    case 1:
      return level1Schedule;
    case 2:
      return level2Schedule;
    case 3:
      return level3Schedule;
    case 4:
      return level4Schedule;
    default:
      return level1Schedule;
  }
}


export function getStudentSchedule(
  level: number, 
  department: 'CS' | 'IS' = 'CS',
  studentSection: string = 'A'
): CourseSession[] {
  const allSchedule = getScheduleByLevel(level, department);
  
  
  
  
  return allSchedule.filter(session => {
    
    if (session.type === 'lecture') {
      return true;
    }
    
    
    if (session.type === 'lab' || session.type === 'tutorial') {
      return session.section === studentSection;
    }
    
    return false;
  });
}


export function getTodaySchedule(level: number, department: 'CS' | 'IS' = 'CS'): CourseSession[] {
  const today = new Date().getDay();
  const schedule = getScheduleByLevel(level, department);
  return schedule.filter(session => session.day === today);
}


export function getScheduleByDay(level: number, day: number, department: 'CS' | 'IS' = 'CS'): CourseSession[] {
  const schedule = getScheduleByLevel(level, department);
  return schedule.filter(session => session.day === day);
}


export function getCoursesByLevel(level: number, department: 'CS' | 'IS' = 'CS') {
  const schedule = getScheduleByLevel(level, department);
  const coursesMap = new Map();
  
  schedule.forEach(session => {
    if (!coursesMap.has(session.courseCode)) {
      coursesMap.set(session.courseCode, {
        code: session.courseCode,
        name: session.courseName,
        professor: session.professor,
        sections: [],
        department: session.department
      });
    }
    
    const course = coursesMap.get(session.courseCode);
    if (!course.sections.includes(session.section)) {
      course.sections.push(session.section);
    }
  });
  
  return Array.from(coursesMap.values());
}
