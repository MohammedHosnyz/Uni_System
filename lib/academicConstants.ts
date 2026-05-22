
interface Course {
  code: string;
  name: string;
  hours: number;
  type: string;
}

interface Semester {
  [key: string]: Course[];
}

interface YearData {
  [key: string]: Course[];
}

interface CoursesData {
  [key: string]: YearData;
}

interface Department {
  code: string;
  totalHours: number;
  description: string;
}

interface DepartmentsData {
  [key: string]: Department;
}

interface GradeInfo {
  range: string;
  points: number;
  grade: string;
}

interface GradingScale {
  [key: string]: GradeInfo;
}



export const ACADEMIC_DATA = {

  university: {
    name: "جامعة أسيوط القومية",
    faculties: [
      "كلية الحاسبات والذكاء الاصطناعي",
      "كلية الهندسة", 
      "كلية الطب",
      "كلية الصيدلة",
      "كلية التجارة",
      "كلية الحقوق",
      "كلية التربية"
    ]
  },


  departments: {
    "علوم الحاسوب": {
      code: "CS",
      totalHours: 132,
      description: "يركز على البرمجة وتطوير الأنظمة"
    },
    "هندسة البرمجيات": {
      code: "SE", 
      totalHours: 132,
      description: "يركز على تطوير وإدارة المشاريع البرمجية"
    },
    "الذكاء الاصطناعي": {
      code: "AI",
      totalHours: 132, 
      description: "يركز على تقنيات الذكاء الاصطناعي والتعلم الآلي"
    },
    "أمن المعلومات": {
      code: "IS",
      totalHours: 132,
      description: "يركز على أمن الشبكات والمعلومات"
    }
  } as DepartmentsData,


  courses: {
    "السنة الأولى": {
      "الفصل الأول": [
        { code: "CS101", name: "مقدمة في البرمجة", hours: 3, type: "إجباري" },
        { code: "MATH101", name: "رياضيات 1", hours: 3, type: "إجباري" },
        { code: "ENG101", name: "لغة إنجليزية 1", hours: 2, type: "إجباري" },
        { code: "ARAB101", name: "لغة عربية", hours: 2, type: "إجباري" },
        { code: "PHYS101", name: "فيزياء عامة", hours: 3, type: "إجباري" },
        { code: "CS102", name: "مقدمة في الحاسوب", hours: 2, type: "إجباري" },
        { code: "ECON101", name: "مبادئ الاقتصاد", hours: 2, type: "إجباري", category: "علوم أساسية" }
      ],
      "الفصل الثاني": [
        { code: "CS103", name: "البرمجة الشيئية", hours: 3, type: "إجباري" },
        { code: "MATH102", name: "رياضيات 2", hours: 3, type: "إجباري" },
        { code: "ENG102", name: "لغة إنجليزية 2", hours: 2, type: "إجباري" },
        { code: "STAT101", name: "إحصاء", hours: 3, type: "إجباري" },
        { code: "CS104", name: "منطق رقمي", hours: 3, type: "إجباري" },
        { code: "ELEC101", name: "دوائر كهربية", hours: 2, type: "إجباري" },
        { code: "ECON102", name: "اقتصاد الحاسوب", hours: 2, type: "اختياري", category: "علوم أساسية" }
      ]
    },
    
    "السنة الثانية": {
      "الفصل الأول": [
        { code: "CS201", name: "هياكل البيانات", hours: 3, type: "إجباري" },
        { code: "CS202", name: "تنظيم الحاسوب", hours: 3, type: "إجباري" },
        { code: "MATH201", name: "رياضيات متقطعة", hours: 3, type: "إجباري" },
        { code: "CS203", name: "البرمجة المتقدمة", hours: 3, type: "إجباري" },
        { code: "ENG201", name: "لغة إنجليزية تقنية", hours: 2, type: "إجباري" },
        { code: "CS204", name: "أساسيات الشبكات", hours: 2, type: "إجباري" }
      ],
      "الفصل الثاني": [
        { code: "CS205", name: "خوارزميات", hours: 3, type: "إجباري" },
        { code: "CS206", name: "نظم التشغيل", hours: 3, type: "إجباري" },
        { code: "CS207", name: "قواعد البيانات 1", hours: 3, type: "إجباري" },
        { code: "MATH202", name: "جبر خطي", hours: 3, type: "إجباري" },
        { code: "CS208", name: "برمجة الويب", hours: 3, type: "إجباري" },
        { code: "CS209", name: "تحليل وتصميم النظم", hours: 2, type: "إجباري" }
      ]
    },

    "السنة الثالثة": {
      "الفصل الأول": [
        { code: "CS301", name: "قواعد البيانات المتقدمة", hours: 3, type: "إجباري" },
        { code: "CS302", name: "هندسة البرمجيات", hours: 3, type: "إجباري" },
        { code: "CS303", name: "الذكاء الاصطناعي", hours: 3, type: "إجباري" },
        { code: "CS304", name: "أمن المعلومات", hours: 3, type: "إجباري" },
        { code: "CS305", name: "شبكات الحاسوب", hours: 3, type: "إجباري" },
        { code: "ELEC301", name: "مقرر اختياري 1", hours: 2, type: "اختياري" }
      ],
      "الفصل الثاني": [
        { code: "CS306", name: "تعلم الآلة", hours: 3, type: "إجباري" },
        { code: "CS307", name: "تطوير تطبيقات الجوال", hours: 3, type: "إجباري" },
        { code: "CS308", name: "الحوسبة السحابية", hours: 3, type: "إجباري" },
        { code: "CS309", name: "إدارة المشاريع", hours: 3, type: "إجباري" },
        { code: "CS310", name: "تحليل البيانات", hours: 3, type: "إجباري" },
        { code: "ELEC302", name: "مقرر اختياري 2", hours: 2, type: "اختياري" }
      ]
    },

    "السنة الرابعة": {
      "الفصل الأول": [
        { code: "CS401", name: "مشروع التخرج 1", hours: 3, type: "إجباري" },
        { code: "CS402", name: "أخلاقيات الحاسوب", hours: 2, type: "إجباري" },
        { code: "CS403", name: "معالجة الصور", hours: 3, type: "اختياري" },
        { code: "CS404", name: "الأمن السيبراني", hours: 3, type: "اختياري" },
        { code: "CS405", name: "البيانات الضخمة", hours: 3, type: "اختياري" },
        { code: "CS406", name: "الواقع الافتراضي", hours: 3, type: "اختياري" }
      ],
      "الفصل الثاني": [
        { code: "CS407", name: "مشروع التخرج 2", hours: 3, type: "إجباري" },
        { code: "CS408", name: "تدريب عملي", hours: 6, type: "إجباري" },
        { code: "CS409", name: "ريادة الأعمال", hours: 2, type: "إجباري" },
        { code: "CS410", name: "مقرر اختياري متقدم 1", hours: 3, type: "اختياري" },
        { code: "CS411", name: "مقرر اختياري متقدم 2", hours: 3, type: "اختياري" }
      ]
    }
  } as CoursesData,


  grading: {
    scale: {
      "A": { range: "90-100", points: 4.0, grade: "ممتاز" },
      "B+": { range: "85-89", points: 3.5, grade: "جيد جداً مرتفع" },
      "B": { range: "80-84", points: 3.0, grade: "جيد جداً" },
      "C+": { range: "75-79", points: 2.5, grade: "جيد مرتفع" },
      "C": { range: "70-74", points: 2.0, grade: "جيد" },
      "D+": { range: "65-69", points: 1.5, grade: "مقبول مرتفع" },
      "D": { range: "60-64", points: 1.0, grade: "مقبول" },
      "F": { range: "0-59", points: 0.0, grade: "راسب" }
    } as GradingScale,
    calculation: "المعدل التراكمي = مجموع (الدرجة × عدد الساعات) ÷ إجمالي عدد الساعات المسجلة"
  },


  admission: {
    requirements: [
      "الحصول على شهادة الثانوية العامة بمعدل لا يقل عن 85%",
      "اجتياز اختبارات القدرات المطلوبة",
      "تقديم جميع الأوراق المطلوبة في المواعيد المحددة",
      "دفع رسوم التقديم والقبول",
      "اجتياز المقابلة الشخصية (إن وجدت)",
      "تقديم شهادة طبية تفيد اللياقة الصحية"
    ],
    documents: [
      "أصل شهادة الثانوية العامة + صورة",
      "شهادة الميلاد + صورة",
      "بطاقة الرقم القومي + صورة",
      "عدد 6 صور شخصية حديثة",
      "شهادة طبية معتمدة",
      "إيصال دفع رسوم التقديم"
    ]
  },


  attendance: {
    minimumAttendance: "75%",
    rules: [
      "الحد الأدنى للحضور 75% من إجمالي المحاضرات والعملي",
      "في حالة تجاوز نسبة الغياب المسموحة يحرم الطالب من دخول الامتحان",
      "يمكن تقديم عذر طبي أو قهري للغياب خلال أسبوع من تاريخ الغياب",
      "العذر الطبي يجب أن يكون معتمد من الوحدة الطبية بالجامعة",
      "العذر القهري يحتاج موافقة عميد الكلية",
      "يتم احتساب التأخير 15 دقيقة كغياب نصف محاضرة"
    ]
  },


  examinations: {
    distribution: {
      "أعمال السنة": "40%",
      "الامتحان النهائي": "60%"
    },
    components: {
      "امتحانات منتصف الفصل": "20%",
      "الواجبات والتكليفات": "10%", 
      "المشاركة والحضور": "5%",
      "الامتحانات العملية": "5%",
      "الامتحان النهائي": "60%"
    },
    rules: [
      "يجب الحصول على 40% على الأقل في الامتحان النهائي للنجاح",
      "درجة النجاح الإجمالية 60% من إجمالي الدرجة",
      "يحق للطالب دخول امتحان الدور الثاني في حالة الرسوب",
      "لا يسمح بدخول الامتحان بدون بطاقة الطالب",
      "يجب الحضور قبل بداية الامتحان بـ 15 دقيقة على الأقل"
    ]
  },


  graduation: {
    requirements: [
      "إنهاء جميع المقررات المطلوبة (132 ساعة معتمدة)",
      "الحصول على معدل تراكمي لا يقل عن 2.0",
      "إنجاز مشروع التخرج بنجاح (درجة لا تقل عن 70%)",
      "إتمام فترة التدريب العملي المطلوبة",
      "عدم وجود مواد راسب أو غير مكتملة",
      "سداد جميع الرسوم المالية المستحقة",
      "تقديم طلب التخرج في المواعيد المحددة"
    ],
    honors: {
      "مرتبة الشرف الأولى": "معدل تراكمي 3.7 - 4.0",
      "مرتبة الشرف الثانية": "معدل تراكمي 3.2 - 3.69",
      "بدون مرتبة شرف": "معدل تراكمي 2.0 - 3.19"
    }
  },


  fees: {
    tuition: {
      "رسوم الفصل الواحد": "15,000 جنيه مصري",
      "رسوم التسجيل السنوية": "2,000 جنيه مصري", 
      "رسوم المعامل والأنشطة": "1,500 جنيه مصري",
      "رسوم مشروع التخرج": "3,000 جنيه مصري",
      "رسوم التدريب العملي": "2,000 جنيه مصري"
    },
    additional: {
      "رسوم إعادة الامتحان": "500 جنيه لكل مادة",
      "رسوم استخراج شهادة": "200 جنيه مصري",
      "رسوم كشف درجات": "100 جنيه مصري",
      "رسوم بدل فاقد بطاقة": "150 جنيه مصري"
    }
  },


  transfer: {
    conditions: [
      "معدل تراكمي لا يقل عن 3.0",
      "إنهاء 30 ساعة معتمدة على الأقل في القسم الحالي",
      "موافقة رئيس القسم المحول إليه",
      "عدم تجاوز الحد الأقصى لأعداد الطلاب في القسم المستهدف",
      "تقديم الطلب في المواعيد المحددة (بداية الفصل الدراسي)",
      "اجتياز أي متطلبات إضافية يحددها القسم الجديد"
    ],
    documents: [
      "طلب التحويل معتمد من شؤون الطلبة",
      "كشف درجات معتمد",
      "موافقة رئيس القسم الحالي",
      "موافقة رئيس القسم المستهدف",
      "سداد أي رسوم مستحقة"
    ]
  }
};


export class AcademicDataHelper {
  
  static getCoursesByYear(year: string): YearData | null {
    return (ACADEMIC_DATA.courses as CoursesData)[year] || null;
  }

  static getCoursesBySemester(year: string, semester: string): Course[] | null {
    const yearData = this.getCoursesByYear(year);
    return yearData ? yearData[semester] : null;
  }

  static searchCourses(query: string): (Course & { year: string; semester: string })[] {
    const results: (Course & { year: string; semester: string })[] = [];
    
    Object.entries(ACADEMIC_DATA.courses as CoursesData).forEach(([year, yearData]) => {
      Object.entries(yearData).forEach(([semester, courses]) => {
        courses.forEach(course => {
          if (course.name.toLowerCase().includes(query.toLowerCase()) ||
              course.code.toLowerCase().includes(query.toLowerCase())) {
            results.push({
              ...course,
              year,
              semester
            });
          }
        });
      });
    });
    
    return results;
  }

  static getDepartmentInfo(deptName: string): Department | null {
    return (ACADEMIC_DATA.departments as DepartmentsData)[deptName] || null;
  }

  static getGradingInfo(): any {
    return ACADEMIC_DATA.grading;
  }

  static getAdmissionInfo(): any {
    return ACADEMIC_DATA.admission;
  }

  static getAttendanceRules(): any {
    return ACADEMIC_DATA.attendance;
  }

  static getExaminationRules(): any {
    return ACADEMIC_DATA.examinations;
  }

  static getGraduationRequirements(): any {
    return ACADEMIC_DATA.graduation;
  }

  static getFeesInfo(): any {
    return ACADEMIC_DATA.fees;
  }

  static getTransferInfo(): any {
    return ACADEMIC_DATA.transfer;
  }
}