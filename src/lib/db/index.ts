import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { NeonQueryFunction } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

const sql = neon(process.env.DATABASE_URL!) as NeonQueryFunction<boolean, boolean>;
export const db = drizzle(sql);
