import React from 'react'
import Post from './Post'
import { prisma } from '@/prisma';
import { auth } from '@clerk/nextjs/server';
import InfiniteFeed from './InfiniteFeed';

const Feed = async ({ userProfileId }: { userProfileId?: string }) => {

  const { userId } = await auth();
  if (!userId) return;

  const whereCondition = userProfileId                              // Si userProfileId existe, la consulta buscará registros 
    ? { 
      userId: userProfileId,                                        // creadas por el usuario cuyo userId coincide con userProfileId.
      parentPostId: null,                                           // Filtra las publicaciones para incluir solo aquellas que no son respuestas a otras publicaciones (es decir, publicaciones principales).
    } : {
      parentPostId: null,
      userId: {                                                     // Si userProfileId no existe, se buscarán registros donde el userId logueado
        in: [                                                       // esté en un array que contiene:
          userId,                                                   // - El userId del usuario actual, (user logueado).
          ...(await prisma.follow.findMany({                        // - Los followingId de los usuarios que el usuario autenticado sigue 
            where: { followerId: userId },                          // (obtenidos de la tabla follow donde followerId es igual a userId).
            select: { followingId: true },                          // Solo necesitamos el field followingId.
          })).map((follow) => follow.followingId),                  // Convertimos el array de objetos en un array de ids.
        ]
      }
    };

  const postIncludeQuery = {
    user: { select: { displayName: true, username: true, img: true } },  // Información del usuario que creo la publicación
    _count: { select: { likes: true, rePosts: true, comments: true } },  // Cantidad de interacciones (likes, reposts, comentarios) de la publicación actual
    likes: { where: { userId: userId }, select: { id: true } },          // Filtra los likes para incluir solo aquellos donde el campo userId en la tabla de likes coincide con el userId del usuario autenticado. 
    rePosts: { where: { userId: userId }, select: { id: true } },        // Filtra los reposts para incluir solo aquellos donde el campo userId en la tabla de reposts coincide con el userId del usuario autenticado.
    saves: { where: { userId: userId }, select: { id: true } },          // Filtra los saves para incluir solo aquellos donde el campo userId en la tabla de saves coincide con el userId del usuario autenticado.
  };  

  const posts = await prisma.post.findMany({
    where: whereCondition,
    include: {
      rePost: {
        include: postIncludeQuery,
      },
      ...postIncludeQuery,
    },
    take: 3,
    skip: 0,
    orderBy: { createdAt: "desc" },
  });


  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <Post post={post} />
        </div>
      ))}
      <InfiniteFeed userProfileId={userProfileId} />
    </div>
  )
}

export default Feed