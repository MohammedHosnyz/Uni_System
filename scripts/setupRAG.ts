import { RobustRAG } from '../lib/rag/robustRAG';
import fs from 'fs';
import path from 'path';

async function setupRAG() {
  console.log('🚀 بدء إعداد نظام RAG...');
  
  try {
    const pdfPaths = [
      path.join(process.cwd(), 'app', 'regulations', 'general-regulation.pdf'),
      path.join(process.cwd(), 'app', 'regulations', 'software-engineering-regulation.pdf')
    ];
    
    console.log('📁 فحص ملفات PDF...');
    for (const pdfPath of pdfPaths) {
      if (fs.existsSync(pdfPath)) {
        console.log(`✅ موجود: ${path.basename(pdfPath)}`);
      } else {
        console.log(`❌ غير موجود: ${pdfPath}`);
        console.log(`   يرجى وضع الملف في المسار المحدد أو تحديث المسار في الكود`);
      }
    }
    
    console.log('\n🤖 تهيئة نظام RAG...');
    const rag = new RobustRAG();
    await rag.initialize();
    
    console.log('\n🧪 اختبار النظام...');
    const testQuestions = [
      'مرحبا',
      'ما هي شروط القبول؟',
      'كيف أحسب المعدل التراكمي؟',
      'ما هو الذكاء الاصطناعي؟'
    ];
    
    for (const question of testQuestions) {
      console.log(`\n❓ السؤال: ${question}`);
      try {
        const answer = await rag.chat(question);
        console.log(`✅ الإجابة: ${answer.substring(0, 100)}...`);
      } catch (error) {
        console.log(`❌ خطأ: ${error}`);
      }
    }
    
    console.log('\n📊 حالة النظام:');
    const status = await rag.getSystemStatus();
    console.log(JSON.stringify(status, null, 2));
    
    console.log('\n🎉 تم إعداد النظام بنجاح!');
    console.log('\nيمكنك الآن تشغيل الخادم باستخدام: npm run dev');
    
  } catch (error) {
    console.error('❌ خطأ في إعداد النظام:', error);
    process.exit(1);
  }
}

setupRAG().catch(console.error);