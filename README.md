# KV AGENCY — Digital Flagship 2026

**Live website:** https://devkimfilipe.github.io/KV--Agency/ (GitHub Pages, deployed from `main` via `.github/workflows/static.yml`).

**Live form:** Formspree `https://formspree.io/f/mgakpokg`, receiving inquiries at `hello.kvstudio@gmail.com`. A real test submission was accepted on Nov 22, 2026 and recorded in the Formspree submissions inbox.


A complete, responsive, original, English-language digital studio website built with **semantic HTML5, CSS3, vanilla JavaScript, and SVG**. No frameworks, build tools, paid APIs, tracking scripts, or externally hosted fonts.

## Pages

- `index.html` — studio landing page, services, concept work, process, differentiators, contact form
- `projects/luma-home.html` — US residential cleaning **concept**
- `projects/stoneform.html` — construction/renovation **design demonstration**
- `projects/northline.html` — professional advisory **concept**
- `privacy.html` — privacy notice; review and adapt before going live
- `404.html` — fallback error page

## Fast local preview

Open `index.html` in a browser. For production-like local testing, run from the project folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`. No installation is required. SVG images are original and self-contained; there are no remote image dependencies.

## IMPORTANT — Before publication

The contact form **does not send inquiries by default**. This is intentional: a site must not pretend to deliver messages before a real endpoint is connected.

1. Create a **Formspree** account and a form on [formspree.io](https://formspree.io/), and verify the receiving address. Formspree offers a free plan subject to its current limits and terms.
2. Open `assets/js/config.js` and set `formEndpoint` to the real form endpoint, such as `https://formspree.io/f/abcdefgh` (use the actual ID from your Formspree dashboard, not this example).
3. The business contact address `hello.kvstudio@gmail.com` is already configured in `assets/js/config.js`. Check that your inbox works and can receive mail. The link appears automatically in the contact section.
4. Send a **real** test inquiry, and confirm that it arrives. Test a failed request as well. An unconfigured form displays an honest error, not a false success message.
5. Verify your company name, service descriptions, project labels, privacy notice, business terms, and email delivery workflow. Make sure you can actually deliver the described services.
6. Once a real domain is connected, change `og:image` and `twitter:image` in `index.html` and project pages to the absolute production URL, e.g. `https://your-real-domain.com/assets/og-cover.png`. Optionally add canonical URLs and `og:url` for each real page. Do not use an invented or placeholder domain in live metadata.
7. Check the site's title and description in search/social previews. Update the privacy notice if you add analytics, other processors, or change data retention practices.

Form fields: name, email, optional company, project type, estimated budget, and message. Inputs have built-in validity checks, a honeypot, an actual HTTP POST, loading state, honest failure messages, network timeout, and a success state **only after an HTTP 2xx response** from the connected form service.

Client-side honeypots are a basic filter, **not** a substitute for rate limiting or server-side anti-spam measures; rely on Formspree's safeguards and check your incoming messages periodically.

## Publish on GitHub Pages

1. Create a GitHub repository and upload all files, preserving the directory layout.
2. Under **Settings → Pages**, choose **Deploy from a branch**, `main` and `/ (root)`.
3. The published URL will be similar to `https://USERNAME.github.io/REPOSITORY/`. All internal paths are relative and work from subdirectories.
4. For custom domain, configure DNS as GitHub recommends, then enable **Enforce HTTPS**.
5. **Note:** standard GitHub Pages hosting is for public repositories in many account plans. If you need to keep the source repository private, confirm that your GitHub plan supports private repo Pages publishing, or use Vercel.

## Publish on Vercel

1. Import the GitHub repository into Vercel or upload the static site project.
2. Framework Preset: **Other**. Build command: blank. Output directory: root (default static files).
3. Deploy, attach your domain, and ensure HTTPS is enabled.
4. Update absolute Open Graph image URLs once the real domain is ready.

## Performance/accessibility

- Semantic landmarks, single H1 per page, skip link, labelled form controls
- Accessible responsive menu, Escape close, focus containment and native keyboard links
- `prefers-reduced-motion` support, Intersection Observer, lightweight scroll indicator
- Self-hosted, optimized SVG illustrations with image dimensions and lazy-loaded portfolio assets
- Open Graph share graphic and favicon, no third-party font or library requests
- Responsive layouts down to 320px; mobile navigation; explicit hover/focus/form states

## Project notes

All case studies and mockups are intentionally labeled **Concept Project** or **Design Demonstration**. They do not represent clients, commissioned work, testimonials, or verified business results. Brand names are illustrative, not claims of trademark registration.

Everything in this folder can be edited using VS Code. The visual system is in `assets/css/styles.css`; behavior is in `assets/js/main.js`; contact integration is in `assets/js/config.js`.

© 2026 KV AGENCY. Original demo graphics and original website implementation.
