const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
require("dotenv").config();
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction:
    "You are OpenMed, a helpful medical consultant. Provide brief medical advice based on user symptoms. If symptoms are concerning, advise contacting a local doctor immediately. Do not perform tasks outside of medical consultation.",
});

const generationConfig = {
  temperature: 0.5,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const OpenMed = async (req, res) => {
  try {
    const request = req.body.req;
    console.log(req.body.req);
    if (typeof request !== "string") {
      return res.status(400).json({ error: "Invalid request format." });
    }

    const chatSession = model.startChat({
      generationConfig,
    });

    const response = await chatSession.sendMessage(request);
    const text = response.response.text();
    console.log("Response:", text);

    res.json(text);
  } catch (error) {
    console.error("Error processing request:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};

module.exports = { OpenMed };
