import{ useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import { useCheckQuery } from "../../store/api/authApiSlice";
import {  useGetMessagesQuery } from "../../store/api/messageApiSlice";
import { useGetTypingStatusQuery } from "../../store/api/typingApiSlice";
import {  useSelector } from "react-redux";
// import { subscribeToMessages, unsubscribeFromMessages, emitTyping } from "../../utils/socket";
import LazyImage from "../../components/LazyImage";
import {formatMessageTime} from "./FormatMessageTime";
import MessageInput from "./MessageInput";
import MessageSkeleton from "../../components/skeleton/MessageSkeleton";
import { emitTyping } from "../../utils/socket";
export default function ChatContainer() {
  const { selectedUser } = useSelector((state) => state.user);
  const { data: messages = [], isLoading: isMessagesLoading } = useGetMessagesQuery(selectedUser?._id);
  const { data: authUser } = useCheckQuery();
  const messageEndRef = useRef(null);
  const { data: typingStatus = {} } = useGetTypingStatusQuery(selectedUser?._id);
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); 
  

  const handleTyping = () => {
    if (selectedUser?._id) {
      emitTyping({
        conversationId: selectedUser._id,
        userId: authUser._id,
        isTyping: true
      });

      setTimeout(() => {
        emitTyping({
          conversationId: selectedUser._id,
          userId: authUser._id,
          isTyping: false
        });
      }, 3000);
    }
  };

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  const isUserTyping = typingStatus[selectedUser?._id];

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader isTyping={isUserTyping} />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map((message) => {
          const isSender = message.senderId === authUser._id;
          return (
            <div
              key={message._id}
              className={`chat ${isSender ? "chat-end" : "chat-start"}`}
              ref={messageEndRef}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <LazyImage
                    src={isSender ? authUser.avatar : selectedUser.avatar}
                    alt="profile avatar"
                  />
                </div>
              </div>
        
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
        
              <div className="chat-bubble flex flex-col">
                {message.avatar && (
                  <LazyImage
                    src={message.avatar}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>
      <MessageInput onTyping={handleTyping}/>
    </div>
  );
}
