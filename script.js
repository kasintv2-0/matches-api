const baseURL = "/.netlify/functions";

// Load Matches
async function loadMatches() {
  try {
    const response = await fetch("/matches.json");
    const data = await response.json();
    document.getElementById("matches-preview").textContent = JSON.stringify(data.matches, null, 2);
  } catch (error) {
    console.error("Failed to load matches:", error);
  }
}

// Handle Submit - Add Match
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

  try {
    const response = await fetch(`${baseURL}/save-match`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(match),
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.message);
      loadMatches();
    } else {
      alert("Failed to save match.");
    }
  } catch (error) {
    console.error("Error saving match:", error);
  }
});

// Load matches when the page loads
loadMatches();
