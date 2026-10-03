import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdir,stat,readFile } from 'node:fs/promises';
import { join } from 'node:path';
test('arquivos públicos locais somam até 1 MiB',async()=>{
  let bytes=0;
  async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const path=join(dir,entry.name);if(entry.isDirectory()){assert.ok(!['node_modules','tests','fixtures'].includes(entry.name));await walk(path);}else{bytes+=(await stat(path)).size;assert.ok(!/^(?:package(?:-lock)?\.json|validation.*\.md|\.env.*)$|\.(?:test|spec)\.js$/.test(entry.name));}}}
  await walk('docs');assert.ok(bytes<=1048576,`${bytes} bytes`);
  const html=await readFile('docs/index.html','utf8');assert.ok(!/(?:src|href)=["']https?:/.test(html));
  console.log(`Tamanho público: ${bytes} bytes`);
});
