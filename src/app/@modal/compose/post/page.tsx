"use client"

import Image from '@/components/Image';
import { useRouter } from "next/navigation";
import { useEffect } from 'react';

// @modal -> el contenido de @modal se renderizará en paralelo con otras rutas,
// permitiendo que se muestre un modal sin perder el contexto de la página actual.
// El contenido de @modal se renderiza junto con la página principal, pero en un "slot" independiente.


const PostModal = () => {



  
  
  return (
    <div className='absolute w-screen h-screen top-0 left-0 z-20 bg-[#293139a6] flex justify-center'>
      <div className="py-4 px-8 rounded-xl bg-black w-[600px] h-max mt-12">
        
        {/* Top */}
        <div className="flex items-center justify-between">
          <div className="cursor-pointer">
            X
          </div>
          <div className="text-iconBlue font-bold">Drafts</div>
        </div>

        {/* Center */}
        <div className="py-8 flex gap-4">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              path="general/avatar.png"
              alt="Lama Dev"
              w={100}
              h={100}
              tr={true}
            />
          </div>
          <input
            className="flex-1 bg-transparent outline-none text-lg"
            type="text"
            placeholder="What is happening?!"
          />
        </div>

        {/* Bottom */}
        <div className=" flex items-center justify-between gap-4 flex-wrap border-t border-borderGray pt-4">
          <div className="flex gap-4 flex-wrap">
            <Image
              path="icons/image.svg"
              alt=""
              w={20}
              h={20}
              className="cursor-pointer"
            />
            <Image
              path="icons/gif.svg"
              alt=""
              w={20}
              h={20}
              className="cursor-pointer"
            />
            <Image
              path="icons/poll.svg"
              alt=""
              w={20}
              h={20}
              className="cursor-pointer"
            />
            <Image
              path="icons/emoji.svg"
              alt=""
              w={20}
              h={20}
              className="cursor-pointer"
            />
            <Image
              path="icons/schedule.svg"
              alt=""
              w={20}
              h={20}
              className="cursor-pointer"
            />
            <Image
              path="icons/location.svg"
              alt=""
              w={20}
              h={20}
              className="cursor-pointer"
            />
          </div>
          <button className="py-2 px-5 text-black bg-white rounded-full font-bold">Post</button>
        </div>

      </div>
    </div>
  )
}

export default PostModal