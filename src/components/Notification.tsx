"use client"

import { useEffect, useState } from "react";
import Image from "./Image";
import { socket } from "@/socket";
import { useRouter } from "next/navigation";



type NotificationType = { // Tipo para el estado de Notification
  id: string;
  senderUsername: string;
  type: "like" | "comment" | "rePost" | "follow";
  link: string;
};

const Notification = () => {

  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.on("getNotification", (data: NotificationType) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, []);

  const router = useRouter();

  const reset = () => {
    setNotifications([]);
    setOpen(false);
  };

  const handleClick = (notification: NotificationType) => {                        // Cuando se hace click en una notificación
    const filteredList = notifications.filter((n) => n.id !== notification.id);    // Se filtra la lista de notificaciones para eliminar la notificación seleccionada
    setNotifications(filteredList);                                                // Se actualiza la lista de notificaciones
    setOpen(false);                                                                // Se cierra el modal
    router.push(notification.link);
  };

  return (
    <div className="relative mb-4">
      <div 
        className='cursor-pointer p-2 rounded-full hover:bg-[#181818] flex items-center gap-4'
        onClick={() => setOpen((prev) => !prev)}
      >
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
      {open && (
        <div className="absolute -right-full p-4 rounded-lg bg-white text-black flex flex-col gap-4 w-max">
          <h1 className="text-xl text-textGray">Notifications</h1>
          {notifications.map((n) => (
            <div
              className="cursor-pointer"
              key={n.id}
              onClick={() => handleClick(n)}
            >
              <b>{n.senderUsername}</b>{" "}
              {n.type === "like"
                ? "liked your post"
                : n.type === "rePost"
                  ? "re-posted your post"
                  : n.type === "comment"
                    ? "replied your post"
                    : "followed you"}
            </div>
          ))}
          <button
            onClick={reset}
            className="bg-black text-white p-2 text-sm rounded-lg"
          >
            Mark as read
          </button>
        </div>
      )}
    </div>
  )
}

export default Notification