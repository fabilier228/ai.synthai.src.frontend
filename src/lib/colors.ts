export function resolveColor(c: unknown): string {
  if (typeof c !== "string") return c as string;
  return c.startsWith("var(") ? c : `var(--${c})`;
}

export default resolveColor;
