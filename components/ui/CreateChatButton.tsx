"use client"

import { useRouter } from "next/navigation";
import { Button } from "./button";
import { MessageSquarePlusIcon } from "lucide-react";
import { useSubscriptionStore } from "@/store/store";
import { useSession } from "next-auth/react";
import { useToast } from "./use-toast";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { v4 as uuidv4 } from "uuid";
import { addChatRef, chatMembersCollectionGroupRef } from "@/lib/converters/ChatMembers";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { ToastAction } from "@radix-ui/react-toast";

function CreateChatButton({ isLarge }: { isLarge?: boolean }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const subscription = useSubscriptionStore((state) => state.subscription);

  const createNewChat = async () => {
    if (!session?.user.id) return;

    setLoading(true);
    toast({
      title: "Creando un nuevo chat...",
      description: "Agárrate fuerte mientras creamos tu nuevo chat...",
      duration: 3000,
    })

    const noOfChats = (
      await getDocs(chatMembersCollectionGroupRef(session.user.id))
    ).docs.map((doc) => doc.data()).length;

    const isPro = subscription?.role === "pro" && subscription?.status === "active";

    if (!isPro && noOfChats >= 3) {
      toast({
          title: "Has excedido el límite de chats",
          description:
              "Has superado el límite de chats para el plan GRATIS. Actualiza a PRO para seguir creando nuevos chats.",
          variant: "destructive",
          action: (
              <ToastAction
                  altText="Mejorar plan"
                  onClick={() => router.push("/register")}
              >
                  Mejorar a PRO
              </ToastAction>
          ),
      });
  
      setLoading(false);
      return;
  }
  

    const chatId = uuidv4();

    await setDoc(addChatRef(chatId, session.user.id), {
      userId: session.user.id!,
      email: session.user.email!,
      timestamp: serverTimestamp(),
      isAdmin: true,
      chatId: chatId,
      image: session.user.image!,
    }).then(() => {
        toast({
          title: "Chat creado",
          description: "¡Tu chat ha sido credo con exito!",
          className: "bg-green-600 text-white",
          duration: 2000,
      });
      router.push(`/chat/${chatId}`);
    }).catch(() => {
      toast({
        title: "Lo sentimos...",
        description: "¡Ha ocurrido un error al crear tu chat!",
        variant: "destructive",
      });
    }).finally(() => {
      setLoading(false);
    });
  };

  if (isLarge)
      return (
        <div>
          <Button variant={"default"} onClick={createNewChat}>
            {loading ? <LoadingSpinner /> : "Crear un nuevo chat"}
          </Button>
        </div>
      );

    return (
      <Button onClick={createNewChat} variant={"ghost"}>
        <MessageSquarePlusIcon />
      </Button>
    )
  }

  export default CreateChatButton