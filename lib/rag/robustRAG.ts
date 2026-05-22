import fs from 'fs';
import path from 'path';
import { ACADEMIC_DATA, AcademicDataHelper } from '../academicConstants';
import { createStrictRAGPrompt } from './strictRAGPrompt';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface DocumentChunk {
  id: string;
  content: string;
  metadata: {
    source: string;
    page?: number;
    chunk: number;
  };
}

export class RobustRAG {
  private conversationHistory: ChatMessage[] = [];
  private documentChunks: DocumentChunk[] = [];
  private isInitialized: boolean = false;

  constructor() {

  }

  async initialize() {
    try {
      console.log('🚀 تهيئة نظام RAG المحسن...');
      

      await this.loadPDFDocuments();
      
      this.isInitialized = true;
      console.log('✅ تم تهيئة النظام بنجاح');
    } catch (error) {
      console.log('⚠️ تهيئة بدون وثائق:', error);
      this.isInitialized = true;
    }
  }

  private async loadPDFDocuments() {
    
    const regulationsPath = path.join(process.cwd(), 'data', 'university-regulations.txt');
    
    let chunkId = 0;

    try {
      if (fs.existsSync(regulationsPath)) {
        console.log(`📄 قراءة ملف اللوائح الجامعية الفعلي: ${path.basename(regulationsPath)}`);
        
        const regulationsText = fs.readFileSync(regulationsPath, 'utf-8');
        console.log(`� حجم المحمتوى: ${regulationsText.length} حرف`);
        
        
        const chunks = this.splitTextIntoChunks(regulationsText, 800);
        
        chunks.forEach((chunk, index) => {
          this.documentChunks.push({
            id: `regulations_${chunkId++}`,
            content: chunk,
            metadata: {
              source: 'university-regulations',
              chunk: index,
            }
          });
        });
        
        console.log(`✅ تم تحميل ${chunks.length} قطعة من اللوائح الجامعية الفعلية`);
      } else {
        console.log(`❌ ملف اللوائح غير موجود: ${regulationsPath}`);
        console.log(`🔄 استخدام المحتوى الاحتياطي...`);
        
        
        this.addFallbackContent('general-regulation');
        this.addFallbackContent('software-engineering-regulation');
      }
    } catch (error) {
      console.error(`خطأ في قراءة ملف اللوائح:`, error);
      console.log(`🔄 استخدام المحتوى الاحتياطي...`);
      
      
      this.addFallbackContent('general-regulation');
      this.addFallbackContent('software-engineering-regulation');
    }

    console.log(`📚 تم تحميل ${this.documentChunks.length} قطعة نصية إجمالية`);
  }

  private addFallbackContent(fileName: string) {
    const fallbackContent = fileName.includes('general') ? 
      `اللائحة العامة لجامعة أسيوط القومية

شروط القبول:
- الحصول على شهادة الثانوية العامة بمعدل لا يقل عن 85%
- اجتياز اختبارات القدرات المطلوبة
- تقديم جميع الأوراق المطلوبة في المواعيد المحددة
- دفع رسوم التقديم والقبول

تسجيل المقررات:
- يتم التسجيل عبر النظام الإلكتروني للطلاب
- الحد الأدنى للتسجيل 12 ساعة معتمدة
- الحد الأقصى للتسجيل 18 ساعة معتمدة
- يجب الحصول على موافقة المرشد الأكاديمي
- مواعيد التسجيل تكون في بداية كل فصل دراسي

نظام الدرجات والتقييم:
- A: 90-100 (ممتاز) = 4.0 نقاط
- B: 80-89 (جيد جداً) = 3.0 نقاط
- C: 70-79 (جيد) = 2.0 نقطة
- D: 60-69 (مقبول) = 1.0 نقطة
- F: أقل من 60 (راسب) = 0.0 نقطة

حساب المعدل التراكمي:
المعدل التراكمي = مجموع (الدرجة × عدد الساعات) ÷ إجمالي عدد الساعات المسجلة

قوانين الحضور والغياب:
- الحد الأدنى للحضور 75% من إجمالي المحاضرات
- في حالة تجاوز نسبة الغياب المسموحة يحرم الطالب من دخول الامتحان
- يمكن تقديم عذر طبي أو قهري للغياب
- يجب تقديم العذر خلال أسبوع من تاريخ الغياب

الامتحانات:
- امتحانات منتصف الفصل: 30% من الدرجة النهائية
- امتحانات نهاية الفصل: 60% من الدرجة النهائية
- أعمال السنة والمشاركة: 10% من الدرجة النهائية
- يجب الحصول على 40% على الأقل في الامتحان النهائي للنجاح

شروط التخرج:
- إنهاء جميع المقررات المطلوبة (132 ساعة معتمدة)
- الحصول على معدل تراكمي لا يقل عن 2.0
- إنجاز مشروع التخرج بنجاح
- عدم وجود مواد راسب أو غير مكتملة
- سداد جميع الرسوم المالية المستحقة

الرسوم الدراسية:
- رسوم الفصل الواحد: 15,000 جنيه مصري
- رسوم التسجيل السنوية: 2,000 جنيه مصري
- رسوم المعامل والأنشطة: 1,500 جنيه مصري
- رسوم مشروع التخرج: 3,000 جنيه مصري` :
      
      `لائحة كلية الحاسبات والذكاء الاصطناعي

أقسام الكلية:
- قسم علوم الحاسوب
- قسم هندسة البرمجيات
- قسم الذكاء الاصطناعي
- قسم أمن المعلومات

متطلبات التخصص في هندسة البرمجيات:
- إنهاء 132 ساعة معتمدة
- مقررات إجبارية: 90 ساعة
- مقررات اختيارية: 30 ساعة
- مشروع التخرج: 6 ساعات
- تدريب عملي: 6 ساعات

المقررات الأساسية:
- البرمجة الأساسية (CS101)
- هياكل البيانات (CS201)
- قواعد البيانات (CS301)
- هندسة البرمجيات (SE401)
- إدارة المشاريع (SE402)

شروط التحويل بين الأقسام:
- معدل تراكمي لا يقل عن 3.0
- إنهاء 30 ساعة معتمدة على الأقل
- موافقة رئيس القسم المحول إليه
- عدم تجاوز الحد الأقصى لأعداد الطلاب في القسم

نظام التدريب العملي:
- مدة التدريب: فصل دراسي كامل
- يتم في شركات معتمدة من الكلية
- تقييم من المشرف الأكاديمي والمشرف في الشركة
- تقديم تقرير نهائي عن التدريب

مشروع التخرج:
- يبدأ في الفصل الأخير من الدراسة
- يمكن العمل فردياً أو في مجموعات (حد أقصى 3 طلاب)
- مناقشة المشروع أمام لجنة من الأساتذة
- درجة النجاح في المشروع لا تقل عن 60%

نظام الإرشاد الأكاديمي:
- كل طالب له مرشد أكاديمي
- المرشد يساعد في اختيار المقررات
- يجب الحصول على موافقة المرشد قبل التسجيل
- المرشد يتابع الأداء الأكاديمي للطالب

قوانين الانضباط الأكاديمي:
- عدم الغش في الامتحانات
- احترام أعضاء هيئة التدريس
- المحافظة على ممتلكات الكلية
- الالتزام بالمواعيد المحددة`;

    const chunks = this.splitTextIntoChunks(fallbackContent, 500);
    let chunkId = this.documentChunks.length;
    
    chunks.forEach((chunk, index) => {
      this.documentChunks.push({
        id: `fallback_${chunkId++}`,
        content: chunk,
        metadata: {
          source: fileName,
          chunk: index,
        }
      });
    });
  }

  private splitTextIntoChunks(text: string, chunkSize: number): string[] {
    
    const cleanText = text
      .replace(/\s+/g, ' ')  
      .replace(/\n\s*\n/g, '\n\n')  
      .trim();
    
    
    const sections = cleanText.split(/(?=مادة\s*\(\s*\d+\s*\))|(?=حدول\s*\.\s*\d+)|(?=بزهامج\s+)|(?=قسم\s+)/);
    
    const chunks: string[] = [];
    let currentChunk = '';

    for (const section of sections) {
      const trimmedSection = section.trim();
      if (!trimmedSection) continue;
      
      
      if (trimmedSection.length <= chunkSize) {
        if (currentChunk.length + trimmedSection.length > chunkSize && currentChunk.length > 0) {
          chunks.push(currentChunk.trim());
          currentChunk = trimmedSection;
        } else {
          currentChunk += (currentChunk ? '\n\n' : '') + trimmedSection;
        }
      } else {
        
        if (currentChunk.trim()) {
          chunks.push(currentChunk.trim());
          currentChunk = '';
        }
        
        
        const sentences = trimmedSection.split(/[.!?؟]\s+/);
        for (const sentence of sentences) {
          const trimmedSentence = sentence.trim();
          if (!trimmedSentence) continue;
          
          if (currentChunk.length + trimmedSentence.length > chunkSize && currentChunk.length > 0) {
            chunks.push(currentChunk.trim());
            currentChunk = trimmedSentence;
          } else {
            currentChunk += (currentChunk ? '. ' : '') + trimmedSentence;
          }
        }
      }
    }

    
    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }

    
    return chunks.filter(chunk => chunk.length > 30);
  }

  async chat(question: string): Promise<string> {
    try {
      console.log(`💬 سؤال: ${question}`);

      
      const relevantChunks = this.searchInRegulations(question);
      
      if (relevantChunks.length > 0) {
        const response = this.generateRegulationResponse(question, relevantChunks);
        this.addToHistory('user', question);
        this.addToHistory('assistant', response);
        return response;
      }

      
      const academicResponse = this.searchAcademicData(question);
      if (academicResponse) {
        this.addToHistory('user', question);
        this.addToHistory('assistant', academicResponse);
        return academicResponse;
      }

      
      const response = 'لا يمكنني العثور على هذه المعلومة في الوثائق المتاحة. يرجى التأكد من أن سؤالك يتعلق بالمعلومات الموجودة في اللوائح الجامعية أو إعادة صياغة السؤال بطريقة أخرى.';
      this.addToHistory('user', question);
      this.addToHistory('assistant', response);
      return response;

    } catch (error) {
      console.error('خطأ في المحادثة:', error);
      return 'حدث خطأ تقني، يرجى المحاولة مرة أخرى.';
    }
  }

  private searchAcademicData(question: string): string | null {
    const q = question.toLowerCase();
    const normalizedQ = this.normalizeArabicText(q);
    
    
    if (normalizedQ.includes('مواد') || normalizedQ.includes('مقررات') || normalizedQ.includes('كورسات')) {
      
      
      if (normalizedQ.includes('أساسية') || normalizedQ.includes('الأساسية') || normalizedQ.includes('علوم أساسية')) {
        return this.formatBasicScienceCourses();
      }
      
      if (normalizedQ.includes('اقتصاد') || normalizedQ.includes('economics') || normalizedQ.includes('اقتصادية')) {
        return this.formatEconomicsCourses();
      }
      
      
      if (normalizedQ.includes('أولى') || normalizedQ.includes('الأولى') || normalizedQ.includes('سنة 1') || normalizedQ.includes('سنه 1')) {
        return this.formatCoursesResponse('السنة الأولى');
      }
      if (normalizedQ.includes('ثانية') || normalizedQ.includes('الثانية') || normalizedQ.includes('سنة 2') || normalizedQ.includes('سنه 2')) {
        return this.formatCoursesResponse('السنة الثانية');
      }
      if (normalizedQ.includes('ثالثة') || normalizedQ.includes('الثالثة') || normalizedQ.includes('سنة 3') || normalizedQ.includes('سنه 3')) {
        return this.formatCoursesResponse('السنة الثالثة');
      }
      if (normalizedQ.includes('رابعة') || normalizedQ.includes('الرابعة') || normalizedQ.includes('سنة 4') || normalizedQ.includes('سنه 4')) {
        return this.formatCoursesResponse('السنة الرابعة');
      }
      
      
      if (normalizedQ.includes('علوم الحاسوب') || normalizedQ.includes('علوم الحاسب') || normalizedQ.includes('حاسوب')) {
        return this.formatDepartmentCourses('علوم الحاسوب');
      }
    }

    
    if (normalizedQ.includes('مقرر') || normalizedQ.includes('مادة')) {
      const courseResults = AcademicDataHelper.searchCourses(q);
      if (courseResults.length > 0) {
        return this.formatCourseSearchResults(courseResults);
      }
    }

    
    if (normalizedQ.includes('تحويل') || normalizedQ.includes('transfer') || normalizedQ.includes('أحول') || 
        normalizedQ.includes('تغيير القسم') || normalizedQ.includes('انتقال') || normalizedQ.includes('كيف أحول') ||
        (normalizedQ.includes('حول') && normalizedQ.includes('قسم'))) {
      return this.formatTransferInfo();
    }

    
    if (normalizedQ.includes('قسم') || normalizedQ.includes('تخصص') || normalizedQ.includes('أقسام')) {
      if (normalizedQ.includes('حاسوب') || normalizedQ.includes('علوم الحاسوب')) {
        return this.formatDepartmentInfo('علوم الحاسوب');
      }
      if (normalizedQ.includes('هندسة البرمجيات') || normalizedQ.includes('برمجيات')) {
        return this.formatDepartmentInfo('هندسة البرمجيات');
      }
      if (normalizedQ.includes('ذكاء اصطناعي') || normalizedQ.includes('الذكاء الاصطناعي')) {
        return this.formatDepartmentInfo('الذكاء الاصطناعي');
      }
      if (normalizedQ.includes('أمن المعلومات') || normalizedQ.includes('أمن')) {
        return this.formatDepartmentInfo('أمن المعلومات');
      }
      
      return this.formatAllDepartments();
    }


    if (q.includes('درجات') || q.includes('تقدير') || q.includes('نقاط') || q.includes('gpa') || 
        q.includes('حساب الدرجات') || q.includes('نظام التقييم') || q.includes('يتم حساب') ||
        q.includes('كيف يتم حساب') || q.includes('حساب') && (q.includes('درجة') || q.includes('معدل'))) {
      return this.formatGradingSystem();
    }


    if (q.includes('شروط القبول') || q.includes('قبول') || q.includes('التحاق')) {
      return this.formatAdmissionRequirements();
    }


    if (q.includes('حضور') || q.includes('غياب') || q.includes('attendance')) {
      return this.formatAttendanceRules();
    }


    if (q.includes('امتحان') || q.includes('اختبار') || q.includes('exam')) {
      return this.formatExaminationRules();
    }


    if (q.includes('تخرج') || q.includes('graduation')) {
      return this.formatGraduationRequirements();
    }


    if (q.includes('رسوم') || q.includes('مصاريف') || q.includes('fees')) {
      return this.formatFeesInfo();
    }

    return null;
  }

  private formatCoursesResponse(year: string): string | null {
    const yearData = AcademicDataHelper.getCoursesByYear(year);
    if (!yearData) return null;

    let response = `📚 مقررات ${year}:\n\n`;
    
    Object.entries(yearData).forEach(([semester, courses]) => {
      response += `🔹 ${semester}:\n`;
      courses.forEach(course => {
        response += `   • ${course.name} (${course.code}) - ${course.hours} ساعات - ${course.type}\n`;
      });
      response += '\n';
    });

    response += '📄 المصدر: اللوائح الأكاديمية لجامعة أسيوط القومية';
    return response;
  }

  private formatCourseSearchResults(courses: any[]): string {
    let response = '🔍 نتائج البحث عن المقررات:\n\n';
    
    courses.slice(0, 5).forEach(course => {
      response += `📖 ${course.name} (${course.code})\n`;
      response += `   السنة: ${course.year}\n`;
      response += `   الفصل: ${course.semester}\n`;
      response += `   الساعات: ${course.hours}\n`;
      response += `   النوع: ${course.type}\n\n`;
    });

    response += '📄 المصدر: اللوائح الأكاديمية لجامعة أسيوط القومية';
    return response;
  }

  private formatDepartmentInfo(deptName: string): string | null {
    const dept = AcademicDataHelper.getDepartmentInfo(deptName);
    if (!dept) return null;

    return `🏛️ معلومات قسم ${deptName}:\n\n` +
           `🔹 الكود: ${dept.code}\n` +
           `🔹 إجمالي الساعات المطلوبة: ${dept.totalHours} ساعة معتمدة\n` +
           `🔹 الوصف: ${dept.description}\n\n` +
           '📄 المصدر: اللوائح الأكاديمية لجامعة أسيوط القومية';
  }

  private formatAllDepartments(): string {
    let response = '🏛️ أقسام كلية الحاسبات والذكاء الاصطناعي:\n\n';
    
    Object.entries(ACADEMIC_DATA.departments).forEach(([name, info]) => {
      response += `🔹 ${name} (${(info as any).code})\n`;
      response += `   ${(info as any).description}\n\n`;
    });

    response += '📄 المصدر: اللوائح الأكاديمية لجامعة أسيوط القومية';
    return response;
  }

  private formatGradingSystem(): string {
    const grading = AcademicDataHelper.getGradingInfo();
    
    let response = '📊 نظام الدرجات والتقييم:\n\n';
    
    Object.entries(grading.scale).forEach(([grade, info]) => {
      response += `🔹 ${grade}: ${(info as any).range}% = ${(info as any).points} نقاط (${(info as any).grade})\n`;
    });
    
    response += `\n📐 طريقة الحساب:\n${grading.calculation}\n\n`;
    response += '📄 المصدر: اللوائح الأكاديمية لجامعة أسيوط القومية';
    
    return response;
  }

  private formatAdmissionRequirements(): string {
    const admission = AcademicDataHelper.getAdmissionInfo();
    
    let response = '📋 شروط القبول:\n\n';
    
    admission.requirements.forEach((req: string, index: number) => {
      response += `${index + 1}. ${req}\n`;
    });
    
    response += '\n📄 الأوراق المطلوبة:\n';
    admission.documents.forEach((doc: string, index: number) => {
      response += `${index + 1}. ${doc}\n`;
    });
    
    response += '\n📄 المصدر: اللوائح الأكاديمية لجامعة أسيوط القومية';
    return response;
  }

  private formatAttendanceRules(): string {
    const attendance = AcademicDataHelper.getAttendanceRules();
    
    let response = `📅 قوانين الحضور والغياب:\n\n`;
    response += `🔹 الحد الأدنى للحضور: ${attendance.minimumAttendance}\n\n`;
    response += '📋 القوانين:\n';
    
    attendance.rules.forEach((rule: string, index: number) => {
      response += `${index + 1}. ${rule}\n`;
    });
    
    response += '\n📄 المصدر: اللوائح الأكاديمية لجامعة أسيوط القومية';
    return response;
  }

  private formatExaminationRules(): string {
    const exam = AcademicDataHelper.getExaminationRules();
    
    let response = '📝 نظام الامتحانات:\n\n';
    response += '📊 توزيع الدرجات:\n';
    
    Object.entries(exam.components).forEach(([component, percentage]) => {
      response += `🔹 ${component}: ${percentage}\n`;
    });
    
    response += '\n📋 قوانين الامتحانات:\n';
    exam.rules.forEach((rule: string, index: number) => {
      response += `${index + 1}. ${rule}\n`;
    });
    
    response += '\n📄 المصدر: اللوائح الأكاديمية لجامعة أسيوط القومية';
    return response;
  }

  private formatGraduationRequirements(): string {
    const graduation = AcademicDataHelper.getGraduationRequirements();
    
    let response = '🎓 شروط التخرج:\n\n';
    
    graduation.requirements.forEach((req: string, index: number) => {
      response += `${index + 1}. ${req}\n`;
    });
    
    response += '\n🏆 مراتب الشرف:\n';
    Object.entries(graduation.honors).forEach(([honor, requirement]) => {
      response += `🔹 ${honor}: ${requirement}\n`;
    });
    
    response += '\n📄 المصدر: اللوائح الأكاديمية لجامعة أسيوط القومية';
    return response;
  }

  private formatFeesInfo(): string {
    const fees = AcademicDataHelper.getFeesInfo();
    
    let response = '💰 الرسوم الدراسية:\n\n';
    response += '📚 الرسوم الأساسية:\n';
    
    Object.entries(fees.tuition).forEach(([fee, amount]) => {
      response += `🔹 ${fee}: ${amount}\n`;
    });
    
    response += '\n💳 الرسوم الإضافية:\n';
    Object.entries(fees.additional).forEach(([fee, amount]) => {
      response += `🔹 ${fee}: ${amount}\n`;
    });
    
    response += '\n📄 المصدر: اللوائح الأكاديمية لجامعة أسيوط القومية';
    return response;
  }

  private formatTransferInfo(): string {
    const transfer = AcademicDataHelper.getTransferInfo();
    
    let response = '🔄 شروط التحويل بين الأقسام:\n\n';
    
    transfer.conditions.forEach((condition: string, index: number) => {
      response += `${index + 1}. ${condition}\n`;
    });
    
    response += '\n📋 الأوراق المطلوبة:\n';
    transfer.documents.forEach((doc: string, index: number) => {
      response += `${index + 1}. ${doc}\n`;
    });
    
    response += '\n📄 المصدر: اللوائح الأكاديمية لجامعة أسيوط القومية';
    return response;
  }

  private formatBasicScienceCourses(): string {
    let response = '📚 مقررات العلوم الأساسية:\n\n';
    
    
    const basicScienceCourses = [
      { year: 'السنة الأولى', courses: ['الرياضيات الأساسية', 'الفيزياء العامة', 'اللغة الإنجليزية', 'اللغة العربية', 'مبادئ الاقتصاد'] },
      { year: 'السنة الثانية', courses: ['الرياضيات المتقدمة', 'الإحصاء والاحتمالات', 'الفيزياء التطبيقية'] },
      { year: 'السنة الثالثة', courses: ['الرياضيات التطبيقية'] },
      { year: 'السنة الرابعة', courses: ['أخلاقيات الحاسوب'] }
    ];
    
    basicScienceCourses.forEach(yearData => {
      response += `🔹 ${yearData.year}:\n`;
      yearData.courses.forEach(course => {
        response += `   • ${course}\n`;
      });
      response += '\n';
    });
    
    response += '📄 المصدر: اللوائح الأكاديمية لجامعة أسيوط القومية';
    return response;
  }

  private formatEconomicsCourses(): string {
    let response = '💰 مقررات الاقتصاد:\n\n';
    
    const economicsCourses = [
      { code: 'ECON101', name: 'مبادئ الاقتصاد', year: 'السنة الأولى', hours: 2, type: 'إجباري' },
      { code: 'ECON102', name: 'اقتصاد الحاسوب', year: 'السنة الأولى', hours: 2, type: 'اختياري' },
      { code: 'ECON201', name: 'اقتصاد الحاسوب المتقدم', year: 'السنة الثانية', hours: 2, type: 'اختياري' },
      { code: 'ECON301', name: 'اقتصاديات التكنولوجيا', year: 'السنة الثالثة', hours: 2, type: 'اختياري' }
    ];
    
    economicsCourses.forEach(course => {
      response += `📖 ${course.name} (${course.code})\n`;
      response += `   السنة: ${course.year}\n`;
      response += `   الساعات: ${course.hours}\n`;
      response += `   النوع: ${course.type}\n\n`;
    });
    
    response += '📄 المصدر: اللوائح الأكاديمية لجامعة أسيوط القومية';
    return response;
  }

  private formatDepartmentCourses(department: string): string {
    let response = `📚 مقررات قسم ${department}:\n\n`;
    
    if (department === 'علوم الحاسوب') {
      const csCourses = [
        'مقدمة في البرمجة',
        'البرمجة الشيئية', 
        'هياكل البيانات',
        'الخوارزميات',
        'قواعد البيانات',
        'شبكات الحاسوب',
        'هندسة البرمجيات',
        'الذكاء الاصطناعي',
        'أمن المعلومات',
        'مشروع التخرج'
      ];
      
      csCourses.forEach((course, index) => {
        response += `${index + 1}. ${course}\n`;
      });
    }
    
    response += '\n📄 المصدر: اللوائح الأكاديمية لجامعة أسيوط القومية';
    return response;
  }

  private checkGeneralKnowledge(question: string): string | null {
    const q = question.toLowerCase();
    

    if (q.includes('كيف حالك') || q.includes('كيف الحال') || q.includes('إزيك') || q.includes('how are you')) {
      return 'الحمد لله، أنا بخير وجاهز لمساعدتك! كيف يمكنني مساعدتك اليوم؟ يمكنني الإجابة على أسئلتك الأكاديمية أو العامة.';
    }
    
    if (q.includes('ما اسمك') || q.includes('what is your name')) {
      return 'أنا مساعد ذكي لجامعة أسيوط القومية. يمكنني مساعدتك في الاستفسارات الأكاديمية والأسئلة العامة أيضاً.';
    }
    
    if (q.includes('شكرا') || q.includes('شكراً') || q.includes('thank you')) {
      return 'العفو! أنا سعيد لمساعدتك. إذا كان لديك أي أسئلة أخرى، لا تتردد في السؤال.';
    }


    if (q.includes('ذكاء اصطناعي') || q.includes('الذكاء الاصطناعي') || q.includes('artificial intelligence') || q.includes('ai')) {
      return 'الذكاء الاصطناعي هو مجال في علوم الحاسوب يهدف إلى إنشاء أنظمة قادرة على أداء مهام تتطلب ذكاءً بشرياً، مثل التعلم والتفكير واتخاذ القرارات. يشمل تقنيات مثل التعلم الآلي، معالجة اللغات الطبيعية، والرؤية الحاسوبية.';
    }
    
    if ((q.includes('برمجة') || q.includes('programming') || q.includes('البرمجة')) && !q.includes('مقرر') && !q.includes('مادة')) {
      return 'البرمجة هي عملية كتابة تعليمات للحاسوب لأداء مهام محددة باستخدام لغات البرمجة مثل Python، Java، C++، وغيرها. تتضمن البرمجة حل المشاكل، تصميم الخوارزميات، وكتابة الكود.';
    }
    
    if ((q.includes('قواعد البيانات') || q.includes('database') || q.includes('قاعدة البيانات')) && !q.includes('مقرر') && !q.includes('مادة')) {
      return 'قواعد البيانات هي أنظمة منظمة لتخزين واسترجاع وإدارة البيانات. تستخدم لغة SQL للاستعلام عن البيانات، وتشمل أنواعاً مثل قواعد البيانات العلائقية (MySQL, PostgreSQL) وغير العلائقية (MongoDB).';
    }
    
    if ((q.includes('شبكات') || q.includes('network') || q.includes('شبكة') || q.includes('شبكات الحاسوب')) && !q.includes('مقرر') && !q.includes('مادة')) {
      return 'شبكات الحاسوب هي مجموعة من الأجهزة المترابطة التي تتيح تبادل البيانات والموارد. تشمل الشبكات المحلية (LAN)، الواسعة (WAN)، والإنترنت، وتستخدم بروتوكولات مثل TCP/IP.';
    }
    
    if ((q.includes('أمن المعلومات') || q.includes('cybersecurity') || q.includes('الأمن السيبراني')) && 
        !q.includes('قسم') && !q.includes('تخصص') && !q.includes('مقرر')) {
      return 'أمن المعلومات هو حماية البيانات والأنظمة من التهديدات السيبرانية. يشمل التشفير، جدران الحماية، كشف التسلل، وإدارة الهويات والصلاحيات لضمان سرية وسلامة وتوفر المعلومات.';
    }


    if (q.includes('كيف أتعلم البرمجة') || q.includes('تعلم البرمجة') || q.includes('learn programming')) {
      return 'لتعلم البرمجة:\n1. ابدأ بلغة سهلة مثل Python\n2. تعلم الأساسيات (المتغيرات، الحلقات، الشروط)\n3. مارس حل المشاكل البسيطة\n4. اعمل على مشاريع صغيرة\n5. انضم لمجتمعات البرمجة\n6. استمر في التعلم والممارسة';
    }
    
    if (q.includes('كيف أحسن') && q.includes('أداء') && q.includes('أكاديمي')) {
      return 'لتحسين الأداء الأكاديمي:\n1. ضع جدولاً زمنياً للدراسة\n2. اختر بيئة دراسة مناسبة\n3. استخدم تقنيات الدراسة الفعالة\n4. خذ فترات راحة منتظمة\n5. اطلب المساعدة عند الحاجة\n6. راجع المواد بانتظام';
    }


    if (q.includes('لون السماء') || q.includes('color of sky')) {
      return 'السماء زرقاء اللون في الأحوال العادية، وذلك بسبب تشتت ضوء الشمس في الغلاف الجوي. قد تتغير ألوان السماء حسب الوقت والطقس.';
    }
    
    if (q.includes('عدد أيام الأسبوع') || q.includes('days in week') || q.includes('كم يوم في الأسبوع')) {
      return 'الأسبوع يحتوي على 7 أيام: السبت، الأحد، الاثنين، الثلاثاء، الأربعاء، الخميس، والجمعة.';
    }
    
    if (q.includes('عدد شهور السنة') || q.includes('months in year')) {
      return 'السنة تحتوي على 12 شهراً: يناير، فبراير، مارس، أبريل، مايو، يونيو، يوليو، أغسطس، سبتمبر، أكتوبر، نوفمبر، وديسمبر.';
    }

    return null;
  }

  private isGreeting(question: string): boolean {
    const q = question.toLowerCase().trim();
    const greetings = [
      'مرحبا', 'مرحباً', 'أهلا', 'أهلاً', 'السلام عليكم', 'سلام',
      'صباح الخير', 'مساء الخير', 'hello', 'hi', 'hey', 'good morning',
      'good evening', 'good afternoon', 'هاي', 'هلو'
    ];
    

    if (greetings.some(greeting => q.includes(greeting))) {
      return true;
    }
    

    if (q === 'مرحبا' || q === 'أهلا' || q === 'سلام' || q === 'hi' || q === 'hello') {
      return true;
    }
    
    return false;
  }

  private generateGreetingResponse(): string {
    return 'مرحباً بك في نظام الاستعلامات الأكاديمية لجامعة أسيوط القومية! 🎓\n\n' +
           'أنا مساعد ذكي يمكنني مساعدتك في:\n\n' +
           '📚 **الاستفسارات الأكاديمية:**\n' +
           '• شروط القبول والتسجيل\n' +
           '• المقررات والمناهج الدراسية\n' +
           '• أنظمة الامتحانات والدرجات\n' +
           '• قوانين الحضور والغياب\n' +
           '• إجراءات التخرج والتحويل\n\n' +
           '💡 **الأسئلة العامة:**\n' +
           '• أسئلة تقنية ومعلوماتية\n' +
           '• نصائح دراسية وأكاديمية\n' +
           '• معلومات عامة\n\n' +
           'اسأل عن أي شيء تريد معرفته! 😊';
  }

  private isUniversityQuestion(question: string): boolean {
    const q = question.toLowerCase();
    
    const keywords = [

      'جامعة', 'كلية', 'طالب', 'طلاب', 'دراسة', 'تسجيل', 'قبول',
      'امتحان', 'اختبار', 'درجة', 'معدل', 'مقرر', 'مادة', 'فصل', 'سنة',
      'حضور', 'غياب', 'تخرج', 'شهادة', 'رسوم', 'مصاريف', 'تحويل', 'قسم',
      'تخصص', 'مشروع', 'تدريب', 'لائحة', 'قانون', 'شروط',
      

      'أسيوط', 'حاسبات', 'ذكاء اصطناعي', 'هندسة برمجيات', 'أمن المعلومات',
      

      'مواد', 'كورسات', 'ساعات معتمدة', 'نقاط', 'تقدير', 'gpa',
      'أولى', 'ثانية', 'ثالثة', 'رابعة', 'الأولى', 'الثانية', 'الثالثة', 'الرابعة',
      'سنه', 'فصل دراسي', 'ترم', 'semester',
      

      'التحاق', 'انسحاب', 'إيقاف', 'تأجيل', 'استئناف', 'مكافآت',
      'منح', 'قروض', 'سكن', 'مواصلات', 'بطاقة طالب',
      

      'محاضرة', 'عملي', 'معمل', 'lab', 'واجب', 'assignment', 'بحث',
      'presentation', 'عرض', 'مناقشة', 'حلقة بحث'
    ];
    

    if ((q.includes('حساب') || q.includes('يتم حساب')) && 
        (q.includes('درجة') || q.includes('درجات') || q.includes('معدل') || q.includes('نقاط'))) {
      return true;
    }
    
    return keywords.some(keyword => q.includes(keyword)) ||
           q.includes('من أنت') || q.includes('ماذا تستطيع');
  }

  private searchInRegulations(question: string): DocumentChunk[] {
    if (this.documentChunks.length === 0) {
      return [];
    }

    const q = question.toLowerCase();
    
    
    const normalizedQuestion = this.normalizeArabicText(q);
    const searchTerms = normalizedQuestion.split(' ').filter(term => term.length > 2);
    
    
    const spellingCorrections = this.getSpellingCorrections(normalizedQuestion);
    
    const scoredChunks = this.documentChunks.map(chunk => {
      let score = 0;
      const chunkLower = this.normalizeArabicText(chunk.content.toLowerCase());
      
      
      for (const term of searchTerms) {
        if (chunkLower.includes(term)) {
          score += 2;
        }
        
        
        if (this.fuzzyMatch(term, chunkLower)) {
          score += 1;
        }
      }
      
      
      for (const correction of spellingCorrections) {
        if (chunkLower.includes(correction)) {
          score += 3;
        }
      }
      
      
      const specificMappings = [
        
        { 
          patterns: ['مقررات', 'مواد', 'كورسات', 'مقرر', 'مادة'], 
          targets: ['مقررات', 'المقررات الأساسية', 'مواد', 'كورس'],
          weight: 15,
          context: 'courses'
        },
        
        {
          patterns: ['أولى', 'الأولى', 'سنة 1', 'سنه 1', 'اول', 'الاول'],
          targets: ['أولى', 'الأولى', 'السنة الأولى'],
          weight: 12,
          context: 'year1'
        },
        {
          patterns: ['ثانية', 'الثانية', 'سنة 2', 'سنه 2', 'ثاني', 'الثاني'],
          targets: ['ثانية', 'الثانية', 'السنة الثانية'],
          weight: 12,
          context: 'year2'
        },
        {
          patterns: ['ثالثة', 'الثالثة', 'سنة 3', 'سنه 3', 'ثالث', 'الثالث'],
          targets: ['ثالثة', 'الثالثة', 'السنة الثالثة'],
          weight: 12,
          context: 'year3'
        },
        {
          patterns: ['رابعة', 'الرابعة', 'سنة 4', 'سنه 4', 'رابع', 'الرابع'],
          targets: ['رابعة', 'الرابعة', 'السنة الرابعة'],
          weight: 12,
          context: 'year4'
        },
        
        {
          patterns: ['علوم الحاسوب', 'علوم الحاسب', 'حاسوب', 'حاسب', 'computer science'],
          targets: ['علوم الحاسوب', 'علوم الحاسب', 'قسم علوم الحاسوب'],
          weight: 15,
          context: 'cs'
        },
        {
          patterns: ['هندسة البرمجيات', 'برمجيات', 'software engineering'],
          targets: ['هندسة البرمجيات', 'البرمجيات', 'قسم هندسة البرمجيات'],
          weight: 15,
          context: 'se'
        },
        
        {
          patterns: ['أساسية', 'الأساسية', 'علوم أساسية', 'العلوم الأساسية', 'basic'],
          targets: ['أساسية', 'الأساسية', 'علوم أساسية', 'المقررات الأساسية'],
          weight: 15,
          context: 'basic'
        },
        {
          patterns: ['اقتصاد', 'economics', 'اقتصادية'],
          targets: ['اقتصاد', 'economics', 'الاقتصاد'],
          weight: 15,
          context: 'economics'
        }
      ];
      
      
      for (const mapping of specificMappings) {
        const questionHasPattern = mapping.patterns.some(pattern => 
          normalizedQuestion.includes(pattern)
        );
        
        if (questionHasPattern) {
          const chunkHasTarget = mapping.targets.some(target => 
            chunkLower.includes(target)
          );
          
          if (chunkHasTarget) {
            score += mapping.weight;
            
            
            if (mapping.context === 'courses' && chunkLower.includes('المقررات الأساسية')) {
              score += 10;
            }
            if (mapping.context === 'basic' && chunkLower.includes('علوم أساسية')) {
              score += 10;
            }
          }
        }
      }
      
      
      if (normalizedQuestion.includes('شروط القبول') && chunkLower.includes('اللبول')) score += 25;
      if (normalizedQuestion.includes('تسجيل المقررات') && chunkLower.includes('الدسجيل')) score += 25;
      if (normalizedQuestion.includes('معدل تراكمي') && chunkLower.includes('االإعذٌ التراهمي')) score += 25;
      if (normalizedQuestion.includes('مشروع التخرج') && chunkLower.includes('مشروع التخرج')) score += 25;
      
      
      const keywordMappings = [
        { variants: ['حضور', 'حضر', 'الحضور'], weight: 8 },
        { variants: ['غياب', 'غيب', 'الغياب'], weight: 8 },
        { variants: ['امتحان', 'اختبار', 'امتحانات', 'اختبارات'], weight: 8 },
        { variants: ['تخرج', 'التخرج', 'خريج'], weight: 8 },
        { variants: ['رسوم', 'مصاريف', 'الرسوم'], weight: 8 },
        { variants: ['درجة', 'درجات', 'نقاط', 'تقدير'], weight: 8 },
        { variants: ['تحويل', 'التحويل', 'نقل'], weight: 8 },
        { variants: ['طالب', 'طلاب', 'الطالب'], weight: 4 },
        { variants: ['كلية', 'الكلية'], weight: 4 },
        { variants: ['جامعة', 'الجامعة'], weight: 4 },
        { variants: ['قسم', 'أقسام', 'القسم'], weight: 4 }
      ];
      
      for (const mapping of keywordMappings) {
        for (const variant of mapping.variants) {
          if (normalizedQuestion.includes(variant) && chunkLower.includes(variant)) {
            score += mapping.weight;
          }
        }
      }
      
      return { chunk, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);

    console.log(`🔍 البحث في ${this.documentChunks.length} قطعة، وجد ${scoredChunks.length} نتائج ذات صلة`);
    
    
    if (scoredChunks.length > 0) {
      console.log(`🏆 أعلى النتائج:`);
      scoredChunks.slice(0, 3).forEach((item, index) => {
        console.log(`${index + 1}. النقاط: ${item.score}, المحتوى: ${item.chunk.content.substring(0, 100)}...`);
      });
    }
    
    
    return scoredChunks.slice(0, 3).map(item => item.chunk);
  }

  private normalizeArabicText(text: string): string {
    return text

      .replace(/[أإآ]/g, 'ا')
      .replace(/[ة]/g, 'ه')
      .replace(/[ى]/g, 'ي')
      .replace(/[ؤ]/g, 'و')
      .replace(/[ئ]/g, 'ي')

      .replace(/[\u064B-\u065F]/g, '')

      .replace(/\s+/g, ' ')
      .trim();
  }

  private getSpellingCorrections(question: string): string[] {
    const corrections: string[] = [];
    

    const misspellings = {
      'حضر': 'حضور',
      'غيب': 'غياب', 
      'امتحن': 'امتحان',
      'درجه': 'درجة',
      'مقرات': 'مقررات',
      'تسجل': 'تسجيل',
      'قبل': 'قبول',
      'تخرج': 'تخرج',
      'رسم': 'رسوم',
      'مصرف': 'مصاريف'
    };
    
    for (const [misspelled, correct] of Object.entries(misspellings)) {
      if (question.includes(misspelled)) {
        corrections.push(correct);
      }
    }
    
    return corrections;
  }

  private fuzzyMatch(term: string, text: string): boolean {
    if (term.length < 3) return false;
    

    const threshold = 0.8;
    const termChars = term.split('');
    let matches = 0;
    
    for (const char of termChars) {
      if (text.includes(char)) {
        matches++;
      }
    }
    
    return (matches / termChars.length) >= threshold;
  }

  private generateRegulationResponse(question: string, relevantChunks: DocumentChunk[]): string {
    const context = relevantChunks
      .map(chunk => chunk.content)
      .join('\n\n');

    
    if (!context.trim()) {
      return 'لا يمكنني العثور على هذه المعلومة في الوثائق المتاحة.';
    }

    
    console.log(`📄 تم استرجاع ${relevantChunks.length} قطع نصية ذات صلة`);
    console.log(`📝 طول السياق: ${context.length} حرف`);
    console.log(`📋 أول 200 حرف من المحتوى: ${context.substring(0, 200)}...`);

    let response = 'بناءً على الوثائق المسترجعة من اللوائح الجامعية:\n\n';
    
    
    const cleanContext = context
      .replace(/\s+/g, ' ')  
      .trim();
    
    
    if (cleanContext.length > 3000) {
      
      const paragraphs = cleanContext.split(/\n\n+/);
      let formattedContext = '';
      
      for (const paragraph of paragraphs) {
        if (formattedContext.length + paragraph.length < 2500) {
          formattedContext += paragraph.trim() + '\n\n';
        } else {
          break;
        }
      }
      
      
      if (formattedContext.length < 500) {
        const sentences = cleanContext.split(/[.!?؟]\s+/);
        formattedContext = '';
        
        for (const sentence of sentences) {
          const nextLength = formattedContext.length + sentence.length + 2;
          if (nextLength < 2500 && sentence.trim().length > 10) {
            formattedContext += sentence.trim();
            if (!sentence.trim().match(/[.!؟]$/)) {
              formattedContext += '.';
            }
            formattedContext += '\n\n';
          } else if (formattedContext.length > 500) {
            break;
          }
        }
      }
      
      response += formattedContext.trim();
      
      
      const remainingLength = cleanContext.length - formattedContext.length;
      if (remainingLength > 500) {
        response += '\n\n[يوجد المزيد من التفاصيل في اللوائح الكاملة...]';
      }
    } else {
      
      response += cleanContext;
    }
    
    response += '\n\n📄 المصدر: اللوائح الجامعية لجامعة أسيوط القومية';
    
    return response;
  }

  private generateGeneralResponse(question: string): string {
    const q = question.toLowerCase();
    

    if (q.includes('كيف حالك') || q.includes('كيف الحال') || q.includes('إزيك') || q.includes('how are you')) {
      return 'الحمد لله، أنا بخير وجاهز لمساعدتك! كيف يمكنني مساعدتك اليوم؟ يمكنني الإجابة على أسئلتك الأكاديمية أو العامة.';
    }
    
    if (q.includes('ما اسمك') || q.includes('what is your name')) {
      return 'أنا مساعد ذكي لجامعة أسيوط القومية. يمكنني مساعدتك في الاستفسارات الأكاديمية والأسئلة العامة أيضاً.';
    }
    
    if (q.includes('شكرا') || q.includes('شكراً') || q.includes('thank you')) {
      return 'العفو! أنا سعيد لمساعدتك. إذا كان لديك أي أسئلة أخرى، لا تتردد في السؤال.';
    }
    

    if (q.includes('ما هو') || q.includes('اشرح') || q.includes('what is') || q.includes('explain')) {
      return this.generateKnowledgeResponse(question);
    }
    
    if (q.includes('كيف') && !q.includes('جامعة') && !q.includes('كلية')) {
      return this.generateHowToResponse(question);
    }
    

    return 'هذا سؤال عام مثير للاهتمام! بينما أنا متخصص في شؤون جامعة أسيوط القومية، يمكنني محاولة مساعدتك. ' +
           'للحصول على إجابة أكثر تفصيلاً حول هذا الموضوع، أنصحك بالبحث في مصادر متخصصة. ' +
           'هل لديك أي أسئلة أكاديمية يمكنني مساعدتك فيها؟';
  }

  private generateKnowledgeResponse(question: string): string {
    const q = question.toLowerCase();
    

    if (q.includes('ذكاء اصطناعي') || q.includes('الذكاء الاصطناعي') || q.includes('artificial intelligence') || q.includes('ai')) {
      return 'الذكاء الاصطناعي هو مجال في علوم الحاسوب يهدف إلى إنشاء أنظمة قادرة على أداء مهام تتطلب ذكاءً بشرياً، مثل التعلم والتفكير واتخاذ القرارات. يشمل تقنيات مثل التعلم الآلي، معالجة اللغات الطبيعية، والرؤية الحاسوبية.';
    }
    
    if (q.includes('برمجة') || q.includes('programming') || q.includes('البرمجة')) {
      return 'البرمجة هي عملية كتابة تعليمات للحاسوب لأداء مهام محددة باستخدام لغات البرمجة مثل Python، Java، C++، وغيرها. تتضمن البرمجة حل المشاكل، تصميم الخوارزميات، وكتابة الكود.';
    }
    
    if (q.includes('قواعد البيانات') || q.includes('database') || q.includes('قاعدة البيانات')) {
      return 'قواعد البيانات هي أنظمة منظمة لتخزين واسترجاع وإدارة البيانات. تستخدم لغة SQL للاستعلام عن البيانات، وتشمل أنواعاً مثل قواعد البيانات العلائقية (MySQL, PostgreSQL) وغير العلائقية (MongoDB).';
    }
    
    if (q.includes('شبكات') || q.includes('network') || q.includes('شبكة') || q.includes('شبكات الحاسوب')) {
      return 'شبكات الحاسوب هي مجموعة من الأجهزة المترابطة التي تتيح تبادل البيانات والموارد. تشمل الشبكات المحلية (LAN)، الواسعة (WAN)، والإنترنت، وتستخدم بروتوكولات مثل TCP/IP.';
    }
    
    if ((q.includes('أمن المعلومات') || q.includes('cybersecurity') || q.includes('أمن') || q.includes('الأمن')) && 
        !q.includes('قسم') && !q.includes('تخصص')) {
      return 'أمن المعلومات هو حماية البيانات والأنظمة من التهديدات السيبرانية. يشمل التشفير، جدران الحماية، كشف التسلل، وإدارة الهويات والصلاحيات لضمان سرية وسلامة وتوفر المعلومات.';
    }
    

    if (q.includes('لون السماء') || q.includes('color of sky')) {
      return 'السماء زرقاء اللون في الأحوال العادية، وذلك بسبب تشتت ضوء الشمس في الغلاف الجوي. قد تتغير ألوان السماء حسب الوقت والطقس.';
    }
    
    if (q.includes('عدد أيام الأسبوع') || q.includes('days in week')) {
      return 'الأسبوع يحتوي على 7 أيام: السبت، الأحد، الاثنين، الثلاثاء، الأربعاء، الخميس، والجمعة.';
    }
    
    if (q.includes('عدد شهور السنة') || q.includes('months in year')) {
      return 'السنة تحتوي على 12 شهراً: يناير، فبراير، مارس، أبريل، مايو، يونيو، يوليو، أغسطس، سبتمبر، أكتوبر، نوفمبر، وديسمبر.';
    }
    return `هذا سؤال مثير للاهتمام حول "${question}". بينما أنا متخصص في الشؤون الأكاديمية، يمكنني القول أن هذا موضوع يستحق البحث والدراسة. أنصحك بالرجوع إلى مصادر متخصصة للحصول على معلومات مفصلة.`;
  }

  private generateHowToResponse(question: string): string {
    const q = question.toLowerCase();
    
    if (q.includes('تعلم البرمجة') || q.includes('learn programming')) {
      return 'لتعلم البرمجة:\n1. ابدأ بلغة سهلة مثل Python\n2. تعلم الأساسيات (المتغيرات، الحلقات، الشروط)\n3. مارس حل المشاكل البسيطة\n4. اعمل على مشاريع صغيرة\n5. انضم لمجتمعات البرمجة\n6. استمر في التعلم والممارسة';
    }
    
    if (q.includes('تحسين الأداء') || q.includes('improve performance')) {
      return 'لتحسين الأداء الأكاديمي:\n1. ضع جدولاً زمنياً للدراسة\n2. اختر بيئة دراسة مناسبة\n3. استخدم تقنيات الدراسة الفعالة\n4. خذ فترات راحة منتظمة\n5. اطلب المساعدة عند الحاجة\n6. راجع المواد بانتظام';
    }
    
    return `سؤال جيد حول "${question}". هذا يتطلب شرحاً مفصلاً قد يكون خارج نطاق تخصصي الأساسي في الشؤون الأكاديمية. أنصحك بالبحث في مصادر متخصصة أو استشارة خبراء في هذا المجال.`;
  }

  private generateUniversityFallback(question: string): string {
    return 'لا توجد معلومات كافية في الملفات المتاحة حول هذا الموضوع. يرجى مراجعة شؤون الطلبة للحصول على معلومات أكثر تفصيلاً، أو إعادة صياغة السؤال بطريقة أخرى.';
  }

  private addToHistory(role: 'user' | 'assistant', content: string) {
    this.conversationHistory.push({
      role,
      content,
      timestamp: new Date()
    });
    
    if (this.conversationHistory.length > 20) {
      this.conversationHistory = this.conversationHistory.slice(-20);
    }
  }

  clearHistory() {
    this.conversationHistory = [];
  }

  getHistory(): ChatMessage[] {
    return [...this.conversationHistory];
  }

  async searchDocuments(query: string, limit: number = 5) {
    const results = this.searchInRegulations(query);
    return results.slice(0, limit).map(chunk => ({
      content: chunk.content,
      metadata: chunk.metadata,
      relevanceScore: 0.8 
    }));
  }

  async getSystemStatus() {
    return {
      vectorStore: 'enhanced-keyword-search',
      documentsCount: this.documentChunks.length,
      academicDataLoaded: true,
      totalCourses: Object.values(ACADEMIC_DATA.courses).reduce((total, year) => {
        const yearData = year as any;
        return total + Object.values(yearData).reduce((yearTotal: number, semester) => {
          const semesterCourses = semester as any[];
          return yearTotal + semesterCourses.length;
        }, 0);
      }, 0),
      departments: Object.keys(ACADEMIC_DATA.departments).length,
      chatbot: this.isInitialized ? 'ready' : 'loading',
      model: 'hybrid-academic-search',
      embeddingModel: 'enhanced-keyword-matching'
    };
  }
}