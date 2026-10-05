/**
 * Export utility for lossless vector SVG and 300 DPI high-resolution PNG
 */
import { toPng, toSvg } from 'html-to-image';

function downloadDataUrl(dataUrl: string, filename: string): void {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * Export printable page as a lossless vector SVG file
 */
export async function exportToSvg(elementId: string, filename = '喷墨打印机测试页.svg'): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) return false;

  try {
    const dataUrl = await toSvg(element, {
      backgroundColor: '#ffffff',
      filter: (node: HTMLElement) => !node.classList?.contains('no-print'),
      style: {
        transform: 'none',
        margin: '0',
        boxShadow: 'none',
      },
    });

    downloadDataUrl(dataUrl, filename);
    return true;
  } catch (err) {
    console.error('Failed to export SVG via html-to-image:', err);
    // Fallback simple SVG
    try {
      const clone = element.cloneNode(true) as HTMLElement;
      clone.style.transform = 'none';
      const width = element.offsetWidth || 794;
      const height = element.offsetHeight || 1123;
      const serialized = new XMLSerializer().serializeToString(clone);
      const svgStr = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml" style="width:${width}px; height:${height}px; background:#ffffff;">
      ${serialized}
    </div>
  </foreignObject>
</svg>`.trim();
      const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      downloadDataUrl(url, filename);
      URL.revokeObjectURL(url);
      return true;
    } catch (fallbackErr) {
      console.error('Fallback SVG export failed:', fallbackErr);
      return false;
    }
  }
}

/**
 * Export printable page as a 300 DPI high-resolution PNG image
 */
export async function exportToPng(
  elementId: string, 
  filename = '喷墨打印机测试页-300DPI.png', 
  dpi = 300
): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) return false;

  try {
    // 300 DPI is approximately 3.125x standard 96 DPI screen resolution
    const pixelRatio = Math.max(1, Math.min(3.5, dpi / 96));

    const dataUrl = await toPng(element, {
      pixelRatio,
      backgroundColor: '#ffffff',
      cacheBust: false,
      filter: (node: HTMLElement) => !node.classList?.contains('no-print'),
      style: {
        transform: 'none',
        margin: '0',
        boxShadow: 'none',
      },
    });

    downloadDataUrl(dataUrl, filename);
    return true;
  } catch (err) {
    console.error('Failed to export PNG with primary options, trying fallback:', err);
    try {
      // Fallback with skipFonts to avoid any cross-origin font network blocks
      const fallbackUrl = await toPng(element, {
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        skipFonts: true,
        filter: (node: HTMLElement) => !node.classList?.contains('no-print'),
        style: {
          transform: 'none',
          margin: '0',
          boxShadow: 'none',
        },
      });
      downloadDataUrl(fallbackUrl, filename);
      return true;
    } catch (fallbackErr) {
      console.error('Fallback PNG export failed:', fallbackErr);
      return false;
    }
  }
}

