import { useCallback, useEffect, useRef } from 'react';
import { socketClient } from '../utils/socket';
import { useGetTypingStatusQuery } from '../store/api/typingApiSlice';

const TYPING_TIMER_LENGTH = 3000; // 3 seconds

export const useTyping = (conversationId, userId) => {
  const { data: typingUsers = [] } = useGetTypingStatusQuery();
  const typingTimerRef = useRef(null);
  const isTypingRef = useRef(false);

  // Connect socket when hook is first used
  useEffect(() => {
    if (userId) {
      socketClient.connect(userId);
    }
  }, [userId]);

  const emitTyping = useCallback(
    (isTyping) => {
      socketClient.emit('typing', {
        conversationId,
        userId,
        isTyping,
      });
      isTypingRef.current = isTyping;
    },
    [conversationId, userId]
  );

  const onTyping = useCallback(() => {
    if (!isTypingRef.current) {
      emitTyping(true);
    }

    // Clear existing timer
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }

    // Set new timer
    typingTimerRef.current = setTimeout(() => {
      if (isTypingRef.current) {
        emitTyping(false);
      }
    }, TYPING_TIMER_LENGTH);
  }, [emitTyping]);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
      if (isTypingRef.current) {
        emitTyping(false);
      }
    };
  }, [emitTyping]);

  const isUserTyping = useCallback(
    (targetUserId) => {
      return typingUsers.some(
        (status) =>
          status.conversationId === conversationId &&
          status.userId === targetUserId &&
          status.isTyping
      );
    },
    [conversationId, typingUsers]
  );

  return {
    onTyping,
    isUserTyping,
  };
};
