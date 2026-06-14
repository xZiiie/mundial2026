const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "API działa",
    endpoints: ["/api/worldcup-2026"]
  });
});

app.get("/api/worldcup-2026", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.football-data.org/v4/competitions/WC/matches",
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY
        }
      }
    );

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API działa na porcie ${PORT}`);
});
