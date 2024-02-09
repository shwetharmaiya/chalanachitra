chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "popup") {
    // Listen for messages from the popup script
    port.onMessage.addListener((message) => {
      if (message.message === "findActors") {
        // Handle the message data (e.g., process data, fetch API results)
        
        const movieTitle = message.title; 
        if (!movieTitle || movieTitle.trim() === "") {
          console.error("Invalid movie title received");
          port.postMessage({ message: "error", data: "Please enter a valid movie title" });
          return;
        }

        fetchActors(movieTitle)
          .then((actors) => {
            port.postMessage({ message: "actorsFound", data: actors });
          })
          .catch((error) => {
            console.error("Error fetching actors:", error);
            port.postMessage({ message: "error", data: "Failed to fetch actors" });
          });
    }});
  }
});

async function fetchActors(movieTitle) {
  // Replace with your actual API call logic and error handling
  // Return an array of actor names in case of success, or throw an error otherwise
  const apiUrl = `http://www.omdbapi.com/?apikey=YOUR_API_KEY&t=${movieTitle}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json(); // Replace with the appropriate data format
    return data; // Extract the required data
  } catch (error) {
    throw error;
  }
}