export default async function handler(req, res) {
  const repo = "Eselin1/ian-portfolio";
  const token = process.env.GITHUB_PAT;

  const response = await fetch(`https://api.github.com/repos/${repo}/actions/runs`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
  });

  const data = await response.json();

  const latest = data.workflow_runs?.slice(0, 5).map(run => ({
    id: run.id,
    status: run.status,
    conclusion: run.conclusion,
    created_at: run.created_at,
    updated_at: run.updated_at,
    html_url: run.html_url,
    name: run.name,
    event: run.event,
  }));

  res.status(200).json({ latest });
}
