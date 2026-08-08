const { PrismaClient } = require('@prisma/client');
const { Pool, neonConfig } = require('@neondatabase/serverless');
const { PrismaNeon } = require('@prisma/adapter-neon');
const ws = require('ws');

neonConfig.webSocketConstructor = ws;

async function test() {
  // Purposely unset it from process.env to simulate missing env
  delete process.env.DATABASE_URL;

  const connectionString = "postgresql://roadsidecoder:npg_sg0dzoEUZe2K@ep-proud-pine-axeucb91-pooler.c-4.us-east-2.aws.neon.tech/MediMeet?sslmode=require&channel_binding=require";
  const adapter = new PrismaNeon({ connectionString });
  const prisma = new PrismaClient({ adapter });
  
  try {
    const user = await prisma.user.findFirst();
    console.log("Prisma connection successful!");
  } catch (err) {
    console.error("Prisma error:", err.message);
  }
}
test();
