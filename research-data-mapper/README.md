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

The current static version updates recommendations instantly in the browser as the user types. Automatic source-catalog refresh would require a backend endpoint or scheduled GitHub Action that periodically checks public documentation/API endpoints and rebuilds the dataset catalog.
