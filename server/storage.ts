// Chat widget storage interface
// Currently using in-memory storage for simplicity

export interface IStorage {
  // Future: Add methods for storing chat sessions, analytics, etc.
  getHealthStatus(): Promise<{ status: string; timestamp: string }>;
}

export class MemStorage implements IStorage {
  constructor() {
    // Initialize storage
  }

  async getHealthStatus(): Promise<{ status: string; timestamp: string }> {
    return {
      status: "ok",
      timestamp: new Date().toISOString()
    };
  }
}

export const storage = new MemStorage();
