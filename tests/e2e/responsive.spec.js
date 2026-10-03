import { test,expect } from '@playwright/test';
import { start,answer } from './helpers.js';
import { missions } from '../../docs/js/content/missions.js';
for(const width of [360,768,1280]) test(`layout e texto 200% em ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:900});await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/'); await expect(page.getByRole('button',{name:'Começar missão'})).toBeVisible();
  await page.addStyleTag({content:':root { font-size:32px !important; }'});
  const noOverflow=async()=>expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await noOverflow();await page.getByRole('button',{name:'Começar missão'}).click();
  for(const m of missions){for(const d of ['identify','assess','decide']) {await noOverflow();await answer(page,m,d,false);}await noOverflow();await page.getByRole('button',{name:m.order===4?'Ver meu resultado':'Próxima missão'}).click();}
  await noOverflow();await page.getByRole('button',{name:/^(Reiniciar|Jogar novamente)$/}).click();await noOverflow();await page.keyboard.press('Escape');
  await page.setViewportSize({width:900,height:width});await noOverflow();
});
test('toque em celular',async({browser})=>{
  const context=await browser.newContext({viewport:{width:360,height:800},hasTouch:true});const page=await context.newPage();
  await page.goto('http://127.0.0.1:4173/');await page.getByRole('button',{name:'Começar missão'}).tap();
  await page.getByLabel('Endereço de casa',{exact:true}).tap();await page.getByRole('button',{name:/Confirmar/}).tap();
  await expect(page.locator('li[aria-current="step"]')).toHaveText('2Avaliar');await context.close();
});
