import React from 'react'
import Image from './Image'

const PostInfo = () => {
  return (
    <div className='relative cursor-pointer w-4 h-4'>
      <Image 
        path="icons/infoMore.svg"
        alt="info"
        h={16}
        w={16}
      />
    </div>
  )
}

export default PostInfo