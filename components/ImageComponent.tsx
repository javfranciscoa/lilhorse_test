import React from "react";
import Image from "next/image";

type ImageComponentProps = {
  src: string;
  alt: string;
  className: string;
};

const ImageComponent: React.FC<ImageComponentProps> = ({
  className,
  src,
  alt,
}) => {
  return (
    <div className={className}>
      <Image src={src} alt={alt} width={100} height={100} />
    </div>
  );
};

export default ImageComponent;
