async function saveMatchesToServer(updatedData) {
  try {
    const response = await fetch("/.netlify/functions/save-match", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Match saved successfully.");
      loadMatches(); // Reload the matches preview after saving
    } else {
      alert("Failed to save match.");
      console.error("Error response from server:", result);
    }
  } catch (error) {
    console.error("Error saving match:", error);
    alert("Error saving match.");
  }
}

// Handle the add-match form submission
document.getElementById("add-match-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const match = {
    id: document.getElementById("match-id").value,
    homeTeam: {
      name: document.getElementById("home-team").value,
      logo: document.getElementById("home-logo").value,
    },
    awayTeam: {
      name: document.getElementById("away-team").value,
      logo: document.getElementById("away-logo").value,
    },
    league: document.getElementById("league").value,
    sport: document.getElementById("sport").value,
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
    venue: document.getElementById("venue").value,
    startTime: document.getElementById("start-time").value,
    endTime: document.getElementById("end-time").value,
    streams: JSON.parse(document.getElementById("streams").value),
  };

  saveMatchesToServer({ matches: [match] });
});
