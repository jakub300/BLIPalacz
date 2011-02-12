//us @include		http://help.gadu-gadu.pl/errors/blip/
//us @include		http://czydziala.gadu-gadu.pl/blip/

blipalacz.on('start', function() {
	blipalacz.settings.add('oponka_powrot', 'on', 'Wracaj z oponki na kokpit');
	var oponka = (blipalacz.settings.get('oponka_powrot') == 'on');
	if(oponka && (document.location.href == 'http://help.gadu-gadu.pl/errors/blip/' || document.location.href == 'http://czydziala.gadu-gadu.pl/blip/')) {
		document.location.href = 'http://blip.pl/dashboard';
	}
})