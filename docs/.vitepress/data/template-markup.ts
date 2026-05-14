// Storybook page-template markup, extracted from
// https://github.com/GovTechSG/sgds-web-component/tree/master/stories/templates
//
// Each export corresponds to one .stories.js file. Lit-specific syntax has
// been stripped where needed. Template scripts are preserved when they drive
// Storybook interactivity, and TemplateRaw executes them inside the preview.

export const applicationManagementMarkup = `<div class="sgds:bg-surface-subtle">
  <div>
    <sgds-masthead></sgds-masthead>
    <sgds-mainnav fluid>
      <strong slot="brand">Logo</strong>
      <sgds-mainnav-item href="#">Home</sgds-mainnav-item>
      <sgds-mainnav-item href="#" active>Applications</sgds-mainnav-item>
      <sgds-mainnav-item href="#">Reports</sgds-mainnav-item>
    </sgds-mainnav>
  </div>

  <div class="sgds:flex sgds:flex-col sgds:w-full">
    <div class="sgds-container sgds:py-2-xl sgds:flex sgds:flex-col sgds:gap-2-xl">
      <div class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
        <sgds-breadcrumb>
          <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item><a href="#">Applications</a></sgds-breadcrumb-item>
        </sgds-breadcrumb>

        <div class="sgds:flex sgds:items-start sgds:justify-between">
          <div class="sgds:flex sgds:flex-col sgds:gap-component-sm sgds:flex-1">
            <div class="sgds:flex sgds:items-center sgds:gap-text-sm">
              <div class="sgds:inline-flex sgds:items-center sgds:justify-center sgds:w-10 sgds:h-10 sgds:shrink-0 sgds:p-2 sgds:rounded-md sgds:bg-accent-surface-muted">
                <sgds-icon name="grid-fill" size="24"></sgds-icon>
              </div>
              <h1 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight sgds:text-heading-default sgds:mb-0">Applications</h1>
            </div>
            <div class="sgds:text-label-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-label-default">
              Browse and manage all registered applications in your organisation.
            </div>
          </div>

          <sgds-button variant="primary">
            <sgds-icon name="plus" slot="leftIcon"></sgds-icon>
            Create application
          </sgds-button>
        </div>
      </div>

      <div class="sgds:flex sgds:gap-layout-md sgds:items-start">
        <aside class="sgds:shrink-0 sgds:w-64 sgds:flex sgds:flex-col sgds:gap-2-xl">
          <div class="sgds:flex sgds:gap-4 sgds:items-center">
            <span class="sgds:text-subtitle-md sgds:font-semibold sgds:text-heading-default">Filter by</span>
            <sgds-link><a href="#">Clear all</a></sgds-link>
          </div>

          <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
            <div class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-label-default">Status</div>
            <sgds-checkbox-group>
              <sgds-checkbox value="active">Active (8)</sgds-checkbox>
              <sgds-checkbox value="pending">Pending (3)</sgds-checkbox>
              <sgds-checkbox value="rejected">Rejected (2)</sgds-checkbox>
              <sgds-checkbox value="suspended">Suspended (1)</sgds-checkbox>
            </sgds-checkbox-group>
          </div>

          <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
            <div class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-label-default">Environment</div>
            <sgds-checkbox-group>
              <sgds-checkbox value="production">Production (6)</sgds-checkbox>
              <sgds-checkbox value="staging">Staging (5)</sgds-checkbox>
              <sgds-checkbox value="development">Development (3)</sgds-checkbox>
            </sgds-checkbox-group>
          </div>

          <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
            <div class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-label-default">API type</div>
            <sgds-checkbox-group>
              <sgds-checkbox value="rest">REST (10)</sgds-checkbox>
              <sgds-checkbox value="graphql">GraphQL (2)</sgds-checkbox>
              <sgds-checkbox value="soap">SOAP (2)</sgds-checkbox>
            </sgds-checkbox-group>
          </div>
        </aside>

        <div class="sgds:flex-1 sgds:bg-surface-default sgds:border sgds:border-muted sgds:rounded-lg sgds:p-layout-xs sgds:flex sgds:flex-col sgds:gap-5">
          <div class="sgds:flex sgds:items-center sgds:gap-text-md">
            <div class="sgds:inline-flex sgds:items-center sgds:justify-center sgds:w-10 sgds:h-10 sgds:shrink-0 sgds:p-2 sgds:rounded-md sgds:bg-accent-surface-muted">
              <sgds-icon name="grid-fill" size="24"></sgds-icon>
            </div>
            <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">All applications</h5>
          </div>

          <div class="sgds:flex sgds:items-center sgds:gap-layout-sm">
            <div class="sgds:flex-1">
              <sgds-input type="search" placeholder="Search applications" name="search"></sgds-input>
            </div>
            <sgds-button variant="outline" tone="neutral">
              <sgds-icon name="sliders" slot="leftIcon"></sgds-icon>
              Filter
            </sgds-button>
          </div>

          <div class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-label-default">Showing 6/14 result(s)</div>

          <sgds-table>
            <sgds-table-row>
              <sgds-table-head>Application name</sgds-table-head>
              <sgds-table-head>Organisation</sgds-table-head>
              <sgds-table-head>Environment</sgds-table-head>
              <sgds-table-head>Status</sgds-table-head>
              <sgds-table-head>Actions</sgds-table-head>
            </sgds-table-row>
            <sgds-table-row>
              <sgds-table-cell><sgds-link><a href="#">APEX Gateway v2.1.0</a></sgds-link></sgds-table-cell>
              <sgds-table-cell>[GVT] APEX</sgds-table-cell>
              <sgds-table-cell>Production</sgds-table-cell>
              <sgds-table-cell><sgds-badge variant="success">Active</sgds-badge></sgds-table-cell>
              <sgds-table-cell><sgds-button variant="ghost" size="sm">View</sgds-button></sgds-table-cell>
            </sgds-table-row>
            <sgds-table-row>
              <sgds-table-cell><sgds-link><a href="#">MyInfo Bridge v1.4.0</a></sgds-link></sgds-table-cell>
              <sgds-table-cell>[GVT] NDI</sgds-table-cell>
              <sgds-table-cell>Staging</sgds-table-cell>
              <sgds-table-cell><sgds-badge variant="warning">Pending</sgds-badge></sgds-table-cell>
              <sgds-table-cell><sgds-button variant="ghost" size="sm">View</sgds-button></sgds-table-cell>
            </sgds-table-row>
            <sgds-table-row>
              <sgds-table-cell><sgds-link><a href="#">FormSG Webhook v3.0.0</a></sgds-link></sgds-table-cell>
              <sgds-table-cell>[GVT] OGP</sgds-table-cell>
              <sgds-table-cell>Production</sgds-table-cell>
              <sgds-table-cell><sgds-badge variant="success">Active</sgds-badge></sgds-table-cell>
              <sgds-table-cell><sgds-button variant="ghost" size="sm">View</sgds-button></sgds-table-cell>
            </sgds-table-row>
            <sgds-table-row>
              <sgds-table-cell><sgds-link><a href="#">SingPass Auth v1.2.0</a></sgds-link></sgds-table-cell>
              <sgds-table-cell>[GVT] GDS</sgds-table-cell>
              <sgds-table-cell>Production</sgds-table-cell>
              <sgds-table-cell><sgds-badge variant="danger">Rejected</sgds-badge></sgds-table-cell>
              <sgds-table-cell><sgds-button variant="ghost" size="sm">View</sgds-button></sgds-table-cell>
            </sgds-table-row>
            <sgds-table-row>
              <sgds-table-cell><sgds-link><a href="#">Data.gov Sync v2.0.0</a></sgds-link></sgds-table-cell>
              <sgds-table-cell>[GVT] SNDGO</sgds-table-cell>
              <sgds-table-cell>Development</sgds-table-cell>
              <sgds-table-cell><sgds-badge variant="neutral">Suspended</sgds-badge></sgds-table-cell>
              <sgds-table-cell><sgds-button variant="ghost" size="sm">View</sgds-button></sgds-table-cell>
            </sgds-table-row>
            <sgds-table-row>
              <sgds-table-cell><sgds-link><a href="#">CorpPass Verify v1.0.0</a></sgds-link></sgds-table-cell>
              <sgds-table-cell>[GVT] ACRA</sgds-table-cell>
              <sgds-table-cell>Staging</sgds-table-cell>
              <sgds-table-cell><sgds-badge variant="success">Active</sgds-badge></sgds-table-cell>
              <sgds-table-cell><sgds-button variant="ghost" size="sm">View</sgds-button></sgds-table-cell>
            </sgds-table-row>
          </sgds-table>

          <sgds-pagination total-items="14" items-per-page="6" page="1" class="sgds:me-auto"></sgds-pagination>
        </div>
      </div>
    </div>
    <sgds-footer></sgds-footer>
  </div>
</div>`;

export const catalogueMarkup = `<style>
  .catalogue-empty-state { display: none; }
  .catalogue-empty-state.active { display: flex; }
  .catalogue-title-clamp { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
</style>

<sgds-masthead></sgds-masthead>
<sgds-mainnav>
  <strong slot="brand">Logo</strong>
</sgds-mainnav>

<section class="sgds:bg-default sgds:py-layout-lg">
  <div class="sgds-container">
    <div class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left" style="max-width: var(--sgds-text-max-width);">
      <div class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs">Programmes</div>
      <h1 class="sgds:text-heading-xl sgds:font-bold sgds:leading-xl sgds:tracking-tight sgds:text-heading-default">Browse Programmes</h1>
      <p class="sgds:text-body-lg sgds:leading-md sgds:tracking-normal sgds:text-body-subtle sgds:mb-layout-sm">
        Explore available government programmes and services.
      </p>
      <sgds-input type="search" label="Search" placeholder="Search by name or keyword..." clearable style="width: 100%; max-width: 640px;">
        <sgds-icon slot="prefix" name="search"></sgds-icon>
      </sgds-input>
    </div>
  </div>
</section>

<section class="sgds:bg-default sgds:py-layout-md">
  <div class="sgds-container">
    <div class="sgds-grid sgds:items-start">
      <aside class="sgds-col-12 sgds-col-lg-3 sgds:mr-layout-md">
        <div class="sgds:flex sgds:flex-col sgds:gap-2-xl sgds:pt-sm">
          <div class="sgds:flex sgds:items-center sgds:justify-between">
            <span class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default">Filters</span>
            <sgds-link><a href="#">Clear all</a></sgds-link>
          </div>

          <div class="sgds:flex sgds:flex-col sgds:gap-xs">
            <div class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-heading-default">Programme type</div>
            <sgds-checkbox-group>
              <sgds-checkbox value="opening-address">Opening Address (1)</sgds-checkbox>
              <sgds-checkbox value="keynote">Keynote (4)</sgds-checkbox>
              <sgds-checkbox value="panel-discussion">Panel Discussion (6)</sgds-checkbox>
              <sgds-checkbox value="presentation">Presentation (12)</sgds-checkbox>
            </sgds-checkbox-group>
          </div>

          <div class="sgds:flex sgds:flex-col sgds:gap-xs">
            <div class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-heading-default">Sessions</div>
            <sgds-checkbox-group>
              <sgds-checkbox value="morning" checked>Morning (12)</sgds-checkbox>
              <sgds-checkbox value="afternoon">Afternoon (16)</sgds-checkbox>
            </sgds-checkbox-group>
          </div>

          <div class="sgds:flex sgds:flex-col sgds:gap-xs">
            <div class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-heading-default">Track</div>
            <sgds-checkbox-group>
              <sgds-checkbox value="ai-cybersecurity" checked>AI x Cybersecurity (4)</sgds-checkbox>
              <sgds-checkbox value="resilient-cloud">Resilient and Secure Cloud (6)</sgds-checkbox>
              <sgds-checkbox value="cisos-future">CISOs of the Future (8)</sgds-checkbox>
            </sgds-checkbox-group>
          </div>

          <div class="sgds:flex sgds:flex-col sgds:gap-xs">
            <div class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-heading-default">Event hall</div>
            <sgds-checkbox-group>
              <sgds-checkbox value="hall-a">Hall A</sgds-checkbox>
              <sgds-checkbox value="hall-b">Hall B</sgds-checkbox>
              <sgds-checkbox value="hall-c">Hall C</sgds-checkbox>
            </sgds-checkbox-group>
          </div>
        </div>
      </aside>

      <div class="sgds-col-12 sgds-col-lg-9">
        <div class="sgds:flex sgds:items-center sgds:justify-between sgds:mb-xl">
          <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">Showing 12 results</h5>
          <sgds-select label="" placeholder="Sort by" style="min-width: 200px;">
            <sgds-select-option value="relevance">Most relevant</sgds-select-option>
            <sgds-select-option value="date-asc">Date: Earliest first</sgds-select-option>
            <sgds-select-option value="date-desc">Date: Latest first</sgds-select-option>
            <sgds-select-option value="name-asc">Name: A–Z</sgds-select-option>
            <sgds-select-option value="name-desc">Name: Z–A</sgds-select-option>
          </sgds-select>
        </div>

        <div class="sgds-grid sgds:items-stretch">
          <div class="sgds-col-12 sgds-col-md-6 sgds-col-lg-4 sgds:flex sgds:flex-col">
            <sgds-card stretchedLink style="height: 100%;">
              <sgds-badge slot="upper" outlined>Keynote</sgds-badge>
              <span slot="title" class="catalogue-title-clamp">Digital Infrastructure for the Next Decade</span>
              <span slot="description">An overview of Singapore's plans for resilient and future-ready digital infrastructure.</span>
              <sgds-link slot="footer"><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a></sgds-link>
            </sgds-card>
          </div>
          <div class="sgds-col-12 sgds-col-md-6 sgds-col-lg-4 sgds:flex sgds:flex-col">
            <sgds-card stretchedLink style="height: 100%;">
              <sgds-badge slot="upper" outlined>Panel Discussion</sgds-badge>
              <span slot="title" class="catalogue-title-clamp">AI Governance in the Public Sector</span>
              <span slot="description">Panellists explore responsible AI adoption frameworks and inter-agency collaboration.</span>
              <sgds-link slot="footer"><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a></sgds-link>
            </sgds-card>
          </div>
          <div class="sgds-col-12 sgds-col-md-6 sgds-col-lg-4 sgds:flex sgds:flex-col">
            <sgds-card stretchedLink style="height: 100%;">
              <sgds-badge slot="upper" outlined>Presentation</sgds-badge>
              <span slot="title" class="catalogue-title-clamp">Zero-Trust Architecture for Government Systems</span>
              <span slot="description">A deep dive into implementing zero-trust principles across legacy and modern systems.</span>
              <sgds-link slot="footer"><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a></sgds-link>
            </sgds-card>
          </div>
          <div class="sgds-col-12 sgds-col-md-6 sgds-col-lg-4 sgds:flex sgds:flex-col">
            <sgds-card stretchedLink style="height: 100%;">
              <sgds-badge slot="upper" outlined>Keynote</sgds-badge>
              <span slot="title" class="catalogue-title-clamp">Securing the Cloud: Lessons from the Field</span>
              <span slot="description">Key takeaways from real-world cloud migration projects across the Singapore government.</span>
              <sgds-link slot="footer"><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a></sgds-link>
            </sgds-card>
          </div>
          <div class="sgds-col-12 sgds-col-md-6 sgds-col-lg-4 sgds:flex sgds:flex-col">
            <sgds-card stretchedLink style="height: 100%;">
              <sgds-badge slot="upper" outlined>Presentation</sgds-badge>
              <span slot="title" class="catalogue-title-clamp">Incident Response Playbooks for CISOs</span>
              <span slot="description">Practical frameworks for building effective incident response and recovery strategies.</span>
              <sgds-link slot="footer"><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a></sgds-link>
            </sgds-card>
          </div>
          <div class="sgds-col-12 sgds-col-md-6 sgds-col-lg-4 sgds:flex sgds:flex-col">
            <sgds-card stretchedLink style="height: 100%;">
              <sgds-badge slot="upper" outlined>Panel Discussion</sgds-badge>
              <span slot="title" class="catalogue-title-clamp">Workforce Upskilling for Cyber Resilience</span>
              <span slot="description">How agencies are building cyber talent pipelines and fostering a security-aware culture.</span>
              <sgds-link slot="footer"><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a></sgds-link>
            </sgds-card>
          </div>
        </div>

        <div class="sgds:mt-layout-sm sgds:flex sgds:justify-end">
          <sgds-pagination length="5" currentPage="1" limit="6" size="sm"></sgds-pagination>
        </div>
      </div>
    </div>
  </div>
</section>`;

export const aboutUsMarkup = `<style>
  @keyframes sgds-marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  .sgds-about-logo-track { animation: sgds-marquee 30s linear infinite; }
  @media (prefers-reduced-motion: reduce) { .sgds-about-logo-track { animation: none; } }
</style>

<sgds-masthead></sgds-masthead>

<sgds-mainnav>
  <strong slot="brand">Logo</strong>
</sgds-mainnav>

<div class="sgds:bg-surface-default">
  <div class="sgds-container sgds:py-layout-xl">
    <div class="sgds-grid sgds:mb-layout-lg">
      <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6">
        <h1 class="sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-default">
          Building digital services that matter for Singapore
        </h1>
      </div>
      <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6 sgds:flex sgds:items-end">
        <p class="sgds:text-body-lg sgds:font-regular sgds:leading-md sgds:text-body-subtle">
          We are a team of designers, engineers, and product thinkers committed to delivering citizen-centric digital experiences across government.
        </p>
      </div>
    </div>

    <div class="sgds-grid sgds:mb-layout-lg" style="--sgds-grid-row-gap: var(--sgds-layout-gap-md)">
      <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8 sgds:flex">
        <img
          src="https://images.unsplash.com/photo-1565350897149-38dfafa81d83?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0"
          alt="Team collaborating on a project"
          class="sgds:w-full sgds:object-cover sgds:rounded-lg"
        />
      </div>

      <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4 sgds:flex sgds:flex-col sgds:gap-layout-md">
        <sgds-thumbnail-card class="sgds:flex-1">
          <div slot="thumbnail" class="sgds:w-32 sgds:h-32 sgds:bg-surface-raised sgds:text-default sgds:flex sgds:items-center sgds:justify-center sgds:rounded-lg">
            Logo
          </div>
          <span slot="description">
            Trusted by agencies across the whole-of-government ecosystem to deliver accessible, compliant, and consistent digital interfaces.
          </span>
          <sgds-link slot="footer">
            <a href="/about">Learn more <sgds-icon name="arrow-right"></sgds-icon></a>
          </sgds-link>
        </sgds-thumbnail-card>

        <img
          src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0"
          alt="Office environment"
          class="sgds:w-full sgds:object-cover sgds:rounded-lg"
        />
      </div>
    </div>

    <div class="sgds:mb-layout-lg sgds:overflow-hidden">
      <div class="sgds:text-center sgds:mb-layout-sm">
        <p class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-body-subtle">
          Trusted by agencies
        </p>
      </div>

      <div class="sgds:overflow-hidden sgds:relative" style="mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);">
        <div class="sgds-about-logo-track sgds:flex sgds:gap-layout-xl sgds:w-max">
          <div class="sgds:flex sgds:gap-layout-xl sgds:items-center sgds:shrink-0">
            <div class="sgds:w-30 sgds:h-10 sgds:bg-surface-raised sgds:text-default sgds:flex sgds:items-center sgds:justify-center sgds:opacity-60">Agency A</div>
            <div class="sgds:w-30 sgds:h-10 sgds:bg-surface-raised sgds:text-default sgds:flex sgds:items-center sgds:justify-center sgds:opacity-60">Agency B</div>
            <div class="sgds:w-30 sgds:h-10 sgds:bg-surface-raised sgds:text-default sgds:flex sgds:items-center sgds:justify-center sgds:opacity-60">Agency C</div>
            <div class="sgds:w-30 sgds:h-10 sgds:bg-surface-raised sgds:text-default sgds:flex sgds:items-center sgds:justify-center sgds:opacity-60">Agency D</div>
            <div class="sgds:w-30 sgds:h-10 sgds:bg-surface-raised sgds:text-default sgds:flex sgds:items-center sgds:justify-center sgds:opacity-60">Agency E</div>
          </div>
          <div class="sgds:flex sgds:gap-layout-xl sgds:items-center sgds:shrink-0" aria-hidden="true">
            <div class="sgds:w-30 sgds:h-10 sgds:bg-surface-raised sgds:text-default sgds:flex sgds:items-center sgds:justify-center sgds:opacity-60">Agency A</div>
            <div class="sgds:w-30 sgds:h-10 sgds:bg-surface-raised sgds:text-default sgds:flex sgds:items-center sgds:justify-center sgds:opacity-60">Agency B</div>
            <div class="sgds:w-30 sgds:h-10 sgds:bg-surface-raised sgds:text-default sgds:flex sgds:items-center sgds:justify-center sgds:opacity-60">Agency C</div>
            <div class="sgds:w-30 sgds:h-10 sgds:bg-surface-raised sgds:text-default sgds:flex sgds:items-center sgds:justify-center sgds:opacity-60">Agency D</div>
            <div class="sgds:w-30 sgds:h-10 sgds:bg-surface-raised sgds:text-default sgds:flex sgds:items-center sgds:justify-center sgds:opacity-60">Agency E</div>
          </div>
        </div>
      </div>
    </div>

    <div class="sgds:bg-surface-raised sgds:rounded-lg sgds:p-layout-lg">
      <div class="sgds-grid sgds:mb-layout-md">
        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6">
          <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight sgds:text-default">
            Delivering impact at scale
          </h2>
        </div>
        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6">
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:text-body-subtle">
            Our platform powers services used by millions of residents and thousands of officers across the Singapore government.
          </p>
        </div>
      </div>

      <div class="sgds-grid">
        <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-3">
          <p class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-default">12,000+</p>
          <p class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:text-body-subtle sgds:mt-1">Active users</p>
        </div>
        <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-3">
          <p class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-default">98%</p>
          <p class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:text-body-subtle sgds:mt-1">Platform uptime</p>
        </div>
        <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-3">
          <p class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-default">50+</p>
          <p class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:text-body-subtle sgds:mt-1">Government agencies</p>
        </div>
        <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-3">
          <p class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-default">5 years</p>
          <p class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:text-body-subtle sgds:mt-1">In production</p>
        </div>
      </div>
    </div>
  </div>
</div>

<sgds-footer></sgds-footer>`;

export const formPageMarkup = `<sgds-masthead></sgds-masthead>

  <sgds-mainnav>
    <strong slot="brand">Logo</strong>
  </sgds-mainnav>

  <!-- Page header -->
  <section class="sgds:bg-default sgds:py-layout-lg">
    <div class="sgds-container">
      <div
        class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left"
        style="max-width: var(--sgds-text-max-width);"
      >
        <div
          class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
        >
          Profile Settings
        </div>
        <h1 class="sgds:text-heading-xl sgds:font-bold sgds:leading-xl sgds:tracking-tight sgds:text-heading-default">
          Edit profile
        </h1>
        <p class="sgds:text-body-lg sgds:leading-md sgds:tracking-normal sgds:text-body-subtle">
          Update your personal details and preferences.
        </p>
      </div>
    </div>
  </section>

  <section class="sgds:bg-surface-default sgds:min-h-screen">
    <div class="sgds-container">
      <form id="profile-form" method="post" novalidate>
        <!-- Section 1: Personal information -->
        <div class="sgds:border-t sgds:border-muted sgds:py-layout-md">
          <div class="sgds-grid sgds:gap-layout-md">
            <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
              <h3
                class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:text-heading-default"
              >
                Personal information
              </h3>
              <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
                Your name and contact details. Only your agency administrator can see this information.
              </p>
            </div>

            <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8 sgds:flex sgds:flex-col sgds:gap-component-sm">
              <div class="sgds-grid sgds:gap-component-sm">
                <sgds-input
                  class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6"
                  label="First name"
                  name="firstName"
                  required
                  hasFeedback
                ></sgds-input>
                <sgds-input
                  class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6"
                  label="Last name"
                  name="lastName"
                  required
                  hasFeedback
                ></sgds-input>
              </div>
              <sgds-input
                label="Email address"
                type="email"
                name="email"
                hint="Must be a gov.sg email address."
                required
                hasFeedback
              ></sgds-input>
              <sgds-input
                label="Phone number"
                type="tel"
                name="phone"
                hint="Singapore number including country code, e.g. +65 9123 4567"
                hasFeedback
              ></sgds-input>
            </div>
          </div>
        </div>

        <!-- Section 2: Role & access -->
        <div class="sgds:border-t sgds:border-muted sgds:py-layout-md">
          <div class="sgds-grid sgds:gap-layout-md">
            <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
              <h3
                class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:text-heading-default"
              >
                Role &amp; access
              </h3>
              <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
                Your position and assigned permissions within the system.
              </p>
            </div>

            <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8 sgds:flex sgds:flex-col sgds:gap-component-sm">
              <sgds-input label="Job title" name="jobTitle" hasFeedback></sgds-input>
              <sgds-select label="Department" name="department" placeholder="Select department" hasFeedback>
                <sgds-select-option value="policy">Policy</sgds-select-option>
                <sgds-select-option value="operations">Operations</sgds-select-option>
                <sgds-select-option value="ict">ICT</sgds-select-option>
              </sgds-select>
              <sgds-select label="Access level" name="accessLevel" hasFeedback>
                <sgds-select-option value="viewer">Viewer</sgds-select-option>
                <sgds-select-option value="editor">Editor</sgds-select-option>
                <sgds-select-option value="admin">Admin</sgds-select-option>
              </sgds-select>
            </div>
          </div>
        </div>

        <!-- Section 3: Notes -->
        <div class="sgds:border-t sgds:border-muted sgds:py-layout-md">
          <div class="sgds-grid sgds:gap-layout-md">
            <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
              <h3
                class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:text-heading-default"
              >
                Notes
              </h3>
              <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
                Optional additional context visible to your team.
              </p>
            </div>

            <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8">
              <sgds-textarea
                label="Internal notes"
                name="notes"
                rows="4"
                maxlength="500"
                characterCount
                hint="Max 500 characters."
              ></sgds-textarea>
            </div>
          </div>
        </div>

        <!-- Form footer -->
        <div
          class="sgds:border-t sgds:border-muted sgds:pt-layout-sm sgds:flex sgds:justify-end sgds:gap-component-sm sgds:mb-layout-lg "
        >
          <sgds-button variant="outline" type="button">Cancel</sgds-button>
          <sgds-button variant="primary" type="submit">Save changes</sgds-button>
        </div>
      </form>
    </div>
  </section>

  <sgds-footer></sgds-footer>`;

export const multiStepFormPageMarkup = `<style>
    .step-section {
      display: none;
    }
    .step-section.active {
      display: block;
    }
  </style>

  <sgds-masthead></sgds-masthead>

  <sgds-mainnav>
    <strong slot="brand">Logo</strong>
    <sgds-mainnav-item slot="end">
      <a href="#" class="sgds:text-sm sgds:text-body-subtle">Save draft</a>
    </sgds-mainnav-item>
  </sgds-mainnav>

  <!-- ── Page header ──────────────────────────────────────── -->
  <section id="page-header" class="sgds:bg-surface-default sgds:py-layout-lg">
    <div class="sgds-container">
      <div
        class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left sgds:gap-layout-md"
        style="max-width: var(--sgds-text-max-width);"
      >
        <sgds-breadcrumb>
          <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item><a href="#">Grants</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item active><a href="#">Sustainability Grant Application</a></sgds-breadcrumb-item>
        </sgds-breadcrumb>

        <div>
          <div
            class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
          >
            Grant Programme
          </div>
          <h1 class="sgds:text-heading-xl sgds:font-bold sgds:leading-xl sgds:tracking-tight sgds:text-heading-default">
            Enterprise Sustainability Grant
          </h1>
          <p class="sgds:text-body-lg sgds:leading-md sgds:tracking-normal sgds:text-body-subtle">
            Apply for funding to implement sustainability initiatives in your business. Grant quantum: up to 70% of
            qualifying costs, capped at S$30,000 per project.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="sgds:bg-surface-default sgds:min-h-screen">
    <div class="sgds-container sgds:py-2-xl">
      <!-- ── Info alert ─────────────────────────────────────── -->
      <sgds-alert variant="info" class="sgds:mb-layout-md" dismissible>
        <strong>Before you begin:</strong> Ensure you have your company UEN, latest financial statements, and project
        quotations ready. Applications typically take 20-30 minutes to complete.
      </sgds-alert>

      <!-- ── Stepper ───────────────────────────────────────── -->
      <sgds-stepper id="grant-stepper" class="sgds:mb-layout-md"></sgds-stepper>

      <!-- ═══════════════════════════════════════════════════
           STEP 1 Eligibility Check
      ════════════════════════════════════════════════════ -->
      <section id="step-eligibility" class="step-section active">
        <form id="form-eligibility" novalidate>
          <div class="sgds:border-t sgds:border-muted sgds:py-layout-md">
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
                <h2
                  class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:text-heading-default"
                >
                  Company Information
                </h2>
                <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
                  Basic details about your registered business entity.
                </p>
              </div>
              <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8 sgds:flex sgds:flex-col sgds:gap-layout-md">
                <div class="sgds-grid sgds:gap-component-sm">
                  <sgds-input
                    class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6"
                    id="uen"
                    label="Unique Entity Number (UEN)"
                    name="uen"
                    placeholder="e.g. 201234567A"
                    required
                    hasFeedback="both"
                    invalidFeedback="Enter a valid 9- or 10-character UEN"
                  ></sgds-input>
                  <sgds-input
                    class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6"
                    id="companyName"
                    label="Registered Company Name"
                    name="companyName"
                    placeholder="e.g. Green Solutions Pte. Ltd."
                    required
                    hasFeedback="both"
                  ></sgds-input>
                </div>

                <sgds-select
                  id="businessStructure"
                  label="Business Structure"
                  name="businessStructure"
                  placeholder="Select a business structure"
                  required
                  hasFeedback
                  invalidFeedback="Select a business structure"
                >
                  <sgds-select-option value="sole-proprietorship">Sole Proprietorship</sgds-select-option>
                  <sgds-select-option value="partnership"
                    >Partnership / Limited Liability Partnership</sgds-select-option
                  >
                  <sgds-select-option value="private-limited">Private Limited Company (Pte. Ltd.)</sgds-select-option>
                  <sgds-select-option value="public-limited">Public Limited Company (Ltd.)</sgds-select-option>
                  <sgds-select-option value="cooperative">Co-operative</sgds-select-option>
                </sgds-select>

                <div class="sgds-grid sgds:gap-component-sm">
                  <sgds-select
                    class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6"
                    id="employeeCount"
                    label="Number of Employees"
                    name="employeeCount"
                    placeholder="Select a range"
                    required
                    hasFeedback
                    invalidFeedback="Select an employee count"
                    hintText="As at last financial year end"
                  >
                    <sgds-select-option value="1-10">1 - 10</sgds-select-option>
                    <sgds-select-option value="11-50">11 - 50</sgds-select-option>
                    <sgds-select-option value="51-200">51 - 200</sgds-select-option>
                    <sgds-select-option value="201+">More than 200 (not eligible)</sgds-select-option>
                  </sgds-select>
                  <sgds-select
                    class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6"
                    id="annualTurnover"
                    label="Annual Turnover"
                    name="annualTurnover"
                    placeholder="Select a range"
                    required
                    hasFeedback
                    invalidFeedback="Select an annual turnover range"
                    hintText="As at last financial year end"
                  >
                    <sgds-select-option value="lt-1m">Less than S$1 million</sgds-select-option>
                    <sgds-select-option value="1m-10m">S$1 million - S$10 million</sgds-select-option>
                    <sgds-select-option value="10m-50m">S$10 million - S$50 million</sgds-select-option>
                    <sgds-select-option value="50m-100m">S$50 million - S$100 million</sgds-select-option>
                    <sgds-select-option value="gt-100m">More than S$100 million (not eligible)</sgds-select-option>
                  </sgds-select>
                </div>
              </div>
            </div>
          </div>

          <div class="sgds:border-t sgds:border-muted sgds:py-layout-md">
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
                <h2
                  class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:text-heading-default"
                >
                  Industry & History
                </h2>
                <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
                  Your primary sector and prior engagement with government grants.
                </p>
              </div>
              <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8 sgds:flex sgds:flex-col sgds:gap-layout-md">
                <div class="sgds-grid sgds:gap-component-sm">
                  <sgds-select
                    class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6"
                    id="industrySector"
                    label="Primary Industry Sector"
                    name="industrySector"
                    placeholder="Select a sector"
                    required
                    hasFeedback
                  >
                    <sgds-select-option value="food-beverage">Food & Beverage</sgds-select-option>
                    <sgds-select-option value="retail">Retail</sgds-select-option>
                    <sgds-select-option value="manufacturing">Manufacturing</sgds-select-option>
                    <sgds-select-option value="construction">Construction</sgds-select-option>
                    <sgds-select-option value="logistics">Logistics & Transportation</sgds-select-option>
                    <sgds-select-option value="hospitality">Hospitality & Tourism</sgds-select-option>
                    <sgds-select-option value="professional-services">Professional Services</sgds-select-option>
                    <sgds-select-option value="healthcare">Healthcare</sgds-select-option>
                    <sgds-select-option value="ict">ICT & Digital Services</sgds-select-option>
                    <sgds-select-option value="other">Other</sgds-select-option>
                  </sgds-select>
                  <sgds-select
                    class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6"
                    id="yearsInOperation"
                    label="Years in Operation"
                    name="yearsInOperation"
                    placeholder="Select a range"
                    required
                    hasFeedback
                  >
                    <sgds-select-option value="lt-1">Less than 1 year (not eligible)</sgds-select-option>
                    <sgds-select-option value="1-3">1 - 3 years</sgds-select-option>
                    <sgds-select-option value="3-5">3 - 5 years</sgds-select-option>
                    <sgds-select-option value="gt-5">More than 5 years</sgds-select-option>
                  </sgds-select>
                </div>

                <sgds-radio-group
                  id="priorGrant"
                  label="Have you previously received this grant?"
                  name="priorGrant"
                  required
                  hasFeedback
                >
                  <sgds-radio value="no">No, this is my first application</sgds-radio>
                  <sgds-radio value="yes-different">Yes, for a different project</sgds-radio>
                  <sgds-radio value="yes-same">Yes, for a similar project (may affect eligibility)</sgds-radio>
                </sgds-radio-group>
              </div>
            </div>
          </div>

          <div
            class="sgds:border-t sgds:border-muted sgds:pt-layout-sm sgds:flex sgds:justify-end sgds:gap-component-sm"
          >
            <sgds-button id="btn-next-1" variant="primary" type="button">
              Next: Project Details
              <sgds-icon name="arrow-right" slot="rightIcon"></sgds-icon>
            </sgds-button>
          </div>
        </form>
      </section>

      <!-- ═══════════════════════════════════════════════════
           STEP 2 Project Details
      ════════════════════════════════════════════════════ -->
      <section id="step-project" class="step-section">
        <form id="form-project" novalidate>
          <div class="sgds:border-t sgds:border-muted sgds:py-layout-md">
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
                <h2
                  class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:text-heading-default"
                >
                  Project Overview
                </h2>
                <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
                  Describe the sustainability initiative you are seeking funding for.
                </p>
              </div>
              <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8 sgds:flex sgds:flex-col sgds:gap-layout-md">
                <sgds-input
                  id="projectTitle"
                  label="Project Title"
                  name="projectTitle"
                  placeholder="e.g. Solar Panel Installation at Ang Mo Kio Factory"
                  required
                  hasFeedback="both"
                  invalidFeedback="Provide a project title"
                ></sgds-input>

                <sgds-select
                  id="projectCategory"
                  label="Project Category"
                  name="projectCategory"
                  placeholder="Select a category"
                  required
                  hasFeedback
                >
                  <sgds-select-option value="renewable-energy"
                    >Renewable Energy (Solar, Wind, Biogas)</sgds-select-option
                  >
                  <sgds-select-option value="energy-efficiency">Energy Efficiency & Management</sgds-select-option>
                  <sgds-select-option value="water-conservation">Water Conservation & Recycling</sgds-select-option>
                  <sgds-select-option value="waste-management">Waste Reduction & Circular Economy</sgds-select-option>
                  <sgds-select-option value="green-transport">Green Transport & Logistics</sgds-select-option>
                  <sgds-select-option value="sustainable-procurement"
                    >Sustainable Procurement & Supply Chain</sgds-select-option
                  >
                  <sgds-select-option value="green-building">Green Building Retrofit</sgds-select-option>
                  <sgds-select-option value="carbon-management">Carbon Measurement & Management</sgds-select-option>
                </sgds-select>

                <sgds-textarea
                  id="projectDescription"
                  label="Project Description"
                  name="projectDescription"
                  placeholder="e.g. We plan to install rooftop solar panels across our warehouse facility to reduce grid electricity dependency and lower carbon emissions..."
                  rows="5"
                  minlength="100"
                  maxlength="2000"
                  characterCount
                  required
                  hasFeedback="both"
                  invalidFeedback="Provide a description of at least 100 characters"
                  hintText="Describe what you plan to implement and how it will improve your sustainability performance (min. 100 characters)"
                ></sgds-textarea>
              </div>
            </div>
          </div>

          <div
            class="sgds:border-t sgds:border-muted sgds:pt-layout-sm sgds:flex sgds:justify-between sgds:gap-component-sm"
          >
            <sgds-button id="btn-prev-2" variant="outline" type="button">
              <sgds-icon name="arrow-left" slot="leftIcon"></sgds-icon>
              Back
            </sgds-button>
            <sgds-button id="btn-next-2" variant="primary" type="button">
              Next: Review
              <sgds-icon name="arrow-right" slot="rightIcon"></sgds-icon>
            </sgds-button>
          </div>
        </form>
      </section>

      <!-- ═══════════════════════════════════════════════════
           STEP 3 Review & Declare
      ════════════════════════════════════════════════════ -->
      <section id="step-review" class="step-section">
        <form id="form-review" novalidate>
          <div class="sgds:border-t sgds:border-muted sgds:py-layout-md">
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
                <h2
                  class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:text-heading-default"
                >
                  Application Summary
                </h2>
                <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
                  Review all details before submitting. Use the Back button to correct any information.
                </p>
              </div>
              <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8">
                <div class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
                  <sgds-description-list-group bordered>
                    <span slot="title">Company Information</span>
                    <sgds-description-list>UEN<span slot="data" id="rv-uen">-</span></sgds-description-list>
                    <sgds-description-list
                      >Company Name<span slot="data" id="rv-companyName">-</span></sgds-description-list
                    >
                    <sgds-description-list
                      >Business Structure<span slot="data" id="rv-businessStructure">-</span></sgds-description-list
                    >
                  </sgds-description-list-group>

                  <sgds-description-list-group bordered>
                    <span slot="title">Project Details</span>
                    <sgds-description-list
                      >Project Title<span slot="data" id="rv-projectTitle">-</span></sgds-description-list
                    >
                    <sgds-description-list
                      >Category<span slot="data" id="rv-projectCategory">-</span></sgds-description-list
                    >
                  </sgds-description-list-group>
                </div>
              </div>
            </div>
          </div>

          <div class="sgds:border-t sgds:border-muted sgds:py-layout-md">
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
                <h2
                  class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:text-heading-default"
                >
                  Declarations
                </h2>
                <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
                  All declarations must be acknowledged before submission.
                </p>
              </div>
              <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8 sgds:flex sgds:flex-col sgds:gap-layout-md">
                <sgds-checkbox
                  id="decl-accurate"
                  name="declAccurate"
                  value="yes"
                  required
                  hasFeedback="both"
                  invalidFeedback="You must confirm this declaration"
                >
                  I declare that all information provided in this application is true, complete, and accurate to the
                  best of my knowledge.
                </sgds-checkbox>

                <sgds-checkbox
                  id="decl-tnc"
                  name="declTnc"
                  value="yes"
                  required
                  hasFeedback="both"
                  invalidFeedback="You must agree to the Terms and Conditions"
                >
                  I have read and agree to the
                  <a href="#" class="sgds:text-info-default sgds:underline">Terms and Conditions</a>.
                </sgds-checkbox>
              </div>
            </div>
          </div>

          <div
            class="sgds:border-t sgds:border-muted sgds:pt-layout-sm sgds:flex sgds:justify-between sgds:gap-component-sm"
          >
            <sgds-button id="btn-prev-3" variant="outline" type="button">
              <sgds-icon name="arrow-left" slot="leftIcon"></sgds-icon>
              Back
            </sgds-button>
            <sgds-button id="btn-submit" variant="primary" type="submit">
              Submit Application
              <sgds-icon name="send" slot="rightIcon"></sgds-icon>
            </sgds-button>
          </div>
        </form>
      </section>

      <!-- ═══════════════════════════════════════════════════
           SUCCESS STATE
      ════════════════════════════════════════════════════ -->
      <section id="step-success" class="step-section">
        <div class="sgds:flex sgds:flex-col sgds:items-center sgds:text-center sgds:py-layout-xl sgds:gap-layout-md">
          <sgds-icon name="check-circle-fill" size="3-xl" class="sgds:text-success-default"></sgds-icon>

          <div>
            <h1
              class="sgds:text-heading-xl sgds:font-bold sgds:leading-xl sgds:tracking-tight sgds:text-heading-default"
            >
              Application Submitted
            </h1>
            <p class="sgds:text-body-lg sgds:leading-md sgds:tracking-normal sgds:text-body-subtle">
              Thank you for applying for the Enterprise Sustainability Grant.
            </p>
          </div>

          <div>
            <div
              class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
            >
              Reference Number
            </div>
            <h4
              id="ref-number"
              class="sgds:text-heading-sm sgds:font-light sgds:leading-sm sgds:tracking-tight sgds:text-heading-default"
            >
              ESG-2026-12345
            </h4>
          </div>
        </div>
      </section>
    </div>
  </section>

  <sgds-footer></sgds-footer>

  <!-- ── Script ──────────────────────────────────────────────── -->
  <script>
    const stepper = document.getElementById("grant-stepper");

    const STEPS = [
      { stepHeader: "Eligibility", component: "eligibility" },
      { stepHeader: "Project Details", component: "project" },
      { stepHeader: "Review & Declare", component: "review" }
    ];

    const SECTIONS = {
      eligibility: document.getElementById("step-eligibility"),
      project: document.getElementById("step-project"),
      review: document.getElementById("step-review"),
      success: document.getElementById("step-success")
    };

    const FORMS = {
      eligibility: document.getElementById("form-eligibility"),
      project: document.getElementById("form-project"),
      review: document.getElementById("form-review")
    };

    stepper.steps = STEPS;
    stepper.activeStep = 0;

    function showSection(key) {
      Object.values(SECTIONS).forEach(s => s.classList.remove("active"));
      SECTIONS[key].classList.add("active");
    }

    function validateStep(formId) {
      const form = FORMS[formId];
      if (!form) return true;
      return form.reportValidity();
    }

    stepper.addEventListener("sgds-arrived", () => {
      const key = STEPS[stepper.activeStep].component;
      showSection(key);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.getElementById("btn-next-1").addEventListener("click", () => {
      if (!validateStep("eligibility")) return;
      stepper.nextStep();
    });

    document.getElementById("btn-prev-2").addEventListener("click", () => stepper.previousStep());

    document.getElementById("btn-next-2").addEventListener("click", () => {
      if (!validateStep("project")) return;
      populateReview();
      stepper.nextStep();
    });

    document.getElementById("btn-prev-3").addEventListener("click", () => stepper.previousStep());

    const LABELS = {
      businessStructure: {
        "sole-proprietorship": "Sole Proprietorship",
        partnership: "Partnership / LLP",
        "private-limited": "Private Limited (Pte. Ltd.)",
        "public-limited": "Public Limited (Ltd.)",
        cooperative: "Co-operative"
      },
      projectCategory: {
        "renewable-energy": "Renewable Energy",
        "energy-efficiency": "Energy Efficiency",
        "water-conservation": "Water Conservation",
        "waste-management": "Waste Management",
        "green-transport": "Green Transport",
        "sustainable-procurement": "Sustainable Procurement",
        "green-building": "Green Building Retrofit",
        "carbon-management": "Carbon Management"
      }
    };

    function resolveLabel(field, value) {
      const map = LABELS[field];
      return map && map[value] ? map[value] : value || "-";
    }

    function populateReview() {
      const fields = ["uen", "companyName", "businessStructure", "projectTitle", "projectCategory"];

      fields.forEach(id => {
        const el = document.getElementById(id);
        const rvEl = document.getElementById("rv-" + id);
        if (!el || !rvEl) return;
        const raw = el.value || "";
        rvEl.textContent = resolveLabel(id, raw) || "-";
      });
    }

    document.getElementById("form-review").addEventListener("submit", e => {
      e.preventDefault();
      if (!e.target.reportValidity()) return;

      const refNum = "ESG-2026-" + String(Math.floor(10000 + Math.random() * 90000)).padStart(5, "0");
      document.getElementById("ref-number").textContent = refNum;

      stepper.style.display = "none";
      document.getElementById("page-header").style.display = "none";
      Object.values(SECTIONS).forEach(s => s.classList.remove("active"));
      SECTIONS.success.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  </script>`;

export const reportIssueMarkup = `<sgds-masthead></sgds-masthead>
<sgds-mainnav>
  <strong slot="brand">Logo</strong>
</sgds-mainnav>

<section class="sgds:bg-default sgds:py-layout-lg">
  <div class="sgds-container">
    <div class="sgds-grid">
      <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8">
        <div>
          <div class="sgds:mb-layout-md">
            <h1 class="sgds:text-heading-xl sgds:font-bold sgds:leading-xl sgds:tracking-tight sgds:text-heading-default">
              Report an Issue
            </h1>
            <p class="sgds:text-body-lg sgds:leading-md sgds:tracking-normal sgds:text-body-subtle">
              Help us improve by reporting problems in your area. We aim to respond within 3 working days.
            </p>
          </div>

          <form class="sgds:flex sgds:flex-col sgds:gap-form-2-xl">
            <sgds-input
              type="text"
              label="Location"
              name="location"
              placeholder="e.g. Blk 123 Ang Mo Kio Ave 6, near bus stop"
              hintText="Enter a street address or describe the location"
              required
              hasFeedback="both"
              invalidFeedback="Please enter the location of the issue"
            ></sgds-input>

            <sgds-textarea
              label="Description"
              name="description"
              placeholder="Describe the issue in detail - what it is, how long it has been there, and any safety concerns"
              hintText="Minimum 20 characters"
              rows="5"
              minlength="20"
              maxlength="500"
              required
              hasFeedback="both"
              invalidFeedback="Please describe the issue (at least 20 characters)"
            ></sgds-textarea>

            <sgds-file-upload
              label="Photos (optional)"
              name="photos"
              accept="image/*"
              multiple
              hintText="Upload up to 3 photos. JPEG or PNG, max 5MB each."
            >
              Upload Photos
            </sgds-file-upload>

            <sgds-button type="submit" variant="primary" size="md" class="sgds:self-end">
              Submit Report
            </sgds-button>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>

<sgds-footer></sgds-footer>`;

export const blogMarkup = `<style>
  .blog-stats-row { display: flex; flex-wrap: wrap; gap: var(--sgds-gap-layout-md); }
  .blog-stats-row > * { width: 100%; }
  @media (width >= 768px) {
    .blog-stats-row { flex-wrap: nowrap; }
    .blog-stats-row > * { flex: 1; width: auto; }
  }
</style>

<sgds-masthead></sgds-masthead>
<sgds-mainnav>
  <strong slot="brand">Logo</strong>
</sgds-mainnav>

<section class="sgds:bg-alternate sgds:py-layout-md">
  <div class="sgds-container">
    <div class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left sgds:gap-layout-md" style="max-width: var(--sgds-text-max-width);">
      <sgds-breadcrumb>
        <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
        <sgds-breadcrumb-item><a href="#">Stories</a></sgds-breadcrumb-item>
        <sgds-breadcrumb-item active><a href="#">LifeSG Parenting Journey</a></sgds-breadcrumb-item>
      </sgds-breadcrumb>

      <div>
        <div class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs">Success Story</div>
        <h1 class="sgds:text-heading-xl sgds:font-bold sgds:leading-xl sgds:tracking-tight sgds:text-heading-default">
          How LifeSG Helped 180,000 New Parents Navigate Government Services
        </h1>
        <p class="sgds:text-body-lg sgds:leading-md sgds:tracking-normal sgds:text-body-subtle sgds:mb-0">
          A look at how the Parenting Journey feature reduced time-to-access for critical family services by 60% in its first year.
        </p>
      </div>
    </div>
  </div>
</section>

<section class="sgds:bg-default sgds:py-layout-md">
  <div class="sgds-container">
    <div style="max-width: var(--sgds-text-max-width);">
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default">
        When a child is born in Singapore, parents suddenly find themselves navigating a maze of government agencies - the Immigration and Checkpoints Authority for the birth certificate, HDB for housing grants, Baby Bonus from MSF, and CPF contributions. Each carries its own eligibility rules, deadlines, and application portals.
      </p>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default sgds:mb-0">
        The LifeSG Parenting Journey was built to change this. By aggregating services across agencies into a single, guided flow, it removed the burden of discovery from parents during one of the most demanding periods of their lives.
      </p>
    </div>
  </div>
</section>

<section class="sgds:bg-default sgds:py-layout-md">
  <div class="sgds-container">
    <div style="max-width: var(--sgds-text-max-width);">
      <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight sgds:text-heading-default">The Challenge</h2>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default">
        User research conducted in 2022 revealed three persistent pain points that parents faced when trying to access post-birth government services.
      </p>
      <ol style="padding-left: var(--sgds-spacing-lg); margin: 0;">
        <li class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default"><strong>Fragmented entry points.</strong> Parents had to know which agency offered each benefit before they could begin. Many missed out on grants simply because they were unaware of them.</li>
        <li class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default"><strong>Repeated data entry.</strong> The same personal and household details were required across six separate agency forms, leading to fatigue and errors.</li>
        <li class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default"><strong>No status visibility.</strong> Once applications were submitted, parents had no unified view of their status across agencies - each required a separate login to check progress.</li>
      </ol>
    </div>
  </div>
</section>

<section class="sgds:bg-alternate sgds:py-layout-md">
  <div class="sgds-container">
    <div style="max-width: var(--sgds-text-max-width);">
      <div class="sgds:mb-layout-md">
        <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight sgds:text-heading-default">Results After 12 Months</h2>
        <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0">
          Measured against a baseline cohort from the year prior to launch.
        </p>
      </div>

      <div class="blog-stats-row">
        <div class="sgds:flex sgds:flex-col sgds:items-start" style="padding-right: var(--sgds-spacing-layout-xs);">
          <div class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default">60%</div>
          <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default">Reduction in time-to-access</h5>
          <p class="sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-label-subtle sgds:mb-0">Average time from birth registration to first benefit received fell from 14 days to 5.5 days.</p>
        </div>
        <div class="sgds:flex sgds:flex-col sgds:items-start" style="padding-right: var(--sgds-spacing-layout-xs);">
          <div class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default">180K</div>
          <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default">Parents onboarded</h5>
          <p class="sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-label-subtle sgds:mb-0">Representing 94% of all new births registered in Singapore during the period.</p>
        </div>
        <div class="sgds:flex sgds:flex-col sgds:items-start" style="padding-right: var(--sgds-spacing-layout-xs);">
          <div class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default">4.7</div>
          <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default">Satisfaction score (out of 5)</h5>
          <p class="sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-label-subtle sgds:mb-0">Based on 12,400 post-task survey responses collected in-app.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="sgds:bg-default sgds:py-layout-md">
  <div class="sgds-container">
    <div style="max-width: var(--sgds-text-max-width);">
      <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight sgds:text-heading-default">What's Next</h2>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default">
        Building on the success of the Parenting Journey, the team is now expanding the life-moments model to cover eldercare transitions, housing upgrades, and retirement planning - applying the same cross-agency integration approach to new resident cohorts.
      </p>
      <h6 class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-heading-default">Published April 2026</h6>
      <p class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-default">
        Government Digital Services, Smart Nation and Digital Government Office
      </p>
      <sgds-button variant="primary" size="md">Read More Stories</sgds-button>
    </div>
  </div>
</section>

<sgds-footer></sgds-footer>`;

export const landingMarkup = `<style>
  .landing-hero-row { display: flex; flex-direction: column; gap: var(--sgds-gap-layout-md); }
  .landing-hero-row > * { width: 100%; }
  @media (width >= 768px) {
    .landing-hero-row { flex-direction: row; align-items: center; }
    .landing-hero-row > :first-child { width: 50%; padding-top: var(--sgds-spacing-layout-xs); padding-right: var(--sgds-spacing-layout-md); }
    .landing-hero-row > :last-child { width: 50%; }
  }
  .landing-stats-row { display: flex; flex-wrap: wrap; gap: var(--sgds-gap-layout-md); }
  .landing-stats-row > * { width: 100%; }
  @media (width >= 1024px) {
    .landing-stats-row { flex-wrap: nowrap; }
    .landing-stats-row > * { flex: 1; width: auto; }
  }
</style>

<sgds-masthead></sgds-masthead>
<sgds-mainnav>
  <strong slot="brand">Logo</strong>
</sgds-mainnav>

<section class="sgds:bg-default sgds:py-layout-md sgds:min-h-[600px]">
  <div class="sgds-container">
    <div class="landing-hero-row">
      <div class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left">
        <div class="sgds:mb-xl">
          <div class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs">
            Singapore Government Digital Services
          </div>
          <h1 class="sgds:text-display-lg sgds:font-bold sgds:leading-3-xl sgds:tracking-tighter sgds:text-display-default">
            One Platform.<br />Simpler Living.
          </h1>
          <h4 class="sgds:text-heading-sm sgds:font-light sgds:leading-sm sgds:tracking-tight sgds:text-heading-default">
            Access government services anytime, anywhere. Built for residents, designed for ease.
          </h4>
        </div>
        <div class="sgds:flex sgds:gap-component-md">
          <sgds-button variant="primary" size="md">Get Started</sgds-button>
          <sgds-button variant="outline" size="md">Learn More</sgds-button>
        </div>
      </div>

      <div>
        <img
          src="https://webcomponent.designsystem.tech.gov.sg/placeholder-sgds.png"
          alt=""
          class="sgds:block sgds:aspect-square sgds:w-full sgds:rounded-xl sgds:object-cover"
        />
      </div>
    </div>
  </div>
</section>

<section class="sgds:bg-default sgds:py-layout-md">
  <div class="sgds-container">
    <div style="display: flex; flex-direction: column; gap: var(--sgds-gap-layout-md);">
      <div class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left" style="padding-bottom: var(--sgds-spacing-layout-md);">
        <div class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs">Life Moments</div>
        <h2 class="sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-display-default">
          Built for Every Stage of Life
        </h2>
        <h5 class="sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">
          Services grouped around your life moments - not government structures.
        </h5>
      </div>

      <div class="sgds-grid" style="gap: var(--sgds-gap-layout-md);">
        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
          <sgds-card tinted hideBorder stretchedLink>
            <span slot="subtitle">FAMILY</span>
            <span slot="title">Family and Relationships</span>
            <span slot="description">Register births, apply for child development grants, and access parenting resources all in one place.</span>
            <sgds-link slot="footer"><a href="#">Learn more <sgds-icon name="arrow-right"></sgds-icon></a></sgds-link>
          </sgds-card>
        </div>
        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
          <sgds-card tinted hideBorder stretchedLink>
            <span slot="subtitle">HOUSING</span>
            <span slot="title">Home and Housing</span>
            <span slot="description">Check eligibility, apply for flats, and manage your property-related transactions with HDB and other agencies.</span>
            <sgds-link slot="footer"><a href="#">Learn more <sgds-icon name="arrow-right"></sgds-icon></a></sgds-link>
          </sgds-card>
        </div>
        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
          <sgds-card tinted hideBorder stretchedLink>
            <span slot="subtitle">EMPLOYMENT</span>
            <span slot="title">Work and Employment</span>
            <span slot="description">Search for jobs, upskill through SkillsFuture, and access employment support schemes tailored to your needs.</span>
            <sgds-link slot="footer"><a href="#">Learn more <sgds-icon name="arrow-right"></sgds-icon></a></sgds-link>
          </sgds-card>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="sgds:bg-default sgds:py-layout-md">
  <div class="sgds-container">
    <div style="display: flex; flex-direction: column; gap: var(--sgds-gap-layout-md);">
      <div style="max-width: var(--sgds-text-max-width);">
        <div class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs">By the Numbers</div>
        <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight sgds:text-heading-default">Impact at a Glance</h2>
        <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0">
          Key metrics measured over the past 12 months across all participating agencies.
        </p>
      </div>

      <div class="landing-stats-row">
        <div class="sgds:flex sgds:flex-col sgds:items-start" style="padding-right: var(--sgds-spacing-layout-xs);">
          <div class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default">2.4M</div>
          <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default">Active Users</h5>
          <p class="sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-label-subtle sgds:mb-0">Residents actively using the platform to access government services each month.</p>
        </div>
        <div class="sgds:flex sgds:flex-col sgds:items-start" style="padding-right: var(--sgds-spacing-layout-xs);">
          <div class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default">400+</div>
          <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default">Government Services</h5>
          <p class="sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-label-subtle sgds:mb-0">Integrated services from agencies across the public sector in one place.</p>
        </div>
        <div class="sgds:flex sgds:flex-col sgds:items-start" style="padding-right: var(--sgds-spacing-layout-xs);">
          <div class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default">99.9%</div>
          <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default">Platform Uptime</h5>
          <p class="sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-label-subtle sgds:mb-0">Consistently high availability so residents can access services anytime.</p>
        </div>
        <div class="sgds:flex sgds:flex-col sgds:items-start" style="padding-right: var(--sgds-spacing-layout-xs);">
          <div class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default">16</div>
          <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default">Partner Agencies</h5>
          <p class="sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-label-subtle sgds:mb-0">Public agencies contributing services and data to the shared platform.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="sgds:bg-alternate sgds:py-layout-md">
  <div class="sgds-container">
    <div class="sgds:flex sgds:flex-col sgds:items-center sgds:text-center sgds:mx-auto" style="max-width: var(--sgds-text-max-width);">
      <h2 class="sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-display-default">
        Ready to simplify your government experience?
      </h2>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default">
        Join millions of residents already using LifeSG to access the services that matter most to them.
      </p>
      <sgds-button variant="primary" size="md">Get Started with Singpass</sgds-button>
    </div>
  </div>
</section>

<sgds-footer></sgds-footer>`;

export const pageTemplateMarkupByKey: Record<string, string> = {
  "about-us": aboutUsMarkup,
  "application-management": applicationManagementMarkup,
  blog: blogMarkup,
  catalogue: catalogueMarkup,
  "form-page": formPageMarkup,
  landing: landingMarkup,
  "multi-step-form": multiStepFormPageMarkup,
};
