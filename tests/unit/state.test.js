import { test } from 'node:test';
import assert from 'node:assert/strict';
import { initialState, transition, token } from '../../docs/js/state.js';
import { catalog } from '../fixtures/catalog.js';
test('12 respostas, erros não bloqueiam, tokens antigos não avançam', () => {
  let s = initialState();
  const act = (type, extra = {}) => { s = transition(s, { type, token: token(s), ...extra }, catalog); };
  act('start');
  act('confirm'); assert.equal(s.answers.length, 0); assert.ok(s.validationMessage);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      act('select', { ids: ['no'] });
      const old = token(s); act('confirm');
      assert.equal(transition(s, { type: 'confirm', token: old }, catalog), s);
    }
    assert.equal(s.stage, 'understand'); act('continue');
  }
  assert.equal(s.screen, 'result'); assert.equal(s.answers.length, 12); assert.equal(s.completedMissionIds.length, 4);
  act('restart'); act('cancel'); assert.equal(s.answers.length, 12);
  act('restart'); act('reset'); assert.equal(s.answers.length, 0); assert.equal(s.missionIndex, 0);
});
test('pré-condições, seleção inválida, diálogo e retorno', () => {
  let s = initialState();
  const act = (type, extra = {}) => { s = transition(s, { type, token: token(s), ...extra }, catalog); };
  act('continue'); assert.equal(s.screen, 'welcome');
  act('start'); act('select', { ids: ['unknown'] }); assert.deepEqual(s.draftOptionIds, []);
  act('select', { ids: ['yes'] }); act('restart'); act('confirm'); assert.equal(s.answers.length, 0);
  act('cancel'); assert.deepEqual(s.draftOptionIds, ['yes']);
  act('confirm'); assert.ok(Object.isFrozen(s.answers[0].selectedOptionIds));
});
test('reinício invalida tokens e resultado antecipado é ignorado',()=>{
  let s=initialState();
  s=transition(s,{type:'start',token:token(s)},catalog);
  const old=token(s);
  assert.equal(transition(s,{type:'continue',token:old},catalog),s);
  s=transition(s,{type:'restart',token:old},catalog);
  const dialogToken=token(s);
  s=transition(s,{type:'reset',token:dialogToken},catalog);
  assert.equal(transition(s,{type:'select',ids:['yes'],token:old},catalog),s);
  assert.equal(transition(s,{type:'reset',token:dialogToken},catalog),s);
  assert.equal(s.generation,1);assert.deepEqual(s.answers,[]);
});
