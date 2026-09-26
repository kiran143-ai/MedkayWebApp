export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function domainOf(email: string) {
  const at = email.indexOf('@');
  return at > -1 ? email.slice(at + 1).trim().toLowerCase() : '';
}

export function slugify(value: string) {
  return value.
  toLowerCase().
  trim().
  replace(/[^a-z0-9\s-]/g, '').
  replace(/\s+/g, '-').
  replace(/-+/g, '-');
}

export function initials(name: string) {
  return name.
  split(/\s+/).
  filter(Boolean).
  slice(0, 2).
  map((p) => p[0]?.toUpperCase()).
  join('');
}

export function compactNumber(n: number) {
  return new Intl.NumberFormat('en-IN', { notation: 'compact', maximumFractionDigits: 1 }).format(n);
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}