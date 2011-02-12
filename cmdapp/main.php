<?php
class main {
	static function start() {
		echo "\n	Witaj!
	Ten skrypt sluzy do generowania stabilnej wersji blipalacza,
	wybierz jedna z ponizszych opcji i wcisnij enter:

	1. Generuj blipalacza firefox
	2. Exit";
		$nr = api::get('Wpisz liczbe', array('1', '2'));
		if($nr == 1) {
			generuj::firefox();
		} else if($nr == 2) {
			echo "	Zegnaj ;(\n"; exit();
		}
	}
}
?>