const DATASETS = [
  {
    name: "SEC EDGAR Company Filings",
    access: "open",
    url: "https://www.sec.gov/edgar/search/",
    api: "https://www.sec.gov/search-filings/edgar-application-programming-interfaces",
    coverage: "U.S. public firms; 10-K, 10-Q, 8-K, proxy statements, ownership filings",
    unit: "firm-year, filing, executive disclosure",
    topics: ["ceo", "aging", "age", "executive", "board", "firm", "public firm", "financial", "risk", "text", "disclosure", "governance", "strategy", "geographic", "segment", "expansion"],
    constructs: ["executive characteristics", "firm performance", "risk disclosure", "corporate governance", "strategic change"],
    caveat: "Executive age and compensation are often in proxy filings, but extraction requires text parsing or a third-party parser."
  },
  {
    name: "World Bank Open Data / WDI",
    access: "open",
    url: "https://data.worldbank.org/",
    api: "https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information",
    coverage: "Country-year development, trade, macroeconomic, demographic, infrastructure, and education indicators",
    unit: "country-year",
    topics: ["country", "development", "gdp", "trade", "market", "distance", "international", "institution", "emerging", "growth", "expansion", "geographic"],
    constructs: ["market size", "economic development", "trade openness", "infrastructure", "human capital"],
    caveat: "Excellent for country controls, but rarely enough for firm-level identification by itself."
  },
  {
    name: "Worldwide Governance Indicators",
    access: "open",
    url: "https://www.worldbank.org/en/publication/worldwide-governance-indicators",
    api: "https://www.govindicators.org/",
    coverage: "Governance indicators for 200+ economies from 1996 onward",
    unit: "country-year",
    topics: ["institution", "governance", "regulatory", "rule of law", "corruption", "political", "country", "international", "mne", "host"],
    constructs: ["institutional quality", "regulatory quality", "rule of law", "control of corruption", "political stability"],
    caveat: "Useful as country-level institutional context; avoid overclaiming firm-level mechanisms."
  },
  {
    name: "UN Comtrade",
    access: "open",
    url: "https://comtradeplus.un.org/",
    api: "https://comtradedeveloper.un.org/",
    coverage: "International merchandise trade flows by country, partner, product, and year",
    unit: "country-product-year",
    topics: ["trade", "export", "import", "international", "market", "country", "product", "global value chain", "tariff", "multinational", "expansion", "foreign"],
    constructs: ["export intensity", "trade dependence", "market exposure", "bilateral trade flows"],
    caveat: "Best for country or product-market exposure; firm-level linkage usually needs another dataset."
  },
  {
    name: "OECD Data Explorer",
    access: "open",
    url: "https://data-explorer.oecd.org/",
    api: "https://gitlab.algobank.oecd.org/public-documentation/dotstat-migration/-/raw/main/OECD_Data_API_documentation.pdf",
    coverage: "Country and industry indicators across OECD and partner economies",
    unit: "country-year, industry-year",
    topics: ["oecd", "productivity", "innovation", "education", "labor", "industry", "country", "international", "expansion", "foreign"],
    constructs: ["productivity", "R&D intensity", "labor market conditions", "industry structure"],
    caveat: "Coverage is strongest for OECD economies and harmonized macro/industry indicators."
  },
  {
    name: "OpenAlex",
    access: "open",
    url: "https://openalex.org/",
    api: "https://developers.openalex.org/",
    coverage: "Open scholarly works, authors, institutions, concepts, citations, and venues",
    unit: "paper, author, institution, topic-year",
    topics: ["publication", "science", "innovation", "innovative", "university", "scholar", "citation", "knowledge", "research", "patent", "collaboration", "academic"],
    constructs: ["knowledge production", "scientific collaboration", "research impact", "topic emergence"],
    caveat: "Strong for bibliometric designs; author and institution disambiguation still needs validation."
  },
  {
    name: "Crossref Metadata",
    access: "open",
    url: "https://www.crossref.org/services/metadata-retrieval/",
    api: "https://api.crossref.org/",
    coverage: "DOI metadata for scholarly publications, funders, references, and publishers",
    unit: "publication",
    topics: ["doi", "publication", "journal", "article", "citation", "research", "metadata"],
    constructs: ["publication output", "journal placement", "research diffusion"],
    caveat: "Metadata completeness varies by publisher and field."
  },
  {
    name: "USPTO PatentsView",
    access: "open",
    url: "https://patentsview.org/",
    api: "https://patentsview.org/apis/purpose",
    coverage: "U.S. patent grants, inventors, assignees, locations, citations, and technology classes",
    unit: "patent, inventor, assignee-year",
    topics: ["patent", "innovation", "innovative", "inventor", "technology", "r&d", "knowledge", "citation", "startup"],
    constructs: ["innovation output", "technological distance", "inventor mobility", "knowledge recombination"],
    caveat: "Assignee matching to firms is often the hard part."
  },
  {
    name: "GDELT Project",
    access: "open",
    url: "https://www.gdeltproject.org/",
    api: "https://www.gdeltproject.org/data.html",
    coverage: "Global news events, tone, themes, entities, and media attention",
    unit: "event, article, location-day",
    topics: ["news", "media", "event", "political", "crisis", "risk", "sentiment", "country", "conflict", "attention"],
    constructs: ["media attention", "political risk", "public sentiment", "crisis exposure"],
    caveat: "Media-based measures need careful source and language bias checks."
  },
  {
    name: "FRED",
    access: "open",
    url: "https://fred.stlouisfed.org/",
    api: "https://fred.stlouisfed.org/docs/api/fred/",
    coverage: "Macroeconomic and financial time series from the Federal Reserve Bank of St. Louis",
    unit: "time series",
    topics: ["macro", "interest", "inflation", "finance", "economy", "labor", "market", "shock"],
    constructs: ["macroeconomic conditions", "financial conditions", "monetary shocks"],
    caveat: "Usually a context/control layer rather than the primary business dataset."
  },
  {
    name: "U.S. Census Business Dynamics Statistics",
    access: "open",
    url: "https://www.census.gov/programs-surveys/bds.html",
    api: "https://api.census.gov/data.html",
    coverage: "Firm and establishment dynamics by firm age, size, sector, geography, and year",
    unit: "industry-region-year",
    topics: ["entrepreneurship", "firm age", "job creation", "establishment", "region", "industry", "startup", "employment"],
    constructs: ["entrepreneurial activity", "firm growth", "job creation", "regional dynamism"],
    caveat: "Aggregated public tables protect confidentiality; microdata require restricted access."
  },
  {
    name: "BLS Public Data",
    access: "open",
    url: "https://www.bls.gov/data/",
    api: "https://www.bls.gov/developers/",
    coverage: "Labor, employment, wages, occupations, prices, productivity, and industry series",
    unit: "occupation-year, industry-year, region-year",
    topics: ["labor", "wage", "employment", "occupation", "skill", "industry", "region", "productivity"],
    constructs: ["labor market tightness", "skill demand", "wage pressure", "employment shocks"],
    caveat: "Public data are usually aggregated; worker- or firm-level analyses require other sources."
  },
  {
    name: "WRDS: S&P Compustat + Executive Compensation",
    access: "restricted",
    url: "https://wrds-www.wharton.upenn.edu/pages/about/data-vendors/sp-global-market-intelligence/",
    api: "https://wrds-www.wharton.upenn.edu/pages/about/data-vendors/sp-global-market-intelligence/",
    coverage: "S&P Global Market Intelligence products on WRDS, including Compustat North America, Compustat Global, Compustat Historical Segments, Capital IQ People Intelligence, and S&P Compustat Executive Compensation.",
    unit: "firm-year, executive-year, security-day",
    freshness: "WRDS lists Compustat daily products updated June 24, 2026; Executive Compensation updated monthly, last listed June 4, 2026.",
    topics: ["ceo", "aging", "age", "executive", "compensation", "firm", "performance", "public firm", "finance", "governance", "board", "segment", "geographic", "scope"],
    constructs: ["CEO age", "executive compensation", "firm financials", "geographic segments", "market valuation"],
    caveat: "Institutional subscription required. CRSP is a separate WRDS vendor, so use it only when stock returns or PERMNO/PERMCO linking are central."
  },
  {
    name: "Moody's Orbis / Bureau van Dijk",
    access: "restricted",
    url: "https://www.moodys.com/web/en/us/capabilities/company-reference-data/orbis.html",
    api: "https://wrds-www.wharton.upenn.edu/pages/about/data-vendors/bureau-van-dijk-bvd/",
    coverage: "Global company reference data from Moody's/Bureau van Dijk, covering listed and private companies, ownership links, corporate hierarchies, firmographics, financials, M&A, and country-specific products.",
    unit: "firm-year, subsidiary-year, ownership link",
    freshness: "Moody's describes Orbis as covering 625+ million entities; WRDS lists Orbis company products as annual updates, with 2025 refresh dates on current WRDS pages.",
    topics: ["subsidiary", "mne", "foreign", "ownership", "international", "location", "affiliate", "firm", "country", "geographic", "scope", "expansion", "multinational", "private company"],
    constructs: ["foreign subsidiary network", "corporate ownership", "geographic scope", "affiliate presence", "private company financials"],
    caveat: "Still the benchmark for global subsidiary and ownership work, but coverage varies by country disclosure rules and subscription package."
  },
  {
    name: "BoardEx",
    access: "restricted",
    url: "https://boardex.com/",
    api: "https://wrds-www.wharton.upenn.edu/pages/about/data-vendors/boardex/",
    coverage: "Executive and board-member biographies, age, gender, positions, education, compensation, stock holdings, and professional network data across North America, Europe, UK, and Rest of World modules on WRDS.",
    unit: "person-year, board-year, firm-year",
    freshness: "WRDS currently describes BoardEx as 1.7 million executives and board members across 2.2 million organizations; regional modules are updated weekly.",
    topics: ["board", "director", "ceo", "aging", "age", "executive", "network", "governance", "career", "succession", "education", "experience"],
    constructs: ["executive experience", "director networks", "CEO succession", "board composition", "managerial human capital"],
    caveat: "High-value for leadership and governance studies, but requires institutional access and careful person-firm matching."
  }
];

const PROMPTS = [
  "Do aging CEOs reduce the geographic scope of multinational expansion?",
  "Do firms expand abroad faster after appointing a foreign-born CEO?",
  "Does political risk in host countries change subsidiary control decisions?",
  "Do universities become more innovative after hiring internationally connected scholars?",
  "Does local labor market tightness push firms to adopt AI more quickly?"
];

const STOPWORDS = new Set([
  "the", "and", "for", "with", "from", "that", "this", "does", "what", "when", "where", "how",
  "are", "after", "more", "less", "into", "using", "than", "their", "have", "has", "can",
  "firms", "firm", "business", "research", "question", "idea", "ideas", "test", "using"
]);

const CONSTRUCT_RULES = [
  { label: "CEO / executive characteristics", terms: ["ceo", "executive", "manager", "leader", "director", "board", "succession", "age", "aging"] },
  { label: "Internationalization / MNE scope", terms: ["mne", "multinational", "foreign", "subsidiary", "international", "abroad", "geographic", "country", "host"] },
  { label: "Institutions / political risk", terms: ["institution", "governance", "political", "risk", "corruption", "regulatory", "rule of law"] },
  { label: "Innovation / knowledge", terms: ["innovation", "innovative", "patent", "r&d", "knowledge", "science", "publication", "citation", "technology", "scholar", "university", "ai"] },
  { label: "Firm performance / finance", terms: ["performance", "profit", "financial", "stock", "valuation", "market", "sales", "growth"] },
  { label: "Labor / human capital", terms: ["labor", "employee", "wage", "skill", "occupation", "human capital", "hiring"] },
  { label: "Media / attention / sentiment", terms: ["media", "news", "sentiment", "attention", "crisis", "event"] }
];

const DEFAULT_RESULT = {
  constructs: ["Research question", "Potential dependent variable", "Potential independent variable"],
  frictions: [
    "Clarify unit of analysis before choosing data: firm-year, country-year, person-year, or event.",
    "Look for an observable proxy for each theoretical construct.",
    "Separate open public data from restricted benchmark datasets."
  ],
  proxies: [
    "Dependent variable: observable outcome closest to the theoretical mechanism.",
    "Independent variable: time-varying construct or shock that can be linked to the outcome.",
    "Controls: industry, year, country, firm size, prior performance, and macro context where relevant."
  ],
  designs: [
    "Start with a panel design if repeated observations are available.",
    "Use event study or difference-in-differences only when there is a credible timing shock.",
    "Add robustness checks using alternative proxies and sample restrictions."
  ]
};

const PAPER_LIBRARY = [
  {
    construct: "CEO / executive characteristics",
    proxy: "CEO age, tenure, executive traits, or managerial human capital",
    citation: "Serfling, M. A. (2014). CEO age and the riskiness of corporate policies. Journal of Financial and Quantitative Analysis.",
    link: "https://doi.org/10.1017/S0022109014000315",
    note: "Uses CEO age to study risk-taking in corporate policies."
  },
  {
    construct: "CEO / executive characteristics",
    proxy: "CEO age, career horizon, and acquisition behavior",
    citation: "Yim, S. (2013). The acquisitiveness of youth: CEO age and acquisition behavior. Journal of Financial Economics.",
    link: "https://doi.org/10.1016/j.jfineco.2012.11.003",
    note: "Connects CEO age to strategic acquisition decisions."
  },
  {
    construct: "CEO / executive characteristics",
    proxy: "CEO characteristics and R&D spending",
    citation: "Barker, V. L., & Mueller, G. C. (2002). CEO characteristics and firm R&D spending. Management Science.",
    link: "https://doi.org/10.1287/mnsc.48.6.782.187",
    note: "Representative upper-echelons paper linking CEO traits to strategic investment."
  },
  {
    construct: "Internationalization / MNE scope",
    proxy: "Degree of internationalization, foreign sales, foreign assets, and geographic dispersion",
    citation: "Sullivan, D. (1994). Measuring the degree of internationalization of a firm. Journal of International Business Studies.",
    link: "https://doi.org/10.1057/palgrave.jibs.8490203",
    note: "Classic measurement paper for firm internationalization."
  },
  {
    construct: "Internationalization / MNE scope",
    proxy: "International diversification and foreign market scope",
    citation: "Hitt, M. A., Hoskisson, R. E., & Kim, H. (1997). International diversification: Effects on innovation and firm performance in product-diversified firms. Academy of Management Journal.",
    link: "https://doi.org/10.5465/256948",
    note: "Uses international diversification measures to study innovation and performance."
  },
  {
    construct: "Internationalization / MNE scope",
    proxy: "International diversification and firm performance",
    citation: "Lu, J. W., & Beamish, P. W. (2004). International diversification and firm performance: The S-curve hypothesis. Academy of Management Journal.",
    link: "https://doi.org/10.5465/20159504",
    note: "Representative S-curve treatment of international diversification."
  },
  {
    construct: "Institutions / political risk",
    proxy: "Cultural distance / country distance",
    citation: "Kogut, B., & Singh, H. (1988). The effect of national culture on the choice of entry mode. Journal of International Business Studies.",
    link: "https://doi.org/10.1057/palgrave.jibs.8490394",
    note: "Classic distance index paper often used in international entry studies."
  },
  {
    construct: "Institutions / political risk",
    proxy: "Institutional, economic, financial, and cultural distance",
    citation: "Berry, H., Guillén, M. F., & Zhou, N. (2010). An institutional approach to cross-national distance. Strategic Management Journal.",
    link: "https://doi.org/10.1002/smj.811",
    note: "Representative multidimensional country-distance measurement paper."
  },
  {
    construct: "Institutions / political risk",
    proxy: "Country governance indicators and institutional quality",
    citation: "Kaufmann, D., Kraay, A., & Mastruzzi, M. (2010). The Worldwide Governance Indicators: Methodology and analytical issues. World Bank Policy Research Working Paper.",
    link: "https://doi.org/10.1596/1813-9450-5430",
    note: "Methodological reference for WGI-style governance measures."
  },
  {
    construct: "Innovation / knowledge",
    proxy: "Patent counts, patent citations, and market value of innovation",
    citation: "Hall, B. H., Jaffe, A., & Trajtenberg, M. (2005). Market value and patent citations. RAND Journal of Economics.",
    link: "https://doi.org/10.1111/j.1540-6261.2005.00767.x",
    note: "Common precedent for using patent citations as innovation quality."
  },
  {
    construct: "Innovation / knowledge",
    proxy: "Patent value and technological innovation",
    citation: "Kogan, L., Papanikolaou, D., Seru, A., & Stoffman, N. (2017). Technological innovation, resource allocation, and growth. Quarterly Journal of Economics.",
    link: "https://doi.org/10.1093/qje/qjw040",
    note: "Prominent paper linking patents to economic value."
  },
  {
    construct: "Innovation / knowledge",
    proxy: "Collaboration networks and patent innovation output",
    citation: "Ahuja, G. (2000). Collaboration networks, structural holes, and innovation: A longitudinal study. Administrative Science Quarterly.",
    link: "https://doi.org/10.2307/2667105",
    note: "Uses patenting to study network positions and innovation outcomes."
  },
  {
    construct: "Labor / human capital",
    proxy: "Labor market exposure, automation, and employment effects",
    citation: "Acemoglu, D., & Restrepo, P. (2020). Robots and jobs: Evidence from US labor markets. Journal of Political Economy.",
    link: "https://doi.org/10.1086/705716",
    note: "Representative labor-market exposure design for technology adoption effects."
  },
  {
    construct: "Labor / human capital",
    proxy: "Routine task intensity and labor-market polarization",
    citation: "Autor, D. H., & Dorn, D. (2013). The growth of low-skill service jobs and the polarization of the US labor market. American Economic Review.",
    link: "https://doi.org/10.1257/aer.103.5.1553",
    note: "Classic labor-market proxy design using task exposure."
  },
  {
    construct: "Firm performance / finance",
    proxy: "Accounting and market performance outcomes",
    citation: "Richard, P. J., Devinney, T. M., Yip, G. S., & Johnson, G. (2009). Measuring organizational performance: Towards methodological best practice. Journal of Management.",
    link: "https://doi.org/10.1177/0149206308330560",
    note: "Useful measurement reference for performance proxies."
  },
  {
    construct: "Media / attention / sentiment",
    proxy: "Textual sentiment and tone in firm disclosures",
    citation: "Loughran, T., & McDonald, B. (2011). When is a liability not a liability? Textual analysis, dictionaries, and 10-Ks. Journal of Finance.",
    link: "https://doi.org/10.1111/j.1540-6261.2011.01625.x",
    note: "Canonical finance/accounting text-analysis paper for disclosure tone."
  }
];

let activeFilter = "all";
let lastAnalysis = null;
let liveTimer = null;

function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9&\s-]/g, " ");
}

function tokenize(text) {
  return normalize(text)
    .split(/\s+/)
    .filter((token) => token.length > 2 && !STOPWORDS.has(token))
    .flatMap((token) => {
      const variants = [token];
      if (token.endsWith("s")) variants.push(token.slice(0, -1));
      if (token.endsWith("ies")) variants.push(`${token.slice(0, -3)}y`);
      return variants;
    });
}

function scoreDataset(dataset, questionTokens, questionText) {
  let score = 0;
  const haystack = normalize([...dataset.topics, ...dataset.constructs, dataset.name, dataset.coverage].join(" "));
  questionTokens.forEach((token) => {
    const exact = new RegExp(`(^|\\s)${token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(\\s|$)`);
    if (exact.test(haystack)) score += 10;
  });
  dataset.topics.forEach((topic) => {
    if (questionText.includes(topic)) score += 16;
  });
  dataset.constructs.forEach((construct) => {
    if (questionText.includes(construct.toLowerCase())) score += 12;
  });
  return Math.min(98, score);
}

function matchedTerms(dataset, questionTokens, questionText) {
  const haystack = normalize([...dataset.topics, ...dataset.constructs, dataset.name, dataset.coverage].join(" "));
  const tokenMatches = questionTokens.filter((token) => {
    const exact = new RegExp(`(^|\\s)${token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(\\s|$)`);
    return exact.test(haystack);
  });
  const topicMatches = dataset.topics.filter((topic) => questionText.includes(topic));
  return [...new Set([...topicMatches, ...tokenMatches])].slice(0, 6);
}

function extractConstructs(questionText) {
  const matches = CONSTRUCT_RULES.filter((rule) =>
    rule.terms.some((term) => questionText.includes(term))
  ).map((rule) => rule.label);
  return matches.length ? matches : DEFAULT_RESULT.constructs;
}

function inferShape(constructs) {
  const shape = [];
  if (constructs.some((c) => c.includes("Internationalization"))) shape.push("Likely unit: firm-country-year or firm-year");
  if (constructs.some((c) => c.includes("CEO"))) shape.push("Needs person-to-firm linkage for executives");
  if (constructs.some((c) => c.includes("Institutions"))) shape.push("Add country-year institutional measures");
  if (constructs.some((c) => c.includes("Innovation"))) shape.push("Can use patent, publication, or citation outcomes");
  if (constructs.some((c) => c.includes("Labor"))) shape.push("Often industry-region-year unless matched to firms");
  return shape.length ? shape : ["Choose unit of analysis first", "Then match constructs to available proxy fields"];
}

function buildFrictionList(constructs, datasets) {
  const frictions = [];
  if (constructs.some((c) => c.includes("CEO"))) frictions.push("CEO traits are only partly open; proxy filings are public, but clean executive panels often require WRDS or BoardEx.");
  if (constructs.some((c) => c.includes("Internationalization"))) frictions.push("Foreign subsidiary networks are hard to observe publicly; Orbis is the benchmark, while SEC segments and filings can provide partial public proxies.");
  if (constructs.some((c) => c.includes("Institutions"))) frictions.push("Country-level institutions are easy to measure, but causal identification needs exogenous timing or strong controls.");
  if (constructs.some((c) => c.includes("Innovation"))) frictions.push("Patent and publication data are open, but organization matching and name disambiguation need validation.");
  if (!datasets.some((d) => d.access === "open" && d.score > 35)) frictions.push("The open-data path looks thin; consider whether a restricted dataset is necessary for the core mechanism.");
  return frictions.length ? frictions : DEFAULT_RESULT.frictions;
}

function buildProxyList(constructs) {
  const proxies = [];
  if (constructs.some((c) => c.includes("CEO"))) proxies.push("CEO age or tenure from DEF 14A proxy filings; benchmark alternative: ExecuComp or BoardEx.");
  if (constructs.some((c) => c.includes("Internationalization"))) proxies.push("Geographic scope as foreign segment count, foreign sales ratio, number of host countries, or subsidiary-country count.");
  if (constructs.some((c) => c.includes("Institutions"))) proxies.push("Host-country institutional quality using WGI rule of law, regulatory quality, political stability, or corruption control.");
  if (constructs.some((c) => c.includes("Innovation"))) proxies.push("Innovation output as patents, forward citations, publication counts, topic diversity, or collaboration breadth.");
  if (constructs.some((c) => c.includes("Firm performance"))) proxies.push("Firm outcomes as ROA, Tobin's Q, sales growth, market returns, survival, or productivity.");
  if (constructs.some((c) => c.includes("Labor"))) proxies.push("Labor context as wage growth, unemployment, job openings, occupation mix, or regional skill supply.");
  return proxies.length ? proxies : DEFAULT_RESULT.proxies;
}

function buildPaperList(constructs) {
  const selected = PAPER_LIBRARY.filter((paper) => constructs.includes(paper.construct));
  if (selected.length) return selected.slice(0, 8);
  return [
    {
      construct: "General measurement",
      proxy: "Organizational performance proxies",
      citation: "Richard, P. J., Devinney, T. M., Yip, G. S., & Johnson, G. (2009). Measuring organizational performance: Towards methodological best practice. Journal of Management.",
      link: "https://doi.org/10.1177/0149206308330560",
      note: "Good starting point when the outcome construct is still broad."
    },
    {
      construct: "General research design",
      proxy: "Construct validity and empirical design",
      citation: "Ketokivi, M., & McIntosh, C. N. (2017). Addressing the endogeneity dilemma in operations management research. Journal of Operations Management.",
      link: "https://doi.org/10.1016/j.jom.2017.05.001",
      note: "Helpful reminder to connect proxies to identification assumptions."
    }
  ];
}

function buildDesignList(constructs) {
  const designs = ["Panel regression with firm, year, industry, and country fixed effects if repeated observations are available."];
  if (constructs.some((c) => c.includes("CEO"))) designs.push("CEO transition design comparing pre- and post-appointment changes, with matched firms or firm fixed effects.");
  if (constructs.some((c) => c.includes("Internationalization"))) designs.push("Model international scope as count, share, or portfolio composition; consider country-entry or exit event models.");
  if (constructs.some((c) => c.includes("Institutions"))) designs.push("Exploit regulatory or political shocks when plausible; otherwise treat institutions as contextual moderators.");
  if (constructs.some((c) => c.includes("Innovation"))) designs.push("Use lagged patent/publication outcomes and validate assignee or institution matching manually on a sample.");
  designs.push("Before claiming causality, write the identification threat in one sentence and test whether the data can address it.");
  return designs;
}

function analyzeQuestion() {
  const input = document.querySelector("#questionInput").value.trim();
  const question = input || "What business research question can be tested with public data?";
  const questionText = normalize(question);
  const tokens = tokenize(question);
  const openOnly = document.querySelector("#openOnlyToggle").checked;

  let datasets = DATASETS.map((dataset) => ({
    ...dataset,
    score: scoreDataset(dataset, tokens, questionText),
    matched: matchedTerms(dataset, tokens, questionText)
  }))
    .sort((a, b) => b.score - a.score);

  if (openOnly) {
    datasets = datasets.sort((a, b) => {
      const aStrongRestricted = a.access === "restricted" && a.score >= 55;
      const bStrongRestricted = b.access === "restricted" && b.score >= 55;
      if (aStrongRestricted !== bStrongRestricted) return aStrongRestricted ? -1 : 1;
      if (a.access !== b.access) return a.access === "open" ? -1 : 1;
      return b.score - a.score;
    });
  }

  const topDatasets = ensureRestrictedComparators(datasets, 7);
  const constructs = extractConstructs(questionText);
  const frictions = buildFrictionList(constructs, topDatasets);
  const proxies = buildProxyList(constructs);
  const papers = buildPaperList(constructs);
  const designs = buildDesignList(constructs);
  const dataShape = inferShape(constructs);
  const openHits = topDatasets.filter((d) => d.access === "open" && d.score > 25).length;
  const maxScore = topDatasets[0]?.score || 0;
  let scoreLabel = maxScore > 70 && openHits >= 3 ? "High" : maxScore > 38 || openHits >= 2 ? "Medium" : "Exploratory";
  const needsRestrictedLinkage = constructs.some((c) => c.includes("CEO")) && constructs.some((c) => c.includes("Internationalization"));
  if (needsRestrictedLinkage && scoreLabel === "High" && !topDatasets.some((d) => d.access === "restricted" && d.score >= 55)) scoreLabel = "Medium";

  const nextStep = buildNextStep(constructs, topDatasets, scoreLabel);
  lastAnalysis = { question, constructs, topDatasets, frictions, proxies, papers, designs, dataShape, scoreLabel, nextStep };
  renderAnalysis(lastAnalysis);
  updateInputMeta("Updated just now");
}

function ensureRestrictedComparators(datasets, limit) {
  const selected = datasets.slice(0, limit);
  const selectedNames = new Set(selected.map((dataset) => dataset.name));
  const restricted = datasets.filter((dataset) => dataset.access === "restricted");
  restricted.slice(0, 3).forEach((dataset) => {
    if (!selectedNames.has(dataset.name)) {
      const replaceIndex = selected.findLastIndex((item) => item.access === "open" && item.score <= dataset.score);
      if (replaceIndex >= 0) {
        selected[replaceIndex] = dataset;
      } else if (selected.length < limit) {
        selected.push(dataset);
      } else {
        selected[selected.length - 1] = dataset;
      }
      selectedNames.add(dataset.name);
    }
  });
  return selected.sort((a, b) => {
    if (a.score !== b.score) return b.score - a.score;
    if (a.access !== b.access) return a.access === "restricted" ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}

function renderTags(container, items, variant = "") {
  container.innerHTML = "";
  items.forEach((item) => {
    const tag = document.createElement("span");
    tag.className = `tag ${variant}`.trim();
    tag.textContent = item;
    container.appendChild(tag);
  });
}

function renderList(container, items) {
  container.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    container.appendChild(li);
  });
}

function renderPapers(container, papers) {
  container.innerHTML = "";
  papers.forEach((paper) => {
    const card = document.createElement("article");
    card.className = "paper-card";
    card.innerHTML = `
      <div class="paper-top">
        <span class="paper-proxy">${paper.proxy}</span>
        <span class="paper-construct">${paper.construct}</span>
      </div>
      <p>${paper.citation}</p>
      <p class="paper-note">${paper.note}</p>
      <a href="${paper.link}" target="_blank" rel="noreferrer">Open paper link</a>
    `;
    container.appendChild(card);
  });
}

function datasetCard(dataset) {
  const card = document.createElement("article");
  card.className = "dataset-card";
  card.dataset.access = dataset.access;
  const matched = dataset.matched?.length ? dataset.matched.join(", ") : "comparison benchmark";
  const fit = dataset.access === "restricted"
    ? "Benchmark comparator for construct validity, richer linkage, or replication checks."
    : "Open-data path for early feasibility checks, controls, or direct measurement.";

  card.innerHTML = `
    <div class="dataset-top">
      <div class="dataset-title">
        <h3>${dataset.name}</h3>
        <span class="badge ${dataset.access}">${dataset.access === "open" ? "Open public" : "Restricted"}</span>
      </div>
      <div class="score-wrap" aria-label="Match score ${dataset.score}%">
        <span class="match-score">${dataset.score > 0 ? `${dataset.score}%` : "Compare"}</span>
        <div class="match-meter" aria-hidden="true"><span style="width: ${dataset.score}%"></span></div>
      </div>
    </div>
    <p class="fit-line"><strong>Why it matches:</strong> ${matched}.</p>
    <p>${dataset.coverage}</p>
    <div class="dataset-meta">
      <span class="meta-pill">${dataset.unit}</span>
      ${dataset.constructs.slice(0, 3).map((item) => `<span class="meta-pill">${item}</span>`).join("")}
    </div>
    <details>
      <summary>Research use and cautions</summary>
      <div class="details-grid">
        <p><strong>Best use:</strong> ${fit}</p>
        ${dataset.freshness ? `<p><strong>Current note:</strong> ${dataset.freshness}</p>` : ""}
        <p><strong>Watch out:</strong> ${dataset.caveat}</p>
      </div>
    </details>
    <div class="dataset-actions">
      <a href="${dataset.url}" target="_blank" rel="noreferrer">Open dataset</a>
      <a href="${dataset.api}" target="_blank" rel="noreferrer">Docs / API</a>
    </div>
  `;
  return card;
}

function renderDatasets(datasets) {
  const container = document.querySelector("#datasetResults");
  container.innerHTML = "";
  const filtered = datasets.filter((dataset) => {
    const matchesFilter = activeFilter === "all" || dataset.access === activeFilter;
    return matchesFilter && (dataset.score > 0 || dataset.access === "restricted");
  });
  filtered.forEach((dataset) => container.appendChild(datasetCard(dataset)));
  if (!filtered.length) {
    const empty = document.createElement("p");
    empty.textContent = "No strong matches under this filter yet. Add a construct, population, geography, or outcome to sharpen the question.";
    container.appendChild(empty);
  }
}

function renderAnalysis(analysis) {
  document.querySelector("#resultTitle").textContent = analysis.question;
  document.querySelector("#scoreValue").textContent = analysis.scoreLabel;
  document.querySelector("#openMatchCount").textContent = analysis.topDatasets.filter((d) => d.access === "open" && d.score > 0).length;
  document.querySelector("#restrictedMatchCount").textContent = analysis.topDatasets.filter((d) => d.access === "restricted").length;
  document.querySelector("#nextStepText").textContent = analysis.nextStep;
  renderTags(document.querySelector("#constructTags"), analysis.constructs, "blue");
  renderList(document.querySelector("#frictionList"), analysis.frictions);
  renderList(document.querySelector("#proxyList"), analysis.proxies);
  renderPapers(document.querySelector("#paperList"), analysis.papers);
  renderList(document.querySelector("#designList"), analysis.designs);
  renderTags(document.querySelector("#searchTerms"), buildSearchTerms(analysis), "violet");

  const shape = document.querySelector("#dataShape");
  shape.innerHTML = "";
  analysis.dataShape.forEach((item) => {
    const row = document.createElement("div");
    row.textContent = item;
    shape.appendChild(row);
  });
  renderDatasets(analysis.topDatasets);
}

function buildNextStep(constructs, datasets, scoreLabel) {
  const hasRestricted = datasets.some((dataset) => dataset.access === "restricted" && dataset.score >= 55);
  const hasOpen = datasets.some((dataset) => dataset.access === "open" && dataset.score >= 35);
  if (constructs.some((c) => c.includes("CEO")) && constructs.some((c) => c.includes("Internationalization"))) {
    return "Start with SEC filings for a public-data pilot, then benchmark against Orbis, BoardEx, or S&P executive data if access is available.";
  }
  if (hasOpen && hasRestricted) return "Use open datasets for a pilot design, then compare measurement quality against the restricted benchmark.";
  if (hasOpen) return "Build a small open-data pilot first and write down the identification threat before scaling.";
  if (hasRestricted) return "The theory is measurable, but the strongest path likely needs institutional data access.";
  if (scoreLabel === "Exploratory") return "Add a clearer population, outcome, geography, or time period to improve dataset matching.";
  return "Select the top dataset and define one dependent variable, one main predictor, and two controls.";
}

function buildSearchTerms(analysis) {
  const base = ["public dataset", "business research", "panel data", "proxy measure"];
  const fromConstructs = analysis.constructs.flatMap((construct) => construct.toLowerCase().split(" / "));
  return [...new Set([...fromConstructs, ...base])].slice(0, 9);
}

function copyBrief() {
  if (!lastAnalysis) return;
  const lines = [
    `Question: ${lastAnalysis.question}`,
    `Feasibility: ${lastAnalysis.scoreLabel}`,
    "",
    "Constructs:",
    ...lastAnalysis.constructs.map((item) => `- ${item}`),
    "",
    "Dataset candidates:",
    ...lastAnalysis.topDatasets.map((d) => `- ${d.name} (${d.access}): ${d.url}`),
    "",
    "Proxy ideas:",
    ...lastAnalysis.proxies.map((item) => `- ${item}`),
    "",
    "Representative papers:",
    ...lastAnalysis.papers.map((p) => `- ${p.citation} ${p.link}`),
    "",
    "Design ideas:",
    ...lastAnalysis.designs.map((item) => `- ${item}`)
  ];
  navigator.clipboard?.writeText(lines.join("\n"));
  const button = document.querySelector("#copyButton");
  button.textContent = "Copied";
  window.setTimeout(() => {
    button.textContent = "Copy brief";
  }, 1200);
}

function updateInputMeta(statusText = "Live mapping is on") {
  const input = document.querySelector("#questionInput");
  document.querySelector("#charCount").textContent = `${input.value.length} characters`;
  document.querySelector("#liveStatus").textContent = statusText;
}

function scheduleLiveAnalysis() {
  updateInputMeta("Updating...");
  window.clearTimeout(liveTimer);
  liveTimer = window.setTimeout(analyzeQuestion, 220);
}

function initPrompts() {
  const container = document.querySelector("#promptList");
  PROMPTS.forEach((prompt) => {
    const button = document.createElement("button");
    button.className = "prompt-button";
    button.type = "button";
    button.textContent = prompt;
    button.addEventListener("click", () => {
      document.querySelector("#questionInput").value = prompt;
      updateInputMeta("Prompt loaded");
      analyzeQuestion();
    });
    container.appendChild(button);
  });
}

document.querySelector("#mapButton").addEventListener("click", analyzeQuestion);
document.querySelector("#questionInput").addEventListener("input", scheduleLiveAnalysis);
document.querySelector("#clearButton").addEventListener("click", () => {
  document.querySelector("#questionInput").value = "";
  updateInputMeta("Question cleared");
  analyzeQuestion();
  document.querySelector("#questionInput").focus();
});
document.querySelector("#openOnlyToggle").addEventListener("change", analyzeQuestion);
document.querySelector("#copyButton").addEventListener("click", copyBrief);

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("active", tab === button));
    if (lastAnalysis) renderDatasets(lastAnalysis.topDatasets);
  });
});

initPrompts();
analyzeQuestion();
