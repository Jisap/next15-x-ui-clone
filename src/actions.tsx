"use server";

import { imagekit } from "./components/utils";

export const shareAction = async (                                          // Se recibe el file del input y su tipo
  formData: FormData,
  settings: { type: "original" | "wide" | "square"; sensitive: boolean }
) => {
  const file = formData.get("file") as File;                                // Se obtiene el file del input

  const bytes = await file.arrayBuffer();                                   // Obtiene los bytes del archivo.
  const buffer = Buffer.from(bytes);                                        // convierte los bytes en un buffer, necesario para la subida a ImageKit.

  const transformation = `w-600, ${settings.type === "square"               // Se define la transformación de imagen según el type
      ? "ar-1-1"                                                            // Si es square se aplica aspect-ratio: 1/1  
      : settings.type === "wide"                                            // Si es wide se aplica aspect-ratio: 16/9
        ? "ar-16-9"
        : ""                                                                // Si no es ni square ni wide se aplica la transformación por defecto w-600
    }`;

  imagekit.upload(                                                          // Subida a ImageKit
    {
      file: buffer,
      fileName: file.name,
      folder: "/posts",
      ...(file.type.includes("image") && {
        transformation: {
          pre: transformation,
        },
      }),
      customMetadata: {
        sensitive: settings.sensitive,
      },
    },
    function (error, result) {
      if (error) console.log(error);
      else console.log(result);
    }
  );
};