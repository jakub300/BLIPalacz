blipalacz.on('start', function() {
	blipalacz.settings.add('userstats', 'on', 'Wyświetlaj informacje rankingowe na kokpitach');
	var kom = (blipalacz.settings.get('userstats') == 'on');

	if(!kom) {return;}

	var adres = document.location.href;

	if(!adres.match('http:\/\/blip.pl\/dashboard') && !adres.match('http:\/\/blip.pl\/users')) {
		return;
	}


	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.blipi.pl/blipalacz/stats/'+blipalacz.nick,
		headers: {
			'User-agent': 'BLIPalacz'
		},
		onload: function(responseDetails) {
			var json = JSON.parse(responseDetails.responseText, function (key, value) {
				var type;
				if (value && typeof value === 'object') {
					type = value.type;
					if (typeof type === 'string' && typeof window[type] === 'function') {
						return new (window[type])(value);
					}
				}
				return value;
			});

			var zwrot = json['rank'];
			var zm = json['rankchange'];
			var zms = json['trackedbychange'];
			var zwrotny = json['trackedby'];
			var cytowan = json['citations'];
			var wzmianek = json['mentions'];

			if(zm == 0 || zm == undefined) {
				var zmiana = '';
			} else {
				if(zm > 0) {
					zm = zm+'';
					zm = zm.replace('-','');
					var zmiana = ' <img src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kMGQwkE21IS08AAAFASURBVCjPrZIxSwNBEIXf7ia5u72LMTkTEg5Ro4WVf0SraJM/IGITFMukshDEBCwECRibNIKVhYitv8JWsBETlCho7nbHRu8M5NTCgQdv9/ExAzNATHUuD+n4vElxeSIuuOvdYPD0FheDj/tsdKo0M5+Bt5jGdmuN/gTudTepNJ0EFwxcMEzNcdSP1ulXUMg+pJ0AKQ2lCIYjoOXDzx3rnQq5eQtKEZQi6E9lSyZqrRUaCzZOquR5NijQ30ShCrMWtpqrNAIenO3QpAuIBIPWFOqrs1IELhicvMZuu0YAwLrXbbq9v0IuZ4BzBiMVTd97jdYRDAnK13h+9LFUXgYbWcNphYpFKwIH76F/6Q+xv3HBxh5AWhZgpSLQMaOOXAbxl+NOlJGRyWg1zA+9DRUPFrILsKQI32ZSh943NP6lPgAyQ4PF9853mAAAAABJRU5ErkJggg=="><font color="green">['+zm+']</font>';
				} else {
					var zmiana = ' <img src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kMGQwqOF93n4EAAAFZSURBVCjPnZA7SwNBFIXPzO7mYWI6IUYEEREL3yKKiJUQEaJREFJZWERU1EaiP0HstBH8BXapBav8ABsFDcFAMIIgSViSmMfsztjt7CYsiKe6c+58XM4B/ilifzyl70VIkRb1UGuuNE3MxRPWUrWDRuEVileRoE/O7RpzXHSA7DMH1S8tGtTkrtJyB83SF0hAWorhkWC56cz4eHctfjJpDAVV+AmBX5UZ1V4J1hiHKQSKVQbvwiboavKUmINjYBwOqFNBjcLggBkexfLeMaEAMLxzRPJMQ8MQrmCDcxQaCsJbhwQAKABMzU5gYHufvOjMFcyVW+iLJcnk9DgsEACWYnH0LK6RfN3ogj6qDL6ZKObXN2Tj9g/Rkwt8hyIoM255ettEKdCPlYOUVcBbUXeCADCye06yLQ2MCxhC4L2uIJI4c0BdF+15n3WGbEeuP+nh5lJkbq9ca/4FqcF15bkSkS4AAAAASUVORK5CYII="><font color="red">['+zm+']</font>';
				}
			}

			if(zms == 0 | zms == undefined) {
				var zmianas = '';
			} else {
			if(zms > 0) {
				zms = zms+'';
				zms = zms.replace('-','');
					var zmianas = ' <img src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kMGQwkE21IS08AAAFASURBVCjPrZIxSwNBEIXf7ia5u72LMTkTEg5Ro4WVf0SraJM/IGITFMukshDEBCwECRibNIKVhYitv8JWsBETlCho7nbHRu8M5NTCgQdv9/ExAzNATHUuD+n4vElxeSIuuOvdYPD0FheDj/tsdKo0M5+Bt5jGdmuN/gTudTepNJ0EFwxcMEzNcdSP1ulXUMg+pJ0AKQ2lCIYjoOXDzx3rnQq5eQtKEZQi6E9lSyZqrRUaCzZOquR5NijQ30ShCrMWtpqrNAIenO3QpAuIBIPWFOqrs1IELhicvMZuu0YAwLrXbbq9v0IuZ4BzBiMVTd97jdYRDAnK13h+9LFUXgYbWcNphYpFKwIH76F/6Q+xv3HBxh5AWhZgpSLQMaOOXAbxl+NOlJGRyWg1zA+9DRUPFrILsKQI32ZSh943NP6lPgAyQ4PF9853mAAAAABJRU5ErkJggg=="><font color="green">('+zms+')</font>';
				} else {
					var zmianas = ' <img src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kMGQwqOF93n4EAAAFZSURBVCjPnZA7SwNBFIXPzO7mYWI6IUYEEREL3yKKiJUQEaJREFJZWERU1EaiP0HstBH8BXapBav8ABsFDcFAMIIgSViSmMfsztjt7CYsiKe6c+58XM4B/ilifzyl70VIkRb1UGuuNE3MxRPWUrWDRuEVileRoE/O7RpzXHSA7DMH1S8tGtTkrtJyB83SF0hAWorhkWC56cz4eHctfjJpDAVV+AmBX5UZ1V4J1hiHKQSKVQbvwiboavKUmINjYBwOqFNBjcLggBkexfLeMaEAMLxzRPJMQ8MQrmCDcxQaCsJbhwQAKABMzU5gYHufvOjMFcyVW+iLJcnk9DgsEACWYnH0LK6RfN3ogj6qDL6ZKObXN2Tj9g/Rkwt8hyIoM255ettEKdCPlYOUVcBbUXeCADCye06yLQ2MCxhC4L2uIJI4c0BdF+15n3WGbEeuP+nh5lJkbq9ca/4FqcF15bkSkS4AAAAASUVORK5CYII="><font color="red">('+zms+')</font>';
				}
			}

			if(zwrotny == 0 || zwrotny == undefined) {
				document.querySelector('#profile-info > .clearfix').innerHTML += '<dl style="width:100%"><dt class="small">Obserwujacy: 0/brak danych</dt></dl>';
			} else {
				document.querySelector('#profile-info > .clearfix').innerHTML += '<dl style="width:100%"><dt class="small">Obserwujacy: '+zwrotny+zmianas+'</dt></dl>';
			}

			if(zwrot == 0 || zwrot == undefined) {
				document.querySelector("#profile-info > h1").innerHTML = blipalacz.nick+' <span style="font-size:11px; text-align:right; position: relative; top: -2px;">(top n/a)</span>';
			} else {
				document.querySelector("#profile-info > h1").innerHTML = blipalacz.nick+' <span style="font-size:11px; text-align:right; position: relative; top: -2px;">(top '+zwrot+zmiana+')</span><br /><font style="font-size: 8.5px;">Cytowan: '+cytowan+' | Wzmianek: '+wzmianek+'</font>';
			}
		}
	});
});