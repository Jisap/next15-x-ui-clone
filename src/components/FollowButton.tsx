"use client"

interface Props {
  userId: string
  isFollowed: boolean
}

const FollowButton = (props: Props) => {
  
  const { userId, isFollowed } = props

  return (
    <button className="py-2 px-4 bg-white text-black font-bold rounded-full">
      {isFollowed ? "Unfollow" : "Follow"}
    </button>
  )
}

export default FollowButton