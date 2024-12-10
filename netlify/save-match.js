const fs = require("fs");
const path = require("path");

// Path to the matches.json file
const matchesFilePath = path.join(__dirname, "../../matches.json");

exports.handler = async (event, context) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ message: "Method not allowed" }),
      };
    }

    // Parse incoming JSON
    const matchData = JSON.parse(event.body);

    // Load the current data from the JSON file
    let currentData = { matches: [] };
    if (fs.existsSync(matchesFilePath)) {
      const jsonData = fs.readFileSync(matchesFilePath);
      currentData = JSON.parse(jsonData);
    }

    // Add the new match to the data
    currentData.matches.push(matchData);

    // Write updated data back to the file
    fs.writeFileSync(matchesFilePath, JSON.stringify(currentData, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Match saved successfully!" }),
    };
  } catch (error) {
    console.error("Error saving match:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
