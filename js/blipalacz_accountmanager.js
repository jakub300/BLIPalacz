blipalacz.on('start', function() {
	//blipalacz.settings.add('accountmanager', 'on', '');
	//var kom = (blipalacz.settings.get('accountmanager') == 'on');

	//if(!kom) {return;}

	var mdata = blipalacz.storage.get('menedzer-data');
	if(mdata == undefined) { blipalacz.storage.set('menedzer-data',''); mdata = ''; }
	var passes = mdata.split('!@!');

	var mdisp = '', i, passee;

	for ( var i in passes ) {
		passee = passes[i].split('@!@');
		if(passee[1] != undefined) {
			mdisp += '<form method="post" id="'+i+'" action="http://blip.pl/sessions"><input type="hidden" name="logging_in_user[login]" id="logging_in_user[login]['+i+']" value="'+passee[0]+'"/><input type="hidden" name="logging_in_user[password]" id="logging_in_user[password]['+i+']" value="'+passee[1]+'"/>'+passee[0]+'<input type="submit" value="Zaloguj &raquo;" style="font-size:9px; border: none; background:none; padding-left:1px;"/><br /></form>';
		}
		passee = '';
	}

	var menedzertresc = mdisp+'<br /><a id="menedzer-add" href="javascript:void(0);">Dodaj kolejne konto &raquo;</a><br /><a id="menedzer-delall" href="javascript:void(0);">Usun konta &raquo;</a><div id="menedzer-addacc" style="display:none;"><br /><form id="menedzer-form">Login: <input id="menedzer-login"><br />Haslo: <input id="menedzer-haslo" type="password"><br /><input type="submit" value="Zapisz" size="9"></form></div>';

	var div = document.createElement('div');
	div.id = 'blipalacz-manager-box';
	div.innerHTML = '<div class="transparent-box-rounding"></div><div class="transparent-box"><ul class="tab-bar"><li><h2 class="single">Menedzer kont BLIPowych (<a href="javascript:void(0);" id="menedzer-info">?</a>)</h2></li></ul><center><font style="color:#222222; font-size:85%;">'+menedzertresc+'</font></center></div><div class="transparent-box-rounding-bottom"></div>';
	//	menedzerkont ='null';
	document.querySelector('#observed-and-observing-box').appendChild(div);

	document.querySelector("#menedzer-info").addEventListener('click', function() { alert('Menedzer kont BLIPowych to dodatek dostarczony przez BLIPalacza. \r\n Umozliwia on zarzadzanie swoimi blipowymi kontami. \r\n Nie musisz pamietac hasel do kont swoich botów. Poprostu je dodaj i klikaj "Zaloguj sie" ;) \r\n\r\n Prywatnosc: Hasla sa zapisywane TYLKO w twojej przegladarce i NIGDY NIE SA NIGDZIE PRZESYLANE'); return false;	}, false);
	document.querySelector("#menedzer-add").addEventListener('click', function() {	blipalacz.p.accountmanager.toggle();	alert('Po dodaniu konta wejda na liste po odswiezeniu strony'); return false;	}, false);
	document.querySelector("#menedzer-delall").addEventListener('click', function() { blipalacz.storage.set('menedzer-data',''); alert('Konta usuniete. Odswiez strone :)');	return false;	}, false);
	document.querySelector("#menedzer-form").addEventListener('submit', function() {
		var menedzersave = document.querySelector('#menedzer-login').value+'@!@'+document.querySelector('#menedzer-haslo').value+'!@!';
		var menedzerdata = blipalacz.storage.get('menedzer-data');

		if(menedzerdata == undefined) {
			blipalacz.storage.set('menedzer-data', menedzersave);
		} else {
			blipalacz.storage.set('menedzer-data', menedzerdata+menedzersave);
		}

		document.querySelector('#menedzer-login').value = '';
		document.querySelector('#menedzer-haslo').value = '';

		return false;	}, false);

});
blipalacz.p.accountmanager = {};
blipalacz.p.accountmanager.toggle = function() {
	var el = document.querySelector("#menedzer-addacc");
	if(el.style.display == 'none') {
		el.style.display = 'block';
	} else {
		el.style.display = 'none';
	}
}