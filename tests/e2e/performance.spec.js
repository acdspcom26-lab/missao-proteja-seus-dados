import { test,expect } from '@playwright/test';
import { missions } from '../../docs/js/content/missions.js';
test('30 transições visíveis: p95 até 100 ms',async({page},testInfo)=>{
  test.setTimeout(60000);await page.goto('/');await expect(page.getByRole('button',{name:'Começar missão'})).toBeVisible();
  const timings=[];
  async function measure(locator){timings.push(await locator.evaluate(async button=>{const start=performance.now();button.click();await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));return performance.now()-start;}));}
  await measure(page.getByRole('button',{name:'Começar missão'}));
  for(const m of missions){for(const q of m.questions){for(const id of q.expectedOptionIds)await page.getByLabel(q.options.find(o=>o.id===id).label,{exact:true}).check();await measure(page.getByRole('button',{name:/Confirmar/}));}await measure(page.getByRole('button',{name:m.order===4?'Ver meu resultado':'Próxima missão'}));}
  await measure(page.getByRole('button',{name:/^(Reiniciar|Jogar novamente)$/}));
  await measure(page.getByRole('button',{name:'Reiniciar percurso'}));
  for(const m of missions){for(const q of m.questions){if(timings.length>=30)break;for(const id of q.expectedOptionIds)await page.getByLabel(q.options.find(o=>o.id===id).label,{exact:true}).check();await measure(page.getByRole('button',{name:/Confirmar/}));}if(timings.length>=30)break;await measure(page.getByRole('button',{name:m.order===4?'Ver meu resultado':'Próxima missão'}));}
  expect(timings).toHaveLength(30);const p95=[...timings].sort((a,b)=>a-b)[Math.ceil(.95*timings.length)-1];
  const report={browser:await page.context().browser().version(),platform:process.platform,architecture:process.arch,timings,p95,method:'performance.now; ação aceita até duas requestAnimationFrame, após carregamento, sem throttling'};
  await testInfo.attach('performance',{body:JSON.stringify(report,null,2),contentType:'application/json'});console.log(JSON.stringify(report));expect(p95).toBeLessThanOrEqual(100);
});
