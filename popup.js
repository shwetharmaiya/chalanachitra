// HTML elements
const searchButton = document.getElementById("searchButton");
const movieTitleInput = document.getElementById("movie-search");
const actorList = document.getElementById("actorList");

// Background script communication
const backgroundPort = chrome.runtime.connect({ name: "popup" });

// Send search request on button click
searchButton.addEventListener("click", () => {
  const movieTitle = movieTitleInput.value.trim(); // Trim whitespace
  if (!movieTitle) {
    alert("Please enter a movie title");
    return;
  }

  // Clear previous results
  actorList.textContent = ""; // Clear existing actors

  // Send message to background script with movie title
  backgroundPort.postMessage({ message: "findActors", title: movieTitle });
  // Listen for response from background script
  backgroundPort.onMessage.addListener((response) => {
    if (response.message === "actorsFound") {
      const actors = response.data.Actors;
      const lang = response.data.Language;
     if ( !actors || !lang  ){ 
      alert("No movie found")
      return;
     } else { 
      // Display actors in list
      const listItem = document.createElement("li");
      listItem.textContent = actors;
      actorList.appendChild(listItem);

      if (lang == "Kannada") { 
        const lstItem = document.createElement("li");
        lstItem.textContent = lang;
        actorList.appendChild(lstItem);
  
        }
      }
    } else if (response.message === "error") {
      alert(response.error);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {});
