blipalacz.on('start', function() {
	blipalacz.settings.add('kokpit_cytaty', 'on', 'Kokpit: rozwijaj cytaty');
	blipalacz.settings.add('kokpit_linki', 'on', 'Kokpit: rozwijaj linki');
	var kokpit_linki = (blipalacz.settings.get('kokpit_linki') == 'on');
	var kokpit_cytaty = (blipalacz.settings.get('kokpit_cytaty') == 'on');
	if((document.location.href != 'http://blip.pl/bliposphere' &&document.location.href != 'http://blip.pl' && document.location.href != 'http://www.blip.pl/bliposphere' &&
		document.location.href != 'http://www.blip.pl') && (kokpit_linki == 1 || kokpit_cytaty == 1)) {
		blipalacz.on('newblips', function() {
			var kokpit_linki = (blipalacz.settings.get('kokpit_linki') == 'on');
			var kokpit_cytaty = (blipalacz.settings.get('kokpit_cytaty') == 'on');
			var dane = document.querySelectorAll('.content > a');
			var ile = dane.length, i=0, d;
			for(;i<ile;i++) {
				d = dane[i];
				if(d.getAttribute("done") != 1) {
					var title = d.getAttribute("title");
					var href = d.innerHTML;
					//if(cytujcytat == 1) { (!!! WTF?)
						var hreff = d.getAttribute("href");
						var linkcytuj = '<div align="right" style="font-size:10px"><a href="#" onclick="window.BLIP.dashboardInput.quote(\''+hreff+'\');; return false;">Cytuj</a></div>';
					//} else {
					//	var linkcytuj = '';
					//}
					if(href != '[blip]' && href != 's' && href.indexOf('^') == -1 && href.indexOf('#') == -1 && kokpit_linki) {
						if(title != undefined) {
							if (title.match(/(<([^>]+))/ig)) {
							//  $(".content > a")[i].setAttribute("title",'LINK ZAWIERAJACY XSS!!');
								d.innerHTML = title.replace(/(<([^>]+))/ig,"")+' <font color="red"><b>UWAGA!! LINK ZAWIERA ATAK XSS!!</b></font>';
							} else if (title == '') {  // nie skrocone
								//d.innerHTML = thref; (!!! brak definicji zmiennej, co to ma byc?)
							} else { // normalne linki
								d.innerHTML = title.replace(/(<([^>]+))/ig,"");
							}
						}
					}
					if (href == '[blip]' && kokpit_cytaty) {
						d.innerHTML = '<br /><div style="background-color:#EEEEEE; border:2px dashed #C0C0C0; font-size:10pt; line-height:10pt; padding:5px;"><a href="'+hreff+'" target="_blank">'+title+'</a>'+linkcytuj+'</div>';
						//(!!! hreff kolejna zmienna z dupy wzieta, co jak cytujcytat bedzie off cokolwiek to jest)
					}
					d.setAttribute('done',1);
				}
			}
			dane = document.querySelectorAll('.notice > a');
			ile = dane.length;

			for(i=0;i<ile;i++) {
				d = dane[i];
				var title = d.getAttribute("title");
				var hrefn = d.getAttribute("href");
				var href = d.innerHTML;
				if (href == '[blip]') {
					d.innerHTML = '<br /><div style="background-color:#EEEEEE; border:2px dashed #C0C0C0; font-size:10pt; line-height:10pt; padding:5px; width:475px"><a href="'+hrefn+'" target="_blank">'+title+'</a></div>';
				}
			}
		})
	}
})