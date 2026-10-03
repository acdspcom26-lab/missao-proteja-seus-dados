import { test } from 'node:test';
import assert from 'node:assert/strict';
import { evaluate, feedback, results } from '../../docs/js/evaluation.js';
import { missions } from '../../docs/js/content/missions.js';
import { answersFor } from '../fixtures/answers.js';
const q = { options: ['a','b','c'].map(id => ({ id })), expectedOptionIds: ['a','b'], selectionMode: 'multiple' };
test('conjuntos exatos, parciais e indevidos', () => {
  assert.equal(evaluate(q, ['b','a']).adequate, true);
  assert.deepEqual(evaluate(q, ['a','c']), { adequate: false, matchedOptionIds: ['a'], missingOptionIds: ['b'], extraOptionIds: ['c'] });
  assert.equal(evaluate(q, []), null);
  assert.throws(() => evaluate(q, ['unknown']));
  assert.throws(() => evaluate(q, ['a','a']));
});
test('resultados independentes, conclusões exigidas e contagens conhecidas',()=>{
  for(const counts of [[4,4,4],[0,0,0],[1,2,3]]) {
    const answers=answersFor(missions,counts);
    const r=results(missions,answers,missions.map(m=>m.id));
    assert.deepEqual(r.map(x=>x.adequateCount),counts);
    assert.ok(r.every(x=>x.total===4 && x.guidance.length>0));
    assert.throws(()=>results(missions,answers.slice(1),missions.map(m=>m.id)));
    assert.throws(()=>results(missions,answers,[]));
  }
});
test('feedback de todas as alternativas inclui escolhas e omissões', () => {
  for(const m of missions) for(const q of m.questions) for(const o of q.options) {
    const answers = answersFor([m],[4,4,4]);
    answers.find(a=>a.dimension===q.dimension).selectedOptionIds=[o.id];
    const f=feedback(m,answers).find(f=>f.dimension===q.dimension);
    assert.ok(f.comments.some(c=>c.text===o.explanation.whenSelected));
    for(const id of q.expectedOptionIds.filter(id=>id!==o.id)) assert.ok(f.comments.some(c=>c.text===q.options.find(x=>x.id===id).explanation.whenOmitted));
  }
});
