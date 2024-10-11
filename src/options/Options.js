import React, { useState, useEffect } from 'react';

const Options = () => {
  const [refreshInterval, setRefreshInterval] = useState(5);
  const [notificationSound, setNotificationSound] = useState(true);

  useEffect(() => {
    // Load saved options when component mounts
    chrome.storage.sync.get(['refreshInterval', 'notificationSound'], (result) => {
      if (result.refreshInterval) setRefreshInterval(result.refreshInterval);
      if (result.notificationSound !== undefined) setNotificationSound(result.notificationSound);
    });
  }, []);

  const saveOptions = () => {
    chrome.storage.sync.set(
      { refreshInterval, notificationSound },
      () => {
        // Update status to let user know options were saved.
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(() => {
          status.textContent = '';
        }, 750);
      }
    );
  };

  return (
    <div>
      <h1>Org Messages Options</h1>
      <div>
        <label>
          Refresh Interval (minutes):
          <input
            type="number"
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(Number(e.target.value))}
            min="1"
            max="60"
          />
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={notificationSound}
            onChange={(e) => setNotificationSound(e.target.checked)}
          />
          Enable notification sound
        </label>
      </div>
      <button onClick={saveOptions}>Save</button>
      <div id="status"></div>
    </div>
  );
};

export default Options;