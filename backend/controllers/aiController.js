const { GoogleGenAI } = require("@google/genai");
const { questionAnswerPrompt, conceptExplainPrompt } = require("../utils/prompts");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });



const generateInterviewQuestions = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        });

        let rawText = response.text || response.candidates?.[0]?.content?.parts?.[0]?.text || "";

        const cleanedText = rawText
            .replace(/```json\s*/i, "") // Remove ```json or ```JSON
            .replace(/```$/, "")        // Remove trailing ```
            .trim();

        const data = JSON.parse(cleanedText);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: "Failed to generate questions",
            error: error.message,
        });
    }
};



const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = conceptExplainPrompt(question);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });



    // ✅ Extract raw text safely
    let rawText =
      response.text ||
      response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "";

    

    // ✅ Clean the response
    const cleanedText = rawText
      .replace(/```json\s*/i, "")
      .replace(/```$/, "")
      .trim();

   

    // ✅ Parse JSON safely
    let data = {};
    try {
      data = JSON.parse(cleanedText);
    } catch (parseErr) {

      return res.status(500).json({
        message: "Invalid JSON response from AI model",
        error: parseErr.message,
      });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("🔥 Server Error in generateConceptExplanation:", error.message);
    res.status(500).json({
      message: "Failed to generate explanation",
      error: error.message,
    });
  }
};



module.exports = { generateInterviewQuestions, generateConceptExplanation };