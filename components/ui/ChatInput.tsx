"use client";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, limitedMessagesRef, messagesRef } from "@/lib/converters/Message";
import { addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useSubscriptionStore } from "@/store/store";
import { useToast } from "./use-toast";
import { ToastAction } from "@radix-ui/react-toast";

const formSchema = z.object({
    input: z.string().max(1000),
});

function ChatInput({ chatId }: { chatId: string }) {
    const { data: session } = useSession();
    const router = useRouter();
    const subscription = useSubscriptionStore((state) => state.subscription);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            input: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const inputCopy = values.input.trim();
        form.reset();
        
        if (values.input.length === 0) {
            return;
        }

        if (!session?.user) {
            return;
        }

        const messages = (await getDocs(limitedMessagesRef(chatId))).docs.map(
            (doc) => doc.data()
        ).length;

        const isPro = 
        subscription?.role === "pro" && subscription.status === "active";

        if (!isPro && messages >= 300) {
            toast({
                title: "Se Ha Alcanzado el Límite del Plan Gratuito",
                description: "Has superado el límite del plan Gratuito de 300 mensajes por chat. ¡Actualiza a PRO para desbloquar mensajes ilimitados.",
                variant: "destructive",
                action: (
                    <ToastAction
                    altText= "Actualizar a PRO"
                    onClick={() => router.push("/register")}
                    >
                        Mejorar a PRO
                    </ToastAction>
                ),
            });

            return;
        }

        const userToStore: User = {
            id: session.user.id!,
            name: session.user.name!,
            email: session.user.email!,
            image: session.user.image || "",
        };

        addDoc(messagesRef(chatId), {
            input: values.input,
            timestamp: serverTimestamp(),
            user: userToStore,
        });

    }

    return (
        <div className="sticky bottom-0">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex space-x-2 p-2 rounded-t-xl max-w-4xl mx-auto bg-white border dark:bg-zinc-800"
                >
                    <FormField
                        control={form.control}
                        name="input"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input
                                        className="border-none bg-transparent dark:placeholder:text-white/70"
                                        placeholder="Escribe un mensaje en cualquier idioma..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="bg-orange-600 text-white">
                        Enviar
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default ChatInput;
