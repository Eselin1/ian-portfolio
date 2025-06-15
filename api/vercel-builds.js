export default async function handler(req, res) {
  const { VERCEL_TOKEN, VERCEL_PROJECT, VERCEL_TEAM } = process.env;

  const teamParam = VERCEL_TEAM ? `&teamId=${VERCEL_TEAM}` : "";

  const response = await fetch(
    `https://api.vercel.com/v6/deployments?projectId=${VERCEL_PROJECT}&limit=5${teamParam}`,
    {
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    return res.status(response.status).json({ error: "Failed to fetch deployments" });
  }

  const data = await response.json();
  res.status(200).json(data.deployments);
}
