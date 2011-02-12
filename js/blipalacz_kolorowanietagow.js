blipalacz.on('start', function() {
	blipalacz.settings.add('kolorowanietagow', 'on', 'Kolorowanie tagów');
	if(blipalacz.settings.get('kolorowanietagow') == 'on') {
		blipalacz.on('newblips', function() {
			var tags = document.evaluate("//a[contains(@href, 'blip.pl/tags/') and not(contains(@class, 'tagged')) and not(contains(@class, 'g')) and not(contains(@id, 'tagcloud-content'))]", document, null, 6, null);
			var tag, _i=0;
			while (tag = tags.snapshotItem(_i++)) {
				var tagName = tag.href.substr(tag.href.indexOf("/tags/")+6);
				var bgColor = blipalacz.p.kolorowanietagow.bgColors[tagName]?blipalacz.p.kolorowanietagow.bgColors[tagName]:blipalacz.p.kolorowanietagow.computeBgColor(tagName);
				var fgColor = blipalacz.p.kolorowanietagow.fgColors[tagName]?blipalacz.p.kolorowanietagow.fgColors[tagName]:blipalacz.p.kolorowanietagow.computeFgColor(tagName);
				var bgColorStyle = "hsl(" + bgColor.hue + ", "+bgColor.sat+"%, 80%)"
				var fgColorStyle = "color: hsl(" + (fgColor.hue) + ", 66%, 33%) !important;"

				var newTag = tag.cloneNode(true);
				newTag.className = "tagged";
				newTag.setAttribute("style", fgColorStyle);

				var spanInnerTag = document.createElement("span");
				spanInnerTag.className = "innerTag";
				spanInnerTag.style.background = bgColorStyle;
				spanInnerTag.style.borderColor = bgColorStyle
				spanInnerTag.appendChild(newTag);

				var spanTag = document.createElement("span");
				spanTag.className = "tag";
				spanTag.style.background = bgColorStyle
				spanTag.style.borderColor = bgColorStyle
				spanTag.appendChild(spanInnerTag);

				tag.parentNode.replaceChild(spanTag, tag);
			}
		})
	}
})
blipalacz.p.kolorowanietagow = {};
blipalacz.p.kolorowanietagow.fgColors = {};
blipalacz.p.kolorowanietagow.bgColors = {};
blipalacz.p.kolorowanietagow.computeBgColor = function(title) {
	function djb2hash(hashstring) {
		var i, hashvalue = 1742;
		for (i = 0; i < hashstring.length; i++) {
			var ascii_code = hashstring.charCodeAt(i);
			hashvalue = ((hashvalue << 2) + (hashvalue << 5)) + ascii_code%32;
		}
		return hashvalue;
	};

	// Compute a hash of the hostname, and clamp it to the 0-360 range allowed for the hue.
	var hash = djb2hash(title);
	var hue = hash % 360;

	blipalacz.p.kolorowanietagow.fgColors[title] = {hue: hue, sat: 50 + (hash % 50)};
	return {hue: hue, sat: 50 + (hash % 50)};
}

blipalacz.p.kolorowanietagow.computeFgColor = function(title) {
	function djb2hash(hashstring) {
		var i, hashvalue = 59981;
		for (i = 0; i < hashstring.length; i++) {
			var ascii_code = hashstring.charCodeAt(i);
			hashvalue = ((hashvalue << 2) + (hashvalue < 5)) + ascii_code%32;
		}
		return hashvalue;
	};

	// Compute a hash of the hostname, and clamp it to the 0-360 range allowed for the hue.
	var hash = djb2hash(title);
	var hue = hash % 360;

	blipalacz.p.kolorowanietagow.fgColors[title] = {hue: hue, sat: hash % 50};
	return {hue: hue, sat: hash % 50};
}