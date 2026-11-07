/** "06", "17", "1.7B": integers pad to two digits for the dossier look. */
export function formatStat(n: number, decimals = 0, suffix = "") {
  const s = n.toFixed(decimals);
  return (decimals ? s : s.padStart(2, "0")) + suffix;
}

export const pad2 = (n: number) => String(n).padStart(2, "0");
