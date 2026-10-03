import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createAudio,cues } from '../../docs/js/audio.js';
test('seis sons locais, desligado inicialmente, toggle, stop e falha segura',async()=>{
  let starts=0,closes=0;
  class Context {
    state='running';currentTime=0;destination={};
    async resume(){}async close(){closes++;}
    createOscillator(){return{frequency:{value:0},connect(){},disconnect(){},start(){starts++;},stop(){}};}
    createGain(){return{gain:{setValueAtTime(){},linearRampToValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){},disconnect(){}};}
  }
  const audio=createAudio(Context);assert.equal(audio.enabled,false);assert.equal(audio.play('select'),false);assert.equal(starts,0);
  assert.equal(await audio.toggle(),true);for(const cue of Object.keys(cues))assert.equal(audio.play(cue),true);
  assert.equal(starts,Object.values(cues).flat().length);assert.equal(await audio.toggle(),false);assert.equal(audio.play('xp'),false);await audio.dispose();assert.equal(closes,1);
  const absent=createAudio(null);assert.equal(await absent.toggle(),false);assert.equal(absent.play('finish'),false);
  const broken=createAudio(class{constructor(){throw Error('unsupported');}});assert.equal(await broken.toggle(),false);
});
