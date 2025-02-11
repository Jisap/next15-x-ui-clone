"use client"

import Image from "./Image";



type NotificationType = {
  id: string;
  senderUsername: string;
  type: "like" | "comment" | "rePost" | "follow";
  link: string;
};

const Notification = () => {
  return (
    <div className='cursor-pointer p-2 rounded-full hover:bg-[#181818] flex items-center gap-4'>
      <Image
        path={`icons/notification.svg`}
        alt="notification"
        w={24}
        h={24}
      />
      <span className='hidden xxl:inline'>
        Notifications
      </span>
    </div>
  )
}

export default Notification