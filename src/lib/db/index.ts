import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

/**
 * Create database connection
 */
function createDatabase() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const sql = neon(databaseUrl);
  return drizzle(sql, { schema });
}

// Singleton database instance
let dbInstance: ReturnType<typeof createDatabase> | null = null;

/**
 * Get database instance (singleton)
 */
export function getDb() {
  if (!dbInstance) {
    dbInstance = createDatabase();
  }
  return dbInstance;
}

/**
 * Database instance for direct imports
 */
export const db = createDatabase();

// Re-export schema for convenience
export * from "./schema";
