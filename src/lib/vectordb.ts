import { DataAPIClient } from "@datastax/astra-db-ts";
import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Document } from "@langchain/core/documents";

const endpoint = process.env.ASTRA_DB_API_ENDPOINT?.trim() ?? "";
const token = process.env.ASTRA_DB_APPLICATION_TOKEN?.trim() ?? "";
const collection = process.env.ASTRA_DB_COLLECTION?.trim() ?? "";

// Check if AstraDB is configured properly
const isAstraDBConfigured = !!(endpoint && token && collection && endpoint.startsWith("https://"));

// Mock in-memory store
class MockVectorStore {
  private documents: Document[] = [];

  async addDocuments(documents: Document[]) {
    this.documents.push(...documents);
    console.log(`Added ${documents.length} documents to mock vector store`);
    return documents;
  }

  async similaritySearch(query: string, k = 4) {
    // Return a subset of documents (or empty array if none exist)
    return this.documents.slice(0, k);
  }
}

// Export a function that returns our mock vector store
export async function getVectorStore() {
  console.log("Using mock vector store implementation");
  return new MockVectorStore();
}

// Export a mock collection for compatibility
export async function getEmbeddingsCollection() {
  console.log("Using mock collection implementation");
  const mockCollection = {
    deleteMany: async () => ({ deletedCount: 0 }),
    find: async () => ({ toArray: async () => [] }),
    insertMany: async () => ({ insertedIds: [] }),
  };
  return mockCollection;
}
