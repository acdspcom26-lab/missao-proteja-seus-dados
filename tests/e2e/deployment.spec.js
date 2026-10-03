import { test,expect } from '@playwright/test';
import { answer } from './helpers.js';
import { missions } from '../../docs/js/content/missions.js';
for(const url of ['http://127.0.0.1:4173/','http://127.0.0.1:4174/docs/'])test(`arquivos e percurso em ${url}`,async({page})=>{
  test.setTimeout(60000);const failures=[];page.on('response',r=>{if(r.status()>=400)failures.push(r.url());});
  await page.goto(url);await page.getByRole('button',{name:'Começar missão'}).click();
  for(const m of missions){for(const d of ['identify','assess','decide'])await answer(page,m,d);await page.getByRole('button',{name:m.order===4?'Ver meu resultado':'Próxima missão'}).click();}
  await expect(page.locator('.result-card')).toHaveCount(3);await page.reload();await expect(page.getByRole('button',{name:'Começar missão'})).toBeVisible();expect(failures).toEqual([]);
});
test('falha de recurso e de módulo não inventa resultado',async({page})=>{
  await page.route('**/mission-4.svg',route=>route.abort());await page.goto('/');await expect(page.getByRole('heading',{name:'Não foi possível carregar as missões'})).toBeVisible();await expect(page.locator('.result-card')).toHaveCount(0);
  await page.unroute('**/mission-3.svg');await page.route('**/app.js',route=>route.abort());await page.reload();await expect(page.getByText(/Se o conteúdo não aparecer/)).toBeVisible();
});
test('catálogo inválido não libera perguntas',async({page})=>{
  await page.route('**/content/missions.js',route=>route.fulfill({contentType:'text/javascript',body:'export const missions = [];'}));await page.goto('/');await expect(page.getByRole('button',{name:'Recarregar'})).toBeVisible();await expect(page.locator('input')).toHaveCount(0);
});
test('JavaScript desativado explica a limitação',async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();await page.goto('http://127.0.0.1:4173/');await expect(page.locator('.no-script')).toBeVisible();await expect(page.locator('.no-script')).toContainText('JavaScript');await context.close();
});
