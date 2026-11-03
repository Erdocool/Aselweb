export function asset(path: string) {
  if (!path || path.startsWith("http")) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}
