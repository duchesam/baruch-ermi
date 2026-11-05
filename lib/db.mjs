import Database from 'better-sqlite3';
import pg from 'pg';
import path from 'node:path';
import fs from 'node:fs';
let singleton;
export function configured(){return Boolean(process.env.DATABASE_URL || (process.env.LOCAL_DATABASE_PATH && !process.env.VERCEL));}
export function database(){
 if(!configured()) throw Object.assign(new Error('Workspace storage is not configured.'),{status:503});
 if(singleton)return singleton;
 if(process.env.DATABASE_URL){const pool=new pg.Pool({connectionString:process.env.DATABASE_URL,max:5});singleton={kind:'postgres',auth:pool,async query(sql,args=[]){let i=0;const r=await pool.query(sql.replace(/\?/g,()=>'$'+(++i)),args);return {rows:r.rows,changes:r.rowCount};}};}
 else{const f=path.resolve(process.env.LOCAL_DATABASE_PATH);fs.mkdirSync(path.dirname(f),{recursive:true});const db=new Database(f);db.pragma('journal_mode = WAL');singleton={kind:'sqlite',auth:db,async query(sql,args=[]){const s=db.prepare(sql);return /^\s*(SELECT|WITH)/i.test(sql)?{rows:s.all(...args)}:{rows:[],changes:s.run(...args).changes};}};}
 return singleton;
}
export async function initializeCRM(){const db=database();for(const sql of [
 'CREATE TABLE IF NOT EXISTS crm_workspace (id TEXT PRIMARY KEY, revision INTEGER NOT NULL, data TEXT NOT NULL)',
 'CREATE TABLE IF NOT EXISTS inquiries (id TEXT PRIMARY KEY, dedupe TEXT UNIQUE NOT NULL, kind TEXT NOT NULL, created_at TEXT NOT NULL, data TEXT NOT NULL)',
 'CREATE TABLE IF NOT EXISTS scenarios (id TEXT PRIMARY KEY, property_id TEXT NOT NULL, created_at TEXT NOT NULL, name TEXT NOT NULL, data TEXT NOT NULL)',
 'CREATE TABLE IF NOT EXISTS crm_operations (id TEXT PRIMARY KEY, revision INTEGER NOT NULL, data TEXT NOT NULL)',
 'CREATE TABLE IF NOT EXISTS request_limits (id TEXT PRIMARY KEY, count INTEGER NOT NULL, expires_at BIGINT NOT NULL)'
 ])await db.query(sql);await db.query('INSERT INTO crm_workspace (id,revision,data) VALUES (?,?,?) ON CONFLICT(id) DO NOTHING',['company',0,JSON.stringify({version:4,records:[],cases:[],history:[],outreachSettings:{}})]);await db.query('INSERT INTO crm_operations (id,revision,data) VALUES (?,?,?) ON CONFLICT(id) DO NOTHING',['company',0,JSON.stringify({version:1,revision:0,opportunities:[],tasks:[],activity:[]})]);}

// All tables in a company export must describe the same database snapshot.
export async function readSnapshot(read){
 const db=database();
 if(db.kind==='postgres'){
  const client=await db.auth.connect();
  try{await client.query('BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY');const result=await read(async sql=>(await client.query(sql)).rows);await client.query('COMMIT');return result;}
  catch(error){await client.query('ROLLBACK');throw error;}finally{client.release();}
 }
 const reader=new Database(db.auth.name,{readonly:true});
 try{reader.exec('BEGIN');const result=await read(async sql=>reader.prepare(sql).all());reader.exec('COMMIT');return result;}
 catch(error){reader.exec('ROLLBACK');throw error;}finally{reader.close();}
}
