'use client';

import { useSyncExternalStore } from 'react';

/**
 * One scroll listener for the whole site.
 *
 * The canvas background and the navbar both need scroll position. Each running
 * its own listener meant two reads of `scrollHeight` per event (layout thrash)
 * and a React setState on every single scroll tick. This store reads once per
 * animation frame and only notifies when the value actually changed.
 *
 * - Canvas / rAF loops: call `getScrollState()` imperatively — no re-render.
 * - React components: use `useScrollSelector` so a component re-renders only
 *   when the slice it cares about changes.
 */

export type ScrollState = {
  /** Pixels scrolled from the top. */
  scrollY: number;
  /** 0 → 1 across the scrollable height. 0 when the page doesn't scroll. */
  progress: number;
  /** How much scrollable runway the page has, in viewports. */
  runway: number;
};

const INITIAL: ScrollState = { scrollY: 0, progress: 0, runway: 0 };

let state: ScrollState = INITIAL;
const listeners = new Set<() => void>();
let ticking = false;

const measure = () => {
  ticking = false;

  const viewport = window.innerHeight;
  const max = document.documentElement.scrollHeight - viewport;
  const scrollY = window.scrollY;
  const progress = max > 0 ? Math.min(Math.max(scrollY / max, 0), 1) : 0;
  const runway = viewport > 0 ? Math.max(max, 0) / viewport : 0;

  if (
    scrollY === state.scrollY &&
    progress === state.progress &&
    runway === state.runway
  ) {
    return;
  }

  state = { scrollY, progress, runway };
  for (const listener of listeners) listener();
};

const schedule = () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(measure);
};

const subscribe = (onStoreChange: () => void) => {
  if (listeners.size === 0) {
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    measure();
  }
  listeners.add(onStoreChange);

  return () => {
    listeners.delete(onStoreChange);
    if (listeners.size === 0) {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    }
  };
};

/** Imperative read, for rAF render loops that must not trigger React renders. */
export const getScrollState = (): ScrollState => state;

/** Subscribe outside React (canvas, effects). Returns an unsubscribe function. */
export const subscribeScroll = subscribe;

/**
 * Re-renders only when `selector(state)` changes. Return a primitive — an
 * object literal would produce a new reference each call and loop forever.
 */
export function useScrollSelector<T>(selector: (s: ScrollState) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => selector(state),
    () => selector(INITIAL),
  );
}

/** Full state. Re-renders on every frame you scroll — prefer `useScrollSelector`. */
export function useScrollProgress(): ScrollState {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => INITIAL,
  );
}
