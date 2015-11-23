(function () {
	function setUrl() {
		var xhr = new XMLHttpRequest();

		xhr.open('POST', 'http://192.168.1.3:3001/?url=' + location.href + '&title=' + document.title, true);
		xhr.send(null);
	}

	var link = document.getElementById('bookmarklet');
	link.href = 'javascript:(' + setUrl.toString() + ')();';
	var bookmarkletText = document.getElementById('bookmarkletText');
	bookmarkletText.value = 'javascript:(' + setUrl.toString() + ')();';
})();


