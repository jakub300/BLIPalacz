<?php
class main {
	static function start() {
		echo "\n	Witaj!
	Ten skrypt sluzy do generowania stabilnej wersji blipalacza,
	wybierz jedna z ponizszych opcji i wcisnij enter:

	1. Generuj blipalacza Firefox (na wlasny uzytek)
	2. Generuj blipalacza Firefox (do wyslania na githuba)
	3. Generuj statystyki kodu
	4. Exit";
		$nr = api::get('Wpisz liczbe', array('1', '2', '3', '4'));
		switch($nr) {
			case 1:
				generuj::firefox(false);
				break;
			case 2:
				generuj::firefox_stable();
				break;
			case 3:
				statystyki::generuj();
				break;
			case 4:
				echo "	Zegnaj ;(\n"; exit();
		}
	}
}
?>