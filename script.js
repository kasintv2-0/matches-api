let matches = JSON.parse(localStorage.getItem('matches')) || { matches: [] };

// Load Matches
function loadMatches() {
  try {
    const previewElement = document.getElementById("matches-preview");
    if (matches.matches.length > 0) {
      previewElement.textContent = JSON.stringify(matches.matches, null, 2);
    } else {
      previewElement.textContent = "No matches available.";
    }
  } catch (error) {
    console.error("Failed to load matches:", error);
    document.getElementById("matches-preview").textContent = "Error loading matches.";
  }
}

// Save Matches to LocalStorage
function saveMatches() {
  try {
    localStorage.setItem('matches', JSON.stringify(matches));
    alert("Matches saved successfully!");
    loadMatches();
  } catch (error) {
    console.error("Failed to save matches:", error);
    alert("Failed to save matches!");
  }
}

// Add Match
document.getElementById("add-match-form").addEventListener("submit", (e) => {
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
    streams: JSON.parse(document.getElementById("streams").value) || [],
  };

  matches.matches.push(match);
  saveMatches();
});

// Remove Match
document.getElementById("remove-match-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const removeId = document.getElementById("remove-id").value;
  matches.matches = matches.matches.filter((match) => match.id !== removeId);
  saveMatches();
});

// Initialize
loadMatches();
