import React, { useState, useEffect } from 'react';
import MessageList from '../components/MessageList';
import { getMessages, markMessageAsRead } from '../services/storage';

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const fetchedMessages = await getMessages();
      setMessages(fetchedMessages);
    } catch (err) {
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (messageId) => {
    await markMessageAsRead(messageId);
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    ));
    chrome.runtime.sendMessage({ action: 'updateBadge' });
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="App bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">Organization Messages</h1>
      <MessageList messages={messages} onMarkAsRead={handleMarkAsRead} />
    </div>
  );
}

export default App;