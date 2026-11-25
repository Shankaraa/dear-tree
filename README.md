<div align="center">

<img src="docs/hero.png" alt="Named Trees onboarding screen" width="300"/>

# 🌳 Named Trees

**Plant a tree. Name it for someone you love.**

You don't need to own land to own a tree. Fund one on public land, look after it for two years, and if it lives it gets a permanent tag with a name on it.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![Status](https://img.shields.io/badge/status-prototype-orange)
![React](https://img.shields.io/badge/React-18-61dafb)

</div>

---

## What is it?

Named Trees is a mobile app concept for dedicating real trees to real people: a newborn, a grandmother's memory, a friend's birthday. Each tree gets a public registry ID (for example `MYT-TN-CHN-ADY-0248`), a guardian, an on-the-ground steward, and a 24-month care journey.

This repo is a **clickable, high-fidelity prototype** of the full experience, built in React and rendered inside an iOS frame.

## Features

- **Onboarding**: a four-step intro to the idea
- **Garden**: your trees at a glance, with month-by-month survival progress (e.g. 14/24)
- **Plant flow**: choose a species, a site, a dedication (kid, memorial, gift, self) and a tier
- **Tag ceremony**: the moment a surviving tree receives its permanent tag
- **Registry**: a public, scannable directory of named trees
- **Tree detail**: timeline, steward updates, location and dedication
- **Profile and CSR mode**: personal view plus a corporate/group planting view
- **Tweaks panel**: switch light/dark theme, persona, and the tree's age (1 to 24 months) live

## Run it

No build step. Everything, including React and Babel, is vendored.

```bash
git clone https://github.com/Shankaraa/named-trees.git
cd named-trees
python -m http.server 8000
```

Then open <http://localhost:8000/Named%20Trees.html>.

> A local server is required because the JSX files are loaded by Babel in the browser. Opening the file directly with `file://` will not work.

## Project structure

```
Named Trees.html   entry point
app.jsx            app shell, navigation, tweaks wiring
data.jsx           sample users, trees and species
ui.jsx / icons.jsx shared components and icon set
tokens.css         design tokens (colour, type, spacing, light/dark)
screens/           onboarding, garden, plant, ceremony, registry, tree-detail, profile
vendor/            React, ReactDOM, Babel (offline)
```

## Roadmap

- [ ] Real backend and registry API
- [ ] Payments and partner NGO integrations
- [ ] QR/NFC tag scanning
- [ ] Production build (Vite) replacing in-browser Babel
- [ ] Android and iOS native shells

## Contributing

Issues and pull requests are welcome. Good first contributions: new species data, accessibility fixes, translations, and screens for the roadmap items above.

1. Fork the repo
2. Create a branch: `git checkout -b feature/my-idea`
3. Commit and open a pull request

## License

[MIT](LICENSE) © 2026 Shankaraa
