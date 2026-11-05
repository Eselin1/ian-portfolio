import { createPortal } from 'react-dom';
import React, { useRef, useState } from 'react';

export default function ProjectGallery({ title, images, format, demoUrl }) {
  const dialog = useRef(null);
  const demoDialog = useRef(null);
  const [demoOpen, setDemoOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const move = (step) => setSelected((current) => (current + step + images.length) % images.length);

  return (
    <>
      <div className={`project-photo-stack ${format === 'phone' ? 'project-photo-stack--phone' : ''}`}>
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => { setSelected(index); dialog.current.showModal(); }}
            aria-label={`View ${title}: ${image.label}`}
            className="project-photo-card group bg-gray-100 focus-visible:outline focus-visible:outline-4 focus-visible:outline-blue-600"
            style={{ '--card-index': index }}
          >
            <img src={image.src} alt={`${title} ${image.label} page`} loading="lazy" width="1280" height="720" className="h-full w-full object-cover object-top" />
            <span className="absolute bottom-2 left-2 rounded-full bg-black/75 px-3 py-1 text-xs text-white">{image.label} <span aria-hidden="true">↗</span></span>
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">Hover to explore · Select a page to enlarge</p>
      {demoUrl && <button type="button" onClick={() => { setDemoOpen(true); demoDialog.current.showModal(); }} className="mt-4 rounded-lg bg-blue-600 px-6 py-3 font-jersey10 text-xl text-white hover:bg-blue-700">Try live demo</button>}
      {demoUrl && createPortal(<dialog ref={demoDialog} aria-label={`${title} interactive demo`} onClose={() => setDemoOpen(false)} className="m-auto w-[95vw] max-w-[430px] max-h-[95vh] overflow-auto rounded-2xl bg-white p-3 text-gray-900 shadow-2xl backdrop:bg-black/80">
        <div className="mb-2 flex items-center justify-between gap-3"><span className="font-semibold">{title} · Demo</span><button autoFocus type="button" onClick={() => demoDialog.current.close()} className="rounded-lg border border-gray-400 px-3 py-2">Close ×</button></div>
        {demoOpen && <iframe title={`${title} interactive demo with fictional data`} src={demoUrl} className="block w-full rounded-xl border-0" style={{ height: 'min(740px, 78vh)' }} />}
      </dialog>, document.body)}
      {createPortal(<dialog
        ref={dialog}
        aria-label={`${title} screenshots`}
        className="m-auto w-[95vw] max-w-6xl max-h-[92vh] overflow-auto rounded-2xl bg-white p-4 text-gray-900 shadow-2xl backdrop:bg-black/80 dark:bg-zinc-900 dark:text-white"
        onClick={(event) => { if (event.target === dialog.current) dialog.current.close(); }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
          if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
        }}
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <h4 className="text-lg font-semibold">{title}</h4>
          <button type="button" autoFocus onClick={() => dialog.current.close()} className="rounded-lg border border-gray-400 px-4 py-2">Close ×</button>
        </div>
        <img src={images[selected].src} alt={`${title} ${images[selected].label} page`} width="1280" height="720" className={`h-auto rounded-lg ${format === 'phone' ? 'mx-auto max-h-[70vh] w-auto max-w-full' : 'w-full'}`} />
        <div className="mt-4 flex items-center justify-between gap-3">
          <button type="button" aria-label="Previous page" onClick={() => move(-1)} className="rounded-lg border border-gray-400 px-4 py-2">←</button>
          <p aria-live="polite" className="text-center">{images[selected].label} · {selected + 1} / {images.length}</p>
          <button type="button" aria-label="Next page" onClick={() => move(1)} className="rounded-lg border border-gray-400 px-4 py-2">→</button>
        </div>
      </dialog>, document.body)}
    </>
  );
}
