const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  try {
    const { id } = JSON.parse(event.body);
    const matchesFilePath = path.join(__dirname, '../../matches.json');

    // Load the current matches
    let matches = [];
    if (fs.existsSync(matchesFilePath)) {
      const data = fs.readFileSync(matchesFilePath);
      matches = JSON.parse(data).matches;
    }

    // Filter out the match to delete
    const updatedMatches = matches.filter((match) => match.id !== id);

    // Save the filtered matches back to the file
    fs.writeFileSync(matchesFilePath, JSON.stringify({ matches: updatedMatches }, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Match removed successfully." }),
    };
  } catch (error) {
    console.error("Error removing match:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to remove match." }),
    };
  }
};
