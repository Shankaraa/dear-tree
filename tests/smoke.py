"""Smoke test: every screen of the demo loads without a JavaScript error.

Serves the production build (dist/) through Playwright request routing, so no web server is needed.

    npm ci && npm run build
    pip install playwright && playwright install chromium
    python tests/smoke.py            # CI / any machine with Playwright's Chromium
    BROWSER_CHANNEL=chrome python tests/smoke.py   # use installed Chrome instead
"""
import mimetypes, os, pathlib, sys
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent / "dist"
BASE = "http://dear-tree.test/"


def serve(route):
    rel = route.request.url[len(BASE):].split("?")[0] or "index.html"
    f = ROOT / rel
    if f.is_file():
        ctype = mimetypes.guess_type(f.name)[0] or "application/octet-stream"
        route.fulfill(status=200, body=f.read_bytes(), headers={"content-type": ctype})
    else:
        route.fulfill(status=404, body="")


def main():
    if not (ROOT / "index.html").is_file():
        sys.exit("dist/ not found. Run `npm ci && npm run build` first.")
    channel = os.environ.get("BROWSER_CHANNEL")
    failures = []
    with sync_playwright() as p:
        browser = p.chromium.launch(channel=channel) if channel else p.chromium.launch()
        ctx = browser.new_context(viewport={"width": 460, "height": 940})
        ctx.route(BASE + "**", serve)
        page = ctx.new_page()
        errors = []
        page.on("pageerror", lambda e: errors.append(str(e)))

        def load(query=""):
            page.goto(BASE + "index.html?clean=1&" + query)
            page.wait_for_selector("#app-root", timeout=30000)
            page.wait_for_timeout(800)

        def check(name, fn):
            before = len(errors)
            try:
                fn()
            except Exception as e:  # noqa: BLE001
                failures.append(f"{name}: {e}")
            if len(errors) > before:
                failures.append(f"{name}: page error: {errors[-1]}")
            print(("FAIL " if any(x.startswith(name) for x in failures) else "ok   ") + name)

        check("onboarding", lambda: load())
        check("garden", lambda: load("skip=1"))
        for tab in ("Plant", "Registry", "You"):
            def go(tab=tab):
                load("skip=1")
                page.get_by_role("button", name=tab, exact=True).click()
                page.wait_for_timeout(500)
            check(f"tab {tab}", go)

        def tree():
            load("skip=1&month=14")
            page.locator("button", has_text="Pongamia pinnata").first.click()
            page.wait_for_timeout(500)
            assert page.get_by_text("Growth", exact=True).count() > 0, "tree page did not open"
        check("tree page", tree)

        def ceremony():
            load("skip=1&month=24")
            page.locator("button", has_text="Pongamia pinnata").first.click()
            page.wait_for_timeout(500)
            page.get_by_text("Your tree name is ready", exact=True).click()
            page.wait_for_timeout(500)
            assert page.get_by_role("dialog", name="Tag ceremony").count() == 1, "ceremony dialog missing"
            page.keyboard.press("Escape")
            page.wait_for_timeout(300)
            assert page.get_by_role("dialog").count() == 0, "Escape did not close the dialog"
        check("tag ceremony dialog", ceremony)

        check("dark mode", lambda: load("skip=1&dark=1"))
        browser.close()

    if failures:
        print("\n" + "\n".join(failures))
        sys.exit(1)
    print("\nAll smoke checks passed.")


if __name__ == "__main__":
    main()
