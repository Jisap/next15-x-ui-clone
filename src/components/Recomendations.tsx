import Link from "next/link";
import Image from "./Image";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";

const Recommendations = async () => {

  const { userId } = await auth();
  if(!userId) return null;

  const followingsIds = await prisma.follow.findMany({                     // De la tabla de follow
    where: { followerId: userId },                                         // Solo se obtienen los registros donde el usuario logueado es seguidor
    select: { followingId: true },                                         // y devuelve solo el id de dichos seguidores
  });

  const followedUserIds = followingsIds.map((f) => f.followingId )         // De [followindIds] se estraen los ids

  const friendRecommendations = await prisma.user.findMany({               // Se consulta la tabla de user
    where: {                                                               // exluyendo
      id: { not: userId, notIn: followedUserIds },                         // el usuario logueado                     
      followings: { some: { followerId: { in: followedUserIds } } },       //y los usuarios que ya sigue
    },
    take: 3,
    select: { id: true, displayName: true, username: true, img: true },
  });

  return (
    <div className="p-4 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4">
      
      {/* User card */}
      {friendRecommendations.map((person) => (
        <div className='flex items-center justify-between' key={person.id} >
          <div className='flex items-center gap-2'>
            <div className='relative rounded-full overflow-hidden w-10 h-10'>
              <Image 
                path={person.img || "general/noAvatar.png"} 
                alt={person.username} 
                w={100} 
                h={100} 
                tr={true} 
              />
            </div>
            <div>
              <h1 className="text-md font-bold">{person.displayName || person.username}</h1>
              <span className="text-textGray text-sm">@{person.username}</span>
            </div>
          </div>
          {/* Button */}
          <button className="py-1 px-4 font-semibold bg-white text-black rounded-full">
            Follow
          </button>
        </div>
      ))}
 
      <Link href="/" className="text-iconBlue">
        Show More
      </Link>
    </div>
  );
};

export default Recommendations;