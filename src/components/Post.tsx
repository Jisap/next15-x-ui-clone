import React from 'react'
import Image from './Image'
import PostInfo from './PostInfo'

const Post = () => {
  return (
    <div className='p-4 border-y-[1px] border-borderGray'>
      {/* Post Type */}
      <div className='flex items-center gap-2 text-sm text-textGray mb-2 font-bold'>
        icon
        <span>Jisap reposted</span>
      </div>
      {/* Post content */}
      <div className='flex gap-4'>
        {/* Avatar */}
        <div className='relative w-10 h-10 rounded-full overflow-hidden'>
          <Image 
            path="general/avatar.png"
            alt="avatar"
            h={100}
            w={100}
            tr={true}
          />
        </div>

        {/* Content */}
        <div className='flex-1 flex flex-col gap-2'>
          <div className='flex items-center justify-between gap-2'>
            <div className='flex items-center gap-2 flex-wrap'>
              <h1 className='text-md font-bold'>Jisap</h1>
              <span className='text-textGray'>@jisapDev</span>
              <span className='text-textGray'>2 days ago</span>
            </div>
            <PostInfo />
          </div>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta a quibusdam, recusandae animi incidunt tempora quasi, omnis aut dolore vel eum distinctio dolorum asperiores accusantium, aspernatur soluta aliquam enim quam?
          </p>

          <Image 
            path="general/post.jpeg"
            alt="post"
            w={600}
            h={600}
          />
        </div>
      </div>
    </div>
  )
}

export default Post