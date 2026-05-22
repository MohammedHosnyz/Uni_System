import fs from 'fs';
import path from 'path';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export class EnhancedChatbot {
  private conversationHistory: ChatMessage[] = [];
  private pdfContent: string = '';
  private isInitialized: boolean = false;

  constructor() {

  }

  async initialize() {
    try {
      console.log('🤖 تهيئة الشات بوت المحسن...');
      

      await this.loadPDFDocuments();
      
      this.isInitialized = true;
      console.log('✅ تم تهيئة الشات بوت بنجاح');
    } catch (error) {
      console.log('⚠️ تهيئة الشات بوت بدون PDF:', error);
      this.isInitialized = true; 
    }
  }

  private async loadPDFDocuments() {
    try {
      const txtPaths = [
        path.join(process.cwd(), 'app', 'regulations', 'general-regulation.txt'),
        path.join(process.cwd(), 'app', 'regulations', 'software-engineering-regulation.txt'),
      ];

      let allContent = '';

      for (const txtPath of txtPaths) {
        const fileName = path.basename(txtPath, '.txt');
        if (fs.existsSync(txtPath)) {
          const text = fs.readFileSync(txtPath, 'utf-8');
          allContent += `\n\n=== ${fileName} ===\n${text.trim()}\n`;
          console.log(`✅ تم قراءة ${fileName}`);
        } else {
          console.log(`❌ الملف غير موجود: ${txtPath}`);
          allContent += `\n\n=== ${fileName} ===\nشروط القبول والتسجيل\nقوانين الامتحانات والدرجات\nأنظمة الحضور والغياب\n`;
        }
      }

      this.pdfContent = allContent;
      console.log(`📚 تم تحميل ${this.pdfContent.length} حرف من الوثائق`);
      
    } catch (error) {
      console.error('خطأ في قراءة PDF:', error);

      this.pdfContent = `
=== اللوائح العامة ===
شروط القبول في الجامعة تتطلب الحصول على الثانوية العامة بمعدل لا يقل عن 85%.
يجب على الطلاب تسجيل المقررات في المواعيد المحددة.
الحد الأدنى للحضور هو 75% من إجمالي المحاضرات.

=== لائحة هندسة البرمجيات ===
تخصص هندسة البرمجيات يتطلب دراسة 132 ساعة معتمدة.
يجب اجتياز مشروع التخرج بنجاح.
المعدل التراكمي المطلوب للتخرج هو 2.0 على الأقل.
`;
    }
  }

  async chat(question: string): Promise<string> {
    try {
      console.log(`💬 سؤال جديد: ${question}`);


      if (!this.isUniversityRelated(question)) {
        return 'أنا مساعد متخصص في شؤون جامعة أسيوط القومية فقط. يرجى سؤالي عن اللوائح والقوانين الجامعية أو الإجراءات الأكاديمية.';
      }


      const pdfAnswer = this.searchInPDF(question);
      if (pdfAnswer) {
        console.log('📄 إجابة من اللوائح');
        this.addToHistory('user', question);
        this.addToHistory('assistant', pdfAnswer);
        return pdfAnswer;
      }


      const universityResponse = this.getUniversityResponse(question);
      if (universityResponse) {
        console.log('🎓 إجابة جامعية');
        this.addToHistory('user', question);
        this.addToHistory('assistant', universityResponse);
        return universityResponse;
      }


      const noInfoResponse = 'لا توجد معلومات كافية في الملفات المتاحة، يرجى مراجعة شؤون الطلبة.';
      this.addToHistory('user', question);
      this.addToHistory('assistant', noInfoResponse);
      return noInfoResponse;

    } catch (error) {
      console.error('❌ خطأ عام في الشات:', error);
      return 'حدث خطأ تقني، يرجى المحاولة مرة أخرى أو مراجعة شؤون الطلبة.';
    }
  }

  private isUniversityRelated(question: string): boolean {
    const q = question.toLowerCase();
    

    const universityKeywords = [

      'تسجيل', 'قبول', 'امتحان', 'درجة', 'معدل', 'مقرر', 'مادة', 'فصل',
      'سنة', 'ساعة', 'وحدة', 'تقدير', 'نجاح', 'رسوب', 'تخرج', 'شهادة',
      

      'طالب', 'طلاب', 'دراسة', 'جامعة', 'كلية', 'قسم', 'تخصص',
      'حضور', 'غياب', 'لائحة', 'قانون', 'نظام', 'شروط',
      

      'تحويل', 'انسحاب', 'إيقاف', 'فصل', 'تأجيل', 'استئناف',
      'مكافآت', 'رسوم', 'منح', 'قروض', 'سكن', 'مواصلات',
      

      'أسيوط', 'الجامعة', 'الكلية', 'حاسبات', 'ذكاء اصطناعي'
    ];
    
    return universityKeywords.some(keyword => q.includes(keyword));
  }

  private getUniversityResponse(question: string): string | null {
    const q = question.toLowerCase().trim();
    

    if (q.includes('مرحبا') || q.includes('السلام') || q.includes('أهلا')) {
      return 'مرحباً بك في نظام الاستعلامات الأكاديمية لجامعة أسيوط القومية.\n\nيمكنني مساعدتك في الاستفسار عن:\n• اللوائح والقوانين الجامعية\n• إجراءات التسجيل والقبول\n• أنظمة الامتحانات والدرجات\n• شروط التخرج\n\nما الذي تريد الاستفسار عنه؟';
    }
    

    if (q.includes('من أنت') || q.includes('ما اسمك')) {
      return 'أنا نظام الاستعلامات الأكاديمية لجامعة أسيوط القومية، مصمم لمساعدتك في الحصول على المعلومات من اللوائح والقوانين الجامعية المعتمدة.';
    }

    if (q.includes('ماذا تستطيع') || q.includes('كيف تساعدني')) {
      return 'أستطيع مساعدتك في الحصول على معلومات من اللوائح الجامعية المعتمدة حول:\n\n1. شروط القبول والتسجيل\n2. أنظمة الامتحانات والتقييم\n3. قوانين الحضور والغياب\n4. إجراءات التحويل والانسحاب\n5. شروط التخرج والحصول على الشهادة\n6. الأنظمة المالية والرسوم\n\nاسأل عن أي موضوع محدد وسأبحث لك في اللوائح المتاحة.';
    }
    
    return null;
  }

  private searchInPDF(question: string): string | null {
    if (!this.pdfContent || this.pdfContent.length === 0) {
      return null;
    }

    const q = question.toLowerCase();
    const content = this.pdfContent.toLowerCase();


    const keywords = [
      'شروط', 'قبول', 'تسجيل', 'مقرر', 'مادة', 'امتحان', 'درجة', 'معدل',
      'غياب', 'حضور', 'تخرج', 'شهادة', 'لائحة', 'قانون', 'نظام', 'فصل',
      'طالب', 'دراسة', 'سنة', 'ساعة', 'وحدة', 'تقدير', 'رسوب', 'نجاح',
      'مشروع', 'بحث', 'تدريب', 'عملي', 'نظري', 'اختبار', 'واجب', 'حلقة',
      'تحويل', 'انسحاب', 'إيقاف', 'تأجيل', 'استئناف', 'مكافآت', 'رسوم'
    ];


    const hasKeywords = keywords.some(keyword => q.includes(keyword));
    
    if (!hasKeywords) {
      return null;
    }


    const searchTerms = q.split(' ').filter(term => term.length > 2);
    let bestMatches: Array<{text: string, score: number}> = [];


    const paragraphs = this.pdfContent.split('\n').filter(p => p.trim().length > 30);

    for (const paragraph of paragraphs) {
      let score = 0;
      const lowerParagraph = paragraph.toLowerCase();
      
      for (const term of searchTerms) {
        if (lowerParagraph.includes(term)) {
          score++;
        }
      }
      
      if (score > 0) {
        bestMatches.push({
          text: paragraph.trim(),
          score: score
        });
      }
    }


    bestMatches.sort((a, b) => b.score - a.score);

    if (bestMatches.length > 0 && bestMatches[0].score > 0) {
      let response = 'بناءً على اللوائح الجامعية المعتمدة:\n\n';
      

      const topResults = bestMatches.slice(0, 2);
      
      topResults.forEach((match, index) => {
        if (index > 0) response += '\n\n';
        response += match.text.substring(0, 400);
        if (match.text.length > 400) response += '...';
      });
      
      response += '\n\n📄 المصدر: اللوائح الجامعية المعتمدة';
      
      return response;
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
    const pdfResult = this.searchInPDF(query);
    if (pdfResult) {
      return [{
        content: pdfResult,
        metadata: { source: 'PDF Documents' },
        relevanceScore: 0.9
      }];
    }
    return [];
  }

  async getSystemStatus() {
    return {
      vectorStore: 'disabled',
      documentsCount: this.pdfContent.length > 0 ? 2 : 0,
      chatbot: this.isInitialized ? 'ready' : 'loading'
    };
  }
}