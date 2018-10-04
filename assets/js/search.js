var runSearch = function(json_data, posts_data) {

  // Bolds the keywords in the preview string
  function highlightKeywords(content, previewStartPosition, matchMetadata) {
    var previewSize = 300;
    var matchMap = {};

    // Create an object containing search hit position and length of search hit in the document (for content within preview)
    for (keyword in matchMetadata) {
      var positionArray;

      if (!matchMetadata[keyword]['content']) {
        return;
      }

      positionArray = matchMetadata[keyword]['content']['position'];

      for (var positionIndex = 0; positionIndex < positionArray.length; positionIndex++) {
        var hitPosition = positionArray[positionIndex][0];
        if ((hitPosition >= previewStartPosition) && (hitPosition < previewStartPosition+previewSize)) {
          matchMap[hitPosition] = positionArray[positionIndex][1];
        }
      }
    }

    // Go through each search hit and bold it
    if (Object.keys(matchMap).length !== 0) {
      var processedPreview = '';
      var currPosition = previewStartPosition;
      for (wordPosition in matchMap) {
        var wordEnd = parseInt(wordPosition) + parseInt(matchMap[wordPosition]) + 1;
        processedPreview += content.substring(currPosition, wordPosition) + '<b>' + content.substring(wordPosition, wordEnd) + '</b>';
        currPosition = wordEnd;
      }

      if (wordEnd < previewStartPosition+previewSize) {
        processedPreview += content.substring(currPosition, previewStartPosition+previewSize);
      }
      return processedPreview;
    }

    return content.substring(previewStartPosition, previewStartPosition+previewSize);
  }

  // Find the earliest space in the preview closest to (firstPosition - numLeadingChars)
  function returnStartOfPreview(content, firstPosition) {
    var numLeadingChars = 30;
    if (firstPosition-numLeadingChars <= 0) {
      return 0;
    } else {
      for (var index = firstPosition-numLeadingChars; index < firstPosition; index++) {
        if (content.charAt(index) === ' ') {
          return index;
        }
      }
      return firstPosition;
    }
  }

  // Find the position of the first keyword match in the document
  function returnFirstKeywordPosition(matchMetadata) {
    var firstPosition = -1;

    // Iterate over each keyword in the search query
    for (keyword in matchMetadata) {

      if (matchMetadata[keyword]['content'] !== undefined) {
        var positionArray = matchMetadata[keyword]['content']['position'];
        
        // Find the earliest first position across all keywords
        for (var positionIndex = 0; positionIndex < positionArray.length; positionIndex++) {
          if (firstPosition == -1 || (firstPosition > positionArray[positionIndex][0])) {
            firstPosition = positionArray[positionIndex][0];
          }
        }
      }
    }

    return firstPosition;
  }

  // Return the preview content for each search result - returns the snippet that has the first hit in the document (up to 300 chars)
  function returnResultsList(results) {
    var searchPara = '';
    var post_data = posts_data; // Obtain JSON var of all the posts in the site


    // Iterate over the results
    for (var i = 0; i < results.length; i++) {
      var key = parseInt(results[i]['ref']);
      var resultObject = post_data[key];


      var matchMetadata = results[i]['matchData']['metadata'];
      var keywordSet = new Set();

      var titleTruncateLength = 90;
      var resultTitle = resultObject['title'].substring(0, titleTruncateLength);

      if (resultObject['title'].length > titleTruncateLength) {
        var indexOfLastWord = resultObject['title'].substring(0,titleTruncateLength).lastIndexOf(" ");
        var resultTitle = resultObject['title'].substring(0, indexOfLastWord);
        resultTitle += ' ...';
      }
      searchPara += '<a class="search-content" href="' + resultObject['url']  + '">' + ' ' + resultTitle + '</a>';
      
      // Find the position of the earliest keyword in the document
      var firstPosition = returnFirstKeywordPosition(matchMetadata);

      // Find the preview start position
      var previewStartPosition = returnStartOfPreview(resultObject['content'], firstPosition);

      // Process the preview to embolden keywords
      var processedPreview = highlightKeywords(resultObject['content'], previewStartPosition, matchMetadata);
      // var postDate = new Date(resultObject['datestring']).toDateString().substring(4);
      searchPara += '<p class="search-content permalink">' + resultObject['url'] + '</p><br>';
      // searchPara += '<p class="search-content" > '+ postDate + ' ...' + processedPreview + '...</p><br>';
      
      if (processedPreview) {
        searchPara += '<p class="search-content" > ' + ' ...' + processedPreview + '...</p><br>';
      }
    }

    return searchPara;
  }

  // Display search results if there are results, else, state that there are no results found
  function displaySearchResults(results, searchTerm) {
    var searchResults = document.getElementById('search-results');
    var searchResultsCount = document.getElementById('search-results-count');
    // document.getElementById('search-bar').setAttribute("value", searchTerm);
    document.getElementsByName('query')[1].setAttribute("value", searchTerm);
    searchResultsCount.innerHTML = results.length + " results for '" + searchTerm + "'";
    if (results.length) { // If there are results
      searchResults.innerHTML = returnResultsList(results);
    } else {
      searchResults.innerHTML = '';
    }
  }

  // Obtain the query string, load the pre-built lunr index, and perform search
  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }
  // TODO: Sanitise search query
  var searchTerm = getQueryVariable('query');

  if (searchTerm) {

    // Load the pre-built lunr index
    var idx = lunr.Index.load(JSON.parse(json_data));

    // Get lunr to perform a search
    var results = idx.search(searchTerm);

    window.onload = displaySearchResults(results, searchTerm);
  }
};