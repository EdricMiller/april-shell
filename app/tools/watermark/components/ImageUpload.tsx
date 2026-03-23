import React from 'react';

interface ImageUploadProps {
  label: string;
  onImageChange: (imageDataUrl: string | null) => void;
  currentImage: string | null; // New: to display current image
  sampleImages?: string[]; // 可选的示例图片URL数组，用于展示图库
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, onImageChange, currentImage, sampleImages }) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = () => {
    onImageChange(null);
    const fileInput = document.getElementById(`file-upload-${label}`) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="space-y-3"> {/* Outer container for the whole component */}
      <label className="form-label">{label}</label>

      {/* Image Upload Section */}
      <div className="image-upload-container-outer">
        <input
          type="file"
          id={`file-upload-${label}`}
          className="file-input"
          accept="image/*"
          onChange={handleFileUpload}
        />
        {currentImage && (
          <button
            type="button"
            onClick={handleClearImage}
            className="btn-clear-image"
          >
            清除
          </button>
        )}
      </div>

      {/* Image Preview and Sample Gallery Section */}
      <div className="image-preview-container">
        {currentImage && label === '上传底图' && (
          <div className="image-wrapper">
            <img src={currentImage} alt="Preview" className="image-preview" />
          </div>
        )}

        {currentImage && label.includes('水印图片') && sampleImages && !sampleImages.includes(currentImage) && (
          <div className="image-wrapper selected">
            <img src={currentImage} alt="Preview" className="image-preview" />
            <span className="selected-check">✓ 已选中</span>
          </div>
        )}

        {label.includes('水印图片') && sampleImages && sampleImages.length > 0 && (
          <div className="sample-images-gallery">
            <h3 className="form-label">选择示例水印图:</h3>
            <div className="flex flex-wrap gap-2">
              {sampleImages.map((sampleImgSrc, index) => (
                <div
                  key={index}
                  className={`image-wrapper sample-image-option ${currentImage === sampleImgSrc ? 'selected-sample' : ''}`}
                  onClick={() => onImageChange(sampleImgSrc)}
                >
                  <img src={sampleImgSrc} alt={`Sample ${index + 1}`} className="image-preview-thumbnail" />
                  {currentImage === sampleImgSrc && <span className="selected-check">✓ 已选中</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    {/* Closing the outermost div */}
    </div>
  );
};

export default ImageUpload;
