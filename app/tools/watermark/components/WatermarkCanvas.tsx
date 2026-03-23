import React, { useRef, useEffect, RefObject, useState } from 'react';
import { drawWatermarkOnCanvas, WatermarkPosition } from '../utils/drawWatermarkOnCanvas';

interface WatermarkCanvasProps {
  baseImage: string | null; // Data URL
  logoImage: string | null; // Data URL
  watermarkPosition: WatermarkPosition;
  watermarkSize: number;
  watermarkOpacity: number;
  textWatermark: string;
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

const WatermarkCanvas: React.FC<WatermarkCanvasProps> = ({
  baseImage: baseImageDataUrl,
  logoImage: logoImageDataUrl,
  watermarkPosition,
  watermarkSize,
  watermarkOpacity,
  textWatermark,
  canvasRef,
}) => {
  const [loadedBaseImage, setLoadedBaseImage] = useState<HTMLImageElement | null>(null);
  const [loadedLogoImage, setLoadedLogoImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (baseImageDataUrl) {
      const img = new Image();
      img.onload = () => setLoadedBaseImage(img);
      img.onerror = () => setLoadedBaseImage(null);
      img.src = baseImageDataUrl;
    } else {
      setLoadedBaseImage(null);
    }
  }, [baseImageDataUrl]);

  useEffect(() => {
    if (logoImageDataUrl) {
      const img = new Image();
      img.onload = () => setLoadedLogoImage(img);
      img.onerror = () => setLoadedLogoImage(null);
      img.src = logoImageDataUrl;
    } else {
      setLoadedLogoImage(null);
    }
  }, [logoImageDataUrl]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (loadedBaseImage) {
      drawWatermarkOnCanvas({
        canvas,
        baseImage: loadedBaseImage,
        logoImage: loadedLogoImage,
        watermarkPosition,
        watermarkSize,
        watermarkOpacity,
        textWatermark,
      });
    } else {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [loadedBaseImage, loadedLogoImage, watermarkPosition, watermarkSize, watermarkOpacity, textWatermark, canvasRef]);

  return (
    <div className="canvas-container"> {/* 简化卡片样式，更轻盈阴影，更浅边框，调整圆角 */}
      {loadedBaseImage ? (
        <> 
          {/* 确保 canvas 响应式并居中 */}
          <canvas ref={canvasRef} className="canvas-element"></canvas> {/* 简化边框和阴影 */}
        </> 
      ) : (
        <> 
          {/* 优化占位符文字样式，增加动画 */}
          <p className="canvas-placeholder">
            请上传底图以预览水印效果
          </p>
        </>
      )}
    </div>
  );
};

export default WatermarkCanvas;
