const fs = require("fs");
const path = require("path");

const matchesFilePath = path.join(__dirname, "../../matches.json");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    // Read current matches
    const jsonData = JSON.parse(fs.readFileSync(matchesFilePath, "utf8"));
    
    // Push the new match
    jsonData.matches.push(body);

    // Save it back to the file
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
