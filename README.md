# devj-portfolio

Personal portfolio website for Janaka Sangeeth (DevJ).
Bootstrapped by ZoneForty5 on 2026-06-27.

**Live URL:** https://devj.zoneforty5.tech
**GitHub:** https://github.com/janak-dev2002/devj-portfolio

## Layout

- `frontend/`        — React + TypeScript site (Frontend Agent)
- `devops/`          — GitHub Actions, AWS infra config (DevOps Agent)
- `shared/`          — Cross-agent coordination (tasks, architecture, handoffs, PRD)
- `.claude/`         — Claude Code agent identity files (frontend, devops)
- `.gemini/`         — Gemini CLI config (unused for this project)

## Agents

| Agent | Identity | Scope |
|---|---|---|
| Frontend | .claude/frontend-agent.md | frontend/ |
| DevOps | .claude/devops-agent.md | devops/ |

## Key Files

| File | Purpose |
|---|---|
| shared/PRD.md | Full product requirements |
| shared/architecture.md | System architecture and AWS resources |
| shared/tasks.md | Project task tracking |
| shared/change-log.md | Mid-project changes |
| shared/agent-handoffs/ | Agent completion handoffs |

## Status

Phase 1 (Frontend) — IN PROGRESS
Phase 2 (DevOps) — PENDING
