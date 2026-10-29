# Documentation review

From the website directory, run:

```sh
yarn docs:review --base HEAD
```

Open the printed local URL. The viewer compares documentation in your working
directory (including staged edits and new pages) with the selected Git commit.
Whitepapers are excluded. It shows complete pages with their existing links,
emphasis, diagrams, and interactive components. Use **Original**, **Track
changes**, and **Revised** to switch views. Edits refresh as you save files.

`HEAD` means the latest commit when the tool starts. To review changes already
committed, choose an earlier commit, tag, or branch, for example:

```sh
yarn docs:review --base HEAD~1
```

Stop the server with Ctrl+C. It uses a separate Vite server bound to 127.0.0.1,
starting at port 5180; an available port is chosen if that port is occupied.
Use `--port 5190` to choose another starting port. It does not modify your docs,
Git index, production routes, or Vite configuration.

## Save and reopen a review

Capture both sides of a comparison with a name:

```sh
yarn docs:review --base HEAD --save my-review
```

This saves a snapshot immediately, then opens a live review. Later edits do not
change that snapshot. Reuse `--save my-review` to deliberately replace it.
To reopen the saved document text, even after later edits or commits:

```sh
yarn docs:review --session my-review
```

Saved sessions live in `.docs-review/sessions/`. That directory is ignored by Git;
copy it separately if you want the review history on another machine. The tool
itself lives in `tools/` and can be versioned with the repository. Sessions use
relative paths, so they also work in another checkout of this website.

This writing review was preserved as:

```sh
yarn docs:review --session 2026-10-28-final-batch
```

## Scope and limitations

- Text and link changes are marked by paragraph, heading, list item, or table
  cell. Added/deleted paragraphs are supported. Moved content appears as a
  removal and addition. Repeated passages are matched by position and context.
- The original view uses the baseline template; the revised view uses the new
  template. Both use the checkout's current application code and styles. Saved
  sessions preserve document source, not an entire historic app or its assets.
- Layout, classes, calculations, and scripts are not presented as text redlines.
  Review their Git diff separately. Formulas remain rendered in context.
- Entire added pages are shown; their original view is empty. Entire deleted
  pages are listed with an explanation because their routes no longer mount.
- The viewer displays a parse/compilation error instead of guessing if it cannot
  build a valid comparison. This tool is intended for trusted local Vue docs.

Run the comparison checks with:

```sh
node --test tools/docs-review.test.mjs
```
