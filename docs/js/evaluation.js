export function evaluate(question, ids) {
  if (!Array.isArray(ids) || new Set(ids).size !== ids.length || ids.some(id=>!question.options.some(o=>o.id===id)) || (question.selectionMode === 'single' && ids.length > 1)) throw new Error('Seleção inválida');
  if (!ids.length) return null;
  const expected = question.expectedOptionIds;
  const matchedOptionIds = ids.filter(id=>expected.includes(id));
  const missingOptionIds = expected.filter(id=>!ids.includes(id));
  const extraOptionIds = ids.filter(id=>!expected.includes(id));
  return { adequate: !missingOptionIds.length && !extraOptionIds.length, matchedOptionIds, missingOptionIds, extraOptionIds };
}
export function feedback(mission, answers) {
  return mission.questions.map(q=>{
    const answer=answers.find(a=>a.missionId===mission.id && a.dimension===q.dimension);
    if(!answer) throw new Error('Resposta ausente');
    const evaluation=evaluate(q,answer.selectedOptionIds);
    return {dimension:q.dimension,...evaluation,comments:q.options.filter(o=>answer.selectedOptionIds.includes(o.id)||q.expectedOptionIds.includes(o.id)).map(o=>({label:o.label,selected:answer.selectedOptionIds.includes(o.id),text:answer.selectedOptionIds.includes(o.id)?o.explanation.whenSelected:o.explanation.whenOmitted}))};
  });
}
export function results(catalog, answers, completedMissionIds) {
  if(answers.length!==12 || completedMissionIds.length!==4 || catalog.some((m,i)=>m.id!==completedMissionIds[i]) || new Set(answers.map(a=>`${a.missionId}:${a.dimension}`)).size!==12) throw new Error('Percurso incompleto');
  return ['identify','assess','decide'].map((dimension,index)=>{
    const adequateMissionIds=[],reviewMissionIds=[];
    for(const m of catalog) {
      const a=answers.find(a=>a.missionId===m.id && a.dimension===dimension);
      if(!a)throw new Error('Resposta ausente');
      const q=m.questions.find(q=>q.dimension===dimension);
      if(a.questionId!==q.id)throw new Error('Pergunta incompatível');
      const e=evaluate(q,a.selectedOptionIds);if(!e)throw new Error('Resposta vazia');
      (e.adequate?adequateMissionIds:reviewMissionIds).push(m.id);
    }
    const adequateCount=adequateMissionIds.length;
    const example=catalog.find(m=>m.id===(adequateMissionIds[0]||reviewMissionIds[0]));
    const learning=example.synthesis[['dataExplanation','riskExplanation','protectionExplanation'][index]];
    const guidance=adequateCount===4?`Boa leitura das situações! ${learning}`:adequateCount===0?`Uma dica para a próxima tentativa: ${learning}`:`Você já demonstrou este cuidado: ${learning}`;
    return {dimension,adequateCount,total:4,adequateMissionIds,reviewMissionIds,guidance};
  });
}
