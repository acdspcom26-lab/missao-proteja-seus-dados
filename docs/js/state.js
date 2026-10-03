export const stages = ['identify','assess','decide','understand'];
export function initialState(generation = 0) {
  return { screen:'welcome', missionIndex:null, stage:null, draftOptionIds:[], answers:[], completedMissionIds:[], generation, revision:0, restartPromptOpen:false, validationMessage:null };
}
export const token = s => ({ generation:s.generation, revision:s.revision, missionId:s.missionIndex===null?null:`mission-${s.missionIndex+1}`, stage:s.stage });
export function transition(s, action, catalog) {
  const t = token(s);
  if(!action.token || Object.keys(t).some(k=>t[k]!==action.token[k])) return s;
  const next = changes => ({ ...s, ...changes, revision:s.revision+1 });
  if(s.restartPromptOpen) {
    if(action.type==='cancel') return next({restartPromptOpen:false});
    if(action.type==='reset') return {...initialState(s.generation+1),screen:'mission',missionIndex:0,stage:'identify'};
    return s;
  }
  if(action.type==='restart' && ['mission','result'].includes(s.screen)) return next({restartPromptOpen:true});
  if(action.type==='start' && s.screen==='welcome') return next({screen:'mission',missionIndex:0,stage:'identify'});
  if(s.screen!=='mission') return s;
  const mission = catalog[s.missionIndex];
  if(action.type==='continue' && s.stage==='understand') {
    const completedMissionIds = [...s.completedMissionIds,mission.id];
    if(s.missionIndex===3) return s.answers.length===12 ? next({screen:'result',stage:null,completedMissionIds}) : s;
    return next({missionIndex:s.missionIndex+1,stage:'identify',draftOptionIds:[],completedMissionIds});
  }
  const q = mission.questions.find(q=>q.dimension===s.stage);
  if(!q) return s;
  if(action.type==='select') {
    const ids = action.ids;
    if(!Array.isArray(ids) || new Set(ids).size!==ids.length || ids.some(id=>!q.options.some(o=>o.id===id)) || (q.selectionMode==='single' && ids.length>1)) return s;
    return {...s,draftOptionIds:[...ids],validationMessage:null};
  }
  if(action.type==='confirm') {
    if(!s.draftOptionIds.length) return {...s,validationMessage:'Escolha pelo menos uma opção antes de confirmar.'};
    if(s.answers.some(a=>a.missionId===mission.id && a.dimension===q.dimension)) return s;
    const answer = Object.freeze({missionId:mission.id,questionId:q.id,dimension:q.dimension,selectedOptionIds:Object.freeze([...s.draftOptionIds])});
    return next({answers:[...s.answers,answer],stage:stages[stages.indexOf(s.stage)+1],draftOptionIds:[],validationMessage:null});
  }
  return s;
}
