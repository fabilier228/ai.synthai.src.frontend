export function resolveColor(c: unknown): unknown {
  if (typeof c !== "string") return c;
  return c.startsWith("var(") ? c : `var(--${c})`;
}

export default resolveColor;
