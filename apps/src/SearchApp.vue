<template>
    <section class="sgds-section">
        <h2>{{ searchQuery ? `Search results for: "${searchQuery}"`: `Search for anything here!`}}</h2>
        <div class="sgds-container search-content">
            <div class="row is-multiline">
                <div
                    class="col is-10 is-offset-1"
                    v-for="(result, index) of searchResults"
                    :key="`${index}:${result.ref}`"
                >
                    <div class="sgds-card">
                        <div class="sgds-card-content">
                            <p class="title">
                                <a :href="result.url">{{ result.title }}</a>
                            </p>
                            <p
                                style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap"
                            >{{ result.content }}</p>
                        </div>
                    </div>
                </div>
                <!-- <h4 class="search-results-count" id="search-results-count"></h4>
                <br />
                <p class="search-results" id="search-results"></p>-->
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import lunr from "lunr";
export default {
    data() {
        return {
            searchQuery: "",
            pages: [],
            lunrSearchResults: []
        };
    },
    computed: {
        searchResults() {
            return this.lunrSearchResults.map(lunrResult => {
                let associatedPage = this.pages.find(
                    page => page.url === lunrResult.ref
                );
                return {
                    ...associatedPage,
                    ...lunrResult
                };
            });
        }
    },
    created() {
        let u = new URL(window.location.href);
        this.searchQuery = u.searchParams.get("query");
        if (!this.searchQuery) return;

        axios.get("/search/pages.json").then(response => {
            let pagesRaw = response.data.pages;
            let pagesNonEmpty = pagesRaw.filter(
                page => Object.keys(page).length !== 0
            );
            this.pages = pagesNonEmpty;
            // Build lunr index
            const lunrIndex = lunr(function() {
                this.ref("url");
                this.field("content");
                this.field("category");
                this.field("title");
                this.metadataWhitelist = ["position"];
                pagesNonEmpty.forEach(function(page) {
                    this.add(page);
                }, this);
            });
            this.lunrSearchResults = lunrIndex.search(this.searchQuery);
        });
    }
};
</script>
