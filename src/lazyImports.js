import React, { lazy } from 'react';

// Keep individual loader functions so we can call them to prefetch on idle/hover
export const loadAbout = () => import(/* webpackPrefetch: true */ './components/About');
export const loadWork = () => import(/* webpackPrefetch: true */ './components/Work');
export const loadSkills = () => import(/* webpackPrefetch: true */ './components/Skills');
export const loadProjects = () => import(/* webpackPrefetch: true */ './components/Projects');

// Lazy components used by routes/sections
export const About = lazy(loadAbout);
export const Work = lazy(loadWork);
export const Skills = lazy(loadSkills);
export const Projects = lazy(loadProjects);

// Prefer idle prefetch to avoid hurting TTI; gracefully fallback to a timeout
const onIdle = (cb) => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        window.requestIdleCallback(cb, { timeout: 2000 });
    } else {
        setTimeout(cb, 250);
    }
};

// Prefetch all non-critical chunks when the browser is idle
export const prefetchAll = () => {
    onIdle(() => {
        try { loadAbout(); } catch { }
        try { loadWork(); } catch { }
        try { loadSkills(); } catch { }
        try { loadProjects(); } catch { }
    });
};

// Lightweight image prefetch for project logos: only the smallest variants
let __imagesCtx;
export const prefetchProjectImages = (max = 4) => {
    onIdle(() => {
        try {
            if (!__imagesCtx) {
                // Only pick up optimized small variants to keep bandwidth low
                __imagesCtx = require.context('./common/images', true, /__optimized\/.*-(320)\.(jpe?g|png)$/);
            }
            const keys = __imagesCtx.keys().slice(0, Math.max(0, max));
            keys.forEach((k) => {
                const src = __imagesCtx(k);
                const img = new Image();
                img.decoding = 'async';
                img.loading = 'eager';
                img.src = src;
            });
        } catch (e) {
            // no-op if context not available
        }
    });
};
