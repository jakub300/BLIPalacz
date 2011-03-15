blipalacz.p.aktualizator = {};
blipalacz.p.aktualizator.sprawdz = function() {

	if(blipalacz.version_timestamp === false || !blipalacz.p.aktualizator.url[blipalacz.version_type]) {
		return;
	}

	GM_xmlhttpRequest({
		method: 'GET',
		url: blipalacz.p.aktualizator.url[blipalacz.version_type],
		onload: function(responseDetails) {
			//alert(responseDetails.responseText);
			try {
				var json = JSON.parse(responseDetails.responseText);
				if(json['timestamp'] > blipalacz.version_timestamp) {
					alert("Strzałka! Dostępna jest nowsza wersja. Po kliknieciu OK ujrzysz okienko instalacyjne :)");
					window.location = blipalacz.p.aktualizator.urld[blipalacz.version_type];
				}
			} catch(err) {/*alert(err);*/}
		}
	});
}

blipalacz.p.aktualizator.url = {};
blipalacz.p.aktualizator.url['stable'] = false;
blipalacz.p.aktualizator.url['nightly'] = 'https://github.com/kubofonista/BLIPalacz/raw/nightly/ver_nightly.txt';
//blipalacz.p.aktualizator.url['new-alpha'] = 'https://github.com/kubofonista/BLIPalacz/raw/new-alpha/ver_nightly.txt';
blipalacz.p.aktualizator.url['new-alpha'] = 'https://github.com/jakub300/BLIPalacz/raw/nightly/ver_nightly.txt';

blipalacz.p.aktualizator.urld = {};
blipalacz.p.aktualizator.urld['stable'] = 'https://github.com/kubofonista/BLIPalacz/raw/master/blipalacz.user.js';
blipalacz.p.aktualizator.urld['nightly'] = 'https://github.com/kubofonista/BLIPalacz/raw/nightly/blipalacz.user.js';
blipalacz.p.aktualizator.urld['new-alpha'] = 'https://github.com/jakub300/BLIPalacz/raw/nightly/blipalacz.user.js';
//blipalacz.p.aktualizator.urld['new-alpha'] = 'https://github.com/kubofonista/BLIPalacz/raw/new-alpha/blipalacz.user.js';
blipalacz.on('start', blipalacz.p.aktualizator.sprawdz);