'use client';

import { useState, useEffect } from 'react';
import { Cairo } from 'next/font/google';
import { 
  Bot, 
  Search, 
  History, 
  Database, 
  Cpu, 
  RefreshCw, 
  Trash2, 
  FileText, 
  HelpCircle, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
});

interface SearchResult {
  content: string;
  metadata: {
    source: string;
    chunk: number;
    totalChunks: number;
  };
  relevanceScore: number;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function ChatbotAdminPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const searchDocuments = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await fetch(`/api/chatbot?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      
      if (data.success) {
        setSearchResults(data.results);
      } else {
        console.error('Search failed:', data.error);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const loadChatHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const response = await fetch('/api/chatbot/history');
      const data = await response.json();
      
      if (data.success) {
        setChatHistory(data.history);
      }
    } catch (error) {
      console.error('Failed to load history:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const clearChatHistory = async () => {
    try {
      const response = await fetch('/api/chatbot/history', {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setChatHistory([]);
        alert('تم مسح تاريخ المحادثة بنجاح');
      }
    } catch (error) {
      console.error('Failed to clear history:', error);
      alert('حدث خطأ في مسح التاريخ');
    }
  };

  useEffect(() => {
    loadChatHistory();
  }, []);

  return (
    <div className={`${cairo.className} min-h-screen bg-[#FAF7F2] p-6`} dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Card */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 mb-6">
          <h1 className="text-2xl font-bold text-[#1C1917] flex items-center gap-2">
            <Bot className="h-7 w-7 text-[#D97706]" />
            إدارة الشات بوت الذكي
          </h1>
          <p className="text-sm text-stone-500 font-medium mt-1">
            مراقبة وإدارة وإعداد نظام المساعد الذكي المستند للذكاء الاصطناعي بالجامعة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Document Search Panel */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
            <h2 className="text-base font-bold text-[#1C1917] mb-4 flex items-center gap-2">
              <Search className="h-5 w-5 text-[#D97706]" />
              البحث في الوثائق واللوائح
            </h2>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث في القوانين، اللوائح، والمستندات..."
                  className="flex-1 px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FABA19]/35 focus:border-[#FABA19] text-sm text-[#1C1917] font-semibold"
                  onKeyPress={(e) => e.key === 'Enter' && searchDocuments()}
                />
                <button
                  onClick={searchDocuments}
                  disabled={isSearching || !searchQuery.trim()}
                  className="px-5 py-2.5 bg-[#FABA19] text-[#1C1917] hover:bg-[#e5a816] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold text-xs shadow-sm transition-all"
                >
                  {isSearching ? 'جاري البحث...' : 'بحث'}
                </button>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <div key={index} className="border border-stone-150 bg-stone-50/20 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-[#D97706]">
                        {result.metadata.source}
                      </span>
                      <span className="text-[10px] text-stone-500 font-bold">
                        نسبة التطابق: {(result.relevanceScore * 100).toFixed(1)}%
                      </span>
                    </div>
                    <p className="text-stone-700 text-xs leading-relaxed font-medium">
                      {result.content.substring(0, 200)}...
                    </p>
                    <div className="text-[9px] text-stone-400 font-bold mt-2">
                      القطعة {result.metadata.chunk + 1} من {result.metadata.totalChunks}
                    </div>
                  </div>
                ))}
                
                {searchResults.length === 0 && searchQuery && !isSearching && (
                  <div className="text-center text-stone-400 py-8">
                    <div className="mb-4">
                      <FileText className="h-10 w-10 text-stone-300 mx-auto mb-2" />
                      <p className="font-bold text-xs text-stone-500">لا توجد نتائج مطابقة</p>
                      <p className="text-[11px] text-stone-400 mt-2 font-medium">
                        إذا لم تكن قد حمّلت وثائق RAG للآن، يرجى تشغيل:
                      </p>
                      <code className="bg-stone-100 text-[#1C1917] text-[10px] font-mono px-2 py-1 rounded-md mt-2 inline-block">
                        npm run setup-rag
                      </code>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Conversation History Panel */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-bold text-[#1C1917] flex items-center gap-2">
                <History className="h-5 w-5 text-[#D97706]" />
                سجل المحادثات الأخير
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={loadChatHistory}
                  disabled={isLoadingHistory}
                  className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 disabled:opacity-50 rounded-xl font-bold text-xs transition-all flex items-center gap-1"
                >
                  <RefreshCw className="h-3 w-3" />
                  تحديث
                </button>
                <button
                  onClick={clearChatHistory}
                  className="px-3.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-650 border border-red-100 rounded-xl font-bold text-xs transition-all"
                >
                  مسح التاريخ
                </button>
              </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {isLoadingHistory ? (
                <div className="text-center text-stone-400 py-8 text-xs font-bold">
                  جاري تحميل المحادثات...
                </div>
              ) : chatHistory.length > 0 ? (
                chatHistory.map((message, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-xl border ${
                      message.role === 'user'
                        ? 'bg-[#1C1917] border-[#1C1917] text-white mr-6'
                        : 'bg-stone-50 border-stone-200 text-stone-800 ml-6'
                    }`}
                  >
                    <div className="text-[10px] font-bold mb-1 opacity-80">
                      {message.role === 'user' ? 'الطالب' : 'المساعد الذكي'}
                    </div>
                    <div className="text-xs font-medium leading-relaxed">
                      {message.content.length > 150
                        ? `${message.content.substring(0, 150)}...`
                        : message.content}
                    </div>
                    <div className={`text-[9px] mt-2 font-bold ${
                      message.role === 'user' ? 'text-stone-400' : 'text-stone-400'
                    }`}>
                      {new Date(message.timestamp).toLocaleString('ar-EG')}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-stone-400 py-8">
                  <Bot className="h-10 w-10 text-stone-300 mx-auto mb-2" />
                  <p className="text-xs font-bold text-stone-500">لا توجد محادثات مسجلة للآن</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* System Statistics */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm mt-6">
          <h2 className="text-base font-bold text-[#1C1917] mb-4 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-[#D97706]" />
            إحصائيات وحالة النظام
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-stone-50 border border-stone-150 p-4 rounded-xl">
              <div className="text-2xl font-bold text-[#1C1917]">{chatHistory.length}</div>
              <div className="text-xs text-stone-500 font-bold mt-1">إجمالي الرسائل</div>
            </div>
            
            <div className="bg-stone-50 border border-stone-150 p-4 rounded-xl">
              <div className="text-2xl font-bold text-[#1C1917]">
                {chatHistory.filter(m => m.role === 'user').length}
              </div>
              <div className="text-xs text-stone-500 font-bold mt-1">أسئلة الطلاب</div>
            </div>
            
            <div className="bg-stone-50 border border-stone-150 p-4 rounded-xl">
              <div className="text-2xl font-bold text-[#1C1917]">2</div>
              <div className="text-xs text-stone-500 font-bold mt-1">الوثائق المحملة</div>
            </div>
            
            <div className="bg-stone-50 border border-stone-150 p-4 rounded-xl flex flex-col justify-between">
              <div className="flex items-center gap-1 text-green-600">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-sm font-bold">متاح ونشط</span>
              </div>
              <div className="text-xs text-stone-500 font-bold mt-1">حالة النظام</div>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="bg-amber-50/40 border border-amber-100/70 rounded-2xl p-6 mt-6">
          <h3 className="text-sm font-bold text-[#D97706] mb-3 flex items-center gap-1.5">
            <HelpCircle className="h-4 w-4" />
            تعليمات التشغيل والإعداد
          </h3>
          <div className="space-y-2 text-xs text-stone-600 font-medium">
            <p>• يرجى التأكد من إعداد مفاتيح الاتصال الضرورية بملف الإعدادات البيئية مثل: <code className="bg-amber-100/50 px-1.5 py-0.5 rounded text-stone-800 font-mono">OPENAI_API_KEY</code>.</p>
            <p>• لتحديث قاعدة المعرفة RAG ورفع المستندات الجديدة، قم بتشغيل الأمر: <code className="bg-amber-100/50 px-1.5 py-0.5 rounded text-stone-800 font-mono">npm run setup-rag</code>.</p>
            <p>• يمكنك استخدام أداة البحث في الجانب الأيمن للتأكد من دقة استرجاع المعلومات والتحقق من سلامة الأجوبة المسترجعة.</p>
          </div>
        </div>
      </div>
    </div>
  );
}