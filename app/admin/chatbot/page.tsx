'use client';

import { useState, useEffect } from 'react';
import { Cairo } from 'next/font/google';

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
    <div className={`${cairo.className} min-h-screen bg-gray-50 p-6`} dir="rtl">
      <div className="max-w-7xl mx-auto">
        
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-[#B73535] mb-2">
            إدارة الشات بوت الذكي
          </h1>
          <p className="text-gray-600">
            إدارة ومراقبة نظام المساعد الذكي للجامعة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
                    <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              🔍 البحث في الوثائق
            </h2>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث في اللوائح والقوانين..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B73535] focus:border-[#B73535] outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && searchDocuments()}
                />
                <button
                  onClick={searchDocuments}
                  disabled={isSearching || !searchQuery.trim()}
                  className="px-6 py-3 bg-[#B73535] text-white rounded-lg hover:bg-[#8B2828] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSearching ? 'جاري البحث...' : 'بحث'}
                </button>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-semibold text-[#B73535]">
                        {result.metadata.source}
                      </span>
                      <span className="text-xs text-gray-500">
                        نسبة التطابق: {(result.relevanceScore * 100).toFixed(1)}%
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {result.content.substring(0, 200)}...
                    </p>
                    <div className="text-xs text-gray-500 mt-2">
                      القطعة {result.metadata.chunk + 1} من {result.metadata.totalChunks}
                    </div>
                  </div>
                ))}
                
                {searchResults.length === 0 && searchQuery && !isSearching && (
                  <div className="text-center text-gray-500 py-8">
                    <div className="mb-4">
                      <div className="text-4xl mb-2">📄</div>
                      <p className="font-semibold">لا توجد نتائج للبحث</p>
                      <p className="text-sm mt-2">
                        إذا لم تكن قد حملت الوثائق بعد، قم بتشغيل:
                      </p>
                      <code className="bg-gray-100 px-3 py-1 rounded mt-2 inline-block">
                        npm run setup-rag
                      </code>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                💬 تاريخ المحادثات
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={loadChatHistory}
                  disabled={isLoadingHistory}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 text-sm"
                >
                  تحديث
                </button>
                <button
                  onClick={clearChatHistory}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                >
                  مسح التاريخ
                </button>
              </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {isLoadingHistory ? (
                <div className="text-center text-gray-500 py-8">
                  جاري تحميل التاريخ...
                </div>
              ) : chatHistory.length > 0 ? (
                chatHistory.map((message, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-[#B73535] text-white mr-8'
                        : 'bg-gray-100 text-gray-800 ml-8'
                    }`}
                  >
                    <div className="text-sm font-semibold mb-1">
                      {message.role === 'user' ? 'المستخدم' : 'المساعد'}
                    </div>
                    <div className="text-sm">
                      {message.content.length > 150
                        ? `${message.content.substring(0, 150)}...`
                        : message.content}
                    </div>
                    <div className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {new Date(message.timestamp).toLocaleString('ar-EG')}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  لا يوجد تاريخ محادثات
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            📊 إحصائيات النظام
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-[#B73535] to-[#8B2828] text-white p-4 rounded-lg">
              <div className="text-2xl font-bold">{chatHistory.length}</div>
              <div className="text-sm opacity-90">إجمالي الرسائل</div>
            </div>
            
            <div className="bg-gradient-to-r from-[#D4A017] to-[#b98a12] text-white p-4 rounded-lg">
              <div className="text-2xl font-bold">
                {chatHistory.filter(m => m.role === 'user').length}
              </div>
              <div className="text-sm opacity-90">أسئلة المستخدمين</div>
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
              <div className="text-2xl font-bold">2</div>
              <div className="text-sm opacity-90">الوثائق المحملة</div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
              <div className="text-2xl font-bold">متاح</div>
              <div className="text-sm opacity-90">حالة النظام</div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-bold text-blue-800 mb-3">📋 تعليمات الاستخدام</h3>
          <div className="space-y-2 text-blue-700">
            <p>• تأكد من إعداد متغيرات البيئة (OPENAI_API_KEY, PINECONE_API_KEY)</p>
            <p>• قم بتشغيل <code className="bg-blue-100 px-2 py-1 rounded">npm run setup-rag</code> لتحميل الوثائق</p>
            <p>• استخدم البحث لاختبار جودة استرجاع المعلومات</p>
            <p>• راقب تاريخ المحادثات لتحسين الأداء</p>
          </div>
        </div>
      </div>
    </div>
  );
}