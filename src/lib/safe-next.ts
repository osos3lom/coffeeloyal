/**
 * Validates a `?next=` redirect target.
 *
 * A sign-in page that forwards to whatever `next` contains is an open
 * redirect: `/login?next=https://evil.example` would bounce a freshly
 * authenticated user off-site, and the URL looks legitimate right up to the
 * moment it resolves. Only same-origin absolute paths are allowed through.
 */
export function safeInternalPath(
  value: string | null | undefined,
  fallback = "/",
): string {
  if (!value) return fallback;

  // Must be a root-relative path. Reject protocol-relative ("//host"),
  // absolute URLs, and anything containing a backslash — some browsers
  // normalise "\" to "/", which can smuggle a host past a naive check.
  if (!value.startsWith("/")) return fallback;
  if (value.startsWith("//")) return fallback;
  if (value.includes("\\")) return fallback;

  // Control characters (CR and LF especially) can split a Location header.
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    if (code <= 0x1f || code === 0x7f) return fallback;
  }

  return value;
}
