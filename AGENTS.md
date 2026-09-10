# Repository Instructions

## Vue presentation rules

- Keep all user-facing labels, captions, tooltip text, units, currency symbols, and display-formatting expressions in Vue `<template>` blocks.
- Never define display-formatting functions such as `formatCurrency`, `formatPercentage`, or label-building functions in `<script>` blocks.
- Script code may calculate raw values only; presentation belongs in the template.

## Vue formatting rules

- Keep Vue opening tags with a single attribute on one physical line, even when the line exceeds Prettier's configured width.
- Do not reformat intentional single-line opening tags into three lines.

## Function formatting rules

- Never write a function declaration on a single line, even when its body contains only one statement. Put the body and closing brace on separate lines.
- Leave a blank line before and after each function declaration, except at the beginning or end of a file.

```ts
function interpolate(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}
```
