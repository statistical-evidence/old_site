var lunrIndex,pagesIndex;function endsWith(e,n){return-1!==e.indexOf(n,e.length-n.length)}function initLunr(){endsWith(baseurl,"/")||(baseurl+="/"),$.getJSON(baseurl+"index.json").done(function(e){pagesIndex=e,(lunrIndex=new lunr.Index).ref("uri"),lunrIndex.field("title",{boost:15}),lunrIndex.field("tags",{boost:10}),lunrIndex.field("content",{boost:5}),pagesIndex.forEach(function(e){lunrIndex.add(e)}),lunrIndex.pipeline.remove(lunrIndex.stemmer)}).fail(function(e,n,t){var r=n+", "+t;console.error("Error getting Hugo index file:",r)})}function search(e){return lunrIndex.search(e).map(function(e){return pagesIndex.filter(function(n){return n.uri===e.ref})[0]})}initLunr(),$(document).ready(function(){new autoComplete({selector:$("#search-by").get(0),source:function(e,n){n(search(e))},renderItem:function(e,n){var t=e.content.match("(?:\\s?(?:[\\w]+)\\s?){0,2}"+n+"(?:\\s?(?:[\\w]+)\\s?){0,2}");return e.context=t,'<div class="autocomplete-suggestion" data-term="'+n+'" data-title="'+e.title+'" data-uri="'+e.uri+'" data-context="'+e.context+'">» '+e.title+'<div class="context">'+(e.context||"")+"</div></div>"},onSelect:function(e,n,t){console.log(t.getAttribute("data-val")),location.href=t.getAttribute("data-uri")}})});