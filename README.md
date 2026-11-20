# Argon website

The production workflow in `.github/workflows/hourly-deploy.yml` refreshes data,
builds the site, and publishes `dist-production` to the `deployed-production`
branch through `build/deploy.mjs`. DigitalOcean App Platform serves the published
files. Its live app specification is managed outside this repository.

## The Better Stablecoin explainer

Vite prerenders the existing `/why-its-better` Vue route into
`why-its-better/index.html` on every build. The HTML includes the existing page
content, its styles, and its title, description, and canonical URL. Vue hydrates
this HTML and starts the existing scroll animations. The route does not need
network data, so a failed network-basics request cannot hide its content.

The production host must also have the two rules in
`.do/explainer-ingress.json`. This file is an **app specification fragment**.
It is not a complete specification, and committing it does not change the host.
When preparing deployment:

1. Export the current DigitalOcean app specification.
2. Replace `website` in the fragment with the existing static-site component's
   name if it differs.
3. Add the fragment's two rules to the existing `ingress.rules`, ahead of the
   general `/` rule. Keep the other routes and app settings.
4. Keep the existing error-document behavior. Do not set
   `catchall_document: index.html`, because unknown URLs must keep HTTP 404.
5. Review the resulting specification and apply it with the planned deployment.

The exact `/why-its-better` rule internally rewrites to the generated HTML.
The exact `/why-its-better/` rule returns HTTP 301 to `/why-its-better`.
Neither rule matches unknown paths or changes `/trade/`.

DigitalOcean documents these fields in its
[app specification reference](https://docs.digitalocean.com/products/app-platform/reference/app-spec/#ingress)
and explains the control-panel options in
[URL rewrites and redirects](https://docs.digitalocean.com/products/app-platform/how-to/url-rewrites/).

## Verify the production build

Run `yarn build:production`, then `yarn verify:production`.
The verifier serves the built files locally with the exact rules from the
DigitalOcean fragment. It checks direct GETs, the permanent redirect, the
prerendered copy and metadata without JavaScript, stylesheet availability,
unknown-URL 404s, and the trade page's `noindex` directive. This is a local check
of the production output and proposed host rules; it does not deploy or prove
that the live DigitalOcean specification has been updated.

For browser checks, run `yarn preview:production`, open the printed local URL,
and follow the homepage's explainer link. Refresh the explainer and test with
`/data/argonBasics.mainnet.json` blocked. Its heading and copy must remain
readable. Check back/forward navigation and the page title as well.

After deployment, repeat the HTTP checks against `https://argon.network`, then
inspect the canonical URL in Google Search Console and request indexing.
