blipalacz.on('start', function() {
	blipalacz.settings.add('ukryj_polecane', 'on', 'Ukryj: polecane');
	blipalacz.settings.add('ukryj_cloudtag', 'on', 'Ukryj: chmurka tagów');
	blipalacz.settings.add('ukryj_reklamagraf', 'on', 'Ukryj: reklama graficzna');
	if(blipalacz.settings.get('ukryj_polecane') == 'on') {
		GM_addStyle('#recommended-box {display:none; } #beginners-recommended-box {display:none; }');
	}
	if(blipalacz.settings.get('ukryj_reklamagraf') == 'on') {
		GM_addStyle('#sidebar a img[alt="Button"] {display: none; }');
	}
	if(blipalacz.settings.get('ukryj_cloudtag') == 'on') {
		if(!document.location.href.match('http://blip.pl/tags/')) {
			GM_addStyle('#tagcloud-box {display:none;}');
		}
	}
})