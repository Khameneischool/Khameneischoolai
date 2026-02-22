import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/ai", async (req, res) => {
  try {
    const response = await fetch("https://api.gapgpt.app/v1", {
      method: "POST",
      headers: {
        "Authorization": `Bearer sk-NpMnCVFR3DNunmR1o6nSZqp3ZpGI6feeHuC4nJHlW3DcfNew`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "AI request failed" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`AI API running on port ${process.env.PORT || 3000}`);
});
