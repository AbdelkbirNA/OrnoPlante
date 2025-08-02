const fetch = require("node-fetch");
const FormData = require("form-data");
const fs = require("fs");

const identifyPlant = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const form = new FormData();
    form.append("organs", "leaf"); // ou "flower", "fruit", selon image
    form.append("images", fs.createReadStream(req.file.path));

    const url = `https://my-api.plantnet.org/v2/identify/all?api-key=${process.env.PLANTNET_API_KEY}`;

    const response = await fetch(url, {
      method: "POST",
      body: form,
      headers: form.getHeaders(),
    });

    // Supprimer fichier temporaire après envoi
    fs.unlinkSync(req.file.path);

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("PlantNet API error:", error);
    res.status(500).json({ error: "Failed to identify plant" });
  }
};

module.exports = { identifyPlant };
