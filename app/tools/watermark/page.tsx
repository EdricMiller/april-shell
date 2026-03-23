'use client';

import React, { useState, useRef } from 'react';
import WatermarkControls from './components/WatermarkControls';
import WatermarkCanvas from './components/WatermarkCanvas';
import { WatermarkPosition } from './utils/drawWatermarkOnCanvas';

const WatermarkPage = () => {
  const [baseImage, setBaseImage] = useState<string | null>(null);
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [watermarkPosition, setWatermarkPosition] = useState<WatermarkPosition>('bottomRight');
  const [watermarkSize, setWatermarkSize] = useState<number>(30);
  const [watermarkOpacity, setWatermarkOpacity] = useState<number>(100);
  const [textWatermark, setTextWatermark] = useState<string>('');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const downloadWatermarkedImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'watermarked_image.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="main-container">
      <div className="card-container">
        <h1 className="title">
          高级水印生成器
        </h1>
        <div className="flex-container"> 
          {/* 左侧控制面板 */}
          <div className="left-panel">
            <WatermarkControls
              baseImage={baseImage}
              setBaseImage={setBaseImage}
              setLogoImage={setLogoImage}
              watermarkPosition={watermarkPosition}
              setWatermarkPosition={setWatermarkPosition}
              watermarkSize={watermarkSize}
              setWatermarkSize={setWatermarkSize}
              watermarkOpacity={watermarkOpacity}
              setWatermarkOpacity={setWatermarkOpacity}
              textWatermark={textWatermark}
              setTextWatermark={setTextWatermark}
              onDownload={downloadWatermarkedImage} logoImage={null}            />
          </div>

          {/* 右侧预览区域 */}
          <div className="right-panel">
            <WatermarkCanvas
              canvasRef={canvasRef}
              baseImage={baseImage}
              logoImage={logoImage}
              watermarkPosition={watermarkPosition}
              watermarkSize={watermarkSize}
              watermarkOpacity={watermarkOpacity}
              textWatermark={textWatermark}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatermarkPage;
