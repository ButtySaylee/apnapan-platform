import React, { useEffect, useMemo, useState } from 'react';

const MARKER_SCRIPT_SRC = 'https://edge.marker.io/latest/shim.js';

function ensureMarkerScript(projectId) {
  if (!projectId) {
    return;
  }

  if (window.__MarkerLoaded) {
    return;
  }

  window.__MarkerLoaded = true;
  window.markerConfig = { project: projectId, source: 'vite' };

  if (!window.Marker) {
    window.Marker = { __cs: [] };
    [
      'show',
      'hide',
      'isVisible',
      'capture',
      'cancelCapture',
      'unload',
      'reload',
      'isExtensionInstalled',
      'setReporter',
      'clearReporter',
      'setCustomData',
      'on',
      'off',
    ].forEach((method) => {
      window.Marker[method] = function (...args) {
        window.Marker.__cs.push([method, ...args]);
      };
    });
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = MARKER_SCRIPT_SRC;
  script.dataset.marker = 'true';

  document.head.appendChild(script);
}

export default function FeedbackButton() {
  const projectId = useMemo(() => import.meta.env.VITE_MARKER_PROJECT_ID, []);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!projectId) {
      return;
    }

    ensureMarkerScript(projectId);

    const handleReady = () => {
      if (window.Marker && typeof window.Marker.show === 'function') {
        setIsReady(true);
      }
    };

    const interval = window.setInterval(handleReady, 300);
    handleReady();

    return () => window.clearInterval(interval);
  }, [projectId]);

  const handleClick = () => {
    if (!projectId) {
      return;
    }

    if (window.Marker && typeof window.Marker.show === 'function') {
      window.Marker.show();
      return;
    }

    if (window.Marker && window.Marker.__cs) {
      window.Marker.__cs.push(['show']);
    }
  };

  if (!projectId) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-brand-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
      aria-label="Open feedback tool"
    >
      <span className="text-base">📝</span>
      <span>{isReady ? 'Send feedback' : 'Loading feedback...'}</span>
    </button>
  );
}
