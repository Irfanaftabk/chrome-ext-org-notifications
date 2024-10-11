import React from 'react';

const Message = ({ message, onMarkAsRead }) => {
  const { id, content, priority, timestamp, read } = message;

  const handleMarkAsRead = () => {
    if (!read) {
      onMarkAsRead(id);
    }
  };

  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };

  return (
    <div className="rounded-lg w-96 overflow-hidden shadow-lg bg-white mb-4 pb-4">
      <div className="p-6">
        <p className="text-lg font-semibold mb-4">{content}</p>
        <div className="space-y-2">
          <div className="flex items-center">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityColors[priority.toLowerCase()]}`}>
              {priority.toUpperCase()} PRIORITY
            </span>
          </div>
          <div className="flex items-center">
            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold">
              {new Date(timestamp).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      {!read && (
        <div className="px-6 py-3">
          <button
            onClick={handleMarkAsRead}
            className="float-right bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Mark as Read
          </button>
        </div>
      )}
    </div>
  );
};

export default Message;