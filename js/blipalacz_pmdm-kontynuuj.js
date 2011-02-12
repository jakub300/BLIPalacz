blipalacz.on('start', function() {
	blipalacz.settings.add('dmpm_kontynuuj', 'on', 'Kontynuuj przy wlasnych dm/pm');
	var kont = (blipalacz.settings.get('dmpm_kontynuuj') == 'on');
	if((document.location.href != 'http://blip.pl/bliposphere' &&document.location.href != 'http://blip.pl' && document.location.href != 'http://www.blip.pl/bliposphere' &&
		document.location.href != 'http://www.blip.pl') && kont) {
		blipalacz.on('newblips', function() {
			var dane = document.querySelectorAll('span.respond');
			var ile = dane.length, i=0, d, nicks, pm, ii, a, nick_dmpm, body;
			for(;i<ile;i++) {
				d = dane[i];
				nicks = d.parentNode.parentNode.querySelectorAll('span.nick');
				pm = d.parentNode.parentNode.querySelectorAll('span.private-mark');
				//alert(nicks);
				for(ii=0; ii<nicks.length; ii++) {
					a = nicks[ii].querySelectorAll('a');
					if (a.length == 2) {
						nick_dmpm = a[0].innerHTML;
						if(pm.length == 1) {
							body = "<a onclick=\"window.BLIP.dashboardInput.respondTo('"+nick_dmpm+"',true);; return false;\" href=\"#\" class=\"respond\">kontynuuj</a>";
						} else {
							body = "<a onclick=\"window.BLIP.dashboardInput.respondTo('"+nick_dmpm+"',false);; return false;\" href=\"#\" class=\"respond\">kontynuuj</a>";
						}
						d.innerHTML = body;
					}
				}
			}
		})
	}
})

/*jQuery('span.respond').each(function(e, v){
				ob = jQuery(v);
				nicks = ob.parent().parent().find('span.nick');
				pm = ob.parent().parent().find('span.private-mark');
				for(i=0; i<nicks.length; i++) {
					a = jQuery(nicks[i]).find('a');
						if (a.length == 2) {
						nick_dmpm = a.eq(1).text();
						if(pm.length == 1) {
							body = "<a onclick=\"window.BLIP.dashboardInput.respondTo('"+nick_dmpm+"',true);; return false;\" href=\"#\" class=\"respond\">kontynuuj</a>";
						} else {
							body = "<a onclick=\"window.BLIP.dashboardInput.respondTo('"+nick_dmpm+"',false);; return false;\" href=\"#\" class=\"respond\">kontynuuj</a>";
						}
						ob.replaceWith(body);
						}
				}
			});*/