<div align="center">

# Dear Tree

**Plant a tree. Name it for someone you love.**

<a href="https://shankaraa.github.io/dear-tree/"><img src="https://img.shields.io/badge/▶%20Try%20the%20live%20demo-2d6a3e?style=for-the-badge" alt="Try the live demo"/></a>

[![License: MIT](https://img.shields.io/badge/License-MIT-2d6a3e.svg)](LICENSE)
![Status](https://img.shields.io/badge/status-early%20prototype-e3a83f)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-2d6a3e.svg)](CONTRIBUTING.md)
[![Good first issues](https://img.shields.io/github/issues/Shankaraa/dear-tree/good%20first%20issue?color=2d6a3e&label=good%20first%20issues)](https://github.com/Shankaraa/dear-tree/labels/good%20first%20issue)

<br/>

> **A concept, not a service yet.** Dear Tree is an open-source prototype. No real trees are being planted, no payments are taken, and the data in the demo is made up. We're building toward a first real pilot, and you're invited.

<img src="docs/hero.png" alt="Four Dear Tree screens: onboarding, your garden, a tree's page, and the naming ceremony" width="100%"/>

</div>

## Why this exists

Most of us want to leave something good behind for the people we love. We usually do it with a gift, a photo, a post. They fade.

A tree doesn't. If it survives the first two years, it will probably outlive everyone who planted it.

Dear Tree is a simple idea: **you don't need to own land to dedicate a tree.** The idea: you support a sapling on public land, a local steward looks after it, and you follow it month by month. If it is still standing after 24 months, it gets a permanent tag with a name on it. (You support the tree and its care. You don't get legal ownership of the tree or the land.)

*For Arka, born 14 March 2024.*
*In memory of Lakshmi, 1948–2022.*
*For the 4B teachers.*

In the finished service, each tree would get a public registry ID, so anyone walking past could scan its tag and read who it is for.

The point isn't the number of trees planted. It's the number that **survive**. (In one CAG audit of Uttarakhand's compensatory plantations, average survival was 33.5% against a 60-65% target. [Sources and caveats](docs/why-survival.md).) That's why the whole app is built around the two-year journey instead of the moment you pay.

## Where it is now

This is an **early, clickable prototype**: real screens and real flows, with no backend yet. It's built as a design and product sketch that we want to turn into something real, together.

What you can click through today:

| | |
|---|---|
| **Onboarding** | The idea in four short screens |
| **Garden** | Your trees, their age, and how the rest of their cohort is doing |
| **Plant** | Choose a site, a species, who it's for, and a tier |
| **Tree page** | Timeline, steward check-ins, location, dedication |
| **Tag ceremony** | The day a tree makes it to 24 months |
| **Registry** | A public directory of every named tree |
| **Groups and CSR** | Schools, classes and companies planting together |

On a desktop, tap **Tweaks** (bottom right) to switch between dark and light or scrub a tree from month 1 to month 24.

<table>
<tr>
<td width="34%" valign="top" align="center">
<img src="docs/demo.gif" alt="Walking through Dear Tree: from the garden to a tree's page to the naming ceremony" width="100%"/>
<br/><sub>From planting to the day it gets its name</sub>
</td>
<td width="66%" valign="top" align="center">
<img src="docs/screens-light.png" alt="Plant, Registry and Profile screens" width="100%"/>
<br/><sub>Pick a spot · the public registry · your profile</sub>
<br/><br/>
<img src="docs/screens-dark.png" alt="Garden and tree page in dark mode" width="72%"/>
<br/><sub>Dark mode (the default)</sub>
</td>
</tr>
</table>

Place names in the sample data (parks, bus stands) are real locations used for illustration only. There are no partnerships with any of them.

**Shareable demo links:** add `?skip=1` to jump past onboarding, `&month=24` to see a tree on naming day, `&dark=0` for light mode (dark is the default). For example: [naming day in light mode](https://shankaraa.github.io/dear-tree/?skip=1&month=24&dark=0).

## Run it locally

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
git clone https://github.com/Shankaraa/dear-tree.git
cd dear-tree
npm install
npm run dev
```

Open the address Vite prints (usually <http://localhost:5173>). Edits show up instantly.

## Come build it with us

This is open to anyone who cares about climate and wants to work on something real. **College students, first-time contributors, designers, ecologists, people who organise plantation drives on weekends: all welcome.** You don't need to be an expert. You need to be curious and willing to ship small things.

Some ways in:

- **Write code.** Pick an issue labelled [`good first issue`](https://github.com/Shankaraa/dear-tree/labels/good%20first%20issue).
- **Design.** Accessibility, illustrations, regional languages, the tag itself.
- **Know trees?** Help us get species, seasons and survival data right. This matters more than any feature.
- **Run a plantation group or NGO?** Tell us how stewardship actually works on the ground. Open a discussion.
- **Use it in a class or hackathon.** It's MIT licensed. Fork it, remix it, take it to your city.

Read [CONTRIBUTING.md](CONTRIBUTING.md) to get started. It's short.

Curious how stewardship works on the ground? Read the draft [steward guide](docs/steward-guide.md), and help us improve it.

## Where AI can genuinely help

We don't want "AI" as a sticker. These are problems where it can actually make trees survive:

- **Survival check from a photo.** A steward uploads a monthly photo, and a model flags stress, disease or a dead sapling early enough to replant.
- **Right tree, right place.** Recommend native species for a site using soil, rainfall and nearby survival data, rather than whatever is cheapest in the nursery.
- **Satellite canopy tracking (open question).** Can free imagery like Sentinel-2 (10 m pixels) show whether a *site* is greening over time? Single saplings are far too small to see, so this is about sites and cohorts, and we expect real limits. Scoping help welcome.
- **Honest reporting.** Turn raw survival data into plain-language updates for families, and into audit-ready reports for CSR funders, without inflating anything.
- **Languages.** Dedications and steward updates in Tamil, Hindi, Kannada and beyond.

If you work on climate ML, remote sensing or computer vision, we would love your help scoping any of these. Start a discussion.

## Roadmap

- [x] Clickable prototype of the full journey
- [x] Vite build instead of in-browser Babel (fast first load)
- [ ] Backend and public registry API
- [ ] Tamper-evident registry log. Exploring options, none chosen yet: hash-chained entries with published exports, signed timestamps/anchoring of registry hashes, or a public blockchain. No chain code exists today, and no tokens or NFTs are planned. A blockchain only goes in if it clearly beats the simpler options.
- [ ] UPI payments, including monthly care by UPI AutoPay released only while a tree is alive (see [the concept note](docs/upi-concept.md))
- [ ] Steward app: monthly photo check-ins
- [ ] QR / NFC tag scanning
- [ ] First pilot with a real plantation partner
- [ ] AI survival checks from steward photos

## Project layout

```
index.html          entry point
app.jsx             app shell and navigation
data.jsx            sample people, trees and planting sites (all fictional)
ui.jsx, icons.jsx   shared components
tokens.css          colours, type, spacing, light/dark
screens/            onboarding, garden, plant, ceremony, registry, tree-detail, profile
main.jsx, globals.js  Vite entry and the React globals the screens share
vite.config.js      build config (output goes to dist/)
```

## The people growing this

<a href="https://github.com/Shankaraa/dear-tree/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Shankaraa/dear-tree" alt="Contributors"/>
</a>

Your face goes here after your first merged PR. 🌱

## License

[MIT](LICENSE). Use it, fork it, plant something.

All people, organisations and trees in the sample data are made up.

This is a personal open-source project. It is not affiliated with or endorsed by any employer or organisation.
