import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../store/userSlice";
import React from "react";

export default function ChatHeader({ isTyping }) {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((state) => state.user);
  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.avatar}
                alt={selectedUser.fullName}
                className="rounded-full"
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {isOnline ? "Online" : "Offline"}
            </p>
            {isTyping && (
              <span className="text-sm text-primary animate-pulse">
                typing...
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => dispatch(setSelectedUser(null))}
          aria-label="Close chat"
          className="hover:opacity-80 transition-opacity"
        >
          <X />
        </button>
      </div>
    </div>
  );
}
