import { useState } from 'react'

import cn from '@renderer/utils/cn'

interface ImageWithFallbackProps {
  src?: string | null
  alt?: string
  className?: string
  fallback?: React.ReactNode
}

const ImageWithFallback = ({
  src,
  alt,
  className,
  fallback
}: ImageWithFallbackProps): JSX.Element => {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  if (!src || imageError) {
    return <>{fallback}</>
  }

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={cn(className, !imageLoaded && 'hidden')}
        onError={() => setImageError(true)}
        onLoad={() => setImageLoaded(true)}
      />
      {!imageLoaded && fallback}
    </>
  )
}

export default ImageWithFallback
