import { test,expect } from '@playwright/test';
import { start,answer,journey } from './helpers.js';
import { missions } from '../../docs/js/content/missions.js';
test('capturas para revisão visual',async({page},testInfo)=>{
  test.setTimeout(90000); // Duas jornadas e capturas das quatro simulações.
  await page.setViewportSize({width:1280,height:900});await page.goto('/');await expect(page.getByRole('button',{name:'Começar missão'})).toBeVisible();
  await page.screenshot({path:testInfo.outputPath('welcome.png'),fullPage:true});
  await page.getByRole('button',{name:'Começar missão'}).click();await page.screenshot({path:testInfo.outputPath('mission.png'),fullPage:true});
  for(const d of ['identify','assess','decide']) await answer(page,missions[0],d,false);
  await page.screenshot({path:testInfo.outputPath('feedback.png'),fullPage:true});
  for(const m of missions.slice(1)){
    await page.getByRole('button',{name:'Próxima missão'}).click();
    await page.screenshot({path:testInfo.outputPath(`mission-${m.order}.png`),fullPage:true});
    for(const d of ['identify','assess','decide'])await answer(page,m,d,true);
  }
  await page.setViewportSize({width:360,height:800});await page.goto('/');await expect(page.getByRole('button',{name:'Começar missão'})).toBeVisible();await page.screenshot({path:testInfo.outputPath('mobile.png'),fullPage:true});
  await page.getByRole('button',{name:'Começar missão'}).click();
  const sceneBox=await page.locator('.scenario').boundingBox();const challengeBox=await page.locator('.activity').boundingBox();
  expect(challengeBox.y).toBeGreaterThanOrEqual(sceneBox.y+sceneBox.height);
  await page.screenshot({path:testInfo.outputPath('mobile-mission.png'),fullPage:true});
  await page.addStyleTag({content:':root{font-size:32px!important}'});await page.screenshot({path:testInfo.outputPath('zoom.png'),fullPage:true});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.setViewportSize({width:1280,height:900});await journey(page,[1,2,3]);await page.screenshot({path:testInfo.outputPath('result.png'),fullPage:true});
});
