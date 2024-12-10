const fs = require("fs");
const path = require("path");

const matchesFilePath = path.join(__dirname, "../matches.json");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    // Check if file exists
    if (!fs.existsSync(matchesFilePath)) {
      fs.writeFileSync(matchesFilePath, JSON.stringify({ matches: [] }, null, 2));
    }

    // Read the current matches
    const jsonData = JSON.parse(fs.readFileSync(matchesFilePath, "utf8"));

    // Add new match to matches array
    jsonData.matches.push(body);

    // Write data back to JSON
    fs.writeFileSync(matchesFilePath, JSON.stringify(jsonData, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Match saved successfully!" }),
    };
  } catch (error) {
    console.error("Error saving match:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to save match." }),
    };
  }
};
