import { test,expect } from '@playwright/test';
import { start,answer,journey } from './helpers.js';
import { missions } from '../../docs/js/content/missions.js';
for(const [counts,total] of [[[4,4,4],900],[[0,0,0],100],[[1,2,3],550]])test(`XP ${total}, quatro missões e reinício`,async({page})=>{
  await journey(page,counts);await expect(page.locator('.result-xp')).toHaveText(`${total} XP OBTIDOS`);
  await expect(page.locator('.hud')).toContainText('12 de 12 desafios respondidos');
  await page.getByRole('button',{name:'Jogar novamente'}).click();await page.getByRole('button',{name:'Reiniciar percurso'}).click();await expect(page.locator('.xp-total')).toHaveText('0 XP');
});
test('XP aparece só em Aprender, feedback breve e bônus único',async({page})=>{
  await start(page);await answer(page,missions[0],'identify');await expect(page.locator('.xp-total')).toHaveText('0 XP');
  await answer(page,missions[0],'assess');await expect(page.locator('.xp-total')).toHaveText('0 XP');await answer(page,missions[0],'decide');
  await expect(page.locator('.xp-total')).toHaveText('200 XP');await expect(page.locator('.feedback-card')).toHaveCount(3);
  for(const text of await page.locator('.feedback-card p').allTextContents()){expect(text.length).toBeLessThan(280);expect(text.split(/[.!?]+/).filter(x=>x.trim()).length).toBeLessThanOrEqual(2);}
  await page.getByRole('button',{name:'Próxima missão'}).evaluate(b=>{b.click();b.click();});await expect(page.locator('.xp-total')).toHaveText('225 XP');await expect(page.locator('.hud-mission')).toContainText('MISSÃO 2 DE 4');
});
test('som opt-in local e controle por teclado',async({page})=>{
  await page.addInitScript(()=>{const Original=window.AudioContext;window.__sounds=0;window.AudioContext=class extends Original{createOscillator(){window.__sounds++;return super.createOscillator();}};});
  await start(page);await page.getByLabel('Endereço de casa',{exact:true}).check();expect(await page.evaluate(()=>window.__sounds)).toBe(0);
  const sound=page.getByRole('button',{name:'Som: desligado'});await sound.focus();await page.keyboard.press('Enter');await expect(page.getByRole('button',{name:'Som: ligado'})).toHaveAttribute('aria-pressed','true');
  await expect.poll(()=>page.evaluate(()=>window.__sounds)).toBeGreaterThan(0);await page.getByRole('button',{name:'Som: ligado'}).click();
  const count=await page.evaluate(()=>window.__sounds);await page.getByLabel('Telefone',{exact:true}).check();expect(await page.evaluate(()=>window.__sounds)).toBe(count);
  await page.reload();await expect(page.getByRole('button',{name:'Som: desligado'})).toHaveAttribute('aria-pressed','false');
});
test('falha de áudio não bloqueia o percurso',async({page})=>{
  await page.addInitScript(()=>{window.AudioContext=class{constructor(){throw Error('Audio indisponível');}};});
  await start(page);await page.getByRole('button',{name:'Som: desligado'}).click();await expect(page.getByRole('button',{name:'Som: indisponível'})).toBeEnabled();await expect(page.locator('#audio-status')).toContainText('Você pode continuar');await answer(page,missions[0],'identify');await expect(page.locator('li[aria-current="step"]')).toContainText('Avaliar');
});
test('movimento reduzido remove animações sem retirar feedback',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});await start(page);for(const d of ['identify','assess','decide'])await answer(page,missions[0],d,false);
  await expect(page.locator('.feedback-card')).toHaveCount(3);expect(await page.locator('.activity').evaluate(e=>getComputedStyle(e).animationName)).toBe('none');
});
