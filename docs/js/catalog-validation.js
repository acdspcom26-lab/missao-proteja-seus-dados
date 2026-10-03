const requireRule = (condition, message) => { if (!condition) throw new Error(`Catálogo inválido: ${message}`); };
const text = v => typeof v === 'string' && v.trim().length > 0;
const unique = a => Array.isArray(a) && new Set(a).size === a.length;
export function validateCatalog(catalog) {
  requireRule(Array.isArray(catalog) && catalog.length === 4, 'quatro missões');
  const questionIds = [];
  for (const [i, m] of catalog.entries()) {
    requireRule(m.id === `mission-${i + 1}` && m.order === i + 1, 'ordem e identificação');
    requireRule(['title','objective','complexity'].every(k=>text(m[k])) && m.skill === 'EF08CO08', 'objetivo e textos');
    requireRule(m.focus === ['identify','assess','decide','integrate'][i], 'foco predominante');
    requireRule(m.shortFeedback && ['identify','assess','decide'].every(k=>text(m.shortFeedback[k]) && m.shortFeedback[k].length<=200), 'feedback curto');
    requireRule(m.synthesis && ['dataExplanation','riskExplanation','protectionExplanation'].every(k=>text(m.synthesis[k])), 'síntese');
    requireRule(Array.isArray(m.integratedMissionIds) && JSON.stringify(m.integratedMissionIds) === JSON.stringify(i === 3 ? catalog.slice(0,3).map(x=>x.id) : []), 'integração');
    requireRule(m.context && ['social-profile','game-chat','social-post','game-offer','combined'].includes(m.context.kind) && text(m.context.introduction), 'contexto');
    const elements = m.context.elements;
    requireRule(Array.isArray(elements) && elements.length > 0 && unique(elements.map(e=>e.id)), 'elementos');
    for (const e of elements) {
      requireRule(text(e.id) && text(e.text) && ['profile','message','post','offer','illustration'].includes(e.kind), 'elemento');
      if(e.kind === 'illustration') requireRule(text(e.description) && text(e.assetPath), 'descrição equivalente');
      if(e.assetPath) requireRule(/^assets\/illustrations\/[a-z0-9-]+\.svg$/.test(e.assetPath), 'recurso local');
    }
    const references = (ids, targets, nonempty = false) => Array.isArray(ids) && unique(ids) && (!nonempty || ids.length > 0) && ids.every(id=>targets.includes(id));
    requireRule(Array.isArray(m.personalData) && m.personalData.length > 0 && unique(m.personalData.map(d=>d.id)), 'dados');
    for(const d of m.personalData) requireRule(text(d.id) && text(d.label) && ['identification','contact','location','routine','credential','linking-clue'].includes(d.category) && references(d.elementIds,elements.map(e=>e.id),true), 'referência de dado');
    requireRule(Array.isArray(m.risks) && m.risks.length > 0 && unique(m.risks.map(r=>r.id)), 'riscos');
    for(const r of m.risks) requireRule(text(r.id) && text(r.explanation) && references(r.datumIds,m.personalData.map(d=>d.id),true), 'referência de risco');
    requireRule(Array.isArray(m.questions) && m.questions.length === 3, 'três perguntas');
    for(const [j,q] of m.questions.entries()) {
      questionIds.push(q.id);
      requireRule(text(q.id) && text(q.prompt) && q.dimension === ['identify','assess','decide'][j] && q.selectionMode === (j===2?'single':'multiple'), 'pergunta');
      requireRule(Array.isArray(q.options) && q.options.length >= 2 && unique(q.options.map(o=>o.id)), 'opções');
      requireRule(references(q.expectedOptionIds,q.options.map(o=>o.id),true) && q.expectedOptionIds.length < q.options.length && (j!==2 || q.expectedOptionIds.length===1), 'gabarito e distrator');
      for(const o of q.options) requireRule(text(o.id) && text(o.label) && text(o.explanation?.whenSelected) && text(o.explanation?.whenOmitted) && references(o.elementIds,elements.map(e=>e.id)) && references(o.datumIds,m.personalData.map(d=>d.id)) && references(o.riskIds,m.risks.map(r=>r.id)), 'alternativa e explicação');
    }
  }
  requireRule(unique(questionIds),'IDs de perguntas');
  return true;
}
