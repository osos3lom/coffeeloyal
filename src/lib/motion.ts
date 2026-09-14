/**
 * Shared motion constants.
 *
 * framer-motion types `ease` as a 4-tuple, so a bare number[] is rejected.
 * Declaring it once here keeps every section consistent and typed.
 */
export const EASE_ROYAL: [number, number, number, number] = [
  0.22, 0.61, 0.36, 1,
];

export const DUR_REVEAL = 0.42;
