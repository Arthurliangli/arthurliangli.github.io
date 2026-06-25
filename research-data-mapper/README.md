# Empirical Feasibility Mapper

A static prototype for mapping a business research question into constructs, public datasets, restricted benchmark datasets, proxy ideas, and empirical design suggestions.

## Use locally

Open `index.html` in a browser, or serve the folder with any simple static server.

## Publish on GitHub Pages

Copy the full `research-data-mapper` folder into the GitHub Pages repository and link to:

```text
https://arthurliangli.github.io/research-data-mapper/
```

The prototype has no build step and no external dependencies.

## Real-time behavior

The current static version updates recommendations instantly in the browser as the user types.

Dataset entries live in `datasets.json`. A scheduled GitHub Action runs monthly, checks whether each dataset and documentation URL is reachable, updates `reviewedAt`, and writes source-check metadata back to the catalog. Dataset descriptions and scholarly judgments remain human-curated.
