// Mock API endpoint
export const fetchMessages = async () => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    // Mock data
    return {
      messages: [
        {
          id: "msg123",
          content: "Team meeting at 3 PM today 🙂",
          priority: "high",
          timestamp: "2024-09-30T15:00:00Z",
          read: false
        },
        {
          id: "msg124",
          content: "New project kickoff next week",
          priority: "medium",
          timestamp: "2024-10-01T10:00:00Z",
          read: false
        }
      ]
    };
  };