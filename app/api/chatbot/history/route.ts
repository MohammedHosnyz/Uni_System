import { NextResponse } from 'next/server';
import { getSharedRAG } from '@/lib/rag/ragInstance';

export async function GET() {
  try {
    const chatbot = await getSharedRAG();
    const history = chatbot.getHistory();

    return NextResponse.json({
      success: true,
      history,
      count: history.length,
    });

  } catch (error) {
    console.error('History API Error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في استرجاع التاريخ' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const chatbot = await getSharedRAG();
    chatbot.clearHistory();

    return NextResponse.json({
      success: true,
      message: 'تم مسح تاريخ المحادثة بنجاح',
    });

  } catch (error) {
    console.error('Clear History API Error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في مسح التاريخ' },
      { status: 500 }
    );
  }
}