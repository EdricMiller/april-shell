import React from 'react';
import ImageUpload from './ImageUpload';
import { WatermarkPosition } from '../utils/drawWatermarkOnCanvas';

interface WatermarkControlsProps {
  baseImage: string | null;
  setBaseImage: (image: string | null) => void;
  logoImage: string | null; // Add logoImage to props
  setLogoImage: (image: string | null) => void;
  watermarkPosition: WatermarkPosition;
  setWatermarkPosition: (position: WatermarkPosition) => void;
  watermarkSize: number;
  setWatermarkSize: (size: number) => void;
  watermarkOpacity: number;
  setWatermarkOpacity: (opacity: number) => void;
  textWatermark: string;
  setTextWatermark: (text: string) => void;
  onDownload: () => void;
}

const WatermarkControls: React.FC<WatermarkControlsProps> = ({
  baseImage,
  setBaseImage,
  logoImage, // Destructure logoImage
  setLogoImage,
  watermarkPosition,
  setWatermarkPosition,
  watermarkSize,
  setWatermarkSize,
  watermarkOpacity,
  setWatermarkOpacity,
  textWatermark,
  setTextWatermark,
  onDownload,
}) => {
  const positionOptions = [
    { value: 'topLeft', label: '左上' },
    { value: 'topRight', label: '右上' },
    { value: 'bottomLeft', label: '左下' },
    { value: 'bottomRight', label: '右下' },
    { value: 'tile', label: '铺满' },
  ];

  const sampleWatermarkImages = [
    '/common/logo1.png',
    '/common/logo2.png',
    '/common/logo3.png',
    '/common/logo4.png',
    '/common/logo5.png',
  ];

  return (
    <div className="panel-card space-y-7"> {/* 优化卡片样式，更圆润，更深阴影，更浅边框 */}
      {/* 上传底图 */}
      <div className="space-y-3"> {/* 调整间距 */}
        <ImageUpload label="上传底图" onImageChange={setBaseImage} currentImage={baseImage} />
      </div>

      {/* 上传水印图 */}
      <div className="space-y-3"> {/* 调整间距 */}
        <ImageUpload
          label="上传水印图片 (Logo)"
          onImageChange={setLogoImage}
          currentImage={logoImage}
          sampleImages={sampleWatermarkImages} // 传递示例水印图路径数组
        />
      </div>

      {/* 水印位置 - 下拉选择框 */}
      <div className="space-y-3">
        <label htmlFor="watermark-position" className="form-label">水印位置</label><select
          id="watermark-position"
          value={watermarkPosition}
          onChange={(e) => setWatermarkPosition(e.target.value as WatermarkPosition)}
          className="form-select"
        >
          {positionOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* 水印大小 */}
      <div className="space-y-3"> {/* 调整间距 */}
        <label className="form-label">
          水印大小: <span className="font-mono text-blue-600 text-xl">{watermarkSize}%</span> {/* 更大更突出的数值 */}
        </label>
        <input
          type="range"
          min="0"
          max="200"
          value={watermarkSize}
          onChange={(e) => setWatermarkSize(Number(e.target.value))}
        />
      </div>

      {/* 水印透明度 */}
      <div className="space-y-3"> {/* 调整间距 */}
        <label className="form-label">
          水印透明度: <span className="font-mono text-blue-600 text-xl">{watermarkOpacity}%</span> {/* 更大更突出的数值 */}
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={watermarkOpacity}
          onChange={(e) => setWatermarkOpacity(Number(e.target.value))}
        />
      </div>



      {/* 下载按钮 */}
      <button
        onClick={onDownload}
        className="btn-primary" // 优化下载按钮样式，更圆润，更深阴影，悬停放大
      >
        下载水印图片
      </button>
    </div>
  );
};

export default WatermarkControls;
