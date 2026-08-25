# Repository Instructions

## Vue presentation rules

- Keep all user-facing labels, captions, tooltip text, units, currency symbols, and display-formatting expressions in Vue `<template>` blocks.
- Never define display-formatting functions such as `formatCurrency`, `formatPercentage`, or label-building functions in `<script>` blocks.
- Script code may calculate raw values only; presentation belongs in the template.
