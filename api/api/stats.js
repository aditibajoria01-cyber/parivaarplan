// ParivaarPlan read-back: how many Yes Checks have run, and what share came back Yes or Yes, if.
// Reads Supabase on the server, so the service key never reaches the browser.
const { readStats } = require("./yes-check.js");

module.exports = async function handler(req, res) {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    return res.status(500).json({ error: "Server is missing Supabase settings." });
  }
  try {
    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");
    return res.status(200).json(await readStats());
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Could not read stats." });
  }
};
