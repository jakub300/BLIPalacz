<?php
class api {
	static function get($str, $allow) {
		echo "\n	".$str.': ';
		$a = trim(fgets(STDIN));
		if($allow) {
			while(!in_array($a, $allow)) {
				echo "\n".'	Wpisales bledna wartosc, sproboj ponownie: ';
				$a = trim(fgets(STDIN));
			}
		}
		return $a;
	}
}
?>