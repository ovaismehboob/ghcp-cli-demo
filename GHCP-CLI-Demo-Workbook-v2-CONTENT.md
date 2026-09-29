# GitHub Copilot CLI — Live Demo Workbook

*Companion exercises for a two-hour session*

Presented by Ovais Mehboob Ahmed Khan, Sr Cloud Solution Architect, Microsoft

Source lab: Copilot CLI: Zero to Hero — https://copilot-academy.github.io/labs/copilot-cli-zero-to-hero

## How to use this workbook

This workbook is the delivery script for a two-hour live session on GitHub Copilot CLI. It expands the public lab into a room-ready format: every capability block carries the commands plus the material a presenter needs and the lab does not provide — a minute budget, the output to expect on screen, the sentences worth saying while the model is thinking, the failures that actually happen in front of an audience, and a fallback for when the network or the model does not cooperate.

Read it in two passes. The presenter reads the whole thing in advance, rehearses the seven demo blocks once end to end, and keeps the workbook open on a second screen during delivery; the talking points and timing columns are written for that screen. Attendees can use the same document afterwards as a self-paced lab, following only the objective, the steps, the expected result and the checkpoint of each block.

### The demo project

Everything runnable in the session is built on one artefact: a Task Manager REST API in Node.js, with Express for routing, Zod for validation and Jest for tests. It is a pre-cloned starter repository — it already exists on the trainer's machine before the session starts, and it is never scaffolded live. Block 2 reads it without changing it, Block 3 makes one small change, and Block 4 breaks and fixes a single route. Almost no JavaScript is ever read aloud.

### Prepare the Task Manager API before the session

The starter repository is not included with this workbook, and the source lab does not provide a repository to clone. Create it once before the session by following the source lab's scaffolding exercise. Do not run these setup steps during Block 2.

From PowerShell, create and enter the project folder, initialise Git, and launch Copilot CLI:

```powershell
New-Item -ItemType Directory task-manager-api
Set-Location task-manager-api
git init
copilot
```

Inside Copilot CLI, press `Shift+Tab` until the status line shows **plan** mode, then enter:

```text
Create a Node.js REST API project for a task manager. Use Express.js and Zod for validation. Set up the project with:
- package.json with scripts for start, dev, test, and lint
- src/index.js as the entry point on port 3000
- src/routes/tasks.js with full CRUD routes (GET /, GET /:id, POST /, PUT /:id, DELETE /:id)
- Mount the task router at /tasks, so the public endpoints are /tasks and /tasks/:id
- src/middleware/errorHandler.js for centralized error handling
- src/models/taskStore.js as the in-memory data store, including the findIndex and splice delete operation
- An in-memory array as the data store (no database needed)
- Jest configured for testing
- A .gitignore for Node.js
- Input validation on the POST and PUT routes using Zod schemas
- A task status field with allowed values "todo", "in-progress", and "done", defaulting to "todo"
```

Review the proposed plan, select **Accept plan and build on autopilot**, and let Copilot create the files and install the dependencies. Verify the result before the session:

```text
!npm test
!git status
```

Commit the generated baseline so later blocks can show clean diffs:

```text
!git add -A
!git commit -m "chore: prepare task manager API starter"
```

Block 2 must be launched from inside this `task-manager-api` folder. At minimum, confirm that `package.json`, `src/index.js`, `src/routes/tasks.js`, and `src/middleware/errorHandler.js` exist. For the documented fallback path, keep a second copy at `../task-manager-api-complete`.

### Handling a mixed-language room

Many people in the room will not write JavaScript, and they do not need to. Say this out loud at the start: the language is incidental. The same commands — ask the codebase to explain itself, scope a prompt to a file, plan a change, review a diff, pipe a diff to a commit message — work unchanged against a Java, Python or C# repository. Never ask the room to follow the code itself; ask them to follow the capability. Block 2 is built entirely on this idea, and it is the block to lean on for the non-JavaScript half of the audience.

> *Tip — Type the prompts live rather than pasting them. Watching a prompt being composed teaches the audience how to write one; a pasted wall of text teaches nothing and reads as a rehearsed trick.*

> *Watch out — The CLI ships changes almost daily. Re-run the whole workbook the morning of the session, and check /changelog before you start; a flag or slash command may have moved since this document was written.*

## Rehearsal guide — running this for the first time

You are delivering this for the first time, so rehearse it like a first time. Run the full fifty-nine minutes of demo once, end to end, at least two days before the session — not the individual blocks in isolation, but the whole sequence, in order, out loud. Then run it again the morning of the session: the CLI ships changes almost daily, and a flag or a slash command may have moved since your first rehearsal. Check /changelog before you start.

### What to have open on screen

- A terminal with a large font and a dark, high-contrast theme, sized so the back row can read a curl command.
- This workbook on a second screen, where the talking points and timing columns are meant to be read.
- The Azure portal tab for Block 7, on the deployment's request-metrics view, ready to show requests arriving.
- A fallback folder of screenshots and short recordings — a /delegate run, a plugin install, a finished agent pull request, the Azure metrics — tested on the presentation machine at projection resolution.
- A second terminal pane, so you can run the server in one and issue curl calls in the other without splitting live.
### The three sentences to open with

Open with something close to these three:

- "This is the GitHub Copilot CLI — the same assistant you may know from the editor, living in your terminal, where it can read a codebase, change it, test it and ship it without ever opening a file."
- "I am going to show you seven things it does; the code on screen happens to be JavaScript, but the language does not matter — every command works the same against your Java, Python or C# project."
- "By the end you will have seen it explain a codebase nobody here wrote, plan and make a change, silently break a route and then find the bug from a one-line symptom, run headless in a pipeline, and answer through a model we host ourselves in Azure."
## Session plan

Two hours, budgeted as twenty-five minutes of slides and introduction, fifty-nine minutes of live demo across seven blocks, twenty minutes of questions and sixteen minutes of buffer. The buffer is real time, not optimism: something will go wrong, and the timing-contingency appendix tells you what to cut when it does.

| Segment | Content | Minutes | Running total |
| --- | --- | --- | --- |
| Intro | Slides: what the CLI is, and where it fits alongside the IDE and the Coding Agent | 25 | 0:25 |
| Block 1 | Install, launch and tour the tool | 6 | 0:31 |
| Block 2 | Understand a codebase you did not write | 10 | 0:41 |
| Block 3 | One build moment — plan mode | 10 | 0:51 |
| Block 4 | Break it, then fix it | 12 | 1:03 |
| Block 5 | Headless automation with copilot -p | 8 | 1:11 |
| Block 6 | Extend and delegate — lightning round | 6 | 1:17 |
| Block 7 | BYOK — point the CLI at your own Azure model | 7 | 1:24 |
| Q&A | Questions from the room | 20 | 1:44 |
| Buffer | Overrun, recovery, deeper dives on request | 16 | 2:00 |

The seven demo blocks total fifty-nine minutes. If a block overruns by more than two minutes, take the time out of the buffer rather than out of the next block, and make the decision at the checkpoint rather than mid-block. The buffer is sixteen real minutes; treat it as insurance you have already bought, not as slack to spend early.

## Pre-flight checklist

Work through this the day before and again thirty minutes before the room fills. Most of it costs nothing to verify, and each item has, at some point, cost somebody a live demo.

| # | Item | How to confirm | Why it matters |
| --- | --- | --- | --- |
| 1 | Active GitHub Copilot subscription | Sign in at github.com and check Copilot is enabled | Premium requests need it; without a seat the CLI will not answer, unless you are running Block 7's own provider |
| 2 | Node.js 22 or later | node --version | The starter repo assumes a current runtime, and npm install -g @github/copilot needs it |
| 3 | copilot installed | copilot --version | Install commands per platform are in Block 1 |
| 4 | /login completed | Launch copilot and run /login | Browser OAuth needs a working browser on the presenting machine, not on your laptop at home |
| 5 | Model selected | /model — a predictable model with medium thinking | Sets a predictable pace; heavy thinking makes the room wait, light thinking weakens the plan-mode demo |
| 6 | Pre-cloned starter repository | The Task Manager API already on disk, trusted and git-initialised | Blocks 2, 3 and 4 all run against it; it is never scaffolded live |
| 7 | Backup repository cloned locally | A finished copy one folder up, including a pre-broken route file | Your recovery path for every fallback in this workbook |
| 8 | Room-legible terminal | Raise the font until the back row can read a curl command | The single most common piece of negative feedback for terminal demos |
| 9 | Second terminal pane | Split the terminal before you start | One pane runs the server, one issues curl; splitting live wastes 30 seconds every time |
| 10 | git configured | git config --get user.name and --get user.email | Block 5 commits from a pipe; an unconfigured identity stops it |
| 11 | Network access to github.com | Confirm on the venue network, not on your phone hotspot | Login and any GitHub-dependent narration reach github.com |
| 12 | Azure AI Foundry / Azure OpenAI resource (Block 7) | The resource exists and its endpoint is in hand | Block 7 points the CLI at it; create it well before the session |
| 13 | Model deployed in Azure (Block 7) | A deployment exists; note its deployment name | You cannot call a model in Azure without deploying it, and WIRE_MODEL is this deployment name |
| 14 | Azure API key ready and tested (Block 7) | Key in hand, a test call already made from a script | The finale depends on it; test it in advance and keep it off-screen |
| 15 | Docker Desktop 4.58 or later — optional | docker version | Only for the narrated sandbox mention in Block 6; not required |
| 16 | GitHub organization repository — optional | A repo owned by an org, not a personal account | Only for the narrated /delegate mention in Block 6; not required |

> *Tip — Put the backup repository at `../task-manager-api-complete`, with a pre-broken `broken/taskStore.js` inside it. This gives Block 4 a deterministic fallback without changing folders during the demo.*

## Block 1 — Install, launch and tour the tool

*Lab: Copilot CLI: Zero to Hero — https://copilot-academy.github.io/labs/copilot-cli-zero-to-hero*

|  |  |
| --- | --- |
| Objective | Get every attendee from nothing to a running, authenticated Copilot CLI session in a trusted folder, and show that the tool documents itself. |
| Time | 6 minutes |
| CLI features demonstrated | Installation per platform, /login browser OAuth, folder trust as a security boundary, /version, /model, /help, /changelog, and Shift+Tab mode cycling |

### Steps

Step 1 — Install the CLI. Use the line for the platform you are presenting on, and show the others so the room can follow along on their own machines.

```
# Windows
```
```
winget install GitHub.CopilotCLI
```
```
# macOS
```
```
brew install --cask copilot-cli
```
```
# Any OS with Node 22 or later
```
```
npm install -g @github/copilot
```
```
# Linux
```
```
curl -fsSL https://gh.io/copilot-install | bash
```
Step 2 — Launch the CLI and authenticate. The /login command opens a browser for the OAuth handshake; complete it and return to the terminal.

```
copilot
```
```
/login
```
Step 3 — Answer the folder-trust prompt. The CLI asks whether it may operate in this directory, and offers the current folder or a parent. Trust the project folder — the pre-cloned starter repo you prepared in pre-flight — and nothing above it.

Step 4 — Orient the audience with the session's own metadata commands.

```
/version
```
```
/model
```
```
/help
```
```
/changelog
```
Step 5 — Show that three modes exist. Press Shift+Tab to cycle interactive, plan and autopilot, and name each as the status line changes: interactive asks before every action, plan writes a proposal and executes nothing, autopilot executes without asking. Leave it on interactive for now; Block 3 is where plan mode earns its place.

### Expected result

copilot --version prints a version string. After /login the banner shows you as authenticated and stops prompting for credentials. The trust prompt appears once for this folder and does not reappear on later launches. /model shows the active model — set it to a predictable model with medium thinking if it is not already. /help lists the slash commands, which is the moment the room realises how much surface area there is. Shift+Tab visibly changes the mode indicator three ways.

### Presenter talking points

- Folder trust is a security boundary, not a nag screen. The CLI reads and writes inside the folder you trust, so trusting a parent directory hands it everything underneath. Say plainly: trust the project, not your home directory.
- /model is a per-session choice and the main lever on pace. Heavier thinking produces better plans and a slower room.
- Changes land almost daily. Open /changelog for a few seconds — it reframes anything that looks unfamiliar later as recency rather than error.
- Do not skip /help. If the room remembers one thing from the session, let it be that the tool documents itself.
- Shift+Tab here is a ten-second preview, not a demo. You are only planting the idea that the tool has three levels of autonomy; Block 3 spends plan mode properly.
### Common issues and fixes

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| winget or brew reports the package as not found | Package index is stale on the machine | winget source update, or brew update, then re-run the install |
| npm install -g @github/copilot fails | Node is older than 22, or the global prefix is not writable | node --version to confirm 22 or later, then re-run with a Node version manager or a writable global prefix |
| /login opens no browser | Headless or remote session, or no default browser | Complete the device-code flow the CLI prints in the terminal instead |
| Trust prompt reappears every launch | You are launching from a different working directory each time | cd into the starter repo before running copilot, and trust that folder |
| CLI starts but every prompt errors | Subscription inactive or the account has no Copilot seat | Confirm the seat on github.com, then /login again |
| Shift+Tab does nothing visible | The terminal is intercepting the key combination | Try a native terminal, or state the three modes verbally and move on |

### Fallback if the demo breaks

If installation stalls on the venue network, switch to a terminal where the CLI is already installed — keep one open before you start — and narrate the install commands from the slide instead of running them. Nothing later in the session depends on having installed it live.

### Checkpoint

You are inside copilot, authenticated, in the trusted starter-repo folder, with the model set, and the room has seen the three modes flick past. Do not move on until the prompt is accepting input.

## Block 2 — Understand a codebase you did not write

*Lab: Copilot CLI: Zero to Hero — https://copilot-academy.github.io/labs/copilot-cli-zero-to-hero*

> **Before starting:** Open a terminal in the prepared `task-manager-api` repository and launch `copilot` there. If `src/routes/tasks.js` does not exist, complete **Prepare the Task Manager API before the session** above before continuing. The prompt "Explain what this project does" analyzes this local repository; it does not download or generate the project.

|  |  |
| --- | --- |
| Objective | Point the CLI at a codebase nobody in the room wrote and get useful answers by asking questions rather than building — the everyday problem of inheriting somebody else's project. |
| Time | 10 minutes |
| CLI features demonstrated | @-mentions for file scope, whole-repo questions, /context, /compact, read-only exploration with nothing written to disk |

> *Watch out — This block writes nothing to disk. Stay in interactive mode and only ask questions; if the model offers to change a file, decline. The point is comprehension, not edits.*

### Steps

Step 1 — Ask the project to explain itself. With the starter repo trusted, ask a whole-repo question and read the answer aloud.

```
Explain what this project does, its main components, and how a request flows through it.
```
Step 2 — Scope a question to a single file with an @-mention. Typing @ and a few letters completes the path.

```
What is @src/routes/tasks.js responsible for, and what does it expose?
```
Step 3 — Ask where a cross-cutting concern lives. This is the question a new joiner actually has.

```
Where does input validation happen in this codebase, and how do errors reach the client?
```
Step 4 — See what the model is actually working from.

```
/context
```
Step 5 — Compact the conversation before it grows expensive, and note that the thread survives.

```
/compact
```
### Expected result

The first answer names the layers — an Express entry point, route handlers, Zod validation, an error-handling middleware, an in-memory store — without you having opened a file. The @-mention answer stays narrowly on that one file. The validation question points at the Zod schemas and traces a bad request through the error handler to the 400 it returns. /context shows the files and history in play; /compact shrinks that context and reports what it reclaimed, and the session keeps going.

### Presenter talking points

- This is the block that needs zero language knowledge. Say it in plain words: you do not have to read the code to get value here, and the same commands work unchanged against a Java, Python or C# repository — the starter repo just happens to be Node. For everyone in the room who does not write JavaScript, this is the use case that is theirs on Monday morning: the codebase they inherited.
- Ask questions the way a new teammate would, in prose, not in keywords. The model reads the whole project, not just the file you are staring at.
- @-mentions are scope. A whole-repo question gets a whole-repo answer; an @file question stays on that file. Show both so the difference is obvious.
- /context answers the quiet question "what does it actually know right now", and /compact answers "won't this get expensive" — you keep the thread and drop the weight.
- Nothing was written. Say so. Reading a codebase safely, with no risk of a stray edit, is the confidence people need before they trust it to change anything.
### Common issues and fixes

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| The overview is thin or generic | The question was too broad, or context was compacted away earlier | Re-ask naming a concrete area, e.g. "walk the task-creation path end to end" |
| An @-mention does not resolve | The path was mistyped, or the file is outside the trusted folder | Retype @ and let the CLI complete the path; confirm the folder you trusted contains it |
| The model offers to edit a file | It read the question as a request to fix something | Decline, and re-ask starting with "Explain" or "Where" so it stays read-only |
| /context looks empty | You are in a fresh session that has not read anything yet | Ask one question first, then run /context |
| Answers slow to a crawl | The context has grown large over the session | /compact, then continue; mention that this is the cost lever |
| The answer cites a file that is not there | The repo on disk differs from what you rehearsed against | Re-clone the starter repo from your backup and relaunch; never debug this live |

### Fallback if the demo breaks

If the network or model is unreliable, this block still works from one question: ask the whole-repo overview, read the answer, and describe the @-mention and /context steps from the workbook. If even that stalls, open the starter repo's README and walk the same structure by hand; the message — ask, don't read — survives.

### Checkpoint

The room has seen the CLI describe a project nobody wrote, answer a file-scoped question and a cross-cutting one, and seen /context and /compact — with nothing written to disk.

## Block 3 — One build moment — plan mode

*Lab: Copilot CLI: Zero to Hero — https://copilot-academy.github.io/labs/copilot-cli-zero-to-hero*

|  |  |
| --- | --- |
| Objective | Turn one small, scoped request into a reviewed plan and then a working change to the existing starter repo, without approving each action individually — and show that nothing changes until you accept. |
| Time | 10 minutes |
| CLI features demonstrated | Shift+Tab into plan mode, reading a plan aloud, Suggest Changes, accepting a plan, the autopilot build, and the ! shell prefix |

Presenter note — We are deliberately not scaffolding a project from an empty folder. The starter repo already exists, and scaffolding from scratch burns minutes re-creating boilerplate the room accepts on faith without teaching a single new capability. One small change to a real codebase shows plan mode, Suggest Changes and the accept gate in a fraction of the time.

### Steps

Step 1 — Enter plan mode. Shift+Tab until the status line reads plan, and remind the room what it means: plan writes a proposal and executes nothing.

Step 2 — Give it one small, scoped ask. Type it rather than paste it; the shape of the request is half the lesson.

```
Add a single new endpoint GET /tasks/:id/summary that returns the task's id, title and status. Follow the existing conventions and validation. Plan first.
```
Step 3 — Read the plan out loud. Walk the short file list, then steer it with Suggest Changes rather than re-typing the prompt.

```
Also return a wordCount for the description, and 0 when there is no description.
```
Step 4 — Accept the plan and let it build. Approve, and let it apply the change.

Step 5 — Verify from inside the session with the ! shell prefix, which runs a shell command without leaving Copilot.

```
!npm start
```
```
curl -s -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"Summary demo","description":"Count these words"}'
```
```
curl -s http://localhost:3000/tasks/1/summary
```
```
# Ctrl+C to stop the server
```
### Expected result

A short plan naming the one or two files it will touch, revised once in front of the audience with Suggest Changes, then applied on your approval. The new endpoint returns the id, title, status and the wordCount you added. The exact code varies between runs; the shape does not. Nothing changed on disk between the plan and your acceptance.

### Presenter talking points

- Plan mode is the answer to the most common objection in the room — that an agent will run off and change things. It changes nothing until you accept, and Suggest Changes lets you steer the plan instead of re-writing the prompt.
- Keep the ask small and real. One endpoint against a codebase that already exists is enough to show the whole plan-review-accept loop; a from-scratch scaffold would cost five minutes and teach nothing new.
- The ! prefix is worth five seconds. It is why the editor never has to open — the shell is right there in the conversation.
- If the generated code differs from what you rehearsed, say so and move on. Showing that you read the output rather than reciting it is more convincing than a clean run.
### Common issues and fixes

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Plan mode builds anyway | The status line was still on interactive or autopilot | Shift+Tab until it reads plan, then re-issue the prompt |
| The plan is larger than one endpoint | The ask drifted, or conventions implied extra files | Use Suggest Changes to cut it back, or decline and re-scope in one sentence |
| Suggest Changes starts over instead of amending | The amendment was phrased as a fresh prompt | Phrase it as a delta — "also...", "instead of..." — so it edits the existing plan |
| The build touches files you did not expect | The scope was implicit | Decline, add the @file scope to the prompt, and plan again |
| curl returns nothing | The server is not running, or is on another port | Check the server pane and curl the port it reports |
| The endpoint returns 404 | The route was added but not wired into the router | Ask the model to register the new route, then restart the server |

### Fallback if the demo breaks

If the plan will not converge inside the budget, copy the finished endpoint from your backup repo, restart the server and run the curl call anyway — the accept gate and the curl proof are what the audience remembers. Say what you are doing; recovering from a bad generation is a real skill, not a defeat.

### Checkpoint

The starter repo has one new working endpoint, added through a plan you reviewed and accepted, verified with curl from inside the session.

## Block 4 — Break it, then fix it

*Lab: Copilot CLI: Zero to Hero — https://copilot-academy.github.io/labs/copilot-cli-zero-to-hero*

**Highest-impact demo of the session. If the clock is tight, cut anything else first — never this.**

|  |  |
| --- | --- |
| Objective | Plant a realistic bug, watch it silently destroy data, hand Copilot the symptom rather than the diagnosis, and show the three review commands that would have caught it before a push. |
| Time | 12 minutes |
| CLI features demonstrated | A deliberate regression, a symptom-only bug report, approving a fix, /review including a focused review, /diff, /security-review |

### Steps

Step 1 — Ask for the regression in the store method that owns deletion, and be explicit that you do not want it corrected.

```
In the remove function in @src/models/taskStore.js, keep the existing findIndex call but remove the index === -1 check before splicing. Do not fix the resulting bug.
```
Step 2 — Start the server and create two tasks, so there is something to lose.

```
!npm start
```
```
curl -s -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title": "Task 1"}'
```
```
curl -s -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title": "Task 2"}'
```
Step 3 — Delete an id that does not exist, then look at the list.

```
curl -s -X DELETE http://localhost:3000/tasks/999
```
```
curl -s http://localhost:3000/tasks
```
Step 4 — Hand Copilot the symptom, not the diagnosis. Do not mention findIndex or the missing guard.

```
I think there's a bug in the DELETE endpoint. Two tasks existed, I deleted id 999, and now only one task is left. Trace deletion through @src/routes/tasks.js and @src/models/taskStore.js and find it.
```
Step 5 — Approve the fix, restart the server, and repeat Step 3 to show a clean 404 and an intact list.

```
# Ctrl+C to stop the old server, then:
```
```
!npm start
```
```
curl -s -X DELETE http://localhost:3000/tasks/999
```
```
curl -s http://localhost:3000/tasks
```
Step 6 — Show the three commands that catch this class of bug without a bug report. /review also accepts a focused instruction.

```
/review
```
```
/review Review for security issues
```
```
/diff
```
```
/security-review
```
### Expected result

The DELETE against a non-existent id returns no error — and the following GET returns one task instead of two. Task 2 is gone. findIndex returned -1, and splice(-1, 1) removes the last element of the array, so deleting a task that never existed quietly deleted a real one. After the fix, the same DELETE returns 404 and both tasks survive. /review reports findings across the working tree, /diff shows every uncommitted change, and /security-review scans staged and unstaged changes for vulnerabilities.

### Presenter talking points

- Let the silence do the work. Run the DELETE, say nothing, run the GET, and wait for somebody in the room to notice the list is short. That pause is the most valuable ten seconds in the session.
- This bug is not a toy. An off-by-one on a sentinel return value, with no bounds check, is exactly the kind of defect that passes review and destroys data in production.
- You gave the model a symptom, not a location and not a cause. That is how a real bug report arrives — and it still found it.
- Frame the three commands as a pre-push routine: /diff to see what you are about to send, /review for correctness, /security-review for vulnerabilities. Then note that /review takes a focused prompt, so one command serves a security pass, a performance pass or a convention pass.
### Common issues and fixes

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Copilot fixes the bug despite instructions | The "do not fix it" clause was ignored or dropped | Re-prompt asking only for the findIndex change; if it still fixes it, edit the file by hand with a ! command |
| The delete does not visibly destroy a task | Only one task existed, or the fix never landed | Confirm two tasks exist first, and cat the route to check the -1 guard is genuinely absent |
| The room does not react | The list output scrolled past | Re-run the GET and read the array out loud, counting the tasks |
| /security-review returns nothing | There are no staged or unstaged changes left to scan | Make a small edit, or run it before committing the fix |
| The server still serves the old code | Node was not restarted after the fix | Ctrl+C and !npm start again |
| Copilot fixes the wrong thing | The symptom was described too vaguely | Keep the symptom concrete — counts before and after — but still withhold the cause |

### Fallback if the demo breaks

If the model refuses to introduce the bug, edit `src/models/taskStore.js` by hand or restore a pre-broken copy from `../task-manager-api-complete/broken/taskStore.js`. The demonstration of the bug and the fix is what matters; how the bug arrived is irrelevant to the point.

### Checkpoint

The room has seen data disappear with no error, seen Copilot locate the missing bounds check from a one-line symptom report, seen the fix verified with the same curl calls, and seen /review, /diff and /security-review.

## Block 5 — Headless automation with copilot -p

*Lab: Copilot CLI: Zero to Hero — https://copilot-academy.github.io/labs/copilot-cli-zero-to-hero*

|  |  |
| --- | --- |
| Objective | Take Copilot out of the conversation and into the pipeline: one-shot prompts over stdin, with least-privilege tool allowances, generating commits, documentation and diagnostics. |
| Time | 8 minutes |
| CLI features demonstrated | /exit and the resume link, copilot --resume, copilot -p, --allow-tool patterns, --model override, piping stdin and stderr |

### Steps

Step 1 — Leave the interactive session, and show how to come back. Read the resume link it prints out loud.

```
/exit
```
```
copilot --resume
```
Step 2 — Stage the work and let Copilot write the commit message from the diff itself. This changes nothing — it only prints.

```
git add -A
```
```
git diff --cached | copilot -p "Write a concise conventional commit message for these changes."
```
Step 3 — Now let it commit, by granting exactly one tool family and nothing else.

```
git diff --cached | copilot --allow-tool='shell(git:*)' -p "Write a concise conventional commit message for these changes and git commit with that message."
```
```
git log
```
Step 4 — Generate a README with a single-file write allowance.

```
copilot --allow-tool='write(README.md)' -p "Generate a README.md with a project description, setup instructions, API endpoint documentation with curl examples, and how to run the tests."
```
Step 5 — Analyze a test run by piping its output back in, and override the model to a cheaper one for mechanical work. Use the command for your shell.

PowerShell:

```
npm test 2>&1 | copilot --model claude-haiku-4.5 -p "These are test results. Explain any failures and suggest fixes." 2>$null
```

Bash:

```
npm test 2>&1 | copilot --model claude-haiku-4.5 -p "These are test results. Explain any failures and suggest fixes." 2>/dev/null
```
### Expected result

Step 2 prints a conventional commit message and changes nothing. Step 3 produces a real commit, visible in git log, with a message derived from the diff. A README.md appears with endpoint documentation and runnable curl examples. The analysis step reads the test output and summarizes a passing run or explains any failures in prose. Every one of these is one prompt, one narrow allowance, and runs without a TTY.

### Presenter talking points

- The shape to teach is: something on stdin, one prompt, one narrow allowance, output to stdout or to exactly one file. That composes with every tool your audience already uses.
- Walk the allowances deliberately. shell(git:*) is a family, write(README.md) is a single file. Least privilege here is not theory — it is a flag you type.
- Explain the redirection: `2>&1` sends the test run's stderr into the pipe so the model can see failures. The final `2>$null` in PowerShell, or `2>/dev/null` in Bash, discards the CLI's own progress chatter so the terminal shows only the answer.
- The --model override is a cost and latency lever. A cheap, fast model is the right choice for mechanical scaffolding; keep the stronger model for design work.
- Land the CI/CD connection explicitly: none of this needs a TTY, so every command here runs wherever your pipeline runs. Commit hygiene, documentation drift and diagnostics all become automatable — and every prompt is one premium request.
### Common issues and fixes

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| The commit message prints but nothing commits | No tool allowance was granted | Add --allow-tool='shell(git:*)' |
| Nothing is staged, and the model has nothing to read | git add -A was skipped | Stage first; git diff --cached must be non-empty |
| The write is refused | The allowance path does not match the file the model chose | Widen to the directory, for example write(docs/*), or name the exact path |
| The terminal fills with progress output | The CLI's stderr is not redirected | Append `2>$null` in PowerShell or `2>/dev/null` in Bash |
| The --model override is rejected | The model name is not available on your subscription | Drop --model and let the session default apply |
| The pipe hangs with no output | The one-shot run is waiting on a TTY approval prompt | Grant the needed --allow-tool up front so the run never has to ask |

### Fallback if the demo breaks

Run the commands against your backup repo, where the diff is known and the outputs are reproducible. If the network is degraded, show Step 2 only — a commit message generated from a real diff is enough to make the point — and describe the rest from the workbook.

### Checkpoint

git log shows a commit whose message the model wrote, a README.md exists on disk, and the room has seen at least three different --allow-tool patterns and the pipe-in, one-prompt, pipe-out shape.

## Block 6 — Extend and delegate — lightning round

*Lab: Copilot CLI: Zero to Hero — https://copilot-academy.github.io/labs/copilot-cli-zero-to-hero*

|  |  |
| --- | --- |
| Objective | Build and run one concrete Task Manager API example for each extension mechanism, then map plugins, delegation, permissions and session intelligence. |
| Time | 18 minutes: 3 minutes per mechanism, then 6 minutes for the extension map and delegation material |
| CLI features demonstrated | Skills, custom agents, hooks, MCP servers, /plugin, /delegate, --allow-tool / --deny-tool / --allow-all / --yolo, Docker sandboxes, git worktrees, /fleet, /chronicle, /usage, /ide |

> *Numbering note — The headless automation exercise remains Block 5. The four extension mechanisms requested for the expanded demo belong here in Block 6 because they extend how Copilot works rather than how a one-shot prompt runs.*

> *Pre-session preparation — Run all four mini-demos once from the `task-manager-api` directory. Commit neither `.copilot-hook.log` nor temporary MCP credentials. The MCP example needs npm access the first time, so pre-warm it on the presentation network.*

### The four extension mechanisms

Start with this map, then prove every row with the mini-demos below.

| Mechanism | Where it lives | How you drive it | What it is for |
| --- | --- | --- | --- |
| Skills | `.github/skills/<name>/SKILL.md`, or `~/.copilot/skills/` | `copilot skill list`; invoke by matching prompt or slash command | Reusable, on-demand workflows and domain knowledge |
| Custom agents | `.github/agents/<name>.agent.md`, or the user profile agents folder | `copilot --agent=<name>` or the interactive agent selector | Focused personas with isolated context and restricted tools |
| Hooks | JSON files in `.github/hooks/` | No prompt command; they fire on lifecycle events | Deterministic policy, validation and audit automation |
| MCP servers | `~/.copilot/mcp-config.json`, `.mcp.json` or `.github/mcp.json` | `copilot mcp list`, `get`, `add`, `remove`, `enable`, `disable` | External tools, APIs and live data |

### Mini-demo 1 — Skill: reusable API smoke-check workflow

**What this proves:** a skill teaches Copilot a repeatable procedure and is loaded only when the task matches its description.

1. From the `task-manager-api` directory, create the skill folder:

	```powershell
	New-Item -ItemType Directory -Force .github/skills/api-smoke-check
	```

2. Create `.github/skills/api-smoke-check/SKILL.md` with this exact content:

	```markdown
	---
	name: api-smoke-check
	description: 'Run a read-only smoke check of the Task Manager API. Use when asked to smoke test, verify endpoints, or check API health.'
	argument-hint: 'Smoke check the Task Manager API'
	---

	# Task Manager API smoke check

	1. Inspect package.json and the Express route registration before running commands.
	2. Run npm test and npm run lint.
	3. Do not edit files and do not start a persistent server.
	4. Report pass or fail for tests, lint, and the expected /tasks route.
	5. Include the failing command and shortest relevant error when a check fails.
	```

3. Verify discovery before opening the demo session:

	```powershell
	copilot skill list
	```

	Expected evidence: `api-smoke-check` appears under project skills. If the session was already open when the file was created, exit and start a new session so discovery runs again.

4. Invoke it with a matching prompt and read-only permissions:

	```powershell
	copilot -p "Use the api-smoke-check skill to verify this repository. Do not modify files." --allow-tool='shell(npm:*)'
	```

5. Show the result: tests and lint are reported separately, `/tasks` is identified, and `git status --short` shows no source changes.

**Presenter line:** “The description is the discovery surface. The body is loaded only when the request matches, so specialized instructions do not occupy every session.”

**Reset:** keep this skill for later practice, or remove `.github/skills/api-smoke-check`.

### Mini-demo 2 — Custom agent: read-only API reviewer

**What this proves:** an agent provides a named role, its own instructions, and a deliberately smaller tool set.

1. Create the agents folder:

	```powershell
	New-Item -ItemType Directory -Force .github/agents
	```

2. Create `.github/agents/task-api-reviewer.agent.md` with this exact content:

	```markdown
	---
	name: task-api-reviewer
	description: 'Read-only reviewer for Task Manager API routes, validation, store behavior, and tests. Use for API contract and regression reviews.'
	tools: [read, search]
	user-invocable: true
	disable-model-invocation: false
	---

	You are the read-only reviewer for this Task Manager API.

	## Constraints
	- Do not edit files.
	- Do not run shell commands.
	- Review only behavior supported by repository evidence.

	## Review order
	1. Trace route registration from src/index.js.
	2. Compare route handlers with Zod schemas and taskStore behavior.
	3. Check whether tests cover success, validation, not-found, and deletion behavior.

	## Output
	List findings by severity with file references. If there are no findings, say so and name any remaining test gap.
	```

3. Start a fresh one-shot session with that agent:

	```powershell
	copilot --agent=task-api-reviewer -p "Review DELETE /tasks/:id for correctness and test coverage."
	```

4. Show the evidence: the response traces the route to `taskStore.remove`, cannot edit files, and reports findings in the requested review format.

**Presenter line:** “A skill changes how a workflow is performed; an agent changes who performs it and which tools that role is allowed to use.”

**Reset:** keep the agent, or remove `.github/agents/task-api-reviewer.agent.md`.

### Mini-demo 3 — Hook: deterministic session audit marker

**What this proves:** hooks execute because an event occurred, not because the model remembered an instruction.

1. Create the hooks folder:

	```powershell
	New-Item -ItemType Directory -Force .github/hooks
	```

2. Create `.github/hooks/session-audit.json` with this exact content:

	```json
	{
		 "version": 1,
	  "hooks": {
		 "SessionStart": [
			{
			  "type": "command",
			  "command": "node -e \"require('fs').appendFileSync('.copilot-hook.log', new Date().toISOString() + ' SessionStart\\n')\"",
			  "timeout": 10
			}
		 ]
	  }
	}
	```

3. Run the demo from inside the `task-manager-api` directory. Trust the project for this process, start a new one-shot session, and display the hook log:

	```powershell
	cd task-manager-api
	Remove-Item .copilot-hook.log -ErrorAction SilentlyContinue
	$env:COPILOT_ALLOW_ALL = 'true'
	copilot -p "Reply with exactly: hook demo complete"
	Get-Content .copilot-hook.log
	Remove-Item Env:COPILOT_ALLOW_ALL
	```

	Expected terminal output:

	```text
	hook demo complete
	2026-09-19T11:20:45.245Z SessionStart
	```

	The timestamp will differ. The exact value `COPILOT_ALLOW_ALL=true` trusts the working directory and allows this non-interactive session to load its hooks. It also auto-approves tools, so remove the variable immediately after this harmless demo. Hook event names are case-sensitive: use `SessionStart`, not `sessionStart`.

	If you remain in the parent `GHCP CLI` directory, use `copilot -C task-manager-api -p "Reply with exactly: hook demo complete"` and read `task-manager-api/.copilot-hook.log` instead.

4. Show the evidence: the log contains an ISO timestamp followed by `SessionStart`, even though the prompt never asked Copilot to create it.

**Presenter line:** “Instructions are guidance. Hooks are deterministic runtime automation. Use them for policy and audit behavior that must not depend on model compliance.”

**Reset:** remove `.copilot-hook.log`. Add it to the project `.gitignore` if the hook will remain in the repository.

### Mini-demo 4 — MCP: call a real external tool

**What this proves:** MCP gives Copilot callable tools supplied by another process. This demo uses the Model Context Protocol reference “everything” server and requires no credentials.

1. Pre-warm the package before the session so venue Wi-Fi is not part of the live path:

	```powershell
	npm cache add @modelcontextprotocol/server-everything
	```

2. Register the local stdio server in the user configuration:

	```powershell
	copilot mcp add demo-everything -- npx -y @modelcontextprotocol/server-everything
	```

3. Verify exactly what was registered:

	```powershell
	copilot mcp list
	copilot mcp get demo-everything
	```

4. Ask Copilot to use one of the server’s tools:

	```powershell
	copilot -p "Use the demo-everything MCP server's echo tool with the text Task Manager API, then report the returned text." --allow-tool='demo-everything'
	```

	If the approval selector displays the fully qualified tool name during rehearsal, replace the broad server allowance with that exact name for the live run.

5. Show the evidence: the response includes the text returned by the MCP tool, and the tool trace names `demo-everything` rather than a shell command.

6. Clean up the user-level configuration after the demo:

	```powershell
	copilot mcp remove demo-everything
	```

**Presenter line:** “The model decides when to call a tool, but the server owns the integration and its contract. Credentials belong in environment variables or a secret store, never in committed MCP JSON.”

**Fallback:** if npm access fails, run `copilot mcp list` and `copilot mcp get github-mcp-server` to show the built-in GitHub server, then use the rehearsal recording for the echo call.

Two details worth naming after the demos: a `PreToolUse` hook can allow, ask or deny before a tool runs, making it an enforcement point for team policy; and a plugin is a distribution mechanism that can bundle customizations for installation with `copilot plugin install PLUGIN-NAME@MARKETPLACE-NAME`.

### Delegation — local versus the Coding Agent

/delegate hands a plan to the Copilot Coding Agent on GitHub, which produces commits, a draft pull request and test results while your terminal stays free.

| Dimension | Local CLI session | Delegated to the Coding Agent |
| --- | --- | --- |
| Execution | Blocks your terminal while it works | Asynchronous — runs on GitHub while you do something else |
| Security | Runs on your machine with your credentials and your files | Runs in an isolated cloud environment |
| Speed | Fast, but you have to monitor it | The agent works while you are offline or in another meeting |
| Collaboration | Local only — nobody else sees the work until you push | A pull request the team can read, comment on and review |
| Audit trail | Your git history, and whatever you remember | A full pull request with the agent's reasoning attached |

### Permissions and isolation, at a glance

- --allow-tool and --deny-tool scope a single one-shot run: shell(git:*) is a family, write(README.md) one file, and you can grant broadly then subtract with --deny-tool='shell(rm)'.
- --allow-all and --yolo grant all tools, paths and URLs — appropriate only when you are watching the session, in a throwaway environment, or running already-verified automation.
- Docker sandboxes give --yolo a local container boundary: maximum autonomy, minimum blast radius, and a network policy that logs every host the session tries to reach.
- git worktrees, /worktree and /fleet run more than one session or subagent in parallel, each on its own branch.
### Session intelligence to close

- /chronicle queries your full-text-searchable session history; /chronicle standup summarises what you did today.
- /usage shows premium-request usage — every prompt is one premium request, whether typed or piped through -p.
- /ide bridges the session to VS Code with shared context: the same assistant, reachable from wherever the work is.
### Expected result

A single narrated map of the CLI's extension surface, delegation model, permission flags and session commands — delivered from the workbook and screenshots in about six minutes, with no live command that a venue network can break.

### Presenter talking points

- Say plainly why this block is narrated, not run. /delegate needs an organization-owned repository and does not work on personal accounts. Docker sandboxes need Docker Desktop 4.58 or later, are experimental, and are macOS and Windows only. A plugin demo depends on both a plugin marketplace and the npm registry being reachable. Any of the three can fail in front of a room; a recording cannot.
- Recommend a short terminal recording of a real /delegate run and a plugin install, plus screenshots of a finished agent pull request, captured during rehearsal and tested on the presentation machine at projection resolution.
- Keep it a map, not a tour. The goal is that people leave knowing these capabilities exist and where to read about them; depth is what the follow-up lab and the Q&A are for.
- The through-line: skills, agents, hooks and MCP extend the tool; plugins distribute those extensions; /delegate and worktrees scale the work out; /chronicle and /usage keep it accountable.
### Common issues and fixes

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| /delegate reports the repository is not eligible | The repository is under a personal account | This is exactly why the block is narrated; show the recorded run |
| A plugin install hangs | The marketplace or npm registry is unreachable on the venue network | Fall back to the screenshot of the installed plugin; do not wait on the network |
| A Docker sandbox command errors | Docker Desktop is missing, older than 4.58, or on Linux | Narrate it from the slide; it is experimental and platform-limited by design |
| /chronicle returns nothing | First session on this machine, so there is no history | Run it against the current session, or show the rehearsal capture |
| A screen recording is unreadable when projected | It was recorded at a different aspect ratio than the projector | Re-record on the presentation machine at projection resolution during setup |
| The block overruns | Six minutes is tight for this much surface | Drop the permissions bullets first; they resurface naturally in Q&A |

### Fallback if the demo breaks

This block is already the fallback-shaped one — it depends on nothing live. If even the recordings fail to play, walk the two comparison tables and the four-mechanism table straight from the workbook; the map survives without a single command.

### Checkpoint

The room can name the four extension mechanisms, knows /delegate produces a reviewable pull request, and has seen the local-versus-delegated and permissions material — all without a live command that could fail.

## Block 7 — BYOK: point the CLI at your own Microsoft Foundry GPT-5.1 deployment

*Lab: Copilot CLI: Zero to Hero — https://copilot-academy.github.io/labs/copilot-cli-zero-to-hero*

|  |  |
| --- | --- |
| Objective | Point the CLI at a GPT-5.1 model deployed in your Microsoft Foundry project, prove it is answering through your own resource, and state honestly what you trade away and what you keep. |
| Time | 7 minutes |
| CLI features demonstrated | COPILOT_PROVIDER_* environment variables, the Azure provider type, the "responses" wire API, copilot help providers, COPILOT_OFFLINE, and GitHub sign-in as optional |

### Why it matters

BYOK — bring your own key — points the CLI at a model you already pay for. You get direct control of LLM spend against your own Foundry resource instead of consuming premium requests, and it is the enterprise and air-gapped story: the model runs in a resource you govern.

### Model requirements

GPT-5.1 supports tool calling (function calling) and streaming, which the CLI requires. It also needs the `responses` wire API rather than the default `completions` API — this is the detail every GPT-5-series deployment trips over.

> *Watch out — Have these done before the session, not during it: a Microsoft Foundry project with GPT-5.1 deployed (you cannot call a model in Foundry without deploying it), and the project or resource endpoint, the deployment name and the API key in hand. Confirm the deployment name from the Foundry portal's **Deployments** tab; it is often not simply `gpt-5.1`.*

### Steps

Step 1 — Set the Foundry provider variables, then launch. Bash form:

```
export COPILOT_PROVIDER_TYPE=azure
```
```
export COPILOT_PROVIDER_BASE_URL=https://YOUR-FOUNDRY-RESOURCE.services.ai.azure.com
```
```
export COPILOT_PROVIDER_API_KEY=YOUR-FOUNDRY-API-KEY
```
```
export COPILOT_PROVIDER_WIRE_API=responses
```
```
export COPILOT_PROVIDER_MODEL_ID=gpt-5.1
```
```
export COPILOT_PROVIDER_WIRE_MODEL=YOUR-DEPLOYMENT-NAME
```
```
copilot
```
PowerShell equivalent, since you may present on Windows:

```
$env:COPILOT_PROVIDER_TYPE="azure"
```
```
$env:COPILOT_PROVIDER_BASE_URL="https://YOUR-FOUNDRY-RESOURCE.services.ai.azure.com"
```
```
$env:COPILOT_PROVIDER_API_KEY="YOUR-FOUNDRY-API-KEY"
```
```
$env:COPILOT_PROVIDER_WIRE_API="responses"
```
```
$env:COPILOT_PROVIDER_MODEL_ID="gpt-5.1"
```
```
$env:COPILOT_PROVIDER_WIRE_MODEL="YOUR-DEPLOYMENT-NAME"
```
```
copilot
```
Step 2 — Understand the three variables that trip people up:

- `COPILOT_PROVIDER_TYPE=azure` — use `azure`, not `openai`, for both classic Azure OpenAI resources and Microsoft Foundry projects.
- `COPILOT_PROVIDER_MODEL_ID=gpt-5.1` — the well-known model name; the CLI uses it to resolve capabilities and token limits from its built-in model catalog. Set it to the base model name (`gpt-5.1`), not the deployment name.
- `COPILOT_PROVIDER_WIRE_MODEL` — the exact Foundry deployment name, because Foundry and Azure OpenAI route requests through deployments rather than model names. This is frequently a different string from `COPILOT_PROVIDER_MODEL_ID`, and mixing them up is the number one cause of a "model not found" error.
- `COPILOT_PROVIDER_WIRE_API=responses` — GPT-5-series models require the `responses` API; the CLI's default `completions` API will fail against a GPT-5.1 deployment.

If your project uses a Foundry project URL rather than a resource host, `COPILOT_PROVIDER_BASE_URL` also accepts the full form `https://YOUR-FOUNDRY-RESOURCE.services.ai.azure.com/api/projects/YOUR-PROJECT-NAME`; the CLI preserves the project path when it builds the request.

Step 3 — Prove it live. Relaunch, read the banner, ask one trivial prompt, and if the Foundry portal is open, watch the deployment's request metrics tick up.

```
copilot
```
```
List the files in this folder larger than 2MB.
```
Step 4 (optional) — Print the built-in setup instructions in the terminal. A good live moment.

```
copilot help providers
```
### Alternatives and wire protocol

For a short-lived credential instead of a static key, replace `COPILOT_PROVIDER_API_KEY` with `COPILOT_PROVIDER_API_KEY_COMMAND`, set to a command that prints a fresh key per request (for example, an `az keyvault secret show` call). For air-gapped use, `COPILOT_OFFLINE=true` makes the CLI contact no GitHub servers, disables telemetry, and talks only to your configured Foundry provider.

### The honest trade-off

When you bring your own provider, GitHub authentication becomes optional — but the features that depend on GitHub still need you signed in to GitHub as well: specifically /delegate, GitHub Code Search and the GitHub MCP server. Sign in to both and you get your preferred model plus those features. Built-in sub-agents — explore, task and code-review — automatically inherit your provider configuration, and if that configuration is invalid the CLI shows an actionable error and never silently falls back to GitHub-hosted models.

> *Watch out — Never type or paste the real API key where the audience or a recording can see it. Set the variables from a pre-prepared, un-echoed script, or in a second terminal before the room fills, and rotate the key after the session.*

### Expected result

The relaunched CLI reports the custom provider on its banner and model line, answers the trivial prompt through your Foundry GPT-5.1 deployment, and — if the portal is open — the deployment's request metrics tick up. That portal tab is the most convincing single thing in this block.

### Presenter talking points

- Lead with the reason, not the variables: you run a model you already pay for and govern in Foundry, and your spend lands on your Azure bill rather than on premium requests.
- The MODEL_ID versus WIRE_MODEL distinction is the whole block. Say it twice: MODEL_ID is the well-known model name (`gpt-5.1`) used for capabilities and limits; WIRE_MODEL is the Foundry deployment name used for routing. Different strings, and the usual cause of "model not found".
- Name the `responses` wire API explicitly — it is the detail unique to GPT-5-series models and the second most common failure after the MODEL_ID/WIRE_MODEL mix-up.
- The portal metrics tab is your proof. Nothing convinces a sceptical room like watching their own Foundry deployment register the request they just typed.
- Be honest about the trade: BYOK makes GitHub sign-in optional, but /delegate, Code Search and the GitHub MCP server still want it. Sign in to both and you lose nothing.
- Say the security line out loud and mean it: the key never appears on screen. Pre-set it, un-echoed, and rotate it afterwards.
### Common issues and fixes

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| "model not found" | COPILOT_PROVIDER_WIRE_MODEL does not match the Foundry deployment name | Set WIRE_MODEL to the exact deployment name from the Foundry portal's Deployments tab, not `gpt-5.1` |
| 401 or 403 on every request | The API key is wrong, expired, or from a different resource/project | Re-copy COPILOT_PROVIDER_API_KEY from the same resource as the endpoint, and rotate it if unsure |
| A response or streaming error, or the model appears to ignore tools | COPILOT_PROVIDER_WIRE_API is missing or still set to the default | Set COPILOT_PROVIDER_WIRE_API=responses — required for GPT-5.1 |
| "Bad Request" mentioning API version or schema | COPILOT_PROVIDER_AZURE_API_VERSION is set to an unsupported value | Drop the variable to use the default versionless v1 endpoint, or set a supported version for your resource |
| Endpoint not found, or 404 on every request | The base URL uses the Foundry project path incorrectly, or points at the wrong resource | Use either the plain resource host or the full `/api/projects/YOUR-PROJECT-NAME` form, matching what the Foundry portal shows |
| The CLI answers but /delegate or Code Search fails | You are on your own provider but not signed in to GitHub | Sign in to GitHub as well; those features depend on it |

### Fallback if the demo breaks

If the Foundry endpoint is unreachable at the venue, do not debug it live. Show copilot help providers to display the setup in the terminal, walk the bash and PowerShell blocks and the MODEL_ID versus WIRE_MODEL distinction from the workbook, and show a screenshot of the deployment's metrics from your rehearsal. The concept lands without a live call.

### Checkpoint

The room has seen the CLI answer through a self-hosted Foundry GPT-5.1 deployment, understands MODEL_ID versus WIRE_MODEL and why GPT-5.1 needs the `responses` wire API, and has heard the honest trade-off — a preferred model you pay for, with the GitHub-dependent features intact when you sign in to both.

## Appendix A — Quick reference

### Shortcuts

| Shortcut | What it does |
| --- | --- |
| Shift+Tab | Cycle modes: interactive, plan, autopilot |
| Ctrl+S | Run the prompt and keep the input |
| Ctrl+C | Cancel the current operation |
| Ctrl+C twice | Exit the session |
| Ctrl+T | Toggle the reasoning display |
| Ctrl+O | Expand the timeline |
| Ctrl+G | Open an external editor for the prompt |
| Ctrl+L | Clear the screen |
| !command | Run a shell command without leaving the session |
| @file | Mention a file to scope the prompt to it |

### Interactive and management commands

| Command | Use |
| --- | --- |
| /help | List the available commands — the tool documents itself |
| /model | Choose the model and thinking level |
| /changelog | See what changed in recent releases |
| /compact | Compact the conversation context |
| /context | Inspect what is currently in context |
| /diff | Show all uncommitted changes |
| /review | Review the working tree; accepts a focused prompt |
| /security-review | Scan staged and unstaged changes for vulnerabilities |
| /resume | Return to a previous session |
| /agent | List and select custom agents |
| `copilot mcp` | List, get, add, remove, disable or enable MCP servers outside a session |
| `copilot skill` | List, add, remove, disable or enable skills outside a session |
| /plugin | install, list, update, uninstall plugins |
| /delegate | Hand the current plan to the Copilot Coding Agent |
| /worktree | Work across git worktrees |
| /fleet | Run parallel subagents within one session |
| /ide | Bridge the session to VS Code |
| /usage | Show premium request usage |
| /chronicle | Query your searchable session history |
| /allow-all | Grant all tools, paths and URLs for this session |

## Appendix B — Where custom instructions live

| Location | Scope |
| --- | --- |
| .github/copilot-instructions.md | Repository-wide conventions for everyone working in the repo |
| .github/instructions/**/*.instructions.md | Path-specific rules, targeted with an applyTo frontmatter pattern |
| AGENTS.md, CLAUDE.md, GEMINI.md | Agent-specific instruction files |
| ~/.copilot/copilot-instructions.md | User-wide preferences that follow you across every project |

Layer them deliberately: personal habits at the user level, team conventions in the repository, and narrow rules — test style, generated-code directories, infrastructure folders — in path-specific files. Remember that instruction changes made mid-session need a /restart before they are in force, and that /instructions will not list a file added mid-session until then.

## Appendix C — Timing contingency

Decide cuts at a checkpoint, never in the middle of a block. Cut in this order and say nothing about it — an audience that is not told what it missed does not feel short-changed.

| If you are behind by | Cut | Why it is safe to cut |
| --- | --- | --- |
| A few minutes | Block 6 — the extend-and-delegate lightning round | It is narrated already and depends on nothing live; the map survives being described faster or skipped |
| More than that | Also trim Block 5 to the commit-message pipe only | Step 2 alone — a commit message from a real diff — makes the headless point; the README and diagnostic steps are reinforcement |
| Still behind | Also trim Block 2's last question | Drop the /compact step or the cross-cutting question; the overview and one @-mention already carry the "ask, don't read" idea |
| Any amount | Never Block 4 | The silent data loss and the fix is the demonstration people quote afterwards — protect it at any cost |

## Appendix D — Attendee takeaway

Share this at the end of the session. The full lab, including the material this workbook expands on, is at https://copilot-academy.github.io/labs/copilot-cli-zero-to-hero.

The loop worth practising is four blocks in order, against the starter repo: get oriented in a codebase you did not write (Block 2), plan and make one change (Block 3), break a route and find the bug from its symptom (Block 4), then take it headless with one piped command (Block 5). Half an hour, and it covers the capabilities the room will remember.
