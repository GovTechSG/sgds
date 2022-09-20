import lunr from "lunr";
import { escapeRegExp } from "./index";

export function getBasicLunrIndex(
  lunrIndexFields,
  lunrIndexPages,
  lunrIndexRef
) {
  return lunr(function () {
    this.ref(lunrIndexRef);
    lunrIndexFields.forEach(item => this.field(item));
    this.metadataWhitelist = ["position"];
    lunrIndexPages.forEach(function (page) {
      this.add(page);
    }, this);
  });
}

export function highlightContentMatches(parentText, targetText) {
  return parentText.replace(
    new RegExp(`${escapeRegExp(targetText)}`, "gi"),
    function (match) {
      // Callback so that matching word's case will be kept and not replaced by the case of searchQuery.
      return `<mark>${match}</mark>`;
    }
  );
}

export function getTruncatedContent(
  firstMatchIndex,
  minChar,
  maxChar,
  fullContent
) {
  let truncatedContent = firstMatchIndex > minChar ? "..." : "";
  truncatedContent += fullContent.substring(
    firstMatchIndex - minChar,
    firstMatchIndex + maxChar
  );
  if (firstMatchIndex + maxChar < fullContent.length) {
    truncatedContent += "...";
  }
  return truncatedContent;
}

export function getFirstMatchIndex(lunrSearchResult, lunrIndexField) {
  let matchKey = Object.keys(lunrSearchResult.matchData.metadata)[0];
  if (lunrSearchResult.matchData.metadata[matchKey][lunrIndexField]) {
    let matchPositions =
      lunrSearchResult.matchData.metadata[matchKey][lunrIndexField].position;
    let firstMatchIndex = matchPositions[0][0];

    return firstMatchIndex;
  }
  return -1;
}

export function getHighlightedSearchResult(
  lunrIndexFields,
  lunrSearchResult,
  targetText
) {
  lunrIndexFields.forEach(item => {
    // To catch cases where the index field dont exist in the actual search result
    if (!(item in lunrSearchResult)) {
      return;
    }
    let parentText = lunrSearchResult[item];
    if (item === "content") {
      let firstMatchIndex = getFirstMatchIndex(lunrSearchResult, item);
      // Continue to next iteration if no match.
      if (firstMatchIndex === -1) return;
      // Start 32 characters left of first match. Unless first match index < 32
      parentText = getTruncatedContent(
        firstMatchIndex,
        32,
        500,
        lunrSearchResult[item]
      );
    }
    lunrSearchResult[item] = highlightContentMatches(parentText, targetText);
  });
  return lunrSearchResult;
}
