//us @name		BLIPalacz (j3)
//us @namespace	http://jakub300.name/blipalacz
//us @description	Dopala blipa :)
//us @include		http://blip.pl/dashboard*
//us @include		http://blip.pl/users/*/dashboard*
//us @include		http://www.blip.pl/dashboard*
//us @include		http://www.blip.pl/users/*/dashboard*
//u @include		http://blip.pl/s/*
//u @include		http://blip.pl/dm/*
//us @include		http://blip.pl/tags/*

blipalacz = {};
blipalacz.version = 'j3.3b'
blipalacz._events = {};
blipalacz._set = {};
blipalacz._set_val = {}
blipalacz._sto = {};
blipalacz._start = function() {
	//alert('content');

	if(true) {
		blipalacz.browser = 'FF';
	}

	if(blipalacz.browser == 'FF') {
		var st = GM_getValue('storage');
		//alert(st);
		if(st !== undefined) {
			blipalacz._sto = JSON.parse(st);
		}
	}
	if(blipalacz.storage.get('_set_val')) {
		blipalacz._set_val =  blipalacz.storage.get('_set_val')
	}

	blipalacz.zalogowany = document.querySelector('.login-data').innerHTML;
	blipalacz.zalogowany = blipalacz.zalogowany.split(' ');
	blipalacz.zalogowany = blipalacz.zalogowany[10].replace(/\n/,'');

	blipalacz.token = document.querySelector('#authenticity_token').innerHTML.replace('"','').replace('"','').replace(/\n/,'').replace(/\n/,'').replace(/ /gi,'');

	if(document.querySelector("#profile-info > h1")) {
		blipalacz.nick = document.querySelector("#profile-info > h1").innerHTML;
	} else {
		blipalacz.nick = false;
	}

	if(document.querySelector('#observed-and-observing-box')) {
		document.querySelector('#observed-and-observing-box').innerHTML += '<div id="blipalacz-box" style=""><div class="transparent-box-rounding"></div><div class="transparent-box"><ul class="tab-bar"><li><h2 class="single">Blip dopalony przez <a href="http://kubofonista.net/blipalacz">BLIPALACZ</a></h2></li></ul><center><font style="color:#222222; font-size:85%; margin:5px;">Uzywasz wersji: '+blipalacz.version+'<br />???<div id="blipalacz-ver"></div><div id="blipalacz-workplace"></div><font size=1>BLIPalacz uzyty juz ??? razy :)<br />&copy; 2010 <a href="http://blip.pl/users/kubofonista/dashboard">^Kubofonista</a></font><br /><font size="1"><a id="blipalacz-showsets" href="javascript:void(0);" title="Wyswietla konfiguracje BLIPalacza">Ustawienia wtyczki &raquo;</a></font><br /><div id="blipalacz-sets" style="display:none"></div></font></center></div><div class="transparent-box-rounding-bottom"></div></div>'
		document.querySelector('#blipalacz-showsets').addEventListener('click', blipalacz._togglesettings, false)
	}

	blipalacz._event('start');

	//document.querySelector('#observed-and-observing-box').innerHTML += '<center><img id="onlinecounter" src="http://whos.amung.us/swidget/3n8pebav5b25.png" alt="Liczba uzytkownikow BLIPalacza Online" style=""/> <img src="http://analytics.kubofonista.net/piwik.php?idsite=2&rec=1" style="border:0" alt="" /> <br/><font style="font-size:9px;">(Liczba uzytkownikow BLIPalacza online)</font></center>';

	blipalacz._event('newblips');
	
	setInterval(function() {
		blipalacz._event('newblips');
	}, 1000);
}
blipalacz.on = function(evn, func) {
	if(!blipalacz._events[evn]) {
		blipalacz._events[evn] = [];
	}
	blipalacz._events[evn].push(func);
	return true;
}
blipalacz._event = function(name) {
	if(!blipalacz._events[name]) {
		return;
	}
	var i = 0, ev = blipalacz._events[name];
	for(;i<ev.length;i++) {
		ev[i]();
	}
}
blipalacz.storage = {};
blipalacz.storage.get = function(name) {
	return blipalacz._sto[name];
	//GM_getValue
}
blipalacz.storage.set = function(name, val) {
	blipalacz._sto[name] = val;
	//GM_setValue
	if(blipalacz.browser == 'FF') {
		GM_setValue('storage', JSON.stringify(blipalacz._sto));
	}
	return true;
}
blipalacz.settings = {};
blipalacz.settings.add = function(name, def, desc) {
	if(blipalacz._set[name]) {
		return false;
	}
	if(def != 'on' && def != 'off') {
		return false;
	}
	blipalacz._set[name] = def;

	if(!document.querySelector('#blipalacz-sets')) {
		return true;
	}

	var str = document.createElement('div');
	str.innerHTML = desc+' - '
	if(blipalacz.settings.get(name) == 'on') {
		str.innerHTML += 'włączone'
	} else {
		str.innerHTML += 'wyłączone'
	}
	str.innerHTML += ' (';
	var a  = document.createElement('a');
	a.href = 'javascript:void(0)'
	a.setAttribute('opcja', name);
	a.addEventListener('click', blipalacz._switchsettings, false)
	a.innerHTML = 'zmień';
	str.appendChild(a);
	var n = document.createTextNode(')');
	str.appendChild(n);
	document.querySelector('#blipalacz-sets').appendChild(str);

	return true;
}
blipalacz.settings.get = function(name) {
	if(!blipalacz._set[name]) {
		return false;
	}
	if(blipalacz._set_val[name]) {
		return blipalacz._set_val[name];
	}
	return blipalacz._set[name];
}
blipalacz.settings.set = function(name, val) {
	if(!blipalacz._set[name]) {
		return false;
	}
	blipalacz._set_val[name] = val;
	blipalacz.storage.set('_set_val', blipalacz._set_val);
	return true;
}
blipalacz._togglesettings = function(e) {
	var d = document.querySelector('#blipalacz-sets').style.display;
	if(d == 'none') {
		document.querySelector('#blipalacz-sets').style.display = 'block';
	} else {
		document.querySelector('#blipalacz-sets').style.display = 'none';
	}
}
blipalacz._switchsettings = function() {
	var o = this.getAttribute('opcja')
	var op = blipalacz.settings.get(o);
	if(op == 'on') {
		blipalacz.settings.set(o, 'off');
	} else if(op == 'off') {
		blipalacz.settings.set(o, 'on');
	}
	location.reload();
}
blipalacz.p = {};