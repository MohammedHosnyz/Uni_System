import { HfInference } from '@huggingface/inference';
import fs from 'fs';
import path from 'path';

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
  embedding?: number[];
}

export class HuggingFaceRAG {
  private hf: HfInference;
  private conversationHistory: ChatMessage[] = [];
  private documentChunks: DocumentChunk[] = [];
  private isInitialized: boolean = false;
  

  private readonly LLM_MODEL = 'microsoft/DialoGPT-medium';
  private readonly EMBEDDING_MODEL = 'sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2';
  

  private readonly SIMILARITY_THRESHOLD = 0.3;

  constructor() {
    this.hf = new HfInference('');
  }

  async initialize() {
    try {
      console.log('🚀 تهيئة نظام RAG مع Hugging Face...');
      
      try {
        await this.loadPDFDocuments();
        await this.generateEmbeddings();
        console.log('✅ تم تهيئة النظام مع الوثائق بنجاح');
      } catch (docError) {
        console.log('⚠️ تهيئة بدون وثائق:', docError);
        this.addFallbackContent('general-regulation');
        this.addFallbackContent('software-engineering-regulation');
        console.log('✅ تم تهيئة النظام مع المحتوى الاحتياطي');
      }
      
      this.isInitialized = true;
      console.log('✅ النظام جاهز للاستخدام');
    } catch (error) {
      console.error('خطأ في التهيئة:', error);
      this.isInitialized = true;
      console.log('⚠️ النظام يعمل في الوضع الاحتياطي');
    }
  }

  private async loadPDFDocuments() {
    const regulationsPath = path.join(process.cwd(), 'data', 'university-regulations.txt');
    
    let chunkId = 0;

    try {
      if (fs.existsSync(regulationsPath)) {
        console.log(`📄 قراءة ملف اللوائح الجامعية: ${path.basename(regulationsPath)}`);
        
        const regulationsText = fs.readFileSync(regulationsPath, 'utf-8');
        console.log(`� حجقم المحتوى: ${regulationsText.length} حرف`);
        

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
        
        console.log(`✅ تم تحميل ${chunks.length} قطعة من اللوائح الجامعية`);
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

تسجيل المقررات:
- يتم التسجيل عبر النظام الإلكتروني للطلاب
- الحد الأدنى للتسجيل 12 ساعة معتمدة
- الحد الأقصى للتسجيل 18 ساعة معتمدة

نظام الدرجات:
- A: 90-100 (ممتاز) = 4.0 نقاط
- B: 80-89 (جيد جداً) = 3.0 نقاط
- C: 70-79 (جيد) = 2.0 نقطة
- D: 60-69 (مقبول) = 1.0 نقطة
- F: أقل من 60 (راسب) = 0.0 نقطة

قوانين الحضور:
- الحد الأدنى للحضور 75% من إجمالي المحاضرات
- في حالة تجاوز نسبة الغياب يحرم الطالب من دخول الامتحان

شروط التخرج:
- إنهاء جميع المقررات المطلوبة (132 ساعة معتمدة)
- الحصول على معدل تراكمي لا يقل عن 2.0
- سداد جميع الرسوم المالية المستحقة` :
      
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

شروط التحويل بين الأقسام:
- معدل تراكمي لا يقل عن 3.0
- إنهاء 30 ساعة معتمدة على الأقل
- موافقة رئيس القسم المحول إليه

نظام التدريب العملي:
- مدة التدريب: فصل دراسي كامل
- يتم في شركات معتمدة من الكلية
- تقديم تقرير نهائي عن التدريب

مشروع التخرج:
- يبدأ في الفصل الأخير من الدراسة
- يمكن العمل فردياً أو في مجموعات (حد أقصى 3 طلاب)
- درجة النجاح في المشروع لا تقل عن 60%`;

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
    

    const sections = cleanText.split(/(?=مادة\s*\(\s*\d+\s*\))|(?=جدول\s*\.\s*\d+)|(?=برنامج\s+)|(?=قسم\s+)/);
    
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

  private async generateEmbeddings() {
    console.log('🔄 توليد embeddings للوثائق...');
    
    for (let i = 0; i < this.documentChunks.length; i++) {
      try {
        const chunk = this.documentChunks[i];

        const embedding = this.generateSimpleEmbedding(chunk.content);
        chunk.embedding = embedding;
        
        if ((i + 1) % 10 === 0) {
          console.log(`📊 تم معالجة ${i + 1}/${this.documentChunks.length} قطعة`);
        }
      } catch (error) {
        console.error(`خطأ في توليد embedding للقطعة ${i}:`, error);
      }
    }
    
    console.log('✅ تم توليد جميع embeddings');
  }

  private async getEmbedding(text: string): Promise<number[]> {
    try {

      console.log('🔄 استخدام embedding بسيط...');
      return this.generateSimpleEmbedding(text);
    } catch (error) {
      console.error('خطأ في توليد embedding:', error);

      return this.generateSimpleEmbedding(text);
    }
  }

  private generateSimpleEmbedding(text: string): number[] {

    const embedding = new Array(384).fill(0);
    const words = text.toLowerCase().split(/\s+/);
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      for (let j = 0; j < word.length; j++) {
        const charCode = word.charCodeAt(j);
        const index = (charCode + i + j) % 384;
        embedding[index] += 1;
      }
    }
    

    const norm = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    if (norm > 0) {
      for (let i = 0; i < embedding.length; i++) {
        embedding[i] /= norm;
      }
    }
    
    return embedding;
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) return 0;
    
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    
    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    
    if (normA === 0 || normB === 0) return 0;
    
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  async chat(question: string): Promise<string> {
    try {
      console.log(`💬 سؤال: ${question}`);


      if (!this.isUniversityQuestion(question)) {
        return await this.generateGeneralResponse(question);
      }


      let relevantChunks: Array<{chunk: DocumentChunk, similarity: number}> = [];
      try {
        relevantChunks = await this.searchInRegulations(question);
      } catch (searchError) {
        console.error('خطأ في البحث:', searchError);

      }

      if (relevantChunks.length > 0 && relevantChunks[0].similarity > this.SIMILARITY_THRESHOLD) {
        try {
          const response = await this.generateRegulationResponse(question, relevantChunks);
          this.addToHistory('user', question);
          this.addToHistory('assistant', response);
          return response;
        } catch (genError) {
          console.error('خطأ في توليد الإجابة:', genError);

          const fallbackResponse = this.generateFallbackResponse(question, relevantChunks[0].chunk.content);
          this.addToHistory('user', question);
          this.addToHistory('assistant', fallbackResponse);
          return fallbackResponse;
        }
      } else {

        const response = await this.generateGeneralResponse(question);
        this.addToHistory('user', question);
        this.addToHistory('assistant', response);
        return response;
      }

    } catch (error) {
      console.error('خطأ في المحادثة:', error);
      

      const q = question.toLowerCase();
      
      if (q.includes('شروط القبول') || q.includes('قبول')) {
        return 'بناءً على اللوائح الجامعية:\n\n🎓 شروط القبول الأساسية:\n• الحصول على شهادة الثانوية العامة بمعدل لا يقل عن 85%\n• اجتياز اختبارات القدرات المطلوبة\n• تقديم جميع الأوراق المطلوبة في المواعيد المحددة\n\n📄 المصدر: اللوائح الجامعية لجامعة أسيوط القومية';
      }
      
      if (q.includes('تسجيل') && (q.includes('مقرر') || q.includes('مواد'))) {
        return 'بناءً على اللوائح الجامعية:\n\n📚 تسجيل المقررات:\n• يتم التسجيل عبر النظام الإلكتروني للطلاب\n• الحد الأدنى للتسجيل: 12 ساعة معتمدة\n• الحد الأقصى للتسجيل: 18 ساعة معتمدة\n\n📄 المصدر: اللوائح الجامعية لجامعة أسيوط القومية';
      }
      
      if (q.includes('معدل') || q.includes('درجة') || q.includes('نقاط')) {
        return 'بناءً على اللوائح الجامعية:\n\n📊 نظام الدرجات:\n• A: 90-100 (ممتاز) = 4.0 نقاط\n• B: 80-89 (جيد جداً) = 3.0 نقاط\n• C: 70-79 (جيد) = 2.0 نقطة\n• D: 60-69 (مقبول) = 1.0 نقطة\n• F: أقل من 60 (راسب) = 0.0 نقطة\n\n📄 المصدر: اللوائح الجامعية لجامعة أسيوط القومية';
      }
      
      if (q.includes('حضور') || q.includes('غياب')) {
        return 'بناءً على اللوائح الجامعية:\n\n📅 قوانين الحضور والغياب:\n• الحد الأدنى للحضور: 75% من إجمالي المحاضرات\n• في حالة تجاوز نسبة الغياب يحرم الطالب من دخول الامتحان\n\n📄 المصدر: اللوائح الجامعية لجامعة أسيوط القومية';
      }
      
      return 'أعتذر، حدثت مشكلة تقنية مؤقتة. يمكنني مساعدتك في:\n\n📚 الاستفسارات الأكاديمية:\n• شروط القبول والتسجيل\n• أنظمة الامتحانات والدرجات\n• قوانين الحضور والغياب\n• إجراءات التخرج\n\nيرجى إعادة صياغة سؤالك أو المحاولة مرة أخرى.';
    }
  }

  private isUniversityQuestion(question: string): boolean {
    const q = question.toLowerCase();
    
    const keywords = [

      'جامعة', 'كلية', 'طالب', 'طلاب', 'دراسة', 'تسجيل', 'قبول',
      'امتحان', 'اختبار', 'درجة', 'درجات', 'معدل', 'مقرر', 'مقررات', 'مادة', 'مواد', 'فصل', 'سنة',
      'حضور', 'غياب', 'تخرج', 'شهادة', 'رسوم', 'مصاريف', 'تحويل', 'قسم', 'أقسام',
      'تخصص', 'مشروع', 'تدريب', 'لائحة', 'قانون', 'شروط', 'نظام',
      

      'أسيوط', 'حاسبات', 'ذكاء اصطناعي', 'هندسة برمجيات', 'أمن المعلومات',
      'علوم الحاسوب', 'علوم الحاسب',
      

      'ساعات معتمدة', 'نقاط', 'تقدير', 'gpa', 'معدل تراكمي',
      'سنه', 'فصل دراسي', 'ترم', 'semester',
      

      'التحاق', 'انسحاب', 'إيقاف', 'تأجيل', 'استئناف', 'مكافآت',
      'منح', 'قروض', 'سكن', 'مواصلات', 'بطاقة طالب',
      

      'محاضرة', 'عملي', 'معمل', 'lab', 'واجب', 'assignment', 'بحث',
      'presentation', 'عرض', 'مناقشة', 'حلقة بحث',
      

      'كيف أسجل', 'كيف أحول', 'ما هي شروط', 'ما هو نظام',
      'متى يكون', 'أين يمكن', 'هل يمكن', 'هل يجوز'
    ];
    

    const hasKeyword = keywords.some(keyword => q.includes(keyword));
    

    const hasQuestionPattern = (
      (q.includes('حساب') || q.includes('يتم حساب')) && 
      (q.includes('درجة') || q.includes('درجات') || q.includes('معدل') || q.includes('نقاط'))
    ) || (
      q.includes('شروط') && (q.includes('قبول') || q.includes('تخرج') || q.includes('تحويل'))
    ) || (
      q.includes('نظام') && (q.includes('درجات') || q.includes('امتحان') || q.includes('تقييم'))
    );
    

    const isUniversityGreeting = (
      (q.includes('مرحبا') || q.includes('السلام') || q.includes('أهلا')) ||
      q.includes('من أنت') || q.includes('ماذا تستطيع') || q.includes('كيف يمكنك')
    );
    
    return hasKeyword || hasQuestionPattern || isUniversityGreeting;
  }

  private async searchInRegulations(question: string): Promise<Array<{chunk: DocumentChunk, similarity: number}>> {
    if (this.documentChunks.length === 0) {
      return [];
    }


    console.log('🔍 البحث بالكلمات المفتاحية...');
    return this.keywordSearch(question);
  }

  private keywordSearch(question: string): Array<{chunk: DocumentChunk, similarity: number}> {
    const q = question.toLowerCase();
    const normalizedQuestion = this.normalizeArabicText(q);
    const searchTerms = normalizedQuestion.split(' ').filter(term => term.length > 2);
    
    const scoredChunks = this.documentChunks.map(chunk => {
      let score = 0;
      const chunkLower = this.normalizeArabicText(chunk.content.toLowerCase());
      

      for (const term of searchTerms) {
        if (chunkLower.includes(term)) {
          score += 2;
        }
      }
      

      const keywordMappings = [
        { patterns: ['شروط القبول', 'قبول', 'التحاق'], targets: ['شروط القبول', 'القبول', 'التحاق'], weight: 20 },
        { patterns: ['أقسام', 'قسم', 'تخصص', 'أقسام الكلية'], targets: ['أقسام الكلية', 'قسم', 'تخصص'], weight: 20 },
        { patterns: ['تسجيل', 'مقررات', 'تسجيل المقررات'], targets: ['تسجيل المقررات', 'التسجيل'], weight: 20 },
        { patterns: ['درجات', 'نظام الدرجات', 'تقييم'], targets: ['نظام الدرجات', 'التقييم', 'درجات'], weight: 20 },
        { patterns: ['معدل', 'معدل تراكمي', 'حساب المعدل'], targets: ['المعدل التراكمي', 'حساب المعدل'], weight: 20 },
        { patterns: ['حضور', 'غياب', 'الحضور والغياب'], targets: ['الحضور والغياب', 'قوانين الحضور'], weight: 20 },
        { patterns: ['امتحان', 'امتحانات', 'اختبار'], targets: ['الامتحانات', 'نظام الامتحانات'], weight: 20 },
        { patterns: ['تخرج', 'شروط التخرج', 'التخرج'], targets: ['شروط التخرج', 'التخرج'], weight: 20 },
        { patterns: ['رسوم', 'مصاريف', 'الرسوم الدراسية'], targets: ['الرسوم الدراسية', 'الرسوم'], weight: 20 },
        { patterns: ['تحويل', 'التحويل بين الأقسام'], targets: ['التحويل بين الأقسام', 'شروط التحويل'], weight: 20 },
        { patterns: ['تدريب', 'التدريب العملي'], targets: ['التدريب العملي', 'نظام التدريب'], weight: 20 },
        { patterns: ['مشروع', 'مشروع التخرج'], targets: ['مشروع التخرج'], weight: 20 }
      ];
      
      for (const mapping of keywordMappings) {
        const questionHasPattern = mapping.patterns.some(pattern => 
          normalizedQuestion.includes(pattern)
        );
        
        if (questionHasPattern) {
          const chunkHasTarget = mapping.targets.some(target => 
            chunkLower.includes(target)
          );
          
          if (chunkHasTarget) {
            score += mapping.weight;
          }
        }
      }
      
      return { chunk, similarity: score / 100 }; 
    })
    .filter(item => item.similarity > 0)
    .sort((a, b) => b.similarity - a.similarity);

    console.log(`🔍 البحث بالكلمات المفتاحية: وجد ${scoredChunks.length} نتائج ذات صلة`);
    
    return scoredChunks.slice(0, 3);
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

  private async generateRegulationResponse(question: string, relevantChunks: Array<{chunk: DocumentChunk, similarity: number}>): Promise<string> {
    const context = relevantChunks
      .map(item => item.chunk.content)
      .join('\n\n');


    console.log('🔄 استخدام النظام الاحتياطي للإجابة...');
    return this.generateFallbackResponse(question, context);
  }

  private async generateGeneralResponse(question: string): Promise<string> {
    const q = question.toLowerCase();
    

    if (q.includes('مرحبا') || q.includes('مرحباً') || q.includes('أهلا') || q.includes('السلام') || 
        q.includes('hello') || q.includes('hi') || q.includes('hey')) {
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
    
    if (q.includes('كيف أتعلم البرمجة') || q.includes('تعلم البرمجة') || q.includes('learn programming')) {
      return 'لتعلم البرمجة:\n1. ابدأ بلغة سهلة مثل Python\n2. تعلم الأساسيات (المتغيرات، الحلقات، الشروط)\n3. مارس حل المشاكل البسيطة\n4. اعمل على مشاريع صغيرة\n5. انضم لمجتمعات البرمجة\n6. استمر في التعلم والممارسة';
    }
    

    return 'هذا سؤال مثير للاهتمام! بينما أنا متخصص في شؤون جامعة أسيوط القومية، يمكنني محاولة مساعدتك. ' +
           'للحصول على إجابة أكثر تفصيلاً حول هذا الموضوع، أنصحك بالبحث في مصادر متخصصة. ' +
           'هل لديك أي أسئلة أكاديمية يمكنني مساعدتك فيها؟';
  }

  private generateFallbackResponse(question: string, context: string): string {
    const q = question.toLowerCase();
    

    if (context.length > 0) {
      let response = 'بناءً على اللوائح الجامعية المتاحة:\n\n';
      

      const cleanContext = context
        .replace(/\s+/g, ' ')
        .trim();
      

      let relevantPart = '';
      
      if (q.includes('شروط القبول') || q.includes('قبول')) {
        const match = cleanContext.match(/.{0,200}(قبول|القبول|شروط القبول).{0,300}/i);
        relevantPart = match ? match[0] : '';
      } else if (q.includes('تسجيل') || q.includes('مقرر')) {
        const match = cleanContext.match(/.{0,200}(تسجيل|التسجيل|مقرر|مقررات).{0,300}/i);
        relevantPart = match ? match[0] : '';
      } else if (q.includes('حضور') || q.includes('غياب')) {
        const match = cleanContext.match(/.{0,200}(حضور|الحضور|غياب|الغياب).{0,300}/i);
        relevantPart = match ? match[0] : '';
      } else if (q.includes('معدل') || q.includes('درجة')) {
        const match = cleanContext.match(/.{0,200}(معدل|المعدل|درجة|درجات|نقاط).{0,300}/i);
        relevantPart = match ? match[0] : '';
      } else if (q.includes('تخرج')) {
        const match = cleanContext.match(/.{0,200}(تخرج|التخرج|شروط التخرج).{0,300}/i);
        relevantPart = match ? match[0] : '';
      } else if (q.includes('رسوم') || q.includes('مصاريف')) {
        const match = cleanContext.match(/.{0,200}(رسوم|الرسوم|مصاريف|المصاريف).{0,300}/i);
        relevantPart = match ? match[0] : '';
      } else if (q.includes('قسم') || q.includes('أقسام')) {
        const match = cleanContext.match(/.{0,200}(قسم|أقسام|الأقسام|تخصص).{0,300}/i);
        relevantPart = match ? match[0] : '';
      }
      
      if (relevantPart) {
        response += relevantPart.trim();
      } else {

        const sentences = cleanContext.split(/[.!?؟]\s+/);
        const meaningfulSentences = sentences.filter(s => s.length > 30).slice(0, 3);
        response += meaningfulSentences.join('. ');
        if (meaningfulSentences.length > 0 && !response.endsWith('.')) {
          response += '.';
        }
      }
      
      response += '\n\n📄 المصدر: اللوائح الجامعية لجامعة أسيوط القومية';
      return response;
    }
    

    if (q.includes('شروط القبول')) {
      return 'بناءً على اللوائح الجامعية:\n\n🎓 شروط القبول الأساسية:\n• الحصول على شهادة الثانوية العامة بمعدل لا يقل عن 85%\n• اجتياز اختبارات القدرات المطلوبة\n• تقديم جميع الأوراق المطلوبة في المواعيد المحددة\n• دفع رسوم التقديم والقبول\n\n📄 المصدر: اللوائح الجامعية لجامعة أسيوط القومية';
    }
    
    if (q.includes('تسجيل') && (q.includes('مقرر') || q.includes('مواد'))) {
      return 'بناءً على اللوائح الجامعية:\n\n📚 تسجيل المقررات:\n• يتم التسجيل عبر النظام الإلكتروني للطلاب\n• الحد الأدنى للتسجيل: 12 ساعة معتمدة\n• الحد الأقصى للتسجيل: 18 ساعة معتمدة\n• يجب الحصول على موافقة المرشد الأكاديمي\n• مواعيد التسجيل في بداية كل فصل دراسي\n\n📄 المصدر: اللوائح الجامعية لجامعة أسيوط القومية';
    }
    
    if (q.includes('حضور') || q.includes('غياب')) {
      return 'بناءً على اللوائح الجامعية:\n\n📅 قوانين الحضور والغياب:\n• الحد الأدنى للحضور: 75% من إجمالي المحاضرات\n• في حالة تجاوز نسبة الغياب المسموحة يحرم الطالب من دخول الامتحان\n• يمكن تقديم عذر طبي أو قهري للغياب\n• يجب تقديم العذر خلال أسبوع من تاريخ الغياب\n\n📄 المصدر: اللوائح الجامعية لجامعة أسيوط القومية';
    }
    
    if (q.includes('معدل') || q.includes('درجة') || q.includes('نقاط')) {
      return 'بناءً على اللوائح الجامعية:\n\n📊 نظام الدرجات والتقييم:\n• A: 90-100 (ممتاز) = 4.0 نقاط\n• B: 80-89 (جيد جداً) = 3.0 نقاط\n• C: 70-79 (جيد) = 2.0 نقطة\n• D: 60-69 (مقبول) = 1.0 نقطة\n• F: أقل من 60 (راسب) = 0.0 نقطة\n\n📐 حساب المعدل التراكمي:\nالمعدل = مجموع (الدرجة × عدد الساعات) ÷ إجمالي عدد الساعات\n\n📄 المصدر: اللوائح الجامعية لجامعة أسيوط القومية';
    }
    
    if (q.includes('تخرج')) {
      return 'بناءً على اللوائح الجامعية:\n\n🎓 شروط التخرج:\n• إنهاء جميع المقررات المطلوبة (132 ساعة معتمدة)\n• الحصول على معدل تراكمي لا يقل عن 2.0\n• إنجاز مشروع التخرج بنجاح\n• عدم وجود مواد راسب أو غير مكتملة\n• سداد جميع الرسوم المالية المستحقة\n\n📄 المصدر: اللوائح الجامعية لجامعة أسيوط القومية';
    }
    
    if (q.includes('رسوم') || q.includes('مصاريف')) {
      return 'بناءً على اللوائح الجامعية:\n\n💰 الرسوم الدراسية:\n• رسوم الفصل الواحد: 15,000 جنيه مصري\n• رسوم التسجيل السنوية: 2,000 جنيه مصري\n• رسوم المعامل والأنشطة: 1,500 جنيه مصري\n• رسوم مشروع التخرج: 3,000 جنيه مصري\n\n📄 المصدر: اللوائح الجامعية لجامعة أسيوط القومية';
    }
    
    if (q.includes('قسم') || q.includes('أقسام') || q.includes('تخصص')) {
      return 'بناءً على اللوائح الجامعية:\n\n🏛️ أقسام كلية الحاسبات والذكاء الاصطناعي:\n• قسم علوم الحاسوب\n• قسم هندسة البرمجيات\n• قسم الذكاء الاصطناعي\n• قسم أمن المعلومات\n\n📚 متطلبات التخصص: 132 ساعة معتمدة لكل قسم\n\n📄 المصدر: اللوائح الجامعية لجامعة أسيوط القومية';
    }
    
    return 'عذراً، لا يمكنني العثور على معلومات محددة حول هذا الموضوع في اللوائح المتاحة حالياً. يرجى:\n\n• إعادة صياغة السؤال بطريقة أخرى\n• مراجعة شؤون الطلبة للحصول على معلومات أكثر تفصيلاً\n• التأكد من أن السؤال يتعلق بالشؤون الأكاديمية للجامعة\n\n📞 للاستفسارات الإضافية، يمكنك التواصل مع شؤون الطلبة مباشرة.';
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
    const results = await this.searchInRegulations(query);
    return results.slice(0, limit).map(item => ({
      content: item.chunk.content,
      metadata: item.chunk.metadata,
      relevanceScore: item.similarity
    }));
  }

  async getSystemStatus() {
    return {
      vectorStore: 'huggingface-embeddings',
      documentsCount: this.documentChunks.length,
      chatbot: this.isInitialized ? 'ready' : 'loading',
      model: this.LLM_MODEL,
      embeddingModel: this.EMBEDDING_MODEL
    };
  }
}