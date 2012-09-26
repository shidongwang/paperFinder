// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(text) {

     var url;
     url = "http://dx.doi.org/" + text;
     chrome.tabs.create({url:url});

  });

// get paper by its DOI if its DOI is found in the selected string.
function getDOI(info, tab) {
  var url;
  var DOIRegex = /10\.\d+[\/\w+[.-]+\w+]*/;
  doi = info.selectionText.replace(/^\s+/,'');
  m = doi.match(DOIRegex);
  if (m) {
      url = "http://dx.doi.org/" + m[0];
      chrome.tabs.create({url:url});
  } else {
      alert("DOI is not in correct format!");
  }
}

// search the selected string in Google Scholar, pubMed, or Google
function getPage(info, tab, web) {
  var url;
  alert(web);
  if (web == "scholar") {
      url = "http://www.google.com/scholar?q=";
  } else if (web == "pubmed") {
      url = "http://www.ncbi.nlm.nih.gov/pubmed?term=";
  } else {
      url = "http://www.google.com/#q=google";
  }
  url += info.selectionText;
  chrome.tabs.create({url:url});
}

// add search options to the righ-click menu
var contexts = ["selection"];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];

  var id = chrome.contextMenus.create({"title": "Find article by DOI '%s'", "contexts":[context],
                                       "onclick": getDOI});
  var id2 = chrome.contextMenus.create({"title": "Search Google Scholar for '%s'", "contexts":[context],
                                       "onclick": function (info, tab){getPage(info, tab, "scholar");}});
  var id2 = chrome.contextMenus.create({"title": "Search PubMed for '%s'", "contexts":[context],
                                       "onclick": function (info, tab){getPage(info, tab, "pubmed");}});
  var id2 = chrome.contextMenus.create({"title": "Search Google for '%s'", "contexts":[context],
                                       "onclick": function (info, tab){getPage(info, tab, "google");}});
}
