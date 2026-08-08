const { parse } = require('pg-connection-string');
const connStr = "postgresql://shivam:npg_LJcjo8M3Zagi@ep-proud-pine-axeucb91.c-4.us-east-2.aws.neon.tech/MediMeet?sslmode=require&channel_binding=require";
console.log(parse(connStr));
