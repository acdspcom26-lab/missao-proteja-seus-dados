import { test,expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { start,answer,journey } from './helpers.js';
import { missions } from '../../docs/js/content/missions.js';
test('axe, teclado e foco nas quatro etapas',async({page})=>{
  await page.goto('/'); await expect(page.getByRole('button',{name:'Começar missão'})).toBeVisible();
  expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);
  await page.getByRole('button',{name:'Começar missão'}).focus(); await page.keyboard.press('Enter');
  for(const dimension of ['identify','assess','decide']) {
    await expect(page.locator('.stage-title')).toBeFocused();
    expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);
    await page.keyboard.press('Tab');await expect(page.locator('input').first()).toBeFocused();await page.keyboard.press('Space');
    await page.getByRole('button',{name:/Confirmar/}).focus();await page.keyboard.press('Enter');
  }
  expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);
  await page.getByRole('button',{name:/^(Reiniciar|Jogar novamente)$/}).click();
  await expect(page.getByRole('button',{name:'Cancelar'})).toBeFocused();
  expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);
  await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:/^(Reiniciar|Jogar novamente)$/})).toBeFocused();
});
test('resultado e diálogo acessíveis, cancelar retorna foco',async({page})=>{
  test.setTimeout(60000);await journey(page,[1,2,3]);
  expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);
  await page.getByRole('button',{name:/^(Reiniciar|Jogar novamente)$/}).click();expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);
  await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:/^(Reiniciar|Jogar novamente)$/})).toBeFocused();
  await page.setViewportSize({width:360,height:800});await page.addStyleTag({content:':root{font-size:32px!important}'});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
