<?php
require('library.php');

$response['opcionTipo1'] = getInfo(0, "Tipo");
$response['opcionTipo2'] = "";
$response['opcionTipo3'] = "";
for ($i=0; $i < 99; $i++) { 
	if($response['opcionTipo2'] == ""){
		if(getInfo($i, "Tipo") != $response['opcionTipo1']){
			$response['opcionTipo2'] = getInfo($i, "Tipo");		
		}
	}else{
		if(getInfo($i, "Tipo") != $response['opcionTipo1'] && getInfo($i, "Tipo") != $response['opcionTipo2']){
			$response['opcionTipo3'] = getInfo($i, "Tipo");		
		}
	}
}

$response['opcionCiudad1'] = getInfo(0, "Ciudad");
$response['opcionCiudad2'] = "";
$response['opcionCiudad3'] = "";
$response['opcionCiudad4'] = "";
$response['opcionCiudad5'] = "";
$response['opcionCiudad6'] = "";
$verificar = false;
	
for ($i=1; $i < 100; $i++) {
if($response['opcionCiudad2'] == ""){
	if(getInfo($i, "Ciudad") != $response['opcionCiudad1']){
		$response['opcionCiudad2'] = getInfo($i, "Ciudad");		
	}
}else if($response['opcionCiudad3'] == ""){
	if(getInfo($i, "Ciudad") != $response['opcionCiudad1'] && getInfo($i, "Ciudad") != $response['opcionCiudad2']){
		$response['opcionCiudad3'] = getInfo($i, "Ciudad");		
	}
}else if($response['opcionCiudad4'] == ""){
	if(getInfo($i, "Ciudad") != $response['opcionCiudad1'] && getInfo($i, "Ciudad") != $response['opcionCiudad2'] && getInfo($i, "Ciudad") != $response['opcionCiudad3']){
		$response['opcionCiudad4'] = getInfo($i, "Ciudad");		
	}
}else if($response['opcionCiudad5'] == ""){
	if(getInfo($i, "Ciudad") != $response['opcionCiudad1'] && getInfo($i, "Ciudad") != $response['opcionCiudad2'] && getInfo($i, "Ciudad") != $response['opcionCiudad3'] && getInfo($i, "Ciudad") != $response['opcionCiudad4']){
		$response['opcionCiudad5'] = getInfo($i, "Ciudad");		
	}
}else if($response['opcionCiudad6'] == ""){
	if(getInfo($i, "Ciudad") != $response['opcionCiudad1'] && getInfo($i, "Ciudad") != $response['opcionCiudad2'] && getInfo($i, "Ciudad") != $response['opcionCiudad3'] && getInfo($i, "Ciudad") != $response['opcionCiudad4'] && getInfo($i, "Ciudad") != $response['opcionCiudad5']){
		$response['opcionCiudad6'] = getInfo($i, "Ciudad");		
	}
}
}
echo json_encode($response);
?>