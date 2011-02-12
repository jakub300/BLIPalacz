//us @include		http://www.blip.pl/
//us @include		http://www.blip.pl/bliposphere
//us @include		http://blip.pl/
//us @include		http://blip.pl/bliposphere

blipalacz.on('start', function() {
	blipalacz.settings.add('bliposfera', 'on', 'Bliposfera: czytalność');
	blipalacz.settings.add('bliposfera_cytaty', 'on', 'Blipospera: rozwijaj cytaty');
	var bliposfera = (blipalacz.settings.get('bliposfera') == 'on');
	var bliposferacytat = (blipalacz.settings.get('bliposfera_cytaty') == 'on');
	if((document.location.href == 'http://blip.pl/bliposphere' || document.location.href == 'http://blip.pl' || document.location.href == 'http://www.blip.pl/bliposphere' || document.location.href == 'http://www.blip.pl') && (bliposfera == 1 || bliposferacytat == 1)) {
		blipalacz.on('newblips', function() {
			//alert('robie to');
			var blips = document.querySelectorAll('.body');
			var autors = document.querySelectorAll('.status > a')
			var licznik = blips.length, i, ii, bb, title, href;
			var bliposferacytat = (blipalacz.settings.get('bliposfera_cytaty') == 'on');

			for(i=0;i<licznik;i++) {
				if(blips[i].innerHTML.indexOf('<br') == -1 && bliposfera == 1) {
					var osoba = autors[i].getAttribute("title");
					blips[i].innerHTML = '<b>'+osoba+':</b> '+blips[i].innerHTML+'<br />';
				}
				if (bliposferacytat == 1) {
					bb = blips[i].querySelectorAll('a');
					for(ii=0;ii<bb.length;ii++) {
						title = bb[ii].getAttribute("title");
						href = bb[ii].innerHTML;
						if(href == '[blip]') {
							bb[ii].innerHTML = '{'+title+'} ';
						}
					}
				}
			}
		})	
	}
})