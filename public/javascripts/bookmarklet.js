(function () {
	function setUrl() {
		var httpObj;
		if (window.XMLHttpRequest) {
			httpObj = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			httpObj = new XMLHttpRequest('MSXML2.XMLHTTP.3.0');
		}

		httpObj.open("GET", "http://192.168.1.3:3001/?url=" + location.href +
			"&title=" + document.title + '&mode=update', true);
		httpObj.send(null);
	}

	var link = document.getElementById('bookmarklet');
	link.href = 'javascript:(' + setUrl.toString() + ')();';
	var bookmarkletText = document.getElementById('bookmarkletText');
	bookmarkletText.value = 'javascript:(' + setUrl.toString() + ')();';
})();


