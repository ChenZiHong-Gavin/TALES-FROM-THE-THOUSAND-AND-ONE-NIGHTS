import React, { useRef, useState } from 'react';

const Blob = ({
  size,
  isOutline,
  type,
  svgPath,
  color,
  colors,
  image,
}) => {
  const ref = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  const props = {
    fill: color,
  };
  if (type === 'gradient') {
    props.fill = 'url(#gradient)';
  }
  if (isOutline) {
    props.strokeWidth = '7px';
    props.fill = 'none';
    props.stroke = color;
  }
  if (type === 'gradient' && isOutline) {
    props.stroke = 'url(#gradient)';
  }
  if (!svgPath) {
    return (
      <div>
        Loading
      </div>
    );
  }

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="100%"
      id="blobSvg"
      ref={ref}
    >
      {type === 'solid' && <path id="blob" d={svgPath} {...props} />}
      {type === 'gradient' && (
        <>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: colors[0] }} />
              <stop offset="100%" style={{ stopColor: colors[1] }} />
            </linearGradient>
          </defs>
          <path id="blob" d={svgPath} {...props} />
        </>
      )}
      {type === 'image' && (
        <>
          <defs>
            <clipPath id="shape">
              <path id="blob" d={svgPath} {...props} />
            </clipPath>
          </defs>
          {/* {!imgLoaded && (
            <image
              x="0"
              y="0"
              width="100%"
              height="100%"
              clipPath="url(#shape)"
              xlinkHref={LoadingImg}
              preserveAspectRatio="none"
            />
          )} */}
          <image
            x="0"
            y="0"
            width="100%"
            height="100%"
            clipPath="url(#shape)"
            xlinkHref={image}
            preserveAspectRatio="none"
            onLoad={() => {
              setImgLoaded(true);
            }}
          />
        </>
      )}
    </svg>
  );
};

export default Blob;