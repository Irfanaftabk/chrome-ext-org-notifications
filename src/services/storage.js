export const storeMessages = async (messages) => {
    if (!Array.isArray(messages)) {
      console.error('Attempted to store non-array messages:', messages);
      return;
    }
    await chrome.storage.local.set({ messages });
  };
  
  export const getMessages = async () => {
    const result = await chrome.storage.local.get('messages');
    return Array.isArray(result.messages) ? result.messages : [];
  };
  
  export const markMessageAsRead = async (messageId) => {
    const messages = await getMessages();
    const updatedMessages = messages.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    );
    await storeMessages(updatedMessages);
  };
  
  export const getUnreadCount = async () => {
    const messages = await getMessages();
    return messages.filter(msg => !msg.read).length;
  };