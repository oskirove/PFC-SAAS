"use client";

import { Button } from "@/components/ui/button";

import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
 } from "@/components/ui/dialog";

 import { Input } from "@/components/ui/input";

 import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
 } from "@/components/ui/form";

 import { zodResolver } from "@hookform/resolvers/zod";
 import { useForm } from "react-hook-form";

 import * as z from "zod";
 import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
 import { addChatRef, chatMembersRef } from "@/lib/converters/ChatMembers";
 import { useSession } from "next-auth/react";
 import { useState } from "react";
 import { getUserByEmailRef } from "@/lib/converters/User";
 import { useToast } from "@/components/ui/use-toast";
 import useAdminId from "@/hooks/useAdminId";
 import { PlusCircleIcon } from "lucide-react";
 //import  { ShareLink } from "./ShareLink";
 import { useSubscriptionStore } from "@/store/store";
 import { ToastAction } from "@radix-ui/react-toast";
 import { useRouter } from "next/navigation";
import ShareLink from "./ShareLink";

 const formSchema = z.object({
  email: z.string().email("Porfavor ingresa un email válido"),
 });

function InviteUser({chatId}: {chatId: string}) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const adminId = useAdminId({ chatId });
  const subscription = useSubscriptionStore((state) => state.subscription);
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [openInviteLink, setOpenInviteLink] = useState(false);

  const form = useForm <z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!session?.user.id) return;

    toast({
      title: "Enviando invitación...",
      description: "Porfavor espere mientras enviamos la invitación"
    })

    const noOfusersInChat = (await getDocs(chatMembersRef(chatId))).docs.map(
      (doc) => doc.data()
    ).length;

    const isPro = subscription?.role === "pro" && subscription.status === "active";

    if (!isPro && noOfusersInChat >= 2) {
      toast({
        title: "Limite de usuarios excedido",
        description: "Tu plan no te permite tener más de 2 usuarios en un chat",
        variant: "destructive",
        action:(
          <ToastAction
            altText = "Actualizar Plan"
            onClick={() => router.push("/register")}
          >
            Actualizar a PRO
          </ToastAction>
        )
      });
      return;
    }

    const querySnapshot = await getDocs(getUserByEmailRef(values.email));

    if (querySnapshot.empty) {
      toast({
        title: "Usuario no encontrado",
        description: "Porfavor introduce un email de un usuario registrado o reenvia la invitación una vez este registrado!",
        variant: "destructive",
      });

      return;
    } else {

    }

    form.reset();
    const user = querySnapshot.docs[0].data();

    await setDoc(addChatRef(chatId, user.id),{
      userId: user.id!,
      email: user.email!,
      timestamp: serverTimestamp(),
      chatId: chatId,
      isAdmin: false,
      image: user.image || "",
    }).then(() => {
      setOpen(false);

      toast({
        title: "Añadido Al Chat!",
        description: `El usuario ${user.email} ha sido añadido al chat con éxito!`,
        className: "bg-green-600 text-white",
        duration: 3000,
      });

      setOpenInviteLink(true);
    })

    .catch((error) => {
      toast({
        title: "Error",
        description: "Ooops... Hubo un error al añadir al usuario al chat. Porfavor intentalo de nuevo!",
        variant: "destructive",
      });
      setOpen(false);
    });

    form.reset();
  }
  return (
    adminId === session?.user.id && (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircleIcon className="mr-1" />
              Invitar Usuario al chat
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-d">
            <DialogHeader>
            <DialogTitle>Invitar Usuario al Chat</DialogTitle>
            <DialogDescription>
              Ingresa el email del usuario que deseas invitar al chat!{" "}
              <span className="text-orange-600 font-bold">
                (Nota: El usuario debe estar registrado)
              </span>
            </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-2"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="jhoe@doe.com" {...field}/>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                  )}
                />
                <Button className="ml-auto sm:w-fit w-full" type="submit">Invitar</Button>

              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <ShareLink
          isOpen={openInviteLink}
          setIsOpen={setOpenInviteLink}
          chatId={chatId}
        />
      </>
  )
);
}

export default InviteUser