// var lunr = require('lunr'),
//     stdin = process.stdin,
//     stdout = process.stdout,
//     buffer = []

// stdin.resume()
// stdin.setEncoding('utf8')

// stdin.on('data', function (data) {
//   buffer.push(data)
// })

// stdin.on('end', function () {
//   var documents = JSON.parse(buffer.join(''))

//   // Map function that retrieves nested fields from JSON variable
//   var mapper = function (document) {
//     return {
//       id: document.key,
//       basename: document.value.basename,
//       title: document.value.title,
//       content: document.value.content
//     }
//   }

//   var idx = lunr(function () {
//     this.ref('id')
//     this.field('permalink')
//     this.field('title')
//     this.field('content')
//     this.metadataWhitelist = ['position']

//     documents.forEach(function (doc) {
//       this.add(mapper(doc))
//     }, this)
//   })

//   stdout.write(JSON.stringify(idx))
// })

(function() {
  var json_data = '';

  if (window.Worker) {
    var indexBuilderWorker = new Worker('/assets/js/worker.js');

    indexBuilderWorker.onmessage = function(event) {
      var json_data = event.data;
      runSearch(json_data, posts_json);
    }

    indexBuilderWorker.postMessage(posts_json);
  }
})();
