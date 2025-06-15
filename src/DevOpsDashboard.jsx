import React, { useEffect, useState } from "react";

export default function DevOpsDashboard() {
  const [runs, setRuns] = useState([]);
  const [deployments, setDeployments] = useState([]);

  useEffect(() => {
    // GitHub Actions fetch
    fetch("/api/github-builds")
      .then(res => res.json())
      .then(data => setRuns(data.latest || []))
      .catch(err => console.error("GitHub fetch error:", err));

    // fetchBuilds(); // Initial fetch

    // const interval = setInterval(fetchBuilds, 30000); // 30s interval

    // return () => clearInterval(interval); // Clean up on unmount

    // Vercel Deployments fetch
    fetch("/api/vercel-builds")
      .then(res => res.json())
      .then(data => setDeployments(data || []))
      .catch(err => console.error("Vercel fetch error:", err));
  }, []);

  return (
    <section className="px-6 py-12">
      <h2 className="text-3xl font-semibold mb-10 text-center">DevOps Dashboard</h2>

      {/* GitHub Actions */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-4 text-white">GitHub Actions</h3>
        <div className="grid gap-4">
          {runs.map(run => (
            <div key={run.id} className="p-4 border border-gray-700 bg-gray-900 rounded-lg">
              <p><strong>{run.name}</strong> — {run.status}/{run.conclusion}</p>
              <p className="text-sm text-gray-400">
                Triggered: {new Date(run.created_at).toLocaleString()}
              </p>
              <a
                href={run.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline"
              >
                View on GitHub →
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Vercel Deployments */}
      <div>
        <h3 className="text-2xl font-bold mb-4 text-white">Vercel Deployments</h3>
        <div className="grid gap-4">
          {deployments.map(deploy => (
            <div key={deploy.uid} className="p-4 border border-gray-700 bg-gray-900 rounded-lg">
              <p><strong>{deploy.meta?.githubCommitMessage || "No commit message"}</strong></p>
              <p className="text-sm text-gray-400">
                Branch: {deploy.meta?.githubCommitRef} — {new Date(deploy.createdAt).toLocaleString()}
              </p>
              <a
                href={`https://${deploy.url}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline"
              >
                View Deployment →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
