import { ref, computed } from "@vue/composition-api";
import axios from "axios";
import { getBasicLunrIndex, getHighlightedSearchResult } from "../lib/lunr";
export default function () {
  const searchQuery = ref(null);
  const pages = ref([]);
  const miscData = ref([]);
  const lunrSearchResults = ref([]);
  const lunrIndexFields = ref([]);
  const isLoading = ref(true);
  const isNonEmptySearch = ref(false);
  const errorMsg = ref(null);

  const totalPages = computed(() => {
    return pages.value.length;
  });

  const searchResults = computed(() => {
    // If empty string return everything.
    if (!isNonEmptySearch.value) {
      return pages.value;
    } else {
      return lunrSearchResults.value.map(lunrResult => {
        let associatedPage = pages.value.find(
          page => page.url === lunrResult.ref
        );
        let searchResult = {
          ...associatedPage,
          ...lunrResult,
        };
        // Highlight searchQuery in all lunrIndexFields
        const highlightedSearchResult = getHighlightedSearchResult(
          lunrIndexFields.value,
          searchResult,
          searchQuery.value
        );

        return highlightedSearchResult;
      });
    }
  });

  const generateSearchResults = payload => {
    axios
      .get(payload.jsonPath)
      .then(response => {
        let pagesRaw = response.data.pages;
        let miscDataRaw = response.data.miscData;
        let pagesNonEmpty = pagesRaw
          .filter(page => Object.keys(page).length !== 0)
          .map(page => {
            return {
              ...page,
              content: page.content.replace(/\s+/g, " "),
            };
          })
          .sort((a, b) => a.title.localeCompare(b.title));
        pages.value = pagesNonEmpty;
        miscData.value = miscDataRaw;

        const lunrIndex = getBasicLunrIndex(
          payload.lunrIndexFields,
          pagesNonEmpty,
          "url"
        );

        if (
          payload.queryParam &&
          payload.queryParam.length > 0 &&
          payload.queryParam.trim() !== ""
        ) {
          lunrSearchResults.value = lunrIndex.search(payload.queryParam);
          isNonEmptySearch.value = true;
        }
      })
      .catch(err => {
        errorMsg.value = `There was an error while initialising data : ${err}`;
      })
      .finally(() => {
        isLoading.value = false;
        lunrIndexFields.value = payload.lunrIndexFields;
        searchQuery.value = payload.queryParam;
      });
  };

  return {
    searchQuery,
    pages,
    lunrSearchResults,
    isLoading,
    isNonEmptySearch,
    searchResults,
    totalPages,
    generateSearchResults,
    errorMsg,
  };
}
