import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getRegulationsContext } from '@/lib/pdfContext';

const BASE_PROMPT = `أنت المساعد الأكاديمي الذكي لكلية الحاسبات والمعلومات بجامعة أسيوط الأهلية.

مهمتك الإجابة على استفسارات الطلاب بشكل دقيق ومفيد باللغة العربية، بناءً على اللوائح الأكاديمية المرفقة أدناه.

قواعد الرد:
- أجب دائماً بالعربية ما لم يسألك المستخدم بلغة أخرى
- استند دائماً إلى نصوص اللوائح المرفقة عند الإجابة
- كن ودوداً ومحترفاً ومختصراً
- إذا لم تجد الإجابة في اللوائح، اقترح على الطالب مراجعة شؤون الطلبة مباشرة
- استخدم الرموز التعبيرية بشكل معتدل

--- اللوائح الأكاديمية ---
{REGULATIONS_CONTEXT}
--- نهاية اللوائح ---`;


const conversationHistory: { role: 'user' | 'model'; parts: { text: string }[] }[] = [];


const MODELS = ['gemini-2.5-flash-lite', 'gemini-flash-lite-latest', 'gemini-2.5-flash'];

async function callGemini(userMessage: string, systemPrompt: string): Promise<string> {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  let lastError: Error = new Error('No models available');

  for (const modelName of MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: systemPrompt,
      });

      const chat = model.startChat({
        history: [...conversationHistory],
        generationConfig: { maxOutputTokens: 1024, temperature: 0.4 },
      });

      const result = await chat.sendMessage(userMessage);
      const response = result.response.text();

      conversationHistory.push(
        { role: 'user',  parts: [{ text: userMessage }] },
        { role: 'model', parts: [{ text: response }] }
      );
      if (conversationHistory.length > 40) {
        conversationHistory.splice(0, conversationHistory.length - 40);
      }

      return response;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      const msg = lastError.message;
      if (!msg.includes('429') && !msg.includes('404')) throw lastError;
    }
  }

  throw lastError;
}

export async function POST(request: NextRequest) {
  try {
    const { message, action } = await request.json();

    if (action === 'clear') {
      conversationHistory.length = 0;
      return NextResponse.json({ success: true, message: 'تم مسح تاريخ المحادثة' });
    }

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your-gemini-api-key-here') {
      return NextResponse.json({
        success: false,
        response: 'GEMINI_API_KEY غير مضبوط في ملف .env',
      }, { status: 500 });
    }

    
    const regulationsContext = getRegulationsContext();
    const systemPrompt = BASE_PROMPT.replace('{REGULATIONS_CONTEXT}', regulationsContext || 'لا توجد لوائح متاحة حالياً');

    const response = await callGemini(message, systemPrompt);

    return NextResponse.json({
      success: true,
      response,
      timestamp: new Date().toISOString(),
    });

  } catch (error: unknown) {
    console.error('Chatbot Error:', error);
    const msg = error instanceof Error ? error.message : 'خطأ غير معروف';
    return NextResponse.json({
      success: false,
      response: `حدثت مشكلة تقنية مؤقتة.\n\nالخطأ: ${msg}`,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  if (!query) return NextResponse.json({ error: 'Query required' }, { status: 400 });
  return NextResponse.json({ success: true, results: [], query });
}
