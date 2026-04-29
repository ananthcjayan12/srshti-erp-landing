/**
 * handleShare — Reusable share utility.
 *
 * Strategy (determined automatically):
 *
 *  ┌───────────────────────────────────────────────────────────────┐
 *  │  MOBILE / TABLET  (iOS, Android, iPadOS)                     │
 *  │  → navigator.share()  — native OS share sheet.               │
 *  │    AbortError (user dismissed sheet) is swallowed silently.   │
 *  │    If share API throws for any other reason, falls back to    │
 *  │    clipboard-copy + toast.                                    │
 *  ├───────────────────────────────────────────────────────────────┤
 *  │  DESKTOP  (macOS Chrome/Safari/Firefox, Windows, Linux)       │
 *  │  → Copies the share text + URL to clipboard.                 │
 *  │  → Shows a branded, animated toast that stays visible for     │
 *  │    3.5 seconds so the user clearly sees the confirmation.     │
 *  └───────────────────────────────────────────────────────────────┘
 */

export interface ShareData {
  title: string;
  text: string;
  url?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Detection helpers
// ─────────────────────────────────────────────────────────────────────────────

function isMobileOrTablet(): boolean {
  if (typeof navigator === 'undefined') return false;

  const ua = navigator.userAgent || '';

  // Explicit mobile / tablet tokens
  const mobileRe =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i;

  if (mobileRe.test(ua)) return true;

  // iPadOS 13+ reports as "Macintosh" but has touch — detect it
  if (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1) return true;

  return false;
}

// ─────────────────────────────────────────────────────────────────────────────
// Branded toast notification (DOM-injected, zero React dependency)
// ─────────────────────────────────────────────────────────────────────────────

const TOAST_ID = 'cue360-share-toast';

function showToast(message: string): void {
  // Remove any existing toast so rapid clicks don't stack
  const existing = document.getElementById(TOAST_ID);
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = TOAST_ID;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');

  // ── Inline styles (self-contained, no CSS class dependency) ──
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '24px',
    left: '50%',
    transform: 'translateX(-50%) translateY(20px)',
    zIndex: '99999',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 24px',
    borderRadius: '14px',
    background: '#0D1B2A',
    color: '#ffffff',
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '1.4',
    boxShadow:
      '0 12px 40px rgba(13,27,42,0.25), 0 0 0 1px rgba(75,110,245,0.15)',
    opacity: '0',
    transition: 'opacity 0.35s ease, transform 0.35s ease',
    pointerEvents: 'none',
    maxWidth: 'calc(100vw - 48px)',
    whiteSpace: 'nowrap',
  } as CSSStyleDeclaration);

  // Checkmark icon (inline SVG)
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="flex-shrink:0">
      <circle cx="10" cy="10" r="10" fill="#4B6EF5"/>
      <path d="M6.5 10.5L9 13L14 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span>${message}</span>
  `;

  document.body.appendChild(toast);

  // Trigger entrance animation on next frame
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
  });

  // Auto-dismiss after 3.5 s
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ─────────────────────────────────────────────────────────────────────────────
// Clipboard copy helper
// ─────────────────────────────────────────────────────────────────────────────

async function copyToClipboard(text: string): Promise<boolean> {
  // Modern async clipboard API (requires HTTPS or localhost)
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      /* fall through to legacy */
    }
  }

  // Legacy execCommand fallback (older Safari, HTTP contexts)
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Main entry point
// ─────────────────────────────────────────────────────────────────────────────

export async function handleShare(shareData: ShareData): Promise<void> {
  const url = shareData.url ?? window.location.href;
  const fullText = `${shareData.text}\n\n${url}`;

  // ── MOBILE / TABLET — native share sheet ──────────────────────────────
  if (isMobileOrTablet() && navigator.share) {
    try {
      await navigator.share({
        title: shareData.title,
        text: shareData.text,
        url,
      });
      return; // success — OS handled it
    } catch (err) {
      // User cancelled the share sheet — do nothing
      if (err instanceof Error && err.name === 'AbortError') return;
      // Any other error — fall through to clipboard + toast
      console.warn('[handleShare] navigator.share failed, falling back:', err);
    }
  }

  // ── DESKTOP / FALLBACK — clipboard copy + branded toast ───────────────
  const copied = await copyToClipboard(fullText);

  if (copied) {
    showToast('Copied to clipboard — paste it anywhere to share!');
  } else {
    showToast('Could not copy — please share manually.');
  }
}
