import { HuggingFaceRAG } from './huggingFaceRAG';

declare global {
  var __ragInstance: HuggingFaceRAG | undefined;
}

let ragInstance: HuggingFaceRAG | null = null;

export async function getSharedRAG(): Promise<HuggingFaceRAG> {
  if (process.env.NODE_ENV === 'development') {
    if (!global.__ragInstance) {
      global.__ragInstance = new HuggingFaceRAG();
      await global.__ragInstance.initialize();
    }
    return global.__ragInstance;
  }
  
  if (!ragInstance) {
    ragInstance = new HuggingFaceRAG();
    await ragInstance.initialize();
  }
  return ragInstance;
}

export function resetRAGInstance(): void {
  if (process.env.NODE_ENV === 'development') {
    global.__ragInstance = undefined;
  } else {
    ragInstance = null;
  }
}