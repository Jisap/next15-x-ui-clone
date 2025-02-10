"use client"

import { followUser } from "@/action";
import { useOptimistic, useState } from "react";

interface Props {
  userId: string
  isFollowed: boolean
}

const FollowButton = (props: Props) => {
  
  const { userId, isFollowed } = props;

  const [state, setState] = useState(isFollowed); // Estado real de si esta seguido o no

  const [optimisticFollow, switchOptimisticFollow] = useOptimistic(
    state,           // Estado base (optimisticFollow)
    (prev) => !prev  // Función que cambia el estado de forma inmediata (switchOptimisticFollow)
  )

  const followAction = async () => {
    switchOptimisticFollow("")   // Se cambia inmediatamente el estado de optimisticFollow a true
    await followUser(userId);    // Se hace la petición al server para cambiar el estado
    setState((prev) => !prev)    // Si la res es ok se cambia el estado real state=true. Cuando state cambia, optimisticFollow también se actualiza automáticamente.
  };

  return (
    <form action={followAction}>
      <button className="py-2 px-4 bg-white text-black font-bold rounded-full">
        {optimisticFollow ? "Unfollow" : "Follow"}
      </button>
    </form>
  )
}

export default FollowButton