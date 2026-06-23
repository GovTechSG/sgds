<template>
  <div>
    <div
      class="sgds:flex sgds:flex-col sgds:gap-layout-xl sgds:bg-default sgds:text-body-default"
    >
      <div>
        <PageHeader
          title="Stories"
          description="A collection of perspectives and notes on building, using, and evolving design systems."
          bottom-gap-class="sgds:mb-0"
        />
      </div>

      <section class="sgds:bg-default">
        <div class="sgds-grid sgds:items-center sgds:gap-layout-md">
          <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6">
            <div
              class="sgds:relative sgds:w-full sgds:aspect-[424/300] sgds:overflow-hidden sgds:rounded-3-xl sgds:bg-alternate"
            >
              <video
                v-if="featuredStory.videoSrc"
                autoplay
                muted
                loop
                playsinline
                :poster="featuredStory.posterSrc ?? featuredStory.imageSrc"
                :aria-label="featuredStory.imageAlt"
                width="1920"
                height="1080"
                class="sgds:absolute sgds:inset-0 sgds:block sgds:h-full sgds:w-full sgds:object-cover"
              >
                <source :src="featuredStory.videoSrc" type="video/mp4" />
                <img
                  :src="featuredStory.imageSrc"
                  :alt="featuredStory.imageAlt"
                  class="sgds:block sgds:h-full sgds:w-full sgds:object-cover"
                />
              </video>
              <img
                v-else
                :src="featuredStory.imageSrc"
                :alt="featuredStory.imageAlt"
                width="1920"
                height="1080"
                class="sgds:absolute sgds:inset-0 sgds:block sgds:h-full sgds:w-full sgds:object-cover"
              />
            </div>
          </div>

          <div
            class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6 sgds:lg:pl-layout-md sgds:flex sgds:flex-col sgds:items-start sgds:gap-component-sm sgds:text-left"
          >
            <div class="sgds:flex sgds:flex-col sgds:gap-text-sm">
              <p
                class="sgds:m-0 sgds:text-left sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-body-subtle"
              >
                {{ featuredStory.category }}
              </p>
              <h2
                class="sgds:mb-0 sgds:text-heading-xl sgds:font-bold sgds:leading-xl sgds:tracking-normal sgds:text-heading-default"
              >
                {{ featuredStory.title }}
              </h2>
              <p
                class="sgds:mb-0 sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle"
              >
                {{ featuredStory.description }}
              </p>
            </div>
            <sgds-button
              :href="featuredStory.href"
              variant="primary"
              tone="neutral"
              size="md"
              ariaLabel="Read post"
              >Read post</sgds-button
            >
          </div>
        </div>
      </section>

      <section class="sgds:bg-default sgds:pt-layout-sm">
        <div class="sgds:mb-layout-md sgds:flex sgds:flex-col sgds:gap-text-sm">
          <h2
            class="sgds:mb-0 sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-normal sgds:text-heading-default"
          >
            More stories
          </h2>
          <p
            class="sgds:mb-0 sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle"
          >
            Explore stories and practical notes from our design system work.
          </p>
        </div>

        <div class="sgds-grid sgds:items-stretch sgds:gap-layout-md">
          <div
            v-for="card in storyOverviewCards"
            :key="card.title"
            class="sgds-col-4 sgds:flex sgds:flex-col"
          >
            <sgds-link class="sgds:block sgds:h-full">
              <a
                :href="card.href"
                class="sgds:group sgds:flex sgds:h-full sgds:flex-col sgds:gap-component-sm"
              >
                <div
                  class="sgds:relative sgds:flex sgds:w-full sgds:aspect-[424/300] sgds:overflow-hidden sgds:rounded-3-xl sgds:bg-surface-raised"
                >
                  <img
                    :src="card.imageSrc"
                    :alt="card.imageAlt"
                    width="1200"
                    height="675"
                    class="sgds:h-full sgds:w-full sgds:object-cover sgds:transition-transform sgds:duration-500 sgds:ease-in-out sgds:group-hover:scale-[1.04] sgds:group-focus-visible:scale-[1.04] sgds:motion-reduce:transition-none sgds:motion-reduce:group-hover:scale-100 sgds:motion-reduce:group-focus-visible:scale-100"
                  />
                </div>
                <div
                  class="sgds:flex sgds:w-full sgds:flex-1 sgds:flex-col sgds:gap-text-xs"
                >
                  <p
                    class="sgds:m-0 sgds:text-left sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-body-subtle"
                  >
                    {{ card.category }}
                  </p>
                  <h3
                    class="sgds:mb-0 sgds:flex-1 sgds:text-left sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default"
                  >
                    {{ card.title }}
                  </h3>
                  <p
                    class="sgds:m-0 sgds:mt-auto sgds:text-left sgds:text-caption-md sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle"
                  >
                    {{ card.published }}
                  </p>
                </div>
              </a>
            </sgds-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { featuredStory, storyOverviewCards } from "../data/stories";
import PageHeader from "./page/PageHeader.vue";
</script>
