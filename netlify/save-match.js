const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const matchesFilePath = path.join(__dirname, '../../matches.json');

    // Load the current matches
    let matches = [];
    if (fs.existsSync(matchesFilePath)) {
      const data = fs.readFileSync(matchesFilePath);
      matches = JSON.parse(data);
    }

    // Append the new match data
    matches.push(body);

    // Save data back to the file
    fs.writeFileSync(matchesFilePath, JSON.stringify({ matches }, null, 2));

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
