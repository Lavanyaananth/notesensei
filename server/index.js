import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
console.log("🔥 SERVER STARTED FILE LOADED");

const app = express();
app.use(cors());
app.use(express.json());
app.get("/test", (req, res) => {
  console.log("✅ TEST HIT");
  res.send("working");
});
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log("API KEY:", process.env.GEMINI_API_KEY);
app.post("/summarize", async (req, res) => {
  console.log("🔥 HIT BACKEND");
  console.log("BODY:", req.body);
  try {
    const { prompt } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.status(200).json({
      summary: text,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gemini failed" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
