import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function ChatPermissionsError() {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex">
                <p className="flex-1">
                    Ooops... No tienes permiso para ver este Chat.
                    <br />
                    <span className="font-bold">
                        Por favor, pide al administrador de la sala que te añada al chat.
                    </span>
                </p>
                <Link href="/chat" replace>
                    <Button variant="destructive">Descartar</Button>
                </Link>
            </AlertDescription>
        </Alert>
    );
    
}

export default ChatPermissionsError