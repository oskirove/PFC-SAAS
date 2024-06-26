"use client";

import { Message, sortedMessagesRef } from "@/lib/converters/Message";
import { useLanguageStore } from "@/store/store";
import { MessageCircleCodeIcon, MessageCircleIcon } from "lucide-react";
import { Session } from "next-auth";
import { createRef, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import LoadingSpinner from "./LoadingSpinner";
import UserAvatar from "./UserAvatar";

function ChatMessages({
    chatId,
    initialMessages,
    session,
}: {
    chatId: string;
    initialMessages: Message[];
    session: Session | null;
}) {
    const language = useLanguageStore((state) => state.language);
    const messagesEndRef = createRef<HTMLDivElement>();

    const [messages, loading, error] = useCollectionData<Message>(
        sortedMessagesRef(chatId),
        {   
            initialValue: initialMessages,
        }
    );

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, messagesEndRef]);

  return (
    <div className="p-5 ">
        {!loading && messages?.length === 0 && (
            <div className="flex flex-col justify-center text-center items-center p-20 rounded-xl space-y-2
             bg-orange-400 text-white ">
                <MessageCircleIcon className="w-10 h-10"/>

                <h2>
                    <span className="font-bold">¡Invita a un amigo </span>y{" "}
                    <span className="font-bold">
                        Envia tu primer mensaje en cualquier idioma
                    </span>{" "}
                    para empezar!
                </h2>
                <p>La IA detectará y traducirá todo por ti</p>
            </div>
        )}

        {messages?.map((message) => {
            const isSender = message.user.id === session?.user?.id;

            return (
                <div key = {message.id} className="flex my-2 items-end">
                    <div 
                    className={`flex flex-col relative space-y-2 p-4 w-fit line-clamp-1 mx-2 rounded-3xl ${
                        isSender
                        ? "ml-auto bg-orange-600 text-white rounded-br-none"
                        : "bg-zinc-100 dark:text-zinc-100 dark:bg-zinc-700 rounded-bl-none"
                    }`}
                    >
                        <p
                        className={`text-xs italic font-extralight line-clamp-1 ${
                            isSender ? "text-right" : "text-left"
                        }`}
                        >
                            {message.user.name.split(" ")[0]}
                        </p>
                        <div className="flex space-x-2">
                            <p>{message.translated?.[language] || message.input}</p>
                            {!message.translated && <LoadingSpinner/>}
                        </div>

                    </div>
                    <UserAvatar
                        name={message.user.name}
                        image={message.user.image}
                        className={`${!isSender && "-order-1"}`}
                    />
                </div>
            );
        })}
        
        <div ref={messagesEndRef}/>
    </div>

    
  )
}

export default ChatMessages