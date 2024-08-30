import messagesApi from '@shared/api/messages/messagesApi';
import {
  Button, Divider, Form, Input,
} from 'antd';
import React from 'react';
import { toast } from 'sonner';
import './_messageForm.scss';

export default function MessageForm(
  {
    setSent,
    receiverId,
    bookingId,
  }:
  {
    setSent: (value: boolean) => void,
    receiverId: number,
    bookingId: number | null | undefined,
  },
) {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const handleSuccess = () => {
    toast.success('Message sent successfully');
    setSent(true);
  };

  const sendDirectMessage = messagesApi.sendDirectMessage.useMutation({
    onSuccess: handleSuccess,
  });

  const sendMessage = messagesApi.sendMessage.useMutation({
    onSuccess: handleSuccess,
  });

  const handleSubmit = (values: {
    message: string,
  }) => {
    if (bookingId) {
      sendMessage.mutate({
        receiver_id: receiverId,
        message: values.message,
        booking_id: bookingId,
        type: 1,
      });
    } else {
      sendDirectMessage.mutate({
        receiver_id: receiverId,
        message: values.message,
      });
    }
  };

  return (
    <Form
      name="messageForm"
      className="messageForm"
      layout="vertical"
      form={form}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="message"
        rules={[{ required: true, message: 'Please enter a message' }]}
      >
        <TextArea
          placeholder="Write a note ..."
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
        <Divider />
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          className="messageBtn"
          loading={sendMessage.isLoading || sendDirectMessage.isLoading}
        >
          Send Message
        </Button>
      </Form.Item>
    </Form>
  );
}
