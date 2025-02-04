import Feed from "@/components/Feed";
import Image from "@/components/Image";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";

const UserPage = async ({ params }: { params: Promise<{ username: string }>}) => {

  const { userId } = await auth();

  const username = (await params).username;

  const user = await prisma.user.findUnique({
    where: { username: username },
    include: {
      _count: { select: { followers: true, followings: true } },
      followings: userId ? { where: { followerId: userId } } : undefined,
    },
  });

  if (!user) return notFound();


  return (
    <div>
      {/* Profile Title */}
      <div className="flex items-center gap-8 sticky top-0 backdrop-blur-md p-4 z-10 bg-[#00000084]">
        <Link href="/">
          <Image 
            path="icons/back.svg" 
            alt="back" 
            w={24} 
            h={24} 
          />
        </Link>
        <h1 className="font-bold text-lg">Lama Dev</h1>
      </div>

      <div className="">
        {/* Cover & avatar container */}
        <div className="relative w-full">
          <div className="w-full aspect-[3/1] relative">
            <Image 
              path="general/banner.jpg" 
              alt="" 
              w={600} 
              h={200} 
              tr={true} 
            />
          </div>
          <div className="w-1/5 aspect-square rounded-full overflow-hidden border-4 border-black bg-gray-300 absolute left-4 -translate-y-1/2">
            <Image 
              path="general/avatar.png" 
              alt="" 
              w={100} 
              h={100} 
              tr={true} 
            />
          </div>
        </div>

        {/* Buttons actions */}
        <div className="flex w-full items-center justify-end gap-2 p-2">
          <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer">
            <Image 
              path="icons/more.svg" 
              alt="more" 
              w={20} 
              h={20} 
            />
          </div>
          <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer">
            <Image 
              path="icons/explore.svg" 
              alt="more" 
              w={20} 
              h={20} 
            />
          </div>
          <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer">
            <Image 
              path="icons/message.svg" 
              alt="more" 
              w={20} 
              h={20} 
            />
          </div>
          <button className="py-2 px-4 bg-white text-black font-bold rounded-full">
            Follow
          </button>
        </div>

        {/* User Details */}
        <div className="p-4 flex flex-col gap-2">
          <div className="">
            <h1 className="text-2xl font-bold">Jisap Dev</h1>
            <span className="text-textGray text-sm">@jisapWebDev</span>
          </div>

          <p>Jisap Dev Youtube Channel</p>

          {/* Job & Location & Date Joined */}
          <div className="flex gap-4 text-textGray text-[15px]">
            <div className="flex items-center gap-2">
              <Image
                path="icons/userLocation.svg"
                alt="location"
                w={20}
                h={20}
              />
              <span>SPAIN</span>
            </div>
            <div className="flex items-center gap-2">
              <Image path="icons/date.svg" alt="date" w={20} h={20} />
              <span>Joined May 2021</span>
            </div>
          </div>

          {/* Followings & Followers */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold">100</span>
              <span className="text-textGray text-[15px]">Followers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">100</span>
              <span className="text-textGray text-[15px]">Followings</span>
            </div>
          </div>
        </div>
      </div>

      <Feed userProfileId={user.id}/>
    </div>
  )
}

export default UserPage