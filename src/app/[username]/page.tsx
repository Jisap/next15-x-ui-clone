import Feed from "@/components/Feed";
import Image from "@/components/Image";
import Link from "next/link";

const UserPage = () => {
  return (
    <div>
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
        {/* COVER & AVATAR CONTAINER */}
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
      </div>
    </div>
  )
}

export default UserPage