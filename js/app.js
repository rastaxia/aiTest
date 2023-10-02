const express = require("express");
const OpenAI = require("openai");
const bodyParser = require("body-parser");
const path = require("path");

// Set the OpenAI API key as an environment variable
process.env.OPENAI_API_KEY = process.env.apiKey;

const openai = new OpenAI();

const app = express();
const port = process.env.PORT || 3000;

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML file
app.use(express.static(path.join(__dirname, "../")));

// Handle form submission
app.post("/generate-fairy-tale", async (req, res) => {
  const { name, onderwerp, stijl } = req.body;

  // Generate a fairy tale using GPT-3.5 Turbo
  const prompt = `Vertel me een fantasie verhaal waar de hoofdpersoon ${name} heet, het verhaal heeft het onderwerp is ${onderwerp} en de stijl is ${stijl}, geef het html formaat. geef het verhaal geen kopjes`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-4",
      temperature: 0,
    });

    const story = completion.choices[0].message.content;
    res.send(story);
  } catch (error) {
    console.error("Error generating fairy tale:", error);
    res.status(500).send("Error generating fairy tale");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
