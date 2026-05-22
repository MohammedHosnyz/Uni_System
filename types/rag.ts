export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isLoading?: boolean;
}

export interface ProcessedDocument {
  id: string;
  content: string;
  metadata: {
    source: string;
    page?: number;
    chunk: number;
    totalChunks: number;
  };
}

export interface SearchResult {
  content: string;
  metadata: {
    source: string;
    chunk: number;
    totalChunks: number;
  };
  relevanceScore: number;
}

export interface ChatbotResponse {
  success: boolean;
  response?: string;
  error?: string;
  timestamp?: string;
}

export interface SearchResponse {
  success: boolean;
  results?: SearchResult[];
  query?: string;
  error?: string;
}

export interface HistoryResponse {
  success: boolean;
  history?: ChatMessage[];
  count?: number;
  error?: string;
}

export interface SystemStatus {
  chatbot: 'loading' | 'ready' | 'error';
  vectorStore: 'loading' | 'ready' | 'error';
  documents: number;
}

export interface RAGConfig {
  openai: {
    apiKey: string;
    modelName: string;
    temperature: number;
  };
  pinecone: {
    apiKey: string;
    indexName: string;
    environment: string;
  };
  embeddings: {
    modelName: string;
    dimensions: number;
  };
}