<template>
  <div class="sgds-container">
    <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg sgds:bg-default sgds:text-body-default">
      <div class="sgds:text-center">
        <PageHeader
          title="Stories"
          description="Perspectives on design systems, connected workflows, and digital delivery"
          title-class="sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-center sgds:text-display-default"
          description-class="sgds:mx-auto sgds:text-heading-sm sgds:font-light sgds:leading-sm sgds:tracking-normal sgds:text-heading-subtle"
          bottom-gap-class="sgds:mb-0"
        />
      </div>

      <section class="sgds:bg-default">
        <div class="sgds-grid sgds:items-center sgds:gap-layout-md">
          <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6">
            <div class="sgds:relative sgds:h-[180px] sgds:w-full sgds:overflow-hidden sgds:rounded-lg sgds:bg-alternate sgds:sm:h-[260px] sgds:lg:h-[320px]">
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

          <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6 sgds:flex sgds:flex-col sgds:items-start sgds:gap-component-md sgds:text-left">
            <div class="sgds:flex sgds:flex-col sgds:gap-text-sm">
              <div>
                <sgds-badge outlined>{{ featuredStory.category }}</sgds-badge>
              </div>
              <h2 class="sgds:mb-0 sgds:text-heading-xl sgds:font-bold sgds:leading-xl sgds:tracking-normal sgds:text-heading-default">
                {{ featuredStory.title }}
              </h2>
              <p class="sgds:mb-0 sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-subtle">
                {{ featuredStory.description }}
              </p>
            </div>
            <sgds-button :href="featuredStory.href" variant="primary" tone="neutral" size="md">Read post</sgds-button>
          </div>
        </div>
      </section>

      <section class="sgds:bg-default">
        <div class="sgds:mb-layout-md sgds:flex sgds:flex-col sgds:gap-text-sm">
          <p class="sgds:mb-0 sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default">
            More stories
          </p>
          <h2 class="sgds:mb-0 sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-normal sgds:text-heading-default">
            From the SGDS team
          </h2>
          <p class="sgds:mb-0 sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
            Explore stories and practical notes from our design system work.
          </p>
        </div>

        <div class="sgds-grid sgds:items-stretch sgds:gap-layout-md">
          <div
            v-for="card in storyOverviewCards"
            :key="card.title"
            class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds:flex sgds:flex-col"
          >
            <sgds-image-card stretchedLink class="sgds:h-full">
              <img
                slot="image"
                :src="card.imageSrc"
                :alt="card.imageAlt"
                width="1200"
                height="675"
              />
              <sgds-badge slot="image-badge" outlined>{{ card.category }}</sgds-badge>
              <span slot="title" class="sgds:line-clamp-2">{{ card.title }}</span>
              <span slot="description">{{ card.description }}</span>
              <sgds-link slot="footer">
                <a :href="card.href">Read post <sgds-icon name="arrow-right"></sgds-icon></a>
              </sgds-link>
            </sgds-image-card>
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
