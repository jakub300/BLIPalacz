<?php
class statystyki {

	public static $ignore = array('.git');
	public static $folders = array('./cmdapp', './js');
	//public static $folders = array('./blipworld.pl/www/js');
	public static $ext = array('php', 'js');

	static function generuj() {
		//echo "";
		//$nr = api::get('Wpisz liczbe', array('1', '2', '3', '4'));
		//statystyki::analizuj('.', 0);
		foreach(self::$folders as $f) {
			echo $f.":\n";
			statystyki::analizuj($f, 1);
		}
		echo '	Koncowe statystyki:'."\n";
		echo '	linii: '. $GLOBALS['s_lines']."\n";
		echo '	linii pustych: '.$GLOBALS['s_lines_null']."\n";
		echo '	sr dlugosc linii: '.$GLOBALS['s_lines_l']/$GLOBALS['s_lines']."\n";
		echo '	sr dlugosc linii (bez pustych): '.$GLOBALS['s_lines_l']/($GLOBALS['s_lines']-$GLOBALS['s_lines_null']);
	}
	static function analizuj($f, $i) {
		if ($dh = opendir($f)) {
			while (($file = readdir($dh)) !== false) {
				if($file == '.' OR $file == '..') {
					continue;
				}
				$path = $f.'/'.$file;
				foreach(self::$ignore as $ign) {
					if(strpos($path, $ign) !== false) {
						continue 2;
					}
				}
				if(!is_dir($path)) {
					$go = 0;
					foreach(self::$ext as $ext) {
						$ext = '.'.$ext;
						$extl = -strlen($ext);
						$extt = substr($file, $extl);
						if($extt === $ext) {
							$go++;
							break;
						}
					}
					if($go === 0) {
						continue;
					}
					statystyki::analizuj_tabs($i);
					echo $file."\n";
					statystyki::analizuj_file($path);
				} else {
					statystyki::analizuj_tabs($i);
					echo $file.":\n";
					statystyki::analizuj($f.'/'.$file, $i+1);
				}
			}
			closedir($dh);
		}
	}
	static function analizuj_tabs($t) {
		for($i=0;$i<$t;$i++) {
			echo ' ';
		}
	}
	static function analizuj_file($f) {
		$handle = fopen($f, 'r');
		if ($handle) {
		    while (($line = fgets($handle)) !== false) {
			   $GLOBALS['s_lines']++;
			   if(($l = strlen($line)) === 0 OR $line == "\n" OR $line == "\n\r" OR $line == "\r\n") {
				   $GLOBALS['s_lines_null']++;
			   } else {
				   $GLOBALS['s_lines_l'] += $l;
			   }
		    }
		    if (!feof($handle)) {
			   echo "Error: unexpected fgets() fail\n";
		    }
		    fclose($handle);
		} else {
			echo '	Error podczas otwierania pliku: '.$f."\n";
		}
	}
}
//mb_internal_encoding('UTF-8');
?>