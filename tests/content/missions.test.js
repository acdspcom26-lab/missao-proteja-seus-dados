import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateCatalog } from '../../docs/js/catalog-validation.js';
import { catalog } from '../fixtures/catalog.js';
import { missions } from '../../docs/js/content/missions.js';
test('quatro roteiros preservam focos, dados, riscos e três perguntas',()=>{
 assert.equal(validateCatalog(missions),true);
 assert.deepEqual(missions.map(m=>m.title),["Identificar: o convite do baú lendário","Avaliar: a rotina no feed","Decidir: o contato desconhecido","Desafio final: proteja a personagem"]);
 assert.deepEqual(missions.map(m=>m.focus),['identify','assess','decide','integrate']);
 assert.deepEqual(missions.map(m=>m.questions.map(q=>q.expectedOptionIds)),[[["address","phone","password"],["exposure","account","reward"],["protect"]],[["routine","friend"],["audience","forward","other"],["protect"]],[["school","time"],["locate"],["protect"]],[["phone","location","routine","password"],["contact","locate","account","reward"],["protect"]]]);
 assert.ok(missions[3].risks.some(r=>r.datumIds.length>=2));
 assert.ok(missions[3].context.elements.some(e=>e.kind==='illustration'&&e.description.includes('Escola')));
});
test('catálogo válido e mutações inválidas', () => {
  assert.equal(validateCatalog(catalog), true);
  const mutations = [c=>c.pop(), c=>c[0].order=2, c=>c[0].skill='other', c=>c[0].title='', c=>c[0].questions[0].options[0].explanation.whenSelected='', c=>c[0].risks[0].datumIds=['unknown'], c=>c[0].context.elements[0].assetPath='https://example.com/a.svg', c=>c[3].integratedMissionIds=[], c=>c[0].questions[0].expectedOptionIds=['missing'], c=>c[0].questions[2].selectionMode='multiple'];
  for (const mutate of mutations) { const c = structuredClone(catalog); mutate(c); assert.throws(()=>validateCatalog(c)); }
});
test('contrato rejeita campos, referências, modos e IDs inconsistentes',()=>{
  const changes=[
    c=>c[0].focus='decide',c=>c[0].shortFeedback.identify='',
    c=>c[0].id='mission-8',c=>c[0].objective='',c=>c[0].complexity='',
    c=>c[0].synthesis.dataExplanation='',c=>c[0].synthesis.riskExplanation='',c=>c[0].synthesis.protectionExplanation='',
    c=>c[0].context.kind='unknown',c=>c[0].context.introduction='',c=>c[0].context.elements=[],
    c=>c[0].context.elements.push({...c[0].context.elements[0]}),c=>c[0].context.elements[0].text='',c=>c[0].context.elements[0].kind='unknown',
    c=>c[0].context.elements[0].kind='illustration',c=>c[0].context.elements[0].assetPath='../external.svg',
    c=>c[0].personalData=[],c=>c[0].personalData[0].label='',c=>c[0].personalData[0].category='unknown',c=>c[0].personalData[0].elementIds=[],c=>c[0].personalData[0].elementIds=['missing'],
    c=>c[0].risks=[],c=>c[0].risks[0].explanation='',c=>c[0].risks[0].datumIds=[],
    c=>c[0].questions.pop(),c=>c[0].questions[0].dimension='decide',c=>c[0].questions[0].prompt='',c=>c[1].questions[0].id=c[0].questions[0].id,
    c=>c[0].questions[0].options.pop(),c=>c[0].questions[0].options[1].id='yes',c=>c[0].questions[0].expectedOptionIds=[],c=>c[0].questions[0].expectedOptionIds=['yes','no'],
    c=>c[0].questions[0].options[0].label='',c=>c[0].questions[0].options[0].elementIds=['missing'],c=>c[0].questions[0].options[0].datumIds=['missing'],c=>c[0].questions[0].options[0].riskIds=['missing'],c=>c[0].questions[0].options[0].explanation.whenOmitted=''
  ];
  for(const change of changes){const copy=structuredClone(catalog);change(copy);assert.throws(()=>validateCatalog(copy));}
});
