import React, { useEffect, useState } from "react";

export default function DevOpsDashboard() {
  const [runs, setRuns] = useState([]);
  const [deployments, setDeployments] = useState([]);

  useEffect(() => {
    fetch("/api/github-builds")
      .then(res => res.json())
      .then(data => setRuns(data.latest || []))
      .catch(err => console.error("GitHub fetch error:", err));

    fetch("/api/vercel-builds")
      .then(res => res.json())
      .then(data => setDeployments(data || []))
      .catch(err => console.error("Vercel fetch error:", err));
  }, []);

  const latestRun = runs?.[0];
  const latestDeploy = deployments?.[0];

  return (
    <section className="px-6 py-12">
      <h2 className="text-3xl font-semibold mb-10 text-center">DevOps Dashboard</h2>

      {latestRun && (
        <div className="mb-12 bg-gray-900 border border-gray-700 rounded-xl p-5">
          <h3 className="text-xl font-bold mb-2 text-white">🔁 Latest GitHub Action</h3>
          <p className="mb-1 text-white">
            <strong>{latestRun.name}</strong> — {latestRun.status}/{latestRun.conclusion}
          </p>
          <p className="text-sm text-gray-400">
            Triggered: {new Date(latestRun.created_at).toLocaleString()}
          </p>
          <a
            href={latestRun.html_url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:underline"
          >
            View on GitHub →
          </a>
        </div>
      )}

      {latestDeploy && (
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
          <h3 className="text-xl font-bold mb-2 text-white">🚀 Latest Vercel Deployment</h3>
          <p className="mb-1 text-white">
            <strong>{latestDeploy.meta?.githubCommitMessage || "No commit message"}</strong>
          </p>
          <p className="text-sm text-gray-400">
            Branch: {latestDeploy.meta?.githubCommitRef} — {new Date(latestDeploy.createdAt).toLocaleString()}
          </p>
        </div>
      )}
    </section>
  );
}
