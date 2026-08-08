const { Pool } = require('@neondatabase/serverless');
const ws = require('ws');
const { neonConfig } = require('@neondatabase/serverless');
neonConfig.webSocketConstructor = ws;

async function test() {
  const connectionString = "postgresql://shivam:npg_LJcjo8M3Zagi@ep-proud-pine-axeucb91.c-4.us-east-2.aws.neon.tech/MediMeet?sslmode=require&channel_binding=require";
  const pool = new Pool({ connectionString });
  try {
    const client = await pool.connect();
    console.log("Connected!");
    client.release();
  } catch (err) {
    console.error("Connection failed:", err.message);
  }
}
test();
