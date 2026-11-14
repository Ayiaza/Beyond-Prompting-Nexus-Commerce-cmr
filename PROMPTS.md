# Prompt Documentation – NEXUS-COMMERCE

This project was built with an AI assistant (Claude). Below are the prompts used, how each was refined, and what was learned. Add your own experiments at the end.

## 1. Context engineering: giving the AI the full brief
**Prompt 1 (context + goal):** I pasted the complete bootcamp assignment announcement (challenge, submission requirements, deadlines, deployment options) with no extra instructions.

**What happened:** The AI had no question to answer, so it proposed a scope instead (storefront + mini CRM), a stack, a timeline, and a checklist. It also noticed the PDF attachment had not arrived and asked for it rather than guessing.

**Lesson:** Supplying the full brief as context lets the AI infer requirements, but a clear instruction produces more focused output. Next time, add "Build X using Y" to the pasted brief.

## 2. Build request
**Prompt 2:** "please complete this project"

**Refinement needed:** Too vague, so the AI made assumptions (single-file vanilla HTML/CSS/JS, localStorage, no backend) and stated them. A better prompt would specify the stack, data storage, and required CRM features up front.

**Improved prompt (recommended):** "Build NEXUS-COMMERCE as a vanilla HTML/CSS/JS app with no build step. Storefront: product grid, search, category filter, cart, checkout. Mini CRM: dashboard, customers with status and notes, order status management. Persist data in localStorage. Keep it responsive and escape user input."

**Result:** A working single-file app.

## 3. Repository structure
**Prompt 3:** "give me a complete version to upload on github"

**Result:** The single file was split into `index.html`, `css/style.css`, and `js/app.js`, plus README, LICENSE, `.gitignore`, and a screenshots folder.

**Bug found and fixed:** The first packaging attempt created folders literally named `{css,js,docs` because the shell did not support brace expansion. Fixed by creating each directory explicitly (`mkdir -p css js docs/screenshots`) and verifying the zip contents. Lesson: always check the output of a generated command.

## 4. Developer workflow
**Prompt 4:** "could you just give me code to put it in vs code and at last make a link of it with github"

**Result:** Full file contents to paste into VS Code, Live Server testing steps, git commands to push to GitHub, and GitHub Pages steps for a live link.

## 5. Tracking
**Prompt 5:** "Create a spreadsheet from your last answer."

**Result:** A submission tracker (`nexus-submission-tracker.xlsx`) with status dropdowns and a completion summary.

## Features and the logic behind them
| Feature | How it works |
|---|---|
| Search and filter | Products are filtered on every keystroke by name and category |
| Cart | Stored as `{productId: quantity}` and saved to localStorage |
| Checkout | Validates name and email, creates the customer if the email is new, creates an order |
| VIP rule | If a customer's total spending reaches $200 they become VIP; a repeat customer becomes Active |
| CRM | Customers and orders are separate lists linked by customer id |
| Security | All user text is HTML-escaped before being rendered |

## My own prompts and experiments
_Add the prompts you tried yourself, what went wrong, and how you fixed it._
