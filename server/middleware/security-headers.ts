/**
 * Security headers for HTML and static responses.
 * CSP must allow https://grok.com (PWA injector) and map/weather origins.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://grok.com https://*.grok.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https:",
  [
    "connect-src 'self'",
    "https://tiles.openfreemap.org",
    "https://*.openfreemap.org",
    "https://api.open-meteo.com",
    "https://*.tile.openstreetmap.org",
    "https://*.openstreetmap.org",
    "https://tile.openstreetmap.org",
    "https://*.tile.opentopomap.org",
    "https://tile.opentopomap.org",
    "https://*.basemaps.cartocdn.com",
    "https://demotiles.maplibre.org",
    "https://grok.com",
    "https://*.grok.com",
  ].join(" "),
  "worker-src 'self' blob:",
  "child-src 'self' blob:",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const INDEXABLE = process.env.VITE_INDEXABLE === "1";

export default async function securityHeadersMiddleware(
  _event: unknown,
  next: () => unknown | Promise<unknown>,
): Promise<unknown> {
  const result = await next();
  if (!(result instanceof Response)) return result;
  const headers = new Headers(result.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("Content-Security-Policy", CSP);
  if (!INDEXABLE) headers.set("X-Robots-Tag", "noindex, nofollow");
  return new Response(result.body, {
    status: result.status,
    statusText: result.statusText,
    headers,
  });
}
