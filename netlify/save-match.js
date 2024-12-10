const fs = require("fs");
const path = require("path");

const matchesFilePath = path.join(__dirname, "../../matches.json");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const jsonData = JSON.parse(fs.readFileSync(matchesFilePath, "utf8"));
    jsonData.matches.push(body);

    fs.writeFileSync(matchesFilePath, JSON.stringify(jsonData, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Match successfully saved!" }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
