import { readFile, writeFile } from "node:fs/promises";

const catalogPath = new URL("../datasets.json", import.meta.url);
const today = new Date().toISOString().slice(0, 10);
const catalog = JSON.parse(await readFile(catalogPath, "utf8"));

async function checkUrl(url) {
  const result = {
    url,
    ok: false,
    status: null,
    checkedAt: today
  };

  try {
    let response = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      headers: {
        "user-agent": "ArthurLiangLi-research-data-mapper/1.0"
      }
    });

    if (response.status === 405 || response.status === 403) {
      response = await fetch(url, {
        method: "GET",
        redirect: "follow",
        headers: {
          "user-agent": "ArthurLiangLi-research-data-mapper/1.0"
        }
      });
    }

    result.ok = response.ok;
    result.status = response.status;
  } catch (error) {
    result.error = error.message;
  }

  return result;
}

for (const dataset of catalog.datasets) {
  const urls = [
    ["Dataset", dataset.url],
    ["Docs/API", dataset.api]
  ].filter(([, url]) => Boolean(url));

  dataset.sourceStatus = [];
  for (const [label, url] of urls) {
    dataset.sourceStatus.push({
      label,
      ...(await checkUrl(url))
    });
  }
}

catalog.reviewedAt = today;
catalog.updateCadence = "Monthly GitHub Action source checks; substantive dataset descriptions remain human-curated.";

await writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);
