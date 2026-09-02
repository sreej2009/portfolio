# Sree — Creative Developer Portfolio

Live: https://sreej2009.github.io/portfolio/

A premium, scroll-driven 3D portfolio built with React, TypeScript, Vite, React Three Fiber, GSAP/ScrollTrigger and Lenis. One persistent WebGL canvas evolves through every section — an orbital chrome-and-glass sculpture that reshapes into a constellation, a project gallery, and a timeline as you scroll.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # output in dist/
npm run preview # serve the production build locally
```

## Deploy (GitHub Pages)

The site is deployed to the `gh-pages` branch of this repo and served at the URL above. To redeploy after making changes:

```bash
rm -rf dist
GITHUB_PAGES=true npm run build   # builds with the /portfolio/ base path
cd dist
git init -q
git add -A
git commit -q -m "Deploy"
git branch -M gh-pages
git remote add origin https://github.com/sreej2009/portfolio.git
git push -f origin gh-pages
cd ..
rm -rf dist/.git
```

`GITHUB_PAGES=true` switches the Vite `base` and the app's data (`src/data/*.ts`) is the place to edit projects, skills, experience and copy — the components read from there.
