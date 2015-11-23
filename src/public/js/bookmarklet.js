(function () {
	function setUrl() {
		var xhr = new XMLHttpRequest();
    var url = encodeURIComponent('http://192.168.1.3:3000/?url=' + location.href + '&title=' + document.title);
		xhr.open('POST', url, true);
		xhr.send(null);
	}

	var link = document.getElementById('bookmarklet');
	link.href = 'javascript:(' + setUrl.toString() + ')();';
	var bookmarkletText = document.getElementById('bookmarkletText');
	bookmarkletText.value = 'javascript:(' + setUrl.toString() + ')();';
})();


