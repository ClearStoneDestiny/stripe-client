export const joinScope = (parent: string, child: string) =>
  [parent.trim(), child.trim()].filter(Boolean).join("/");
