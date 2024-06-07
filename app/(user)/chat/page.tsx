import ChatList from "@/components/ui/ChatList";
import ChatPermissionsError from "@/components/ui/ChatPermissionsError";

type Props = {
    params: {};
    searchParams: {
        error: string;
    };  
};

function ChatsPage({searchParams: {error}}: Props) {
  return (
    <div>
      {error && (
        <div className="m-2">
            <ChatPermissionsError />
        </div>
      )}
        <ChatList/>
    </div>
  )
}

export default ChatsPage