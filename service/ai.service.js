// // require('dotenv').config();
// // const { GoogleGenAI } = require("@google/genai");

// // const ai = new GoogleGenAI(
// //     process.env.GEMINI_API_KEY
// // );

// // async function generateResponse(prompt){
// //     const response = await ai.models.generateContent({
// //         model: "gemini-2.0-flash",
// //         contents : prompt
// //     });
// //     return response.text;
// // }

// // module.exports = generateResponse ;

// require("dotenv").config();
// const { GoogleGenAI } = require("@google/genai");

// const ai = new GoogleGenAI({
//     apiKey: "AIzaSyBXEbhs0Jr-6U6MmyY77axnnhyjBLTPVvw"
// });

// async function generateResponse(prompt) {
//   try {
//     const response = await ai.models.generateContent({
//       model: "gemini-2.0-flash",
//       contents: [
//         {
//           role: "user",
//           parts: [{ text: prompt }]
//         }
//       ]
//     });

//     return response.text;

//   } catch (error) {
//     console.error("Gemini API Error:", error.message);

//     // VERY IMPORTANT: prevent server crash
//     return "⚠️ AI service is currently unavailable. Please try again later.";
//   }
// }

// module.exports = generateResponse;


require("dotenv").config();
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateResponse(prompt) {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // fast & cheap
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI Error:", error.message);
    return "⚠️ AI service is currently unavailable.";
  }
}

module.exports = generateResponse;
