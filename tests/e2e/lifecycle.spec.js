import { test,expect } from '@playwright/test';
import { start,answer } from './helpers.js';
import { missions } from '../../docs/js/content/missions.js';
test('recarga, saída/retorno e troca de abas',async({page,context})=>{
  await start(page);
  for(const m of missions.slice(0,3)){for(const d of ['identify','assess','decide'])await answer(page,m,d);await page.getByRole('button',{name:'Próxima missão'}).click();}
  await expect(page.getByText(missions[3].title,{exact:true})).toBeVisible();
  const other=await context.newPage();await other.goto('about:blank');await page.bringToFront();await expect(page.getByText(missions[3].title,{exact:true})).toBeVisible();await other.close();
  await page.reload();await expect(page.getByRole('button',{name:'Começar missão'})).toBeVisible();
  await page.getByRole('button',{name:'Começar missão'}).click();await page.goto('about:blank');await page.goBack();await expect(page.getByRole('button',{name:'Começar missão'})).toBeVisible();
});
test('handlers pagehide e pageshow persisted limpam estado e interface',async({page})=>{
  await start(page);await page.getByLabel('Endereço de casa',{exact:true}).check();
  await page.evaluate(()=>window.dispatchEvent(new PageTransitionEvent('pagehide',{persisted:true})));
  await expect(page.locator('#main')).toBeEmpty();
  await page.evaluate(()=>window.dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true})));
  await expect(page.getByRole('button',{name:'Começar missão'})).toBeVisible();
});
