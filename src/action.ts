"use server"

import { auth } from "@clerk/nextjs/server";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

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

export const rePost = async (postId: number) => {
  const { userId } = await auth();

  if (!userId) return;

  const existingRePost = await prisma.post.findFirst({
    where: {
      userId: userId,
      rePostId: postId,
    },
  });

  if (existingRePost) {
    await prisma.post.delete({
      where: { id: existingRePost.id },
    });
  } else {
    await prisma.post.create({
      data: { userId, rePostId: postId },
    });
  }
};

export const savePost = async (postId: number) => {
  const { userId } = await auth();

  if (!userId) return;

  const existingSavedPost = await prisma.savedPosts.findFirst({
    where: {
      userId: userId,
      postId: postId,
    },
  });

  if (existingSavedPost) {
    await prisma.savedPosts.delete({
      where: { id: existingSavedPost.id },
    });
  } else {
    await prisma.savedPosts.create({
      data: { userId, postId },
    });
  }
};

export const addComment = async (
  prevState: { success: boolean; error: boolean },
  formData: FormData
) => {
  const { userId } = await auth();

  if (!userId) return { success: false, error: true };

  const postId = formData.get("postId");              // Id del post al que se comenta
  const username = formData.get("username");          // Username del autor del post original 
  const desc = formData.get("desc");                  // Contenido del comentario

  const Comment = z.object({                          // Se define la estructura del comentario con Zod:
    parentPostId: z.number(),                         // id del post original
    desc: z.string().max(140),                        // desc es el texto del comentario
  });

  const validatedFields = Comment.safeParse({         // Validación con Zod
    parentPostId: Number(postId),                     // parentPostId es el id de la publicación que se está respondiendo
    desc,                                             // desc es el texto del comentario
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return { success: false, error: true };
  }

  try {
    await prisma.post.create({                         // Si la validación es correcta, se crea el comentario en la base de datos
      data: {
        ...validatedFields.data,                       // Con el spread de parentPostId y desc
        userId,                                        // y con el userId del usuario autenticado que comenta
      },
    });
    revalidatePath(`/${username}/status/${postId}`);   // Se revalida la url para actualizar la lista de comentarios
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};