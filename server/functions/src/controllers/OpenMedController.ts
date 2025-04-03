// import { z, genkit } from "genkit";

// import { googleAI } from "@genkit-ai/googleai";

// import { gemini20Flash } from "@genkit-ai/googleai";

// import { logger } from "genkit/logging";

// import dotenv from "dotenv";

// dotenv.config();

// const {

// GoogleGenerativeAI,

// HarmCategory,

// HarmBlockThreshold,

// } = require("@google/generative-ai");

// require("dotenv").config();

// const apiKey = process.env.GEMINI_API_KEY;

// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({

// model: "gemini-2.0-flash",

// systemInstruction: `now you're a doctor and your name is Open med.

// based on this you only need to give user consultend.if they asked you something else tell them you're only able to help for medical related questions and just do the job a doctor consultend not go so far like an software engineer or teacher. if their symptomps seems dangerous state. you need to tell them you're in a dangerous situation and contact a local doctor at your location and you don't need to tell user you can't replace a doctor.

// your main goal is improve access to healthcare in underserved communities.Your solutions should align with UN SDG 3: Good Health and Well-being, which aims to ensure healthy lives and promote well-being for all at all ages.

// if user asked for his location doctors or medical information you should help them providing informations

// start with brief introduction`,

// });

// const generationConfig = {

// temperature: 0.5,

// topP: 0.95,

// topK: 40,

// maxOutputTokens: 8192,

// responseMimeType: "text/plain",

// };

// const { z, genkit, startFlowServer } = require("genkit");
// const { googleAI } = require("@genkit-ai/googleai");
// const { gemini15Flash } = require("@genkit-ai/googleai");
// const { logger } = require("genkit/logging");
// require("dotenv").config();
import { z, genkit } from "genkit";
//import { startFlowServer } from "@genkit-ai/express";
import { gemini20Flash, googleAI } from "@genkit-ai/googleai";
import dotenv from "dotenv";
dotenv.config();

const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY,
    }),
  ],
});

const menuSuggestionFlow = ai.defineFlow(
  {
    name: "menuSuggestionFlow",

    inputSchema: z.string(),

    outputSchema: z.string(),
  },

  async (subject) => {
    const llmResponse = await ai.generate({
      prompt: `now you're a doctor and your name is Open med.

based on this you only need to give user consultend.if they asked you something else tell them you're only able to help for medical related questions and just do the job a doctor consultend not go so far like an software engineer or teacher. if their symptomps seems dangerous state. you need to tell them you're in a dangerous situation and contact a local doctor at your location and you don't need to tell user you can't replace a doctor.

your main goal is improve access to healthcare in underserved communities.Your solutions should align with UN SDG 3: Good Health and Well-being, which aims to ensure healthy lives and promote well-being for all at all ages.

if user asked for his location doctors or medical information you should help them providing informations



User:${subject}

`,

      model: gemini20Flash,

      config: {
        temperature: 1,
      },
    });

    return llmResponse.text;
  }
);

// startFlowServer({
//   flows: [menuSuggestionFlow],
// });

export const OpenMed = async (req: any, res: any) => {
  try {
    const request = req.body.req;

    console.log(req.body.req);

    if (typeof request !== "string") {
      return res.status(400).json({ error: "Invalid request format." });
    }

    const response = await menuSuggestionFlow.run(request);

    console.log("Response:", response);

    res.json(response);
  } catch (error) {
    console.error("Error processing request:", error);

    res

      .status(500)

      .json({ error: "An error occurred while processing your request." });
  }
};
