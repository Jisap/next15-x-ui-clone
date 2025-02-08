"use server"

import { auth } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export const likePost = async (postId: number) => {
  const { userId } = await auth();

  if (!userId) return;

  const existingLike = await prisma.like.findFirst({  // Verifica si el usuario ya ha hecho like a la publicación
    where: {
      userId: userId,
      postId: postId,
    },
  });

  if (existingLike) {
    await prisma.like.delete({                         // Elimina el like si ya existe
      where: { id: existingLike.id },
    });
  } else {
    await prisma.like.create({                         // Si no crea un like nuevo
      data: { userId, postId },
    });
  }
};