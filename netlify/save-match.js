const fs = require("fs");
const path = require("path");

// Path to the matches.json file
const filePath = path.join(__dirname, "../matches.json");

module.exports.handler = async (event) => {
  try {
    // Parse the body data from the POST request
    const body = JSON.parse(event.body);

    // Validate if `matches` exist
    if (!body.matches || !Array.isArray(body.matches)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid payload" }),
      };
    }

    // Save the matches into the JSON file
    fs.writeFileSync(filePath, JSON.stringify(body.matches, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Match saved successfully" }),
    };
  } catch (error) {
    console.error("Error saving match:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error saving match" }),
    };
  }
};
