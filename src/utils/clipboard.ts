/**
 * Copy text to clipboard with iframe-resilient fallback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) return false;

  // Modern Async Clipboard API
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Failed (e.g., NotAllowedError inside iframe) -> fallback to execCommand
      console.warn('Async Clipboard API failed, attempting fallback copy:', err);
    }
  }

  // Fallback using legacy textarea & document.execCommand('copy')
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.style.opacity = '0';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (fallbackErr) {
    console.error('Fallback execCommand copy failed:', fallbackErr);
    return false;
  }
}
