import { NextResponse } from 'next/server';
import { getSharedRAG } from '@/lib/rag/ragInstance';

export async function GET() {
  try {
    const rag = await getSharedRAG();
    const status = await rag.getSystemStatus();
    
    return NextResponse.json({
      success: true,
      status,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Status API Error:', error);
    return NextResponse.json({
      success: true,
      status: {
        vectorStore: 'error',
        documentsCount: 0,
        chatbot: 'ready'
      },
      error: 'بعض الخدمات غير متاحة حالياً',
      timestamp: new Date().toISOString(),
    });
  }
}