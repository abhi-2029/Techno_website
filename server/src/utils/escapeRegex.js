/**
 * Escapes a string so it can be safely used inside a RegExp constructor.
 * Prevents Regex Denial of Service (ReDoS) attacks from user input.
 */
export const escapeRegex = (string) => {
  if (typeof string !== 'string') return '';
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};
