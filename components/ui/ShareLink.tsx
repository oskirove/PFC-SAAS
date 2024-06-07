"use client";

import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    } from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Dispatch, SetStateAction } from "react";
import { useToast } from "@/components/ui/use-toast";

function ShareLink({
    isOpen,
    chatId,
    setIsOpen,
}: {
    isOpen: boolean;
    chatId: string;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {

    const { toast } = useToast();
    const host = window.location.host;

    const linkToChat =
        process.env.NODE_ENV === "development"
            ? `http://${host}/chat/${chatId}`
            : `https://${host}/chat/${chatId}`;

    async function copyToClipBoard() {
        try {
            await navigator.clipboard.writeText(linkToChat);
            console.log("Enlace copiado al portapapeles");

            toast({
                title: "Enlace copiado ",
                description: "Comparte esto con la persona con la que quieres chatear (NOTA: debe estar agregada al chat para acceder a él!)",
                className: "bg-green-600 text-white"
            })


        } catch (err) {
            console.log("Error al copiar el enlace", err);
        }
    }

  return (
    <Dialog
    onOpenChange={(open) => setIsOpen(open)}
    open={isOpen}
    defaultOpen={isOpen}
>
    <DialogTrigger asChild>
        <Button variant="outline">
            <Copy className="mr-2" />
            Compartir Enlace
        </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-md">
        <DialogHeader>
            <DialogTitle>Share Link</DialogTitle>
            <DialogDescription>
                Cualquier usuario que haya sido{" "}
                <span className="text-indigo-600 font-bold">invitado</span>{" "}
                puede utilizar este enlace
            </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                    Enlace
                </Label>
                <Input id="link" defaultValue={linkToChat} readOnly />
            </div>
            <Button
                type="submit"
                onClick={() => copyToClipBoard()}
                size="sm"
                className="px-3"
            >
                <span className="sr-only">Copiar</span>
                <Copy className="h-4 w-4" />
            </Button>
        </div>
        <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
                <Button type="button" variant="secondary">
                    Cerrar
                </Button>
            </DialogClose>
        </DialogFooter>
    </DialogContent>
</Dialog>

  )
}

export default ShareLink