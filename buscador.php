<?php
require('library.php');
    $iterator = $_POST['iterator'];
    $response['Id'] = getInfo($iterator, "Id");
    $response['Direccion'] = getInfo($iterator, "Direccion");
    $response['Ciudad'] = getInfo($iterator, "Ciudad");
    $response['Telefono'] = getInfo($iterator, "Telefono");
    $response['Codigo_Postal'] = getInfo($iterator, "Codigo_Postal");
    $response['Tipo'] = getInfo($iterator, "Tipo");
    $response['Precio'] = getInfo($iterator, "Precio");
    $response['cantidadReg'] = count(getData());
    
 
  echo json_encode($response)

?>