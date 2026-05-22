import fs from 'fs';
import path from 'path';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export class SimpleRAG {
  private conversationHistory: ChatMessage[] = [];
  private documentsContent: string = '';
  private isInitialized: boolean = false;

  constructor() {

  }

  async initialize() {
    try {
      console.log('🚀 تهيئة نظام RAG البسيط...');
      

      await this.loadDocuments();
      
      this.isInitialized = true;
      console.log('✅ تم تهيئة النظام بنجاح');
    } catch (error) {
      console.log('⚠️ تهيئة بدون وثائق:', error);
      this.isInitialized = true;
    }
  }

  private async loadDocuments() {
    try {

      this.documentsContent = `
=== اللائحة العامة لجامعة أسيوط القومية ===

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
- رسوم مشروع التخرج: 3,000 جنيه مصري

=== لائحة كلية الحاسبات والذكاء الاصطناعي ===

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
`;

      console.log(`📚 تم تحميل ${this.documentsContent.length} حرف من الوثائق`);
      
    } catch (error) {
      console.error('خطأ في تحميل الوثائق:', error);
      this.documentsContent = '';
    }
  }

  async chat(question: string): Promise<string> {
    try {
      console.log(`💬 سؤال: ${question}`);


      if (!this.isUniversityQuestion(question)) {
        return 'أنا مساعد متخصص في شؤون جامعة أسيوط القومية فقط. يرجى سؤالي عن اللوائح والقوانين الجامعية أو الإجراءات الأكاديمية.';
      }


      const answer = this.searchInDocuments(question);
      
      if (answer) {
        this.addToHistory('user', question);
        this.addToHistory('assistant', answer);
        return answer;
      }


      const noAnswer = 'لا توجد معلومات كافية في الملفات المتاحة، يرجى مراجعة شؤون الطلبة.';
      this.addToHistory('user', question);
      this.addToHistory('assistant', noAnswer);
      return noAnswer;

    } catch (error) {
      console.error('خطأ في المحادثة:', error);
      return 'حدث خطأ تقني، يرجى المحاولة مرة أخرى.';
    }
  }

  private isUniversityQuestion(question: string): boolean {
    const q = question.toLowerCase();
    
    const keywords = [
      'جامعة', 'كلية', 'طالب', 'طلاب', 'دراسة', 'تسجيل', 'قبول', 
      'امتحان', 'درجة', 'معدل', 'مقرر', 'مادة', 'فصل', 'سنة',
      'حضور', 'غياب', 'تخرج', 'شهادة', 'رسوم', 'تحويل', 'قسم',
      'تخصص', 'مشروع', 'تدريب', 'لائحة', 'قانون', 'شروط'
    ];
    
    return keywords.some(keyword => q.includes(keyword)) || 
           q.includes('مرحبا') || q.includes('السلام') || 
           q.includes('من أنت') || q.includes('ماذا تستطيع');
  }

  private searchInDocuments(question: string): string | null {
    if (!this.documentsContent) {
      return null;
    }

    const q = question.toLowerCase();
    

    const searchTerms = q.split(' ').filter(term => term.length > 2);
    

    const sections = this.documentsContent.split('\n').filter(line => line.trim().length > 10);
    
    let bestMatches: Array<{text: string, score: number}> = [];
    

    for (const section of sections) {
      let score = 0;
      const lowerSection = section.toLowerCase();
      

      for (const term of searchTerms) {
        if (lowerSection.includes(term)) {
          score++;
        }
      }
      

      if (q.includes('شروط القبول') && lowerSection.includes('شروط القبول')) score += 3;
      if (q.includes('تسجيل') && lowerSection.includes('تسجيل')) score += 3;
      if (q.includes('معدل') && lowerSection.includes('معدل')) score += 3;
      if (q.includes('حضور') && lowerSection.includes('حضور')) score += 3;
      if (q.includes('غياب') && lowerSection.includes('غياب')) score += 3;
      if (q.includes('امتحان') && lowerSection.includes('امتحان')) score += 3;
      if (q.includes('تخرج') && lowerSection.includes('تخرج')) score += 3;
      if (q.includes('رسوم') && lowerSection.includes('رسوم')) score += 3;
      
      if (score > 0) {
        bestMatches.push({ text: section.trim(), score });
      }
    }
    

    bestMatches.sort((a, b) => b.score - a.score);
    
    if (bestMatches.length > 0) {

      const topResults = bestMatches.slice(0, 3);
      let response = 'بناءً على اللوائح الجامعية المعتمدة:\n\n';
      
      topResults.forEach((match, index) => {
        if (index > 0) response += '\n';
        response += `${match.text}`;
      });
      
      response += '\n\n📄 المصدر: اللوائح الجامعية لجامعة أسيوط القومية';
      return response;
    }
    

    if (q.includes('مرحبا') || q.includes('السلام')) {
      return 'مرحباً بك في نظام الاستعلامات الأكاديمية لجامعة أسيوط القومية.\n\nيمكنني مساعدتك في الاستفسار عن:\n• اللوائح والقوانين الجامعية\n• إجراءات التسجيل والقبول\n• أنظمة الامتحانات والدرجات\n• شروط التخرج\n\nما الذي تريد الاستفسار عنه؟';
    }
    
    if (q.includes('من أنت')) {
      return 'أنا نظام الاستعلامات الأكاديمية لجامعة أسيوط القومية، مصمم لمساعدتك في الحصول على المعلومات من اللوائح والقوانين الجامعية المعتمدة.';
    }
    
    if (q.includes('ماذا تستطيع')) {
      return 'أستطيع مساعدتك في الحصول على معلومات من اللوائح الجامعية المعتمدة حول:\n\n1. شروط القبول والتسجيل\n2. أنظمة الامتحانات والتقييم\n3. قوانين الحضور والغياب\n4. إجراءات التحويل والانسحاب\n5. شروط التخرج والحصول على الشهادة\n6. الأنظمة المالية والرسوم\n\nاسأل عن أي موضوع محدد وسأبحث لك في اللوائح المتاحة.';
    }
    
    return null;
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
    const result = this.searchInDocuments(query);
    if (result) {
      return [{
        content: result,
        metadata: { source: 'University Regulations' },
        relevanceScore: 0.9
      }];
    }
    return [];
  }

  async getSystemStatus() {
    return {
      vectorStore: 'simple',
      documentsCount: this.documentsContent.length > 0 ? 1 : 0,
      chatbot: this.isInitialized ? 'ready' : 'loading'
    };
  }
}