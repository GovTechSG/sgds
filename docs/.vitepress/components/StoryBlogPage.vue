<template>
  <article v-if="post" class="sgds:bg-default">
    <Mainnav />

    <section class="sgds:bg-alternate sgds:py-layout-md">
      <div class="sgds-container">
        <div
          class="sgds:flex sgds:max-w-container-md sgds:flex-col sgds:items-start sgds:gap-layout-md sgds:text-left"
        >
          <sgds-breadcrumb
            class="sgds:hidden sgds:w-full sgds:min-w-0 sgds:md:block"
          >
            <sgds-breadcrumb-item><a href="/">Home</a></sgds-breadcrumb-item>
            <sgds-breadcrumb-item
              ><a href="/stories">Stories</a></sgds-breadcrumb-item
            >
            <sgds-breadcrumb-item active
              ><a :href="post.href">{{ post.title }}</a></sgds-breadcrumb-item
            >
          </sgds-breadcrumb>
          <sgds-breadcrumb
            class="sgds:block sgds:w-full sgds:min-w-0 sgds:md:hidden"
          >
            <sgds-breadcrumb-item class="sgds:flex-none">
              <a href="/">Home</a>
            </sgds-breadcrumb-item>
            <sgds-breadcrumb-item class="sgds:flex-none">
              <sgds-overflow-menu aria-haspopup="menu" size="sm">
                <sgds-dropdown-item :ariaLabel.prop="'Stories'">
                  <a href="/stories">Stories</a>
                </sgds-dropdown-item>
              </sgds-overflow-menu>
            </sgds-breadcrumb-item>
            <sgds-breadcrumb-item active class="sgds:min-w-0 sgds:flex-1">
              <a
                :href="post.href"
                class="sgds:block sgds:max-w-full sgds:overflow-hidden sgds:text-ellipsis sgds:whitespace-nowrap"
              >
                {{ post.title }}
              </a>
            </sgds-breadcrumb-item>
          </sgds-breadcrumb>

          <div>
            <div
              class="sgds:mb-text-xs sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default"
            >
              {{ post.category }}
            </div>
            <h1
              class="sgds:text-heading-xl sgds:font-bold sgds:leading-xl sgds:tracking-tight sgds:text-heading-default"
            >
              {{ post.title }}
            </h1>
            <p
              class="sgds:mb-0 sgds:text-body-lg sgds:leading-md sgds:tracking-normal sgds:text-body-subtle"
            >
              {{ post.description }}
            </p>
            <div
              v-if="displayAuthors.length"
              class="sgds:mt-component-sm sgds:flex sgds:w-fit sgds:flex-wrap sgds:items-center sgds:gap-x-2 sgds:gap-y-1"
            >
              <span
                v-for="author in displayAuthors"
                :key="author.authorHref ?? author.author"
                class="sgds:flex sgds:items-center sgds:gap-1"
              >
                <img
                  v-if="author.authorAvatarSrc"
                  :src="author.authorAvatarSrc"
                  :alt="author.authorAvatarAlt ?? ''"
                  width="32"
                  height="32"
                  class="sgds:block sgds:h-8 sgds:w-8 sgds:rounded-full sgds:object-cover sgds:object-top"
                />
                <span
                  v-else
                  class="sgds:inline-flex sgds:h-8 sgds:w-8 sgds:flex-none sgds:items-center sgds:justify-center sgds:rounded-full sgds:bg-surface-raised sgds:text-label-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-label-default"
                  aria-hidden="true"
                >
                  {{ author.authorInitials ?? authorInitials(author.author) }}
                </span>
                <sgds-link v-if="author.authorHref" size="sm" tone="neutral">
                  <a :href="author.authorHref">
                    {{ author.author }}
                  </a>
                </sgds-link>
                <span
                  v-else
                  class="sgds:text-label-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-label-default"
                >
                  {{ author.author }}
                </span>
              </span>
              <span
                aria-hidden="true"
                class="sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle"
              >
                |
              </span>
              <span
                class="sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle"
              >
                Published {{ post.published }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="sgds:bg-default">
      <div class="sgds-container">
        <div
          class="sgds:block sgds:lg:grid sgds:lg:grid-cols-[minmax(0,1fr)_var(--sgds-dimension-320)] sgds:lg:items-start sgds:lg:gap-layout-lg"
        >
          <div class="sgds:flex sgds:min-w-0 sgds:flex-col">
            <section v-if="post.intro.length" class="sgds:py-layout-md">
              <div
                class="sgds:flex sgds:max-w-container-md sgds:flex-col sgds:gap-text-md"
              >
                <p
                  v-for="paragraph in post.intro"
                  :key="paragraph"
                  class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default"
                >
                  <template
                    v-for="part in highlightedTimingParts(paragraph)"
                    :key="part.key"
                  >
                    <span
                      v-if="part.highlighted"
                      class="sgds:font-semibold"
                    >{{ part.text }}</span>
                    <template v-else>{{ part.text }}</template>
                  </template>
                </p>
              </div>
            </section>

            <section
              v-for="(section, sectionIndex) in post.sections"
              :key="section.title"
              :class="storySectionClass(section, sectionIndex)"
            >
              <div class="sgds:flex sgds:flex-col sgds:gap-layout-xs">
                <div
                  class="sgds:flex sgds:max-w-container-md sgds:flex-col sgds:gap-text-md"
                >
                  <div class="sgds:flex sgds:items-center sgds:gap-text-xs">
                    <h3
                      v-if="section.headingLevel === 'h3'"
                      :id="sectionId(section.title)"
                      class="sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default"
                    >
                      {{ section.title }}
                    </h3>
                    <h2
                      v-else
                      :id="sectionId(section.title)"
                      class="sgds:m-0 sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight sgds:text-heading-default"
                    >
                      {{ section.title }}
                    </h2>
                  </div>
                  <h3
                    v-if="section.subheading"
                    class="sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default"
                  >
                    {{ section.subheading }}
                  </h3>
                </div>
                <template
                  v-if="
                    section.subsections?.length && !section.paragraphs.length
                  "
                >
                  <template
                    v-for="subsection in section.subsections"
                    :key="subsection.title ?? subsection.paragraphs.join('-')"
                  >
                    <div
                      v-if="
                        subsection.title ||
                        subsection.paragraphs.length ||
                        subsection.paragraphsHtml?.length ||
                        subsection.list?.length ||
                        subsection.labelledList?.length
                      "
                      class="sgds:flex sgds:max-w-container-md sgds:flex-col sgds:gap-text-md sgds:pt-layout-xs"
                    >
                      <h3
                        v-if="subsection.title"
                        class="sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default"
                      >
                        {{ subsection.title }}
                      </h3>
                      <template
                        v-for="(
                          paragraph, paragraphIndex
                        ) in subsection.paragraphs"
                        :key="paragraph"
                      >
                        <p
                          class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default"
                        >
                          <span
                            v-for="part in highlightedTimingParts(paragraph)"
                            :key="part.key"
                            :class="
                              part.highlighted ? 'sgds:font-semibold' : ''
                            "
                          >
                            {{ part.text }}
                          </span>
                        </p>
                        <figure
                          v-if="
                            subsection.visual &&
                            subsection.visualAfterParagraph ===
                              paragraphIndex + 1
                          "
                          class="sgds:mx-0 sgds:my-text-sm sgds:flex sgds:w-full sgds:flex-col sgds:gap-text-sm"
                        >
                          <div
                            :class="[
                              'sgds:flex sgds:items-center sgds:justify-center sgds:overflow-hidden',
                              framedVisualClass(subsection.visual),
                            ]"
                          >
                            <StoryVisualMedia :visual="subsection.visual" />
                          </div>
                          <figcaption
                            class="sgds:m-0 sgds:w-full sgds:text-center sgds:text-caption-md sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle"
                          >
                            <span
                              v-for="part in highlightedTimingParts(
                                subsection.visual.caption,
                              )"
                              :key="part.key"
                              :class="
                                part.highlighted ? 'sgds:font-semibold' : ''
                              "
                            >
                              {{ part.text }}
                            </span>
                          </figcaption>
                        </figure>
                      </template>
                      <p
                        v-for="paragraph in subsection.paragraphsHtml"
                        :key="paragraph"
                        class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default"
                        v-html="paragraph"
                      ></p>
                      <component
                        :is="subsection.listType === 'ordered' ? 'ol' : 'ul'"
                        v-if="subsection.list?.length"
                        class="sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-xs sgds:pl-layout-xs sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default"
                      >
                        <li
                          v-for="item in subsection.list"
                          :key="item"
                          class="sgds:m-0"
                        >
                          {{ item }}
                        </li>
                      </component>
                      <ul
                        v-if="subsection.labelledList?.length"
                        class="sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-xs sgds:pl-layout-xs sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default"
                      >
                        <li
                          v-for="item in subsection.labelledList"
                          :key="item.label ?? item.text"
                          class="sgds:m-0"
                        >
                          <span
                            v-if="item.label"
                            class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-label-default"
                          >
                            {{ item.label }}:
                          </span>
                          {{ item.text }}
                        </li>
                      </ul>
                    </div>
                    <figure
                      v-if="
                        subsection.visual && !subsection.visualAfterParagraph
                      "
                      class="sgds:mx-0 sgds:my-text-sm sgds:flex sgds:w-full sgds:max-w-container-md sgds:flex-col sgds:gap-text-sm"
                    >
                      <div
                        :class="[
                          'sgds:flex sgds:items-center sgds:justify-center sgds:overflow-hidden',
                          framedVisualClass(subsection.visual),
                        ]"
                      >
                        <StoryVisualMedia :visual="subsection.visual" />
                      </div>
                      <figcaption
                        class="sgds:m-0 sgds:w-full sgds:text-center sgds:text-caption-md sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle"
                      >
                        <span
                          v-for="part in highlightedTimingParts(
                            subsection.visual.caption,
                          )"
                          :key="part.key"
                          :class="part.highlighted ? 'sgds:font-semibold' : ''"
                        >
                          {{ part.text }}
                        </span>
                      </figcaption>
                    </figure>
                    <figure
                      v-if="subsection.postVisual"
                      class="sgds:mx-0 sgds:my-text-sm sgds:flex sgds:w-full sgds:max-w-container-md sgds:flex-col sgds:gap-text-sm"
                    >
                      <div
                        :class="[
                          'sgds:flex sgds:items-center sgds:justify-center sgds:overflow-hidden',
                          framedVisualClass(subsection.postVisual),
                        ]"
                      >
                        <StoryVisualMedia :visual="subsection.postVisual" />
                      </div>
                      <figcaption
                        class="sgds:m-0 sgds:w-full sgds:text-center sgds:text-caption-md sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle"
                      >
                        <span
                          v-for="part in highlightedTimingParts(
                            subsection.postVisual.caption,
                          )"
                          :key="part.key"
                          :class="part.highlighted ? 'sgds:font-semibold' : ''"
                        >
                          {{ part.text }}
                        </span>
                      </figcaption>
                    </figure>
                    <div
                      v-if="
                        subsection.postVisualParagraphs?.length ||
                        subsection.postVisualList?.length
                      "
                      class="sgds:flex sgds:max-w-container-md sgds:flex-col sgds:gap-text-md sgds:pt-layout-xs"
                    >
                      <p
                        v-for="paragraph in subsection.postVisualParagraphs"
                        :key="paragraph"
                        class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default"
                      >
                        <span
                          v-for="part in highlightedTimingParts(paragraph)"
                          :key="part.key"
                          :class="part.highlighted ? 'sgds:font-semibold' : ''"
                        >
                          {{ part.text }}
                        </span>
                      </p>
                      <ul
                        v-if="subsection.postVisualList?.length"
                        class="sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-xs sgds:pl-layout-xs sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default"
                      >
                        <li
                          v-for="item in subsection.postVisualList"
                          :key="item"
                          class="sgds:m-0"
                        >
                          {{ item }}
                        </li>
                      </ul>
                    </div>
                  </template>
                </template>
                <figure
                  v-if="section.titleVisual"
                  class="sgds:mx-0 sgds:my-text-sm sgds:flex sgds:w-full sgds:max-w-container-md sgds:flex-col sgds:gap-text-sm"
                >
                  <div
                    :class="[
                      'sgds:flex sgds:items-center sgds:justify-center sgds:overflow-hidden',
                      section.titleVisual.verticalPadding
                        ? 'sgds:py-component-xs'
                        : '',
                    ]"
                  >
                    <video
                      v-if="section.titleVisual.videoSrc"
                      autoplay
                      muted
                      loop
                      playsinline
                      :poster="section.titleVisual.posterSrc"
                      :aria-label="section.titleVisual.alt"
                      class="sgds:block sgds:aspect-video sgds:w-full sgds:rounded-lg sgds:object-cover"
                    >
                      <source
                        :src="section.titleVisual.videoSrc"
                        type="video/mp4"
                      />
                    </video>
                    <img
                      v-else
                      :src="section.titleVisual.src"
                      :alt="section.titleVisual.alt"
                      :fetchpriority="sectionIndex === 0 ? 'high' : undefined"
                      class="sgds:block sgds:h-auto sgds:w-full sgds:object-contain"
                    />
                  </div>
                  <figcaption
                    class="sgds:m-0 sgds:w-full sgds:text-center sgds:text-caption-md sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle"
                  >
                    <span
                      v-for="part in highlightedTimingParts(
                        section.titleVisual.caption,
                      )"
                      :key="part.key"
                      :class="part.highlighted ? 'sgds:font-semibold' : ''"
                    >
                      {{ part.text }}
                    </span>
                  </figcaption>
                </figure>
                <div
                  class="sgds:flex sgds:max-w-container-md sgds:flex-col sgds:gap-text-md"
                >
                  <template
                    v-for="(paragraph, paragraphIndex) in section.paragraphs"
                    :key="paragraph"
                  >
                    <p
                      class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default"
                    >
                      <span
                        v-for="part in highlightedTimingParts(paragraph)"
                        :key="part.key"
                        :class="part.highlighted ? 'sgds:font-semibold' : ''"
                      >
                        {{ part.text }}
                      </span>
                    </p>
                    <p
                      v-for="item in paragraphIndex === 0
                        ? section.emphasis
                        : []"
                      :key="item"
                      class="sgds:m-0 sgds:text-body-lg sgds:font-semibold sgds:leading-md sgds:tracking-normal sgds:text-body-default"
                    >
                      {{ item }}
                    </p>
                    <figure
                      v-if="paragraphIndex === 0 && section.bodyVisual"
                      class="sgds:mx-0 sgds:my-text-sm sgds:flex sgds:w-full sgds:flex-col sgds:gap-text-sm"
                    >
                      <div
                        :class="[
                          'sgds:flex sgds:items-center sgds:justify-center sgds:overflow-hidden',
                          section.bodyVisual.verticalPadding
                            ? 'sgds:py-component-xs'
                            : '',
                        ]"
                      >
                        <img
                          :src="section.bodyVisual.src"
                          :alt="section.bodyVisual.alt"
                          :width="section.bodyVisual.width"
                          :height="section.bodyVisual.height"
                          class="sgds:block sgds:h-auto sgds:w-full sgds:object-contain"
                        />
                      </div>
                      <figcaption
                        class="sgds:m-0 sgds:w-full sgds:text-center sgds:text-caption-md sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle"
                      >
                        <span
                          v-for="part in highlightedTimingParts(
                            section.bodyVisual.caption,
                          )"
                          :key="part.key"
                          :class="part.highlighted ? 'sgds:font-semibold' : ''"
                        >
                          {{ part.text }}
                        </span>
                      </figcaption>
                    </figure>
                    <figure
                      v-if="
                        section.visual &&
                        section.visualAfterParagraph === paragraphIndex + 1
                      "
                      class="sgds:mx-0 sgds:my-text-sm sgds:flex sgds:w-full sgds:max-w-container-md sgds:flex-col sgds:gap-text-sm"
                    >
                      <div
                        :class="[
                          'sgds:block sgds:w-full sgds:overflow-hidden',
                          section.visual.fullWidth && !section.visual.videoSrc
                            ? 'sgds:aspect-[976/656]'
                            : '',
                          section.visual.verticalPadding
                            ? 'sgds:py-component-xs'
                            : '',
                        ]"
                      >
                        <video
                          v-if="section.visual.videoSrc"
                          :autoplay="
                            section.visual.videoAutoplay ||
                            !section.visual.videoControls
                          "
                          :muted="
                            section.visual.videoAutoplay ||
                            !section.visual.videoControls
                          "
                          :loop="!section.visual.videoControls"
                          :controls="section.visual.videoControls"
                          playsinline
                          preload="metadata"
                          :poster="section.visual.posterSrc"
                          :aria-label="section.visual.alt"
                          :width="section.visual.width"
                          :height="section.visual.height"
                          class="sgds:block sgds:h-auto sgds:max-w-full"
                        >
                          <source
                            :src="section.visual.videoSrc"
                            type="video/mp4"
                          />
                        </video>
                        <img
                          v-else
                          :src="section.visual.src"
                          :alt="section.visual.alt"
                          :width="section.visual.width"
                          :height="section.visual.height"
                          :class="[
                            'sgds:block sgds:w-full',
                            section.visual.fullWidth
                              ? 'sgds:h-full sgds:object-contain'
                              : 'sgds:h-auto sgds:object-contain',
                          ]"
                        />
                      </div>
                      <figcaption
                        class="sgds:m-0 sgds:block sgds:w-full sgds:text-center sgds:text-caption-md sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle"
                      >
                        <span
                          v-for="part in highlightedTimingParts(
                            section.visual.caption,
                          )"
                          :key="part.key"
                          :class="part.highlighted ? 'sgds:font-semibold' : ''"
                        >
                          {{ part.text }}
                        </span>
                      </figcaption>
                    </figure>
                  </template>
                  <template
                    v-for="(
                      paragraph, paragraphIndex
                    ) in section.paragraphsHtml"
                    :key="paragraph"
                  >
                    <p
                      class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default"
                      v-html="paragraph"
                    ></p>
                    <figure
                      v-if="
                        !section.paragraphs.length &&
                        paragraphIndex === 0 &&
                        section.bodyVisual
                      "
                      class="sgds:mx-0 sgds:my-text-sm sgds:flex sgds:w-full sgds:flex-col sgds:gap-text-sm"
                    >
                      <div
                        :class="[
                          'sgds:flex sgds:items-center sgds:justify-center sgds:overflow-hidden',
                          section.bodyVisual.verticalPadding
                            ? 'sgds:py-component-xs'
                            : '',
                        ]"
                      >
                        <img
                          :src="section.bodyVisual.src"
                          :alt="section.bodyVisual.alt"
                          :width="section.bodyVisual.width"
                          :height="section.bodyVisual.height"
                          class="sgds:block sgds:h-auto sgds:w-full sgds:object-contain"
                        />
                      </div>
                      <figcaption
                        class="sgds:m-0 sgds:w-full sgds:text-center sgds:text-caption-md sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle"
                      >
                        <span
                          v-for="part in highlightedTimingParts(
                            section.bodyVisual.caption,
                          )"
                          :key="part.key"
                          :class="part.highlighted ? 'sgds:font-semibold' : ''"
                        >
                          {{ part.text }}
                        </span>
                      </figcaption>
                    </figure>
                  </template>
                  <component
                    :is="section.listType === 'ordered' ? 'ol' : 'ul'"
                    v-if="section.list?.length"
                    class="sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-xs sgds:pl-layout-xs sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default"
                  >
                    <li
                      v-for="item in section.list"
                      :key="item"
                      class="sgds:m-0"
                    >
                      {{ item }}
                    </li>
                  </component>
                  <ul
                    v-if="section.labelledList?.length"
                    class="sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-xs sgds:pl-layout-xs sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default"
                  >
                    <li
                      v-for="item in section.labelledList"
                      :key="item.label ?? item.text"
                      class="sgds:m-0"
                    >
                      <span
                        v-if="item.label"
                        class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-label-default"
                      >
                        {{ item.label }}:
                      </span>
                      {{ item.text }}
                    </li>
                  </ul>
                </div>
                <template
                  v-if="
                    section.subsections?.length && section.paragraphs.length
                  "
                >
                  <template
                    v-for="subsection in section.subsections"
                    :key="subsection.title ?? subsection.paragraphs.join('-')"
                  >
                    <div
                      v-if="
                        subsection.title ||
                        subsection.paragraphs.length ||
                        subsection.paragraphsHtml?.length ||
                        subsection.list?.length ||
                        subsection.labelledList?.length
                      "
                      class="sgds:flex sgds:max-w-container-md sgds:flex-col sgds:gap-text-md sgds:pt-layout-xs"
                    >
                      <h3
                        v-if="subsection.title"
                        class="sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default"
                      >
                        {{ subsection.title }}
                      </h3>
                      <template
                        v-for="(
                          paragraph, paragraphIndex
                        ) in subsection.paragraphs"
                        :key="paragraph"
                      >
                        <p
                          class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default"
                        >
                          <span
                            v-for="part in highlightedTimingParts(paragraph)"
                            :key="part.key"
                            :class="
                              part.highlighted ? 'sgds:font-semibold' : ''
                            "
                          >
                            {{ part.text }}
                          </span>
                        </p>
                        <figure
                          v-if="
                            subsection.visual &&
                            subsection.visualAfterParagraph ===
                              paragraphIndex + 1
                          "
                          class="sgds:mx-0 sgds:my-text-sm sgds:flex sgds:w-full sgds:flex-col sgds:gap-text-sm"
                        >
                          <div
                            :class="[
                              'sgds:flex sgds:items-center sgds:justify-center sgds:overflow-hidden',
                              framedVisualClass(subsection.visual),
                            ]"
                          >
                            <StoryVisualMedia :visual="subsection.visual" />
                          </div>
                          <figcaption
                            class="sgds:m-0 sgds:w-full sgds:text-center sgds:text-caption-md sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle"
                          >
                            <span
                              v-for="part in highlightedTimingParts(
                                subsection.visual.caption,
                              )"
                              :key="part.key"
                              :class="
                                part.highlighted ? 'sgds:font-semibold' : ''
                              "
                            >
                              {{ part.text }}
                            </span>
                          </figcaption>
                        </figure>
                      </template>
                      <p
                        v-for="paragraph in subsection.paragraphsHtml"
                        :key="paragraph"
                        class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default"
                        v-html="paragraph"
                      ></p>
                      <component
                        :is="subsection.listType === 'ordered' ? 'ol' : 'ul'"
                        v-if="subsection.list?.length"
                        class="sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-xs sgds:pl-layout-xs sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default"
                      >
                        <li
                          v-for="item in subsection.list"
                          :key="item"
                          class="sgds:m-0"
                        >
                          {{ item }}
                        </li>
                      </component>
                      <ul
                        v-if="subsection.labelledList?.length"
                        class="sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-xs sgds:pl-layout-xs sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default"
                      >
                        <li
                          v-for="item in subsection.labelledList"
                          :key="item.label ?? item.text"
                          class="sgds:m-0"
                        >
                          <span
                            v-if="item.label"
                            class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-label-default"
                          >
                            {{ item.label }}:
                          </span>
                          {{ item.text }}
                        </li>
                      </ul>
                    </div>
                    <figure
                      v-if="
                        subsection.visual && !subsection.visualAfterParagraph
                      "
                      class="sgds:mx-0 sgds:my-text-sm sgds:flex sgds:w-full sgds:max-w-container-md sgds:flex-col sgds:gap-text-sm"
                    >
                      <div
                        :class="[
                          'sgds:flex sgds:items-center sgds:justify-center sgds:overflow-hidden',
                          framedVisualClass(subsection.visual),
                        ]"
                      >
                        <StoryVisualMedia :visual="subsection.visual" />
                      </div>
                      <figcaption
                        class="sgds:m-0 sgds:w-full sgds:text-center sgds:text-caption-md sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle"
                      >
                        <span
                          v-for="part in highlightedTimingParts(
                            subsection.visual.caption,
                          )"
                          :key="part.key"
                          :class="part.highlighted ? 'sgds:font-semibold' : ''"
                        >
                          {{ part.text }}
                        </span>
                      </figcaption>
                    </figure>
                    <figure
                      v-if="subsection.postVisual"
                      class="sgds:mx-0 sgds:my-text-sm sgds:flex sgds:w-full sgds:max-w-container-md sgds:flex-col sgds:gap-text-sm"
                    >
                      <div
                        :class="[
                          'sgds:flex sgds:items-center sgds:justify-center sgds:overflow-hidden',
                          framedVisualClass(subsection.postVisual),
                        ]"
                      >
                        <StoryVisualMedia :visual="subsection.postVisual" />
                      </div>
                      <figcaption
                        class="sgds:m-0 sgds:w-full sgds:text-center sgds:text-caption-md sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle"
                      >
                        <span
                          v-for="part in highlightedTimingParts(
                            subsection.postVisual.caption,
                          )"
                          :key="part.key"
                          :class="part.highlighted ? 'sgds:font-semibold' : ''"
                        >
                          {{ part.text }}
                        </span>
                      </figcaption>
                    </figure>
                    <div
                      v-if="
                        subsection.postVisualParagraphs?.length ||
                        subsection.postVisualList?.length
                      "
                      class="sgds:flex sgds:max-w-container-md sgds:flex-col sgds:gap-text-md"
                    >
                      <p
                        v-for="paragraph in subsection.postVisualParagraphs"
                        :key="paragraph"
                        class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default"
                      >
                        <span
                          v-for="part in highlightedTimingParts(paragraph)"
                          :key="part.key"
                          :class="part.highlighted ? 'sgds:font-semibold' : ''"
                        >
                          {{ part.text }}
                        </span>
                      </p>
                      <ul
                        v-if="subsection.postVisualList?.length"
                        class="sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-xs sgds:pl-layout-xs sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default"
                      >
                        <li
                          v-for="item in subsection.postVisualList"
                          :key="item"
                          class="sgds:m-0"
                        >
                          {{ item }}
                        </li>
                      </ul>
                    </div>
                  </template>
                </template>
                <div
                  v-if="section.comparisonTable"
                  class="sgds:flex sgds:w-full sgds:max-w-container-lg sgds:flex-col sgds:gap-component-md"
                >
                  <sgds-table
                    :tableBorder="section.comparisonTable.tableBorder"
                    :headerBackground="section.comparisonTable.headerBackground"
                    :responsive="section.comparisonTable.responsive ?? 'always'"
                  >
                    <sgds-table-row>
                      <sgds-table-head
                        v-for="column in section.comparisonTable.columns"
                        :key="column"
                      >
                        {{ column }}
                      </sgds-table-head>
                    </sgds-table-row>
                    <sgds-table-row
                      v-for="row in section.comparisonTable.rows"
                      :key="row.join('-')"
                    >
                      <sgds-table-cell v-for="cell in row" :key="cell">
                        {{ cell }}
                      </sgds-table-cell>
                    </sgds-table-row>
                  </sgds-table>
                  <p
                    v-if="section.comparisonTable.callout"
                    class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default"
                  >
                    {{ section.comparisonTable.callout }}
                  </p>
                </div>
                <div
                  v-if="section.diagram === 'figmaMcpFlow'"
                  class="sgds:w-full sgds:max-w-container-md sgds:bg-transparent sgds:py-component-xs"
                >
                  <FigmaMcpFlowDiagram />
                </div>
                <figure
                  v-if="section.visual && !section.visualAfterParagraph"
                  class="sgds:mx-0 sgds:my-text-sm sgds:flex sgds:w-full sgds:max-w-container-md sgds:flex-col sgds:gap-text-sm"
                >
                  <div
                    :class="[
                      'sgds:block sgds:w-full sgds:overflow-hidden',
                      section.visual.fullWidth && !section.visual.videoSrc
                        ? 'sgds:aspect-[976/656]'
                        : '',
                      section.visual.verticalPadding
                        ? 'sgds:py-component-xs'
                        : '',
                    ]"
                  >
                    <video
                      v-if="section.visual.videoSrc"
                      :autoplay="
                        section.visual.videoAutoplay ||
                        !section.visual.videoControls
                      "
                      :muted="
                        section.visual.videoAutoplay ||
                        !section.visual.videoControls
                      "
                      :loop="!section.visual.videoControls"
                      :controls="section.visual.videoControls"
                      playsinline
                      preload="metadata"
                      :poster="section.visual.posterSrc"
                      :aria-label="section.visual.alt"
                      :width="section.visual.width"
                      :height="section.visual.height"
                      class="sgds:block sgds:h-auto sgds:max-w-full"
                    >
                      <source :src="section.visual.videoSrc" type="video/mp4" />
                    </video>
                    <img
                      v-else
                      :src="section.visual.src"
                      :alt="section.visual.alt"
                      :width="section.visual.width"
                      :height="section.visual.height"
                      :class="[
                        'sgds:block sgds:w-full',
                        section.visual.fullWidth
                          ? 'sgds:h-full sgds:object-contain'
                          : 'sgds:h-auto sgds:object-contain',
                      ]"
                    />
                  </div>
                  <figcaption
                    class="sgds:m-0 sgds:block sgds:w-full sgds:text-center sgds:text-caption-md sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle"
                  >
                    <span
                      v-for="part in highlightedTimingParts(
                        section.visual.caption,
                      )"
                      :key="part.key"
                      :class="part.highlighted ? 'sgds:font-semibold' : ''"
                    >
                      {{ part.text }}
                    </span>
                  </figcaption>
                </figure>
                <div
                  v-if="
                    section.postVisualParagraphs?.length ||
                    section.postVisualList?.length
                  "
                  class="sgds:flex sgds:max-w-container-md sgds:flex-col sgds:gap-text-md"
                >
                  <p
                    v-for="paragraph in section.postVisualParagraphs"
                    :key="paragraph"
                    class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default"
                  >
                    <span
                      v-for="part in highlightedTimingParts(paragraph)"
                      :key="part.key"
                      :class="part.highlighted ? 'sgds:font-semibold' : ''"
                    >
                      {{ part.text }}
                    </span>
                  </p>
                  <ul
                    v-if="section.postVisualList?.length"
                    class="sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-xs sgds:pl-layout-xs sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default"
                  >
                    <li
                      v-for="item in section.postVisualList"
                      :key="item"
                      class="sgds:m-0"
                    >
                      {{ item }}
                    </li>
                  </ul>
                </div>
                <div
                  v-if="section.postVisualSubsections?.length"
                  class="sgds:flex sgds:max-w-container-md sgds:flex-col sgds:gap-layout-xs"
                >
                  <section
                    v-for="subsection in section.postVisualSubsections"
                    :key="subsection.title ?? subsection.paragraphs.join('-')"
                    class="sgds:flex sgds:flex-col sgds:gap-text-md"
                  >
                    <h3
                      v-if="subsection.title"
                      class="sgds:m-0 sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
                    >
                      {{ subsection.title }}
                    </h3>
                    <p
                      v-for="paragraph in subsection.paragraphs"
                      :key="paragraph"
                      class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default"
                    >
                      <span
                        v-for="part in highlightedTimingParts(paragraph)"
                        :key="part.key"
                        :class="part.highlighted ? 'sgds:font-semibold' : ''"
                      >
                        {{ part.text }}
                      </span>
                    </p>
                    <component
                      :is="subsection.listType === 'ordered' ? 'ol' : 'ul'"
                      v-if="subsection.list?.length"
                      class="sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-xs sgds:pl-layout-xs sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default"
                    >
                      <li
                        v-for="item in subsection.list"
                        :key="item"
                        class="sgds:m-0"
                      >
                        {{ item }}
                      </li>
                    </component>
                    <p
                      v-for="paragraph in subsection.postVisualParagraphs"
                      :key="paragraph"
                      class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default"
                    >
                      <span
                        v-for="part in highlightedTimingParts(paragraph)"
                        :key="part.key"
                        :class="part.highlighted ? 'sgds:font-semibold' : ''"
                      >
                        {{ part.text }}
                      </span>
                    </p>
                  </section>
                </div>
                <div
                  v-if="section.postVisualConclusion"
                  class="sgds:flex sgds:max-w-container-md sgds:flex-col sgds:gap-text-md"
                >
                  <p
                    class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default"
                  >
                    {{ section.postVisualConclusion }}
                  </p>
                </div>
                <aside
                  v-if="section.boxedContent"
                  class="sgds:flex sgds:max-w-container-md sgds:flex-col sgds:gap-component-sm sgds:rounded-lg sgds:border sgds:border-muted sgds:bg-surface-default sgds:p-component-md"
                >
                  <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
                    <h3
                      class="sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default"
                    >
                      {{ section.boxedContent.title }}
                    </h3>
                    <p
                      v-for="paragraph in section.boxedContent.paragraphs"
                      :key="paragraph"
                      class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default"
                    >
                      <span
                        v-for="part in highlightedTimingParts(paragraph)"
                        :key="part.key"
                        :class="part.highlighted ? 'sgds:font-semibold' : ''"
                      >
                        {{ part.text }}
                      </span>
                    </p>
                  </div>
                  <ul
                    v-if="section.boxedContent.labelledList?.length"
                    class="sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-xs sgds:pl-layout-xs sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default"
                  >
                    <li
                      v-for="item in section.boxedContent.labelledList"
                      :key="item.label ?? item.text"
                      class="sgds:m-0"
                    >
                      <span
                        v-if="item.label"
                        class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-label-default"
                      >
                        {{ item.label }}:
                      </span>
                      {{ item.text }}
                    </li>
                  </ul>
                </aside>
              </div>
            </section>

            <section v-if="post.matrix" class="sgds:py-layout-md">
              <div
                class="sgds:flex sgds:max-w-container-md sgds:flex-col sgds:gap-layout-md"
              >
                <div class="sgds:flex sgds:flex-col sgds:gap-text-sm">
                  <h2
                    :id="sectionId(post.matrix.title)"
                    class="sgds:m-0 sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight sgds:text-heading-default"
                  >
                    {{ post.matrix.title }}
                  </h2>
                  <p
                    class="sgds:mb-0 sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-default"
                  >
                    {{ post.matrix.description }}
                  </p>
                </div>

                <div
                  class="sgds:grid sgds:grid-cols-[5.75rem_minmax(0,1fr)_minmax(0,1fr)] sgds:border sgds:border-muted sgds:md:hidden"
                >
                  <div class="sgds:bg-alternate sgds:p-component-xs">
                    <span class="sgds:sr-only">AI and SGDS combination</span>
                  </div>
                  <div
                    v-for="column in post.matrix.columns"
                    :key="`${column}-mobile`"
                    class="sgds:flex sgds:min-w-0 sgds:items-center sgds:justify-center sgds:border-l sgds:border-muted sgds:bg-alternate sgds:p-component-xs sgds:text-center"
                  >
                    <span
                      class="sgds:block sgds:min-w-0 sgds:text-label-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-label-default"
                    >
                      {{ column }}
                    </span>
                  </div>

                  <template
                    v-for="rowGroup in matrixRows"
                    :key="`${rowGroup.row}-mobile`"
                  >
                    <div
                      class="sgds:flex sgds:min-w-0 sgds:items-center sgds:border-t sgds:border-muted sgds:bg-alternate sgds:p-component-xs"
                    >
                      <span
                        class="sgds:block sgds:min-w-0 sgds:text-label-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-label-default"
                      >
                        {{ rowGroup.row }}
                      </span>
                    </div>
                    <div
                      v-for="cell in rowGroup.cells"
                      :key="`${cell.row}-${cell.column}-mobile`"
                      class="sgds:flex sgds:min-h-[var(--sgds-dimension-144)] sgds:min-w-0 sgds:flex-col sgds:items-center sgds:justify-center sgds:gap-text-xs sgds:border-l sgds:border-t sgds:border-muted sgds:bg-surface-default sgds:p-component-xs sgds:text-center"
                    >
                      <h3
                        class="sgds:m-0 sgds:text-label-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-label-default"
                      >
                        {{ cell.title }}
                      </h3>
                      <p
                        v-if="cell.description"
                        class="sgds:m-0 sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle"
                      >
                        {{ cell.description }}
                      </p>
                      <ul
                        v-if="cell.outcomes?.length"
                        class="sgds:m-0 sgds:flex sgds:w-full sgds:list-none sgds:flex-col sgds:items-center sgds:gap-text-2-xs sgds:p-0 sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-default"
                      >
                        <li
                          v-for="outcome in cell.outcomes"
                          :key="outcome.text"
                          class="sgds:flex sgds:w-full sgds:items-center sgds:justify-center sgds:gap-text-2-xs"
                        >
                          <sgds-icon
                            :name="
                              outcome.status === 'positive'
                                ? 'check-circle-fill'
                                : 'xcircle-fill'
                            "
                            size="sm"
                            :class="
                              outcome.status === 'positive'
                                ? 'sgds:text-success-default'
                                : 'sgds:text-danger-default'
                            "
                          ></sgds-icon>
                          <span class="sgds:min-w-0">{{ outcome.text }}</span>
                        </li>
                      </ul>
                    </div>
                  </template>
                </div>

                <div class="sgds:hidden sgds:md:block">
                  <sgds-table
                    tableBorder
                    headerBackground
                    responsive="always"
                    class="sgds:w-full"
                  >
                    <sgds-table-row>
                      <sgds-table-head>
                        <span class="sgds:sr-only"
                          >AI and SGDS combination</span
                        >
                      </sgds-table-head>
                      <sgds-table-head
                        v-for="column in post.matrix.columns"
                        :key="column"
                      >
                        <span
                          class="sgds:block sgds:w-full sgds:min-w-[var(--sgds-dimension-192)] sgds:text-center sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-label-default"
                        >
                          {{ column }}
                        </span>
                      </sgds-table-head>
                    </sgds-table-row>

                    <sgds-table-row
                      v-for="rowGroup in matrixRows"
                      :key="rowGroup.row"
                    >
                      <sgds-table-head>
                        <span
                          class="sgds:block sgds:w-full sgds:min-w-[var(--sgds-dimension-128)] sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-label-default"
                        >
                          {{ rowGroup.row }}
                        </span>
                      </sgds-table-head>
                      <sgds-table-cell
                        v-for="cell in rowGroup.cells"
                        :key="`${cell.row}-${cell.column}`"
                      >
                        <div
                          class="sgds:flex sgds:min-h-[var(--sgds-dimension-128)] sgds:w-full sgds:min-w-[var(--sgds-dimension-256)] sgds:flex-col sgds:items-center sgds:justify-center sgds:gap-text-xs sgds:text-center"
                        >
                          <h3
                            class="sgds:m-0 sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-label-default"
                          >
                            {{ cell.title }}
                          </h3>
                          <p
                            v-if="cell.description"
                            class="sgds:m-0 sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle"
                          >
                            {{ cell.description }}
                          </p>
                          <ul
                            v-if="cell.outcomes?.length"
                            class="sgds:m-0 sgds:flex sgds:w-full sgds:list-none sgds:flex-col sgds:items-center sgds:gap-text-2-xs sgds:p-0 sgds:text-body-md sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-default"
                          >
                            <li
                              v-for="outcome in cell.outcomes"
                              :key="outcome.text"
                              class="sgds:flex sgds:w-full sgds:items-center sgds:justify-center sgds:gap-text-2-xs"
                            >
                              <sgds-icon
                                :name="
                                  outcome.status === 'positive'
                                    ? 'check-circle-fill'
                                    : 'xcircle-fill'
                                "
                                size="md"
                                :class="
                                  outcome.status === 'positive'
                                    ? 'sgds:text-success-default'
                                    : 'sgds:text-danger-default'
                                "
                              ></sgds-icon>
                              <span>{{ outcome.text }}</span>
                            </li>
                          </ul>
                        </div>
                      </sgds-table-cell>
                    </sgds-table-row>
                  </sgds-table>
                </div>
              </div>
            </section>

            <section
              v-if="post.closing.length"
              class="sgds:pt-0 sgds:pb-layout-md"
            >
              <div
                class="sgds:flex sgds:max-w-container-md sgds:flex-col sgds:gap-text-md"
              >
                <p
                  v-for="paragraph in post.closing"
                  :key="paragraph"
                  :class="[
                    'sgds:m-0 sgds:tracking-normal sgds:text-body-default',
                    post.closingEmphasis
                      ? 'sgds:text-body-lg sgds:font-semibold sgds:leading-md'
                      : 'sgds:text-body-md sgds:font-regular sgds:leading-xs',
                  ]"
                >
                  <span
                    v-for="part in highlightedTimingParts(paragraph)"
                    :key="part.key"
                    :class="part.highlighted ? 'sgds:font-semibold' : ''"
                  >
                    {{ part.text }}
                  </span>
                </p>
              </div>
            </section>

            <section v-if="post.disclaimer" class="sgds:py-layout-md">
              <div
                class="sgds:max-w-container-md sgds:bg-alternate sgds:p-component-sm"
              >
                <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
                  <h2
                    class="sgds:m-0 sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-label-default"
                  >
                    {{ post.disclaimer.title }}
                  </h2>
                  <p
                    v-for="paragraph in post.disclaimer.paragraphs"
                    :key="paragraph"
                    class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle"
                  >
                    {{ paragraph }}
                  </p>
                </div>
              </div>
            </section>
          </div>

          <aside
            v-if="tocItems.length"
            class="sgds:sticky sgds:top-[var(--sgds-layout-padding-md)] sgds:lg:ml-layout-md sgds:z-[var(--sgds-z-index-sticky)] sgds:ml-auto sgds:w-full sgds:max-w-[var(--sgds-dimension-320)] sgds:self-start sgds:mt-[calc(var(--sgds-layout-padding-md)+var(--sgds-text-gap-sm))] sgds:max-lg:hidden"
            aria-label="Story sections"
          >
            <sgds-table-of-contents class="sgds:w-full">
              <h3
                class="sgds:m-0 sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-label-default"
              >
                On this page
              </h3>
              <li v-for="item in tocItems" :key="item.id" slot="contents">
                <sgds-link
                  ><a :href="`#${item.id}`">{{ item.title }}</a></sgds-link
                >
              </li>
            </sgds-table-of-contents>
          </aside>
        </div>
      </div>
    </section>

    <section class="sgds:bg-default sgds:py-layout-md">
      <div class="sgds-container">
        <div
          class="sgds:flex sgds:max-w-container-md sgds:flex-col sgds:items-start sgds:gap-component-md"
        >
          <div
            v-if="relatedArticles.length"
            class="sgds:flex sgds:flex-col sgds:gap-text-xs"
          >
            <p
              class="sgds:m-0 sgds:text-body-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-body-default"
            >
              {{ post.relatedHeading ?? "We explored this shift further in:" }}
            </p>
            <sgds-link v-for="article in relatedArticles" :key="article.href">
              <a
                :href="article.href"
                :target="isExternalHref(article.href) ? '_blank' : undefined"
                :rel="isExternalHref(article.href) ? 'noreferrer' : undefined"
              >
                → {{ article.title }}
              </a>
            </sgds-link>
          </div>
          <p
            class="sgds:m-0 sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle"
          >
            Published {{ post.published }}
          </p>
        </div>
      </div>
    </section>

    <Footer />
  </article>

  <div v-else class="sgds:flex sgds:flex-col sgds:gap-component-sm">
    <h1
      class="sgds:m-0 sgds:text-heading-xl sgds:font-bold sgds:leading-xl sgds:tracking-tight sgds:text-heading-default"
    >
      Story not found
    </h1>
    <sgds-link><a href="/stories">Back to stories</a></sgds-link>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, h, ref, watch, type PropType } from "vue";
import {
  getStoryPost,
  type StoryAuthorFields,
  type StoryMatrixCell,
  type StoryRelatedArticle,
  type StorySection,
  type StoryVisual,
} from "../data/stories";
import FigmaMcpFlowDiagram from "./ai/FigmaMcpFlowDiagram.vue";
import Footer from "./layout/Footer.vue";
import Mainnav from "./layout/Mainnav.vue";

const props = defineProps<{
  storyKey: string;
}>();

const post = computed(() => getStoryPost(props.storyKey));

const displayAuthors = computed<StoryAuthorFields[]>(() => {
  const story = post.value;

  if (!story) return [];
  if (story.authors?.length) return story.authors;

  return [
    {
      author: story.author,
      authorHref: story.authorHref,
      authorAvatarSrc: story.authorAvatarSrc,
      authorAvatarAlt: story.authorAvatarAlt,
      authorInitials: story.authorInitials,
    },
  ];
});

const inlineSvgMarkupBySrc = ref<Record<string, string>>({});

const isInlineSvgVisual = (visual?: StoryVisual) =>
  Boolean(visual?.inlineSvg && visual.src.endsWith(".svg"));

const inlineSvgMarkup = (visual: StoryVisual) =>
  inlineSvgMarkupBySrc.value[visual.src] ?? "";

const framedVisualClass = (visual?: StoryVisual) => {
  if (!visual?.framed) return "";

  return [
    "sgds:rounded-lg sgds:border sgds:border-muted sgds:bg-alternate",
    visual.compactFrame ? "sgds:p-2" : "sgds:p-component-xs",
  ].join(" ");
};

const storySectionClass = (section: StorySection, sectionIndex: number) => {
  const story = post.value;
  const isLastSectionBeforeClosing = Boolean(
    story?.closing.length && sectionIndex === story.sections.length - 1,
  );

  if (section.headingLevel === "h3") {
    return isLastSectionBeforeClosing
      ? "sgds:pt-layout-xs sgds:pb-layout-xs"
      : "sgds:py-layout-xs";
  }

  return isLastSectionBeforeClosing
    ? "sgds:pt-layout-md sgds:pb-layout-xs"
    : "sgds:py-layout-md";
};

const StoryVisualMedia = defineComponent({
  name: "StoryVisualMedia",
  props: {
    visual: {
      type: Object as PropType<StoryVisual>,
      required: true,
    },
  },
  setup(componentProps) {
    return () => {
      const markup = inlineSvgMarkup(componentProps.visual);
      const mediaClass =
        "sgds:block sgds:h-auto sgds:w-full sgds:object-contain";

      if (markup) {
        return h("div", {
          class: mediaClass,
          role: "img",
          "aria-label": componentProps.visual.alt,
          innerHTML: markup,
        });
      }

      return h("img", {
        src: componentProps.visual.src,
        alt: componentProps.visual.alt,
        width: componentProps.visual.width,
        height: componentProps.visual.height,
        class: mediaClass,
      });
    };
  },
});

const inlineSvgSources = computed(() => {
  const story = post.value;
  const sources = new Set<string>();
  const collect = (visual?: StoryVisual) => {
    if (isInlineSvgVisual(visual)) sources.add(visual.src);
  };

  if (!story) return [];

  story.sections.forEach((section) => {
    collect(section.titleVisual);
    collect(section.bodyVisual);
    collect(section.visual);
    section.subsections?.forEach((subsection) => {
      collect(subsection.visual);
      collect(subsection.postVisual);
    });
  });

  return [...sources];
});

const loadInlineSvg = async (src: string) => {
  if (typeof window === "undefined" || inlineSvgMarkupBySrc.value[src]) return;

  try {
    const response = await fetch(src);
    if (!response.ok) return;

    const markup = await response.text();
    if (!markup.trimStart().startsWith("<svg")) return;

    inlineSvgMarkupBySrc.value = {
      ...inlineSvgMarkupBySrc.value,
      [src]: markup,
    };
  } catch {
    // Keep the image fallback if a local SVG cannot be fetched.
  }
};

watch(
  inlineSvgSources,
  (sources) => {
    sources.forEach((src) => void loadInlineSvg(src));
  },
  { immediate: true },
);

const relatedArticles = computed<StoryRelatedArticle[]>(() => {
  const story = post.value;

  if (!story) return [];
  if (story.relatedArticles?.length) return story.relatedArticles;
  if (story.relatedArticle) return [story.relatedArticle];

  return [];
});

const isExternalHref = (href: string) => /^https?:\/\//.test(href);

const authorInitials = (author: string) =>
  author
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((namePart) => namePart[0]?.toUpperCase())
    .join("");

const sectionId = (title: string) =>
  title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const timingPattern = /\b\d+\s+minutes?\s+and\s+\d+\s+seconds?\b/g;

const highlightedTimingParts = (text: string) => {
  const parts: { key: string; text: string; highlighted: boolean }[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(timingPattern)) {
    const start = match.index ?? 0;
    const matchedText = match[0];

    if (start > lastIndex) {
      parts.push({
        key: `${parts.length}-${lastIndex}`,
        text: text.slice(lastIndex, start),
        highlighted: false,
      });
    }

    parts.push({
      key: `${parts.length}-${start}`,
      text: matchedText,
      highlighted: true,
    });

    lastIndex = start + matchedText.length;
  }

  if (lastIndex < text.length) {
    parts.push({
      key: `${parts.length}-${lastIndex}`,
      text: text.slice(lastIndex),
      highlighted: false,
    });
  }

  return parts.length ? parts : [{ key: "0-0", text, highlighted: false }];
};

const tocItems = computed(() => {
  const story = post.value;

  if (!story) return [];

  const sectionItems = story.sections
    .filter((section) => section.headingLevel !== "h3")
    .map((section) => ({
      id: sectionId(section.title),
      title: section.title,
    }));

  if (!story.matrix) return sectionItems;

  return [
    ...sectionItems,
    {
      id: sectionId(story.matrix.title),
      title: story.matrix.title,
    },
  ];
});

const matrixRows = computed(() => {
  const matrix = post.value?.matrix;

  if (!matrix) return [];

  return matrix.rows.map((row) => ({
    row,
    cells: matrix.columns
      .map((column) =>
        matrix.cells.find((cell) => cell.row === row && cell.column === column),
      )
      .filter((cell): cell is StoryMatrixCell => Boolean(cell)),
  }));
});
</script>
