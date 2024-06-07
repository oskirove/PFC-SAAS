"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useAdminId from "@/hooks/useAdminId";
import { set } from "react-hook-form";

function DeleteChatButton({ chatId }: { chatId: string }) {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const adminId = useAdminId({chatId});

    const handleDelete = async () => {
        toast({
            title: "Eliminando Chat...",
            description: "Espera mientras eliminamos el chat",
        });

        console.log("Eliminando chat::", chatId);

        await fetch("/api/chat/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ chatId: chatId }),
        }).then ((res) => {
            toast({
                title: "Chat eliminado",
                description: "El chat ha sido eliminado",
                className: "bg-green-600 text-white",
                duration: 3000,
            });

            router.replace(`/chat`);
        }).catch((err) => {
            console.error(err.message);

            toast({
                title: "Error",
                description: "Hubo un error al eliminar el chat",
                variant: "destructive",
                duration: 3000,
            });
        })
        .finally(() => setOpen(false));
        
    };

    return session?.user.id === adminId && (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive">Borrar Chat</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>¿Estas seguro?</DialogTitle>
                    <DialogDescription>
                        Esto eliminará el chat para todos los usuarios.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 space-x-2">
                    <Button variant="destructive" onClick={handleDelete}>
                        Borrar
                    </Button>
                    <Button variant={"outline"} onClick={() => setOpen(false)}>
                        Cancelar
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
    
}

export default DeleteChatButton;


