# GitHub Copilot CLI — Zero to Hero (Live Demo Lab)

A room-ready lab and delivery workbook for a two-hour live session on the **GitHub Copilot CLI**, built around a small **Task Manager REST API** (Node.js + Express + Zod + Jest).

By **[@ovaismehboob](https://github.com/ovaismehboob)**.

> Based on the public lab **Copilot CLI: Zero to Hero** — https://copilot-academy.github.io/labs/copilot-cli-zero-to-hero

---

## 📖 The full lab

The complete presenter workbook — with timings, expected on-screen output, talking points, common failures, and fallbacks for every block — lives here:

**➡️ [GHCP-CLI-Demo-Workbook-v2-CONTENT.md](./GHCP-CLI-Demo-Workbook-v2-CONTENT.md)** &nbsp;·&nbsp; [HTML version](./GHCP-CLI-Demo-Workbook-v2-CONTENT.html)

You can read it two ways:
- **Presenters** rehearse the seven demo blocks end to end and keep it open on a second screen during delivery.
- **Attendees** use it afterwards as a self-paced lab, following the objective, steps, expected result, and checkpoint of each block.

## 🗂️ What the session covers

| Block | Capability |
|-------|------------|
| 1 | Install, launch, and tour the tool |
| 2 | Understand a codebase you did not write |
| 3 | Make one change with **plan mode** |
| 4 | Break a route, then find the bug from a one-line symptom |
| 5 | Headless automation with `copilot -p` |
| 6 | Extend & delegate — skills, custom agents, hooks, MCP |
| 7 | Answer through a model hosted in Azure |

> The code on screen is JavaScript, but the language is incidental — every command works unchanged against a Java, Python, or C# repository.

## 🧩 The demo project — `task-manager-api`

A pre-cloned starter used throughout the session. Block 2 reads it, Block 3 makes a small change, and Block 4 breaks and fixes a single route.

- **Express** for routing, **Zod** for validation, **Jest** for tests
- In-memory data store (no database)
- Full CRUD at `/tasks` and `/tasks/:id`
- Task `status`: `todo` (default), `in-progress`, `done`

### Quick start

```bash
cd task-manager-api
npm install       # restore dependencies (node_modules is not committed)
npm test          # run the Jest suite
npm run dev       # start on http://localhost:3000 with reload
```

### Try it

```bash
curl http://localhost:3000/tasks
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Write the README","status":"in-progress"}'
```

## 📁 Repository layout

```
.
├── GHCP-CLI-Demo-Workbook-v2-CONTENT.md   # Full presenter workbook (the lab)
├── GHCP-CLI-Demo-Workbook-v2-CONTENT.html # Same content, HTML
└── task-manager-api/                      # Demo project used in the blocks
    ├── src/                               # index, routes, middleware, models, validation
    ├── tests/                             # Jest tests
    ├── package.json
    └── eslint.config.js
```

## 📝 Requirements

- **Node.js 22+** and npm
- **GitHub Copilot CLI** (`npm install -g @github/copilot`, then run `copilot`) — see Block 1 of the workbook for platform-specific install steps and prerequisites

## License

MIT — see [`task-manager-api/package.json`](./task-manager-api/package.json).
