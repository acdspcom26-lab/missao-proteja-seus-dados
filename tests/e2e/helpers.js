import { expect } from '@playwright/test';
import { missions } from '../../docs/js/content/missions.js';
export async function start(page) { await page.goto('/'); await page.getByRole('button', {name:'Começar missão'}).click(); }
export async function answer(page, mission, dimension, adequate = true) {
  const q = mission.questions.find(q=>q.dimension===dimension);
  const ids = adequate ? q.expectedOptionIds : [q.options.find(o=>!q.expectedOptionIds.includes(o.id)).id];
  for(const id of ids) await page.getByLabel(q.options.find(o=>o.id===id).label,{exact:true}).check();
  await page.getByRole('button',{name:/Confirmar/}).click();
}
export async function journey(page, counts=[4,4,4], afterStage) {
  await start(page);
  for(const [i,m] of missions.entries()) {
    for(const [d,dimension] of ['identify','assess','decide'].entries()) { if(afterStage) await afterStage(); await answer(page,m,dimension,i<counts[d]); }
    await expect(page.getByRole('heading',{name:'Proteção reforçada!'})).toBeVisible();
    if(afterStage) await afterStage();
    await page.getByRole('button',{name:i===3?'Ver meu resultado':'Próxima missão'}).click();
  }
}
