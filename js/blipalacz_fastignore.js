blipalacz.on('start', function() {
	blipalacz.settings.add('fastignore', 'on', 'Szybkie ignorowanie użytkowników');
	var kom = (blipalacz.settings.get('fastignore') == 'on');
	if((document.location.href != 'http://blip.pl/bliposphere' &&document.location.href != 'http://blip.pl' && document.location.href != 'http://www.blip.pl/bliposphere' &&
		document.location.href != 'http://www.blip.pl') && kom) {
		blipalacz.on('newblips', function() {
			var dane = document.querySelectorAll('.container');
			var toolbar = document.querySelectorAll('.container > .toolbar');
			var autors = document.querySelectorAll('.container > .author');
			var ile = dane.length, i=0, d, cont, autor;
			for(;i<ile;i++) {
				if(!toolbar[i]) {continue;}
				cont = toolbar[i].innerHTML;
				autor = autors[i];

				if(autor != undefined) {
					autor = autor.getAttribute("href").replace('http://blip.pl/users/','').replace('/dashboard','');
				}
				if(cont.indexOf('plonk') == -1) {
					if(autor == undefined || autor == blipalacz.zalogowany) {} else {
						toolbar[i].innerHTML += '<span class="divider">&nbsp; | &nbsp;</span> <a class="respond" onclick="var x = confirm(\'Czy napewno chcesz dodac '+autor+' do ignorowanych? \'); if(x == true) { var f = document.createElement(\'form\'); f.style.display = \'none\'; this.parentNode.appendChild(f); f.method = \'POST\'; f.action = this.href;var m = document.createElement(\'input\'); m.setAttribute(\'type\', \'hidden\'); m.setAttribute(\'name\', \'_method\'); m.setAttribute(\'value\', \'put\'); f.appendChild(m);var s = document.createElement(\'input\'); s.setAttribute(\'type\', \'hidden\'); s.setAttribute(\'name\', \'authenticity_token\'); s.setAttribute(\'value\', \''+blipalacz.token+'\'); f.appendChild(s);f.submit(); } return false;" id="ignore" href="/users/'+autor+'/ignore"><font style="font-size:7px;">plonk</font></a>';
					}
				}
			}
		})
	}
})