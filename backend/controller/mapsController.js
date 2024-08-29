export async function getAPIKey(req, res) {
  try {
    res.status(200).json({ APIKey: "AIzaSyAcp4rBpazZ3oH9sR_eucOsfjjcyl5JKLo" });
  } catch (err) {
    console.error("Error generating map:", err);
    res.status(500).json({ error: "Error" });
  }
}
