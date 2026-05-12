// Block markup pulled from
// https://github.com/GovTechSG/sgds-web-component/tree/master/stories/blocks
//
// Each export is the HTML body of one .stories.js file with the lit html
// wrapper, ${} interpolations, and any inline lit binding stripped. Block
// doc pages reference these constants via the demos[] array.

// ============================================================
// cards
// ============================================================

export const cardsCards3Markup = `<!-- Cards Block — 3 columns × 3 rows
       Background : bg-default
       Spacing    : py-layout-md, gap-layout-md
  -->
  <section class="sgds:bg-default sgds:py-layout-md">
    <div class="sgds-container">
      <!-- Section header -->
      <div class="sgds:mb-layout-md" class="sgds:max-w-text">
        <div
          class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
        >
          Programmes
        </div>
        <h2 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default">
          Featured Programmes
        </h2>
        <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0">
          Explore our curated selection of programmes designed to strengthen digital capabilities across the public
          sector.
        </p>
      </div>

      <!-- Card grid: 3 per row -->
      <div class="sgds-grid sgds:items-stretch">
        <!-- Row 1 -->
        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds:flex sgds:flex-col">
          <sgds-card stretchedLink class="sgds:h-full">
            <sgds-badge slot="upper" outlined>Keynote</sgds-badge>
            <span slot="title" class="sgds:line-clamp-2">Digital Infrastructure for the Next Decade</span>
            <span slot="description"
              >An overview of Singapore's plans for resilient and future-ready digital infrastructure.</span
            >
            <sgds-link slot="footer"
              ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
            ></sgds-link>
          </sgds-card>
        </div>

        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds:flex sgds:flex-col">
          <sgds-card stretchedLink class="sgds:h-full">
            <sgds-badge slot="upper" outlined>Panel Discussion</sgds-badge>
            <span slot="title" class="sgds:line-clamp-2">AI Governance in the Public Sector</span>
            <span slot="description"
              >Panellists explore responsible AI adoption frameworks and inter-agency collaboration.</span
            >
            <sgds-link slot="footer"
              ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
            ></sgds-link>
          </sgds-card>
        </div>

        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds:flex sgds:flex-col">
          <sgds-card stretchedLink class="sgds:h-full">
            <sgds-badge slot="upper" outlined>Presentation</sgds-badge>
            <span slot="title" class="sgds:line-clamp-2">Zero-Trust Architecture for Government Systems</span>
            <span slot="description"
              >A deep dive into implementing zero-trust principles across legacy and modern systems.</span
            >
            <sgds-link slot="footer"
              ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
            ></sgds-link>
          </sgds-card>
        </div>

        <!-- Row 2 -->
        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds:flex sgds:flex-col">
          <sgds-card stretchedLink class="sgds:h-full">
            <sgds-badge slot="upper" outlined>Keynote</sgds-badge>
            <span slot="title" class="sgds:line-clamp-2">Securing the Cloud: Lessons from the Field</span>
            <span slot="description"
              >Key takeaways from real-world cloud migration projects across the Singapore government.</span
            >
            <sgds-link slot="footer"
              ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
            ></sgds-link>
          </sgds-card>
        </div>

        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds:flex sgds:flex-col">
          <sgds-card stretchedLink class="sgds:h-full">
            <sgds-badge slot="upper" outlined>Presentation</sgds-badge>
            <span slot="title" class="sgds:line-clamp-2">Incident Response Playbooks for CISOs</span>
            <span slot="description"
              >Practical frameworks for building effective incident response and recovery strategies.</span
            >
            <sgds-link slot="footer"
              ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
            ></sgds-link>
          </sgds-card>
        </div>

        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds:flex sgds:flex-col">
          <sgds-card stretchedLink class="sgds:h-full">
            <sgds-badge slot="upper" outlined>Panel Discussion</sgds-badge>
            <span slot="title" class="sgds:line-clamp-2">Workforce Upskilling for Cyber Resilience</span>
            <span slot="description"
              >How agencies are building cyber talent pipelines and fostering a security-aware culture.</span
            >
            <sgds-link slot="footer"
              ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
            ></sgds-link>
          </sgds-card>
        </div>

        <!-- Row 3 -->
        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds:flex sgds:flex-col">
          <sgds-card stretchedLink class="sgds:h-full">
            <sgds-badge slot="upper" outlined>Opening Address</sgds-badge>
            <span slot="title" class="sgds:line-clamp-2">Building a Resilient Digital Government</span>
            <span slot="description"
              >An opening address on Singapore's whole-of-government approach to digital resilience.</span
            >
            <sgds-link slot="footer"
              ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
            ></sgds-link>
          </sgds-card>
        </div>

        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds:flex sgds:flex-col">
          <sgds-card stretchedLink class="sgds:h-full">
            <sgds-badge slot="upper" outlined>Keynote</sgds-badge>
            <span slot="title" class="sgds:line-clamp-2">The Future of GovTech: People, Process and Platform</span>
            <span slot="description"
              >How people-centred design and agile delivery are shaping the next wave of government technology.</span
            >
            <sgds-link slot="footer"
              ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
            ></sgds-link>
          </sgds-card>
        </div>

        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds:flex sgds:flex-col">
          <sgds-card stretchedLink class="sgds:h-full">
            <sgds-badge slot="upper" outlined>Presentation</sgds-badge>
            <span slot="title" class="sgds:line-clamp-2">Automating Compliance Monitoring with AI</span>
            <span slot="description"
              >Using machine learning to continuously monitor systems for policy and regulatory compliance.</span
            >
            <sgds-link slot="footer"
              ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
            ></sgds-link>
          </sgds-card>
        </div>
      </div>
    </div>
  </section>`;

export const cardsCards4Markup = `<!-- Cards Block — 4 columns × 3 rows
       Background : bg-default
       Spacing    : py-layout-md, gap-layout-md
  -->
  <section class="sgds:bg-default sgds:py-layout-md">
    <div class="sgds-container">
      <!-- Section header -->
      <div class="sgds:mb-layout-md" class="sgds:max-w-text">
        <div
          class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
        >
          Programmes
        </div>
        <h2 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default">
          Featured Programmes
        </h2>
        <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0">
          Explore our curated selection of programmes designed to strengthen digital capabilities across the public
          sector.
        </p>
      </div>

      <!-- Card grid: 4 per row -->
      <div class="sgds-grid sgds:items-stretch">
        <!-- Row 1 -->
        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds-col-xl-3 sgds:flex sgds:flex-col">
          <sgds-card stretchedLink class="sgds:h-full">
            <sgds-badge slot="upper" outlined>Keynote</sgds-badge>
            <span slot="title" class="sgds:line-clamp-2">Digital Infrastructure for the Next Decade</span>
            <span slot="description"
              >An overview of Singapore's plans for resilient and future-ready digital infrastructure.</span
            >
            <sgds-link slot="footer"
              ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
            ></sgds-link>
          </sgds-card>
        </div>

        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds-col-xl-3 sgds:flex sgds:flex-col">
          <sgds-card stretchedLink class="sgds:h-full">
            <sgds-badge slot="upper" outlined>Panel Discussion</sgds-badge>
            <span slot="title" class="sgds:line-clamp-2">AI Governance in the Public Sector</span>
            <span slot="description"
              >Panellists explore responsible AI adoption frameworks and inter-agency collaboration.</span
            >
            <sgds-link slot="footer"
              ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
            ></sgds-link>
          </sgds-card>
        </div>

        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds-col-xl-3 sgds:flex sgds:flex-col">
          <sgds-card stretchedLink class="sgds:h-full">
            <sgds-badge slot="upper" outlined>Presentation</sgds-badge>
            <span slot="title" class="sgds:line-clamp-2">Zero-Trust Architecture for Government Systems</span>
            <span slot="description"
              >A deep dive into implementing zero-trust principles across legacy and modern systems.</span
            >
            <sgds-link slot="footer"
              ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
            ></sgds-link>
          </sgds-card>
        </div>

        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds-col-xl-3 sgds:flex sgds:flex-col">
          <sgds-card stretchedLink class="sgds:h-full">
            <sgds-badge slot="upper" outlined>Keynote</sgds-badge>
            <span slot="title" class="sgds:line-clamp-2">Securing the Cloud: Lessons from the Field</span>
            <span slot="description"
              >Key takeaways from real-world cloud migration projects across the Singapore government.</span
            >
            <sgds-link slot="footer"
              ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
            ></sgds-link>
          </sgds-card>
        </div>

        <!-- Row 2 -->
        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds-col-xl-3 sgds:flex sgds:flex-col">
          <sgds-card stretchedLink class="sgds:h-full">
            <sgds-badge slot="upper" outlined>Presentation</sgds-badge>
            <span slot="title" class="sgds:line-clamp-2">Incident Response Playbooks for CISOs</span>
            <span slot="description"
              >Practical frameworks for building effective incident response and recovery strategies.</span
            >
            <sgds-link slot="footer"
              ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
            ></sgds-link>
          </sgds-card>
        </div>

        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds-col-xl-3 sgds:flex sgds:flex-col">
          <sgds-card stretchedLink class="sgds:h-full">
            <sgds-badge slot="upper" outlined>Panel Discussion</sgds-badge>
            <span slot="title" class="sgds:line-clamp-2">Workforce Upskilling for Cyber Resilience</span>
            <span slot="description"
              >How agencies are building cyber talent pipelines and fostering a security-aware culture.</span
            >
            <sgds-link slot="footer"
              ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
            ></sgds-link>
          </sgds-card>
        </div>

        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds-col-xl-3 sgds:flex sgds:flex-col">
          <sgds-card stretchedLink class="sgds:h-full">
            <sgds-badge slot="upper" outlined>Opening Address</sgds-badge>
            <span slot="title" class="sgds:line-clamp-2">Building a Resilient Digital Government</span>
            <span slot="description"
              >An opening address on Singapore's whole-of-government approach to digital resilience.</span
            >
            <sgds-link slot="footer"
              ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
            ></sgds-link>
          </sgds-card>
        </div>

        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds-col-xl-3 sgds:flex sgds:flex-col">
          <sgds-card stretchedLink class="sgds:h-full">
            <sgds-badge slot="upper" outlined>Keynote</sgds-badge>
            <span slot="title" class="sgds:line-clamp-2">The Future of GovTech: People, Process and Platform</span>
            <span slot="description"
              >How people-centred design and agile delivery are shaping the next wave of government technology.</span
            >
            <sgds-link slot="footer"
              ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
            ></sgds-link>
          </sgds-card>
        </div>

        <!-- Row 3 -->
        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds-col-xl-3 sgds:flex sgds:flex-col">
          <sgds-card stretchedLink class="sgds:h-full">
            <sgds-badge slot="upper" outlined>Presentation</sgds-badge>
            <span slot="title" class="sgds:line-clamp-2">Automating Compliance Monitoring with AI</span>
            <span slot="description"
              >Using machine learning to continuously monitor systems for policy and regulatory compliance.</span
            >
            <sgds-link slot="footer"
              ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
            ></sgds-link>
          </sgds-card>
        </div>

        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds-col-xl-3 sgds:flex sgds:flex-col">
          <sgds-card stretchedLink class="sgds:h-full">
            <sgds-badge slot="upper" outlined>Keynote</sgds-badge>
            <span slot="title" class="sgds:line-clamp-2">Cybersecurity as a National Imperative</span>
            <span slot="description"
              >Why cybersecurity investment is central to Singapore's long-term digital sovereignty strategy.</span
            >
            <sgds-link slot="footer"
              ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
            ></sgds-link>
          </sgds-card>
        </div>

        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds-col-xl-3 sgds:flex sgds:flex-col">
          <sgds-card stretchedLink class="sgds:h-full">
            <sgds-badge slot="upper" outlined>Panel Discussion</sgds-badge>
            <span slot="title" class="sgds:line-clamp-2">Data Sharing Across Agencies: Challenges and Solutions</span>
            <span slot="description"
              >Governance models and technical standards enabling safe cross-agency data sharing.</span
            >
            <sgds-link slot="footer"
              ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
            ></sgds-link>
          </sgds-card>
        </div>

        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds-col-xl-3 sgds:flex sgds:flex-col">
          <sgds-card stretchedLink class="sgds:h-full">
            <sgds-badge slot="upper" outlined>Presentation</sgds-badge>
            <span slot="title" class="sgds:line-clamp-2">Identity and Access Management at Scale</span>
            <span slot="description"
              >Strategies for managing digital identities across thousands of government users securely.</span
            >
            <sgds-link slot="footer"
              ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
            ></sgds-link>
          </sgds-card>
        </div>
      </div>
    </div>
  </section>`;

// ============================================================
// cta
// ============================================================

export const ctaContainedPrimaryCenterMarkup = `<section class="sgds:py-layout-lg">
      <div class="sgds-container">
        <div class="sgds:bg-primary-default sgds:rounded-2-xl sgds:p-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:items-center sgds:text-center sgds:max-w-text">
            <div class="sgds:mb-xl">
              <div
                class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-fixed-light sgds:mb-xs"
              >
                Overline
              </div>
              <h2
                class="sgds:text-display-sm sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-fixed-light"
              >
                Headline
              </h2>
              <h5
                class="sgds:text-subtitle-sm sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-fixed-light"
              >
                Description
              </h5>
            </div>
            <sgds-button variant="primary" tone="fixed-light" size="md">Button Label</sgds-button>
          </div>
        </div>
      </div>
    </section>`;

export const ctaContainedPrimaryMarkup = `<section class="sgds:py-layout-lg">
      <div class="sgds-container">
        <div class="sgds:bg-primary-default sgds:rounded-2-xl sgds:p-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left sgds:max-w-text">
            <div class="sgds:mb-xl">
              <div
                class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-fixed-light sgds:mb-xs"
              >
                Overline
              </div>
              <h2
                class="sgds:text-display-sm sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-fixed-light"
              >
                Headline
              </h2>
              <h5
                class="sgds:text-subtitle-sm sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-fixed-light"
              >
                Description
              </h5>
            </div>
            <sgds-button variant="primary" tone="fixed-light" size="md">Button Label</sgds-button>
          </div>
        </div>
      </div>
    </section>`;

export const ctaContainedRaisedCenterMarkup = `<section class="sgds:py-layout-lg">
      <div class="sgds-container">
        <div class="sgds:bg-surface-raised sgds:rounded-2-xl sgds:p-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:items-center sgds:text-center sgds:max-w-text">
            <div class="sgds:mb-xl">
              <div
                class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
              >
                Overline
              </div>
              <h2
                class="sgds:text-display-sm sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-display-default"
              >
                Headline
              </h2>
              <h5
                class="sgds:text-subtitle-sm sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-subtle"
              >
                Description
              </h5>
            </div>
            <sgds-button variant="primary" tone="brand" size="md">Button Label</sgds-button>
          </div>
        </div>
      </div>
    </section>`;

export const ctaContainedRaisedMarkup = `<section class="sgds:py-layout-lg">
      <div class="sgds-container">
        <div class="sgds:bg-surface-raised sgds:rounded-2-xl sgds:p-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left sgds:max-w-text">
            <div class="sgds:mb-xl">
              <div
                class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
              >
                Overline
              </div>
              <h2
                class="sgds:text-display-sm sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-display-default"
              >
                Headline
              </h2>
              <h5
                class="sgds:text-subtitle-sm sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-subtle"
              >
                Description
              </h5>
            </div>
            <sgds-button variant="primary" tone="brand" size="md">Button Label</sgds-button>
          </div>
        </div>
      </div>
    </section>`;

export const ctaFullbleedAlternateCenterMarkup = `<section class="sgds:bg-alternate sgds:py-layout-lg">
      <div class="sgds-container">
        <div class="sgds:flex sgds:flex-col sgds:items-center sgds:text-center sgds:max-w-text">
          <div class="sgds:mb-xl">
            <div
              class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
            >
              Overline
            </div>
            <h2
              class="sgds:text-display-sm sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-display-default"
            >
              Headline
            </h2>
            <h5
              class="sgds:text-subtitle-sm sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-subtle"
            >
              Description
            </h5>
          </div>
          <sgds-button variant="primary" tone="brand" size="md">Button Label</sgds-button>
        </div>
      </div>
    </section>`;

export const ctaFullbleedAlternateMarkup = `<section class="sgds:bg-alternate sgds:py-layout-lg">
      <div class="sgds-container">
        <div class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left sgds:max-w-text">
          <div class="sgds:mb-xl">
            <div
              class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
            >
              Overline
            </div>
            <h2
              class="sgds:text-display-sm sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-display-default"
            >
              Headline
            </h2>
            <h5
              class="sgds:text-subtitle-sm sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-subtle"
            >
              Description
            </h5>
          </div>
          <sgds-button variant="primary" tone="brand" size="md">Button Label</sgds-button>
        </div>
      </div>
    </section>`;

export const ctaFullbleedPrimaryCenterMarkup = `<section class="sgds:bg-primary-default sgds:py-layout-lg">
      <div class="sgds-container">
        <div class="sgds:flex sgds:flex-col sgds:items-center sgds:text-center sgds:max-w-text">
          <div class="sgds:mb-xl">
            <div
              class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-fixed-light sgds:mb-xs"
            >
              Overline
            </div>
            <h2
              class="sgds:text-display-sm sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-fixed-light"
            >
              Headline
            </h2>
            <h5
              class="sgds:text-subtitle-sm sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-fixed-light"
            >
              Description
            </h5>
          </div>
          <sgds-button variant="primary" tone="fixed-light" size="md">Button Label</sgds-button>
        </div>
      </div>
    </section>`;

export const ctaFullbleedPrimaryMarkup = `<section class="sgds:bg-primary-default sgds:py-layout-lg">
      <div class="sgds-container">
        <div class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left sgds:max-w-text">
          <div class="sgds:mb-xl">
            <div
              class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-fixed-light sgds:mb-xs"
            >
              Overline
            </div>
            <h2
              class="sgds:text-display-sm sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-fixed-light"
            >
              Headline
            </h2>
            <h5
              class="sgds:text-subtitle-sm sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-fixed-light"
            >
              Description
            </h5>
          </div>
          <sgds-button variant="primary" tone="fixed-light" size="md">Button Label</sgds-button>
        </div>
      </div>
    </section>`;

// ============================================================
// feature
// ============================================================

export const featureFeature48ImgLeftMarkup = `<style>
    @media (max-width: 1023px) {
      .feature-img {
        padding-bottom: var(--sgds-spacing-layout-md);
      }
    }
    @media (min-width: 1024px) {
      .feature-content {
        padding-left: var(--sgds-spacing-layout-md);
      }
    }
  </style>

  <!-- Feature Block — image left 4 cols / content right 8 cols
       Background : bg-surface-default
       Spacing    : py-layout-lg, gap-layout-md
       Content    : padding-right layout-md (outer edge, image on left)
  -->
  <section class="sgds:bg-default sgds:py-layout-lg">
    <div class="sgds-container">
      <div class="sgds-grid sgds:items-center sgds:gap-layout-md">
        <!-- Image — 4 cols -->
        <div class="feature-img sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
          <img
            src="/placeholder-sgds.png"
            alt=""
            style="width: 100%; aspect-ratio: 3 / 2; object-fit: cover; display: block; border-radius: var(--sgds-border-radius-xl);"
          />
        </div>

        <!-- Content — 8 cols, padding-right layout-md (image on left) -->
        <div
          class="feature-content sgds-col-4 sgds-col-sm-8 sgds-col-lg-8 sgds:flex sgds:flex-col sgds:items-start sgds:text-left"
        >
          <!-- Typography group -->
          <div class="sgds:mb-xl">
            <div
              class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
            >
              Overline Label
            </div>
            <h2
              class="sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-display-default"
            >
              Feature Heading Goes Here
            </h2>
            <h5
              class="sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-subtle"
            >
              Supporting subtitle text that provides context and detail for the feature being described.
            </h5>
          </div>
          <sgds-button variant="primary" tone="neutral" size="md">Get Started</sgds-button>
        </div>
      </div>
    </div>
  </section>`;

export const featureFeature48ImgRightMarkup = `<style>
    @media (max-width: 1023px) {
      .feature-img {
        order: -1;
        padding-bottom: var(--sgds-spacing-layout-md);
      }
    }
    @media (min-width: 1024px) {
      .feature-content {
        padding-right: var(--sgds-spacing-layout-md);
      }
    }
  </style>

  <!-- Feature Block — content left 8 cols / image right 4 cols
       Background : bg-surface-default
       Spacing    : py-layout-lg, gap-layout-md
       Content    : padding-left layout-md (outer edge, image on right)
  -->
  <section class="sgds:bg-default sgds:py-layout-lg">
    <div class="sgds-container">
      <div class="sgds-grid sgds:items-center sgds:gap-layout-md">
        <!-- Content — 8 cols, padding-left layout-md (image on right) -->
        <div
          class="feature-content sgds-col-4 sgds-col-sm-8 sgds-col-lg-8 sgds:flex sgds:flex-col sgds:items-start sgds:text-left"
        >
          <!-- Typography group -->
          <div class="sgds:mb-xl">
            <div
              class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
            >
              Overline Label
            </div>
            <h2
              class="sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-display-default"
            >
              Feature Heading Goes Here
            </h2>
            <h5
              class="sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-subtle"
            >
              Supporting subtitle text that provides context and detail for the feature being described.
            </h5>
          </div>
          <sgds-button variant="primary" tone="neutral" size="md">Get Started</sgds-button>
        </div>

        <!-- Image — 4 cols -->
        <div class="feature-img sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
          <img
            src="/placeholder-sgds.png"
            alt=""
            style="width: 100%; aspect-ratio: 3 / 2; object-fit: cover; display: block; border-radius: var(--sgds-border-radius-xl);"
          />
        </div>
      </div>
    </div>
  </section>`;

export const featureFeature66ComponentLeftMarkup = `<!-- Feature Block — component left 6 cols / content right 6 cols
       Background : bg-surface-default
       Spacing    : py-layout-lg, gap-layout-md
       Alignment  : items-start (top-aligned)
       Component  : replace <sgds-accordion> with any component
  -->
  <section class="sgds:bg-default sgds:py-layout-lg">
    <div class="sgds-container">
      <div class="sgds-grid sgds:items-start" class="sgds:gap-layout-md">
        <!-- Component — 6 cols (replace with any component) -->
        <div class="feature-component sgds-col-4 sgds-col-sm-8 sgds-col-lg-6">
          <sgds-accordion>
            <sgds-accordion-item open>
              <div slot="header">Why choose us</div>
              <div slot="content">
                We deliver fast, reliable, and accessible digital services built to government standards.
              </div>
            </sgds-accordion-item>
            <sgds-accordion-item>
              <div slot="header">How it works</div>
              <div slot="content">
                Sign up, verify your identity, and access all your services from a single dashboard.
              </div>
            </sgds-accordion-item>
            <sgds-accordion-item>
              <div slot="header">Who can use this</div>
              <div slot="content">
                Any Singapore resident or business with a valid Singpass account can get started.
              </div>
            </sgds-accordion-item>
          </sgds-accordion>
        </div>

        <!-- Content — 6 cols, padding-left layout-md (component on left) -->
        <div
          class="feature-content sgds-col-4 sgds-col-sm-8 sgds-col-lg-6 sgds:flex sgds:flex-col sgds:items-start sgds:text-left"
        >
          <!-- Typography group -->
          <div class="sgds:mb-xl">
            <div
              class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
            >
              Overline Label
            </div>
            <h2
              class="sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-display-default"
            >
              Feature Heading Goes Here
            </h2>
            <h5
              class="sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-subtle"
            >
              Supporting subtitle text that provides context and detail for the feature being described.
            </h5>
          </div>
          <sgds-button variant="primary" tone="neutral" size="md">Get Started</sgds-button>
        </div>
      </div>
    </div>
  </section>`;

export const featureFeature66ComponentRightMarkup = `<!-- Feature Block — content left 6 cols / component right 6 cols
       Background : bg-surface-default
       Spacing    : py-layout-lg, gap-layout-md
       Alignment  : items-start (top-aligned)
       Component  : replace <sgds-accordion> with any component
  -->
  <section class="sgds:bg-default sgds:py-layout-lg">
    <div class="sgds-container">
      <div class="sgds-grid sgds:items-start" class="sgds:gap-layout-md">
        <!-- Content — 6 cols, padding-right layout-md (component on right) -->
        <div
          class="feature-content sgds-col-4 sgds-col-sm-8 sgds-col-lg-6 sgds:flex sgds:flex-col sgds:items-start sgds:text-left"
        >
          <!-- Typography group -->
          <div class="sgds:mb-xl">
            <div
              class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
            >
              Overline Label
            </div>
            <h2
              class="sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-display-default"
            >
              Feature Heading Goes Here
            </h2>
            <h5
              class="sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-subtle"
            >
              Supporting subtitle text that provides context and detail for the feature being described.
            </h5>
          </div>
          <sgds-button variant="primary" tone="neutral" size="md">Get Started</sgds-button>
        </div>

        <!-- Component — 6 cols (replace with any component) -->
        <div class="feature-component sgds-col-4 sgds-col-sm-8 sgds-col-lg-6">
          <sgds-accordion>
            <sgds-accordion-item open>
              <div slot="header">Why choose us</div>
              <div slot="content">
                We deliver fast, reliable, and accessible digital services built to government standards.
              </div>
            </sgds-accordion-item>
            <sgds-accordion-item>
              <div slot="header">How it works</div>
              <div slot="content">
                Sign up, verify your identity, and access all your services from a single dashboard.
              </div>
            </sgds-accordion-item>
            <sgds-accordion-item>
              <div slot="header">Who can use this</div>
              <div slot="content">
                Any Singapore resident or business with a valid Singpass account can get started.
              </div>
            </sgds-accordion-item>
          </sgds-accordion>
        </div>
      </div>
    </div>
  </section>`;

export const featureFeature66ImgLeftMarkup = `<style>
    @media (max-width: 1023px) {
      .feature-img {
        padding-bottom: var(--sgds-spacing-layout-md);
      }
    }
    @media (min-width: 1024px) {
      .feature-content {
        padding-left: var(--sgds-spacing-layout-md);
      }
    }
  </style>

  <!-- Feature Block — image left 6 cols / content right 6 cols
       Background : bg-surface-default
       Spacing    : py-layout-lg, gap-layout-md
       Content    : padding-right layout-md (outer edge, image on left)
  -->
  <section class="sgds:bg-default sgds:py-layout-lg">
    <div class="sgds-container">
      <div class="sgds-grid sgds:items-center sgds:gap-layout-md">
        <!-- Image — 6 cols -->
        <div class="feature-img sgds-col-4 sgds-col-sm-8 sgds-col-lg-6">
          <img
            src="/placeholder-sgds.png"
            alt=""
            style="width: 100%; aspect-ratio: 3 / 2; object-fit: cover; display: block; border-radius: var(--sgds-border-radius-xl);"
          />
        </div>

        <!-- Content — 6 cols, padding-right layout-md (image on left) -->
        <div
          class="feature-content sgds-col-4 sgds-col-sm-8 sgds-col-lg-6 sgds:flex sgds:flex-col sgds:items-start sgds:text-left"
        >
          <!-- Typography group -->
          <div class="sgds:mb-xl">
            <div
              class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
            >
              Overline Label
            </div>
            <h2
              class="sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-display-default"
            >
              Feature Heading Goes Here
            </h2>
            <h5
              class="sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-subtle"
            >
              Supporting subtitle text that provides context and detail for the feature being described.
            </h5>
          </div>
          <sgds-button variant="primary" tone="neutral" size="md">Get Started</sgds-button>
        </div>
      </div>
    </div>
  </section>`;

export const featureFeature66ImgRightMarkup = `<style>
    @media (max-width: 1023px) {
      .feature-img {
        order: -1;
        padding-bottom: var(--sgds-spacing-layout-md);
      }
    }
    @media (min-width: 1024px) {
      .feature-content {
        padding-right: var(--sgds-spacing-layout-md);
      }
    }
  </style>

  <!-- Feature Block — content left 6 cols / image right 6 cols
       Background : bg-surface-default
       Spacing    : py-layout-lg, gap-layout-md
       Content    : padding-left layout-md (outer edge, image on right)
  -->
  <section class="sgds:bg-default sgds:py-layout-lg">
    <div class="sgds-container">
      <div class="sgds-grid sgds:items-center sgds:gap-layout-md">
        <!-- Content — 6 cols, padding-left layout-md (image on right) -->
        <div
          class="feature-content sgds-col-4 sgds-col-sm-8 sgds-col-lg-6 sgds:flex sgds:flex-col sgds:items-start sgds:text-left"
        >
          <!-- Typography group -->
          <div class="sgds:mb-xl">
            <div
              class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
            >
              Overline Label
            </div>
            <h2
              class="sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-display-default"
            >
              Feature Heading Goes Here
            </h2>
            <h5
              class="sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-subtle"
            >
              Supporting subtitle text that provides context and detail for the feature being described.
            </h5>
          </div>
          <sgds-button variant="primary" tone="neutral" size="md">Get Started</sgds-button>
        </div>

        <!-- Image — 6 cols -->
        <div class="feature-img sgds-col-4 sgds-col-sm-8 sgds-col-lg-6">
          <img
            src="/placeholder-sgds.png"
            alt=""
            style="width: 100%; aspect-ratio: 3 / 2; object-fit: cover; display: block; border-radius: var(--sgds-border-radius-xl);"
          />
        </div>
      </div>
    </div>
  </section>`;

export const featureFeature84ImgLeftMarkup = `<style>
    @media (max-width: 1023px) {
      .feature-img {
        padding-bottom: var(--sgds-spacing-layout-md);
      }
    }
    @media (min-width: 1024px) {
      .feature-content {
        padding-left: var(--sgds-spacing-layout-md);
      }
    }
  </style>

  <!-- Feature Block — image left 8 cols / content right 4 cols
       Background : bg-surface-default
       Spacing    : py-layout-lg, gap-layout-md
       Content    : padding-right layout-md (outer edge, image on left)
  -->
  <section class="sgds:bg-default sgds:py-layout-lg">
    <div class="sgds-container">
      <div class="sgds-grid sgds:items-center sgds:gap-layout-md">
        <!-- Image — 8 cols -->
        <div class="feature-img sgds-col-4 sgds-col-sm-8 sgds-col-lg-8">
          <img
            src="/placeholder-sgds.png"
            alt=""
            style="width: 100%; aspect-ratio: 3 / 2; object-fit: cover; display: block; border-radius: var(--sgds-border-radius-xl);"
          />
        </div>

        <!-- Content — 4 cols, padding-right layout-md (image on left) -->
        <div
          class="feature-content sgds-col-4 sgds-col-sm-8 sgds-col-lg-4 sgds:flex sgds:flex-col sgds:items-start sgds:text-left"
        >
          <!-- Typography group -->
          <div class="sgds:mb-xl">
            <div
              class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
            >
              Overline Label
            </div>
            <h2
              class="sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-display-default"
            >
              Feature Heading Goes Here
            </h2>
            <h5
              class="sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-subtle"
            >
              Supporting subtitle text that provides context and detail for the feature being described.
            </h5>
          </div>
          <sgds-button variant="primary" tone="neutral" size="md">Get Started</sgds-button>
        </div>
      </div>
    </div>
  </section>`;

export const featureFeature84ImgRightMarkup = `<style>
    @media (max-width: 1023px) {
      .feature-img {
        order: -1;
        padding-bottom: var(--sgds-spacing-layout-md);
      }
    }
    @media (min-width: 1024px) {
      .feature-content {
        padding-right: var(--sgds-spacing-layout-md);
      }
    }
  </style>

  <!-- Feature Block — content left 4 cols / image right 8 cols
       Background : bg-surface-default
       Spacing    : py-layout-lg, gap-layout-md
       Content    : padding-left layout-md (outer edge, image on right)
  -->
  <section class="sgds:bg-default sgds:py-layout-lg">
    <div class="sgds-container">
      <div class="sgds-grid sgds:items-center sgds:gap-layout-md">
        <!-- Content — 4 cols, padding-left layout-md (image on right) -->
        <div
          class="feature-content sgds-col-4 sgds-col-sm-8 sgds-col-lg-4 sgds:flex sgds:flex-col sgds:items-start sgds:text-left"
        >
          <!-- Typography group -->
          <div class="sgds:mb-xl">
            <div
              class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
            >
              Overline Label
            </div>
            <h2
              class="sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-display-default"
            >
              Feature Heading Goes Here
            </h2>
            <h5
              class="sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-subtle"
            >
              Supporting subtitle text that provides context and detail for the feature being described.
            </h5>
          </div>
          <sgds-button variant="primary" tone="neutral" size="md">Get Started</sgds-button>
        </div>

        <!-- Image — 8 cols -->
        <div class="feature-img sgds-col-4 sgds-col-sm-8 sgds-col-lg-8">
          <img
            src="/placeholder-sgds.png"
            alt=""
            style="width: 100%; aspect-ratio: 3 / 2; object-fit: cover; display: block; border-radius: var(--sgds-border-radius-xl);"
          />
        </div>
      </div>
    </div>
  </section>`;

export const featureFeatureCardsBelowMarkup = `<!-- Feature Block — content top / 3 tinted cards below
       Background : bg-surface-raised
       Spacing    : py-layout-lg, gap-layout-md
       Cards      : tinted, hideBorder, stretchedLink
  -->
  <section class="sgds:bg-default sgds:py-layout-lg">
    <div class="sgds-container">
      <div class="sgds:flex sgds:flex-col" class="sgds:gap-layout-md">
        <!-- Content -->
        <div
          class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left"
          style="padding-bottom: var(--sgds-spacing-layout-md);"
        >
          <div class="sgds:mb-xl">
            <div
              class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
            >
              Overline Label
            </div>
            <h2
              class="sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-display-default"
            >
              Feature Heading Goes Here
            </h2>
            <h5
              class="sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-subtle"
            >
              Supporting subtitle text that provides context and detail for the feature being described.
            </h5>
          </div>
          <sgds-button variant="primary" tone="neutral" size="md">Get Started</sgds-button>
        </div>

        <!-- 3 tinted cards in a row (replace with any component) -->
        <div class="sgds-grid" class="sgds:gap-layout-md">
          <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
            <sgds-card tinted hideBorder stretchedLink>
              <span slot="subtitle">FEATURE</span>
              <span slot="title">Card Title One</span>
              <span slot="description"
                >Supporting description text that explains what this feature offers to the user.</span
              >
              <sgds-link slot="footer">
                <a href="#">Learn more <sgds-icon name="arrow-right"></sgds-icon></a>
              </sgds-link>
            </sgds-card>
          </div>

          <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
            <sgds-card tinted hideBorder stretchedLink>
              <span slot="subtitle">FEATURE</span>
              <span slot="title">Card Title Two</span>
              <span slot="description"
                >Supporting description text that explains what this feature offers to the user.</span
              >
              <sgds-link slot="footer">
                <a href="#">Learn more <sgds-icon name="arrow-right"></sgds-icon></a>
              </sgds-link>
            </sgds-card>
          </div>

          <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
            <sgds-card tinted hideBorder stretchedLink>
              <span slot="subtitle">FEATURE</span>
              <span slot="title">Card Title Three</span>
              <span slot="description"
                >Supporting description text that explains what this feature offers to the user.</span
              >
              <sgds-link slot="footer">
                <a href="#">Learn more <sgds-icon name="arrow-right"></sgds-icon></a>
              </sgds-link>
            </sgds-card>
          </div>
        </div>
      </div>
    </div>
  </section>`;

export const featureFeatureNoImgCenterMarkup = `<!-- Feature Block — no image, center-aligned
       Background : bg-surface-default
       Spacing    : py-layout-lg
  -->
  <section class="sgds:bg-default sgds:py-layout-lg">
    <div class="sgds-container">
      <div class="sgds:flex sgds:flex-col sgds:items-center sgds:text-center sgds:mx-auto sgds:max-w-text">
        <!-- Typography group -->
        <div class="sgds:mb-xl">
          <div
            class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
          >
            Overline Label
          </div>
          <h2
            class="sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-display-default"
          >
            Feature Heading Goes Here
          </h2>
          <h5
            class="sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-subtle"
          >
            Supporting subtitle text that provides context and detail for the feature being described.
          </h5>
        </div>
        <sgds-button variant="primary" tone="neutral" size="md">Get Started</sgds-button>
      </div>
    </div>
  </section>`;

export const featureFeatureNoImgLeftMarkup = `<!-- Feature Block — no image, left-aligned
       Background : bg-surface-default
       Spacing    : py-layout-lg
  -->
  <section class="sgds:bg-default sgds:py-layout-lg">
    <div class="sgds-container">
      <div class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left">
        <!-- Typography group -->
        <div class="sgds:mb-xl">
          <div
            class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
          >
            Overline Label
          </div>
          <h2
            class="sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-display-default"
          >
            Feature Heading Goes Here
          </h2>
          <h5
            class="sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-subtle"
          >
            Supporting subtitle text that provides context and detail for the feature being described.
          </h5>
        </div>
        <sgds-button variant="primary" tone="neutral" size="md">Get Started</sgds-button>
      </div>
    </div>
  </section>`;

// ============================================================
// filter
// ============================================================

export const filterFilterMarkup = `<div class="sgds:bg-surface-default sgds:min-h-screen">
    <div class="sgds:w-container sgds:mx-auto sgds:py-layout-md">
      <!-- Filter sidebar -->
      <aside class="sgds:w-64 sgds:flex sgds:flex-col sgds:gap-2-xl">
        <!-- Filter header -->
        <div class="sgds:flex sgds:gap-4 sgds:items-center">
          <span
            class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default"
            >Filter by</span
          >
          <sgds-link><a href="#">Clear all</a></sgds-link>
        </div>

        <!-- Programme type -->
        <div class="sgds:flex sgds:flex-col sgds:gap-xs">
          <div
            class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
          >
            Programme type
          </div>
          <sgds-checkbox-group>
            <sgds-checkbox value="opening-address">Opening Address (1)</sgds-checkbox>
            <sgds-checkbox value="keynote">Keynote (4)</sgds-checkbox>
            <sgds-checkbox value="panel-discussion">Panel Discussion (6)</sgds-checkbox>
            <sgds-checkbox value="presentation">Presentation (12)</sgds-checkbox>
          </sgds-checkbox-group>
        </div>

        <!-- Sessions -->
        <div class="sgds:flex sgds:flex-col sgds:gap-xs">
          <div
            class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
          >
            Sessions
          </div>
          <sgds-checkbox-group>
            <sgds-checkbox value="morning">Morning (12)</sgds-checkbox>
            <sgds-checkbox value="afternoon">Afternoon (16)</sgds-checkbox>
          </sgds-checkbox-group>
        </div>

        <!-- Track -->
        <div class="sgds:flex sgds:flex-col sgds:gap-xs">
          <div
            class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
          >
            Track
          </div>
          <sgds-checkbox-group>
            <sgds-checkbox value="ai-cybersecurity">AI x Cybersecurity (4)</sgds-checkbox>
            <sgds-checkbox value="resilient-cloud">Resilient and Secure Cloud (6)</sgds-checkbox>
            <sgds-checkbox value="cisos-future">CISOs of the Future (8)</sgds-checkbox>
          </sgds-checkbox-group>
        </div>

        <!-- Event hall -->
        <div class="sgds:flex sgds:flex-col sgds:gap-xs">
          <div
            class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
          >
            Event hall
          </div>
          <sgds-checkbox-group>
            <sgds-checkbox value="hall-a">Hall A</sgds-checkbox>
            <sgds-checkbox value="hall-b">Hall B</sgds-checkbox>
            <sgds-checkbox value="hall-c">Hall C</sgds-checkbox>
          </sgds-checkbox-group>
        </div>
      </aside>
    </div>
  </div>`;

// ============================================================
// form
// ============================================================

export const formAllTypesMarkup = `<div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form
        class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-center-8 sgds-col-xl-center-8 sgds-col-2-xl-center-8"
      >
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5
              class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
            >
              Basic Info
            </h5>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Name" name="name" type="text" required hasFeedback="both"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Email" name="email" type="email" required hasFeedback="both"></sgds-input>
              </div>
            </div>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-select
                  placeholder="Select an option"
                  label="Country"
                  name="country"
                  placeholder="Select country"
                  required
                  hasFeedback="both"
                >
                  <sgds-select-option value="sg">Singapore</sgds-select-option>
                  <sgds-select-option value="my">Malaysia</sgds-select-option>
                </sgds-select>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-datepicker label="Date of birth" name="dob" required hasFeedback="both"></sgds-datepicker>
              </div>
            </div>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-quantity-toggle
                  label="Tickets"
                  name="tickets"
                  value="1"
                  min="1"
                  max="10"
                  required
                  hasFeedback="both"
                ></sgds-quantity-toggle>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-combo-box
                  placeholder="Search or select..."
                  label="Event"
                  name="event"
                  required
                  hasFeedback="both"
                >
                  <sgds-combo-box-option value="event-1">Event 1</sgds-combo-box-option>
                  <sgds-combo-box-option value="event-2">Event 2</sgds-combo-box-option>
                </sgds-combo-box>
              </div>
            </div>
          </div>
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5
              class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
            >
              Preferences
            </h5>
            <div>
              <sgds-textarea
                label="Special requests"
                name="requests"
                placeholder="Any special requests?..."
                hasFeedback="both"
              ></sgds-textarea>
            </div>
            <div>
              <sgds-radio-group label="Delivery method" name="delivery" required hasFeedback="both">
                <sgds-radio value="pickup">Pickup</sgds-radio>
                <sgds-radio value="delivery">Delivery</sgds-radio>
                <sgds-radio value="courier">Courier</sgds-radio>
              </sgds-radio-group>
            </div>
            <div>
              <sgds-checkbox-group label="Services" name="services" required hasFeedback="both">
                <sgds-checkbox value="service-1">Service 1</sgds-checkbox>
                <sgds-checkbox value="service-2">Service 2</sgds-checkbox>
                <sgds-checkbox value="service-3">Service 3</sgds-checkbox>
              </sgds-checkbox-group>
            </div>
            <div>
              <sgds-combo-box
                placeholder="Search or select..."
                label="Interests"
                name="interests"
                multiSelect="true"
                placeholder="Select interests..."
                hasFeedback="both"
              >
                <sgds-combo-box-option value="tech">Technology</sgds-combo-box-option>
                <sgds-combo-box-option value="design">Design</sgds-combo-box-option>
                <sgds-combo-box-option value="business">Business</sgds-combo-box-option>
              </sgds-combo-box>
            </div>
            <div>
              <sgds-file-upload label="Attachment" name="attachment" hasFeedback="both">Choose files</sgds-file-upload>
            </div>
          </div>
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
            <sgds-button type="reset" variant="ghost">Reset</sgds-button>
            <sgds-button type="submit">Submit</sgds-button>
          </div>
        </div>
      </form>
    </div>
  </div>`;

export const formBasicCenterMarkup = `<div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form
        class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-center-8 sgds-col-xl-center-8 sgds-col-2-xl-center-8"
      >
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5
              class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
            >
              Personal Information
            </h5>
            <div>
              <sgds-input label="First name" name="firstName" type="text" required hasFeedback="both"></sgds-input>
            </div>
            <div>
              <sgds-input label="Last name" name="lastName" type="text" required hasFeedback="both"></sgds-input>
            </div>
            <div>
              <sgds-input label="Email address" name="email" type="email" required hasFeedback="both"></sgds-input>
            </div>
            <div>
              <sgds-input label="Phone number" name="phone" type="tel" required hasFeedback="both"></sgds-input>
            </div>
            <div>
              <sgds-textarea
                label="Additional comments"
                name="comments"
                placeholder="Enter any additional information..."
                hasFeedback="both"
              ></sgds-textarea>
            </div>
          </div>
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5
              class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
            >
              Preferences
            </h5>
            <div>
              <sgds-radio-group
                label="Communication preference"
                name="communicationPreference"
                required
                hasFeedback="both"
              >
                <sgds-radio value="email">Email</sgds-radio>
                <sgds-radio value="sms">SMS</sgds-radio>
                <sgds-radio value="phone">Phone</sgds-radio>
              </sgds-radio-group>
            </div>
            <div>
              <sgds-checkbox-group label="Interests" name="interests" required hasFeedback="both">
                <sgds-checkbox value="technology">Technology</sgds-checkbox>
                <sgds-checkbox value="business">Business</sgds-checkbox>
                <sgds-checkbox value="design">Design</sgds-checkbox>
                <sgds-checkbox value="marketing">Marketing</sgds-checkbox>
              </sgds-checkbox-group>
            </div>
          </div>
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
            <sgds-button type="reset" variant="ghost">Cancel</sgds-button>
            <sgds-button type="submit">Submit</sgds-button>
          </div>
        </div>
      </form>
    </div>
  </div>`;

export const formBasicLeftMarkup = `<div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-8 sgds-col-xl-8 sgds-col-2-xl-8">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5
              class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
            >
              Contact Information
            </h5>
            <div>
              <sgds-input label="First name" name="firstName" type="text" required hasFeedback="both"></sgds-input>
            </div>
            <div>
              <sgds-input label="Last name" name="lastName" type="text" required hasFeedback="both"></sgds-input>
            </div>
            <div>
              <sgds-input label="Email" name="email" type="email" required hasFeedback="both"></sgds-input>
            </div>
            <div>
              <sgds-input label="Phone" name="phone" type="tel" required hasFeedback="both"></sgds-input>
            </div>
          </div>
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
            <sgds-button type="reset" variant="ghost">Cancel</sgds-button>
            <sgds-button type="submit">Submit</sgds-button>
          </div>
        </div>
      </form>
    </div>
  </div>`;

export const formBasicRightMarkup = `<style>
    @media (min-width: 1024px) {
      form.form-right {
        grid-column: 5 / span 8;
      }
    }
  </style>
  <div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form class="form-right sgds-col-4 sgds-col-sm-8 sgds-col-md-8">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5
              class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
            >
              Personal Information
            </h5>
            <div>
              <sgds-input label="First name" name="firstName" type="text" required hasFeedback="both"></sgds-input>
            </div>
            <div>
              <sgds-input label="Last name" name="lastName" type="text" required hasFeedback="both"></sgds-input>
            </div>
            <div>
              <sgds-input label="Email address" name="email" type="email" required hasFeedback="both"></sgds-input>
            </div>
            <div>
              <sgds-input label="Phone number" name="phone" type="tel" required hasFeedback="both"></sgds-input>
            </div>
            <div>
              <sgds-textarea
                label="Additional comments"
                name="comments"
                placeholder="Enter any additional information..."
                hasFeedback="both"
              ></sgds-textarea>
            </div>
          </div>
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5
              class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
            >
              Preferences
            </h5>
            <div>
              <sgds-radio-group
                label="Communication preference"
                name="communicationPreference"
                required
                hasFeedback="both"
              >
                <sgds-radio value="email">Email</sgds-radio>
                <sgds-radio value="sms">SMS</sgds-radio>
                <sgds-radio value="phone">Phone</sgds-radio>
              </sgds-radio-group>
            </div>
            <div>
              <sgds-checkbox-group label="Interests" name="interests" required hasFeedback="both">
                <sgds-checkbox value="technology">Technology</sgds-checkbox>
                <sgds-checkbox value="business">Business</sgds-checkbox>
                <sgds-checkbox value="design">Design</sgds-checkbox>
                <sgds-checkbox value="marketing">Marketing</sgds-checkbox>
              </sgds-checkbox-group>
            </div>
          </div>
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
            <sgds-button type="reset" variant="ghost">Cancel</sgds-button>
            <sgds-button type="submit">Submit</sgds-button>
          </div>
        </div>
      </form>
    </div>
  </div>`;

export const formFormFieldsCheckboxMarkup = `<div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form
        class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-center-8 sgds-col-xl-center-8 sgds-col-2-xl-center-8"
      >
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5
              class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
            >
              Preferences
            </h5>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="First name" name="firstName" type="text" required hasFeedback="both"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Last name" name="lastName" type="text" required hasFeedback="both"></sgds-input>
              </div>
            </div>
            <div>
              <sgds-checkbox-group label="Interests" name="interests" required hasFeedback="both">
                <sgds-checkbox value="technology">Technology</sgds-checkbox>
                <sgds-checkbox value="business">Business</sgds-checkbox>
                <sgds-checkbox value="design">Design</sgds-checkbox>
                <sgds-checkbox value="marketing">Marketing</sgds-checkbox>
              </sgds-checkbox-group>
            </div>
            <div>
              <sgds-checkbox-group label="Communication Methods" name="communication" hasFeedback="both">
                <sgds-checkbox value="email">Email</sgds-checkbox>
                <sgds-checkbox value="sms">SMS</sgds-checkbox>
                <sgds-checkbox value="phone">Phone</sgds-checkbox>
                <sgds-checkbox value="push">Push Notifications</sgds-checkbox>
              </sgds-checkbox-group>
            </div>
          </div>
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
            <sgds-button type="reset" variant="ghost">Reset</sgds-button>
            <sgds-button type="submit">Save Preferences</sgds-button>
          </div>
        </div>
      </form>
    </div>
  </div>`;

export const formFormFieldsDatesQuantitiesMarkup = `<div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form
        class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-center-8 sgds-col-xl-center-8 sgds-col-2-xl-center-8"
      >
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5
              class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
            >
              Event Booking
            </h5>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Name" name="name" type="text" required hasFeedback="both"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Email" name="email" type="email" required hasFeedback="both"></sgds-input>
              </div>
            </div>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-datepicker label="Start date" name="startDate" required hasFeedback="both"></sgds-datepicker>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-datepicker label="End date" name="endDate" required hasFeedback="both"></sgds-datepicker>
              </div>
            </div>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-quantity-toggle
                  label="Number of guests"
                  name="guests"
                  value="1"
                  min="1"
                  max="20"
                  required
                  hasFeedback="both"
                ></sgds-quantity-toggle>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-quantity-toggle
                  label="Quantity ordered"
                  name="quantity"
                  value="1"
                  min="1"
                  max="100"
                  required
                  hasFeedback="both"
                ></sgds-quantity-toggle>
              </div>
            </div>
          </div>
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
            <sgds-button type="reset" variant="ghost">Reset</sgds-button>
            <sgds-button type="submit">Book Event</sgds-button>
          </div>
        </div>
      </form>
    </div>
  </div>`;

export const formFormFieldsFileUploadMarkup = `<div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form
        class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-center-8 sgds-col-xl-center-8 sgds-col-2-xl-center-8"
      >
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5
              class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
            >
              Document Submission
            </h5>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Name" name="name" type="text" required hasFeedback="both"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Email" name="email" type="email" required hasFeedback="both"></sgds-input>
              </div>
            </div>
            <div>
              <sgds-file-upload label="Upload ID" name="idDocument" required hasFeedback="both"
                >Choose files</sgds-file-upload
              >
            </div>
            <div>
              <sgds-file-upload label="Upload Proof of Address" name="addressProof" required hasFeedback="both"
                >Choose files</sgds-file-upload
              >
            </div>
            <div>
              <sgds-file-upload label="Additional Documents" name="additionalDocs" hasFeedback="both"
                >Choose files</sgds-file-upload
              >
            </div>
          </div>
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
            <sgds-button type="reset" variant="ghost">Reset</sgds-button>
            <sgds-button type="submit">Upload Documents</sgds-button>
          </div>
        </div>
      </form>
    </div>
  </div>`;

export const formFormFieldsRadioMarkup = `<div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-8 sgds-col-xl-8 sgds-col-2-xl-8">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5
              class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
            >
              Survey
            </h5>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Name" name="name" type="text" required hasFeedback="both"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Email" name="email" type="email" required hasFeedback="both"></sgds-input>
              </div>
            </div>
            <div>
              <sgds-radio-group label="How satisfied are you?" name="satisfaction" required hasFeedback="both">
                <sgds-radio value="very-satisfied">Very satisfied</sgds-radio>
                <sgds-radio value="satisfied">Satisfied</sgds-radio>
                <sgds-radio value="neutral">Neutral</sgds-radio>
                <sgds-radio value="dissatisfied">Dissatisfied</sgds-radio>
              </sgds-radio-group>
            </div>
            <div>
              <sgds-radio-group label="How likely to recommend?" name="likelihood" required hasFeedback="both">
                <sgds-radio value="very-likely">Very likely</sgds-radio>
                <sgds-radio value="likely">Likely</sgds-radio>
                <sgds-radio value="unlikely">Unlikely</sgds-radio>
              </sgds-radio-group>
            </div>
          </div>
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
            <sgds-button type="reset" variant="ghost">Reset</sgds-button>
            <sgds-button type="submit">Submit Survey</sgds-button>
          </div>
        </div>
      </form>
    </div>
  </div>`;

export const formFormFieldsSelectsMarkup = `<div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-8 sgds-col-xl-8 sgds-col-2-xl-8">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5
              class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
            >
              Product Selection
            </h5>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-select
                  placeholder="Select an option"
                  label="Category"
                  name="category"
                  placeholder="Select a category"
                  required
                  hasFeedback="both"
                >
                  <sgds-select-option value="electronics">Electronics</sgds-select-option>
                  <sgds-select-option value="furniture">Furniture</sgds-select-option>
                  <sgds-select-option value="clothing">Clothing</sgds-select-option>
                </sgds-select>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-select
                  placeholder="Select an option"
                  label="Brand"
                  name="brand"
                  placeholder="Select a brand"
                  required
                  hasFeedback="both"
                >
                  <sgds-select-option value="brand-a">Brand A</sgds-select-option>
                  <sgds-select-option value="brand-b">Brand B</sgds-select-option>
                  <sgds-select-option value="brand-c">Brand C</sgds-select-option>
                </sgds-select>
              </div>
            </div>
            <div>
              <sgds-combo-box
                placeholder="Search or select..."
                label="Supplier"
                name="supplier"
                placeholder="Search suppliers..."
                hasFeedback="both"
              >
                <sgds-combo-box-option value="supplier-1">Supplier 1</sgds-combo-box-option>
                <sgds-combo-box-option value="supplier-2">Supplier 2</sgds-combo-box-option>
                <sgds-combo-box-option value="supplier-3">Supplier 3</sgds-combo-box-option>
              </sgds-combo-box>
            </div>
            <div>
              <sgds-combo-box
                placeholder="Search or select..."
                label="Features"
                name="features"
                multiSelect="true"
                placeholder="Select features..."
                hasFeedback="both"
              >
                <sgds-combo-box-option value="feature-1">Feature 1</sgds-combo-box-option>
                <sgds-combo-box-option value="feature-2">Feature 2</sgds-combo-box-option>
                <sgds-combo-box-option value="feature-3">Feature 3</sgds-combo-box-option>
                <sgds-combo-box-option value="feature-4">Feature 4</sgds-combo-box-option>
              </sgds-combo-box>
            </div>
          </div>
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
            <sgds-button type="reset" variant="ghost">Reset</sgds-button>
            <sgds-button type="submit">Search</sgds-button>
          </div>
        </div>
      </form>
    </div>
  </div>`;

export const formFormFieldsTextareaMarkup = `<div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form
        class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-center-8 sgds-col-xl-center-8 sgds-col-2-xl-center-8"
      >
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5
              class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
            >
              Contact Us
            </h5>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Your name" name="name" type="text" required hasFeedback="both"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Your email" name="email" type="email" required hasFeedback="both"></sgds-input>
              </div>
            </div>
            <div>
              <sgds-textarea
                label="Message"
                name="message"
                placeholder="Please enter your message..."
                required
                hasFeedback="both"
              ></sgds-textarea>
            </div>
            <div>
              <sgds-textarea
                label="Additional details"
                name="details"
                placeholder="Any additional information..."
              ></sgds-textarea>
            </div>
          </div>
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
            <sgds-button type="reset" variant="ghost">Clear</sgds-button>
            <sgds-button type="submit">Send Message</sgds-button>
          </div>
        </div>
      </form>
    </div>
  </div>`;

export const formFormMultistepStepperMarkup = `<div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-8 sgds-col-xl-8 sgds-col-2-xl-8">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <!-- Stepper -->
          <sgds-stepper id="stepper"></sgds-stepper>

          <!-- Step 1: Personal Information -->
          <div id="step-1" class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:text-heading-default sgds:mb-0">
              Personal Information
            </h5>

            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input
                  label="First name"
                  name="firstName"
                  type="text"
                  required
                  hasFeedback="both"
                  invalidFeedback="First name is required"
                ></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input
                  label="Last name"
                  name="lastName"
                  type="text"
                  required
                  hasFeedback="both"
                  invalidFeedback="Last name is required"
                ></sgds-input>
              </div>
            </div>

            <div>
              <sgds-input
                label="Email"
                name="email"
                type="email"
                required
                hasFeedback="both"
                invalidFeedback="Valid email required"
              ></sgds-input>
            </div>

            <div>
              <sgds-datepicker
                label="Date of birth"
                name="birthDate"
                required
                hasFeedback="both"
                invalidFeedback="Birth date required"
              ></sgds-datepicker>
            </div>
          </div>

          <!-- Step 2: Contact Details -->
          <div id="step-2" class="sgds:flex sgds:flex-col sgds:gap-layout-md" style="display: none;">
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:text-heading-default sgds:mb-0">
              Contact Details
            </h5>

            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Phone" name="phone" type="tel" hasFeedback="text" hintText="Optional"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input
                  label="Mobile"
                  name="mobile"
                  type="tel"
                  required
                  hasFeedback="both"
                  invalidFeedback="Mobile required"
                ></sgds-input>
              </div>
            </div>

            <div>
              <sgds-textarea
                label="Street address"
                name="address"
                required
                hasFeedback="both"
                invalidFeedback="Address required"
              ></sgds-textarea>
            </div>

            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input
                  label="City"
                  name="city"
                  type="text"
                  required
                  hasFeedback="both"
                  invalidFeedback="City required"
                ></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input
                  label="Postal code"
                  name="postal"
                  type="text"
                  required
                  hasFeedback="both"
                  invalidFeedback="Postal code required"
                ></sgds-input>
              </div>
            </div>

            <div>
              <sgds-select
                label="Country"
                name="country"
                placeholder="Select a country"
                required
                hasFeedback="both"
                invalidFeedback="Country required"
              >
                <sgds-select-option value="sg">Singapore</sgds-select-option>
                <sgds-select-option value="my">Malaysia</sgds-select-option>
                <sgds-select-option value="th">Thailand</sgds-select-option>
              </sgds-select>
            </div>
          </div>

          <!-- Step 3: Preferences -->
          <div id="step-3" class="sgds:flex sgds:flex-col sgds:gap-layout-md" style="display: none;">
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:text-heading-default sgds:mb-0">
              Preferences & Consent
            </h5>

            <div>
              <sgds-radio-group
                label="Delivery method"
                name="delivery"
                required
                hasFeedback="both"
                invalidFeedback="Select a method"
              >
                <sgds-radio value="pickup">Pickup</sgds-radio>
                <sgds-radio value="standard">Standard delivery</sgds-radio>
                <sgds-radio value="express">Express delivery</sgds-radio>
              </sgds-radio-group>
            </div>

            <div>
              <sgds-checkbox-group label="Communication preferences" name="communication">
                <sgds-checkbox value="email">Email updates</sgds-checkbox>
                <sgds-checkbox value="sms">SMS notifications</sgds-checkbox>
                <sgds-checkbox value="phone">Phone calls</sgds-checkbox>
              </sgds-checkbox-group>
            </div>

            <div>
              <sgds-checkbox
                name="terms"
                value="agree"
                required
                hasFeedback="both"
                invalidFeedback="You must agree to proceed"
              >
                I agree to the terms and conditions
              </sgds-checkbox>
            </div>

            <div>
              <sgds-checkbox name="newsletter" value="subscribe">Subscribe to our newsletter</sgds-checkbox>
            </div>
          </div>

          <!-- Form actions -->
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center">
            <sgds-button type="button" id="prevBtn" variant="ghost" style="display: none;">Previous</sgds-button>
            <div class="sgds:flex sgds:gap-layout-sm" style="margin-left: auto;">
              <sgds-button type="reset" variant="ghost">Cancel</sgds-button>
              <sgds-button type="button" id="nextBtn">Next</sgds-button>
              <sgds-button type="submit" id="submitBtn" style="display: none;">Submit</sgds-button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>`;

export const formFullwidthOnlyMarkup = `<div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-8 sgds-col-xl-8 sgds-col-2-xl-8">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5
              class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
            >
              All Full-Width
            </h5>
            <div>
              <sgds-textarea
                label="Description"
                name="description"
                placeholder="Enter description..."
                required
                hasFeedback="both"
              ></sgds-textarea>
            </div>
            <div>
              <sgds-radio-group label="Category" name="category" required hasFeedback="both">
                <sgds-radio value="category-a">Category A</sgds-radio>
                <sgds-radio value="category-b">Category B</sgds-radio>
                <sgds-radio value="category-c">Category C</sgds-radio>
              </sgds-radio-group>
            </div>
            <div>
              <sgds-checkbox-group label="Options" name="options" required hasFeedback="both">
                <sgds-checkbox value="option-1">Option 1</sgds-checkbox>
                <sgds-checkbox value="option-2">Option 2</sgds-checkbox>
                <sgds-checkbox value="option-3">Option 3</sgds-checkbox>
              </sgds-checkbox-group>
            </div>
            <div>
              <sgds-textarea
                label="Additional comments"
                name="comments"
                placeholder="Any additional comments..."
              ></sgds-textarea>
            </div>
          </div>
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
            <sgds-button type="reset" variant="ghost">Reset</sgds-button>
            <sgds-button type="submit">Submit</sgds-button>
          </div>
        </div>
      </form>
    </div>
  </div>`;

export const formPairedOnlyMarkup = `<div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-8 sgds-col-xl-8 sgds-col-2-xl-8">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5
              class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
            >
              All Paired Fields
            </h5>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="First name" name="firstName" type="text" required hasFeedback="both"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Last name" name="lastName" type="text" required hasFeedback="both"></sgds-input>
              </div>
            </div>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Email" name="email" type="email" required hasFeedback="both"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Phone" name="phone" type="tel" required hasFeedback="both"></sgds-input>
              </div>
            </div>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Username" name="username" type="text" required hasFeedback="both"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Password" name="password" type="password" required hasFeedback="both"></sgds-input>
              </div>
            </div>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Company" name="company" type="text" hasFeedback="both"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Position" name="position" type="text" hasFeedback="both"></sgds-input>
              </div>
            </div>
          </div>
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
            <sgds-button type="reset" variant="ghost">Reset</sgds-button>
            <sgds-button type="submit">Submit</sgds-button>
          </div>
        </div>
      </form>
    </div>
  </div>`;

export const formSectionsSingleMarkup = `<div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-8 sgds-col-xl-8 sgds-col-2-xl-8">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5
              class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
            >
              Quick Form
            </h5>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Name" name="name" type="text" required hasFeedback="both"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Email" name="email" type="email" required hasFeedback="both"></sgds-input>
              </div>
            </div>
            <div>
              <sgds-textarea
                label="Message"
                name="message"
                placeholder="Enter your message..."
                required
                hasFeedback="both"
              ></sgds-textarea>
            </div>
          </div>
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
            <sgds-button type="reset" variant="ghost">Cancel</sgds-button>
            <sgds-button type="submit">Send</sgds-button>
          </div>
        </div>
      </form>
    </div>
  </div>`;

export const formSectionsThreeMarkup = `<div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-8 sgds-col-xl-8 sgds-col-2-xl-8">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5
              class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
            >
              Personal Information
            </h5>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="First name" name="firstName" type="text" required hasFeedback="both"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Last name" name="lastName" type="text" required hasFeedback="both"></sgds-input>
              </div>
            </div>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Email" name="email" type="email" required hasFeedback="both"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-datepicker label="Date of birth" name="dob" required hasFeedback="both"></sgds-datepicker>
              </div>
            </div>
          </div>
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5
              class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
            >
              Address
            </h5>
            <div>
              <sgds-textarea
                label="Full address"
                name="address"
                placeholder="Street, City, Country..."
                required
                hasFeedback="both"
              ></sgds-textarea>
            </div>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Postal code" name="postalCode" type="text" required hasFeedback="both"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-select
                  placeholder="Select an option"
                  label="Country"
                  name="country"
                  placeholder="Select country"
                  required
                  hasFeedback="both"
                >
                  <sgds-select-option value="sg">Singapore</sgds-select-option>
                  <sgds-select-option value="my">Malaysia</sgds-select-option>
                </sgds-select>
              </div>
            </div>
          </div>
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5
              class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
            >
              Preferences
            </h5>
            <div>
              <sgds-checkbox-group label="Interests" name="interests" hasFeedback="both">
                <sgds-checkbox value="tech">Technology</sgds-checkbox>
                <sgds-checkbox value="design">Design</sgds-checkbox>
                <sgds-checkbox value="business">Business</sgds-checkbox>
              </sgds-checkbox-group>
            </div>
            <div>
              <sgds-radio-group label="Notification preference" name="notificationPref" required hasFeedback="both">
                <sgds-radio value="email">Email</sgds-radio>
                <sgds-radio value="push">Push</sgds-radio>
              </sgds-radio-group>
            </div>
            <div>
              <sgds-select
                placeholder="Select an option"
                label="Communication frequency"
                name="frequency"
                placeholder="Select frequency"
                hasFeedback="both"
              >
                <sgds-select-option value="daily">Daily</sgds-select-option>
                <sgds-select-option value="weekly">Weekly</sgds-select-option>
                <sgds-select-option value="monthly">Monthly</sgds-select-option>
              </sgds-select>
            </div>
          </div>
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
            <sgds-button type="reset" variant="ghost">Reset</sgds-button>
            <sgds-button type="submit">Complete Registration</sgds-button>
          </div>
        </div>
      </form>
    </div>
  </div>`;

export const formSectionsTwoMarkup = `<div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form
        class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-center-8 sgds-col-xl-center-8 sgds-col-2-xl-center-8"
      >
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5
              class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
            >
              Personal Details
            </h5>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="First name" name="firstName" type="text" required hasFeedback="both"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Last name" name="lastName" type="text" required hasFeedback="both"></sgds-input>
              </div>
            </div>
            <div>
              <sgds-textarea label="Bio" name="bio" placeholder="Tell us about yourself..."></sgds-textarea>
            </div>
          </div>
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5
              class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
            >
              Contact Preferences
            </h5>
            <div>
              <sgds-radio-group label="Preferred method" name="preference" required hasFeedback="both">
                <sgds-radio value="email">Email</sgds-radio>
                <sgds-radio value="phone">Phone</sgds-radio>
                <sgds-radio value="sms">SMS</sgds-radio>
              </sgds-radio-group>
            </div>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Phone" name="phone" type="tel" required hasFeedback="both"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-datepicker label="Preferred date" name="prefDate" hasFeedback="both"></sgds-datepicker>
              </div>
            </div>
          </div>
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
            <sgds-button type="reset" variant="ghost">Reset</sgds-button>
            <sgds-button type="submit">Save</sgds-button>
          </div>
        </div>
      </form>
    </div>
  </div>`;

// ============================================================
// header
// ============================================================

export const headerPageHeaderBreadcrumbMarkup = `<!-- Page Header Block (with breadcrumb)
       Layout : breadcrumb on top, then overline + h1 + body description
       Typography : h1 pattern (overline, heading-xl bold, body-lg)
  -->
  <section class="sgds:bg-default sgds:py-layout-lg">
    <div class="sgds-container">
      <div class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left sgds:gap-layout-md" class="sgds:max-w-text">
        <!-- Breadcrumb -->
        <sgds-breadcrumb>
          <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item><a href="#">Section</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item active><a href="#">Current Page</a></sgds-breadcrumb-item>
        </sgds-breadcrumb>

        <!-- Heading group -->
        <div>
          <div
            class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
          >
            Overline Label
          </div>

          <h1 class="sgds:text-heading-xl sgds:font-bold sgds:leading-xl sgds:tracking-tight sgds:text-heading-default">
            Page Heading Goes Here
          </h1>

          <p class="sgds:text-body-lg sgds:leading-md sgds:tracking-normal sgds:text-body-subtle">
            Supporting body text that provides context and detail for the page or section above.
          </p>
        </div>
      </div>
    </div>
  </section>`;

export const headerPageHeaderMarkup = `<!-- Page Header Block (no breadcrumb)
       Layout : overline + h1 + body description
       Typography : h1 pattern (overline, heading-xl bold, body-lg)
  -->
  <section class="sgds:bg-default sgds:py-layout-lg">
    <div class="sgds-container">
      <div class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left" class="sgds:max-w-text">
        <div
          class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
        >
          Overline Label
        </div>

        <h1 class="sgds:text-heading-xl sgds:font-bold sgds:leading-xl sgds:tracking-tight sgds:text-heading-default">
          Page Heading Goes Here
        </h1>

        <p class="sgds:text-body-lg sgds:leading-md sgds:tracking-normal sgds:text-body-subtle">
          Supporting body text that provides context and detail for the page or section above.
        </p>
      </div>
    </div>
  </section>`;

// ============================================================
// hero
// ============================================================

export const heroHeroBgImageLightMarkup = `<!-- Hero Block (background image — light overlay)
       Sizing      : min-height calc(100vh - 108px)
       Background  : full-cover image with light translucent overlay
       Text        : fixed-dark (always dark regardless of theme)
       Layout      : left-aligned content, no container, no outer padding
  -->
  <section
    class="sgds:flex sgds:items-center sgds:min-h-[640px]"
    style="
      position: relative;
      background-image: url('placeholder-sgds.png');
      background-size: cover;
      background-position: center;
    "
  >
    <!-- Light overlay -->
    <div class="sgds:bg-translucent-fixed-light" style="position: absolute; inset: 0;"></div>

    <!-- Container — keeps content within grid at all zoom levels -->
    <div class="sgds-container" style="position: relative; z-index: 1;">
      <div class="sgds-grid">
        <div
          class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6 sgds:flex sgds:flex-col sgds:items-start sgds:text-left sgds:py-layout-lg"
        >
          <!-- Typography group — mb-xl separates group from button -->
          <div class="sgds:mb-xl">
            <!-- Overline — overline-md semibold, fixed-dark -->
            <div
              class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-fixed-dark sgds:mb-xs"
            >
              Singapore Government Digital Services
            </div>

            <!-- Headline — display-lg bold, fixed-dark -->
            <h1
              class="sgds:text-display-lg sgds:font-bold sgds:leading-3-xl sgds:tracking-tighter sgds:text-fixed-dark"
            >
              One Platform. Simpler Living.
            </h1>

            <!-- Description — heading-sm light, h4, fixed-dark -->
            <h4 class="sgds:text-heading-sm sgds:font-light sgds:leading-sm sgds:tracking-tight sgds:text-fixed-dark">
              Access government services anytime, anywhere. Built for residents, designed for ease.
            </h4>
          </div>
          <!-- end typography group -->

          <!-- Button slot — size md -->
          <sgds-button variant="primary" tone="neutral" size="md">Get Started</sgds-button>
        </div>
        <!-- end content col -->
      </div>
      <!-- end grid -->
    </div>
    <!-- end container -->
  </section>`;

export const heroHeroBgImageMarkup = `<!-- Hero Block (background image)
       Sizing   : min-height 640px
       Background : full-cover image with dark overlay
       Layout   : left-aligned content, no container, no outer padding
  -->
  <section
    class="sgds:flex sgds:items-center sgds:min-h-[640px]"
    style="
      position: relative;
      background-image: url('placeholder-dark-sgds.png');
      background-size: cover;
      background-position: center;
    "
  >
    <!-- Overlay -->
    <div class="sgds:bg-overlay" style="position: absolute; inset: 0;"></div>

    <!-- Container — keeps content within grid at all zoom levels -->
    <div class="sgds-container" style="position: relative; z-index: 1;">
      <div class="sgds-grid">
        <div
          class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6 sgds:flex sgds:flex-col sgds:items-start sgds:text-left sgds:py-layout-lg"
        >
          <!-- Typography group — mb-xl separates group from button -->
          <div class="sgds:mb-xl">
            <!-- Overline — overline-md semibold, on-inverted -->
            <div
              class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-fixed-light sgds:mb-xs"
            >
              Singapore Government Digital Services
            </div>

            <!-- Headline — display-lg bold, on-inverted -->
            <h1
              class="sgds:text-display-lg sgds:font-bold sgds:leading-3-xl sgds:tracking-tighter sgds:text-fixed-light"
            >
              One Platform. Simpler Living.
            </h1>

            <!-- Description — heading-sm light, h4, on-inverted -->
            <h4 class="sgds:text-heading-sm sgds:font-light sgds:leading-sm sgds:tracking-tight sgds:text-fixed-light">
              Access government services anytime, anywhere. Built for residents, designed for ease.
            </h4>
          </div>
          <!-- end typography group -->

          <!-- Button slot — size md -->
          <sgds-button variant="primary" tone="neutral" size="md">Get Started</sgds-button>
        </div>
        <!-- end content col -->
      </div>
      <!-- end grid -->
    </div>
    <!-- end container -->
  </section>`;

export const heroHeroCenterMarkup = `<!-- Hero Block (center)
       Sizing   : min-height calc(100vh - 108px)
       Color    : bg-surface-default
       Spacing  : py-layout-lg (top + bottom)
  -->
  <section class="sgds:bg-default sgds:py-layout-lg sgds:min-h-[640px]">
    <!-- Container — constrains width and centers block on page -->
    <div class="sgds-container">
      <!-- Slot
         Spacing : padding-top layout-xs only (CSS var — no compiled pt-layout-xs utility)
         Layout  : stack, center-aligned
         Width   : max-w-text
    -->
      <div
        class="sgds:flex sgds:flex-col sgds:items-center sgds:text-center sgds:max-w-text sgds:mx-auto"
        class="sgds:pt-layout-xs"
      >
        <!-- Typography group — mb-xl separates group from button -->
        <div class="sgds:mb-xl">
          <!-- Overline — overline-md semibold, label color default, mb-xs -->
          <div
            class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
          >
            Singapore Government Digital Services
          </div>

          <!-- Headline — display-lg bold, display color default -->
          <h1
            class="sgds:text-display-lg sgds:font-bold sgds:leading-3-xl sgds:tracking-tighter sgds:text-display-default"
          >
            One Platform. Simpler Living.
          </h1>

          <!-- Description — heading-sm light, h4 -->
          <h4 class="sgds:text-heading-sm sgds:font-light sgds:leading-sm sgds:tracking-tight sgds:text-heading-subtle">
            Access government services anytime, anywhere. Built for residents, designed for ease.
          </h4>
        </div>
        <!-- end typography group -->

        <!-- Button slot — size md -->
        <sgds-button variant="primary" tone="neutral" size="md">Get Started</sgds-button>
      </div>
    </div>
    <!-- end container -->
  </section>`;

export const heroHeroFullbleedMarkup = `<!-- Hero Block (full-bleed image right)
       Sizing   : min-height 640px
       Color    : bg-surface-default
       Layout   : content left in grid, image right full-bleed (absolute)
  -->
  <section
    class="sgds:bg-default sgds:flex sgds:items-center sgds:min-h-[640px]"
    style="position: relative; overflow: hidden;"
  >
    <!-- Right: image — absolute, covers right half, full height -->
    <div style="position: absolute; right: 0; top: 0; bottom: 0; width: 50%;">
      <img
        src="/placeholder-sgds.png"
        alt="Government digital services"
        style="width: 100%; height: 100%; object-fit: cover; display: block;"
      />
    </div>

    <!-- Container — keeps content within grid at all zoom levels -->
    <div class="sgds-container" style="position: relative; z-index: 1;">
      <div class="sgds-grid">
        <div
          class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6 sgds:flex sgds:flex-col sgds:items-start sgds:text-left sgds:py-layout-lg"
        >
          <!-- Typography group — mb-xl separates group from button -->
          <div class="sgds:mb-xl">
            <!-- Overline — overline-md semibold, label color default, mb-xs -->
            <div
              class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
            >
              Singapore Government Digital Services
            </div>

            <!-- Headline — display-lg bold, display color default -->
            <h1
              class="sgds:text-display-lg sgds:font-bold sgds:leading-3-xl sgds:tracking-tighter sgds:text-display-default"
            >
              One Platform. Simpler Living.
            </h1>

            <!-- Description — heading-sm light, h4 -->
            <h4
              class="sgds:text-heading-sm sgds:font-light sgds:leading-sm sgds:tracking-tight sgds:text-heading-subtle"
            >
              Access government services anytime, anywhere. Built for residents, designed for ease.
            </h4>
          </div>
          <!-- end typography group -->

          <!-- Button slot — size md -->
          <sgds-button variant="primary" tone="neutral" size="md">Get Started</sgds-button>
        </div>
        <!-- end content col -->
      </div>
      <!-- end grid -->
    </div>
    <!-- end container -->
  </section>`;

export const heroHeroImageMarkup = `<!-- Hero Block (image right)
       Sizing   : min-height calc(100vh - 108px)
       Color    : bg-surface-default
       Spacing  : py-layout-lg (top + bottom)
       Layout   : 50/50 split, gap-layout-md
  -->
  <section class="sgds:bg-default sgds:py-layout-lg sgds:min-h-[640px]">
    <!-- Container — constrains width and centers block on page -->
    <div class="sgds-container">
      <!-- Two-column row: left content + right image, gap-layout-md -->
      <div class="sgds:flex sgds:items-center sgds:gap-layout-md">
        <!-- Left: content slot (50%), padding-right layout-md -->
        <div
          class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left sgds:max-w-text"
          style="width: 50%; padding-top: var(--sgds-spacing-layout-xs); padding-right: var(--sgds-spacing-layout-md);"
        >
          <!-- Typography group — mb-xl separates group from button -->
          <div class="sgds:mb-xl">
            <!-- Overline — overline-md semibold, label color default, mb-xs -->
            <div
              class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
            >
              Singapore Government Digital Services
            </div>

            <!-- Headline — display-lg bold, display color default -->
            <h1
              class="sgds:text-display-lg sgds:font-bold sgds:leading-3-xl sgds:tracking-tighter sgds:text-display-default"
            >
              One Platform. Simpler Living.
            </h1>

            <!-- Description — heading-sm light, h4 -->
            <h4
              class="sgds:text-heading-sm sgds:font-light sgds:leading-sm sgds:tracking-tight sgds:text-heading-subtle"
            >
              Access government services anytime, anywhere. Built for residents, designed for ease.
            </h4>
          </div>
          <!-- end typography group -->

          <!-- Button slot — size md -->
          <sgds-button variant="primary" tone="neutral" size="md">Get Started</sgds-button>
        </div>
        <!-- end left content -->

        <!-- Right: image (50%), 1:1 ratio -->
        <div style="width: 50%;">
          <img
            src="/placeholder-sgds.png"
            alt="Government digital services"
            style="width: 100%; aspect-ratio: 1 / 1; object-fit: cover; display: block; border-radius: var(--sgds-border-radius-xl);"
          />
        </div>
        <!-- end right image -->
      </div>
      <!-- end two-column row -->
    </div>
    <!-- end container -->
  </section>`;

export const heroHeroMarkup = `<!-- Hero Block
       Sizing   : min-height calc(100vh - 108px)
       Color    : bg-surface-default
       Spacing  : py-layout-lg (top + bottom)
  -->
  <section class="sgds:bg-default sgds:py-layout-lg sgds:min-h-[640px]">
    <!-- Container — constrains width and centers block on page -->
    <div class="sgds-container">
      <!-- Slot
         Spacing : padding-top layout-xs only (CSS var — no compiled pt-layout-xs utility)
         Layout  : stack, left-aligned
         Gap     : gap-text-lg (spacer-5 = 1rem = 16px)
         Width   : max-w-text
    -->
      <div class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left sgds:max-w-text" class="sgds:pt-layout-xs">
        <!-- Typography group — mb-xl separates group from button -->
        <div class="sgds:mb-xl">
          <!-- Overline — overline-md semibold, label color default, mb-xs -->
          <div
            class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
          >
            Singapore Government Digital Services
          </div>

          <!-- Headline — display-lg bold, display color default -->
          <h1
            class="sgds:text-display-lg sgds:font-bold sgds:leading-3-xl sgds:tracking-tighter sgds:text-display-default"
          >
            One Platform. Simpler Living.
          </h1>

          <!-- Description — heading-sm light, h4 -->
          <h4 class="sgds:text-heading-sm sgds:font-light sgds:leading-sm sgds:tracking-tight sgds:text-heading-subtle">
            Access government services anytime, anywhere. Built for residents, designed for ease.
          </h4>
        </div>
        <!-- end typography group -->

        <!-- Button slot — size md -->
        <sgds-button variant="primary" tone="neutral" size="md">Get Started</sgds-button>
      </div>
    </div>
    <!-- end container -->
  </section>`;

// ============================================================
// stats
// ============================================================

export const statsStats3Markup = `<style>
    @media (width >= 768px) {
      .stats-row {
        flex-wrap: nowrap !important;
      }
      .stats-row > * {
        width: auto;
        flex: 1;
      }
    }
  </style>

  <!-- Stats Block — section header + 3 stats
       Background : bg-surface-default
       Spacing    : py-layout-md, gap-layout-md
  -->
  <section class="sgds:bg-default sgds:py-layout-md">
    <div class="sgds-container">
      <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
        <!-- Section header -->
        <div class="sgds:max-w-text">
          <div
            class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
          >
            By the Numbers
          </div>
          <h2
            class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default"
          >
            Impact at a Glance
          </h2>
          <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0">
            Key metrics measured over the past 12 months across all participating agencies.
          </p>
        </div>

        <!-- 3 stats -->
        <div class="stats-row sgds:flex sgds:flex-wrap sgds:gap-layout-md">
          <div class="sgds:flex sgds:flex-col sgds:items-start sgds:w-full sgds:pr-layout-xs">
            <div
              class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default"
            >
              2.4M
            </div>
            <h5
              class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
            >
              Active Users
            </h5>
            <p
              class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0"
            >
              Residents actively using the platform each month to access government services.
            </p>
          </div>

          <div class="sgds:flex sgds:flex-col sgds:items-start sgds:w-full sgds:pr-layout-xs">
            <div
              class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default"
            >
              400+
            </div>
            <h5
              class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
            >
              Government Services
            </h5>
            <p
              class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0"
            >
              Integrated services from agencies across the public sector available in one place.
            </p>
          </div>

          <div class="sgds:flex sgds:flex-col sgds:items-start sgds:w-full sgds:pr-layout-xs">
            <div
              class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default"
            >
              99.9%
            </div>
            <h5
              class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
            >
              Platform Uptime
            </h5>
            <p
              class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0"
            >
              Consistently high availability ensuring residents can access services anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>`;

export const statsStats4Markup = `<style>
    @media (width >= 1024px) {
      .stats-row {
        flex-wrap: nowrap !important;
      }
      .stats-row > * {
        width: auto;
        flex: 1;
      }
    }
  </style>

  <!-- Stats Block — section header + 4 stats
       Background : bg-surface-default
       Spacing    : py-layout-md, gap-layout-md
  -->
  <section class="sgds:bg-default sgds:py-layout-md">
    <div class="sgds-container">
      <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
        <!-- Section header -->
        <div class="sgds:max-w-text">
          <div
            class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
          >
            By the Numbers
          </div>
          <h2
            class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default"
          >
            Impact at a Glance
          </h2>
          <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0">
            Key metrics measured over the past 12 months across all participating agencies.
          </p>
        </div>

        <!-- 4 stats -->
        <div class="stats-row sgds:flex sgds:flex-wrap sgds:gap-layout-md">
          <div class="sgds:flex sgds:flex-col sgds:items-start sgds:w-full sgds:pr-layout-xs">
            <div
              class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default"
            >
              2.4M
            </div>
            <h5
              class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
            >
              Active Users
            </h5>
            <p
              class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0"
            >
              Residents actively using the platform to access government services each month.
            </p>
          </div>

          <div class="sgds:flex sgds:flex-col sgds:items-start sgds:w-full sgds:pr-layout-xs">
            <div
              class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default"
            >
              400+
            </div>
            <h5
              class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
            >
              Government Services
            </h5>
            <p
              class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0"
            >
              Integrated services from agencies across the public sector in one place.
            </p>
          </div>

          <div class="sgds:flex sgds:flex-col sgds:items-start sgds:w-full sgds:pr-layout-xs">
            <div
              class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default"
            >
              99.9%
            </div>
            <h5
              class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
            >
              Platform Uptime
            </h5>
            <p
              class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0"
            >
              Consistently high availability so residents can access services anytime.
            </p>
          </div>

          <div class="sgds:flex sgds:flex-col sgds:items-start sgds:w-full sgds:pr-layout-xs">
            <div
              class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default"
            >
              16
            </div>
            <h5
              class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
            >
              Partner Agencies
            </h5>
            <p
              class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0"
            >
              Public agencies contributing services and data to the shared platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>`;

export const statsStats5Markup = `<style>
    @media (width >= 1024px) {
      .stats-row {
        flex-wrap: nowrap !important;
      }
      .stats-row > * {
        width: auto;
        flex: 1;
      }
    }
  </style>

  <!-- Stats Block — section header + 5 stats
       Background : bg-surface-default
       Spacing    : py-layout-md, gap-layout-md
  -->
  <section class="sgds:bg-default sgds:py-layout-md">
    <div class="sgds-container">
      <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
        <!-- Section header -->
        <div class="sgds:max-w-text">
          <div
            class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
          >
            By the Numbers
          </div>
          <h2
            class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default"
          >
            Impact at a Glance
          </h2>
          <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0">
            Key metrics measured over the past 12 months across all participating agencies.
          </p>
        </div>

        <!-- 5 stats -->
        <div class="stats-row sgds:flex sgds:flex-wrap sgds:gap-layout-md">
          <div class="sgds:flex sgds:flex-col sgds:items-start sgds:w-full sgds:pr-layout-xs">
            <div
              class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default"
            >
              2.4M
            </div>
            <h5
              class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
            >
              Active Users
            </h5>
            <p
              class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0"
            >
              Residents using the platform to access services each month.
            </p>
          </div>

          <div class="sgds:flex sgds:flex-col sgds:items-start sgds:w-full sgds:pr-layout-xs">
            <div
              class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default"
            >
              400+
            </div>
            <h5
              class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
            >
              Government Services
            </h5>
            <p
              class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0"
            >
              Integrated services from agencies across the public sector.
            </p>
          </div>

          <div class="sgds:flex sgds:flex-col sgds:items-start sgds:w-full sgds:pr-layout-xs">
            <div
              class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default"
            >
              99.9%
            </div>
            <h5
              class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
            >
              Platform Uptime
            </h5>
            <p
              class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0"
            >
              High availability so residents can access services anytime.
            </p>
          </div>

          <div class="sgds:flex sgds:flex-col sgds:items-start sgds:w-full sgds:pr-layout-xs">
            <div
              class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default"
            >
              16
            </div>
            <h5
              class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
            >
              Partner Agencies
            </h5>
            <p
              class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0"
            >
              Public agencies contributing services and data to the platform.
            </p>
          </div>

          <div class="sgds:flex sgds:flex-col sgds:items-start sgds:w-full sgds:pr-layout-xs">
            <div
              class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default"
            >
              4.8
            </div>
            <h5
              class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
            >
              Satisfaction Score
            </h5>
            <p
              class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0"
            >
              Average rating out of 5 from post-task surveys collected in-app.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>`;

export const statsStatsRight6Markup = `<style>
    .stats-inner {
      display: flex;
      flex-direction: column;
      gap: var(--sgds-gap-layout-md);
    }
    @media (width >= 1024px) {
      .stats-heading {
        padding-right: var(--sgds-spacing-layout-md);
      }
    }
  </style>

  <!-- Stats Block — heading left 6 cols + 4 stats right 6 cols (2×2 grid)
       Background : bg-surface-default
       Spacing    : py-layout-md
       Split      : lg:6/6
  -->
  <section class="sgds:bg-default sgds:py-layout-md">
    <div class="sgds-container">
      <div class="sgds-grid" style="gap: var(--sgds-gap-layout-md); align-items: start;">
        <!-- Heading — left 6 cols -->
        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6 stats-heading">
          <div
            class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
          >
            By the Numbers
          </div>
          <h2
            class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default"
          >
            Impact at a Glance
          </h2>
          <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0">
            Key metrics measured over the past 12 months across all participating agencies.
          </p>
        </div>

        <!-- 4 stats — right 6 cols in 2×2 grid -->
        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6">
          <div class="stats-inner sgds:grid sgds-grid" style="grid-template-columns: repeat(2, 1fr);">
            <div class="sgds:flex sgds:flex-col sgds:items-start md:sgds:pr-layout-xs">
              <div
                class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default"
              >
                2.4M
              </div>
              <h5
                class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
              >
                Active Users
              </h5>
              <p
                class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0"
              >
                Residents using the platform each month.
              </p>
            </div>

            <div class="sgds:flex sgds:flex-col sgds:items-start md:sgds:pr-layout-xs">
              <div
                class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default"
              >
                400+
              </div>
              <h5
                class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
              >
                Government Services
              </h5>
              <p
                class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0"
              >
                Integrated services across the public sector.
              </p>
            </div>

            <div class="sgds:flex sgds:flex-col sgds:items-start md:sgds:pr-layout-xs">
              <div
                class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default"
              >
                99.9%
              </div>
              <h5
                class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
              >
                Platform Uptime
              </h5>
              <p
                class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0"
              >
                High availability ensuring residents can access services anytime.
              </p>
            </div>

            <div class="sgds:flex sgds:flex-col sgds:items-start md:sgds:pr-layout-xs">
              <div
                class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default"
              >
                16
              </div>
              <h5
                class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
              >
                Partner Agencies
              </h5>
              <p
                class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0"
              >
                Public agencies contributing services and data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;

export const statsStatsRight8Markup = `<style>
    .stats-inner {
      display: flex;
      flex-direction: column;
      gap: var(--sgds-gap-layout-md);
    }
    @media (width >= 1024px) {
      .stats-heading {
        padding-right: var(--sgds-spacing-layout-md);
      }
    }
  </style>

  <!-- Stats Block — heading left 4 cols + 4 stats right 8 cols (flex row)
       Background : bg-surface-default
       Spacing    : py-layout-md
       Split      : lg:4/8
  -->
  <section class="sgds:bg-default sgds:py-layout-md">
    <div class="sgds-container">
      <div class="sgds-grid" style="gap: var(--sgds-gap-layout-md); align-items: start;">
        <!-- Heading — left 4 cols -->
        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 stats-heading">
          <div
            class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
          >
            By the Numbers
          </div>
          <h2
            class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default"
          >
            Impact at a Glance
          </h2>
          <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0">
            Key metrics measured over the past 12 months across all participating agencies.
          </p>
        </div>

        <!-- 4 stats — right 8 cols in flex row -->
        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-8">
          <div class="stats-inner sgds:flex sgds:flex-wrap sgds:gap-layout-md">
            <div class="sgds:flex sgds:flex-col sgds:items-start sgds:flex-1 md:sgds:pr-layout-xs">
              <div
                class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default"
              >
                2.4M
              </div>
              <h5
                class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
              >
                Active Users
              </h5>
              <p
                class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0"
              >
                Residents actively using the platform to access government services each month.
              </p>
            </div>

            <div class="sgds:flex sgds:flex-col sgds:items-start sgds:flex-1 md:sgds:pr-layout-xs">
              <div
                class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default"
              >
                400+
              </div>
              <h5
                class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
              >
                Government Services
              </h5>
              <p
                class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0"
              >
                Integrated services from agencies across the public sector.
              </p>
            </div>

            <div class="sgds:flex sgds:flex-col sgds:items-start sgds:flex-1 md:sgds:pr-layout-xs">
              <div
                class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default"
              >
                99.9%
              </div>
              <h5
                class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
              >
                Platform Uptime
              </h5>
              <p
                class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0"
              >
                Consistently high availability so residents can access services anytime.
              </p>
            </div>

            <div class="sgds:flex sgds:flex-col sgds:items-start sgds:flex-1 md:sgds:pr-layout-xs">
              <div
                class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default"
              >
                16
              </div>
              <h5
                class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
              >
                Partner Agencies
              </h5>
              <p
                class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0"
              >
                Public agencies contributing services and data to the shared platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;

