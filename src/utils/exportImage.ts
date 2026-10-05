/**
 * Export utility for lossless vector SVG and 300 DPI high-resolution PNG
 */

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function getCapturedSvg(elementId: string): { svgString: string; width: number; height: number } | null {
  const element = document.getElementById(elementId);
  if (!element) return null;

  // Use unscaled layout dimensions so export resolution is independent of screen zoom scale
  const width = element.offsetWidth || Math.round(element.getBoundingClientRect().width);
  const height = element.offsetHeight || Math.round(element.getBoundingClientRect().height);

  // Collect all same-origin stylesheets to preserve Tailwind styles
  let cssText = `
    * { box-sizing: border-box; }
    body, html { margin: 0; padding: 0; background: #ffffff; color: #000000; }
  `;
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      if (sheet.cssRules) {
        for (const rule of Array.from(sheet.cssRules)) {
          cssText += rule.cssText + '\n';
        }
      }
    } catch {
      // Ignore cross-origin font sheets
    }
  }

  const clone = element.cloneNode(true) as HTMLElement;
  // Ensure background is solid white
  clone.style.backgroundColor = '#ffffff';
  clone.style.color = '#000000';
  clone.style.transform = 'none';

  const serializedHtml = new XMLSerializer().serializeToString(clone);

  const svgString = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <style>
    ${cssText}
  </style>
  <foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml" style="width:${width}px; height:${height}px; background:#ffffff; color:#000000;">
      ${serializedHtml}
    </div>
  </foreignObject>
</svg>`.trim();

  return { svgString, width, height };
}

/**
 * Export printable page as a lossless vector SVG file
 */
export function exportToSvg(elementId: string, filename = '喷墨打印机测试页.svg'): boolean {
  try {
    const data = getCapturedSvg(elementId);
    if (!data) return false;

    const blob = new Blob([data.svgString], { type: 'image/svg+xml;charset=utf-8' });
    downloadBlob(blob, filename);
    return true;
  } catch (err) {
    console.error('Failed to export SVG:', err);
    return false;
  }
}

/**
 * Export printable page as a 300 DPI high-resolution PNG image
 */
export function exportToPng(
  elementId: string, 
  filename = '喷墨打印机测试页-300DPI.png', 
  dpi = 300
): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const data = getCapturedSvg(elementId);
      if (!data) {
        resolve(false);
        return;
      }

      // Base screen DPI is ~96
      const scale = Math.max(1, Math.min(4, dpi / 96));
      const targetWidth = Math.round(data.width * scale);
      const targetHeight = Math.round(data.height * scale);

      const img = new Image();
      const svgBlob = new Blob([data.svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            URL.revokeObjectURL(url);
            resolve(false);
            return;
          }

          // Fill solid white background
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, targetWidth, targetHeight);

          // Draw scaled high-res image
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
          URL.revokeObjectURL(url);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                downloadBlob(blob, filename);
                resolve(true);
              } else {
                resolve(false);
              }
            },
            'image/png',
            1.0
          );
        } catch (canvasErr) {
          console.error('Canvas draw error:', canvasErr);
          URL.revokeObjectURL(url);
          resolve(false);
        }
      };

      img.onerror = (err) => {
        console.error('Image load error:', err);
        URL.revokeObjectURL(url);
        resolve(false);
      };

      img.src = url;
    } catch (err) {
      console.error('PNG export failed:', err);
      resolve(false);
    }
  });
}
