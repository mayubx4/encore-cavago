// utils.ts
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import moment from 'moment';
import messagesApi from '@shared/api/messages/messagesApi';
import { MARK_AS_READ } from '@shared/api/messages/constants';
import { IndividualMessageType, BookingDetailsSchemaType, FacilityDetailsType } from '@shared/api/messages/schemas';

export default function useMessages(receiverId: string | null, bookingId: string | null) {
  const messagesRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [allMessages, setAllMessages] = useState<IndividualMessageType[]>([]);
  const [unReadIds, setUnReadIds] = useState<number[]>([]);
  const [messageContent, setMessageContent] = useState('');
  const [bookingDetails, setBookingDetails] = useState<BookingDetailsSchemaType | null>(null);
  const [facilityDetails, setFacilityDetails] = useState<FacilityDetailsType | null>(null);

  const {
    data: messagesData, fetchNextPage, hasNextPage,
  } = messagesApi.getInfiniteMessages.useInfiniteQuery({
    receiver_id: Number(receiverId),
    booking_id: Number(bookingId),
  });

  const handleSuccess = () => {
    toast.info('Message sent successfully');
    messagesApi.getInfiniteMessages.invalidate();
    setMessageContent('');
  };

  const sendMessageMutation = messagesApi.sendMessage.useMutation({
    onSuccess: handleSuccess,
  });

  const sendDirectMessageMutation = messagesApi.sendDirectMessage.useMutation({
    onSuccess: handleSuccess,
  });

  const markAsReadMutation = messagesApi.markRead.useMutation({
    onSuccess: () => setUnReadIds([]),
  });

  const handleSendMessage = useCallback(() => {
    const trimmedMessage = messageContent.trim();
    if (trimmedMessage) {
      const mutation = bookingId ? sendMessageMutation : sendDirectMessageMutation;
      mutation.mutate({
        receiver_id: Number(receiverId),
        message: trimmedMessage,
        ...(bookingId && { booking_id: Number(bookingId), type: 1 }),
      });
      setMessageContent('');
    }
  }, [messageContent, bookingId, receiverId, sendMessageMutation, sendDirectMessageMutation]);

  useEffect(() => {
    if (messagesRef.current) {
      const { scrollHeight, clientHeight } = messagesRef.current;
      messagesRef.current.scrollTo({ top: scrollHeight - clientHeight, behavior: 'smooth' });
      setIsScrollable(scrollHeight > clientHeight);
    }
  }, [allMessages]);

  useEffect(() => {
    if (messagesData && messagesData.length !== allMessages.length) {
      setAllMessages(messagesData);
    }
  }, [messagesData]);

  useEffect(() => {
    if (allMessages.length > 0) {
      const firstMessage = allMessages[0];
      setBookingDetails(firstMessage.booking_details || null);
      setFacilityDetails(
        firstMessage.sender.id === Number(receiverId) ? firstMessage.sender.facility_details : firstMessage.receiver.facility_details
      );
    }
  }, [allMessages, receiverId]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (unReadIds.length > 0) {
        markAsReadMutation.mutate({ message_ids: unReadIds });
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [unReadIds, markAsReadMutation]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const unReads: number[] = [];
      const updatedMessages = allMessages.map((message) => {
        if (!message.is_read && message.receiver_id === Number(receiverId)) {
          unReads.push(message.id);

          return { ...message, is_read: MARK_AS_READ };
        }

        return message;
      });

      setAllMessages(updatedMessages);
      setUnReadIds(unReads);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [allMessages, receiverId]);

  const messagesByDate = useMemo(() => allMessages.reduce((acc, message) => {
    const date = moment(message.created_at).format('YYYY-MM-DD');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(message);

    return acc;
  }, {} as Record<string, IndividualMessageType[]>), [allMessages]);

  const sortedKeys = useMemo(() => Object.keys(messagesByDate).sort((dateA, dateB) => moment(dateB).diff(moment(dateA))), [messagesByDate]);

  return {
    messagesRef,
    isScrollable,
    allMessages,
    unReadIds,
    messageContent,
    bookingDetails,
    facilityDetails,
    fetchNextPage,
    hasNextPage,
    handleSendMessage,
    setMessageContent,
    sortedKeys,
    messagesByDate,
  };
}
