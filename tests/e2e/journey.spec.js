import { test, expect } from '@playwright/test';
import { start, answer, journey } from './helpers.js';
import { missions } from '../../docs/js/content/missions.js';
test('Missão 1: contexto, omissão, respostas e feedback', async ({page})=>{
  await start(page);
  await expect(page.getByText('Identificar: o convite do baú lendário',{exact:true})).toBeVisible();
  await page.getByRole('button',{name:/Confirmar/}).click();
  await expect(page.getByRole('alert')).toContainText('Escolha pelo menos');
  for(const d of ['identify','assess','decide']) await answer(page,missions[0],d,false);
  await expect(page.getByRole('heading',{name:'Proteção reforçada!'})).toBeVisible();
  await expect(page.locator('.feedback')).toContainText('telefone');
  await page.getByRole('button',{name:'Próxima missão'}).click();
  await expect(page.getByText('Avaliar: a rotina no feed',{exact:true})).toBeVisible();
});
for(const [label,counts] of [['adequadas',[4,4,4]],['inadequadas',[0,0,0]]]) test(`percurso completo com respostas ${label}`,async({page})=>{
  test.setTimeout(60000);
  await journey(page,counts);
  await expect(page.getByRole('heading',{name:'Missão concluída!'})).toBeVisible();
  await expect(page).toHaveURL('http://127.0.0.1:4173/');
});
test('confirmar repetidamente não pula etapas',async({page})=>{
  await start(page);await page.getByLabel('Endereço de casa',{exact:true}).check();
  await page.getByRole('button',{name:/Confirmar/}).evaluate(button=>{button.click();button.click();button.click();});
  await expect(page.locator('li[aria-current="step"]')).toHaveText('2Avaliar');
  await expect(page.locator('input:checked')).toHaveCount(0);
});
for(const counts of [[4,4,4],[0,0,0],[1,2,3]]) test(`devolutivas ${counts.join('/')} e reinício`,async({page})=>{
  test.setTimeout(60000);await journey(page,counts);
  const cards=page.locator('.result-card');await expect(cards).toHaveCount(3);
  for(let i=0;i<3;i++)await expect(cards.nth(i)).toContainText(`${counts[i]} de 4 respostas adequadas`);
  await page.getByRole('button',{name:/^(Reiniciar|Jogar novamente)$/}).click();await page.getByRole('button',{name:'Cancelar'}).click();await expect(cards).toHaveCount(3);
  await page.getByRole('button',{name:/^(Reiniciar|Jogar novamente)$/}).click();await page.getByRole('button',{name:'Reiniciar percurso'}).click();
  await expect(page.getByText('Identificar: o convite do baú lendário',{exact:true})).toBeVisible();await expect(page.locator('input:checked')).toHaveCount(0);
});
test('cancelar mantém seleção e confirmação não revela gabarito',async({page})=>{
  await start(page);await page.getByLabel('Endereço de casa',{exact:true}).check();await page.getByRole('button',{name:/^(Reiniciar|Jogar novamente)$/}).click();await page.getByRole('button',{name:'Cancelar'}).click();
  await expect(page.getByLabel('Endereço de casa',{exact:true})).toBeChecked();await expect(page.locator('.feedback')).toHaveCount(0);
  await page.getByRole('button',{name:/Confirmar/}).click();await expect(page.locator('li[aria-current="step"]')).toHaveText('2Avaliar');
});
