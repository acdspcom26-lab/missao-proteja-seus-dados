// Sons sintetizados localmente; nenhum arquivo, pedido de rede ou persistência.
export const cues = Object.freeze({
  select:[440], correct:[523,659], alert:[294,262], xp:[659,880], mission:[523,659,784], finish:[523,659,784,1047]
});
export function createAudio(AudioConstructor=globalThis.AudioContext||globalThis.webkitAudioContext) {
  let context=null,enabled=false;
  const active=new Set();
  const stop=()=>{for(const oscillator of active){try{oscillator.stop();}catch{ /* Já encerrado. */ }}active.clear();};
  return {
    get enabled(){return enabled;},get supported(){return Boolean(AudioConstructor);},
    async toggle(){
      if(enabled){enabled=false;stop();return false;}
      if(!AudioConstructor)return false;
      try{context??=new AudioConstructor();await context.resume();enabled=context.state==='running';return enabled;}catch{enabled=false;return false;}
    },
    play(name){
      if(!enabled||!context||context.state!=='running'||!cues[name])return false;
      try{stop();const now=context.currentTime;
        cues[name].forEach((frequency,i)=>{const osc=context.createOscillator(),gain=context.createGain();osc.type='sine';osc.frequency.value=frequency;gain.gain.setValueAtTime(0,now+i*.09);gain.gain.linearRampToValueAtTime(.055,now+i*.09+.012);gain.gain.exponentialRampToValueAtTime(.001,now+i*.09+.085);osc.connect(gain);gain.connect(context.destination);osc.onended=()=>{active.delete(osc);osc.disconnect();gain.disconnect();};active.add(osc);osc.start(now+i*.09);osc.stop(now+i*.09+.09);});return true;
      }catch{enabled=false;stop();return false;}
    },
    stop,
    async dispose(){enabled=false;stop();const previous=context;context=null;try{await previous?.close();}catch{/* Áudio nunca bloqueia o jogo. */}}
  };
}
