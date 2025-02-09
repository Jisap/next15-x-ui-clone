"use client";

import { IKImage } from "imagekitio-next";

type ImageType = {
  path?: string;
  src?: string;
  w?: number;
  h?: number;
  alt: string;
  className?: string;
  tr?: boolean;         // booleano opcional que indica si se deben aplicar transformaciones a la imagen.
};

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

if (!urlEndpoint) {
  throw new Error('Error: Please add urlEndpoint to .env or .env.local')
}

const Image = ({ path, src, w, h, alt, className, tr }: ImageType) => {
  return (
    <IKImage
      urlEndpoint={urlEndpoint}
      path={path}
      src={src}
      {...(tr
        ? { transformation: [{ width: `${w}`, height: `${h}` }] }      // Si tr es true, el ancho y el alto se aplican como transformaciones en ImageKit -> redimension en el server antes de servirla al cliente 
        : { width: w, height: h })}                                    // Si tr es false o no está definido, el ancho y el alto se aplican directamente como atributos HTML -> no redimension en el server
      lqip={{ active: true, quality: 20 }}                             // Activa la carga de imágenes de baja calidad (LQIP) con una calidad del 20%.
      alt={alt}
      className={className}
    />
  );
};

export default Image;