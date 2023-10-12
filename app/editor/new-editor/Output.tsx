import React, { useEffect } from 'react';
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit';

export default function Output()
{
  let term = new Terminal();
  const fitAddon = new FitAddon();
  useEffect(() =>
  {
    const xtermTerminal = document.getElementById('terminal') as HTMLElement;
    term.loadAddon(fitAddon);
    term.open(document.getElementById('terminal') as HTMLElement);
    fitAddon.fit();
    term.write('Terminal started')
  })

  term.onKey((e) =>
  {
    term.write(e.key)
  })


  return (
    <main className='flex flex-1'>
      <div className="flex flex-col w-full">
        <h2 className='text-center'>Output</h2>
        <div id="terminal"></div>
      </div>
    </main>
  );
}