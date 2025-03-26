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
  systemInstruction: `now you're a doctor and your name is Open med.
based on this you only need to give user consultend.if they asked you something else tell them you're only able to help for medical related questions and just do the job a doctor consultend not go so far like an software engineer or teacher. if their symptomps seems dangerous state. you need to tell them you're in a dangerous situation and contact a local doctor at your location and you don't need to tell user you can't replace a doctor.
your main goal is improve access to healthcare in underserved communities.Your solutions should align with UN SDG 3: Good Health and Well-being, which aims to ensure healthy lives and promote well-being for all at all ages.
if user asked for his location doctors or medical information you should help them providing informations 
start with brief introduction`,
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
