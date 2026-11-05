import { createPortal } from 'react-dom';
import React, { useRef, useState } from 'react';

export default function ProjectGallery({ title, images, format }) {
  const dialog = useRef(null);
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
          <button type="button" autoFocus onClick={() => dialog.current.close()} className="project-action">Close ×</button>
        </div>
        <img src={images[selected].src} alt={`${title} ${images[selected].label} page`} width="1280" height="720" className={`h-auto rounded-lg ${format === 'phone' ? 'mx-auto max-h-[70vh] w-auto max-w-full' : 'w-full'}`} />
        <div className="mt-4 flex items-center justify-between gap-3">
          <button type="button" aria-label="Previous page" onClick={() => move(-1)} className="project-action">←</button>
          <p aria-live="polite" className="text-center">{images[selected].label} · {selected + 1} / {images.length}</p>
          <button type="button" aria-label="Next page" onClick={() => move(1)} className="project-action">→</button>
        </div>
      </dialog>, document.body)}
    </>
  );
}
