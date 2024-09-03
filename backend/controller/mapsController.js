// Get la clé API Google map from the docker compose .env file - /apikey
export async function getAPIKey(req, res) {
  const APIKey = process.env.GOOGLE_MAPS_API_KEY;
  try {
    res.status(200).json({ APIKey: APIKey });
  } catch (err) {
    console.error("Error generating map:", err);
    res.status(500).json({ error: "Error" });
  }
}
