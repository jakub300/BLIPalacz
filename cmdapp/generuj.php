<?php
date_default_timezone_set('Europe/Warsaw');
class generuj {

	static function java() {
		return '"C:\Program Files (x86)\Java\jre6\bin\java"';
	}

	static function firefox() {
		echo '	wyszukiwanie i analizowanie plikow'."\n";
		$dir = 'js';
		$header = '// ==UserScript=='."\n"; $body = 'try {'."\n";
		echo '	dodawanie pliku: blipalacz.js'."\n";
		$header .= generuj::_analyze_file('js/blipalacz.js');
		$body .= file_get_contents('js/blipalacz.js')."\n";
		if ($dh = opendir($dir)) {
			while (($file = readdir($dh)) !== false) {
				if(substr($file, -3, 3) == '.js' AND $file != 'blipalacz.js') {
					echo '	dodawanie pliku: '.$file."\n";
					$header .= generuj::_analyze_file('js/'.$file);
					$body .= file_get_contents('js/'.$file)."\n";
				}
			}
			closedir($dh);
		}
		$header .= '// ==/UserScript=='."\n";
		$body .= 'blipalacz._start(); } catch(e) {alert(e);}';
		$put = file_put_contents('blipalacz.user.js', $body);
		echo
		exec(self::java().' -jar compiler.jar --js=blipalacz.user.js --js_output_file=blipalacz.user2.js');
		echo '	zakonczono kompresowanie'."\n";
		$get = file_get_contents('blipalacz.user2.js');
		unlink('blipalacz.user2.js');
		$put = $header;
		$put .= '// Generated: '.time().' ('.date('Y-m-d H:i:s').')'."\n";
		$put .= $get;
		$put = file_put_contents('blipalacz.user.js', $put);
		echo '	zapisano skopmresowane'."\n";
		main::start();
	}
	static function _analyze_file($f) {
		$fl = fopen($f, 'r');
		$odp = '';
		while (($l = fgets($fl)) !== false) {
			if(substr($l, 0, 4) == '//us') {
				$l = substr($l, 5);
				$l = str_replace("\n", '', $l);
				$l = str_replace("\r", '', $l);
				echo '	  dodawanie: '.$l."\n";
				$odp .= '// '.$l."\n";
			}
		}
		echo '	koniec pliku: '.$f."\n";
		fclose($fl);
		return $odp;
	}
}
?>