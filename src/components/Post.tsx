import React from 'react'
import Image from './Image'
import PostInfo from './PostInfo'
import PostInteractions from './PostInteractions'
import Link from 'next/link';
import { Post as PostType } from '@prisma/client';
import { format } from 'timeago.js';
import Video from './Video';


type PostWithDetails = PostType & { // Post + info del user que creo la publicación + info de los post reenviados (usuarios que crearon su post)
  user: {
    displayName: string | null;
    username: string;
    img: string | null;
  };

  rePost?: (
    PostType & {
      user: {
        displayName: string | null;
        username: string;
        img: string | null;
      };
      _count: {
        likes: number;
        rePosts: number;
        comments: number;
      };
      likes: {id: number}[];
      rePosts: {id: number}[];
      saves: {id: number}[];

    }) | null;

  _count: {
    likes: number;
    rePosts: number;
    comments: number;
  };
  likes: { id: number }[]; 
  rePosts: { id: number }[];
  saves: { id: number }[];
}

const Post = ({ 
  type, 
  post }
  : { 
    type?: "status" | "comment",
    post: PostWithDetails
  }) => {

  const originalPost = post.rePost || post; // Si el post no es reposteado originalPost = post en caso contrario sera = rePost


  return (
    <div className='p-4 border-y-[1px] border-borderGray relative -z-10'>
      {/* Post Type */}
      {post.rePostId && 
        <div className='flex items-center gap-2 text-sm text-textGray mb-2 font-bold'>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24"
          >
            <path
              d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"
              fill="#71767b"
            />
          </svg>
                    
          <span>{post.user.displayName} reposted</span>
        </div>
      }

      {/* Post content */}
      <div className={`flex gap-4 ${type === "status" && "flex-col"}`}>
        {/* Avatar */}       
        <div className={
          `${type === "status" && "hidden"} 
          relative w-10 h-10 rounded-full overflow-hidden`
        }>
          <Image 
            path={originalPost.user.img || "general/noAvatar.png"}
            alt="avatar"
            h={100}
            w={100}
            tr={true}
          />
        </div>
        

        {/* Content */}
        <div className='flex-1 flex flex-col gap-2'>
          <div className='w-full flex justify-between'>
            <Link href={`/${originalPost.user.username}`} className="flex gap-4">
              <div className={
                `${type !== "status" && "hidden"} 
                relative w-10 h-10 rounded-full overflow-hidden -z-10`
              }>
                <Image
                  path={originalPost.user.img || "general/noAvatar.png"}
                  alt="avatar"
                  h={100}
                  w={100}
                  tr={true}
                />
              </div>
             
              <div className={
                `flex items-center gap-2 flex-wrap 
                ${type === "status" && "flex-col gap-0 !items-start"}`
              }>
                <h1 className='text-md font-bold'>{originalPost.user.displayName}</h1>
                <span className={
                  `text-textGray 
                  ${type === "status" && "text-sm"}`
                }>
                  @{originalPost.user.username}
                </span>
                {type !== "status" && (
                  <span className="text-textGray">{format(originalPost.createdAt)}</span>
                )}
              </div>
            </Link>
            
            <PostInfo />
          </div>

          <Link href={`/${originalPost.user.username}/status/${originalPost.id}`} className="flex gap-4">
            <p className={`${type === "status" && "text-lg"}`}>
              {originalPost.desc}
            </p>
          </Link>

          {originalPost.img && (
            <div className="overflow-hidden">
              <Image 
                path={originalPost.img}
                alt=""
                w={600}
                h={originalPost.imgHeight || 600}
                className={originalPost.isSensitive ? "blur-3xl" : ""}
              />
            </div>
          )}

          {originalPost.video && (
            <div className="rounded-lg overflow-hidden">
              <Video
                path={originalPost.video}
                className={originalPost.isSensitive ? "blur-3xl" : ""}
              />
            </div>
          )}

          {type === "status" && (
            <span className="text-textGray">8:41 PM · Dec 5, 2024</span>
          )}

          <PostInteractions 
            username={originalPost.user.username}
            postId={originalPost.id}
            count={originalPost._count}
            isLiked={!!originalPost.likes.length}
            isRePosted={!!originalPost.rePosts.length}
            isSaved={!!originalPost.saves.length}
          />
        </div>
      </div>
    </div>
  )
}

export default Post