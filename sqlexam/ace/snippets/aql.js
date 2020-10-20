ace.define("ace/snippets/aql", ["require", "exports", "module"], function(e, t, n) {
	"use strict";
	t.snippetText = "snippet distinct", t.scope = "aql"
});
(function() {
	ace.require(["ace/snippets/aql"], function(m) {
		if(typeof module == "object" && typeof exports == "object" && module) {
			module.exports = m;
		}
	});
})();