import { mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require("/Users/petrine/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
const sharp = require("/Users/petrine/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp");

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outputDir = new URL("../docs/public/templates/thumbnails/", import.meta.url);
const outputDirPath = fileURLToPath(outputDir);
const baseUrl = "http://127.0.0.1:5173";
const placeholderImage = "https://webcomponent.designsystem.tech.gov.sg/placeholder-sgds.png";
const placeholderBackground = "#f8f8f8";

const blockThumbnailKeys = [
  "cards-3-per-column",
  "cards-4-per-column",
  "cta-contained-primary-center",
  "cta-contained-primary",
  "cta-contained-raised-center",
  "cta-contained-raised",
  "cta-full-bleed-alternate-center",
  "cta-full-bleed-alternate",
  "cta-full-bleed-primary-center",
  "cta-full-bleed-primary",
  "feature-image-left-4-8",
  "feature-image-right-4-8",
  "feature-component-left-6-6",
  "feature-component-right-6-6",
  "feature-image-left-6-6",
  "feature-image-right-6-6",
  "feature-image-left-8-4",
  "feature-image-right-8-4",
  "feature-cards-below",
  "feature-no-image-center",
  "feature-no-image-left",
  "filter-checkboxes",
  "form-all-types",
  "form-basic-center",
  "form-basic-left",
  "form-basic-right",
  "form-fields-checkbox",
  "form-fields-dates-quantities",
  "form-fields-file-upload",
  "form-fields-radio",
  "form-fields-selects",
  "form-fields-textarea",
  "form-multi-step",
  "form-full-width-only",
  "form-paired-only",
  "form-sections-single",
  "form-sections-three",
  "form-sections-two",
  "header-page-header-with-breadcrumb",
  "header-page-header",
  "hero-background-image-light",
  "hero-background-image",
  "hero-center",
  "hero-fullbleed",
  "hero-image",
  "hero-basic",
  "stats-3-statistics",
  "stats-4-statistics",
  "stats-5-statistics",
  "stats-right-6-column",
  "stats-right-8-columns",
];

const pageTemplateKeys = [
  "landing",
  "about-us",
  "blog",
  "catalogue",
  "application-management",
  "form-page",
  "multi-step-form",
  "report-issue",
];

const multiStepFormThumbnailMarkup = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        background: #fff;
        color: #2f2f2f;
        font-family: Inter, Arial, sans-serif;
      }

      .multi-step-thumbnail {
        width: 1008px;
        min-height: 608px;
        padding: 32px 264px 0;
        background: #fff;
      }

      .overline {
        margin: 0 0 8px;
        color: #3d3d3d;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 1.4px;
        line-height: 1;
        text-transform: uppercase;
      }

      h1 {
        margin: 0 0 16px;
        color: #2f2f2f;
        font-size: 28px;
        font-weight: 700;
        line-height: 1.15;
      }

      .intro {
        margin: 0;
        color: #555;
        font-size: 15px;
        line-height: 1.45;
      }

      .stepper {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        position: relative;
        margin: 76px 0 34px;
      }

      .stepper::before {
        position: absolute;
        top: 11px;
        right: 50px;
        left: 50px;
        height: 1px;
        background: #e5e5e5;
        content: "";
      }

      .step {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 9px;
        color: #4a4a4a;
        font-size: 12px;
        line-height: 1;
      }

      .dot {
        display: grid;
        place-items: center;
        width: 22px;
        height: 22px;
        border-radius: 999px;
        background: #e3e3e3;
        color: #555;
        font-size: 11px;
        font-weight: 700;
      }

      .step:first-child .dot {
        background: #6b4df5;
        color: #fff;
      }

      h2 {
        margin: 0 0 14px;
        color: #2f2f2f;
        font-size: 18px;
        font-weight: 700;
        line-height: 1.2;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 24px 20px;
      }

      .field {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .full {
        grid-column: 1 / -1;
      }

      label {
        color: #333;
        font-size: 12px;
        line-height: 1;
      }

      input {
        width: 100%;
        height: 32px;
        border: 1px solid #9f9f9f;
        border-radius: 4px;
        padding: 0 10px;
        color: #4a4a4a;
        font-size: 12px;
        font-family: inherit;
      }

      .hint {
        color: #666;
        font-size: 10px;
        line-height: 1;
      }

      .section-heading {
        margin-top: 22px;
      }
    </style>
  </head>
  <body>
    <main class="multi-step-thumbnail">
      <p class="overline">Event registration</p>
      <h1>Register for STACK 2025</h1>
      <p class="intro">Secure your spot at Singapore's premier government technology conference.</p>

      <div class="stepper" aria-hidden="true">
        <div class="step"><span class="dot">1</span><span>Personal Details</span></div>
        <div class="step"><span class="dot">2</span><span>Preferences</span></div>
        <div class="step"><span class="dot">3</span><span>Review</span></div>
        <div class="step"><span class="dot">4</span><span>Confirm</span></div>
      </div>

      <h2>Personal Information</h2>
      <div class="grid">
        <div class="field">
          <label>First name</label>
          <input value="Wei Ming" />
          <span class="hint">As per NRIC or passport</span>
        </div>
        <div class="field">
          <label>Last name</label>
          <input value="Tan" />
        </div>
        <div class="field full">
          <label>Work email</label>
          <input value="weiming.tan@tech.gov.sg" />
          <span class="hint">Use your government email address</span>
        </div>
        <div class="field full">
          <label>Mobile number (Optional)</label>
          <input value="+65 9123 4567" />
        </div>
      </div>

      <h2 class="section-heading">Work Information</h2>
      <div class="field">
        <label>Organisation</label>
        <input />
      </div>
    </main>
  </body>
</html>`;

const applicationManagementThumbnailMarkup = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        background: #fff;
        color: #2f2f2f;
        font-family: Inter, Arial, sans-serif;
      }

      .application-thumbnail {
        width: 1008px;
        min-height: 608px;
        padding: 18px 66px 0;
        background: #fff;
      }

      .breadcrumb {
        display: flex;
        align-items: center;
        gap: 9px;
        margin-bottom: 18px;
        color: #333;
        font-size: 12px;
      }

      .breadcrumb a {
        color: #006fe6;
        text-decoration: none;
      }

      .header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 24px;
        margin-bottom: 18px;
      }

      .title-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 14px;
      }

      .icon-box {
        display: grid;
        place-items: center;
        width: 40px;
        height: 40px;
        border-radius: 4px;
        background: #edf6ff;
        color: #222;
        font-size: 18px;
        line-height: 1;
      }

      h1 {
        margin: 0;
        color: #2f2f2f;
        font-size: 24px;
        font-weight: 700;
        line-height: 1.2;
      }

      .description {
        margin: 0;
        color: #444;
        font-size: 12px;
        line-height: 1.5;
      }

      .create {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        height: 32px;
        border: 0;
        border-radius: 5px;
        padding: 0 18px;
        background: #6b4df5;
        color: #fff;
        font-family: inherit;
        font-size: 12px;
      }

      .content {
        display: grid;
        grid-template-columns: 168px 1fr;
        gap: 24px;
      }

      .filter-head {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 20px;
      }

      h2 {
        margin: 0;
        color: #2f2f2f;
        font-size: 16px;
        font-weight: 700;
      }

      .clear {
        color: #006fe6;
        font-size: 12px;
      }

      .filter-group {
        margin-bottom: 26px;
      }

      .filter-title {
        margin: 0 0 14px;
        color: #333;
        font-size: 12px;
        font-weight: 700;
      }

      .check {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 10px;
        color: #333;
        font-size: 12px;
      }

      .box {
        width: 16px;
        height: 16px;
        border: 1px solid #a8a8a8;
        border-radius: 5px;
      }

      .panel {
        border: 1px solid #d9d9d9;
        border-radius: 8px;
        padding: 16px 16px 0;
      }

      .panel-title {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 14px;
      }

      .panel-icon {
        width: 40px;
        height: 40px;
      }

      h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 700;
      }

      .search-row {
        display: grid;
        grid-template-columns: 1fr 76px;
        gap: 14px;
        margin-bottom: 14px;
      }

      .search {
        height: 32px;
        border: 1px solid #a7a7a7;
        border-radius: 5px;
        padding: 0 12px;
        color: #777;
        font-family: inherit;
        font-size: 12px;
      }

      .filter-button {
        height: 32px;
        border: 1px solid #4c4c4c;
        border-radius: 5px;
        background: #fff;
        font-family: inherit;
        font-size: 12px;
      }

      .result-count {
        margin: 0 0 18px;
        font-size: 12px;
        font-weight: 700;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 12px;
      }

      th {
        padding: 10px 12px;
        border-bottom: 1px solid #d9d9d9;
        color: #2f2f2f;
        font-weight: 700;
        text-align: left;
      }

      td {
        padding: 12px;
        border-bottom: 1px solid #e5e5e5;
        color: #333;
        vertical-align: top;
      }

      td:first-child {
        color: #006fe6;
      }

      .badge {
        display: inline-block;
        border-radius: 4px;
        padding: 3px 8px;
        color: #fff;
        font-size: 9px;
        font-weight: 700;
      }

      .active {
        background: #168040;
      }

      .pending {
        background: #f6d447;
        color: #2f2f2f;
      }

      .rejected {
        background: #d62929;
      }

      .suspended {
        background: #5a5a5a;
      }

      .view {
        color: #6b4df5;
      }
    </style>
  </head>
  <body>
    <main class="application-thumbnail">
      <div class="breadcrumb"><a href="#">Home</a><span>›</span><span>Applications</span></div>

      <div class="header">
        <div>
          <div class="title-row">
            <div class="icon-box">▦</div>
            <h1>Applications</h1>
          </div>
          <p class="description">Browse and manage all registered applications in your organisation.</p>
        </div>
        <button class="create">＋ Create application</button>
      </div>

      <div class="content">
        <aside>
          <div class="filter-head"><h2>Filter by</h2><span class="clear">Clear all</span></div>
          <div class="filter-group">
            <p class="filter-title">Status</p>
            <div class="check"><span class="box"></span>Active (8)</div>
            <div class="check"><span class="box"></span>Pending (3)</div>
            <div class="check"><span class="box"></span>Rejected (2)</div>
            <div class="check"><span class="box"></span>Suspended (1)</div>
          </div>
          <div class="filter-group">
            <p class="filter-title">Environment</p>
            <div class="check"><span class="box"></span>Production (6)</div>
            <div class="check"><span class="box"></span>Staging (5)</div>
            <div class="check"><span class="box"></span>Development (3)</div>
          </div>
          <div class="filter-group">
            <p class="filter-title">API type</p>
            <div class="check"><span class="box"></span>REST (10)</div>
            <div class="check"><span class="box"></span>GraphQL (2)</div>
            <div class="check"><span class="box"></span>SOAP (2)</div>
          </div>
        </aside>

        <section class="panel">
          <div class="panel-title">
            <div class="icon-box panel-icon">▦</div>
            <h3>All applications</h3>
          </div>
          <div class="search-row">
            <div class="search">Search applications</div>
            <button class="filter-button">☷ Filter</button>
          </div>
          <p class="result-count">Showing 6/14 result(s)</p>

          <table>
            <thead>
              <tr>
                <th>Application name</th>
                <th>Organisation</th>
                <th>Environment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>APEX Gateway v2.1.0</td><td>[GVT] APEX</td><td>Production</td><td><span class="badge active">Active</span></td><td class="view">View</td></tr>
              <tr><td>MyInfo Bridge v1.4.0</td><td>[GVT] NDI</td><td>Staging</td><td><span class="badge pending">Pending</span></td><td class="view">View</td></tr>
              <tr><td>FormSG Webhook v3.0.0</td><td>[GVT] OGP</td><td>Production</td><td><span class="badge active">Active</span></td><td class="view">View</td></tr>
              <tr><td>SingPass Auth v1.2.0</td><td>[GVT] GDS</td><td>Production</td><td><span class="badge rejected">Rejected</span></td><td class="view">View</td></tr>
              <tr><td>Data.gov Sync v2.0.0</td><td>[GVT] SNDGO</td><td>Development</td><td><span class="badge suspended">Suspended</span></td><td class="view">View</td></tr>
              <tr><td>CorpPass Verify v1.0.0</td><td>[GVT] ACRA</td><td>Staging</td><td><span class="badge active">Active</span></td><td class="view">View</td></tr>
            </tbody>
          </table>
        </section>
      </div>
    </main>
  </body>
</html>`;

const catalogueThumbnailMarkup = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        background: #fff;
        color: #2f2f2f;
        font-family: Inter, Arial, sans-serif;
      }

      .catalogue-thumbnail {
        width: 1008px;
        min-height: 608px;
        padding: 40px 66px 0;
        background: #fff;
      }

      .overline {
        margin: 0 0 10px;
        color: #2f2f2f;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 1.4px;
        line-height: 1;
        text-transform: uppercase;
      }

      h1 {
        margin: 0 0 16px;
        color: #2f2f2f;
        font-size: 28px;
        font-weight: 700;
        line-height: 1.15;
      }

      .intro {
        margin: 0 0 4px;
        color: #555;
        font-size: 14px;
        line-height: 1.45;
      }

      label {
        display: block;
        color: #333;
        font-size: 12px;
        line-height: 1;
      }

      .search {
        width: 426px;
        height: 33px;
        margin-top: 8px;
        border: 1px solid #a7a7a7;
        border-radius: 5px;
        padding: 0 12px;
        color: #777;
        font-size: 12px;
      }

      .content {
        display: grid;
        grid-template-columns: 170px 1fr;
        gap: 54px;
        margin-top: 72px;
      }

      .filter-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
      }

      h2 {
        margin: 0;
        font-size: 16px;
        font-weight: 700;
      }

      .clear {
        color: #006fe6;
        font-size: 12px;
      }

      .filter-group {
        margin-bottom: 26px;
      }

      .filter-title {
        margin: 0 0 14px;
        color: #333;
        font-size: 12px;
        font-weight: 700;
      }

      .check {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 10px;
        color: #333;
        font-size: 12px;
      }

      .box {
        display: grid;
        place-items: center;
        width: 16px;
        height: 16px;
        border: 1px solid #a8a8a8;
        border-radius: 5px;
        color: #fff;
        font-size: 11px;
      }

      .checked {
        border-color: #6b4df5;
        background: #6b4df5;
      }

      .results-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
      }

      .result-count {
        margin: 0;
        font-size: 16px;
        font-weight: 700;
      }

      .sort {
        width: 152px;
        height: 33px;
        border: 1px solid #a7a7a7;
        border-radius: 5px;
        padding: 0 10px;
        color: #777;
        font-size: 12px;
        line-height: 33px;
      }

      .cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
      }

      .card {
        min-height: 172px;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
        padding: 16px;
        background: #fff;
      }

      .badge {
        display: inline-block;
        margin-bottom: 18px;
        border: 1px solid #ded8ff;
        border-radius: 4px;
        padding: 3px 8px;
        background: #f4f1ff;
        color: #6b4df5;
        font-size: 9px;
        line-height: 1;
      }

      h3 {
        margin: 0 0 18px;
        color: #1f1f1f;
        font-size: 18px;
        font-weight: 700;
        line-height: 1.25;
      }

      .card p {
        margin: 0;
        color: #555;
        font-size: 12px;
        line-height: 1.45;
      }
    </style>
  </head>
  <body>
    <main class="catalogue-thumbnail">
      <p class="overline">Programmes</p>
      <h1>Browse Programmes</h1>
      <p class="intro">Explore available government programmes and services.</p>
      <label>Search</label>
      <div class="search">Search by name or keyword...</div>

      <div class="content">
        <aside>
          <div class="filter-head">
            <h2>Filters</h2>
            <span class="clear">Clear all</span>
          </div>
          <div class="filter-group">
            <p class="filter-title">Programme type</p>
            <div class="check"><span class="box"></span>Opening Address (1)</div>
            <div class="check"><span class="box"></span>Keynote (4)</div>
            <div class="check"><span class="box"></span>Panel Discussion (6)</div>
            <div class="check"><span class="box"></span>Presentation (12)</div>
          </div>
          <div class="filter-group">
            <p class="filter-title">Sessions</p>
            <div class="check"><span class="box checked">✓</span>Morning (12)</div>
            <div class="check"><span class="box"></span>Afternoon (16)</div>
          </div>
          <div class="filter-group">
            <p class="filter-title">Track</p>
            <div class="check"><span class="box checked">✓</span>AI x Cybersecurity (4)</div>
            <div class="check"><span class="box"></span>Resilient and Secure Cloud</div>
          </div>
        </aside>

        <section>
          <div class="results-head">
            <p class="result-count">Showing 12 results</p>
            <div class="sort">Sort by ˅</div>
          </div>
          <div class="cards">
            <article class="card">
              <span class="badge">Keynote</span>
              <h3>Digital Infrastructure for the Next Decade</h3>
              <p>An overview of Singapore's plans for resilient and future-ready digital infrastructure.</p>
            </article>
            <article class="card">
              <span class="badge">Panel Discussion</span>
              <h3>AI Governance in the Public Sector</h3>
              <p>Panellists explore responsible AI adoption frameworks and inter-agency collaboration.</p>
            </article>
            <article class="card">
              <span class="badge">Presentation</span>
              <h3>Zero-Trust Architecture for...</h3>
              <p>A deep dive into implementing zero-trust principles across legacy and modern systems.</p>
            </article>
            <article class="card">
              <span class="badge">Keynote</span>
              <h3>Securing the Cloud: Lessons from the Field</h3>
            </article>
            <article class="card">
              <span class="badge">Presentation</span>
              <h3>Incident Response Playbooks for CISOs</h3>
            </article>
            <article class="card">
              <span class="badge">Panel Discussion</span>
              <h3>Workforce Upskilling for Cyber Resilience</h3>
            </article>
          </div>
        </section>
      </div>
    </main>
  </body>
</html>`;

const aboutUsThumbnailMarkup = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        background: #fff;
        color: #2f2f2f;
        font-family: Inter, Arial, sans-serif;
      }

      .about-thumbnail {
        width: 1008px;
        min-height: 608px;
        padding: 44px 66px 46px;
        background: #fff;
      }

      .intro {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 66px;
        margin-bottom: 58px;
      }

      h1 {
        margin: 0;
        color: #1f1f1f;
        font-size: 31px;
        font-weight: 700;
        line-height: 1.2;
      }

      .lede {
        margin: 0;
        color: #4f4f4f;
        font-size: 15px;
        line-height: 1.55;
      }

      .media-grid {
        display: grid;
        grid-template-columns: 2fr 0.96fr;
        gap: 22px;
      }

      .hero-image {
        width: 100%;
        height: 392px;
        border-radius: 6px;
        object-fit: cover;
        object-position: center;
        display: block;
      }

      .side {
        display: grid;
        grid-template-rows: 1fr 1fr;
        gap: 22px;
      }

      .card {
        min-height: 184px;
        border: 1px solid #dedede;
        border-radius: 6px;
        padding: 16px;
        background: #fff;
      }

      .thumb {
        display: grid;
        place-items: center;
        width: 86px;
        height: 42px;
        margin-bottom: 28px;
        border-radius: 8px;
        background: #f4f4f4;
        color: #555;
        font-size: 12px;
      }

      .card p {
        margin: 0 0 16px;
        color: #555;
        font-size: 12px;
        line-height: 1.45;
      }

      .link {
        color: #006fe6;
        font-size: 12px;
      }

      .office-image {
        width: 100%;
        height: 184px;
        border-radius: 6px;
        object-fit: cover;
        object-position: center;
        display: block;
      }
    </style>
  </head>
  <body>
    <main class="about-thumbnail">
      <section class="intro">
        <h1>Building digital services that matter for Singapore</h1>
        <p class="lede">
          We are a team of designers, engineers, and product thinkers committed to delivering citizen-centric digital
          experiences across government.
        </p>
      </section>

      <section class="media-grid">
        <img
          class="hero-image"
          src="https://images.unsplash.com/photo-1565350897149-38dfafa81d83?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0"
          alt=""
        />
        <div class="side">
          <article class="card">
            <div class="thumb">Thumbnail</div>
            <p>
              Trusted by agencies across the whole-of-government ecosystem to deliver accessible, compliant, and
              consistent digital interfaces.
            </p>
            <span class="link">Learn more →</span>
          </article>
          <img
            class="office-image"
            src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0"
            alt=""
          />
        </div>
      </section>
    </main>
  </body>
</html>`;

const landingThumbnailMarkup = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        background: #fff;
        color: #2f2f2f;
        font-family: Inter, Arial, sans-serif;
      }

      .landing-thumbnail {
        width: 1008px;
        min-height: 608px;
        padding: 28px 66px 0;
        background: #fff;
      }

      .hero {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 64px;
        align-items: center;
        min-height: 412px;
      }

      .overline {
        margin: 0 0 12px;
        color: #2f2f2f;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 1.3px;
        line-height: 1;
        text-transform: uppercase;
      }

      h1 {
        margin: 0 0 18px;
        color: #1f1f1f;
        font-size: 40px;
        font-weight: 700;
        line-height: 1.08;
      }

      .intro {
        max-width: 416px;
        margin: 0 0 28px;
        color: #555;
        font-size: 16px;
        line-height: 1.35;
      }

      .actions {
        display: flex;
        gap: 20px;
      }

      .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 88px;
        height: 32px;
        border: 1px solid #6b4df5;
        border-radius: 5px;
        padding: 0 18px;
        color: #6b4df5;
        font-size: 12px;
      }

      .button.primary {
        background: #6b4df5;
        color: #fff;
      }

      .visual {
        display: grid;
        place-items: center;
        width: 412px;
        height: 412px;
        border-radius: 10px;
        background: #f8f8f8;
        justify-self: end;
      }

      .visual img {
        width: 240px;
        height: 240px;
        object-fit: contain;
      }

      .next-section {
        margin-top: 56px;
      }

      .next-section h2 {
        margin: 0 0 10px;
        color: #1f1f1f;
        font-size: 31px;
        font-weight: 700;
        line-height: 1.2;
      }

      .next-section p {
        margin: 0;
        color: #555;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <main class="landing-thumbnail">
      <section class="hero">
        <div>
          <p class="overline">Singapore Government Digital Services</p>
          <h1>One Platform.<br />Simpler Living.</h1>
          <p class="intro">Access government services anytime, anywhere. Built for residents, designed for ease.</p>
          <div class="actions">
            <span class="button primary">Get Started</span>
            <span class="button">Learn More</span>
          </div>
        </div>
        <div class="visual">
          <img src="CENTERED_PLACEHOLDER_IMAGE" alt="" />
        </div>
      </section>

      <section class="next-section">
        <p class="overline">Life Moments</p>
        <h2>Built for Every Stage of Life</h2>
        <p>Services grouped around your life moments - not government structures.</p>
      </section>
    </main>
  </body>
</html>`;

const blogThumbnailMarkup = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        background: #fff;
        color: #2f2f2f;
        font-family: Inter, Arial, sans-serif;
      }

      .blog-thumbnail {
        width: 1008px;
        min-height: 608px;
        background: #fff;
      }

      .hero {
        height: 238px;
        padding: 32px 66px 0;
        background: #f7f7f7;
      }

      .breadcrumb {
        display: flex;
        align-items: center;
        gap: 9px;
        margin-bottom: 23px;
        color: #1f1f1f;
        font-size: 12px;
        line-height: 1;
      }

      .breadcrumb .home {
        color: #0d6efd;
      }

      .breadcrumb .story {
        color: #0d6efd;
      }

      .breadcrumb .separator {
        color: #777;
      }

      .overline {
        margin: 0 0 10px;
        color: #2f2f2f;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 1.2px;
        line-height: 1;
        text-transform: uppercase;
      }

      h1 {
        max-width: 760px;
        margin: 0 0 14px;
        color: #2a2a2a;
        font-size: 27px;
        font-weight: 700;
        line-height: 1.18;
      }

      .dek {
        max-width: 640px;
        margin: 0;
        color: #555;
        font-size: 15px;
        line-height: 1.55;
      }

      .body {
        padding: 32px 66px 0;
      }

      .copy {
        max-width: 640px;
        margin: 0 0 19px;
        color: #555;
        font-size: 12px;
        line-height: 1.38;
      }

      .section {
        margin-top: 65px;
        max-width: 720px;
      }

      .section h2 {
        margin: 0 0 8px;
        color: #2a2a2a;
        font-size: 24px;
        font-weight: 700;
        line-height: 1.2;
      }

      .section p,
      .section ol {
        margin: 0;
        color: #555;
        font-size: 12px;
        line-height: 1.32;
      }

      .section ol {
        padding-left: 14px;
      }
    </style>
  </head>
  <body>
    <main class="blog-thumbnail">
      <section class="hero">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <span class="home">Home</span>
          <span class="separator">›</span>
          <span class="story">Stories</span>
          <span class="separator">›</span>
          <span>LifeSG Parenting Journey</span>
        </nav>
        <p class="overline">Success Story</p>
        <h1>How LifeSG Helped 180,000 New Parents<br />Navigate Government Services</h1>
        <p class="dek">A look at how the Parenting Journey feature reduced time-to-access for critical family services by 60% in its first year.</p>
      </section>

      <section class="body">
        <p class="copy">When a child is born in Singapore, parents suddenly find themselves navigating a maze of government agencies - the Immigration and Checkpoints Authority for the birth certificate, HDB for housing grants, Baby Bonus from MSF, and CPF contributions. Each carries its own eligibility rules, deadlines, and application portals.</p>
        <p class="copy">The LifeSG Parenting Journey was built to change this. By aggregating services across agencies into a single, guided flow, it removed the burden of discovery from parents during one of the most demanding periods of their lives.</p>

        <div class="section">
          <h2>The Challenge</h2>
          <p>User research conducted in 2022 revealed three persistent pain points that parents faced when trying to access post-birth government services.</p>
          <ol>
            <li><strong>Fragmented entry points.</strong> Parents had to know which agency offered each benefit before they could begin.</li>
            <li><strong>Repeated data entry.</strong> The same personal and household details were required across six separate agency forms.</li>
            <li><strong>No status visibility.</strong> Once applications were submitted, parents had no unified view of their status across agencies.</li>
          </ol>
        </div>
      </section>
    </main>
  </body>
</html>`;

const thumbWidth = 600;
const thumbHeight = 400;
const thumbnailInsetX = 72;
const thumbnailInsetY = 48;
const captureViewport = { width: 1440, height: 900 };

const roundedRect = (width, height, radius, fill) => Buffer.from(`
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" rx="${radius}" fill="${fill}"/>
  </svg>
`);

const outerBackground = roundedRect(thumbWidth, thumbHeight, 64, "#f4f4f4");
const getInnerFrame = () => {
  return {
    insetX: thumbnailInsetX,
    insetY: thumbnailInsetY,
    innerWidth: thumbWidth - thumbnailInsetX * 2,
    innerHeight: thumbHeight - thumbnailInsetY * 2,
  };
};

const createCenteredPlaceholderDataUrl = async () => {
  const response = await fetch(placeholderImage);
  if (!response.ok) {
    throw new Error(`Unable to fetch placeholder image: ${response.status} ${response.statusText}`);
  }

  const source = Buffer.from(await response.arrayBuffer());
  const logo = await sharp(source)
    .trim({
      background: placeholderBackground,
      threshold: 10,
    })
    .resize(320, 320, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .png()
    .toBuffer();

  const logoMetadata = await sharp(logo).metadata();
  const width = logoMetadata.width ?? 0;
  const height = logoMetadata.height ?? 0;
  const canvasWidth = 1200;
  const canvasHeight = 800;

  const centeredPlaceholder = await sharp({
    create: {
      width: canvasWidth,
      height: canvasHeight,
      channels: 4,
      background: placeholderBackground,
    },
  })
    .composite([
      {
        input: logo,
        left: Math.round((canvasWidth - width) / 2),
        top: Math.round((canvasHeight - height) / 2),
      },
    ])
    .png()
    .toBuffer();

  return `data:image/png;base64,${centeredPlaceholder.toString("base64")}`;
};

await mkdir(outputDir, { recursive: true });
const centeredPlaceholderImage = await createCenteredPlaceholderDataUrl();

const browser = await chromium.launch({
  headless: true,
  executablePath: chromePath,
});

try {
  const page = await browser.newPage({
    viewport: captureViewport,
    deviceScaleFactor: 1,
  });

  const thumbnailTargets = [
    ...blockThumbnailKeys.map((key) => ({
      key,
      url: `${baseUrl}/blocks/preview/raw/${key}`,
      selector: ".block-raw-single > :first-child, .block-raw-single",
      isBlock: true,
    })),
    ...pageTemplateKeys.map((key) => ({
      key,
      url: key === "form-page"
        ? `${baseUrl}/blocks/preview/raw/form-all-types`
        : `${baseUrl}/templates/page-templates/preview/raw/${key}`,
      selector: key === "form-page" ? ".block-raw-single > :first-child, .block-raw-single" : "#app",
      crop: key === "form-page" ? { left: 200, top: 0, width: 1040, height: 680 } : undefined,
      customHtml: key === "multi-step-form"
        ? multiStepFormThumbnailMarkup
        : key === "application-management"
          ? applicationManagementThumbnailMarkup
          : key === "catalogue"
            ? catalogueThumbnailMarkup
            : key === "about-us"
              ? aboutUsThumbnailMarkup
              : key === "landing"
                ? landingThumbnailMarkup.replace("CENTERED_PLACEHOLDER_IMAGE", centeredPlaceholderImage)
                : key === "blog"
                  ? blogThumbnailMarkup
          : undefined,
      customSelector: key === "multi-step-form"
        ? ".multi-step-thumbnail"
        : key === "application-management"
          ? ".application-thumbnail"
          : key === "catalogue"
            ? ".catalogue-thumbnail"
            : key === "about-us"
              ? ".about-thumbnail"
              : key === "landing"
                ? ".landing-thumbnail"
                : key === "blog"
                  ? ".blog-thumbnail"
          : undefined,
      preserveCanvas: key === "multi-step-form" || key === "catalogue" || key === "about-us" || key === "landing" || key === "blog",
      preserveImages: key === "about-us",
    })),
  ];

  for (const target of thumbnailTargets) {
    const { key, url, selector } = target;
    if (target.customHtml) {
      await page.setContent(target.customHtml, { waitUntil: "domcontentloaded" });
    } else {
      await page.goto(url, { waitUntil: "networkidle" });
    }
    await page.evaluate(async () => {
      await document.fonts?.ready;
      await customElements.whenDefined("sgds-button").catch(() => {});
      await new Promise((resolve) => window.requestAnimationFrame(() => resolve(undefined)));
    });

    if (!target.preserveImages) {
      await page.evaluate(async (imageSrc) => {
        document.querySelectorAll("img").forEach((image) => {
          image.src = imageSrc;
          image.style.objectFit = "cover";
          image.style.objectPosition = "center";
        });

        document.querySelectorAll("[style]").forEach((element) => {
          const style = element.getAttribute("style") ?? "";
          if (style.includes("placeholder") || style.includes("url(")) {
            element.style.backgroundImage = `url("${imageSrc}")`;
            element.style.backgroundSize = "cover";
            element.style.backgroundPosition = "center";
          }
        });

        await Promise.all(
          Array.from(document.images).map((image) => {
            if (image.complete && image.naturalWidth > 0) return undefined;
            return new Promise((resolve) => {
              image.addEventListener("load", resolve, { once: true });
              image.addEventListener("error", resolve, { once: true });
            });
          }),
        );
      }, centeredPlaceholderImage);
    } else {
      await page.evaluate(async () => {
        await Promise.all(
          Array.from(document.images).map((image) => {
            if (image.complete && image.naturalWidth > 0) return undefined;
            return new Promise((resolve) => {
              image.addEventListener("load", resolve, { once: true });
              image.addEventListener("error", resolve, { once: true });
            });
          }),
        );
      });
    }

    await page.addStyleTag({
      content: `
        html, body {
          background: #fff !important;
          margin: 0 !important;
        }
      `,
    });

    const captureTarget = page.locator(target.customSelector ?? selector).first();
    const capturedScreenshot = await captureTarget.screenshot({ type: "png" });
    const screenshot = target.crop
      ? await sharp(capturedScreenshot).extract(target.crop).png().toBuffer()
      : capturedScreenshot;

    const normalizedContent = target.preserveCanvas
      ? screenshot
      : await sharp(screenshot)
        .trim({
          background: "#fff",
          threshold: 2,
        })
        .extend({
          top: 40,
          right: 40,
          bottom: 40,
          left: 40,
          background: "#fff",
        })
        .png()
        .toBuffer();

    const { insetX, insetY, innerWidth, innerHeight } = getInnerFrame();
    const innerMask = roundedRect(innerWidth, innerHeight, 14, "#fff");

    const innerImage = await sharp(normalizedContent)
      .resize(innerWidth, innerHeight, {
        fit: "contain",
        background: "#fff",
      })
      .composite([{ input: innerMask, blend: "dest-in" }])
      .png()
      .toBuffer();

    await sharp({
      create: {
        width: thumbWidth,
        height: thumbHeight,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([
        { input: outerBackground, left: 0, top: 0 },
        { input: innerImage, left: insetX, top: insetY },
      ])
      .png()
      .toFile(`${outputDirPath}${key}.png`);

    console.log(`Generated ${key}.png`);
  }
} finally {
  await browser.close();
}
