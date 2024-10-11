import React from 'react';
import Message from './Message';

const MessageList = ({ messages, onMarkAsRead }) => {
  if (!messages || messages.length === 0) {
    return <p className="text-center text-gray-500">No messages to display.</p>;
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          onMarkAsRead={onMarkAsRead}
        />
      ))}
    </div>
  );
};

export default MessageList;