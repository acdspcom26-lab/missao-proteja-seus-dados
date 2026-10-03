import { test,expect } from '@playwright/test';
import { journey } from './helpers.js';
test('nenhuma coleta, persistência ou envio durante percurso',async({page,context})=>{
  test.setTimeout(60000);const requests=[],logs=[];page.on('request',r=>requests.push({url:r.url(),method:r.method()}));page.on('console',m=>logs.push(m.text()));
  await journey(page,[1,2,3]);
  expect(requests.every(r=>r.url.startsWith('http://127.0.0.1:4173/') && r.method==='GET' && !r.url.includes('?'))).toBe(true);
  expect(await context.cookies()).toEqual([]);
  expect(await page.evaluate(async()=>({local:localStorage.length,session:sessionStorage.length,db:(await indexedDB.databases()).length,workers:(await navigator.serviceWorker.getRegistrations()).length}))).toEqual({local:0,session:0,db:0,workers:0});
  expect(logs).toEqual([]);await expect(page.locator('input[type="text"],input[type="email"],input[type="file"],textarea')).toHaveCount(0);
});
