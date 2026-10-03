import { test } from 'node:test';
import assert from 'node:assert/strict';
import { xpSummary } from '../../docs/js/gamification.js';
import { missions } from '../../docs/js/content/missions.js';
import { answersFor } from '../fixtures/answers.js';
test('XP derivado, bônus por concluir com erros e total máximo',()=>{
  for(const [counts,expected] of [[[4,4,4],900],[[0,0,0],100],[[1,2,3],550]]) {
    const state={answers:answersFor(missions,counts),completedMissionIds:missions.map(m=>m.id),screen:'result',stage:null,missionIndex:3};
    assert.equal(xpSummary(missions,state).total,expected);
    assert.equal(xpSummary(missions,state).total,expected);
    const repeated={...state,answers:[...state.answers,state.answers[0]],completedMissionIds:[...state.completedMissionIds,'mission-1']};
    assert.equal(xpSummary(missions,repeated).total,expected);
  }
});
test('XP não revela acertos antes de Aprender',()=>{
  const answers=answersFor(missions,[4,4,4]).slice(0,3);
  const state={answers,completedMissionIds:[],screen:'mission',missionIndex:0,stage:'decide'};
  assert.equal(xpSummary(missions,state).total,0);
  assert.equal(xpSummary(missions,{...state,stage:'understand'}).total,200);
  assert.equal(xpSummary(missions,{answers:[],completedMissionIds:[],screen:'welcome'}).total,0);
});
