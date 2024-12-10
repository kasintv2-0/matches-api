const fs = require("fs");
const path = require("path");

const matchesFilePath = path.join(__dirname, "../../matches.json");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    // Read the existing JSON file
    const jsonData = JSON.parse(fs.readFileSync(matchesFilePath, "utf8"));

    // Push the new match data
    jsonData.matches.push(body);

    // Save back the data to the file
    fs.writeFileSync(matchesFilePath, JSON.stringify(jsonData, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Match successfully saved!" }),
    };
  } catch (error) {
    console.error("Error saving match data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to save match." }),
    };
  }
};
