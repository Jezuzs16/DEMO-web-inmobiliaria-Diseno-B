/**
 * Utilidades para construir enlaces externos con allowlist.
 * Evita que datos futuros procedentes de props/API inyecten protocolos arbitrarios.
 */
const ALLOWED_PROTOCOLS = new Set(['https:', 'mailto:', 'tel:']);
const ALLOWED_HTTPS_HOSTS = new Set(['wa.me']);

export function safeExternalUrl(value: string, fallback = '#contacto'): string {
  try {
    const url = new URL(value, 'http://localhost');
    if (!ALLOWED_PROTOCOLS.has(url.protocol)) return fallback;
    if (url.protocol === 'https:' && !ALLOWED_HTTPS_HOSTS.has(url.hostname)) {
      return fallback;
    }
    return value;
  } catch {
    return fallback;
  }
}

export function mailtoLink(email: string): string {
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return valid ? safeExternalUrl(`mailto:${email}`) : '#contacto';
}

export function telLink(phone: string): string {
  const normalized = phone.replace(/[^\d+]/g, '');
  const valid = /^\+?\d{6,15}$/.test(normalized);
  return valid ? safeExternalUrl(`tel:${normalized}`) : '#contacto';
}
