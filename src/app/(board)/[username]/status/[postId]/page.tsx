
import Comments from "@/components/Comments";
import Image from "@/components/Image";
import Post from "@/components/Post";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ postId: string; username: string }>;
}

const StatusPage = async({ params }: PageProps) => {

  const { username, postId } = await params;

  const { userId } = await auth();
  if (!userId) return null;

  const post = await prisma.post.findFirst({
    where: { id: Number(postId) },
    include: {                                                                // Deben incluirse dos relaciones
      user: { select: { displayName: true, username: true, img: true } },     // Información del usuario que creo la publicación
      _count: { select: { likes: true, rePosts: true, comments: true } },     // Cantidad de interacciones (likes, reposts, comentarios) de la publicación actual
      likes: { where: { userId: userId }, select: { id: true } },             // Verifica si el usuario autenticado ha dado like a esta publicación
      rePosts: { where: { userId: userId }, select: { id: true } },           // Verifica si el usuario autenticado ha hecho un repost de esta publicación
      saves: { where: { userId: userId }, select: { id: true } },             // Verifica si el usuario autenticado ha guardado esta publicación
    },
  })

  if (!post) return notFound();

  return (
    <div className="">
      <div className="flex items-center gap-8 sticky top-0 backdrop-blur-md p-4 z-10 bg-[#00000084]">
        <Link href="/">
          <Image 
            path="icons/back.svg" 
            alt="back" 
            w={24} 
            h={24} 
          />
        </Link>
        <h1 className="font-bold text-lg">Post</h1>
      </div>
      <Post 
        type="status" 
        post={post}  
      />
      {/* <Comments /> */}
    </div>
  );
};

export default StatusPage;