blipalacz.on('start', function() {
	blipalacz.settings.add('komunikatory', 'on', 'Linkuj do GG');
	var kom = (blipalacz.settings.get('komunikatory') == 'on');
	if((document.location.href != 'http://blip.pl/bliposphere' &&document.location.href != 'http://blip.pl' && document.location.href != 'http://www.blip.pl/bliposphere' &&
		document.location.href != 'http://www.blip.pl') && kom) {
		blipalacz.on('newblips', function() {
			var dane = document.querySelectorAll('.content');
			var ile = dane.length, i=0, d;
			for(;i<ile;i++) {
				d = dane[i];
				if(d.getAttribute('done') != 1) {
					d.innerHTML = d.innerHTML.replace(/gg:([0-9]+)/, '<a href="gg://$1" title="Gadu-Gadu" done="1"><img style="border: none; vertical-align: top;" src="http://www.gadu-gadu.pl/users/status.asp?id=$1&styl=1" border="0">$1</a>');
					d.setAttribute('done',1);
				}
			}
		})
	}
})