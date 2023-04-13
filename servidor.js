const express = require('express');
const cors = require('cors');
const { GPT, fetchAI } = require('@openai/api');

const app = express();
const port = 4000; // or any other port of your choice

// enable CORS for all domains
app.use(cors());

// initialize OpenAI API client
const openai = new GPT({
  apiKey: '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',
  engine: 'davinci',
  maxTokens: 50
});

// route for handling API requests
app.get('/api', async (req, res) => {
  const { prompt } = req.query;
  const completions = await openai.complete(prompt);
  const message = completions.choices[0].text;
  res.send(message);
});

// start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});