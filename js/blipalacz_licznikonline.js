blipalacz.on('start', function() {
	blipalacz.settings.add('licznikonline', 'on', 'Wyświetlaj licznik osób online');
	var kom = (blipalacz.settings.get('licznikonline') == 'on');

	if(!kom) {return;}

	var element = document.createElement('center')
	var header = document.createElement('h4')
	header.id = 'online_counter'
	element.appendChild(header)

	var tab = document.querySelector('#observed-tab')
	if (!tab) {
	    tab = document.querySelector('#observing-tab')
	}
	tab.parentNode.insertBefore(element, tab)

	blipalacz.p.licznikonline.update();
});
blipalacz.p.licznikonline = {};
blipalacz.p.licznikonline.update = function() {
	var active = document.querySelectorAll('a.active')[0]
	if (active && active.href.indexOf('#recommended') >= 0) {
		active = document.querySelectorAll('a.active')[1]
	}
	var licznik = document.querySelector('#online_counter');
	if (!active || active.href.indexOf('#observing-tab') >= 0) {
		licznik.innerHTML = 'Online: ' + document.querySelectorAll('.tracking-user-avatar-active').length + ' z ' + document.querySelectorAll('.tracking-user-avatar').length
	} else if (active.href.indexOf('#observed-tab') >= 0) {
		licznik.innerHTML = 'Online: ' + document.querySelectorAll('.tracked-user-avatar-active').length + ' z ' + document.querySelectorAll('.tracked-user-avatar').length
	} else {
		licznik.innerHTML = ''
	}
	setTimeout(blipalacz.p.licznikonline.update, 3000)
}