export default async function handler(req, res) {
  const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
  const VERCEL_PROJECT = process.env.VERCEL_PROJECT;
  const VERCEL_TEAM = process.env.VERCEL_TEAM || null;

  if (!VERCEL_TOKEN || !VERCEL_PROJECT) {
    return res.status(500).json({ error: "Missing Vercel credentials" });
  }

  const queryParams = new URLSearchParams({
    projectId: VERCEL_PROJECT,
    ...(VERCEL_TEAM && { teamId: VERCEL_TEAM }),
    limit: 5,
  });

  const response = await fetch(`https://api.vercel.com/v6/deployments?${queryParams}`, {
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
    },
  });

  if (!response.ok) {
    return res.status(response.status).json({ error: "Failed to fetch deployments" });
  }

  const data = await response.json();

  const deployments = data.deployments.map((d) => ({
    url: d.url,
    state: d.state,
    meta: d.meta,
    createdAt: d.createdAt,
    creator: d.creator,
    name: d.name,
    target: d.target,
    commitMessage: d.meta?.githubCommitMessage || "No commit message",
    commitSha: d.meta?.githubCommitSha || "N/A",
  }));

  return res.status(200).json({ deployments });
}
