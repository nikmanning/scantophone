import { NextResponse } from "next/server"

export async function GET() {
  const sha = process.env.VERCEL_GIT_COMMIT_SHA || process.env.GIT_COMMIT_SHA || null
  const ref = process.env.VERCEL_GIT_COMMIT_REF || null
  const repo = process.env.VERCEL_GIT_REPO_SLUG || null
  const deployedAt = new Date().toISOString()
  const environment = process.env.VERCEL_ENV || (process.env.NODE_ENV === "production" ? "production" : process.env.NODE_ENV || "unknown")

  return NextResponse.json({ sha, shortSha: sha ? sha.substring(0, 7) : null, ref, repo, deployedAt, environment })
}
