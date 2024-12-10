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

// Save Matches
async function saveMatch(match) {
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
    console.error("Error calling save-match endpoint:", error);
  }
}

// Remove Match
async function removeMatch(id) {
  try {
    const response = await fetch(`${baseURL}/remove-match`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.message);
      loadMatches();
    } else {
      alert("Failed to remove match.");
    }
  } catch (error) {
    console.error("Error calling remove-match endpoint:", error);
  }
}
