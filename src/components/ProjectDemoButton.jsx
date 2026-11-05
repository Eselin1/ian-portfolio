import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function ProjectDemoButton({ title, url }) {
  const dialog = useRef(null);
  const [open, setOpen] = useState(false);
  return <>
    <button type="button" onClick={() => { setOpen(true); dialog.current.showModal(); }} className="rounded-lg bg-blue-600 px-6 py-3 font-jersey10 text-xl text-white shadow-lg transition-colors hover:bg-blue-700">Try live demo</button>
    {createPortal(<dialog ref={dialog} aria-label={`${title} interactive demo`} onClose={() => setOpen(false)} className="m-auto w-[95vw] max-w-[430px] max-h-[95vh] overflow-auto rounded-2xl bg-white p-3 text-gray-900 shadow-2xl backdrop:bg-black/80">
      <div className="mb-2 flex items-center justify-between gap-3"><span className="font-semibold">{title} · Demo</span><button autoFocus type="button" onClick={() => dialog.current.close()} className="rounded-lg border border-gray-400 px-3 py-2">Close ×</button></div>
      {open && <iframe title={`${title} interactive demo with fictional data`} src={url} className="block w-full rounded-xl border-0" style={{ height: 'min(740px, 78vh)' }} />}
    </dialog>, document.body)}
  </>;
}
