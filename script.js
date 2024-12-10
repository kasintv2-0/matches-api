const matchesFile = "matches.json"; // Path to the JSON file

// Load Matches
async function loadMatches() {
  try {
    const response = await fetch(matchesFile);
    const data = await response.json();
    document.getElementById("matches-preview").textContent = JSON.stringify(data.matches, null, 2);
  } catch (error) {
    console.error("Failed to load matches:", error);
    document.getElementById("matches-preview").textContent = "Error loading matches.";
  }
}

// Save Matches
async function saveMatches(updatedData) {
  try {
    const response = await fetch(matchesFile, {
      method: "PUT", // Ensure GitHub Pages doesn't block this operation
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (response.ok) {
      loadMatches();
    } else {
      alert("Failed to save matches!");
    }
  } catch (error) {
    console.error("Error saving matches:", error);
  }
}

// Add Match
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

  const response = await fetch(matchesFile);
  const data = await response.json();
  const matches = data.matches;
  matches.push(match);
  saveMatches({ matches });
});

// Remove Match
document.getElementById("remove-match-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const removeId = document.getElementById("remove-id").value;

  const response = await fetch(matchesFile);
  const data = await response.json();
  let matches = data.matches;
  matches = matches.filter((match) => match.id !== removeId);
  saveMatches({ matches });
});

// Initialize
loadMatches();
