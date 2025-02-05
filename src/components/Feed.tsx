import React from 'react'
import Post from './Post'
import { prisma } from '@/prisma';
import { auth } from '@clerk/nextjs/server';
import InfiniteFeed from './InfiniteFeed';

const Feed = async ({ userProfileId }: { userProfileId?: string }) => {

  const { userId } = await auth();
  if (!userId) return;

  const whereCondition = userProfileId
    ? { parentPostId: null, userId: userProfileId }                 // Si userProfileId existe, la consulta buscará registros donde userId sea igual a userProfileId. 
    : {
      parentPostId: null,
      userId: {                                                     // Si userProfileId no existe, se buscarán registros donde el userId
        in: [                                                       // esté en un array que contiene:
          userId,                                                   // - El userId del usuario actual.
          ...(await prisma.follow.findMany({                        // - Los followingId de los usuarios que el usuario actual sigue 
            where: { followerId: userId },                          // (obtenidos de la tabla follow donde followerId es igual a userId).
            select: { followingId: true },                          // Solo necesitamos el field followingId.
          })).map((follow) => follow.followingId),                  // Convertimos el array de objetos en un array de ids.
        ]
      }
    };
 

  const posts = await prisma.post.findMany({
    where: whereCondition,
    take: 3,
    skip: 0,
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <Post  />
        </div>
      ))}
      <InfiniteFeed userProfileId={userProfileId} />
    </div>
  )
}

export default Feed