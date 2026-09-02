import { useState } from 'react'

// 매장/시술 사진 자리에 쓰는 이미지 컴포넌트.
//
// src가 없거나 아직 파일이 없어 로드에 실패하면 자리 표시자를 보여줍니다.
// 나중에 public 폴더의 src 경로에 실제 사진만 넣으면
// 코드 수정 없이 자동으로 사진이 표시됩니다.
function ImagePlaceholder({ src, alt, label, className = '' }) {
  const [imageFailed, setImageFailed] = useState(false)

  const shouldShowPlaceholder = !src || imageFailed

  if (shouldShowPlaceholder) {
    return (
      <div className={`image-placeholder ${className}`} role="img" aria-label={alt}>
        <svg className="image-placeholder-icon" aria-hidden="true">
          <use href="/icons.svg#scissors-icon" />
        </svg>
        <span>{label}</span>
      </div>
    )
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setImageFailed(true)}
    />
  )
}

export default ImagePlaceholder
