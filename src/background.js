import { fetchMessages } from './services/api';
import { storeMessages, getUnreadCount } from './services/storage';

chrome.alarms.create('fetchMessages', { periodInMinutes: 5 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'fetchMessages') {
    checkForNewMessages();
  }
});

async function checkForNewMessages() {
  try {
    const result = await fetchMessages();
    const messages = result?.messages;
    if (Array.isArray(messages)) {
      await storeMessages(messages);
      updateBadge();
    } else {
      console.error('Fetched messages is not an array:', messages);
    }
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
}

export async function updateBadge() {
  try {
    const unreadCount = await getUnreadCount();
    chrome.action.setBadgeText({ text: unreadCount > 0 ? unreadCount.toString() : '' });
    chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
  } catch (error) {
    console.error('Error updating badge:', error);
  }
}

chrome.runtime.onInstalled.addListener(() => {
  checkForNewMessages();
});

// Listen for messages from popup to update badge
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateBadge') {
    updateBadge();
  }
  return true;
});