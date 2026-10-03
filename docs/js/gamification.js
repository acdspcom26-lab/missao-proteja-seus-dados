import { evaluate } from './evaluation.js';
export const rewards = Object.freeze({identify:50, assess:50, decide:100, complete:25});
export function xpSummary(catalog,state) {
  const completed=new Set(state.completedMissionIds);
  const visible=new Set(completed);
  if(state.screen==='mission' && state.stage==='understand')visible.add(catalog[state.missionIndex].id);
  const earned=[];
  for(const m of catalog) {
    if(!visible.has(m.id))continue;
    for(const q of m.questions){const a=state.answers.find(a=>a.missionId===m.id&&a.dimension===q.dimension);if(a&&evaluate(q,a.selectedOptionIds)?.adequate)earned.push({missionId:m.id,dimension:q.dimension,amount:rewards[q.dimension]});}
    if(completed.has(m.id))earned.push({missionId:m.id,dimension:'complete',amount:rewards.complete});
  }
  return {total:earned.reduce((sum,e)=>sum+e.amount,0),earned};
}
