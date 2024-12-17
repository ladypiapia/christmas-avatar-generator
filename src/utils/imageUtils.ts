import { toPng } from 'html-to-image';

export const downloadImage = async (element: HTMLElement | null) => {
  if (!element) return;
  
  try {
    const dataUrl = await toPng(element);
    const link = document.createElement('a');
    link.download = 'christmas-avatar.png';
    link.href = dataUrl;
    link.click();
  } catch (err) {
    console.error('Failed to download image:', err);
  }
};