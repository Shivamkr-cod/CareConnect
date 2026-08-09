import { PrismaClient } from "@prisma/client";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const globalForPrisma = globalThis;

export const db = globalForPrisma.prisma || (function() {
  const connectionString = process.env.DATABASE_URL || "postgresql://roadsidecoder:npg_sg0dzoEUZe2K@ep-proud-pine-axeucb91-pooler.c-4.us-east-2.aws.neon.tech/CareConnect?sslmode=require&channel_binding=require";
  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter });
})();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

// globalThis.prisma: This global variable ensures that the Prisma client instance is
// reused across hot reloads during development. Without this, each time your application
// reloads, a new instance of the Prisma client would be created, potentially leading
// to connection issues.
