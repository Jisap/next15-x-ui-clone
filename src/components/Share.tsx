"use client"

import React, { useActionState, useState } from 'react'
import Image from './Image'
import { shareAction } from '@/actions';
import NextImage from "next/image";
import ImageEditor from './ImageEditor';
import { useUser } from '@clerk/nextjs';
import { addPost } from '@/action';

const Share = () => {

  const [media, setMedia] = useState<File | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [settings, setSettings] = useState<{
    type: "original" | "wide" | "square";
    sensitive: boolean;
  }>({
    type: "original",
    sensitive: false,
  });

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMedia(e.target.files[0]);
    }
  };

  const previewURL = media ? URL.createObjectURL(media) : null;

  const { user } = useUser();

  const [state, formAction, isPending] = useActionState(addPost, {
    success: false,
    error: false,
  });

  return (
    <form 
      className='p-4 flex gap-4'
      //action={(formData) => shareAction(formData, settings)}  
      action={formAction}
    >
      <div className='relative w-10 h-10 rounded-full overflow-hidden'>
        <Image 
          src={user?.imageUrl || "general/avatar.png"} 
          alt='avatar'
          w={100}
          h={100}
          tr={true}
        />
      </div>
      <div className='flex flex-col flex-1 gap-4'>    
        <input
          type="text"
          name="imgType"
          value={settings.type} // Los settings se cambian en el editor imagen y se pasan a la acción
          hidden
          readOnly
        />
        <input
          type="text"
          name="isSensitive"
          value={settings.sensitive ? "true" : "false"}
          hidden
          readOnly
        />
        <input 
          type="text" 
          placeholder='What is happening ?' 
          className='bg-transparent outline-none placehold:text-textGray text-xl' 
          name="desc"
        />

        {/* Preview Image */}
        {
          media?.type.includes("image") && previewURL && (
            <div className='relative rounded-xl overflow-hidden'>
              <NextImage 
                src={previewURL}
                alt=""
                width={600}
                height={600}
                className={`w-full ${settings.type === "original"
                    ? "h-full object-contain"
                    : settings.type === "square"
                      ? "aspect-square object-cover"
                      : "aspect-video object-cover"
                  }`}
              />
              <div 
                className="absolute top-2 left-2 bg-black bg-opacity-50 text-white py-1 px-4 rounded-full font-bold text-sm cursor-pointer"
                onClick={() => setIsEditorOpen(true)}  
              >
                Edit
              </div>
              <div
                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white h-8 w-8 flex items-center justify-center rounded-full cursor-pointer font-bold text-sm"
                onClick={() => setMedia(null)}
              >
                X
              </div>
            </div>
          )
        }

        {media?.type.includes("video") && previewURL && (
          <div className="relative">
            <video src={previewURL} controls />
            <div
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white h-8 w-8 flex items-center justify-center rounded-full cursor-pointer font-bold text-sm"
              onClick={() => setMedia(null)}
            >
              X
            </div>
          </div>
        )}


        {isEditorOpen && previewURL && (
          <ImageEditor
            onClose={() => setIsEditorOpen(false)}
            previewURL={previewURL}
            settings={settings}
            setSettings={setSettings}
          />
        )}

        <div className='flex items-center justify-between gap-4 flex-wrap'>
          <div className='flex gap-4 flex-wrap'>
            <input 
              type="file" 
              onChange={handleMediaChange} 
              className='hidden'
              name="file"
              id="file"
              accept="image/*,video/*"  
            />
            <label htmlFor="file">
              <Image 
                path="icons/image.svg"
                alt='image'
                w={20}
                h={20}
                className='cursor-pointer'
              />
            </label>
            <Image
              path="icons/gif.svg"
              alt='image'
              w={20}
              h={20}
              className='cursor-pointer'
            />
            <Image
              path="icons/poll.svg"
              alt='image'
              w={20}
              h={20}
              className='cursor-pointer'
            />
            <Image
              path="icons/emoji.svg"
              alt='image'
              w={20}
              h={20}
              className='cursor-pointer'
            />
            <Image
              path="icons/schedule.svg"
              alt='image'
              w={20}
              h={20}
              className='cursor-pointer'
            />
            <Image
              path="icons/location.svg"
              alt='image'
              w={20}
              h={20}
              className='cursor-pointer'
            />
          </div>
          <button className='bg-white text-black font-bold rounded-full  py-2 px-4'>
            Post
          </button>
        </div>
      </div>
    </form>
  )
}

export default Share