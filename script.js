const matchesFile = "matches.json";

// Load existing matches and display them
async function loadMatches() {
  const response = await fetch(matchesFile);
  const matches = await response.json();
  document.getElementById("matches-preview").textContent = JSON.stringify(matches, null, 2);
}

// Add a new match
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
  const matches = await response.json();
  matches.push(match);
  saveMatches(matches);
});

// Remove a match
document.getElementById("remove-match-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const removeId = document.getElementById("remove-id").value;

  const response = await fetch(matchesFile);
  let matches = await response.json();
  matches = matches.filter((match) => match.id !== removeId);
  saveMatches(matches);
});

// Save updated matches to the JSON file
async function saveMatches(updatedMatches) {
  const response = await fetch(matchesFile, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedMatches),
  });
  if (response.ok) {
    loadMatches();
  } else {
    alert("Failed to save matches!");
  }
}

// Initial load
loadMatches();
