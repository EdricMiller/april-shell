export type WatermarkPosition = 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft' | 'tile';

interface DrawWatermarkOptions {
  canvas: HTMLCanvasElement;
  baseImage: HTMLImageElement | null; // 改变类型为 HTMLImageElement
  logoImage: HTMLImageElement | null; // 改变类型为 HTMLImageElement
  watermarkPosition: WatermarkPosition;
  watermarkSize: number;
  watermarkOpacity: number;
  textWatermark: string;
}

export const drawWatermarkOnCanvas = ({
  canvas,
  baseImage,
  logoImage,
  watermarkPosition,
  watermarkSize,
  watermarkOpacity,
  textWatermark,
}: DrawWatermarkOptions) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!baseImage) {
    return;
  }

  // 直接使用传入的 baseImage 对象
  canvas.width = baseImage.width;
  canvas.height = baseImage.height;
  ctx.drawImage(baseImage, 0, 0);

  ctx.globalAlpha = watermarkOpacity / 100;

  // 绘制图片水印
  if (logoImage) {
    let logoWidth = logoImage.width * (watermarkSize / 100);
    let logoHeight = logoImage.height * (watermarkSize / 100);

    if (logoWidth > canvas.width) logoWidth = canvas.width;
    if (logoHeight > canvas.height) logoHeight = canvas.height;

    let x = 0;
    let y = 0;

    switch (watermarkPosition) {
      case 'topLeft':
        x = 0;
        y = 0;
        break;
      case 'topRight':
        x = canvas.width - logoWidth;
        y = 0;
        break;
      case 'bottomLeft':
        x = 0;
        y = canvas.height - logoHeight;
        break;
      case 'bottomRight':
        x = canvas.width - logoWidth;
        y = canvas.height - logoHeight;
        break;
      case 'tile':
        for (let i = 0; i < canvas.width; i += logoWidth + 20) {
          for (let j = 0; j < canvas.height; j += logoHeight + 20) {
            ctx.drawImage(logoImage, i, j, logoWidth, logoHeight);
          }
        }
        break;
    }
    if (watermarkPosition !== 'tile') {
      ctx.drawImage(logoImage, x, y, logoWidth, logoHeight);
    }
    ctx.globalAlpha = 1; // 重置透明度
  }

  // 绘制文字水印
  if (textWatermark) {
    ctx.globalAlpha = watermarkOpacity / 100; // 使用全局透明度
    const baseFontSize = Math.max(20, canvas.height / 20); // 根据画布高度设置基础字体大小，最小20px
    const fontSize = baseFontSize * (watermarkSize / 100); // 字体大小根据 watermarkSize 调整
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; // 默认黑色，不带透明度，防止双重计算
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(textWatermark, canvas.width / 2, canvas.height / 2);
    ctx.globalAlpha = 1; // 重置透明度
  }
};
