import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const db = globalForPrisma.prisma || (function() {
  const envUrl = process.env.DATABASE_URL;
  let connectionString = envUrl || "postgresql://roadsidecoder:npg_sg0dzoEUZe2K@ep-proud-pine-axeucb91-pooler.c-4.us-east-2.aws.neon.tech/CareConnect?sslmode=require&channel_binding=require";
  
  if (connectionString) {
    connectionString = connectionString.replace(/^["']|["']$/g, '').trim();
  }

  if (!connectionString) {
    throw new Error("DATABASE_URL is missing or empty.");
  }

  process.env.DATABASE_URL = connectionString;

  return new PrismaClient();
})();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

// globalThis.prisma: This global variable ensures that the Prisma client instance is
// reused across hot reloads during development. Without this, each time your application
// reloads, a new instance of the Prisma client would be created, potentially leading
// to connection issues.
