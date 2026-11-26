# Contributing to Dear Tree

Thanks for being here. Whether this is your first pull request or your hundredth, you're welcome.

## Getting set up

```bash
git clone https://github.com/<your-username>/dear-tree.git
cd dear-tree
npm install
npm run dev
```

You need Node.js 20 or newer. Open the address Vite prints (usually <http://localhost:5173>). Edits to any `.jsx` file show up instantly.

The screens share some globals (`useState`, `ICON`, `Pill`, ...) that `globals.js` and each file's `window.X = ...` lines provide. In new code you can use normal `import` and `export`; just add the file to `main.jsx`.

## Finding something to work on

- [`good first issue`](https://github.com/Shankaraa/dear-tree/labels/good%20first%20issue): small, well-scoped, good for a first PR
- [`help wanted`](https://github.com/Shankaraa/dear-tree/labels/help%20wanted): bigger pieces we'd love someone to own
- [`ai-for-good`](https://github.com/Shankaraa/dear-tree/labels/ai-for-good): ML, computer vision and remote sensing work
- Have your own idea? Open an issue first so we can talk it through before you spend a weekend on it.

Comment on an issue to claim it, so two people don't build the same thing.

## Making a change

1. Fork the repo and create a branch: `git checkout -b fix/garden-card-overlap`
2. Keep the change focused. One fix or feature per PR.
3. Check it in light **and** dark mode, using the tweaks panel.
4. Run the smoke test: `npm run build`, then `pip install playwright && playwright install chromium`, then `python tests/smoke.py`. It also runs automatically on every pull request.
5. Open a pull request saying what you changed and why. A screenshot helps a lot for UI changes.

## Style

- Use the design tokens in `tokens.css` rather than hard-coded colours.
- Match the existing component patterns in `ui.jsx`.
- Keep the copy warm and plain. We're talking to families, not investors.

## Not a coder?

Some of the most useful contributions here aren't code:

- Species and survival knowledge from foresters, ecologists and plantation volunteers
- Translations
- Accessibility reviews
- Real stories about how tree stewardship works (or fails) on the ground

Open an issue or a discussion. All of it counts.

## Be kind

Everyone here is expected to follow our [Code of Conduct](CODE_OF_CONDUCT.md).
