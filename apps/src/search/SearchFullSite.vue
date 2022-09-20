<template>
    <div>
        <!-- Loader -->
        <loader :active="isLoading" />
        <!-- Content-->
        <div class="sgds-container search-content" v-show="!isLoading">
            <!-- Count -->
            <p id="search-result-number-of-results" class="margin--top--sm">
                {{
                    isNonEmptySearch
                        ? `Returned ${filteredResult.currentNumberOfItems} out of ${filteredResult.filteredSearchResult.length} results:`
                        : "No search query specified."
                }}
            </p>
            <!-- Status -->
            <h6 class="is-danger" v-if="errorMsg">{{ errorMsg }}</h6>
            <!-- Results -->
            <div v-if="isNonEmptySearch">
                <div id="search-full-site-results">
                    <div
                        :key="result.url"
                        v-for="result of filteredResult.sanitizedFilteredSearchResultByPage"
                        class="margin--bottom--lg"
                    >
                        <h5 class="margin--bottom--xs">
                            <a :href="result.url" v-html="result.title"></a>
                        </h5>
                        <p
                            class="is-size-8 margin--bottom--xs is-capitalized search-result-status"
                            v-html="result.directory"
                        ></p>
                        <p v-html="result.content"></p>
                    </div>
                </div>

                <nav
                    id="search-full-site-results-pagination"
                    class="sgds-pagination is-centered is-hidden-touch"
                    role="navigation"
                    aria-label="pagination"
                >
                    <a
                        class="sgds-pagination-previous"
                        :disabled="currentPage === 1"
                        @click="setCurrentPage(currentPage - 1)"
                        >Previous</a
                    >
                    <ul class="sgds-pagination-list">
                        <li
                            v-for="index in filteredResult.numberOfFilteredPages"
                            :key="index"
                            :aria-label="'go to page ' + index"
                            class="sgds-pagination-link"
                            :class="{
                                'is-current': index === currentPage,
                            }"
                            @click="setCurrentPage(index)"
                        >
                            {{ index }}
                        </li>
                    </ul>
                    <a
                        class="sgds-pagination-next"
                        :disabled="
                            currentPage === filteredResult.numberOfFilteredPages
                        "
                        @click="setCurrentPage(currentPage + 1)"
                        >Next</a
                    >
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
import Card from "../lib/Card.vue";
import Loader from "../lib/Loader.vue";
import CheckBox from "../lib/CheckBox.vue";
import { sanitize } from "../lib/index.js";
import useLunrSearch from "../composables/useLunrSearch";
import { computed, onMounted, ref, watch } from "@vue/composition-api";

export default {
    components: { Loader, Card, CheckBox },
    setup() {
        let options = ref([]);
        let currentPage = ref(1);
        let rowsPerPage = ref(10);
        let categoryCheckbox = ref([]);
        let queryParam = sanitize(
            new URL(window.location.href).searchParams.get("query")
        );

        const getDefaultCheckedCategories = () => {
            categoryCheckbox.value = sessionStorage.getItem(
                "search_full_site_categories"
            )
                // ? sessionStorage
                //       .getItem("search_full_site_categories")
                //       .split("_")
                // : ["components", "templates", "patterns", "others"];
        };

        // const getCategoryOptions = () => {
        //     options.value = [
        //         {
        //             checkboxValue: "components",
        //             checkboxLabel: "Components",
        //         },
        //         {
        //             checkboxValue: "patterns",
        //             checkboxLabel: "Patterns",
        //         },
        //         {
        //             checkboxValue: "templates",
        //             checkboxLabel: "Templates",
        //         },
        //         {
        //             checkboxValue: "others",
        //             checkboxLabel: "Others",
        //         },
        //     ];
        // };

        onMounted(() => {
            // getCategoryOptions();
            getDefaultCheckedCategories();
        });

        const {
            searchQuery,
            isLoading,
            isNonEmptySearch,
            searchResults,
            generateSearchResults,
            errorMsg,
        } = useLunrSearch();

        generateSearchResults({
            queryParam: queryParam,
            jsonPath: "/search/pages.json",
            lunrIndexFields: ["title", "content", "category"]
        });
        console.log(searchResults.value)

        // watch(categoryCheckbox, function (newValue) {
        //     // P.S. 1000 * 60 = 1 second * 60  = 1 minute * 60 = 1 hour * 24 = 1 day
        //     sessionStorage.setItem(
        //         "search_full_site_categories",
        //         newValue.join("_")
        //     );
        //     // Resetting the current page to 1
        //     setCurrentPage(1);
        // });

        const filteredResult = computed(() => {
            const filteredSearchResult = searchResults.value;
            // .filter((item) =>
            //     categoryCheckbox.value.includes(item.sub_collection)
            // );

            // Gets the number of pages after the user have filtered
            const numberOfFilteredPages = Math.ceil(
                (filteredSearchResult.length || 0) / rowsPerPage.value
            );

            // Infinite scrolling for mobile, pagination for desktop
            const filteredSearchResultByPage =
                window.innerWidth < 1025
                    ? filteredSearchResult
                    : filteredSearchResult.slice(
                          (currentPage.value - 1) * rowsPerPage.value,
                          currentPage.value * rowsPerPage.value
                      );

            // Sanitizing the end result
            const sanitizedFilteredSearchResultByPage =
                filteredSearchResultByPage.map((item) => {
                    return {
                        url: sanitize(item.url),
                        title: sanitize(item.title),
                        directory: sanitize(item.directory),
                        content: sanitize(item.content),
                    };
                });

            const currentNumberOfItems =
                sanitizedFilteredSearchResultByPage.length +
                (currentPage.value - 1) * rowsPerPage.value;

            // Returns all objects
            return {
                numberOfFilteredPages,
                filteredSearchResult,
                currentNumberOfItems,
                filteredSearchResultByPage,
                sanitizedFilteredSearchResultByPage,
            };
        });

        const setCurrentPage = (page) => {
            window.scrollTo(0, 0);
            currentPage.value = page;
        };

        document.getElementById("search-title").innerText = queryParam;

        return {
            searchQuery,
            isLoading,
            isNonEmptySearch,
            searchResults,
            errorMsg,
            categoryCheckbox,
            options,
            filteredResult,
            currentPage,
            setCurrentPage,
        };
    },
};
</script>
