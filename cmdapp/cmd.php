<?php
//include 'config.php';
$dir = dirname($_SERVER['SCRIPT_NAME']);
$f = basename($_SERVER['SCRIPT_NAME']);
if ($dh = opendir($dir)) {
	while (($file = readdir($dh)) !== false) {
		if(substr($file, -4, 4) == '.php' AND $file != $f) {
			include $dir.'/'.$file;
		}
	}
	closedir($dh);
}
main::start();
?>