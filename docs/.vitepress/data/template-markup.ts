// Storybook page-template markup, extracted from
// https://github.com/GovTechSG/sgds-web-component/tree/master/stories/templates
//
// Each export corresponds to one .stories.js file. Lit-specific syntax has
// been stripped (no `${}` interpolations were present), and `<script>` blocks
// that drive demo interactivity in storybook have been removed so the markup
// renders safely inside the docs preview.

export const applicationManagementMarkup = `<div class="sgds:bg-surface-subtle">
  <div>
    <sgds-masthead fluid></sgds-masthead>
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
          src="https://placehold.co/512x512/e8f0fe/1f69ff?text=Government+Services"
          alt="Government digital services"
          style="width: 100%; aspect-ratio: 1 / 1; object-fit: cover; display: block; border-radius: var(--sgds-border-radius-xl);"
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
