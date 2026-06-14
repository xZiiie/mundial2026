const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_FOOTBALL_KEY;
const API_BASE = "https://v3.football.api-sports.io";

app.use(cors());

app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "API działa",
    endpoints: ["/api/live", "/api/worldcup-2026"]
  });
});

async function apiFootball(path) {
  if (!API_KEY) {
    throw new Error("Brak API_FOOTBALL_KEY w Render Environment Variables");
  }

  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "x-apisports-key": API_KEY
    }
  });

  const data = await response.json();
  return { ok: response.ok, status: response.status, data };
}

app.get("/api/live", async (req, res) => {
  try {
    const result = await apiFootball("/fixtures?live=all");
    res.status(result.ok ? 200 : result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/worldcup-2026", async (req, res) => {
  try {
    const result = await apiFootball("/fixtures?league=1&season=2026");
    res.status(result.ok ? 200 : result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`API działa na porcie ${PORT}`);
});
